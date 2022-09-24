# SteamCard

- [User Guide Page](https://guide.yuy1n.io/)

<p align='center'>
<b>English</b> | <a href="https://github.com/yuyinws/steam-card/blob/master/README-CN.md">简体中文</a>
</p>

**Generate Your Steam Proflle Quickly**

![img](https://card.yuy1n.io/card/76561198028121353/en)

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

### Keyword Setting

Cards can be personalized by passing keywords in the URL

| Keyword              | Category   | Feature                |
| -------------------- | ---------- | ---------------------- |
| **dark**(default)    | theme      | Use dark theme         |
| **light**            | theme      | Use light theme        |
| **badge**            | icon       | Show badge icon        |
| **group**            | icon       | Show group icon        |
| **artworks**         | statistics | show artwork count     |
| **screenshots**      | statistics | show screenshot count  |
| **reviews**          | statistics | show review count      |
| **guides**           | statistics | show guide count       |
| **zh-CN**（default） | language   | Use Simplified Chinese |
| **en**               | language   | Use English            |

> Dark theme and Simplified Chinese is default setting

### Example case

#### Use English

`https://card.yuy1n.io/card/76561198028121353/en`

![](https://card.yuy1n.io/card/76561198028121353/en)



#### Show badge and group icon

`https://card.yuy1n.io/card/76561198028121353/en,badge,group`

![](https://card.yuy1n.io/card/76561198028121353/en,badge,group)

#### Use light theme

`https://card.yuy1n.io/card/76561198028121353/en,badge,group,light`

![](https://card.yuy1n.io/card/76561198028121353/en,badge,group,light)

### Use URL

- HTML

```html
<img width="400" height="140" src="https://card.yuy1n.io/card/76561198028121353"></img>
```

- Markdown

```markdown
![](https://card.yuy1n.io/card/76561198028121353)
```

- BBCode

```bbcode
[img=400,140]https://card.yuy1n.io/card/76561198028121353[/img]
```

## Develop

> Requirement:
>
> **Node >=16**
>
> **[Steam Api Key](https://steamcommunity.com/dev/apikey)**

### Install Vercel Cli

```shell
npm install -g vercel
```

> Please checkout [offical docs](https://vercel.com/cli) about Vercel Cli

### Fork this project

### Local development

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
vercel dev
```

#### Set Proxy

> If you can only access Steam websites via VPN,you may need set Proxy in .env file like this

```shell
PROXY_HOST=localhost
PROXY_PORT=7890
MODE=development
```

## Thanks
[github-readme-stats](https://github.com/anuraghazra/github-readme-stats)

[Vercel](https://vercel.com/)
