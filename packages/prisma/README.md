# @nestjs-kit/prisma

Package for integrating Prisma into NestJS applications.

## Installation

Install the package directly from GitHub:

```bash
pnpm add "github:alexrequelme/nestjs-kit#path:packages/prisma"
```

The consuming project must also have Prisma and NestJS installed:

```bash
pnpm add @nestjs/common @nestjs/core @prisma/client
pnpm add -D prisma @types/express
```

After defining your Prisma schema, generate the Prisma Client:

```bash
pnpm prisma generate
```

### Required pnpm configuration

Allow the package build script in the consuming project's `pnpm-workspace.yaml`:

```yaml
allowBuilds:
  "@nestjs-kit/prisma@git+https://github.com/alexrequelme/nestjs-kit.git": true
```

## Usage

The package provides a global `PrismaModule` and an injectable `PrismaService`:

```ts
import { Module } from "@nestjs/common";
import { PrismaModule } from "@nestjs-kit/prisma";

@Module({
  imports: [PrismaModule.forRoot()],
})
export class AppModule {}
```

Inject `PrismaService` into your providers to access the generated Prisma Client.
