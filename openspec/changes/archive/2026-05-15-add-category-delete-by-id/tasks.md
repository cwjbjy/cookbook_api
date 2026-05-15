## 1. DTO 改造

- [x] 1.1 `CreateMarketDto` 去掉 `foods` 字段及其 `@IsNotEmpty` 校验

## 2. Service 改造

- [x] 2.1 `create` 方法：接收 name + image，foods 默认 `[]`，加入同名检查（`findOne({ name })` → `ConflictException`）
- [x] 2.2 `deleteCategory` 方法：参数从 `name: string` 改为 `id: string`，改为 `findByIdAndDelete`，删除前查询 image 并 `fs.unlinkSync` 清理图片，分类不存在时抛出 `NotFoundException`

## 3. Controller 改造

- [x] 3.1 `POST /addCategory`：适配改造后的 `create` 方法（仅传 name + image）
- [x] 3.2 `DELETE /deleteCategory`：参数从 `@Query('name')` 改为 `@Query('id')`
