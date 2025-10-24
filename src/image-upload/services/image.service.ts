import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { CreateImageDto } from "../dto/create-image.dto";
import { Image } from "../entities/image.entity"

@Injectable()
export class ImageService {
  constructor(
    @InjectRepository(Image)
    private imageRepository: Repository<Image>,
  ) { }


  async create(dto: CreateImageDto) {
    dto.entityType = dto.entityType.toLowerCase()
    const image = new Image
    Object.assign(image, dto)
    image.created = new Date()
    image.edited = new Date()
    return this.imageRepository.save(image)
  }

  async findOne(id: number): Promise<Image> {
    const image = await this.imageRepository.findOneBy({ id })
    if (!image) {
      throw new NotFoundException(`Image with ID ${id} not found`)
    }
    return image
  }

  async findImages(id: number, entityType: string): Promise<Image[]> {
    entityType = entityType.toLowerCase()
    const entityId = id.toString()

    const images = await this.imageRepository.findBy({
      entityId,
      entityType
    })

    images.filter(image => image != null)

    if (images.length < 1) {
      throw new NotFoundException(`No images for ${entityType} with id ${id}`)
    }
    return images
  }

  async remove(id: number): Promise<void> {
    const result = await this.imageRepository.delete(id)
    if (result.affected === 0) {
      throw new NotFoundException(`image with ID ${id} not found`)
    }
  }
} 
