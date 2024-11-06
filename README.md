# Teneo自动批量创建账户

这是一个用于批量注册用户账户的脚本，支持通过邮箱列表批量注册账户，并支持自动输入邀请码。

## 功能概述

- 自动批量注册账户
- 支持自定义邀请码输入
- 支持批量处理并设置延迟
- 自动检查并安装依赖项，无需 `package.json` 文件



### 克隆项目文件库

首先，您需要将项目代码库克隆到本地。在终端中运行以下命令来克隆文件库：

```bash
git clone https://github.com/ziqing888/teneo-auto-create-account

进入项目目录：

```bash
cd teneo-account-creator
```

### 1. 准备邮箱文件

在项目根目录下创建 `email.txt` 文件，每行一个邮箱地址，格式如下：

```plaintext
# 请在每一行添加一个邮箱地址，示例如下：
user1@example.com
user2@example.com
user3@example.com
```

### 2. 配置文件 `config.js`

打开 `config.js` 文件，根据需要调整以下配置：

```javascript
module.exports = {
  password: "your_password", // 注册使用的密码
  delay: 3000,               // 每次请求的延迟，单位为毫秒
  maxConcurrentRequests: 5,  // 每批次的并发请求数量
};
```

- **password**：注册时使用的密码，可以自定义。
- **delay**：批量处理之间的延迟时间，以毫秒为单位。
- **maxConcurrentRequests**：每批次的并发请求数量。

## 运行指南

### 3. 运行脚本

直接运行 `index.js` 文件，程序会自动检查并安装依赖项（`axios` 和 `chalk`）。运行命令：

```bash
node index.js
```

启动后，系统会提示您输入邀请码：

```
请输入您的邀请码:
```

输入邀请码后，脚本将开始处理 `email.txt` 文件中的邮箱列表。

### 注意事项

- 请确保 `email.txt` 文件中每行只包含一个有效的邮箱地址。
- `config.js` 中的配置可以随时修改，以满足您的需求。
- `index.js` 中自动安装依赖的功能确保您无需手动安装 `axios` 和 `chalk`。

### 示例

1. **准备 `email.txt` 文件**
   ```plaintext
   # 请在每一行添加一个邮箱地址，示例如下：
   user1@example.com
   user2@example.com
   user3@example.com
   ```

2. **修改 `config.js` 文件**
   ```javascript
   module.exports = {
     password: "mySecurePassword123", // 自定义的注册密码
     delay: 5000,                      // 每次请求延迟 5000 毫秒
     maxConcurrentRequests: 3,         // 每次处理 3 个并发请求
   };
   ```

3. **运行脚本**
   在终端中运行以下命令：
   ```bash
   node index.js
   ```
   输入邀请码后，程序将自动开始批量注册用户。

---

## 作者

- **qklxsqf**

## 许可证

MIT License

