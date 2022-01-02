# SteamCard

> 快速生成自己的steam资料卡

![](https://steamcard.vercel.app/card?steamid=76561198340841543)

## 使用
> 请先确保自己的Steam库处于公开状态
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

4.<steamID64>节点里的就是你的steamid

### 生成链接

HTML

```html
<img width="400" height="140" src="https://steamcard.vercel.app/card?steamid=<yoursteamid>"></img>  
```

Markdown

``` markdown
![](https://steamcard.vercel.appcard?steamid=<yoursteamid>)
```

论坛/BBS
```
[img=400,140]hhttps://steamcard.vercel.app/card?steamid=<yoursteamid>[/img]
```

### 主题

目前支持亮色与暗色两种主题，通过URL参数theme指定（默认为暗色主题）

- 亮色

```
https://steamcard.vercel.appcard?steamid=<yoursteamid>&theme=light
```

![](https://steamcard.vercel.app/card?steamid=76561198340841543&theme=light)

- 暗色

```
https://steamcard.vercel.appcard?steamid=<yoursteamid>&theme=dark
```

![](https://steamcard.vercel.app/card?steamid=76561198340841543&theme=dark)

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

