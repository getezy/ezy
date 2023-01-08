# Development

## Setting up project

```bash
  # Install dependencies
  $ npm ci
```

## Project structure

```bash
  # Resoursec used in build
  - resources
  - src
    # The core of ezy
    - core
    # Main electron process
    - main
    # Preloads for electron
    - preload
    - ui
      # Main application
      - app
      # Splash-screen loader
      - splash-screen
      # Shared UI things (themes, components)
      - common
  # Migrations for ezy database
  - migrations
  # Vite bundle
  - out
  # Electron package builds
  - dist
```

## Lint
```bash
  $ npm run lint

  $ npm run lint:fix
```

## Typechecking

```bash
  $ npm run typecheck

  # Or run one by one
  $ npm run typecheck:[node|app|splash-screen|migrations]
```

## Working with migrations

You can link your database on macOS to project directory:
```bash
  # Database will be created at first app start, so be sure you have it
  $ npm run link-database
```

Migrations are written in TypeScript, to build them manually run:
```bash
  $ npm run migrate:build
```

If you want to work with migrations manually be sure that you have built them before.

```bash
  # Create new migration file
  $ npm run migrate:make test-migration-name

  # Run all not applied migrations
  $ npm run migrate:latest

  # Rollback last migrations batch
  $ npm run migrate:rollback
```

## Start project

```bash
  $ npm run start

  # Run app in dev mode with watchers enabled
  $ npm run dev
```

## Build app from source

```bash
  # Build on macOS with current architecture
  $ npm run build:mac

  # Build on macOS with optional architecture
  $ npm run build:mac -- --[x64 | arm64]

  # Build on Windows with current architecture
  $ npm run build:win

  # Build on Windows with optional architecture
  $ npm run build:win -- --[x64 | ia32]

  # Build on Linux with current architecture
  $ npm run build:linux

  # Build on Linux with optional architecture
  $ npm run build:linux -- --[x64 | arm64 | armv7l]
```
