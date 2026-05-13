## Why

当前菜谱管理系统的分类（Market）信息在创建后无法修改，用户需要删除后重新创建，操作繁琐。同时分类图片是前端静态资源，无法动态更新。需要新增编辑功能支持修改分类名称和图片。

## What Changes

- 后端新增 `PUT /market/updateCategory` 接口，支持修改分类的 `name` 和 `image`
- 后端在更新时校验分类名称唯一性，防止重名
- 后端复用现有的 `/market/uploadImage` 接口处理图片上传
- 前端 `verticalTabs` 组件左侧分类列表新增编辑按钮（仅在编辑模式显示）
- 前端新增编辑弹窗，支持修改名称和上传图片
- 前端 `market.ts` 服务层新增 `updateCategory` API 调用

## Capabilities

### New Capabilities
- `category-edit`: 编辑食品分类信息，包括名称修改和图片上传

### Modified Capabilities
- 无（仅新增功能，不改变现有行为）

## Impact

- **后端 API**: 新增 `PUT /market/updateCategory` 接口
- **数据库**: 使用现有 `Market` schema，无需迁移
- **前端组件**: `verticalTabs.vue` 新增编辑按钮和弹窗
- **前端服务**: `service/market.ts` 新增方法
- **图片存储**: 分类图片改为后端管理，逐步迁移现有静态图片
