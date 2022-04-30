# vue-gameApp
vue+nodejs+mongodb<br>
游戏平台的后台管理加用户平台<br>
服务端，用户端，后台管理端三端协作，实现后台录入数据，客户端动态显示
## 安装所需依赖模块
```
npm install
```

## 运行（分别在web admin server中）
```
npm run serve
```

## 打包
```
npm run build
```
## 初次登录
在admin后台管理平台-系统管理-新建管理员，输入任意用户名和密码，保存，自动跳转登录页。登陆后可查看各数据列表。

## 数据录入
登陆后在管理员界面-系统管理-新建分类中添加如图分类（大类必须为“新闻资讯”，“英雄列表”），再在“新建文章”，“新建英雄”中添加文章、英雄的详细信息
![image](https://user-images.githubusercontent.com/96785394/166107086-dec792a3-36cf-4e18-9fc0-90cffa8ee594.png)
即可在客户端有如下效果
![image](https://user-images.githubusercontent.com/96785394/166107285-fa7eb485-355f-499a-960b-bfcd16e45656.png)
