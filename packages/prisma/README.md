# @nestjs-kit/prisma

Package for integrating Prisma into NestJS applications.

The package provides a global `PrismaModule` and an injectable `PrismaService`:

```ts
import { Module } from '@nestjs/common';
import { PrismaModule } from '@nestjs-kit/prisma';

@Module({
  imports: [PrismaModule.forRoot()],
})
export class AppModule {}
```

Inject `PrismaService` into your providers to access the generated Prisma Client.
