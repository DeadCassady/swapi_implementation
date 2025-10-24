import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataLoaderModule } from './data-loader/data-loader.module';
import { ImageModule } from './image-upload/image.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { SwapiModule } from './db-entities/swapi.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule, ConfigService } from '@nestjs/config';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => {
        return ({
          type: 'postgres',
          host: configService.get('DATABASE_HOST'),
          port: configService.get('DATABASE_PORT'),
          username: configService.get('DATABASE_USER'),
          password: configService.get('DATABASE_PASSWORD'),
          database: configService.get('DATABASE_DB'),
          entities: [__dirname + '/**/*.entity{.ts,.js}'],
          synchronize: configService.get('NODE_ENV') === 'development' ? true : false,
          dropSchema: configService.get('NODE_ENV') === 'development' ? true : false,
          migrations: [__dirname + '/database/migrations/**/*{.ts,.js}'],
          cli: {
            migrationsDir: __dirname + '/migrations/'
          },
        })
      },
      inject: [ConfigService]
    }),
    AuthModule,
    UsersModule,
    DataLoaderModule,
    ImageModule,
    SwapiModule
  ],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule { }
