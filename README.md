<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/yuyinws/static@master/2022/10/upgit_20221022_1666452661.svg">
</p>


<p align='center'>
<b>English</b> | <a href="https://github.com/yuyinws/steam-card/blob/master/README-CN.md">简体中文</a>
</p>

<p align="center">
<a href="https://card.yuy1n.io" style="font-size:20px">Online Config Page</a>
</p>
<p align="center">
  <a href="https://card.yuy1n.io">
		<img src="https://card.yuy1n.io/card/76561198028121353/en"/>
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

## Features

- **Dynamic Generation**: The card content will be dynamically generated according to your Steam status.
- **Rich Content**: `Icon`, `Online Status`, `Statistics`, `Played Time` and more.
- **Customizable**: **10+** Custom items.
- **Deployable**: The project can be deployed autonomously on multiple platforms.

## Deployment

> **Note** 
> Card information will be cached for 24 hours. If you want a shorter card information update time, you can try to deploy the project yourself.

**Environment Variables**

| Name      | Description | Example |
| ----------- | ----------- | ----------- |
| STEAM_KEY      | [Steam Api Key](https://steamcommunity.com/dev/apikey) | 5B23D7ECExxxxxxB58C57BC242 |
| CACHE_TIME   | request cache time (second)| 3600 |

### PaaS

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyuyinws%2Fsteam-card&env=STEAM_KEY,CACHE_TIME)

[![Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yuyinws/steam-card)

> In theory, you can deploy this project on all [Nuxt3](https://v3.nuxtjs.org/getting-started/deployment/#supported-hosting-providers) supported platform

### Docker

`docker pull lyc575757/steam-card`

## Develop

> Requirement:
>
> **Node >=16**
>
> **[Steam Api Key](https://steamcommunity.com/dev/apikey)**

```shell
# copy a .env file
cp .env.example .env
```

Add your Steam API KEY on .env file
```shell
STEAM_KEY=YOUR_STEAM_KEY
```

```shell
# install dependencies
pnpm install 
# or
yarn install
# or
npm install

# start the service
npm run dev
```

## Credits
Inspired by [github-readme-stats](https://github.com/anuraghazra/github-readme-stats)
