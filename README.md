# user-System

## Project setup

```
npm install
```

### Compiles and hot-reloads for development

```
npm run serve
```

### Compiles and minifies for production

```
npm run build
```

### Run your tests

```
npm run test
```

### Lints and fixes files

```
npm run lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

### 关于 mock 接口

### 登录:/user/login

{
"code": 2000, // 状态码
"flag": true,
"message": '验证成功',
"data": {
"token": "admin"
}
}

### 注销:/user/logout

{
"code": 2000, // 状态码
"flag": true,
"message": '退出成功'
}

### 信息核对:/user/info/{token}

{
"code": 2000,
"flag": true,
"message": "查询成功",
"data": {
"id": 10,
"cardNum": "test01", //大于 1000 的正整数
"name": "测试会员",
"birthday": "@date",
"phone|11": "@integer(0,9)", // 11 个位数字
"integral": "@integer(0, 500)",
"money": "@float(0, 100, 1, 3)", // 0-1000 小数,1-3 位小数位
"payType|1": ['1', '2', '3', '4'],
"address": "@county(true)"
}
}

### 菜单:/user/getMenu

{
"code": 2000, // 状态码
"flag": true,
"message": '菜单获取成功',
"data": {
"menu": [{
"icon": "el-icon-s-home",
"path": "/home",
"title": "首页",
"hasChildren": false
},
{
"icon": "el-icon-s-custom",
"path": "/member",
"title": "会员管理",
"hasChildren": false
},
{
"icon": "el-icon-s-goods",
"path": "/goods",
"title": "商品管理",
"hasChildren": false
},
{
"icon": "el-icon-user-solid",
"path": "/staff",
"title": "员工管理",
"hasChildren": false
},
{
"icon": "el-icon-s-shop",
"path": "/supplier",
"title": "供应商管理",
"hasChildren": false
}
]
}

}

### 会员地图标注-首页:/member/list/getAllMembers

{
"code": 2000,
"flag": true,
"message": "查询成功",
"data": {
"rows|25": [{
"id|+1": 10,
"longitude|117-120.5": 1, //大于 1000 的正整数
"latitude|29-33.5": 1,
"right|1": ['1', '2', '3'],
}],
}

}

### 会员查询-首页:/member/list/indexSearch

{
"code": 2000,
"flag": true,
"message": "查询成功",
"data": {
"rows|10": [{
"id|+1": 10,
"cardNum": "@integer(10000)", //大于 1000 的正整数
"name": "@cname",
"birthday": "@date",
"phone|11": "@integer(0,9)", // 11 个数字 0-9 间的数字
"integral": "@integer(0, 500)",
"money": "@float(0, 1000, 1, 3)", // 0-1000 小数,1-3 位小数位
"payType|1": ['1', '2', '3', '4'], // 4 选 其 1
"address": "@county(true)",
"right|1": ['1', '2', '3'],
"show": false
}],
"total|20-200": 200
}

}

### 员工查询:/staff/list/search

{
"code": 2000,
"flag": true,
"message": "查询成功",
"data": {
"rows|10": [{
"id|+1": 10,
"username|5": "@word(1)",
"name": "@cname",
"age": "@integer(0,120)",
"mobile|11": "@integer(0,9)",
"salary": "@float(8000, 20000, 1, 2)",
"entryDate": "@date"

    }],
    "total|20-200": 200

}

}

### 员工添加:/staff/add

{
"code": 2000, // 状态码
"flag": true,
"message": '新增成功',

}

### 员工修改:/staff/edit

{
"code": 2000, // 状态码
"flag": true,
"message": '修改成功',

}

### 员工删除:/staff/del

{
"code": 2000, // 状态码
"flag": true,
"message": '删除成功',

}
