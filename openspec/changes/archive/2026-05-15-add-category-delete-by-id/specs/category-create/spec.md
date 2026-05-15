## ADDED Requirements

### Requirement: 创建空菜单大类
系统 SHALL 提供接口创建新的菜单大类，仅需传入名称和图片，foods 默认为空数组，并确保名称唯一性。

#### Scenario: 成功创建分类
- **WHEN** 用户发送 POST 请求到 `/market/addCategory` 携带 `{ name, image }`
- **THEN** 系统创建新分类，foods 为空数组
- **AND** 返回创建后的分类数据

#### Scenario: 名称已存在
- **WHEN** 用户创建分类时，名称已被其他分类使用
- **THEN** 系统返回 409 错误，提示"分类名称已存在"

#### Scenario: 缺少必填字段
- **WHEN** 用户发送创建请求缺少 name 或 image
- **THEN** 系统返回校验错误，提示缺少对应字段
