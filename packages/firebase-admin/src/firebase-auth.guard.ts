import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { FirebaseAuthStrategy } from "./firebase-auth.strategy";
import { SKIP_FIREBASE_AUTH_KEY } from "./skip-firebase-auth.decorator";

type AuthenticatedRequest = {
  headers: { authorization?: string };
  user?: Awaited<ReturnType<FirebaseAuthStrategy["verifyIdToken"]>>;
};

@Injectable()
export class FirebaseAuthGuard implements CanActivate {
  constructor(
    private readonly firebaseAuth: FirebaseAuthStrategy,
    private readonly reflector: Reflector,
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const skipAuth = this.reflector.getAllAndOverride<boolean>(SKIP_FIREBASE_AUTH_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);

    if (skipAuth) return true;

    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const authorization = request.headers.authorization;
    const token = authorization?.startsWith("Bearer ")
      ? authorization.slice("Bearer ".length).trim()
      : undefined;

    if (!token) throw new UnauthorizedException("Missing Firebase bearer token");

    try {
      request.user = await this.firebaseAuth.verifyIdToken(token);
      return true;
    } catch {
      throw new UnauthorizedException("Invalid Firebase token");
    }
  }
}
