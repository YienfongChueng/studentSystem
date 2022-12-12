# vue2-demo

## 接口文档访问
1、接口文档地址：https://www.showdoc.com.cn/jinducasey/8309315750606740
2、接口文档访问密码：jinduVIP
3、本系统登录页的账户名和密码未设定死值，符合校验规则即可。

## 分数地图资源
分数地图资源：[http://192.144.199.210:8080/editor/index.html?chart_id=7Ph0yZtNoJ1JhGDl]

## Nginx部署项目
1、yarn build打包Vue项目 2、打开nging.conf文件,配置对应的信息
```
# nginx.conf
location / {
    root   C:\Users\17542\Desktop\project-v2\dist;
    index  index.html index.htm;
    try_files $uri $uri/ @router; # 解决页面刷新404问题
}

location @router {
    rewrite ^.*$ /index.html last; # Vue项目路由不是真实存在的
}
```
2、检查配置文件是否配置成功
```
nginx -t -c (nginx.conf位置目录)
start nginx # 运行nginx
```
## 启动
```
yarn serve
```
### 打包
```
yarn build
```
