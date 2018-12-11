## 开发准备
### 1.介绍
#### 1.1 entanmo组件版本
| 组件        | version           |
| ------------- |:-------------:| 
| entanmo主链      | preview-1.0.0 | 
| 侧链      | preview-1.0.0      | 
| etm-cli | preview-1.0.0      |
| wallet | preview-1.0.0      | 

#### 1.2 etm-vm功能
	TODO需要查看相关文档
#### 1.3 开发语言要求
entanmo区块链使用etm-vm虚拟机执行程序代码，让系统的兼容性更好。

目前，etm-vm上可以直接运行nodejs代码，所以最方便的开发方式，就是直接使用nodejs开发相关程序。

其他版本的js（TypeScript,ActionScript等等）都可以由第三方支持编写程序。
#### 1.4 entanmo使用数据库（sqlite）介绍
SQLite是一个C语言库，它实现了一个小型、快速、自包含、高可靠性、功能齐全的SQL数据库引擎。SQLite是世界上使用最多的数据库引擎。它内置于所有移动电话和大多数计算机中，并且捆绑在人们每天使用的无数其他应用程序中。它是一款轻型的嵌入式数据库，它占用资源非常的低，处理速度快，高效而且可靠。在嵌入式设备中，可能只需要几百K的内存就够了
由于entanmo对于性能以及资源的要求，所以选用sqlite是最好的选择。
#### 1.5 开发系统要求
**entanmo区块链支持以下环境**：

Centos 7

Ubuntu 16.04（Ubuntu 16.10推荐）

Ubuntu 18.04

MacOS Darwin 10.12及更高版本（建议使用MacOS 10.13.x）

可以安装js相关库的系统都可以支持，详情请见下节(2.x)。
#### 1.6 其他要求
命令行：entanmo提供各类工具以及命令，所以要求开发者具备命令行（shell）相关知识。
日志：entanmo有两大日志输出文件，一个是主链日志，一个是侧链日志，需要开发者能基于相关日志能查找相关问题。

-------------------
### 2.开发环境准备
#### 2.1 mac安装相应环境
**1.安装brew**

打开命令行，执行以下命令：
`/usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"`

**2.安装相关库**
``
	
	//更新
	brew update
	//安装8.x.x版本node
	brew install node@8
	//输出8.x.x 即为安装成功	或者npm -v
	node -v 
	//安装相关库文件
	brew install curl sqlite3 wget git openssl autoconf automake libtool libsodium
	//clone 代码
	git clone -b testNet https://github.com/entanmo/etm.git 
	//安装包以及编译运行
	cd etm && npm install && node app.js
	
	
``
**3.查看是否安装成功**

npm install 以后显示以下内容即为成功
![](../img/install_success-mac.png)

运行代码 `node app.js`
![](../img/node_app_error-mac.png)

修改./config/miner-cfg.json 如果是矿机挖矿是需要开启的
	
	//修改成false
	"enableGPU": true 

修改./config/config.json [参考](../img/config.json)

```
   ...
	"peers": {
    	"list": [
      		{                          //删除
        		"ip": "52.187.232.98",  //删除
        		"port":4096             //删除
      		}                          //删除
    	],
    ...
    "forging": {
    	"secret": [
    	//此处需要添加101个secret
    	],
    	"access": {
      		"whiteList": [
        		"127.0.0.1"
      		]
    	}
  	},
  	...

```

**运行成功**

![](../img/run_success.png)


