import { ConfigurableModuleBuilder } from "@nestjs/common";

export interface FirebaseAdminModuleOptions {
  readonly appName?: string;
  readonly projectId: string;
  readonly clientEmail: string;
  readonly privateKey: string;
  readonly databaseURL?: string;
  readonly storageBucket?: string;
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE, ASYNC_OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<FirebaseAdminModuleOptions>()
    .setClassMethodName("forRoot")
    .setFactoryMethodName("forRootAsync")
    .build();
