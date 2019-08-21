# 说明

[源项目](https://github.com/formulahendry/vscode-mysql)

根据惟快的开发特点，修改 vscode-mysql 这个插件，在连接数据库之后，看查询数据库数据，可直接将数据表名、字段名插入代码中

# 安装

已构建的安装包放置于 package 目录 , 在终端执行
```
code --install-extension package/vscode-mysql-0.4.1.vsix
```

安装完成之后，重启vs code，EXPLORER 下即可看见 MYSQL一项，默认使用环境变量连接，环境变量设置与惟快一致(SUPERMODEL_DB_NAME ....)

没设置环境变量的，可手动添加数据库连接信息
