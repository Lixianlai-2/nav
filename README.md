#### [语雀博客](https://www.yuque.com/nfcjg/zxhkvw/ty4u98)

<a name="lLblp"></a>

#### PC 端实现功能

1. 当用户悬停时，出现删除按钮
1. 添加网站
1. 删除网站
1. 键盘导航
   1. 当用户按下的按钮和网站的字母 logo 相同时，直接进入相应网页
      <a name="IbGx4"></a>

#### 手机端实现功能

1. 宽度 500px 以下自适应
   1. 没有设置 ipad
2. 长按 2 秒后出现删除按钮
   1. 待完善，删除一个网站后，再次长按无法出现删除按钮
      <a name="VDF6h"></a>

#### Parcel 的复用

1. 添加 package.json`npm init -y`
2. 处理无法 build 的问题
   1. 删除了 main.js 就 OK 了
3. 重新设置 scripts

```javascript
"scripts": {
    "start": "parcel src/index.html -p 3000 --open",
    "build:parcel": "parcel build ./src/index.html --public-url ./ --no-source-maps",
    "build": "npm run clean && npm run build:parcel",
    "clean": "rm -rf dist/*"
  }
```

<br />
