## Why

当前 `POST /addCategory` 要求创建时必传 foods 数组，但实际业务中创建大类时 foods 应为空，后续通过 `addFood` 接口单独添加菜品。同时 `deleteCategory` 按 name 删除存在同名误删风险。需要改造现有接口使其符合实际使用场景。

## What Changes

- 改造 `POST /addCategory`：仅接受 name + image，不再要求 foods，创建时校验名称唯一性，foods 默认为空数组
- **BREAKING**: `DELETE /market/deleteCategory` 改为按 `id` 删除（原按 `name` 删除）
- 删除分类时同步清理关联的图片文件

## Capabilities

### New Capabilities
- `category-create`: 创建空菜单大类，传入名称和图片，系统校验名称唯一性后创建，foods 默认为空数组
- `category-delete`: 按 ID 删除菜单大类，删除时同步清理图片文件，分类不存在时返回 404

### Modified Capabilities
_None._

## Impact

- `src/module/market/market.controller.ts` — 改造 `POST /addCategory`，修改 `DELETE /deleteCategory` 参数
- `src/module/market/market.service.ts` — 改造 `create` 方法，重构 `deleteCategory` 方法
- `src/module/market/dto/create-market.dto.ts` — `CreateMarketDto` 去除 foods 字段
- 小程序前端调用 `/market/deleteCategory` 的地方需同步改为传 `id`
