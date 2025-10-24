import { Body, Controller, Delete, Get, HttpStatus, Param, ParseFilePipeBuilder, ParseIntPipe, Post, UploadedFile, UseGuards, UseInterceptors } from "@nestjs/common";
import { FileInterceptor } from "@nestjs/platform-express";
import { FileStorage } from "./services/file-storage.service";
import { ImageService } from "./services/image.service";
import { Image } from "./entities/image.entity"
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "src/auth/jwt-auth.guard";
import { RolesGuard } from "src/auth/roles.guard";
import { Roles } from "src/decorators/roles.decorator";
import { Role } from "src/users/roles/roles.enum";
import { FormatInterceptor } from "src/interceptors/format.interceptor";


@ApiTags("Image-upload")
@UseGuards(JwtAuthGuard, RolesGuard)
@ApiBearerAuth("JWT-auth")
@Controller('images')
export class ImagesController {
  constructor(
    private readonly fileStorage: FileStorage,
    private readonly imageService: ImageService
  ) { }

  @Post(':entityType/:id')
  @ApiOperation({ summary: 'Upload a file' })
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'Image upload', schema: {
      type: 'object',
      properties: {
        file: {
          type: 'string',
          format: 'binary',
        }
      }
    }
  })
  @ApiOperation({ summary: 'Uploads an image' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Image })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @UseInterceptors(FileInterceptor('file'))
  @Roles(Role.ADMIN)
  async uploadFile(
    @Param('entityType') entityType: string,
    @Param('id', new ParseIntPipe()) id: string,
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: 'jpeg',
        })
        .addMaxSizeValidator({
          maxSize: 100000000
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY
        })
    )
    file: Express.Multer.File
  ) {
    const { filename, originalName } = await this.fileStorage.saveFile(file, entityType, id)
    await this.fileStorage.saveFileToS3(filename, file.buffer)

    const symlinkPath = await this.fileStorage.createSymlink(filename)

    return this.imageService.create(
      {
        filename,
        originalName,
        path: symlinkPath,
        entityType: entityType,
        entityId: +id,
      }
    )

  }

  @Get(':entityType/:id')
  @ApiOperation({ summary: 'Returns all images of the said entity' })
  @ApiParam({ name: 'id', required: true, description: 'person identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Image })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @UseInterceptors(FormatInterceptor)
  findImages(@Param("entityType") entityType: string, @Param('id', new ParseIntPipe()) id: string) {
    return this.imageService.findImages(+id, entityType)
  }


  @Delete(':id')
  @ApiOperation({ summary: 'Deletes an image with specified id' })
  @ApiParam({ name: 'id', required: true, description: 'Image identifier' })
  @ApiResponse({ status: HttpStatus.OK, description: 'Success', type: Image })
  @ApiResponse({ status: HttpStatus.BAD_REQUEST, description: 'Bad Request' })
  @Roles(Role.ADMIN)
  async deleteImage(@Param('id') id: number) {
    const image = await this.imageService.findOne(id);
    await this.fileStorage.deleteFile(image.filename);
    await this.imageService.remove(id);
    return { message: 'Image deleted' };
  }
}
