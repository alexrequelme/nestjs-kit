import { Module } from '@nestjs/common';
import { ConfigurableModuleClass } from './firebase-admin.module-definition';
import { FirebaseAdminService } from './firebase-admin.service';
import { FirebaseAuthStrategy } from './firebase-auth.strategy';
import { FirebaseAuthGuard } from './firebase-auth.guard';

@Module({
  providers: [FirebaseAdminService, FirebaseAuthStrategy, FirebaseAuthGuard],
  exports: [FirebaseAdminService, FirebaseAuthStrategy, FirebaseAuthGuard],
})
export class FirebaseAdminModule extends ConfigurableModuleClass {}
