import { ConfigurableModuleBuilder } from "@nestjs/common";
import type { AppOptions } from "firebase-admin/app";

export interface FirebaseAdminModuleOptions {
  readonly appName?: string;
  readonly credential?: AppOptions["credential"];
  readonly databaseURL?: AppOptions["databaseURL"];
  readonly storageBucket?: AppOptions["storageBucket"];
  readonly projectId?: AppOptions["projectId"];
  readonly clientEmail?: string;
  readonly privateKey?: string;
}

export const { ConfigurableModuleClass, MODULE_OPTIONS_TOKEN, OPTIONS_TYPE, ASYNC_OPTIONS_TYPE } =
  new ConfigurableModuleBuilder<FirebaseAdminModuleOptions>()
    .setClassMethodName("forRoot")
    .setFactoryMethodName("forRootAsync")
    .build();
