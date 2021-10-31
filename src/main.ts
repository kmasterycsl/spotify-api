import { ValidationPipe } from "@nestjs/common";
import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { OptionalGqlAuthGuard } from "./modules/user/strategies/optional-graphql.guard";

async function bootstrap() {
    const app = await NestFactory.create(AppModule);
    app.useGlobalPipes(new ValidationPipe());
    app.useGlobalGuards(new OptionalGqlAuthGuard());
    await app.listen(3001);
}
bootstrap();
