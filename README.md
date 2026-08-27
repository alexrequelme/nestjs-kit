# nestjs-kit

GitHub-hosted monorepo of reusable packages for NestJS projects.

This repository is not intended to publish packages to npm. Packages are consumed directly from the repository or copied into the projects that use them.

## Packages

- `@nestjs-kit/firebase-admin`
- `@nestjs-kit/prisma`

## Development

Requires Node.js 20+ and pnpm.

```bash
pnpm install
pnpm build
pnpm typecheck
```

New packages should be created inside `packages/`; they are automatically included by `pnpm-workspace.yaml`.
