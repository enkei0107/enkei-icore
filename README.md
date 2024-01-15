
# Nest Enkei Core Template REST API
[Nest](https://github.com/nestjs/nest) Enkei Core Template is a ready-to-use REST API template for Nest.js.

## Installation
To get started, create a new Nest.js app and install the Enkei package using [pnpm](https://pnpm.io/):
```bash
# Create a new Nest.js app
$ nest new new-app

# Install Enkei package
$ pnpm install enkei

```
## Configure The App
-  Configure Environment
   - Copy the `env.example` file to `.env` and set the `DATABASE_SYNCHRONIZE` environment variable to `true`.
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
  $ pnpm start
  ```