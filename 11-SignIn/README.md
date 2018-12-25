# Homework 11 - Sign In

* 首先通过 `npm i` 安装依赖文件，比如 express、mongoose、nodemon 等依赖。作业要求中要求了必须使用 express，同时 node.js 应用打包的时候不应该携带 node_modules 文件夹，应当执行一次 `npm install` 重新安装一次依赖。
* 其次，你必须保证你的电脑中已经安装了 MongoDB，这是作业要求。如果你的作业未使用 MongoDB 作为账户信息的存储工具，那么你的作业就不满足要求。

比如，如果你的是 linux 系统，那么请保证在终端中能调用 mongod 命令而且保证 mongodb 服务正在运行；如果你的电脑是 Windows 系统，那么请保证你已经安装 MongoDB 而且其能正确运行。

在保证了上述两条要求后，你可以通过 `npm start` 启动服务器，此时浏览器应会在 10 秒内自动打开网站首页。
如果未能自动打开，你可以直接访问 `http://localhost:8000` 来访问服务器。

本作业实现中采取了将访问 http://localhost:8000/regist 连接时跳转到 http://localhost:8000/user/register, 访问 http://localhost:8000?username=ab 连接时跳转到 http://localhost:8000/user/profile 的策略。

对于作业要求5: 详情页的登出在界面的右上角或者在汉堡菜单中。