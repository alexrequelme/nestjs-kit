import { SetMetadata } from "@nestjs/common";

export const SKIP_FIREBASE_AUTH_KEY = "skipFirebaseAuth";

export const SkipFirebaseAuth = () => SetMetadata(SKIP_FIREBASE_AUTH_KEY, true);
