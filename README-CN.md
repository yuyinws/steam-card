<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/yuyinws/static@master/2022/10/upgit_20221022_1666410714.svg">
</p>
<p align='center'>
<b>简体中文</b> | <a href="https://github.com/yuyinws/steam-card/blob/master/README.md">English</a>
</p>

<p align="center">
<a href="https://card.yuy1n.io" style="font-size:20px">在线配置页面</a>
</p>
<p align="center">
  <a href="https://card.yuy1n.io">
		<img src="https://card.yuy1n.io/card/76561198028121353" />
   </a>
</p>


## 使用

> 请先确保自己的 Steam 个人资料处于公开状态

### 找到自己的 steamid

1.[登录](https://steamcommunity.com/login/home/) steam，进入个人主页。

2.这时你会看到类似一个这样的链接：

```
https://steamcommunity.com/profiles/76561198028121353/
```

如果你没有使用自定义 URL，后面的一串数字就是你的 steamid

3.如果你使用了自定义 URL，在你的自定义 URL 后面加上'?xml=1',类似这样

```
https://steamcommunity.com/profiles/CUSTOM_URL/?xml=1
```

4.`steamID64`节点里的就是你的 steamid

## 部署

如果你需要自己部署这个项目，则需要先准备一个 **[Steam Api Key](https://steamcommunity.com/dev/apikey)** ，然后点击下面的一个按钮。

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyuyinws%2Fsteam-card&env=STEAM_KEY&envDescription=YOUR_STEAM_KEY&envLink=https%3A%2F%2Fsteamcommunity.com%2Fdev%2Fapikey)

[![Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yuyinws/steam-card)

## 开发

> 前置条件:
>
> **Node >=16**
>
> **[Steam Api Key](https://steamcommunity.com/dev/apikey)**

```shell
复制配置文件
cp .env.example .env
```

将你的Steam API KEY添加到配置文件中

```shell
STEAM_KEY=YOUR_STEAM_KEY
```

```shell
# 安装依赖
pnpm install
# 或
yarn install
# 或
npm install

# 启动服务
npm run dev
```

## Credits
[github-readme-stats](https://github.com/anuraghazra/github-readme-stats)
