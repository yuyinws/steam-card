<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/yuyinws/static@master/2022/10/upgit_20221022_1666452627.svg">
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

<p align="center">
<a href="https://card.yuy1n.io">
<img src="https://therealsujitk-vercel-badge.vercel.app/?app=steam-card"></img>
</a>
<a href="https://netlifycard.yuy1n.io/">
<img src="https://api.netlify.com/api/v1/badges/26879726-2f6e-49e2-8abe-550512e9095c/deploy-status"></img>
</a>
</p>


## 特性

- 动态生成: 卡片内容会根据你的Steam状态动态生成
- 内容丰富: 图标，主题，在线状态，统计数据，游玩时长...
- 可定制化: 10+定制项
- 可部署: 可以在多个平台自主部署该项目

## 部署

> **Note** 
> 卡片信息会有24小时的缓存，如果你想要更短的卡片信息更新时间，可以尝试自己部署该项目。

**环境变量**

| 名称      | 描述 |
| ----------- | ----------- |
| STEAM_KEY      | [Steam Api Key](https://steamcommunity.com/dev/apikey) |
| CACHE_TIME   | 请求缓存时间        |

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyuyinws%2Fsteam-card&env=STEAM_KEY,CACHE_TIME)

[![Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yuyinws/steam-card)

> 理论上你可以在所有[Nuxt3](https://v3.nuxtjs.org/getting-started/deployment/#supported-hosting-providers) 支持的平台部署此项目.

## 开发

> **Note** 
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
灵感来自[github-readme-stats](https://github.com/anuraghazra/github-readme-stats)
