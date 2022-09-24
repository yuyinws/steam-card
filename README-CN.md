# SteamCard

- [用户指南](https://guide.yuy1n.io/)

<p align='center'>
<b>简体中文</b> | <a href="https://github.com/yuyinws/steam-card/blob/master/README-en.md">English</a>
</p>

**快速生成自己的 steam 资料卡**

![img](https://card.yuy1n.io/card/76561198028121353)

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

### 关键字配置

通过在URL中传递关键字，可以对卡片进行个性化配置

| 关键字              | 分类 | 作用           |
| ------------------- | ---- | -------------- |
| **dark**(默认值)    | 主题 | 使用深色主题   |
| **light**           | 主题 | 使用亮色主题   |
| **badge**           | 图标 | 显示徽章图标   |
| **group**           | 图标 | 显示群组图标   |
| **artworks**        | 统计 | 显示艺术作品数 |
| **screenshots**     | 统计 | 显示截图数     |
| **guides**          | 统计 | 显示指南数     |
| **reviews**         | 统计 | 显示评测数     |
| **zh-CN**（默认值） | 语言 | 显示简体中文   |
| **en**              | 语言 | 显示英文       |

> 深色主题和简体中文是默认开启的配置

### 使用示例

#### 不传递任何关键字

`https://card.yuy1n.io/card/76561198028121353`

![](https://card.yuy1n.io/card/76561198028121353)



#### 显示徽章和群组图标

`https://card.yuy1n.io/card/76561198028121353/badge,group`

![](https://card.yuy1n.io/card/76561198028121353/badge,group)

#### 使用亮色主题

`https://card.yuy1n.io/card/76561198028121353/badge,group,light`

![](https://card.yuy1n.io/card/76561198028121353/badge,group,light)

#### 指定语言

`https://card.yuy1n.io/card/76561198028121353/badge,group,light,en`

![](https://card.yuy1n.io/card/76561198028121353/badge,group,light,en)

### URL引用

- HTML

```html
<img width="400" height="140" src="https://card.yuy1n.io/card/76561198028121353"></img>
```

- Markdown

```markdown
![](https://card.yuy1n.io/card/76561198028121353)
```

- 论坛/BBCode

```bbcode
[img=400,140]https://card.yuy1n.io/card/76561198028121353[/img]
```

## 开发

>前置条件:
>
>**Node >=16**
>
>一个 **[Steam Api Key](https://steamcommunity.com/dev/apikey)**

### 全局安装 vercel Cli

```shell
npm install -g vercel
```

> 更多 Vercel Cli 的命令见[官方文档](https://vercel.com/cli)

### Fork 项目

### 本地调试

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
vercel dev
```

#### 配置代理

> 由于不可抗力，在中国大陆无法访问 Steam 相关域名。需要配置代理。

将.env 文件中的代理配置指向你本地的代理程序，以 Clash 为例

```shell
PROXY_HOST=localhost
PROXY_PORT=7890
# 为了与生产环境区分开，MODE必须要设置为development
MODE=development
```

## Thanks
[github-readme-stats](https://github.com/anuraghazra/github-readme-stats)

[Vercel](https://vercel.com/)
