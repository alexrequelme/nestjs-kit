import { Inject, Injectable, OnModuleDestroy } from "@nestjs/common";
import { App, cert, deleteApp, getApps, initializeApp } from "firebase-admin/app";
import { Auth, getAuth } from "firebase-admin/auth";
import { Firestore, getFirestore } from "firebase-admin/firestore";
import { Storage, getStorage } from "firebase-admin/storage";
import {
  FirebaseAdminModuleOptions,
  MODULE_OPTIONS_TOKEN,
} from "./firebase-admin.module-definition";

@Injectable()
export class FirebaseAdminService implements OnModuleDestroy {
  private readonly app: App;
  private readonly ownsApp: boolean;

  constructor(
    @Inject(MODULE_OPTIONS_TOKEN)
    private readonly options: FirebaseAdminModuleOptions,
  ) {
    const appName = options.appName ?? "[DEFAULT]";
    const existingApp = getApps().find(({ name }) => name === appName);
    if (existingApp) {
      this.app = existingApp;
      this.ownsApp = false;
      return;
    }

    const { appName: _appName, clientEmail, privateKey, ...appOptions } = options;
    const credential = appOptions.credential ?? (clientEmail && privateKey
      ? cert({ projectId: appOptions.projectId, clientEmail, privateKey: privateKey.replace(/\\n/g, "\n") })
      : undefined);
    this.app = initializeApp(
      { ...appOptions, ...(credential ? { credential } : {}) },
      appName === "[DEFAULT]" ? undefined : appName,
    );
    this.ownsApp = true;
  }

  auth(): Auth { return getAuth(this.app); }
  firestore(): Firestore { return getFirestore(this.app); }
  storage(): Storage { return getStorage(this.app); }
  getApp(): App { return this.app; }

  getOptions(): FirebaseAdminModuleOptions {
    return this.options;
  }

  async onModuleDestroy(): Promise<void> {
    if (this.ownsApp) await deleteApp(this.app);
  }
}
