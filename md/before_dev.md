# 开发准备

本章为大家介绍，dapp开发者需要掌握的技能，开发的硬件设施等。总体来说entanmo官方尽量给大家最完善的服务，让开发人员只专注业务逻辑，完成好功能的开发即可。

* [1.介绍](#1介绍)
	* [1.1 entanmo组件版本](#11-entanmo组件版本)
	* [1.2 etm-vm功能](#12-etm-vm功能)
	* [1.3 开发语言要求](#13-开发语言要求)
	* [1.4 entanmo使用数据库（sqlite）介绍](#14-entanmo使用数据库sqlite介绍)
	* [1.5 开发系统要求](#15-开发系统要求)
	* [1.6 其他要求](#16-其他要求)
* [2.开发环境准备](#2开发环境准备)
	* [2.1 linux安装相关环境](#21-linux安装相关环境)
	* [2.2 windows安装相关环境（极其不推荐）](#22-windows安装相关环境极其不推荐)
	* [2.3 docker安装相关环境](#23-docker安装相关环境)
	* [2.4 一键安装相关环境](#24-一键安装相关环境)
* [3.钱包使用](#3钱包使用)
* [4.etm-cli介绍](#4etm-cli介绍)


### 1.介绍
#### 1.1 entanmo组件版本
| 组件        | version           |
| ------------- |:-------------:| 
| entanmo主链      | preview-1.0.0 | 
| 侧链      | preview-1.0.0      | 
| etm-cli | preview-1.0.0      |
| wallet | preview-1.0.0      | 

#### 1.2 etm-vm功能
etm-vm是entanmo官方给开发者提供的工具库。
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

MacOS（暂不支持）

可以安装js相关库的系统都可以支持，详情请见下节(2.x)。
#### 1.6 其他要求
命令行：entanmo提供各类工具以及命令，所以要求开发者具备命令行（shell）相关知识。
日志：entanmo有两大日志输出文件，一个是主链日志，一个是侧链日志，需要开发者能基于相关日志能查找相关问题。

-------------------
### 2.开发环境准备

#### 2.1 linux安装相关环境
**1.选择linux系统**

官方推荐版本：Ubuntu18.04

由于市面16.04版本居多，本文以16.04系统安装举例。
	
	//版本信息（阿里云服务器）
	Linux version 4.4.0-85-generic (buildd@lcy01-21) (gcc version 5.4.0 20160609 (Ubuntu 5.4.0-6ubuntu1~16.04.4) ) #108-Ubuntu SMP Mon Jul 3 17:23:59 UTC 2017
	
**2.安装库文件**
	
	//更新源
	sudo apt-get update
	//安装lib库
	sudo apt-get install curl sqlite3 ntp wget git libssl-dev openssl make gcc g++ autoconf automake python build-essential libtool libtool-bin -y

**3.安装nodejs**
	
	//获取安装脚本并执行
	curl -sL https://deb.nodesource.com/setup_8.x | sudo -E bash -
	//安装
	sudo apt-get install nodejs -y

**4.修改配置**

修改config文件
	
	//主目录下文件
	-rw-rw-r--   1 wanglei wanglei   5229 Feb 15 22:24 app.js
	drwxrwxr-x   2 wanglei wanglei   4096 Feb 15 22:52 config
	drwxrwxr-x   2 wanglei wanglei   4096 Feb 15 22:24 dapps
	drwxrwxr-x   2 wanglei wanglei   4096 Feb 15 22:52 data
	drwxrwxr-x   2 wanglei wanglei   4096 Feb 15 22:38 logs
	drwxrwxr-x 384 wanglei wanglei  12288 Feb 15 22:34 node_modules
	-rw-rw-r--   1 wanglei wanglei 126339 Feb 15 22:34 package-lock.json
	-rw-rw-r--   1 wanglei wanglei   1693 Feb 15 22:24 package.json
	drwxrwxr-x  12 wanglei wanglei   4096 Feb 15 22:24 src
	
	//如果是单机测试，请使用 config-personal.json 替换 config.json(同时也需要使用genesisBlock-personal.json 替换genesisBlock.json)
	cd config 
	mv config.json config.json.bk && mv config-personal.json config.json
	mv genesisBlock.json genesisBlock.json.bk && mv cgenesisBlock-personal.json genesisBlock.json

运行代码 `node app.js`
	
	> blockTick: []
	> debug 2019-02-15 14:48:05 762 blocks.js:1040 apply block ok
	> debug 2019-02-15 14:48:05 762 blocks.js:1055 save block ok
	> -------------- round tick: 6
	> debug 2019-02-15 14:48:05 763 round.js:390 Round tick completed 	> { block:
   		{ 	
   			version: 0,
     		totalAmount: 0,
     		totalFee: 0,
     		reward: 600000000,
     		payloadHash: 			'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
     		timestamp: 10896486,
     		numberOfTransactions: 0,
     		payloadLength: 0,
			previousBlock:'32c53caeef675cea5dd0acf7a30709d4acfbaafdda06b8743b0f869b9a8eb570',
     		generatorPublicKey: '99e5d86cc35cc31d3be8ec4e4a296b080820d396a875fad2bd60e17201bf4dc5',
     		blockSignature: '591948fccf06b180d6c001f8706518c07e65317267cdbf500dfc656dfeb173de5c3b5ddf7bb5d34fc108321376edf736dca3f991a1b2b2adffdfa047f383790b',
     		id: 'b40c48deaeb23b7cedd59515e8665f7b347aa86f565a21cbd53283365ec3237a',
     		height: 6 
     	} 
    }
	> info 2019-02-15 14:48:05 764 blocks.js:962 Block applied correctly 	with 0 transactions
	> log 2019-02-15 14:48:05 764 blocks.js:1468 Forged new block id: 	b40c48deaeb23b7cedd59515e8665f7b347aa86f565a21cbd53283365ec3237a 	> height: 6 round: 1 slot: 3632162 reward: 600000000
	> [transport] 3s boardcast tr count: 0

如果本机只是做为测试使用，可以修改./config/miner-cfg.json 将该选项关掉	

	//修改成false
	"enableGPU": true 


**5.运行成功**

运行成功后区块高度会不停的变化。

	> height: 6 round: 1 slot: 3632162 reward: 600000000
	> [transport] 3s boardcast tr count: 0


**6.其他Linux系统**
对于其他linux系统，其实只要lib安装好，都是可以很方便的运行的。

#### 2.2 windows安装相关环境（极其不推荐）
**1.不推荐windows系统**

由于entanmo使用了C++编译工具，做过C++开发的同学都知道，在windows上安装C++编译环境是非常繁琐，而且安装失败很难清除，所以强烈建议使用mac或者linux系统。

不推荐也得给大家安装一个～

**2.安装nodejs**

在[nodejs](https://nodejs.org/en/download/)官网下载指定版本，点击安装即可

**3.安装node-gyp**

这一步比较麻烦

简单步骤（如果大家时间比较多，网速比较好）
	
	//请以管理员的身份运行命令后
	npm install --global --production windows-build-tools
	//等着就行了

复杂步骤（如果大家时间宝贵，[参考](https://www.jianshu.com/p/2b831714bbff)）

	//下载Microsoft Build Tools 2015
	https://www.microsoft.com/en-us/download/details.aspx?id=48159
	
	//下载安装 python2.7
	https://www.python.org/
	
	//配置
	npm config set python python2.7
	npm config set msvs_version 2015


**4.安装sqlite3**
	
	//下载文件
	https://www.sqlite.org/2018/sqlite-dll-win32-x86-3260000.zip
	https://www.sqlite.org/2018/sqlite-tools-win32-x86-3260000.zip
	
解压两个文件夹

将dll（其中一个文件夹）文件移动到sqlite3.exe（另一个文件夹）文件夹中

将含有sqlite3.exe的文件夹路径加入path中

**5.验证安装是否成功（参考linux验证）**

不建议大家使用windows，但是这里还有一种比较简单的方式，官方给打包好的程序，一键运行。

#### 2.3 docker安装相关环境
可以参考本组织另外[一个库](https://github.com/etm-dev/etm-dev-docker)
需要注意的是修改相关配置，才能运行

	//一个命令搞定（如果配置正确）
	docker run -it --rm --name etm-dev -v $(pwd):/etm -p 4096:4096 ray0523/etm_base /bin/bash -c "npm install https://github.com/entanmo/etm-js.git https://github.com/entanmo/etm-vm.git && npm install && node app.js"
	//如果配置不正确，进入docker环境，此镜像已经安装好了lib，然后重复mac的验证过程即可
	docker run -it --rm --name etm-dev -v $(pwd):/etm -p 4096:4096 ray0523/etm_base /bin/bash
	
#### 2.4 一键安装相关环境

[参考](https://github.com/entanmo/etm/blob/testNet/README.zh-CN.md)

**ubuntu**

	wget http://www.entanmo.com/download/entanmo-ubuntu.tar.gz
	tar zxvf entanmo-ubuntu.tar.gz
	cd entanmo

运行：
	
	./entanmod configure 
	./entanmod start	

**windows**
	
	//下载解压
	http://www.entanmo.com/download/entanmo-windows.zip

运行：
	
	./entanmod.bat start	

命令解释：
	
	start: 在前台启动节点系统，此时控制台(终端)会被节点系统进程独占
	start_daemon: 在后台启动节点系统，此时控制台(终端)不会被节点系统独占
	stop: 停止后台运行的节点系统
	restart: 前台重启节点系统
	restart_daemon: 后台重启节点系统
	status: 查看节点系统是否启动
	

--------------

### 3.钱包使用

clone钱包代码：

	git clone  -b dev2.0 https://github.com/entanmo/etm-wallet.git

修改配置：
	
	cd etm-wallet
	vi config/dev.env.js 
		BASE_API:'"https://xxx.xxx.xxx.xx:4096"'//修改ip地址为本地etm主链ip端口

编译运行：
	
	npm install //安装库文件
	npm run dev //运行
	-----------------------------------------------------------------
	//or docker运行
	docker run -d --name etm-wallet -w /etm -v $(pwd):/etm -p 8080:8080 node /bin/bash -c "npm install && npm run dev"
	
验证：
	
	访问http://0.0.0.0:8080 显示钱包网页，即为编译成功

新建账号：
	
	1.进入钱包首页
	2.点击新建账号
	3.按照要求完成注册（牢记密钥）
	4.牢记密钥
	5.牢记密钥
	6.牢记密钥
	7.登录
	8.个人中心查看钱包地址（类似：ANZccyU3CFJSmS2bfC5MRneoaCzAXEK5ki）
	
	or：
	//下一小节会讲到etm-cli命令行工具
	etm-cli crypto -g 

获取私链代币：

一般新建账号是没有代币的，如果是新启动的私链，entanmo官方为开发者创建了一个超级账号，该账户中有非常多的代币，还有就是config/config.json中101个出块节点是有代币的：
	
	//可以在config/config.json中查看101个出块节点私钥
	...
	"forging": {
    "secret": [
      "run sheriff differ lonely turn asset remain gorilla shine magic wing remember",
      "moon become interest business ability work fetch stock soldier inmate hen trim",
      "bottom poverty escape desk employ jar produce whisper wasp ensure resource rotate",
      "belt among attract burger border win timber reason flag length caught glue",
      "when move electric method unique aerobic odor era brush horse fly cute",
      "level coach sort sausage submit utility debris concert morning canal various measure",
      "bench track angle error blood illness curtain input this shoulder disease sand",
      "still leisure gold cream unfold saddle way slot immune spray address still",
      "erase express pioneer side announce liberty carbon volcano apart life practice visit",
      "congress square glory convince hospital language rate sadness blue fame man battle",
      "retire virus concert prison exotic unhappy toward rebel receive wide sleep drift",
      "exact gas judge doll nasty hospital punch physical library cluster lab level",
      "enact melt usual tumble result unfair waste fat lawsuit paddle baby gasp",
      ...

--------------

### 4.etm-cli介绍
下载安装etm-cli
	
	//clone代码
	git clone https://github.com/etm-developer/etm-cli.git
	//安装库文件
	cd etm-cli && npm install 
	//将目录下的bin目录设置到path环境下
	set xx/xx/etm-cli/bin to path //伪代码，根据不同系统设置不同


使用(etm-cli -h)

	etm-cli [options] [command]
	options:
		-V, --version                          版本号
    	-H, --host <host>                      指定host(default: 127.0.0.1)
    	-P, --port <port>                      指定端口(default: 4096)
    	-M, --main                             Specify the mainnet, default: false
    	-h, --help                             帮助
    
    command:
    	getheight                              get block height
    	getblockstatus                         get block status
    	openaccount [secret]                   open your account and get the infomation by secret
    	openaccountbypublickey [publickey]     open your account and get the infomation by publickey
    	getbalance [address]                   get balance by address
    	getaccount [address]                   get account by address
    	getvoteddelegates [options] [address]  get delegates voted by address
    	getdelegatescount                      get delegates count
    	getdelegates [options]                 get delegates
    	getvoters [publicKey]                  get voters of a delegate by public key
    	getdelegatebypublickey [publicKey]     get delegate by public key
    	getdelegatebyusername [username]       get delegate by username
    	getblocks [options]                    get blocks
    	getblockbyid [id]                      get block by id
    	getblockbyheight [height]              get block by height
    	getpeers [options]                     get peers
    	getunconfirmedtransactions [options]   get unconfirmed transactions
    	gettransactions [options]              get transactions
    	gettransaction [id]                    get transactions
    	sendmoney [options]                    send money to some address
    	sendasset [options]                    send asset to some address
    	registerdelegate [options]             register delegate
    	listdiffvotes [options]                list the votes each other
    	upvote [options]                       vote for delegates
    	downvote [options]                     cancel vote for delegates
    	setsecondsecret [options]              set second secret
    	registerdapp [options]                 register a dapp
    	deposit [options]                      deposit assets to an app
    	dapptransaction [options]              create a dapp transaction
    	lock [options]                         lock account transfer
    	getfullblockbyid [id]                  get full block by block id
    	getfullblockbyheight [height]          get full block by block height
    	gettransactionbytes [options]          get transaction bytes
    	gettransactionid [options]             get transaction id
    	getblockbytes [options]                get block bytes
    	getblockpayloadhash [options]          get block bytes
    	getblockid [options]                   get block id
    	verifybytes [options]                  verify bytes/signature/publickey
    	contract [options]                     contract operations
    	crypto [options]                       crypto operations
    	dapps [options]                        manage your dapps
    	creategenesis [options]                create genesis block
    	peerstat                               analyze block height of all peers
    	delegatestat                           analyze delegates status
    	ipstat                                 analyze peer ip info

使用方式：

	etm-cli -H xxx.xxx.xxx.xxx -P 8096 getheight //ip 端口是主链的ip端口
	> 56110
	etm-cli -H xxx.xxx.xxx.xxx -P 8096 getblockstatus
	> {
  	>	  "success": true,
  	>	  "height": 56113,
  	>	  "fee": 10000000,
  	>	  "milestone": 0,
  	>	  "reward": 300000000,
  	>	  "supply": 10016816200000000
	> }

	
下一章讲合约的时候会用到更多的命令，这里就不一一列举，大家先对这个命令工具有一个大致的了解即可。

---------------------
下一章：[智能合约开发](./smart_contract.md)

