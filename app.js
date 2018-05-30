/**
 * auth:黄国烨
 * miai:448249687@qq.com
 *desc:路由映射表（routes下主要用于跳转逻辑，此文件主要用于映射选择）
 * */
// var createError = require('http-errors');
// var express = require('express');
// var path = require('path');
// var cookieParser = require('cookie-parser');
// var logger = require('morgan');
//
// var indexRouter = require('./routes/index');
// var usersRouter = require('./routes/users');
//
// var app = express();
//
// // view engine setup
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');
//
// app.use(logger('dev'));
// app.use(express.json());
// app.use(express.urlencoded({ extended: false }));
// app.use(cookieParser());
// app.use(express.static(path.join(__dirname, 'public')));
//
// app.use('/', indexRouter);
// app.use('/users', usersRouter);
//
// // catch 404 and forward to error handler
// app.use(function(req, res, next) {
//   next(createError(404));
// });
//
// // error handler
// app.use(function(err, req, res, next) {
//   // set locals, only providing error in development
//   res.locals.message = err.message;
//   res.locals.error = req.app.get('env') === 'development' ? err : {};
//
//   // render the error page
//   res.status(err.status || 500);
//   res.render('error');
// });
//
// module.exports = app;
var bodyParser = require('body-parser');//json
var routes = require('./routes/index');//引入自己写的控制逻辑文件

//post解析函数（可复用的必用代码）
app.use(bodyParser.urlencoded({
    extended: true
}))

//自定义路由（在app.use的第二个参数中写工厂函数，若是可行则可以实现特殊功能）
app.use('/delete',routes.delete);//将删除逻辑与删除页面路径对应（访问nodejs时，系统先在app.js文件中寻找路径对应处理函数）
app.get('/update',routes.update);//修改初始化
app.post('/update',routes.doUpdate);//修改页面的post处理
app.get('/Insert',routes.insert);//添加初始化
app.post('/Insert',routes.doInsert);//添加处理函数
//初始路径请放到最下面
app.get('/',routes.login);//登录页面初始化
app.post('/',routes.doLogin);//登录验证

// view engine setup //用于将ejs模版的后缀改为html（据说是3版本后的写法）
app.set('views', path.join(__dirname, 'views'));//确定模版所在文件夹
app.engine('.html', require('ejs').renderFile);
app.set('view engine', 'html');