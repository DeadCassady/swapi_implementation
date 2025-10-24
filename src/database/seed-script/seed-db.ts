import { NestFactory } from "@nestjs/core";
import { AppModule } from "../../app.module";
import { DataLoaderService } from "../../data-loader/data-loader.service";

async function bootstrap() {
  const app = await NestFactory.createApplicationContext(AppModule)
  try {
    const seeder = app.get(DataLoaderService);
    await seeder.loadAllData()
    console.log('Seeding complete!')
  } catch (error) {
    console.log('Seeding failed:', error)
  } finally {
    await app.close()
  }
}

bootstrap()
