## ADDED Requirements

### Requirement: 按 ID 删除菜单大类
系统 SHALL 按分类 ID 删除菜单大类，并同步清理关联的图片文件。

#### Scenario: 成功删除分类
- **WHEN** 用户发送 DELETE 请求到 `/market/deleteCategory` 携带有效 `id`
- **THEN** 系统删除对应分类及其嵌入式 foods
- **AND** 删除关联的图片文件
- **AND** 返回"删除成功"

#### Scenario: 分类不存在
- **WHEN** 用户发送删除请求，id 对应分类不存在
- **THEN** 系统返回 404 错误，提示"分类不存在"
