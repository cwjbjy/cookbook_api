# Cookbook API

菜谱管理 API 服务

## 安装依赖

```bash
npm install
```

## 运行开发环境

```bash
npm run start
```

## 运行生产环境

```bash
npm run build
npm run start:prod
```

## 访问文档

启动服务后，访问 Swagger 文档：
http://localhost:9000/api/swagger-ui

## 配置说明

配置文件位于 `src/config/` 目录：
- `development.yml` - 开发环境配置
- `production.yml` - 生产环境配置

默认连接本地 MongoDB (localhost:27017)，数据库名为 `cookbook`。

## API 端点

- `POST /api/market/addCategory` - 添加分类
- `DELETE /api/market/deleteCategory` - 删除分类
- `PUT /api/market/addFood` - 添加菜品
- `DELETE /api/market/deleteFood` - 删除菜品
- `PUT /api/market/updateFood` - 更新菜品（含图片）
- `PUT /api/market/updateFoodWithoutImage` - 更新菜品（不含图片）
- `PUT /api/market/updateFoodWithNum` - 更新菜品点单数量
- `GET /api/market/getAll` - 获取所有菜单
- `GET /api/market/findFoods` - 根据配料查询菜品
- `POST /api/market/uploadImage` - 上传图片
