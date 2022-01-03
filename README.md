# SteamCard

> 快速生成自己的steam资料卡

![img](https://steamcard.vercel.app/card/76561198340841543)

## 使用

> 请先确保自己的Steam个人资料处于公开状态

### 找到自己的steamid

1.登录网页steam，进入个人主页。

2.这时你会看到类似一个这样的链接：

```
https://steamcommunity.com/profiles/XXXXXXXXXX/
```

如果你没有使用自定义URL，后面的一串数字就是你的steamid

3.如果你使用了自定义URL，在你的自定义URL后面加上'?xml=1',类似这样

```
https://steamcommunity.com/profiles/XXXXXXXXXX/?xml=1
```

4.`steamID64`节点里的就是你的steamid

### 设置样式

URL格式：`https://steamcard.vercel.app/card/:steamid/:theme/:group/:badge`

| 参数名  | 含义             | 合法参数值                                  | 是否必传 | 默认值 |
| ------- | ---------------- | ------------------------------------------- | -------- | ------ |
| steamid | 用户的Steamid    | /                                           | 是       | /      |
| theme   | 卡片主题         | `dark`：暗色；`light`：亮色                 | 否       | dark   |
| group   | 是否显示群组图标 | `true`：显示群组图标；`false`：隐藏群组图标 | 否       | false  |
| badge   | 是否显示徽章图标 | `true`：显示徽章图标；`false`：隐藏徽章图标 | 否       | false  |



- 亮色

  `https://steamcard.vercel.app/card/76561198340841543/light`

  ![img](https://steamcard.vercel.app/card/76561198340841543/light)

- 暗色

  `https://steamcard.vercel.app/card/76561198340841543/dark`

  ![img](https://steamcard.vercel.app/card/76561198340841543/dark)

- 显示群组图标

  `https://steamcard.vercel.app/card/76561198340841543/dark/true`

  ![](https://steamcard.vercel.app/card/76561198340841543/dark/true)

- 显示徽章图标

  `https://steamcard.vercel.app/card/76561198340841543/dark/true/true`

  ![](https://steamcard.vercel.app/card/76561198340841543/dark/true/true)

### 使用示例

- HTML

```html
<img width="400" height="140" src="https://steamcard.vercel.app/card/<yoursteamid>"></img>  
```

- Markdown

```markdown
![](https://steamcard.vercel.app/card/<yoursteamid>)
```

- 论坛/BBCode

```bbcode
[img=400,140]https://steamcard.vercel.app/card/<yoursteamid>[/img]
```


## 开发

### 全局安装vercel Cli

更多Vercel Cli的命令见[官方文档](https://vercel.com/cli)

``` shell
npm install -g vercel
```

### Fork项目

### 本地调试

``` shell
# 进入项目根目录
cd steam-card

# 安装依赖,推荐使用pnpm作为包管理器
pnpm install
# or
yarn install
# or 
npm install

# 启动服务
vercel dev
```

### ENV文件配置

``` shell
cp .env.example .env
```

#### STEAM_KEY

申请一个[Steam Api Key](https://steamcommunity.com/dev/apikey)

将.env中的STEAM_KEY替换为你自己的KEY

#### 配置代理

> 由于不可抗力，在中国大陆无法访问Steam相关域名。需要配置代理。

将.env文件中的代理配置指向你本地的代理程序，以Clash为例

``` shell
PROXY_HOST=localhost
PROXY_PORT=7890
# 为了与生产环境区分开，MODE必须要设置为development
MODE=development
```

