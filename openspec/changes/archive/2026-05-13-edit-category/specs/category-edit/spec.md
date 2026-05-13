## ADDED Requirements

### Requirement: 更新分类信息
系统 SHALL 提供接口更新分类的名称和图片，并确保名称唯一性。

#### Scenario: 成功更新分类
- **WHEN** 用户发送 PUT 请求到 `/market/updateCategory` 携带 `{ id, name, image }`
- **THEN** 系统更新对应分类的名称和图片
- **AND** 返回更新后的分类数据

#### Scenario: 名称已存在
- **WHEN** 用户发送更新请求，新名称已被其他分类使用
- **THEN** 系统返回 409 错误，提示"分类名称已存在"

#### Scenario: 分类不存在
- **WHEN** 用户发送更新请求，id 对应分类不存在
- **THEN** 系统返回 404 错误

### Requirement: 前端编辑分类
系统 SHALL 在前端提供编辑分类的交互界面。

#### Scenario: 显示编辑按钮
- **WHEN** 用户切换到编辑模式（currentType=1）
- **THEN** 左侧分类列表每个分类项显示编辑按钮

#### Scenario: 打开编辑弹窗
- **WHEN** 用户点击编辑按钮
- **THEN** 弹出编辑弹窗，显示当前分类名称和图片
- **AND** 提供名称输入框和图片上传区域

#### Scenario: 保存编辑
- **WHEN** 用户修改名称/图片后点击保存
- **THEN** 系统调用更新接口
- **AND** 成功后刷新列表并关闭弹窗

#### Scenario: 取消编辑
- **WHEN** 用户点击取消按钮
- **THEN** 关闭弹窗，不保存任何更改
