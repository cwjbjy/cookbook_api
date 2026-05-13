## 1. Backend - DTO

- [x] 1.1 Create `UpdateCategoryDto` in `src/module/market/dto/update-market.dto.ts` with `id`, `name`, `image` fields and `class-validator` decorators

## 2. Backend - Service

- [x] 2.1 Implement `updateCategory` method in `MarketService` — update category by `_id` with `$set` on `name` and `image`
- [x] 2.2 Add name uniqueness check: query for existing document with same name but different `_id`, throw `ConflictException` if found
- [x] 2.3 Handle category-not-found: if `findByIdAndUpdate` returns null, throw `NotFoundException`

## 3. Backend - Controller

- [x] 3.1 Add `PUT /updateCategory` endpoint in `MarketController` with `@ApiOperation` and `@ApiBody` decorators
- [x] 3.2 Wire endpoint to `MarketService.updateCategory`

## 4. Frontend - API Service

- [x] 4.1 Add `updateCategory` function in `service/market.ts` — `PUT` request to `/market/updateCategory` with `{ id, name, image }` body

## 5. Frontend - UI

- [x] 5.1 Add edit button to each category item in `verticalTabs.vue`, visible only when `currentType === 1` (edit mode)
- [x] 5.2 Create edit category dialog with name input and image upload (reuses `uploadImage` API)
- [x] 5.3 Wire dialog save to `updateCategory` API call, refresh category list on success
- [x] 5.4 Add cancel button to close dialog without saving
