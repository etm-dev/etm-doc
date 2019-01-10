# 合约开发
简单地说，一个现实世界的合约是一个管理行动结果的协议，给定一组输入。合同的范围可以从正式的法律合同（例如，金融交易）到诸如游戏“规则”之类的简单实现。典型的行为可以是诸如资金转移（在金融合约的情况下）或游戏下注（在游戏合约的情况下）的事情。

entanmo智能合约定义了接口（操作，参数，数据结构）和实现接口的代码。代码被编译成规范的字节码格式，区块链存储合约的交易（例如，转账，游戏下注）。每一个智能合约都必须附有一份李嘉图合同，该合同定义了合同中具有法律约束力的条款和条件。

* 合约开发
	* [1.开始之前](#1开始之前)
	* [2.应用节点同步](#2应用节点同步)
		* [配置](#配置)
		* [同步数据](#同步数据)
	* [3.初始化](#3初始化)
	* [4.helloworld](#4helloworld)
	* [5.发币转币](#5发币转币)
	* [6.数据储存](#6数据储存)
	* [7.单节点运行与多节点运行](#7单节点运行与多节点运行)

### 1.开始之前
开始编写合约之前，大家一定保证看完前一章[开发前准备](./before_dev.md)，保证大家的测试主链已经运行起来，开始出块。

我们再来回顾下entanmo主链与侧链的关系，请看下图：
![](../img/sidechain1.png)

	1.主链与侧链出块数相互独立，但是只有主链出块，侧链才会出块（比如：主链出块10000，侧链可以从0开始出块）。
	2.侧链之间相互独立，各不影响。
	3.各个侧链之间的价值交换，需要通过主链完成。
	4.可以起无数条侧链，这也是第一章讲的侧链之间是合作共赢关系，可以无限横向拓展。

### 2.应用节点同步
一般entanmo出块节点是需要投票和挖矿来决定的，所以在现实情况中，我们一般只是充当一个应用节点，只同步数据，而此应用节点会维护自己的一条侧链（在多节点情况下，充当一个侧链的出块节点。）

#### 配置
假设出块节点ip为：xxx.xx.xx.xxx，端口4096，如果是测试主链（第一章已经可以知道如何搭建测试主链），端口就是config.json中的端口，ip就是本机ip。
	
#### 同步数据

*ps：如果大家闲麻烦，测试主链节点也可以当作应用节点完全可以不用再同步，即可跳过此步骤*

实际情况是出块节点与应用节点不是同一台电脑（也不推荐在出块节点上跑应用，测试当然是可以的）所以我们需要以下步骤。

	//clone 最新的entanmo代码 xxx 代表稳定release分支
	git  clone -b xxx https://github.com/entanmo/etm.git
	//修改配置
	"peers": {
   		"list": [
      		{"ip": "xxx.xx.xx.xxx", "port": 4096}
    	],
    	...
    }
 
参考[config.json](../img/config_sigle_node.json)

配置完成以后即可启动应用节点
	
	//可以参考第一章，启动主链，启动侧链也是一样的
	node app.js
TODO:缺少运行成功图片

### 3.初始化
	TODO
### 4.helloworld
ETM有三种网络类型，分别是localnet，testnet，mainnet，后两种是发布到线上的，可通过公网访问。下面对这三种网络做一个介绍：    

- localnet：运行在本地的、只有一个节点（101个受托人都配置在本地的config.json文件中）的私链，主要是为了方便本地测试和开发。locanet就是私有链。    
- testnet：ETM链公网测试环境，由多个服务器组成，具备完整的p2p广播、分布式存储等，在功能上跟mainnet一致，和mainnet的区别在于magic不同（可以理解为用于区分不同链的id，目前ETM testnet的magic为594fe0f3，mainnet的magic为：5f5b3cf5）    
- mainnet：ETM主网正式环境，这上面的ETM Token会在各大交易平台进行交易。    

Dapp的开发同样要涉及到这三种网络，即

- 第一步，在localnet开发、本地调试
- 第二步，在testnet测试
- 第三步，正式发布到mainnet，其他节点可以安装

#### 4.1 注册代理人账号
每个dapp都有独立的受托人，这些受托人也是默认的记账人，他们负责区块的生产，跨链资产的中转，与此同时可以获得交易手续费。     
注册dapp的时候，我们只需要收集受托人的公钥就行，为了权力分散，最好每个秘钥分别由一个人保管。     
这里为了演示，我们一次性创建5个账户，一个dapp最多有101个受托人，最少是5个。 

**注意：代理人账号是作演示用途，且不可用于正式的dapp中**    

```
// 注意这里的密码都是演示用途，且不可用于正式的dapp中
> etm-cli crypto -g

#　接下来输入 5 即可生成5个账户
[ { address: 'AijfU9bAE6Jpt5ve7zG3LoriDamH67eLb', // 地址
    secret: 'easy snap cable harvest plate tone planet yellow spot employ humble what', // 主密码，也叫一级密码，可以生成公钥和地址，实质为私钥的助记词，必须记录下来
    publicKey: 'a437a1d4bedf738e8620920ef29542644e3366c635b16fc9faa6f5db744bcd5c' },// 公钥，用于4.2章节配置受托人公钥
  { address: 'ABGGUL5D2SoBaQTqDMAb3u9RdUjYBcmRxx',
    secret: 'adjust edge exist hurry joke carbon spice envelope battle shuffle hawk thought',
    publicKey: '522cdc822d3bec74aa5c4e972ed6cba84850f9c4d521e43fe08675e9e4759bb9' },
  { address: 'AMg37s4avDUojJd6d3df7HPA3vqtRRwved',
    secret: 'survey spoil submit select warm chapter crazy link actual lonely pig grain',
    publicKey: '6ee3ae36166f69e8b9408d277486c9870f40c1b7c16016328737d6445409b99f' },
  { address: 'AL5p8BHzhCU3e5pkjMYbcjUSz771MrQcQr',
    secret: 'march struggle gap piece entry route kind pistol chunk spell honey summer',
    publicKey: 'ad558e44b347a54981295fcb5ee163c2915ca03536496129103e9d72c5025d69' },
  { address: 'A2WassKticpB7cx15RZfenBekthwmqXRXd',
    secret: 'response modify knife brass excess absurd chronic original digital surge note spare',
    publicKey: '6b2594ebeee9b072087e5f1e89e5c41ee2d73eb788b63abeedf5c04664f0ce5b' } ]
```
#### 4.2 生成dapp模版
应用模板包括注册dapp必须的元信息、创世块以及一个初始的目录结构

生成应用模板需要使用`dapps`子命令，如下所示

```
# 生成应用模板的时候，最好建立一个新目录
> mkdir etm-test-dapp && cd etm-test-dapp
> etm-cli dapps -a
```

接下来，我们要回答一系列的问题，以生成应用的注册信息与创世块

```
? Enter DApp name ETM-test-dapp
? Enter DApp description Demo of etm dapp
? Enter DApp tags etm,dapp,demo
? Choose DApp category Common
? Enter DApp link https://github.com/entanmo/ETM-test-dapp.zip
? Enter DApp icon url https://yourdomain.com/logo.png
? Enter public keys of dapp delegates - hex array, use ',' for separator //这里是4.1章节生存的5个受托人对应的公钥
a437a1d4bedf738e8620920ef29542644e3366c635b16fc9faa6f5db744bcd5c,522cdc822d3bec74aa5c4e972ed6cba84850f9c4d521e43fe08675e9e4759bb9,6ee3ae36166f69e8b9408d277486c9870f40c1b7c16016328737d6445409b99f,ad558e44b347a54981295fcb5ee163c2915ca03536496129103e9d72c5025d69,6b2594ebeee9b072087e5f1e89e5c41ee2d73eb788b63abeedf5c04664f0ce5b
? How many delegates are needed to unlock asset of a dapp? 3
DApp meta information is saved to ./dapp.json ...
? Enter master secret of your genesis account [hidden]
? Do you want publish a inbuilt asset in this dapp? Yes
? Enter asset name, for example: BTC, CNY, USD, MYASSET XCT
? Enter asset total amount 1000000
? Enter asset precision 8
```

有几个注意事项

1. `DApp link`是为了方便普通用户自动安装，必须以`.zip`结尾, 如果您的dapp不打算开源或者没有准备好，可以把这个选项当做占位符，它所在的地址不必真实存在
2. `DApp icon url`这是在阿希应用中心展示用的应用图标, 必须以`.jpg`或`.png`结尾，如果该图片无法访问，阿希应用中心会展示一个默认的图标
3. `How many delegates ...`这个选项表示从`dapp`跨链转账资产时需要多少个受托人联合签名，该数字必须大于等于3、小于等于你配置的受托人公钥个数且小于等于101，数字越大越安全，但效率和费用越高
4. Dapp的创世块中可以创建内置资产，但不是必须的，内置资产无法跨链转账，只能在链内使用。在主链发行的UIA（用户自定义资产）可以充值到任意dapp中，也可从dapp提现到主链，这是dapp内置资产和UIA最大的区别。“一链多币，一币多链”指的就是主链可以发行多个UIA，而每个UIA都可以充值到多个dapp中。

**下面是etm dapp的目录结构**

```
etm-test-dapp/
├── blockchain.db         // dapp数据库文件，与主链的数据是分开存放的,没有启动则没有此文件
├── config.json           // 应用的节点配置文件，目前主要用于配置受托人秘钥
├── contract              // 合约目录
│   └── domain.js         // 域名合约的实现代码
├── dapp.json             // 注册dapp时用到的元文件
├── genesis.json          // 创世区块
├── init.js               // 应用初始化代码，可以在该文件进行一些设置、事件注册等
├── interface             // 查询接口的实现目录
│   ├── domain.js         // 域名查询接口实现
│   └── helloworld.js
├── logs                  // 日志目录
│   └── debug.20170928.log
├── model
│   └── domain.js         // 域名业务数据模型定义
└── public
    └── index.html        // 默认前端页面
    
```

#### 4.3 注册dapp到主链
注意这里的`主链`不是指`mainnet`， 每个`net`下都有相应的主链， 主链是相对Dapp（侧链）而言。

我们可以使用`registerdapp`注册应用到主链，如下所示

```
// 先生成一个dapp注册账户
// 注意这里的密码都是演示用途，且不可用于正式的dapp中
> etm-cli crypto -g
? Enter number of accounts to generate 1
[ { address: 'A9rhsV5xDny4G45gD2TXmFFpeiTfvAAQ7W',
    secret: 'possible melt adapt spoon wing coyote found flower bitter warm tennis easily',
    publicKey: '74db8511d0021206abfdc993a97312e3eb7f8595b8bc855d87b0dc764cdfa5a8' } ]
Done

// 在http://127.0.0.1:4096  用创世账户“someone manual strong movie roof episode eight spatial brown soldier soup motor”登陆（该账户中有初始发行的1亿ETM token），然后给A8QCwz5Vs77UGX9YqBg9kJ6AZmsXQBC8vj地址转10000个ETM

> etm-cli registerdapp -f dapp.json -e "possible melt adapt spoon wing coyote found flower bitter warm tennis easily"
# 返回结果如下,这就是应用id。每个应用注册时返回的id不同，请记下你自己的应用id
0599a6100280df0d296653e89177b9011304d971fb98aba3edcc5b937c4183fb
```

使用浏览器访问`http://localhost:4096/api/dapps/get?id=0599a6100280df0d296653e89177b9011304d971fb98aba3edcc5b937c4183fb`, 可以查询到该dapp了，下面是返回信息

```
{
    "success": true, 
    "dapp": {
        "name": "etm-dapp-helloworld", 
        "description": "A hello world demo for etm dapp", 
        "tags": "etm,dapp,demo", 
        "link": "https://github.com/entanmo/etm-dapp-helloworld/archive/master.zip", 
        "type": 0, 
        "category": 1, 
        "icon": "http://o7dyh3w0x.bkt.clouddn.com/hello.png", 
        "delegates": [
            "a518e4390512e43d71503a02c9912413db6a9ffac4cbefdcd25b8fa2a1d5ca27", 
            "c7dee266d5c85bf19da8fab1efc93204fed7b35538a3618d7f6a12d022498cab", 
            "9cac187d70713b33cc4a9bf3ff4c004bfca94802aed4a32e2f23ed662161ea50", 
            "01944ce58570592250f509214d29171a84f0f9c15129dbea070251512a08f5cc", 
            "f31d61066c902bebc80155fed318200ffbcfc97792511ed18d85bd5af666639f"
        ], 
        "unlockDelegates": 3, 
        "transactionId": "0599a6100280df0d296653e89177b9011304d971fb98aba3edcc5b937c4183fb"
    }
}
```

#### 4.4 部署代码到应用节点
现在我们把4.2小节中创建的模板代码拷贝到etm的安装目录下的dapp子目录，并改名为dapp的id

```
> cp -r etm-test-dapp path/to/etm/dapps/0599a6100280df0d296653e89177b9011304d971fb98aba3edcc5b937c4183fb
```

最后`path/to/etm/dapps/dappid/`目录下的文件与`etm-test-dapp`目录下文件相同。

然后把4.1章节创建的5个受托人密码写入这个dapp的配置文件中

```
> cat path/to/etm/dapps/0599a6100280df0d296653e89177b9011304d971fb98aba3edcc5b937c4183fb/config.json
{
    "secrets": [
        "easy snap cable harvest plate tone planet yellow spot employ humble what", 
        "adjust edge exist hurry joke carbon spice envelope battle shuffle hawk thought", 
        "survey spoil submit select warm chapter crazy link actual lonely pig grain", 
        "march struggle gap piece entry route kind pistol chunk spell honey summer", 
        "response modify knife brass excess absurd chronic original digital surge note spare"
    ]
}
```

这里我们把所有受托人的配置到同一个节点了，在生产环境中不推荐这样做，应该把秘钥尽量分散到多个节点，以防止单点故障。    
至此，dapp手工安装部署完成，开发调试阶段需要这样。等以后正式发布到mainnet后，其他节点只需要在钱包页面点击dapp就可以安装。

#### 4.5 重启etm应用节点

```
> node ETM_HOME/app.js  //contrl+c 结束  然后重新运行，参考 3.初始化 中的运行系统
```

使用浏览器打开`http://localhost:4096/dapps/0599a6100280df0d296653e89177b9011304d971fb98aba3edcc5b937c4183fb/`，可以访问默认的一个前端页面，该页面可以进行一些简单的接口测试

也可以观察dapp的日志来排查一些问题

```
> tail -f path/to/etm/dapps/0599a6100280df0d296653e89177b9011304d971fb98aba3edcc5b937c4183fb/logs/debug.*.log
```

#### 4.6 验证helloworld
	//TODO 展示helloworld 请求成功

### 5.发币转币

### 6.数据储存

### 7.单节点运行与多节点运行

---------

下一章：[智能合约SDK详解](./smart_contract_api.md)