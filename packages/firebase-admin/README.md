# @nestjs-kit/firebase-admin

Package for integrating Firebase Admin into NestJS applications.

The package exposes a configurable `FirebaseAdminModule`:

```ts
import { Module } from '@nestjs/common';
import { FirebaseAdminModule } from '@nestjs-kit/firebase-admin';

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
