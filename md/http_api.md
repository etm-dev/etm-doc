# 远程接口	

开发DApp应该分为智能合约开发、前端界面开发。本小节主要讲述了前端界面如何调用合约接口，重点关注[5.自定义合约接口调用](#5自定义合约接口调用)，因为大家的dapp功能各异，只有学习到了如何调用自定义的接口，大家调用起合约来才能得心应手。

**构建请求过程：**   
1. 构造请求数据，用户数据按照entanmo提供的接口规则，通过程序生成签名，生成请求数据集合；   
2. 发送请求数据，把构造完成的数据集合通过POST/GET等提交的方式传递给entanmo；   
3. entanmo对请求数据进行处理，服务器在接收到请求后，会首先进行安全校验，验证通过后便会处理该次发送过来的请求；   
4. 返回响应结果数据，entanmo把响应结果以JSON的格式反馈给用户，每个响应都包含success字段，表示请求是否成功，成功为true, 失败为false。 如果失败，则还会包含一个error字段，表示错误原因；   
5. 对获取的返回结果数据进行处理；


* [http接口详解](#http请求接口详解)
	* [1.账户系统](#1账户系统)
		* [1.1 登录](#11-登录)
		* [1.2 不加密直接登录](#12-不加密直接登录)
		* [1.3 根据地址获取账户信息](#13-根据地址获取账户信息)
		* [1.4 获取账户余额](#14-获取账户余额)
		* [1.5 根据地址获取账户公钥](#15-根据地址获取账户公钥)
		* [1.6 生成公钥](#16-生成公钥)
		* [1.7 根据地址获取其投票列表](#17-根据地址获取其投票列表)
		* [1.8 获取受托人手续费](#18-获取受托人手续费)
		* [1.9 给受托人投票](#19-给受托人投票)
		* [1.10 生成新账户](#110-生成新账户)
		* [1.11 获取账户排行榜前100名](#111-获取账户排行榜前100名)
		* [1.12 获取当前链上账户总个数](#112-获取当前链上账户总个数)
	* [2.账户信息获取](#2账户信息获取)
		* [2.1 获取DApp账户信息](#21-获取DApp账户信息)
	* [3.交易](#3交易)
		* [3.1 签名交易](#31-签名交易)
			* [3.1.1 离线签名](#311-离线签名)
				* [3.1.1.1 DApp充值](#3111-DApp充值)
				* [3.1.1.2 DApp提现](#3112-DApp提现)
				* [3.1.1.3 DApp内部转账](#3113-DApp内部转账)
				* [3.1.1.4 DApp设置昵称](#3114-DApp设置昵称)
			* [3.1.2 服务器签名](#312-服务器签名)
				* [3.1.2.1 DApp充值](#3121-DApp充值)
				* [3.1.2.2 DApp提现](#3122-DApp提现)
				* [3.1.2.3 DApp内部转账](#3123-DApp内部转账)
				* [3.1.2.4 DApp设置昵称](#3124-DApp设置昵称)
		* [3.2 获取未确认的交易](#32-获取未确认的交易)
		* [3.3 获取已确认的交易](#33-获取已确认的交易)
		* [3.4 根据交易id获取交易详情](#34-根据交易id获取交易详情)
		* [3.5 根据条件查询交易详情](#35-根据条件查询交易详情)
	* [4.合约信息获取](#4合约信息获取)
		* [4.1 获取所有智能合约](#41-获取所有智能合约)
	* [5.自定义合约接口调用](#5自定义合约接口调用)

### 1.账户系统
通过http请求进行账户（account）的相关操作。  
参考[示例](../utils/account.js)

#### 1.1 登录
接口地址：/api/accounts/open2/   
请求方式：POST   
支持格式：JSON   
接口备注：根据用户密码在本地客户端用js代码生成公钥   

请求参数说明:   

| 参数        | 类型           |必填|  说明 |
| ------------- |:-------------:| :-------------:|:-------------:|
| publicKey      | String| Y|账户公钥|

	
返回参数说明:   

| 参数        | 类型           |说明|
| ------------- |:-------------:| :-------------:|
| success      | boolean| 是否成功|
| account      | json      | 账户信息|

请求示例：
	
	
	//安全登录  推荐
	function safeLogin() {
	  let publicKey = etmjs.crypto.getKeys(secret).publicKey; //根据密码生成公钥
	  return JSON.stringify({
	    publicKey
	  });
	}
	axios.post(loginUrl, safeLogin()).then(res => {
	  console.log(res);
	}).catch(err => {
	  console.error(err);
	})

JSON返回示例： 

	{ 	
		success: true,
     	account:{	
      		address: 'A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr',
        	unconfirmedBalance: 9996006130000000,
        	balance: 9996006130000000,
        	publicKey: 'bd93add22ab931a279f0ef741b768796afc3756ec697f76bef4e2f634969294d',
        	unconfirmedSignature: false,
        	secondSignature: false,
        	secondPublicKey: '',
        	multisignatures: [],
        	u_multisignatures: [],
        	lockHeight: 0 
    	}
    	latestBlock: { height: 52372, timestamp: 11457690 },
     	version: { version: '1.0.0', build: 'development', net: 'localnet' } 
    }


#### 1.2 不加密直接登录
接口地址：/api/accounts/open/	
请求方式：POST
支持格式：JSON
接口备注：将密码传入到server端，根据生成的地址去查询账户信息。不推荐在公网坏境使用！	
请求参数说明：


| 参数        | 类型           |必填|  说明 |
| ------------- |:-------------:| :-------------:|:-------------:|
| secret      | String| Y|账户私钥|

返回参数说明：

| 参数        | 类型           |说明|
| ------------- |:-------------:| :-------------:|
| success      | boolean| 是否成功|
| account      | json      | 账户信息|

请求示例：

	//危险登录，不推荐使用
	function loginNotSafe() {
	  return JSON.stringify({
	    'secret':secret
	  });
	}

	axios.post(login2Url, loginNotSafe()).then(res => {
	  console.log(res);
	}).catch(err => {
	  console.error(err);
	})

JSON返回示例：

	{ 
		success: true,
     	account:
      	{ 
      		address: 'A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr',
        	unconfirmedBalance: 9996006130000000,
        	balance: 9996006130000000,
        	publicKey: 'bd93add22ab931a279f0ef741b768796afc3756ec697f76bef4e2f634969294d',
        	unconfirmedSignature: false,
        	secondSignature: false,
        	secondPublicKey: '',
        	multisignatures: [],
        	u_multisignatures: [],
        	lockHeight: 0 
      	} 
   	}

#### 1.3 根据地址获取账户信息
接口地址：/api/accounts   
请求方式：GET   
支持格式：urlencoded   
请求参数说明:   

| 参数        | 类型           |必填|  说明 |
| ------------- |:-------------:| :-------------:|:-------------:|
| address      | String| Y|账户地址|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
|account| json  |账户详情 |   
| latestBlock | json  |该节点最新的区块信息    |   
|version| json  |版本相关信息 |   

请求示例： 
	
	//get请求
	curl -k -X GET http://etm.red:8096/api/accounts?address=A66taz8N3f67dzSULHSUunfPx82J25BirZ

JSON返回示例：  
	
	{
		"success":true,
		"account":
		{
			"address":"A66taz8N3f67dzSULHSUunfPx82J25BirZ",
			"balance":0,
			"publicKey":"",
			"secondSignature":"",
			"secondPublicKey":"",
			"multisignatures":"",
			"u_multisignatures":"",
			"lockHeight":0,
			"effectivity":false,
			"delayAmount":0
		},
		"latestBlock":{
			"height":52674,
			"timestamp":11458596
		},
		"version":{
			"version":"1.0.0",
			"build":"development"
			,"net":"localnet"
		}
	}


#### 1.4 获取账户余额
接口地址：/api/accounts/getBalance    
请求方式：GET   
支持格式：urlencoded   
请求参数说明:   

| 参数        | 类型           |必填|  说明 |
| ------------- |:-------------:| :-------------:|:-------------:|
| address      | String| Y|账户地址|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| balance | Integer  |账户余额 |   
| unconfirmedBalance | Integer  |未确认和已确认的余额之和，该值大于等于balance    |    

请求示例： 
	
	//get请求
	curl -k -X GET http://etm.red:8096/api/accounts/getBalance?address=AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX

JSON返回示例：  
	
	{
		"success":true,
		"balance":911900000000,
		"unconfirmedBalance":911900000000,
		"delayAmount":0
	}

#### 1.5 根据地址获取账户公钥
接口地址：/api/accounts/getPublickey   
请求方式：GET   
支持格式：urlencoded   
请求说明：只有给别人转过账，db中才会存取公钥，否则是查不到的。 
请求参数说明:   

| 参数        | 类型           |必填|  说明 |
| ------------- |:-------------:| :-------------:|:-------------:|
| address      | String| Y|账户地址|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| publicKey | String  |公钥 |   
  

请求示例： 
	
	//get请求
	curl -k -X GET http://etm.red:8096/api/accounts/getPublickey?address=AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX

JSON返回示例：  
	
	{
		"success":true,
		"publicKey":"813a4934192334fdd55f966f25975757b3bc2b866552fa58687e7f8420190961"
	}
	

#### 1.6 生成公钥
接口地址：/api/accounts/generatePublickey   
请求方式：POST   
支持格式：JSON    
请求参数说明:   

| 参数        | 类型           |必填|  说明 |
| ------------- |:-------------:| :-------------:|:-------------:|
| secret      | String| Y|账户密钥|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| publicKey | String  |公钥 |   
  

请求示例： 
	
	//POST请求
	curl -k -H "Content-Type: application/json" -X POST -d '{"secret":"pepper sleep youth blast vivid circle cross impact zebra neck salmon fee"}' 'http://etm.red:8096/api/accounts/generatePublickey'

JSON返回示例：  
	
	{
		"success":true,
		"publicKey":"813a4934192334fdd55f966f25975757b3bc2b866552fa58687e7f8420190961"
	}
	

#### 1.7 根据地址获取其投票列表
接口地址：/api/accounts/delegates   
请求方式：GET   
支持格式：urlencoded    
接口说明：必须经过锁仓投票以后才有信息
请求参数说明:   

| 参数        | 类型           |必填|  说明 |
| ------------- |:-------------:| :-------------:|:-------------:|
| address      | String| Y|账户地址|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| delegates | array  |已投票的受托人详情数组|   
  

请求示例： 
	
	//get请求
	curl -k -X GET http://etm.red:8096/api/accounts/delegates?address=AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX

JSON返回示例：  
	
	{
		"success":true,
		"delegates":[
			{
				"username":"etm_002",
				"address":"AMowWYG8ND5Yx13Q5ULyYAF63v1rkmdTCC",
				"publicKey":"a08dc0d7b170a0e12caff0a7faaef952741e65f3585905a5847e4d877d650f07",
				"vote":43976220,
				"producedblocks":495,
				"missedblocks":108,
				"rate":2,
				"approval":"0.00",
				"productivity":"82.08"
			}
		]
	}
	
#### 1.8 获取受托人手续费
接口地址：/api/accounts/delegates/fee   
请求方式：GET   
支持格式：urlencoded   

请求参数说明：   

| 参数        | 类型           |必填|  说明 |
| ------------- |:-------------:| :-------------:|:-------------:|
| secret      | String| Y|账户密钥| 
| publicKey      | String| N|账户公钥| 
| secondSecret      | String| N|账户二级密码| 
| delegates      | Array | Y|受托人公钥数组，每个公钥前需要加上+或者-号，代表增加/取消对其的投票| 

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| transaction | json  |投票交易详情|   
  

请求示例： 
	
	//get请求
	curl -k -X GET http://etm.red:8096/api/accounts/delegates/fee

JSON返回示例：  
	
	{
		"success":true,
		"fee":10000000
	}
	
	
#### 1.9 给受托人投票
接口地址：/api/accounts/delegates   
请求方式：PUT    
支持格式：JSON    
    

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| fee | Integer  |手续费|   
  

请求示例： 
	
	//put请求
	curl -k -H "Content-Type: application/json" -X PUT -d '{"secret":"pepper sleep youth blast vivid circle cross impact zebra neck salmon fee","publicKey":"813a4934192334fdd55f966f25975757b3bc2b866552fa58687e7f8420190961","delegates":["+ae28cc3069f4291756168e602a11e5b5d13e546050e3c1d9a09c0311f53a159c"]}' 'http://etm.red:8096/api/accounts/delegates'   

JSON返回示例：  
	
	//TODO  这里请求有问题
	{"success":false,"error":"Number of votes  (2 > 1)."}



#### 1.10 生成新账户
接口地址：/api/accounts/new      
请求方式：GET       
支持格式：urlencoded    
    

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| secret | String  |账户密钥|
| publicKey | String  |账户公钥|
| privateKey | String  |私钥|
| address | String  |账户地址|   
  

请求示例： 
	
	//get请求
	curl -k -X GET 'http://etm.red:8096/api/accounts/new'  

JSON返回示例：  
	
	{
		"success":true,
		"secret":"snap proof ozone exact write waste scrap account lounge manual next across",
		"publicKey":"5e975d4b31c741af773b8b53d54f34f4b4f0ea2ab1bf629cdb5bd692192c9a55",
		"privateKey":"bdf1b1963d5bd26938f15a7ca7d02a6a77054b7d4d353d5618cae1570dbb56485e975d4b31c741af773b8b53d54f34f4b4f0ea2ab1bf629cdb5bd692192c9a55",
		"address":"APAJi5oU5zffU3y5JDufWiKGyMskrdVAT7"
	}

	
#### 1.11 获取账户排行榜前100名
接口地址：/api/accounts/top     
请求方式：GET       
支持格式：urlencoded    
请求参数说明：如果不加请求参数则返回持币量前100名账户信息


| 参数        | 类型           |必填|  说明 |
| ------------- |:-------------:| :-------------:|:-------------:|
| limit      | Integer| N|限制结果集个数，最小值：0,最大值：100| 
| offset      | Integer | N|偏移量，最小值0| 



返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| accounts | json  |账户信息元组，每个元素包含地址、余额、公钥|

  

请求示例： 
	
	//get请求
	//返回前5名账户信息
	curl -k -X GET 'http://etm.red:8096/api/accounts/top?limit=5&offset=0'    

JSON返回示例：  
	
	{
	"success":true,
	"accounts":[
		{
			"address":"A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr",
			"balance":9996006130000000,
			"publicKey":"bd93add22ab931a279f0ef741b768796afc3756ec697f76bef4e2f634969294d"
		},
		{
			"address":"AGKTTewJzJkteWJ9MVEupgCLhgKELsvU7T",
			"balance":989990000000,
			"publicKey":"88a2440cefa9d8b1204bd7b8f10f724c163c9fd49ecb9f568ce718ca5b91cc07"
		},
		{
			"address":"A8rJnWDTochZuBc9jhMkPCUXsp8sUQpNDk",
			"balance":978970000000,
			"publicKey":"91706b4c02839d154870dfd5cdfd912b6ab53140abba9c7dd54bc3558a43fd77"
		},
		{
			"address":"AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX",
			"balance":901880000000,
			"publicKey":"813a4934192334fdd55f966f25975757b3bc2b866552fa58687e7f8420190961"
		},
		{
			"address":"A9SKPdKz9ywBUVnBVmevodcsKdxXc3tXMv",
			"balance":828680000000,
			"publicKey":"c460cac02084f544f7eb8506ef368492551805dad6b0031eb091398d37ba0217"
		}]
	}

#### 1.12 获取当前链上账户总个数   
接口地址：/api/accounts/count    
请求方式：GET       
支持格式：urlencoded    



返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| count | Integer  |当前链上账户总个数|

  

请求示例： 
	
	//get请求
	//返回前5名账户信息
	curl -k -X GET 'http://etm.red:8096/api/accounts/count'    

JSON返回示例：  
	
	{
		"success":true,
		"count":209
	}

### 2.账户信息获取

#### 2.1 获取DApp账户信息

接口地址：/api/dapps/dappID/accounts/:address   
请求方式：GET   
支持格式：urlencode   
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
|address |string | Y   |etm地址    |   
  
返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
|account|dict  |账户详情，包含dapp内该账户拥有的所有资产及余额，是否受托人，额外信息     |   
  
  
请求示例：   
```   
curl -k -H "Content-Type: application/json" -X GET http://localhost:4096/api/dapps/bebe3c57d76a5bbe3954bd7cb4b9e381e8a1ba3c78e183478b4f98b9d532f024/accounts/ANH2RUADqXs6HPbPEZXv4qM8DZfoj4Ry3M && echo   
```   

JSON返回示例：   
   
	{    
		account: {    
			balances: [{    
				currency: "ETM", // dapp内部拥有的代币数（通过自行充值或者他人dapp内转账获得）   
				balance: "10000000000"  // 100 ETM    
			}],    
			extra: null,    
			isDelegate: false // 是否受托人：否
		},    
		success: true    
	}  


### 3.交易

#### 3.1 签名交易
http接口又分为signed和unsigned，他们的区别是交易在本地还是服务端签名，后者需要将密码通过http传输给服务器进行签名。建议使用本地签名（离线签名），这样更安全。
##### 3.1.1 离线签名
/peer相关的api，在请求时都需要设置一个header  

 - key为magic，testnet value:594fe0f3, mainnet value:5f5b3cf5  
 - key为version，value为 ' ' 

etm系统的所有写操作都是通过发起一个交易来完成的。    
交易数据通过一个叫做etm-js的库来创建，然后再通过一个POST接口发布出去。    
POST接口规格如下：

|事项   |说明  |
|---    |---   |
|接口地址|/peer/transactions  |
|payload|etm-js创建出来的交易数据  |
|请求方式|post/put等 |
|支持格式|json |
###### 3.1.1.1 DApp充值
接口地址：/peer/transactions  
请求方式：POST   
支持格式：json   
备注：充值时在主链发生type=6的交易（intransfer），dapp内部会自动调用编号为1的智能合约进行dapp内部充值   	
请求参数说明：

|名称	|类型   |必填 |说明              |
|------ |-----  |---  |----              |   
|transaction|json|Y|etmJS.transfer.createInTransfer生成的交易数据|

  
返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
|transactionId|string  |交易id      |   
  
请求示例：   
	   
	var etmJS = require('etm-js');    
	var dappid = "bebe3c57d76a5bbe3954bd7cb4b9e381e8a1ba3c78e183478b4f98b9d532f024";  
	var currency = "ETM";  
	var amount = 10*100000000 ;  
	var secret = "found knife gather faith wrestle private various fame cover response security predict";  
	var secondSecret = "";
	var transaction = etmJS.transfer.createInTransfer(dappid, currency, amount, secret, secondSecret || undefined);  
	 
	console.log(JSON.stringify(transaction));    
	{"type":6,"amount":1000000000,"fee":10000000,"recipientId":null,"senderPublicKey":"2856bdb3ed4c9b34fd2bba277ffd063a00f703113224c88c076c0c58310dbec4","timestamp":39721503,"asset":{"inTransfer":{"dappId":"bebe3c57d76a5bbe3954bd7cb4b9e381e8a1ba3c78e183478b4f98b9d532f024","currency":"ETM"}},"signature":"8cefc8fa933e4d5e8699828dc8cd5d1b4737ffa82175c744fd681bad0b1a6b68526e0783e85d7979f894fc38850bd2ed0a983ce3cb3f5d16b68fd37dfb9dfb0a","id":"4b580f8f61f4586920a4c0d37b6fad21daf3453fe9ccc5426c2cae7a263c160c"}  // type=6表示dapp充值,这里的type指主链的交易类型，非dapp合约编号  
	
	// 将上面生成的“充值”交易数据通过post提交给etm server
	curl -H "Content-Type: application/json" -H "magic:594fe0f3" -H "version:''" -k -X POST -d '{"transaction":{"type":6,"amount":1000000000,"fee":10000000,"recipientId":null,"senderPublicKey":"2856bdb3ed4c9b34fd2bba277ffd063a00f703113224c88c076c0c58310dbec4","timestamp":39721503,"asset":{"inTransfer":{"dappId":"bebe3c57d76a5bbe3954bd7cb4b9e381e8a1ba3c78e183478b4f98b9d532f024","currency":"ETM"}},"signature":"8cefc8fa933e4d5e8699828dc8cd5d1b4737ffa82175c744fd681bad0b1a6b68526e0783e85d7979f894fc38850bd2ed0a983ce3cb3f5d16b68fd37dfb9dfb0a","id":"4b580f8f61f4586920a4c0d37b6fad21daf3453fe9ccc5426c2cae7a263c160c"}}' http://localhost:4096/peer/transactions && echo    
	
	   

JSON返回示例：   
	  
	{    
		"success": true,    
		"transactionId": "4b580f8f61f4586920a4c0d37b6fad21daf3453fe9ccc5426c2cae7a263c160c"    
	}  

###### 3.1.1.2 DApp提现
接口地址：/api/dapps/dappID/transactions/signed  
请求方式：PUT   
支持格式：json   
请求参数说明：  
  
|名称	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
|dappID|string|Y|dapp的id  |
|transaction|json|Y|etmJS.dapp.createInnerTransaction生成的交易数据|  

  
返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
|transactionId|string  |提币交易id      |   
  
请求示例：   
   
	var etmJS = require('etm-js');   
	var fee = String(0.1 * 100000000);  
	var type = 2;  
	var options = {fee: fee, type: type, args: '["CCTime.XCT", "100000000"]'};  
	var secret = "elite brush pave enable history risk ankle shrimp debate witness ski trend";  
	var transaction = etmJS.dapp.createInnerTransaction(options, secret);  
	 
	console.log(JSON.stringify(transaction));    
	{"fee":"10000000","timestamp":40384202,"senderPublicKey":"aa4e4ac1336a1e9db1ee5ce537a59d3fcb0f068cb4b25aac9f48e0e8bc6259c9","type":2,"args":"[\"CCTime.XCT\", \"100000000\"]","signature":"05dba744705fd1dbc1854b415392364cdbae11778671be8eb5fdbce57855a87b3dde5bf2d0219059411253fb304497758422c8d1546ec45eb5521b4a6577d507"}
	
	// 将上面生成的“提现”交易数据通过post提交给etm server  
	curl -H "Content-Type: application/json" -H "magic:594fe0f3" -H "version:''" -k -X PUT -d '{"transaction":{"fee":"10000000","timestamp":40384202,"senderPublicKey":"aa4e4ac1336a1e9db1ee5ce537a59d3fcb0f068cb4b25aac9f48e0e8bc6259c9","type":2,"args":"[\"CCTime.XCT\", \"100000000\"]","signature":"05dba744705fd1dbc1854b415392364cdbae11778671be8eb5fdbce57855a87b3dde5bf2d0219059411253fb304497758422c8d1546ec45eb5521b4a6577d507"}}' http://45.32.22.78:4096/api/dapps/d352263c517195a8b612260971c7af869edca305bb64b471686323817e57b2c1/transactions/signed && echo    
  

JSON返回示例：   
	 
	{    
		"success": true,    
		"transactionId": "8bcae742206bf236214b9972efaca0bbe29f3703b4055a14cc8b095546880dc4"    
	}  

###### 3.1.1.3 DApp内部转账
接口地址：/api/dapps/dappID/transactions/signed  
请求方式：PUT   
支持格式：json   
请求参数说明：  
  
|名称	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
|dappID|string|Y|dapp的id  |
|transaction|json|Y|etmJS.dapp.createInnerTransaction生成的交易数据|  

  
返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
|transactionId|string  |内部转账交易id      |   
  
请求示例：   
   
	var etmJS = require('etm-js');   
	var fee = String(0.1 * 100000000);  
	var type = 3;  
	var options = {fee: fee, type: type, args: '["CCTime.XCT", "100000000", "A6H9rawJ7qvE2rKwQfdtBHdeYVehB8gFzC"]'};  
	var secret = "elite brush pave enable history risk ankle shrimp debate witness ski trend";  
	var transaction = etmJS.dapp.createInnerTransaction(options, secret);  
	 
	console.log(JSON.stringify(transaction));    
	{"fee":"10000000","timestamp":40387708,"senderPublicKey":"aa4e4ac1336a1e9db1ee5ce537a59d3fcb0f068cb4b25aac9f48e0e8bc6259c9","type":3,"args":"[\"CCTime.XCT\", \"100000000\", \"A6H9rawJ7qvE2rKwQfdtBHdeYVehB8gFzC\"]","signature":"e2364534b8c4b0735a85c68ba17fddf5321fc48af04d483ad05531d4993058eaa35ff44d913a03b6d7278890ff7f42435f8313e08ce70c523dfc256b4de9e303"}  
	
	// 将上面生成的“转账”交易数据通过post提交给etm server  
	curl -H "Content-Type: application/json" -H "magic:594fe0f3" -H "version:''" -k -X PUT -d '{"transaction":{"fee":"10000000","timestamp":40387708,"senderPublicKey":"aa4e4ac1336a1e9db1ee5ce537a59d3fcb0f068cb4b25aac9f48e0e8bc6259c9","type":3,"args":"[\"CCTime.XCT\", \"100000000\", \"A6H9rawJ7qvE2rKwQfdtBHdeYVehB8gFzC\"]","signature":"e2364534b8c4b0735a85c68ba17fddf5321fc48af04d483ad05531d4993058eaa35ff44d913a03b6d7278890ff7f42435f8313e08ce70c523dfc256b4de9e303"}}'  http://45.32.22.78:4096/api/dapps/d352263c517195a8b612260971c7af869edca305bb64b471686323817e57b2c1/transactions/signed && echo    
  

JSON返回示例：   
  
	{    
		"success": true,    
		"transactionId": "e2687a471ac2ddbbdd919266e58b0b652c55f74402b27be850d767fa44162c79"    
	}  

###### 3.1.1.4 DApp设置昵称
接口地址：/api/dapps/dappID/transactions/signed  
请求方式：PUT   
支持格式：json   
请求参数说明：  
  
|名称	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
|dappID|string|Y|dapp的id  |
|transaction|json|Y|etmJS.dapp.createInnerTransaction生成的交易数据|  

  
返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
|transactionId|string  |设置昵称的交易id      |   
  
请求示例：   
	  
	var etmJS = require('etm-js');   
	var fee = String(0.1 * 100000000);  
	var type = 4;  
	var options = {fee: fee, type: type, args: '["Nickname"]'};  // Nickname即昵称
	var secret = "elite brush pave enable history risk ankle shrimp debate witness ski trend";  
	var transaction = etmJS.dapp.createInnerTransaction(options, secret);  
	 
	console.log(JSON.stringify(transaction));    
	{"fee":"10000000","timestamp":40388287,"senderPublicKey":"aa4e4ac1336a1e9db1ee5ce537a59d3fcb0f068cb4b25aac9f48e0e8bc6259c9","type":4,"args":"[\"Nickname\"]","signature":"be08cdb2f4d1a0f2f2e5b02e33e67fdf43e403703ce35cb42a2dc7338c7a352adca56dc61e3be0fedc1727c1adc0101f1a9e1a3e67ac0623602bf872deb80802"}
	
	curl -H "Content-Type: application/json" -H "magic:594fe0f3" -H "version:''" -k -X PUT -d '{"transaction":{"fee":"10000000","timestamp":40388287,"senderPublicKey":"aa4e4ac1336a1e9db1ee5ce537a59d3fcb0f068cb4b25aac9f48e0e8bc6259c9","type":4,"args":"[\"Nickname\"]","signature":"be08cdb2f4d1a0f2f2e5b02e33e67fdf43e403703ce35cb42a2dc7338c7a352adca56dc61e3be0fedc1727c1adc0101f1a9e1a3e67ac0623602bf872deb80802"}}' http://45.32.22.78:4096/api/dapps/d352263c517195a8b612260971c7af869edca305bb64b471686323817e57b2c1/transactions/signed && echo    


JSON返回示例：   
 
	{    
		"success": true,    
		"transactionId": "7teae742206bf236214b9972efaca0bbe29f3703b4055a14cc8b095546880dc4"    
	}  


##### 3.1.2 服务器签名
###### 3.1.2.1 DApp充值
###### 3.1.2.2 DApp提现
接口地址：/api/dapps/dappId/transactions/unsigned    
请求方式：PUT   
支持格式：json   
请求参数说明：  
  
|名称	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
|secret|string|Y|etm密码 |  
|fee|string|Y|交易手续费,目前固定为10000000  |  
|type|integer|Y|智能合约编号 |  
|args|json字符串数组|Y|对应合约编号需要传入的参数 |

  
返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
|transactionId|string  |提现交易id      |   
  
请求示例：   
 
	curl -H "Content-Type: application/json" -H "magic:594fe0f3" -H "version:''" -k -X PUT -d  '{"secret":"elite brush pave enable history risk ankle shrimp debate witness ski trend","fee":"10000000","type":2,"args":"[\"CCTime.XCT\",\"100000000\"]"}' 'http://45.32.22.78:4096/api/dapps/d352263c517195a8b612260971c7af869edca305bb64b471686323817e57b2c1/transactions/unsigned' && echo  



JSON返回示例：   
  
	{    
		"success": true,    
		"transactionId": "f59d365cbc8ea29f5d3798af795dc66dbdda00e2f1ae6677d5c7239180f3e98a"    
	}  

###### 3.1.2.3 DApp内部转账
接口地址：/api/dapps/dappId/transactions/unsigned    
请求方式：PUT   
支持格式：json   
请求参数说明：  
  
|名称	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
|secret|string|Y|etm密码 |  
|fee|string|Y|交易手续费,目前固定为10000000  |  
|type|integer|Y|智能合约编号 |  
|args|json字符串数组|Y|对应合约编号需要传入的参数 |

  
返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
|transactionId|string  |内部转账交易id      |   
  
请求示例：   
	  
	curl -H "Content-Type: application/json" -H "magic:594fe0f3" -H "version:''" -k -X PUT -d  '{"secret":"elite brush pave enable history risk ankle shrimp debate witness ski trend","fee":"10000000","type":3,"args":"[\"CCTime.XCT\",\"1000000000\",\"ADimyhJa99XFzVrbnTYsCqPB4TKQNdjCWw\"]"}' 'http://45.32.22.78:4096/api/dapps/d352263c517195a8b612260971c7af869edca305bb64b471686323817e57b2c1/transactions/unsigned' && echo   
	
  

JSON返回示例：   
	  
	{    
		"success": true,    
		"transactionId": "96d886b7d724e6a00cc8c52c24b674ec8a9fc7fd8145a326bf69983fdc74a006"    
	}  

###### 3.1.2.4 DApp设置昵称
接口地址：/api/dapps/dappId/transactions/unsigned    
请求方式：PUT   
支持格式：json   
请求参数说明：  
  
|名称	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
|secret|string|Y|etm密码 |  
|fee|string|Y|交易手续费,目前固定为10000000  |  
|type|integer|Y|智能合约编号 |  
|args|json字符串数组|Y|对应合约编号需要传入的参数，这里是昵称 |

  
返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
|transactionId|string  |设置昵称交易id      |   
  
请求示例：   
	   
	curl -H "Content-Type: application/json" -H "magic:594fe0f3" -H "version:''" -k -X PUT -d  '{"secret":"minor borrow display rebel depart core buzz right distance avocado immense push","fee":"10000000","type":4,"args":"[\"zhenxi\"]"}' 'http://45.32.22.78:4096/api/dapps/d352263c517195a8b612260971c7af869edca305bb64b471686323817e57b2c1/transactions/unsigned' && echo  
	   

JSON返回示例：   
	   
	{    
		"success": true,    
		"transactionId": "7b5d9d13cf718ee28efde6bae85fbefbcd0eca3d6c0c6fff1421a1102d730669"    
	}  

#### 3.2 获取未确认的交易
接口地址：/api/dapps/dappID/transactions/unconfirmed    
请求方式：GET   
支持格式：urlencode   

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
|transactions|array  |未确认交易列表      |   

  
请求示例：   
	  
	curl -k -X GET http://localhost:4096/api/dapps/bebe3c57d76a5bbe3954bd7cb4b9e381e8a1ba3c78e183478b4f98b9d532f024/transactions/unconfirmed && echo   
	   

JSON返回示例：   
	  
	{    
		"transactions": [],    
		"success": true    
	}  

#### 3.3 获取已确认的交易
接口地址：/api/dapps/dappID/transactions   
请求方式：GET   
支持格式：urlencode   
请求参数说明：  
  
|名称	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
|senderId |string |N |发送者地址 |  
|type |interger |N |合约编号 |  
|limit |interger |N    |限制返回的条数,默认值是100    |   
|offset |interger |N |偏移量 |  


返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
|transactions|array  |交易列表      |   
|count|integer  |符合查询条件的总交易条数      |   
  
请求示例：   
	   
	curl -k -X GET http://localhost:4096/api/dapps/bebe3c57d76a5bbe3954bd7cb4b9e381e8a1ba3c78e183478b4f98b9d532f024/transactions?senderId=AJTGR8EGsprrF7r63D2XLDftGAKUu1Ucjn && echo   
	  

JSON返回示例：   
 
	{
	    "transactions": [{
	        "id": "b12b144b3dbb76b70cd62f97e3d3b0606d97c0f402bba1fb973dd2d3ab604a16",
	        "timestamp": 0,
	        "senderId": "AJTGR8EGsprrF7r63D2XLDftGAKUu1Ucjn",
	        "senderPublicKey": "27823f51a3dddd475943fb8142380d2f8722b0f6c651f6ac37930b63666c7803",
	        "fee": "0",
	        "signature": "22739bb762ff0135a0c4199507e3c45a8615c467bfeb4efa5110802033959698588e39b76d037445e02959ee67b483ac4d24f12304181f4955871cdcd28e3001",
	        "type": 3,
	        "args": "[\"CNY\",\"100000000000000\",\"A8QCwz5Vs77UGX9YqBg9kJ6AZmsXQBC8vj\"]",
	        "height": 1
	    }],
	    "count": 1,
	    "success": true
	}   

#### 3.4 根据交易id获取交易详情
接口地址：/api/dapps/dappID/transactions/:id   
请求方式：GET   
支持格式：urlencode   
请求参数说明：  
  
|名称	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
|id |string |Y    |交易id    |   

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
|transaction|dict  |该交易id对应的交易详情      |   
  
  
请求示例：   
	   
	curl -k -X GET http://localhost:4096/api/dapps/bebe3c57d76a5bbe3954bd7cb4b9e381e8a1ba3c78e183478b4f98b9d532f024/transactions/7088c67edd43326276453b833727677df6f312271b824564a6a934371265f0dc && echo     


JSON返回示例：   
  
	{
		"transaction": {
			"id": "7088c67edd43326276453b833727677df6f312271b824564a6a934371265f0dc",
			"timestamp": 39709980,
			"senderId": "ADYGpYHmgkbukqByZ2JzwFXZM6wYfMXCaR",
			"senderPublicKey": "55ad778a8ff0ce4c25cb7a45735c9e55cf1daca110cfddee30e789cb07c8c9f3",
			"fee": "0",
			"signature": "bd51295c3373da2a92c77b6a96a0edbda75cdcde5fd7824ff326c366ed0ec5778e1d02e7d9c280a219d6c815d9bfdbc2d03bb960a0f5d8d35458e4bda87d6104",
			"type": 1,
			"args": "[\"ETM\",\"10000000000\",\"2f1db0014483ffef85289e086af321e374944668dd7fb4f156c70609276ed903\",\"ANH2RUADqXs6HPbPEZXv4qM8DZfoj4Ry3M\"]",
			"height": 637
		},
		"success": true
	}

#### 3.5 根据条件查询交易详情

接口地址：/api/dapps/dappID/transfers   
请求方式：GET   
支持格式：urlencode   
请求参数说明：  
  
|名称	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
|ownerId |string |N |发送者地址，ownerId和currency必须有一个或者两个都存在 | 
|currency |string |N |代币名称，ownerId和currency必须有一个或者两个都存在 | 
|limit |interger |N    |限制返回的条数,默认值是10    |   
|offset |interger |N |偏移量，默认0 |    

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
|transfers|array  |符合查询条件的交易列表      |   
|count|integer  |符合查询条件的条数      |   
  
请求示例：   
	   
	curl -k -X GET http://localhost:4096/api/dapps/bebe3c57d76a5bbe3954bd7cb4b9e381e8a1ba3c78e183478b4f98b9d532f024/transfers?ownerid=ADYGpYHmgkbukqByZ2JzwFXZM6wYfMXCaR && echo     
	   

JSON返回示例：   
	  
	{
		"count": 1,
		"transfers": [{
			"tid": "b12b144b3dbb76b70cd62f97e3d3b0606d97c0f402bba1fb973dd2d3ab604a16",
			"senderId": "AJTGR8EGsprrF7r63D2XLDftGAKUu1Ucjn",
			"recipientId": "A8QCwz5Vs77UGX9YqBg9kJ6AZmsXQBC8vj",
			"currency": "CNY",
			"amount": "100000000000000",
			"t_timestamp": 0,
			"t_type": 3,
			"t_height": 1
		}],
		"success": true
	} 


### 4.合约信息获取
接口地址：/api/dapps/dappID/contracts   
请求方式：GET   
支持格式：urlencode   
  
返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
|contracts|array  |每个元素都是一个字典，由合约编号、合约名字组成，其中core开头的合约为每个dapp通用的内置合约      |   

    
请求示例：   
	
	curl -k -H "Content-Type: application/json" -X GET http://192.168.2.115:4096/api/dapps/bebe3c57d76a5bbe3954bd7cb4b9e381e8a1ba3c78e183478b4f98b9d532f024/contracts && echo   
  

JSON返回示例：   
	  
	{    
		contracts: [{    
			type: "1",    
			name: "core.deposit" // 系统内置合约，充值(从主链往dapp内进行资产充值)，普通用户不能直接调用（受托人可以调用但不能通过其它节点的校验），当主链有type=9（intransfer）的交易类型发生时会自动调用该智能合约进行dapp充值    
		},    
		{    
			type: "2",    
			name: "core.withdrawal" // 系统内置合约，提现(将资产从dapp内转出到主链上)      
		},    
		{    
			type: "3",    
			name: "core.transfer" // 系统内置合约，dapp内部转账，包括ETM和UIA    
		},    
		{    
			type: "4",    
			name: "core.setNickname" // 系统内置合约，dapp内给地址设置昵称   
		},    
		{    
			type: "1000",    
			name: "cctime.postArticle" // dapp自定义合约，发布文章   
		},    
		{    
			type: "1001",    
			name: "cctime.postComment" // dapp自定义合约，发布评论       
		},    
		{    
			type: "1002",    
			name: "cctime.voteArticle" // dapp自定义合约，给文章进行投票       
		},    
		{    
			type: "1003",    
			name: "cctime.likeComment" // dapp自定义合约，对评论进行打赏       
		},    
		{    
			type: "1004",    
			name: "cctime.report" // dapp自定义合约，举报文章      
		}],    
		success: true    
	}     
	


### 5.自定义合约接口调用
参看demo中的[helloworld](demo.md)
合约中部分代码：
	
	xxxx//功能
	
	xxxx//功能

http接口调用方式：
	
	xxx
	xxx
	
-----------
下一章：[实际demo](./demo.md)