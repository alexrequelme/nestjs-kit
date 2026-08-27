import { APP_FILTER } from "@nestjs/core";
import { DynamicModule, Module } from "@nestjs/common";
import { PrismaExceptionsFilter } from "./prisma-exceptions.filter";
import { PrismaService } from "./prisma.service";

@Module({})
export class PrismaModule {
  static forRoot(): DynamicModule {
    return {
      global: true,
      module: PrismaModule,
      providers: [PrismaService, { provide: APP_FILTER, useClass: PrismaExceptionsFilter }],
      exports: [PrismaService],
    };
  }
}
