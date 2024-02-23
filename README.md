
# Nest Enkei Core Template REST API
[Nest](https://github.com/nestjs/nest) Enkei Core Template is a ready-to-use REST API template for Nest.js.

## Installation
To get started, create a new Nest.js app and install the Enkei package using [pnpm](https://pnpm.io/):
```bash
# Create a new Nest.js app
$ nest new new-app

# Install Enkei package
$ pnpm add enkei
$ pnpm enkei deploy
```
## Configure The App
-  Configure Environment
   - Copy the `env.example` file to `.env` and set the `DATABASE_SYNCHRONIZE` environment variable to `true`.
   ```yaml
      # Database
      DATABASE_TYPE=
      DATABASE_HOST=
      DATABASE_PORT=
      DATABASE_NAME=
      DATABASE_USERNAME=
      DATABASE_PASSWORD=
      DATABASE_SSL=
      DATABASE_LOGGING=
      DATABASE_SYNCHRONIZE=

      #Storage
      S3_END_POINT=
      S3_KEY_ID=
      S3_SECRET_KEY=
      S3_BUCKET_NAME=

      # JWT
      JWT_SECRET_KEY=your-secret-key
      JWT_TTL=1h
   ```
- Import Module
  - Import the necessary modules (`DatabaseModule`, `FrontOfficeModule`, `BackOfficeModule`) from the Enkei package into your app.
  ```typescript
    import { Module } from '@nestjs/common';
    import { AppController } from './app.controller';
    import { AppService } from './app.service';
    import {DatabaseModule,FrontOfficeModule,BackOfficeModule} from 'enkei';
    @Module({
      imports: [DatabaseModule,FrontOfficeModule,BackOfficeModule],
      controllers: [AppController],
      providers: [AppService],
    })
    export class AppModule {}
  ```
- Configure Swagger
  - Update the `main.ts` file to configure Swagger documentation. Use the `DocumentBuilder` to set the API title, description, version, and authentication methods.
  ```typescript
    const config = new DocumentBuilder()
      .setTitle('Api Documentation')
      .setDescription('Backend API description')
      .setVersion('1.0')
      .addBearerAuth()
      .addBasicAuth()
      .build();
  ```
## Start The App
```bash
# production
$ pnpm build
$ pnpm start

# development
$ pnpm start:dev
```
## Configure Migration Database
- Configure package.json add this below
```json
  "scripts":{
    "typeorm": "pnpm build && pnpm dlx typeorm -d node_modules/enkei/dist/database/data-source.js",
    "migration:generate": "pnpm typeorm -- migration:generate",
    "migration:run": "pnpm typeorm -- migration:run"
  }  
```
- Script Migration Database
```bash
# generate new migration
$ pnpm typeorm migration:generate src/database/migrations/{name}

# run migration
$ pnpm typeorm migration:run
```
## Configure Seeder And Factories Database
- [**LINK DOC SEEDER**](https://www.npmjs.com/package/@jorgebodega/typeorm-seeding)
- [**LINK DOC FACTORY**](https://www.npmjs.com/package/@jorgebodega/typeorm-factory)