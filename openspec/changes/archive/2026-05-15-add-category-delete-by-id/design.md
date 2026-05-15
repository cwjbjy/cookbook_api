## Context

当前 `MarketService.create` 使用 `CreateMarketDto`（要求 name + image + foods 全部必填），`deleteCategory` 按 name 删除。实际业务中创建大类时不带菜品，后续通过 `addFood` 补充。项目遵循 NestJS + Mongoose 架构。

## Goals / Non-Goals

**Goals:**
- 改造 `POST /addCategory` 为仅接收 name + image，foods 默认 []
- 创建时校验分类名称唯一性
- 将删除分类从按 name 改为按 id 删除
- 删除分类时同步清理关联图片文件

**Non-Goals:**
- 不修改前端代码（前端适配另行处理）
- 不处理分类关联菜品的级联处理（foods 为嵌入式文档，随分类一起删除）

## Decisions

### 1. 改造现有 DTO 而非新建

`CreateMarketDto` 去掉 `foods` 字段及其 `@IsNotEmpty` 校验。无需新建 DTO，改造现有接口即可满足需求。

### 2. 复用现有路由 `POST /addCategory`

直接改造 controller 中已有的 `POST /addCategory`，调用改造后的 `create` 方法（仅处理 name + image）。不新增路由。

### 3. 删除参数：Query 参数改为 `@Query('id')`

保持与现有 `DELETE /deleteCategory` 一致的参数传递方式，仅将参数名从 `name` 改为 `id`。单个字段用 Query 更简洁，无需改为 Body。

### 4. 图片清理：复用 `deleteFood` 的清理模式

```ts
const fileName = path.basename(image);
const imagePath = join(__dirname, '../../..', 'public/images/market', fileName);
fs.unlinkSync(imagePath);
```

删除分类前先查询获取 image 路径，再执行删除和文件清理。

### 5. 同名检查：与 `updateCategory` 保持一致

创建分类时使用 `findOne({ name })` 检查名称是否已存在，存在则抛出 `ConflictException('分类名称已存在')`。

## Risks / Trade-offs

- **BREAKING**: 前端调用 `DELETE /deleteCategory?name=xxx` 需改为 `?id=xxx` → 部署时需同步更新小程序前端
- 图片文件删除使用 `unlinkSync`，删除失败会抛异常导致接口 500 → 与现有 `deleteFood` 行为一致
