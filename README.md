# SteamCard

> 快速生成自己的steam资料卡

![](https://steamcard.vercel.app/card?steamid=76561198340841543)

## 使用

### 找到自己的steamid

1.登录网页steam，进入个人主页。

2.这是你会看到类似一个这样的链接：

```
https://steamcommunity.com/profiles/XXXXXXXXXX/
```

如果你没有使用自定义URL，后面的一串数字就是你的steamid

3.如果你使用了自定义URL，在你的自定义URL后面加上'?xml=1',类似这样

```
https://steamcommunity.com/profiles/XXXXXXXXXX/?xml=1
```

4.\<steamID64>\</steamID64>标签里的就是你的steamid

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

全局安装[vercel Cli](https://vercel.com/cli)

``` shell
npm install -g vercel
```

克隆项目至本地

``` shell
git clone https://github.com/yuyinws/steam-card.git
```

申请一个[Steam Api Key](https://steamcommunity.com/dev/apikey)

配置ENV文件

``` shell
cp .env.example .env

#在STEAM_KEY中输入申请的KEY
```

本地调试

``` shell
vercel dev
```

