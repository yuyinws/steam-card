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

<p align="center">
<a href="https://hub.docker.com/r/lyc575757/steam-card">
<img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"></img>
</a>
<p>


## 🔥 特性

- **动态生成**: 卡片内容会根据你的Steam状态动态生成
- **用户友好**: 通过[在线配置页面](https://card.yuy1n.io)生成你的Steam资料卡片
- **国际化**: 支持多种语言
- **可定制化**: 超过10项的可定制化项目
- **可部署**: 支持以`Vercel`, `Netlify`或者 `Docker`方式部署

## 📦 部署

> **Note** 
> 卡片信息会有24小时的缓存，如果你想要更短的卡片信息更新时间，可以尝试自己部署该项目。

**环境变量**

| 名称      | 描述 | 示例 |
| ----------- | ----------- | ----------- |
| STEAM_KEY      | [Steam Api Key](https://steamcommunity.com/dev/apikey) | 5B23D7ECExxxxxxB58C57BC242 |
| CACHE_TIME   | 请求缓存时间(秒)  | 3600 |

### PaaS

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyuyinws%2Fsteam-card&env=STEAM_KEY,CACHE_TIME)

[![Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yuyinws/steam-card)

> 理论上你可以在所有[Nuxt3](https://v3.nuxtjs.org/getting-started/deployment/#supported-hosting-providers) 支持的平台部署此项目.

### Docker

`docker pull lyc575757/steam-card`

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
