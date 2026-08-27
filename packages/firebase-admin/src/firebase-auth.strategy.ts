import { Injectable } from "@nestjs/common";
import type { DecodedIdToken } from "firebase-admin/auth";
import { FirebaseAdminService } from "./firebase-admin.service";

@Injectable()
export class FirebaseAuthStrategy {
  constructor(private readonly firebaseAdmin: FirebaseAdminService) {}

  verifyIdToken(idToken: string): Promise<DecodedIdToken> {
    return this.firebaseAdmin.auth().verifyIdToken(idToken);
  }
}
