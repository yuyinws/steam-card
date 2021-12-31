# SteamCard

> 快速生成自己的steam资料卡

## 使用

### 找到自己的steamid

1.登录网页steam，进入个人主页。

2.这是你会看到类似一个[https://steamcommunity.com/profiles/XXXXXXXX/](https://steamcommunity.com/profiles/76561198340841543/)的链接，如果你没有使用自定义URL，后面的一串数字就是你的steamid

3.如果你使用了自定义URL，在你的自定义URL后面加上'?xml=1',类似这样[https://steamcommunity.com/profiles/your\_](https://steamcommunity.com/profiles/76561198340841543/)*[custom\_domain](https://steamcommunity.com/profiles/76561198340841543/)*[/](https://steamcommunity.com/profiles/76561198340841543/)?xml=1

4.\<steamID64>\</steamID64>标签里的就是你的steamid

### 生成链接

HTML

```html
<img src="https://card.yuyinws.top/card?steamid=<yoursteamid>"></img>  
```

Markdown

``` markdown
![](https://card.yuyinws.top/card?steamid=<yoursteamid>)
```

论坛/BBS
```
[img=400,120]http://www.steamsignature.com/status/polish/76561198340841543.png[/img]
```
