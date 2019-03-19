# 案例

本章将会讲解多个实际案例，由浅及深，由难到易的为开发者剖析DApp的全过程。
如果开发者对dapp还不甚了解 ，请查看合约开发章节,该章节讲解了合约模版各个文件的作用，以及开发者需要关注的模块，其实entanmo官方为开发者考虑了非常多，合约开发者只需要关注业务逻辑即可。

* [案例](#案例)
	* [1.helloworld](#1helloworld)
		* [1.1 配置及路由](#11-配置及路由)
		* [1.2 模型定义](#12-模型定义)
		* [1.3 合约实现](#13-合约实现)
	* [2.发币转账](#2发币转账)
		* [2.1 注册资产发行人](#21-注册资产发行人)
		* [2.2 注册资产](#22-注册资产)
		* [2.3 发行代币](#23-发行代币)
		* [2.4 代币转账](#24-代币转账)
	* [3.秘密dapp](#3秘密dapp)
		* [3.1 合约开发](#31-合约开发)
		* [3.2 合约调用](#32-合约调用)
### 1.helloworld
详细样例请参考[hello world](https://github.com/etm-dev/etm-doc/tree/master/example/helloworld),此例子仅供参考，只为更方便的为大家讲解entanmo dapp的使用。

**注：学到这里，开发者们应该已经可以熟练的发布Dapp**

#### 1.1 配置及路由
**我们从哪里开始呢？**

代码都会有一个开始位置，比如java中`main()`函数, Android中 `onCreate()`等等。在entanmo中合约的入口文件是[ `init.js`](https://github.com/etm-dev/etm-doc/tree/master/example/helloworld/init.js)

	module.exports = async function () {
		//...
		//注册合约方法
  		app.registerContract(1000, 'helloworld.hello')
  		//....
	}

很显然，可以看到注册的接口（并不是合约）；然后可以参考远程接口,这里调用接口的方式仅仅是一个带参数的put请求。   
示例：

	let etmJS = require('etm-js');
	let axios = require('axios');
	let secret = "race forget pause shoe trick first abuse insane hope budget river enough"
	let url = 'http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/transactions/signed'

	let transaction = etmJS.dapp.createInnerTransaction({
	  fee: `0`,
	  type: 1000,//合约编号
	  args: JSON.stringify(["hello world"])//合约参数
	}, secret)
	axios.put(url, {
	  transaction
	}).then(res => {
	  console.log(res)
	}).catch(err => {
	  console.error(err);
	})


继续查看interface目录下的[helloworld.js](https://github.com/etm-dev/etm-doc/tree/master/example/helloworld/interface/helloworld.js) 。

	//...
	// 获取所有单词 get请求
	app.route.get("/words", async req => {
	  let words = await app.model.Words.findAll({})
	  return {
	    words
	  }
	})
	//...
	//请求方式：
	http://etm.red:8096/api/dapps/5929ee23ea77968a7ec686c124ed3bad43c096e5b38a54eb7ab72ef7b635900d/words

综上两种方式，开发者应该不难发现，合约的请求分为两种，**一种是put请求（一般定义在contract目录下），一种是get请求（一般定义在interface目录下）**。  


#### 1.2 模型定义
模型的定义其实是定义数据结构，让数据以什么方式存储到区块链上，在dapp模版中，我们可以看到model目录，此example对应的[words.js](https://github.com/etm-dev/etm-doc/tree/master/example/helloworld/model/words.js)就是对于的数据模型定义文件。

	module.exports = {
	  name: 'words',
	  fields: [
	    {
	      name: 'words',
	      type: 'String',
	      length: 256,
	      not_null: true,
	      index: true
	    }
	  ]
	}


可以发现，定义了一张words表，包含words字段，以及要求。

#### 1.3 合约实现
之前我们已经说过，entanmo官方为了让开发者更容易的开发合约，在设计上就是尽量让开发者只做逻辑相关的工作。那我们来看一下contract目录下的[helloworld.js](https://github.com/etm-dev/etm-doc/tree/master/example/helloworld/contract/helloworld.js)实现

	//改变信息
	module.exports = {
	  hello: async function(words) {
	    //单步添加单词
	    app.sdb.lock("add-word")
	    //添加一条数据
	    app.sdb.create('Word', {
	      'words': words
	    })
	  }
	}


其实很简单，注释中已经说明。其实开发者只需要关注合约中的逻辑实现即可。

然后重启应用节点即可，dapp就算编写完成了。

------------------

### 2.发币转账
在entanmo中，发布代币是需要以下步骤，[可以参考](https://github.com/etm-dev/etm-doc/blob/master/utils/issueAssert.js)

1. 注册资产发行人   100ETM
2. 注册资产     500ETM
3. 发行资产     0.1ETM
4. 转账        0.1ETM

#### 2.1 注册资产发行人

此步骤是一个登记发行人操作。

	let password = 'race forget pause shoe trick first abuse insane hope budget river enough';
	let secondPassword = '';

	//必须大写
	let issuerName = 'RAY';
	let assertName = 'CNY';
	//第一步
	//注册资产发行人  100 ETM
	function registerAssertIssuer() {
	  //发行人 RAY
	  let transaction = etmjs.uia.createIssuer(issuerName, "issuer", password, secondPassword);
	  return JSON.stringify({
	    transaction
	  });
	}
	// 第一步注册发行商
	axios.post(url, registerAssertIssuer()).then(res => {
	  console.log(res)
	}).catch(err => {
	  console.error(err);
	})

查询是否发布成功：

	//get
	http://etm.red:8097/api/uia/issuers/RAY

	//结果
	{
		"success": true,
		"issuer": {
			"name": "RAY",
			"desc": "issuer",
			"issuerId": "A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr"
		}
	}

注册发行人就已经成功了。

#### 2.2 注册资产
注册资产发行人成功后，就有资格注册资产

	//第二步
	//注册资产 500 ETM
	function registerAssrt() {
	  // 资产名称，发行商名.资产名，唯一标识
	  let name = issuerName + '.' + assertName;
	  let desc = '测试';
	  // 上限 10亿
	  let maximum = '100000000000000000';
	  // 精度，小数点的位数，这里上限是100000000000000000，精度为8，代表资产IssuerName.CNY的最大发行量为1000000000.00000000
	  let precision = 8;
	  // 策略
	  let strategy = '';
	  // 是否允许注销，默认不允许。0：不允许，1：允许
	  let allowWriteoff = 0;
	  // 是否允许白名单，默认不允许。0：不允许，1：允许
	  let allowWhitelist = 0;
	  // 是否允许黑名单，默认不允许。0：不允许，1：允许
	  let allowBlacklist = 0;

	  // 构造交易数据
	  let trs = etmjs.uia.createAsset(name, desc, maximum, precision, strategy, allowWriteoff, allowWhitelist, allowBlacklist, password, secondPassword)
	  return JSON.stringify({
	    "transaction": trs
	  })
	}

查询资产是否注册成功：

	//get
	http://etm.red:8097/api/uia/issuers/RAY/assets

	//返回结果
	{
		"success": true,
		"assets": [{
			"name": "RAY.CNY",
			"desc": "测试",
			"maximum": "100000000000000000",
			"precision": 8,
			"strategy": "",
			"quantity": "0",
			"height": 185150,
			"issuerId": "A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr",
			"acl": 0,
			"writeoff": 0,
			"allowWriteoff": 0,
			"allowWhitelist": 0,
			"allowBlacklist": 0,
			"maximumShow": "1000000000",
			"quantityShow": "0"
		}],
		"count": 1
	}

#### 2.3 发行代币
注册资产成功以后，才有资格发布该资产的代币

	//第三步 发行代币  0.1 ETM
	function issueAssert() {
	  let currency = issuerName + '.' + assertName;
	  // 本次发行量=真实数量（100）*10**精度（3），所有发行量之和需 <= 上限*精度
	  //发行1亿
	  let amount = '10000000000000000'
	  let trs = etmjs.uia.createIssue(currency, amount, password, secondPassword)
	  return JSON.stringify({
	    "transaction": trs
	  })
	}

查询资产是否发布成功：

	//get
	http://etm.red:8097/api/uia/balances/A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr   //该地址为发布者地址

	//返回结果
	{
		"success": true,
		"balances": [{
			"currency": "RAY.CNY",
			"balance": "10000000000000000",
			"maximum": "100000000000000000",
			"precision": 8,
			"quantity": "10000000000000000",
			"writeoff": 0,
			"allowWriteoff": 0,
			"allowWhitelist": 0,
			"allowBlacklist": 0,
			"maximumShow": "1000000000",
			"quantityShow": "100000000",
			"balanceShow": "100000000"
		}],
		"count": 1
	}

#### 2.4 代币转账
发行资产成功以后，才能有此步操作

	//转代币
	function transferAsset() {
	  let currency = issuerName + '.' + assertName;
	  // 本次转账数（10000）=真实数量（10）*10**精度（8），需 <= 当前资产发行总量
	  let amount = '10000000000';
	  // 接收地址，需满足前文定义好的acl规则
	  let recipientId = 'AJtYXzZrbGtRUvNrmKj6m2KtKRPHf6Akgy'
	  var trs = etmjs.uia.createTransfer(currency, amount, recipientId,'',password, secondPassword)
	  return JSON.stringify({
	    "transaction": trs
	  })
	}

	//只有在第三步执行完成后并且等待区块确认了，才能执行第三步
	// 转账
	axios.post(url, transferAsset()).then(res => {
	  console.log(res);
	}).catch(err => {
	  console.error(err);
	})

查询转账是否成功：

	//get
	http://etm.red:8097/api/uia/balances/AJtYXzZrbGtRUvNrmKj6m2KtKRPHf6Akgy   //该地址为接收者地址

	//返回结果
	{
		"success": true,
		"balances": [{
			"currency": "RAY.CNY",
			"balance": "10000000000",
			"maximum": "100000000000000000",
			"precision": 8,
			"quantity": "10000000000000000",
			"writeoff": 0,
			"allowWriteoff": 0,
			"allowWhitelist": 0,
			"allowBlacklist": 0,
			"maximumShow": "1000000000",
			"quantityShow": "100000000",
			"balanceShow": "100"  //转移的100代币
		}],
		"count": 1
	}

-----------------
### 3.秘密dapp
区块链技术是基于密码学的基础上设计的，开发者应该知道entanmo的账号系统是基于ed25519算法的，这套算优势就是`签名和验证的性能都极高，签名小，公钥小`,可以说该套算法专为签名设计。

基于以上信息，如果我们能把ed25519转换成Curve25519（椭圆曲线），那么我们就可以设计一个很有意思的功能。  

**公钥加密信息，私钥解密信息，定向给某人发送信息**

示例：   
1.tom使用alice的公钥加密信息   
2.发布到主网dapp   
3.所有人都可以获取该信息，但是无法看到该信息，因为是加密的   
4.alice上线后，获取到该加密信息，然后用自己的私钥解密，就可以获取到tom给他的原始信息   

基于以上理论，entanmo官方为开发者此示例（[secret](https://github.com/etm-dev/secretDapp)）

#### 3.1 合约开发
在第一小节中，简要讲述了dapp的开发模式。
可以简单的设计两个接口：   
1. 加密信息接口（在contract/* 下开发，因为是修改、保存信息）   
2. 解密接口（在inteface/* 目录下开发）   
3. 数据结构（在model/* 目录下开发）   

**加密接口：**

	  //所有的加密操作都可以在本地实现，本示例仅仅为了更好的给大家演示
	  encodeString: async function(words, receiveAddress) {
	    let sender = this.trs.senderId
	    if (!etmjs.crypto.isAddress(sender)) return INVALIDATE_USER
	    if (!etmjs.crypto.isAddress(receiveAddress)) return INVALIDATE_RECEIVER
	    //将接收者地址转换成publicKey
	    let publicKey = null
	    //1.在用户表中查询是否有该用户，有该用户就读取publickey
	    let receiveUser = await app.model.User.findOne({
	      condition: {
	        address: receiveAddress
	      }
	    })
	    if (receiveUser) {
	      publicKey = receiveUser.publicKey
	    }
	    //2.在主网中获取是否有publickey （如果是没注册的账户  是没有publickey存在的）
	    if (!receiveUser) {
	      try {
	        let res = await axios.get("http://etm.red:8097/api/accounts/getPublickey?address=" + receiveAddress, {
	          timeout: 5000
	        })
	        if (res && res.data && res.data.success) {
	          publicKey = res.data.publicKey
	        }
	      } catch (e) {
	        return NET_ERROR
	      }
	    }
	    if (!publicKey) {
	      return INVALIDATE_PUBLIC_KEY
	    }
	    // msg.length<300
	    if (!words || words.length > 300) {
	      return STRING_LENGTH_ERROR
	    }
	    let encodeMsg = null
	    try {
	      encodeMsg = cryptoUtils.encodeString(words, publicKey)
	    } catch (e) {
	      return ENCODE_STRING_ERROR
	    }
	    if (!encodeMsg) {
	      return ENCODE_STRING_ERROR
	    }
	    app.sdb.create('Word', {
	      'id': ids.generateID(),
	      'msg': encodeMsg,
	      'sender': sender,
	      'receiver': receiveAddress,
	      'date': Date.now(),
	    })

	  }

**解密接口：**

	//所有的解密操作都可以在本地实现，本示例仅仅为了更好的给大家演示
	//TODO  如果开发者觉得这样不安全，完全可以把加密解密放到本地操作，此案例只是更好的给大家演示
	app.route.get("/decode", async req => {
	  let {
	    encodeMsg,
	    secret
	  } = req.query
	  //由于secret是带空格的，所有需要在发送请求的时候进行encodeURI
	  //此处就是decodeURI
	  encodeMsg = decodeURI(encodeMsg)
	  secret=decodeURI(secret)
	  //既然已经有了secret 那么说明不需要再验证地址之类的合法性，secret代表最大权限
	  if (!secret) {
	    return DECODE_STRING_ERROR
	  }
	  try {
	    dmsg = cryptoUtils.decodeString(encodeMsg, secret)
	  } catch (e) {
	    return DECODE_STRING_ERROR
	  }
	  return {
	    dmsg
	  }
	})

#### 3.2 合约调用

加密信息：

	let secret = "foot profit decorate orient quit goose upon curve coast warm income manual"
	let address = 'AGWefmsaAhnqx75xhucqjk8Ah2fqDG3Q4P'
	let url = 'http://etm.red:8097/api/dapps/27c1e5b0bd7f659298ca7ce8223d9958a2b0b696e5b0fd5001941da21d1233c6/transactions/signed'

	let transaction = etmJS.dapp.createInnerTransaction({
	  fee: `0`,
	  type: 1001,
	  args: JSON.stringify(['我爱我家',address])
	}, secret)
	axios.put(url, {
	  transaction
	}).then(res => {
	  console.log(res)
	}).catch(err => {
	  console.error(err);
	})

获取加密的信息：

	//get
	http://etm.red:8097/api/dapps/27c1e5b0bd7f659298ca7ce8223d9958a2b0b696e5b0fd5001941da21d1233c6/msg/AGWefmsaAhnqx75xhucqjk8Ah2fqDG3Q4P
	//结果返回
	{
		"encodeMsgs": [{
			"id": "mjl53EbE2xCy",
			//msg就是加密过后的信息
			"msg": "0e141fa52463531fb654c2398cabf883ef194130af99a88e9e34669cb995e40c5de9cbe03a081a196dff375a719dc5b930435ebe9a36f31f821a1b22",
			"sender": "AGWefmsaAhnqx75xhucqjk8Ah2fqDG3Q4P",
			//自己给自己发了一条加密信息
			"receiver": "AGWefmsaAhnqx75xhucqjk8Ah2fqDG3Q4P",
			"date": "1552632154799"
		}],
		"totalCount": 1,
		"success": true
	}

解密信息：

	//get  此步操作完全可以本地进行，此示例仅仅是为了演示使用
	http://etm.red:8097/api/dapps/27c1e5b0bd7f659298ca7ce8223d9958a2b0b696e5b0fd5001941da21d1233c6/decode?encodeMsg=0e141fa52463531fb654c2398cabf883ef194130af99a88e9e34669cb995e40c5de9cbe03a081a196dff375a719dc5b930435ebe9a36f31f821a1b22&secret=foot profit decorate orient quit goose upon curve coast warm income manual

	//结果返回
	{"dmsg":"我爱我家","success":true}



-----------------
### 上线案例展示

* 加密马（[epony](epony.cn)）
* 秘密Dapp
