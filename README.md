# cookbook-nodejs

《Node.js开发指南》中博客例子的express4+实现。

- express ~4.13.0

/models/demo3~5 是三到五章的例子
项目整体是完整的博客例子

## seed生成nodejs+express基础框架

我用的是webstorm默认的node+express架子，模板ejs，原生css；当然也可以用yeoman，或者手动搭建。

搭建好了`npm install` 安装依赖，之后`npm start` 启动看下是否正常。

## 设计

### 界面设计

使用了Bootstrap，将依赖的js、css、图片放到public的相应目录下

页面模板放到views下，主要包括以下：
* layout    默认的布局页面
* index     主页
* reg       注册页
* login     登录页
* say       发表页

主要的就是这些，其他的页面边做边说

### 路由设计
* GET      /            ->  首页
* GET      /reg         ->  注册页
* POST     /reg         ->  注册
* GET      /login       ->  登录页
* POST     /login       ->  登录
* GET      /logout      ->  登出
* POST     /post        ->  发言
* GET      /u/:user     ->  获得用户

这是个小demo，所有的路由都放在routes/index.js里，实现这些路由的空方法。

### Model设计

* Post 发表的说说
* User 用户

## 实现功能

### layout布局框架，以及主页（一）

![layout布局](https://github.com/nail2008/cookbook-nodejs/raw/master/doc/image/layout.jpg)

在layout界面中,包含顶部导航栏和下边可替换的页面。

在index中，上部为欢迎信息和登录、注册按钮，下部为说说内容展示。

我们首先实现layout的导航栏，和index的欢迎页。

对顶部导航栏中根据当前用户是否存在判断显示 **登录/注册** 还是显示 **登出**

启动服务，并没有看到顶部导航栏，express4以后你需要这样用partials

在app.js加入以下代码（当然要先 npm install express-partials --save）

```javascript
    var partials = require('express-partials'); 
    app.use(partials()); 
```

### mongodb数据库
在settings.js中加入数据库配置
```javascript
    module.exports = {
        db:'blog',
        host:'localhost'
    };
```
创建数据库工具模块/models/db.js

### 实现User、Post Model

后续添加单元测试

### 会话支持

    connect-mongo
    
    var cookieParser = require('cookie-parser');
    
    var session = require('express-session');
    
    var MongoStore = require('connect-mongo')(session);
    
    var flash = require('connect-flash');
    
    app.use(session({
        secret: settings.cookieSecret,
        store: new MongoStore({
            db: settings.db
        })
    }));
    
    app.use(function (req, res, next) {
        console.log("app.usr local");
        res.locals.user = req.session.user;
        res.locals.post = req.session.post;
    });


### 用户注册

实现路由 GET /reg 调转到注册页面

实现注册页面reg.ejs

实现路由 POST /reg 注册

    加入models依赖，md5依赖crypto

    先实现保存的基本功能，再实现密码一致性校验，用户名唯一性校验，实现通知栏功能（在layout上）

实现通知栏功能：

在app.js上添加如下代码支持；

在layout上实现显示；

然后要在GET / 路由中初始化success和error；

最后要注意connect-flash依赖`cookie-parser`和`express-session`中间件以及session功能的实现。
```javascript
    var flash = require('connect-flash');
    app.use(flash());    
    app.use(function (req,res,next) {
      var error = req.flash('error');
      res.locals.error = error.length ? error : null;    
      var success = req.flash('success');
      res.locals.success = success.length?success:null;
      next();
    });    
```

```html
    <!-- layout 页面-->
    <% if (success) { %>
    <div class="alert alert-success">
        <%= success %>
    </div>
    <% } %>
    <% if (error) { %>
    <div class="alert alert-error">
        <%= error %>
    </div>
    <% } %>
```

### 用户登入、登出
实现路由中处理方法，跟页面中的代码，比较简单。


### 页面的访问控制，checkNotLogin，layout布局框架，以及主页（二）
用checkNotLogin方法来校验当前路由没有session，而用checkLogin来校验当前路由已经登录。注意next的作用。
```javascript    
    function checkLogin(req, res, next) {
      if (!req.session.user) {
        req.flash('error', '未登入');
        return res.redirect('/login');
      }
      next();
    }
    function checkNotLogin(req, res, next) {
      if (req.session.user) {
        req.flash('error', '已登入');
        return res.redirect('/');
      }
      next();
    }
```    
而在需要控制的路由之前，先运行校验方法，如下：
```javascript
    router.get("/login",checkNotLogin);
    router.get('/login', function (req, res, next) {//...});
```
由于同名路由的处理方法会安装前后顺序执行最前的，如果前面的处理里没有next(),则后面的就 **不会执行** 。
所有有了next()，我们实现了类似filter的效果。

### 发表微博

首页上的控制，用户登录后，首页显示say页面

在index.ejs上当没有user时显示
```html    
    <%- partial('say') %>
```

实现POST /post 路由


### 微博 首页展示
显示在index.ejs底部：
```html  
    <%- partial('posts', {posts:posts}) %> 
```
实现posts.ejs
实现GET /u/:user

### favicon
```javascript
    var favicon = require('serve-favicon');
    app.use(favicon(path.join(__dirname, 'public', 'favicon.png')));//serve-favicon
    app.listen(3000);//serve-favicon 
```















