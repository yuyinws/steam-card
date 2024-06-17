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
<a href="https://card.yuy1n.io/">
<img src="https://api.netlify.com/api/v1/badges/26879726-2f6e-49e2-8abe-550512e9095c/deploy-status"></img>
</a>
</p>

<p align="center">
<a href="https://hub.docker.com/r/lyc575757/steam-card">
<img src="https://img.shields.io/badge/docker-%230db7ed.svg?style=for-the-badge&logo=docker&logoColor=white"></img>
</a>
<p>

## 🔥 Features
- **Dynamic**: The card content will be dynamically generated according to your Steam status.
- **User Friendly**: Generate your Steam card on [Online Config Page](https://card.yuy1n.io)
- **i18n**: Support multiple languages (PR Welcome for more language)
- **Customizable**: Support more than 10 Custom items.
- **Deployable**: Support deploy it with `Vercel`, `Netlify`, `Railway` or `Docker`.

## 📦 Deployment  

> **Note** 
> Card information will be automatically update every 24 hours. If your want a shorter update time, deploy it by your self.

**Environment Variables**

| Name      | Description | Example |
| ----------- | ----------- | ----------- |
| NUXT_STEAM_KEY      | [Steam Api Key](https://steamcommunity.com/dev/apikey) | 5B23D7ECExxxxxxB58C57BC242 |
| NUXT_CACHE_TIME   | request cache time (second)| 3600 |

### PaaS

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyuyinws%2Fsteam-card&env=NUXT_STEAM_KEY,NUXT_CACHE_TIME)

[![Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yuyinws/steam-card)

[![Deploy on Railway](https://railway.app/button.svg)](https://railway.app/template/ajXBZ6?referralCode=fpKTNq)

[![Deploy on Zeabur](https://zeabur.com/button.svg)](https://zeabur.com/templates/JREX1V)

### Docker

```shell
docker pull lyc575757/steam-card
```

```shell
docker run -d \
-e NUXT_STEAM_KEY=5B23D7ECE730xxxxxxxxx57BC242 \
-e NUXT_CACHE_TIME=3600 \
-p 3000:3000 \
lyc575757/steam-card
```

## ⚒️ Develop

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
NUXT_STEAM_KEY=YOUR_STEAM_KEY
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

## ❤️ Credits
Inspired by [github-readme-stats](https://github.com/anuraghazra/github-readme-stats)
