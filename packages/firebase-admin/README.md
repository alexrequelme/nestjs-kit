# @nestjs-kit/firebase-admin

Package for integrating Firebase Admin into NestJS applications.

## Installation

Install the package directly from GitHub:

```bash
pnpm add "github:alexrequelme/nestjs-kit#path:packages/firebase-admin"
```

The consuming project must also have NestJS and Firebase Admin installed:

```bash
pnpm add @nestjs/common @nestjs/core firebase-admin
```

### Required pnpm configuration

Allow the package build script in the consuming project's `pnpm-workspace.yaml`:

```yaml
allowBuilds:
  "@nestjs-kit/firebase-admin@git+https://github.com/alexrequelme/nestjs-kit.git": true
```

## Usage

The package exposes a configurable `FirebaseAdminModule`:

```ts
import { Module } from "@nestjs/common";
import { FirebaseAdminModule } from "@nestjs-kit/firebase-admin";

@Module({
  imports: [
    FirebaseAdminModule.forRoot({
      // Firebase Admin options will be configured here.
    }),
  ],
})
export class AppModule {}
```

The Firebase Admin client integration will be added as the package requirements are defined.

Protect a route with the Firebase authentication guard:

```ts
@UseGuards(FirebaseAuthGuard)
@Get('profile')
getProfile(@Req() request: Request) {
  return request.user;
}
```

The client must send the Firebase ID token using the `Authorization: Bearer <token>` header.

Skip authentication for a public route with `@SkipFirebaseAuth()`:

```ts
@SkipFirebaseAuth()
@Get('health')
getHealth() {
  return { status: 'ok' };
}
```

Access the authenticated Firebase user with the `@User()` parameter decorator:

```ts
@UseGuards(FirebaseAuthGuard)
@Get('profile')
getProfile(@User() user: DecodedIdToken) {
  return user;
}

@Get('uid')
getUserId(@User('uid') uid: string) {
  return { uid };
}
```
