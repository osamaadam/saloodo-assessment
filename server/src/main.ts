import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { SeederService } from "./seeder/seeder.service";

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const port = process.env.PORT || 3000;
  app.enableCors({ origin: "*", credentials: true });

  if (process.env.NODE_ENV === "development") {
    const seederService = app.get(SeederService);
    await seederService.seedUsers(5);
    await seederService.seedParcels(100);
  }

  await app.listen(port);
}
bootstrap();
