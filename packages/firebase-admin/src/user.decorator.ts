import { createParamDecorator, ExecutionContext } from "@nestjs/common";
import type { DecodedIdToken } from "firebase-admin/auth";

type AuthenticatedRequest = {
  user?: DecodedIdToken;
};

export const User = createParamDecorator(
  (data: keyof DecodedIdToken | undefined, context: ExecutionContext) => {
    const request = context.switchToHttp().getRequest<AuthenticatedRequest>();
    const user = request.user;

    return data ? user?.[data] : user;
  },
);
