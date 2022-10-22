<p align="center">
  <img src="https://cdn.jsdelivr.net/gh/yuyinws/static@master/2022/10/upgit_20221022_1666410714.svg">
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


## Usage

> Please make sure your steam profile in public state

### Find your own Steamid

1.[Login](https://steamcommunity.com/login/home/) steam and go to your profile page

2.Now your will see a URL like this：

```
https://steamcommunity.com/profiles/76561198028121353/
```

If your not use custom url，the number is your steamid

3.If your use custom url，add  `?xml=1` in your custom url , like this:

```
https://steamcommunity.com/profiles/CUSTOM_URL/?xml=1
```

4.Node`steamID64`is your steamid

## Deployment

If you want to deploy this project by yourself. You need prepare a **[Steam Api Key](https://steamcommunity.com/dev/apikey)** first. And Then click one of the buttons below.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fyuyinws%2Fsteam-card&env=STEAM_KEY&envDescription=YOUR_STEAM_KEY&envLink=https%3A%2F%2Fsteamcommunity.com%2Fdev%2Fapikey)

[![Netlify](https://www.netlify.com/img/deploy/button.svg)](https://app.netlify.com/start/deploy?repository=https://github.com/yuyinws/steam-card)

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
[github-readme-stats](https://github.com/anuraghazra/github-readme-stats)
