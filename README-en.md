# SteamCard

<p align='center'>
<b></b> | <a href="https://github.com/yuyinws/steam-card/blob/master/README-en.md">English简体中文</a>
</p>

**Generate Your Steam Proflle Quickly**

![img](https://steamcard.vercel.app/card?steamid=76561198028121353&lang=en)

## Usage

> Please make sure your steam profile in public state

### Find your own Steamid

1.[Login](https://steamcommunity.com/login/home/) steam and go to your profile page

2.now your will see a URL like this：

```
https://steamcommunity.com/profiles/76561198028121353/
```

If your not use custom url，the number is your steamid

3.iI your use custom url，add  `?xml=1` in your custom url , like this:

```
https://steamcommunity.com/profiles/CUSTOM_URL/?xml=1
```

4.node`steamID64`is your steamid

### 设置样式

> 我们提供了 2 种 URL 引用方式
>
> 1.路径参数方式：`https://steamcard.vercel.app/card/:steamid/:theme?/:group?/:badge?/:lang?`
>
> 2.查询参数方式 `https://steamcard.vercel.app/card?steamid=:steamid&theme=:theme&group=:group&badge=:badge&lang=:lang`

| 参数名  | 含义             | 合法参数值                                  | 是否必传 | 默认值 |
| ------- | ---------------- | ------------------------------------------- | -------- | ------ |
| steamid | 用户的 Steamid   | /                                           | 是       | /      |
| theme   | 卡片主题         | `dark`：暗色；`light`：亮色                 | 否       | dark   |
| group   | 是否显示群组图标 | `true`：显示群组图标；`false`：隐藏群组图标 | 否       | false  |
| badge   | 是否显示徽章图标 | `true`：显示徽章图标；`false`：隐藏徽章图标 | 否       | false  |
| lange   | 卡片展示的语言   | `en`:'英文';`zh-CN`:'简体中文'              | 否       | zh-CN  |

- 亮色

  > `https://steamcard.vercel.app/card/76561198028121353/light`
  >
  > 或
  >
  > `https://steamcard.vercel.app/card?steamid=76561198028121353&theme=light`


   														      ![img](https://steamcard.vercel.app/card/76561198028121353/light)	

- 暗色

  `https://steamcard.vercel.app/card/76561198028121353/dark`

  ![img](https://steamcard.vercel.app/card/76561198028121353/dark)

- 显示群组图标

  > `https://steamcard.vercel.app/card/76561198028121353/dark/true`
  >
  > 或
  >
  > `https://steamcard.vercel.app/card?steamid=76561198028121353&group=true`

  ![](https://steamcard.vercel.app/card/76561198028121353/dark/true)

- 显示徽章图标

  `https://steamcard.vercel.app/card/76561198028121353/dark/true/true`

  ![](https://steamcard.vercel.app/card/76561198028121353/dark/true/true)

	​	

### 使用示例

- HTML

```html
<img width="400" height="140" src="https://steamcard.vercel.app/card/76561198028121353"></img>
```

- Markdown

```markdown
![](https://steamcard.vercel.app/card/76561198028121353)
```

- 论坛/BBCode

```bbcode
[img=400,140]https://steamcard.vercel.app/card/76561198028121353[/img]
```

## 开发

### 全局安装 vercel Cli

更多 Vercel Cli 的命令见[官方文档](https://vercel.com/cli)

```shell
npm install -g vercel
```

### Fork 项目

### 本地调试

```shell
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

### ENV 文件配置

```shell
cp .env.example .env
```

#### STEAM_KEY

申请一个[Steam Api Key](https://steamcommunity.com/dev/apikey)

将.env 中的 STEAM_KEY 替换为你自己的 KEY

#### 配置代理

> 由于不可抗力，在中国大陆无法访问 Steam 相关域名。需要配置代理。

将.env 文件中的代理配置指向你本地的代理程序，以 Clash 为例

```shell
PROXY_HOST=localhost
PROXY_PORT=7890
# 为了与生产环境区分开，MODE必须要设置为development
MODE=development
```