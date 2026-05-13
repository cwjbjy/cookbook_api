# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

Cookbook API (菜谱管理API) - A NestJS-based REST API for managing recipe categories and food items with MongoDB.

## Development Commands

```bash
# Install dependencies
npm install

# Development server with hot reload (port 9001)
npm run start

# Production build
npm run build

# Production server
npm run start:prod

# Code formatting
npm run format

# Linting with auto-fix
npm run lint
```

## Architecture

### Tech Stack
- **Framework**: NestJS 10.x with Express
- **Database**: MongoDB with Mongoose ODM
- **Config**: YAML-based configuration (`src/config/{development|production}.yml`)
- **Documentation**: Swagger UI at `/api/swagger-ui`
- **Static Files**: Served from `public/` directory at `/static` endpoint

### Project Structure

```
src/
├── config/              # YAML configuration files
│   ├── index.ts         # Config loader using js-yaml
│   ├── development.yml  # Dev config (localhost MongoDB)
│   └── production.yml   # Prod config
├── core/                # Global providers
│   ├── filter/          # Exception filters
│   │   ├── any-exception.filter.ts   # Catch-all errors
│   │   └── http-exception.filter.ts  # HTTP errors
│   └── interceptor/
│       └── global.interceptor.ts     # Response wrapper
└── module/              # Feature modules
    └── market/          # Menu/recipe module
        ├── dto/         # Validation DTOs with class-validator
        ├── entities/    # Mongoose schemas
        ├── market.controller.ts
        ├── market.module.ts
        └── market.service.ts
```

### Key Patterns

**Configuration**: Config is loaded from YAML files based on `NODE_ENV`. The `src/config/index.ts` loader reads `development.yml` or `production.yml`.

**Response Format**: All responses are wrapped by `GlobalInterceptor` into a uniform format:
```json
{
  "code": 200,
  "message": "success",
  "data": <actual_response>
}
```

**Error Handling**: Two exception filters handle errors:
- `AllExceptionsFilter`: Catches all unhandled exceptions
- `HttpExceptionFilter`: Handles NestJS HTTP exceptions

Both return a consistent error format with `statusCode`, `timestamp`, `path`, and `message`.

**File Upload**: Image uploads use Multer with disk storage to `public/images/market/`, served statically at `/static/images/market/`.

**Database Schema**: MongoDB with two main entities:
- `Market`: Category with name, image, and foods array
- `FoodSchema`: Individual food items with name, describe, burden, image, and num (count)

## Module Conventions

When adding new modules, follow the `market` module pattern:
1. Create `module/{name}/` directory with controller, service, module, dto/, entities/
2. Use `@ApiTags()` and `@ApiOperation()` decorators for Swagger docs
3. Use `class-validator` decorators in DTOs for validation
4. Import the module in `app.module.ts`

## Configuration Reference

Development defaults (from `development.yml`):
- API prefix: `api`
- Port: `9001`
- MongoDB: `localhost:27017/market`
