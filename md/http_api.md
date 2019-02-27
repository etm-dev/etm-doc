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
	* [2.交易](#2交易)
		* [2.1 获取交易信息](#21-获取交易信息)
		* [2.2 根据交易id查看交易详情](#22-根据交易id查看交易详情)
		* [2.3 根据未确认交易id查看详情](#23-根据未确认交易id查看详情)
		* [2.4 获取全网未确认的交易详情](#24-获取全网未确认的交易详情)
		* [2.5 创建交易并广播](#25-创建交易并广播)
	* [3.区块](#3区块)
		* [3.1 获取指定区块的详情](#31-获取指定区块的详情)
		* [3.2 获取区块数据](#32-获取区块数据)
		* [3.3 获取区块链高度](#33-获取区块链高度)
		* [3.4 获取普通转账手续费](#34-获取普通转账手续费)
		* [3.5 获取里程碑](#35-获取里程碑)
		* [3.6 查看单个区块奖励](#36-查看单个区块奖励)
		* [3.7 获取代币当前供应值](#37-获取代币当前供应值)
		* [3.8 区块链状态](#38-区块链状态)
		* [3.9 获取指定区块的交易信息](#39-获取指定区块的交易信息)
	* [4.受托人delegates](#4受托人delegates)
		* [4.1 获取受托人总个数](#41-获取受托人总个数)
		* [4.2 根据受托人公钥查看哪些人为其投了票](#42-根据受托人公钥查看哪些人为其投了票)
		* [4.3 根据公钥或者用户名获取受托人详情](#43-根据公钥或者用户名获取受托人详情)
		* [4.4 获取受托人列表](#44-获取受托人列表)
		* [4.5 获取受托人设置的转账费](#45-获取受托人设置的转账费)
		* [4.6 根据公钥查看其出块情况](#46-根据公钥查看其出块情况)
		* [4.7 注册受托人](#47-注册受托人)
		* [4.8 受托人开启出块](#48-受托人开启出块)
		* [4.9 受托人关闭出块](#49-受托人关闭出块)
		* [4.10 受托人出块状态查看](#410-受托人出块状态查看)
	* [5.节点](#5节点)
		* [5.1 获取本机连接的所有节点信息](#51-获取本机连接的所有节点信息)
		* [5.2 获取本节点版本号等信息](#52-获取本节点版本号等信息)
		* [5.3 获取指定ip节点信息](#53-获取指定ip节点信息)
	* [6.同步和加载](#6同步和加载)
		* [6.1 查看本地区块链加载状态](#61-查看本地区块链加载状态)
		* [6.2 查看区块同步信息](#62-查看区块同步信息)
	* [7.二级密码](#7二级密码)
		* [7.1 设置二级密码](#71-设置二级密码)
		* [7.2 获取二级密码设置的手续费](#72-获取二级密码设置的手续费)
	* [8.多重签名](#8多重签名)
		* [8.1 设置普通账户为多重签名账户](#81-设置普通账户为多重签名账户)
		* [8.2 非交易发起人对交易进行多重签名](#82-非交易发起人对交易进行多重签名)
		* [8.3 根据公钥获取挂起的多重签名交易详情](#83-根据公钥获取挂起的多重签名交易详情)
		* [8.4 获取多重签名账户信息](#84-获取多重签名账户信息)
	* [9.点对点传输](#9点对点传输)
		* [9.1 说明](#91-说明)
		* [9.2 普通交易](#92-普通交易)
			*  [9.2.1 设置二级密码](#921-设置二级密码)
			*  [9.2.2 转账](#922-转账)
			*  [9.2.3 注册受托人](#923-注册受托人)
			*  [9.2.4 投票与取消投票](#924-投票与取消投票)
			*  [9.2.5 账户锁仓](#925-账户锁仓)
		* [9.3 UIA相关交易](#93-UIA相关交易)
			*  [9.3.1 注册资产发行商](#931-注册资产发行商)
			*  [9.3.2 注册资产](#932-注册资产)
			*  [9.3.3 资产设置acl模式](#933-资产设置acl模式)
			*  [9.3.4 更新访问控制列表](#934-更新访问控制列表)
			*  [9.3.5 资产发行](#935-资产发行)
			*  [9.3.6 资产转账](#936-资产转账)
			*  [9.3.7 资产注销](#937-资产注销)
	* [10.用户自定义资产](#10用户自定义资产)
		* [10.1 获取全网所有发行商](#101-获取全网所有发行商)
		* [10.2 查询指定发行商的信息](#102-查询指定发行商的信息)
		* [10.3 查看指定发行商的资产](#103-查看指定发行商的资产)
		* [10.4 获取全网所有资产信息](#104-获取全网所有资产信息)
		* [10.5 获取指定资产信息](#105-获取指定资产信息)
		* [10.6 获取指定资产的访问控制列表](#106-获取指定资产的访问控制列表)
		* [10.7 获取指定账户所有uia的余额](#107-获取指定账户所有uia的余额)
		* [10.8 获取指定账户所有资产相关操作记录](#108-获取指定账户所有资产相关操作记录)
		* [10.9 获取指定账户指定资产的余额](#109-获取指定账户指定资产的余额)
		* [10.10 获取指定账户指定资产转账记录](#1010-获取指定账户指定资产转账记录)
		* [10.11 获取指定资产转账记录](#1011-获取指定资产转账记录)
		* [10.12 资产创建相关](#1012-资产创建相关)
			* [10.12.1 注册资产发行商](#10121-注册资产发行商)
			* [10.12.2 注册资产](#10122-注册资产)
			* [10.12.3 更新资产访问控制列表](#10123-更新资产访问控制列表)
			* [10.12.4 资产发行](#10124-资产发行)
			* [10.12.5 资产转账](#10125-资产转账)
			* [10.12.6 更新黑白名单](#10126-更新黑白名单)


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

### 2.交易

#### 2.1 获取交易信息

接口地址：/api/transactions   
请求方式：GET   
支持格式：urlencode   
接口说明：如果请求不加参数则会获取全网所有交易   
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| and | Integer | N   |取值范围0和1，默认值0。select查询时下面这些条件都是or的关系，and=1时select是and的关系    |   
| blockId | String | N   |区块id    | 
| limit | Integer | N   |限制结果集个数，最小值：0,最大值：100    | 
| type | Integer | N   |交易类型,0:普通转账，1:设置二级密码，2:注册受托人，3:投票，4:多重签名，5:DAPP，6:IN_TRANSFER，7:OUT_TRANSFER   | 
| orderBy | String | N   |根据表中字段排序，senderPublicKey:desc    | 
| offset | Integer | N   |偏移量，最小值0    | 
| senderPublicKey | String | N   |发送者公钥    | 
| ownerPublicKey | String | N   |拥有者公钥    | 
| ownerAddress | String | N   | 拥有者地址   | 
| recipientId | String | N   |接收者地址,最小长度：1    | 
| senderId | String | N   |发送者地址    | 
| amount | Integer | N   |金额    | 
| fee | Integer | N   |手续费   | 
| uia | Integer | N   |是否uia，0：不是，1：是   | 
| currency | String | N   |资产名    |   
  
返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| transactions |array  |多个交易详情json构成的列表 |   
| count |int  |获取到的交易总个数 | 
  
  
请求示例：   

 
	curl -k -H "Content-Type: application/json" -X http://etm.red:8096/api/transactions?limit=2   
  

JSON返回示例：   
   
	{
		"success":true,
		"transactions":	
			[{
				"id":"f0af7052a760edb104c118d1f6950f597f50a314b872508d9bc7e16f7062219c",
				"height":1,
				"blockId":"b8f0e9310ede1fc64fbbcdc7dee0edebdd74490017e5b4261573c14c80de591a",
				"type":0,
				"timestamp":0,
				"senderPublicKey":"e8de2877f5448b3f105fdd059c060f286d4db34226b3c2d9c6e4bbe248072574",
				"senderId":"ACfVWA1TJ1NbrDHUefjfiaykUezAgfvPZ9",
				"recipientId":"A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr",
				"amount":10000000000000000,
				"fee":0,
				"signature":"4d7730f81a5ae2679530153d91f6a15fcbcac00469fa4210098d2d2c3fe87d885ad9348ee9fc7680203e1035d91230089c9287056860a01df98ec84a600f180f",
				"signSignature":"",
				"signatures":null,
				"confirmations":252988,
				"args":null,
				"message":null,
				"asset":{}},
			{
				"id":"e0070e3ff36b3a77ced5e3b715ddc89bb1ba20199a3267db8a5c99aaac988055",
				"height":1,
				"blockId":"b8f0e9310ede1fc64fbbcdc7dee0edebdd74490017e5b4261573c14c80de591a",
				"type":0,
				"timestamp":0,
				"senderPublicKey":"e8de2877f5448b3f105fdd059c060f286d4db34226b3c2d9c6e4bbe248072574",
				"senderId":"ACfVWA1TJ1NbrDHUefjfiaykUezAgfvPZ9",
				"recipientId":"ALujNVEVnarsLG2unJmUEshTqmQCFCmoD2",
				"amount":20000000000,
				"fee":0,
				"signature":"b7bf507ca4b693e172d0d1d63a3fe3a4562a0544f55ff436dcd18465a9653f63fe71ee8e8c8169a494cec651172e40787391598cda7ce3d42cff85bd2527be03",
				"signSignature":"",
				"signatures":null,
				"confirmations":252988,
				"args":null,
				"message":null,
				"asset":{}
			}],
		"count":468
	} 


#### 2.2 根据交易id查看交易详情   
接口地址：/api/transactions/get    
请求方式：GET       
支持格式：urlencoded    
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| Id | String | Y   |未确认交易id   |  


返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| transactions | json  |未确认交易详情|

  

请求示例： 
	
	//get请求
	curl -k -X GET 'http://etm.red:8096/api/transactions/unconfirmed/get?id=0070e3ff36b3a77ced5e3b715ddc89bb1ba20199a3267db8a5c99aaac9880556'    

JSON返回示例：  
	
	{
		"success":true,
		"transaction":
			{
				"id":"0070e3ff36b3a77ced5e3b715ddc89bb1ba20199a3267db8a5c99aaac9880556",
				"height":1,
				"blockId":"b8f0e9310ede1fc64fbbcdc7dee0edebdd74490017e5b4261573c14c80de591a",
				"type":0,
				"timestamp":0,
				"senderPublicKey":"e8de2877f5448b3f105fdd059c060f286d4db34226b3c2d9c6e4bbe248072574",
				"senderId":"ACfVWA1TJ1NbrDHUefjfiaykUezAgfvPZ9",
				"recipientId":"ALujNVEVnarsLG2unJmUEshTqmQCFCmoD2",
				"amount":20000000000,
				"fee":0,
				"signature":"b7bf507ca4b693e172d0d1d63a3fe3a4562a0544f55ff436dcd18465a9653f63fe71ee8e8c8169a494cec651172e40787391598cda7ce3d42cff85bd2527be03",
				"signSignature":"",
				"signatures":null,
				"confirmations":253407,
				"args":null,
				"message":null,
				"asset":{}
			}
	}

#### 2.3 根据未确认交易id查看详情   
接口地址：/api/transactions/unconfirmed/get   
请求方式：GET       
支持格式：urlencoded    
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| Id | String | Y   |未确认交易id   |  


返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| transactions | json  |未确认交易详情|

  

请求示例： 
	
	//get请求
	curl -k -X GET 'http://etm.red:8096/api/transactions/unconfirmed/get?id=0070e3ff36b3a77ced5e3b715ddc89bb1ba20199a3267db8a5c99aaac9880556'    

JSON返回示例：  
	
	{
		"success":true,
		"transaction":
			{
				"id":"0070e3ff36b3a77ced5e3b715ddc89bb1ba20199a3267db8a5c99aaac9880556",
				"height":1,
				"blockId":"b8f0e9310ede1fc64fbbcdc7dee0edebdd74490017e5b4261573c14c80de591a",
				"type":0,
				"timestamp":0,
				"senderPublicKey":"e8de2877f5448b3f105fdd059c060f286d4db34226b3c2d9c6e4bbe248072574",
				"senderId":"ACfVWA1TJ1NbrDHUefjfiaykUezAgfvPZ9",
				"recipientId":"ALujNVEVnarsLG2unJmUEshTqmQCFCmoD2",
				"amount":20000000000,
				"fee":0,
				"signature":"b7bf507ca4b693e172d0d1d63a3fe3a4562a0544f55ff436dcd18465a9653f63fe71ee8e8c8169a494cec651172e40787391598cda7ce3d42cff85bd2527be03",
				"signSignature":"",
				"signatures":null,
				"confirmations":253407,
				"args":null,
				"message":null,
				"asset":{}
			}
	}
	
#### 2.4 获取全网未确认的交易详情  
接口地址：/api/transactions/unconfirmed    
请求方式：GET       
支持格式：urlencoded  
接口说明：如果不加参数，则会获取全网所有未确认交易     
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| senderPublicKey | String | N   |发送者公钥  |  
| address | String | N   | 地址  |  


返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| transactions | array  |未确认交易列表|

  

请求示例： 
	
	//get请求
	curl -k -X GET 'http://etm.red:8096/api/transactions/unconfirmed'    

JSON返回示例：  

	//全网没有未确认的交易	
	{
		"success":true,
		"transactions":[]
	}
	
#### 2.5 创建交易并广播  
接口地址：/api/transactions    
请求方式：PUT       
支持格式：JSON      
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| secret | String | Y   |账户密码  |  
| amount | Integer | Y   | 金额，最小值：1，最大值：10000000000000000  |  
| recipientId | String | Y   | 接收者地址,最小长度：1  |
| publicKey | String | N   | 发送者公钥  |
| secondSecret | String | N   | 发送者二级密码，最小长度1，最大长度：100  |
| multisigAccountPublicKey | String | N   | 多重签名账户公钥  |


返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| transactionId | String  |交易id|

  

请求示例([参考](../utils/transactions.js))： 
	
	//此方式不安全，可以查考./issueAssert.js中transferETM()
	function createTransaction() {
	  return JSON.stringify({
	    'secret':secret,
	    'amount':55500000000,
	    'recipientId':'A66taz8N3f67dzSULHSUunfPx82J25BirZ',
	  });
	}
	
	axios.put(url, createTransaction()).then(res => {
	  console.log(res);
	}).catch(err => {
	  console.error(err);
	})    

JSON返回示例：  

	//请求成功并返回交易id	
	{ 
		success: true,
		transactionId: '00e7849414cf86fb922a239b38d82022e37cd4caa59bb6f3c4c6d5abbcec9794' 
	} 
	//使用钱包查询接受地址账户余额
	普通转账	A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr	A66taz8N3f67dzSULHSUunfPx82J25BirZ	2019-02-25 14:40:02		555

### 3.区块

#### 3.1 获取指定区块的详情  
接口地址：/api/blocks/get    
请求方式：GET       
支持格式：urlencoded      
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| id | String | 参数3选1   |区块id  |  
| height | Integer | 参数3选1   | 区块高度  |  
| hash | String | 参数3选1   | 区块hash  |


返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| block | json  |区块详情|

  

请求示例： 
	
	//get请求
	curl -k -X GET 'http://etm.red:8096/api/blocks/get?height=1'    

JSON返回示例：  

	{
		"success":true,
		"block":
		{
			"id":"b8f0e9310ede1fc64fbbcdc7dee0edebdd74490017e5b4261573c14c80de591a",
			"version":0,
			"timestamp":0,
			"height":1,
			"previousBlock":null,
			"numberOfTransactions":405,
			"totalAmount":10000000000000000,
			"totalFee":0,
			"reward":0,
			"payloadLength":58419,
			"payloadHash":"855b2b1b71f9c7ef07503587ab4be73904d67615f26840f88dcb7a625ccea593",
			"generatorPublicKey":"e8de2877f5448b3f105fdd059c060f286d4db34226b3c2d9c6e4bbe248072574",
			"blockSignature":"6e7b7eaefbee6b04d7bfea9680a0dcf22025d60a6dacb8d49370489a947327b164e8c0530764dd125549396c38958d2c1fe0fb5fea5e5dd259d4390f76d10c0a",
			"confirmations":255755,
			"generatorId":"ACfVWA1TJ1NbrDHUefjfiaykUezAgfvPZ9",
			"totalForged":0
		}
	}
	
#### 3.2 获取区块数据  
接口地址：/api/blocks     
请求方式：GET       
支持格式：urlencoded   
接口说明：不加参数则获取全网区块详情        
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| limit | Integer | N   | 限制结果集个数，最小值：0,最大值：100  |
| orderBy | String | N   | 根据表中字段排序，如height:desc  |
| offset | Integer | N   | 偏移量，最小值0  |
| generatorPublicKey | String | N   | 区块生成者公钥  |
| totalAmount | Integer | N   | 交易总额，最小值：0，最大值：10000000000000000  |
| totalFee | Integer | N   | 手续费总额，最小值：0，最大值：10000000000000000 |
| reward | Integer | N   | 奖励金额，最小值：0  |
| previousBlock | String | N   | 上一个区块  |
| height | Integer | N   | 区块高度  |


返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| blocks | array  |由区块详情json串构成的数组|
| count | Integer  |区块高度|

  

请求示例： 
	
	//get请求
	curl -k -X GET 'http://etm.red:8096/api/blocks?limit=2&offset=0&orderBy=height:desc'    

JSON返回示例：  

	{
		"success": true,
		"blocks": [{
			"id": "72b9c4af34e63e93b854e9d94b41ab5e7a67e3d3af312a248e7c223f7dc437aa",
			"version": 0,
			"timestamp": 11732653,
			"height": 256220,
			"previousBlock": "e6eb62c1b6c0296dbe769bd99f7a422e5544d410324e7fb62bcab27df80f6859",
			"numberOfTransactions": 0,
			"totalAmount": 0,
			"totalFee": 0,
			"reward": 600000000,
			"payloadLength": 0,
			"payloadHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
			"generatorPublicKey": "371be464bb1e4477f988bc5f5a81796ba614eea542a4a87331f0694d9b68ec98",
			"blockSignature": "6748006bab77779af5f9c90123a09240ae6cc64a87c929a83ade2e473073a3bc0832a2bec7cc7e787f6f7823dc40f7ccb95ac19d299d383b99a117ffd80ee70e",
			"confirmations": 1,
			"generatorId": "ACPzoaPra4TiehLcfkFjBaXryukKoJk8o7",
			"totalForged": 600000000
		}, {
			"id": "e6eb62c1b6c0296dbe769bd99f7a422e5544d410324e7fb62bcab27df80f6859",
			"version": 0,
			"timestamp": 11732652,
			"height": 256219,
			"previousBlock": "0d0fab09ad1b4c358972aa1408207ddca495841fdcd2906e497e8b15d2b40733",
			"numberOfTransactions": 0,
			"totalAmount": 0,
			"totalFee": 0,
			"reward": 600000000,
			"payloadLength": 0,
			"payloadHash": "e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855",
			"generatorPublicKey": "8fe285c30fba9c0c2b335da357940d2f9f37099391224b0501be8f0111cc2a86",
			"blockSignature": "60ab5703508b0781af94ae243b896350d0f7839559d1fe343da1450c92908a607fdb2600e77a6759bda95343e5bfb3cca47279159951d1d1ce1b115ac1a2f206",
			"confirmations": 2,
			"generatorId": "ACtpsr2WiTZSvhtinfYgy63AoNiRBSxWVP",
			"totalForged": 600000000
		}],
		"count": 256220
	}
	
#### 3.3 获取区块链高度  
接口地址：/api/blocks/getHeight     
请求方式：GET       
支持格式：urlencoded      


返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| height | Integer  |区块高度|

  

请求示例： 
	
	//get请求
	curl -k -X GET 'http://etm.red:8096/api/blocks/getheight'    

JSON返回示例：  

	{
		"success": true,
		"height": 256414
	}
	
#### 3.4 获取普通转账手续费  
接口地址：/api/blocks/getFee     
请求方式：GET       
支持格式：urlencoded      


返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| fee | Integer  |交易手续费|

  

请求示例： 
	
	//get请求
	curl -k -X GET 'http://etm.red:8096/api/blocks/getfee'    

JSON返回示例：  

	{
		"success": true,
		"fee": 10000000
	}

#### 3.5 获取里程碑  
接口地址：/api/blocks/getMilestone     
请求方式：GET       
支持格式：urlencoded      


返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| milestone | Integer  |里程碑|

  

请求示例： 
	
	//get请求
	curl -k -X GET 'http://etm.red:8096/api/blocks/getMilestone'    

JSON返回示例：  

	{
		"success": true,
		"milestone": 0
	}

#### 3.6 查看单个区块奖励 
接口地址：/api/blocks/getReward     
请求方式：GET       
支持格式：urlencoded      


返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| reward | Integer  |区块奖励，包含受托人奖励和手续费|

  

请求示例： 
	
	//get请求
	curl -k -X GET 'http://etm.red:8096/api/blocks/getReward'    

JSON返回示例：  

	{
		"success": true,
		"reward": 600000000
	}


#### 3.7 获取代币当前供应值 
接口地址：/api/blocks/getSupply     
请求方式：GET       
支持格式：urlencoded      


返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| supply | Integer  |全网代币数|

  

请求示例： 
	
	//get请求
	curl -k -X GET 'http://etm.red:8096/api/blocks/getSupply'    

JSON返回示例：  

	{
		"success": true,
		"supply": 10153984000000000
	}


#### 3.8 区块链状态 
接口地址：/api/blocks/getStatus     
请求方式：GET       
支持格式：urlencoded      


返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| height | Integer  |区块高度|
| fee | Integer  |交易手续费|
| milestone | Integer  |里程碑|
| reward | Integer  |奖励|
| supply | Integer  |全网代币数|

  

请求示例： 
	
	//get请求
	curl -k -X GET 'http://etm.red:8096/api/blocks/getStatus'    

JSON返回示例：  

	{
		"success": true,
		"height": 256851,
		"fee": 10000000,
		"milestone": 0,
		"reward": 600000000,
		"supply": 10154105200000000
	}

#### 3.9 获取指定区块的交易信息  
接口地址：/api/blocks/full     
请求方式：GET       
支持格式：urlencoded      
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| id | String | 2选1   | 区块id |
| height | Integer | 2选1   | 区块高度 |

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| block | json  |区块数据|

  

请求示例： 
	
	//get请求
	curl -k -X GET 'http://etm.red:8096/api/blocks/full?height=1'    

JSON返回示例：  

	{
		"success": true,
		"block": {
			"id": "b8f0e9310ede1fc64fbbcdc7dee0edebdd74490017e5b4261573c14c80de591a",
			"version": 0,
			"timestamp": 0,
			"height": 1,
			"previousBlock": "",
			"numberOfTransactions": 405,
			"totalAmount": 10000000000000000,
			"totalFee": 0,
			"reward": 0,
			"payloadLength": 58419,
			"payloadHash": "855b2b1b71f9c7ef07503587ab4be73904d67615f26840f88dcb7a625ccea593",
			"generatorPublicKey": "e8de2877f5448b3f105fdd059c060f286d4db34226b3c2d9c6e4bbe248072574",
			"blockSignature": "6e7b7eaefbee6b04d7bfea9680a0dcf22025d60a6dacb8d49370489a947327b164e8c0530764dd125549396c38958d2c1fe0fb5fea5e5dd259d4390f76d10c0a",
			"generatorId": "ACfVWA1TJ1NbrDHUefjfiaykUezAgfvPZ9",
			"totalForged": 0,
			"generationSignature": "0000000000000000000000000000000000000000000000000000000000000000",
			"transactions": [{
				"id": "f0af7052a760edb104c118d1f6950f597f50a314b872508d9bc7e16f7062219c",
				"height": 1,
				...




### 4.受托人delegates
#### 4.1 获取受托人总个数  
接口地址：/api/delegates/count     
请求方式：GET       
支持格式：urlencoded      



返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| count | Integer  |受托人总个数|

  

请求示例： 
	
	//get请求
	curl -k -X GET 'http://etm.red:8096/api/delegates/count'    

JSON返回示例：  

	{
		"success":true,
		"count":101
	}

	
#### 4.2 根据受托人公钥查看哪些人为其投了票  
接口地址：/api/delegates/voters     
请求方式：GET       
支持格式：urlencoded      
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| publicKey | String | Y   | 受托人公钥 |

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| accounts | array  |账户json串组成的数组|

  

请求示例： 
	
	//get请求
	curl -k -X GET 'http://etm.red:8096/api/delegates/voters?publicKey=a08dc0d7b170a0e12caff0a7faaef952741e65f3585905a5847e4d877d650f07'    

JSON返回示例：  

	{
		"success": true,
		"accounts": [{
			"username": "",
			"address": "AArvV1RBaWW4AZcwas15wUA3DQiBoKxZk7",
			"publicKey": "76cab33bb890ec3c59151e16b2e78a4339c4fdf4bf7f9d9f921ec7c2f1c112bf",
			"balance": 101151812,
			"weight": 66.5551839464883
		}, {
			"username": "",
			"address": "AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX",
			"publicKey": "813a4934192334fdd55f966f25975757b3bc2b866552fa58687e7f8420190961",
			"balance": 421780000000,
			"weight": 33.44481605351171
		}]
	}

#### 4.3 根据公钥或者用户名获取受托人详情  
接口地址：/api/delegates/get     
请求方式：GET       
支持格式：urlencoded   
接口说明：通过公钥或者用户名获取受托人信息   
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| publicKey | String | 2选1   | 受托人公钥 |
| username | String | 2选1   | 受托人用户名 |

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| delegate | json  |委托人详情|

  

请求示例： 
	
	//get请求
	curl -k -X GET 'http://etm.red:8096/api/delegates/get?publicKey=a08dc0d7b170a0e12caff0a7faaef952741e65f3585905a5847e4d877d650f07'  
	curl -k -X GET 'http://etm.red:8096/api/delegates/get?username=etm_002'    

JSON返回示例：  
	
	//返回结果是一致的
	{
		"success": true,
		"delegate": {
			"username": "etm_002",
			"isDelegate": 1,
			"address": "AMowWYG8ND5Yx13Q5ULyYAF63v1rkmdTCC",
			"publicKey": "a08dc0d7b170a0e12caff0a7faaef952741e65f3585905a5847e4d877d650f07",
			"balance": 1544697425722,
			"vote": 66870772,
			"producedblocks": 2574,
			"missedblocks": 178,
			"fees": 897425722,
			"rewards": 1543800000000,
			"rate": 1,
			"approval": 1.66,
			"productivity": 93.53,
			"forged": "1544697425722"
		}
	}

#### 4.4 获取受托人列表  
接口地址：/api/delegates     
请求方式：GET       
支持格式：urlencoded   
接口说明：如果不加参数则会返回全网受托人列表   
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| address | String | N   | 受托人地址 |
| limit | Integer | N   | 限制返回结果数据集的个数 |
| offset | Integer | N   | 偏移量，最小值：0 |
| orderBy | String | N   | 排序字段:排序规则，如:desc |

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| delegates | array  |受托人详情列表|

  

请求示例： 
	
	//get请求
	//按照得票率降序排序，取出前2名   
	curl -k -X GET 'http://etm.red:8096/api/delegates?orderby=approval:desc&limit=2'   

JSON返回示例：  
	
	{
		"success": true,
		"delegates": [{
			"username": "etm_002",
			"isDelegate": 1,
			"address": "AMowWYG8ND5Yx13Q5ULyYAF63v1rkmdTCC",
			"publicKey": "a08dc0d7b170a0e12caff0a7faaef952741e65f3585905a5847e4d877d650f07",
			"balance": 1545297425722,
			"vote": 66870772,
			"producedblocks": 2575,
			"missedblocks": 178,
			"fees": 897425722,
			"rewards": 1544400000000,
			"rate": 1,
			"approval": 1.66,
			"productivity": 93.53,
			"forged": "1545297425722"
		}, {
			"username": "etm_001",
			"isDelegate": 1,
			"address": "A9gkb1WnCEG93rkqieRdnuzjjdkVcViSCj",
			"publicKey": "ae28cc3069f4291756168e602a11e5b5d13e546050e3c1d9a09c0311f53a159c",
			"balance": 1569298019864,
			"vote": 49460151,
			"producedblocks": 2615,
			"missedblocks": 168,
			"fees": 898019864,
			"rewards": 1568400000000,
			"rate": 2,
			"approval": 1.23,
			"productivity": 93.96,
			"forged": "1569298019864"
		}],
		"totalCount": 101
	}

#### 4.5 获取受托人设置的转账费  
接口地址：/api/delegates/fee     
请求方式：GET       
支持格式：urlencoded    
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| publicKey | String | Y   | 受托人公钥 |

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| fee | Integer  |转账费|

  

请求示例： 
	
	//get请求
	//按照得票率降序排序，取出前2名   
	curl -k -X GET 'http://etm.red:8096/api/delegates/fee?publicKey= a08dc0d7b170a0e12caff0a7faaef952741e65f3585905a5847e4d877d650f07'   

JSON返回示例：  
	
	{
		"success":true,
		"fee":10000000
	}

#### 4.6 根据公钥查看其出块情况  
接口地址：/api/delegates/forging/getForgedByAccount     
请求方式：GET       
支持格式：urlencoded    
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| generatorPublicKey | String | Y   | 区块生成者公钥 |

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| fees | Integer  |收取的手续费|
| rewards | Integer  |已获得的奖励|
| forged | Integer  |出块获得的总奖励|

  

请求示例： 
	
	//get请求
	//按照得票率降序排序，取出前2名   
	curl -k -X GET 'http://etm.red:8096/api/delegates/forging/getForgedByAccount?generatorPublicKey=a08dc0d7b170a0e12caff0a7faaef952741e65f3585905a5847e4d877d650f07'   

JSON返回示例：  
	
	{
		"success": true,
		"fees": 897425722,
		"rewards": 1546800000000,
		"forged": 1547697425722
	}
	
#### 4.7 注册受托人  
接口地址：/api/delegates     
请求方式：PUT       
支持格式：JSON    
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| secret | String | Y   | 账户密码 |
| publicKey | String | N   | 公钥 |
| secondSecret | String | N   | 账户二级密码，最小长度：1，最大长度：100 |
| username | String | N   | 受托人名字 |

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| transaction | json  |注册受托人交易详情|

  

请求示例([参考](../utils/delegate.js))： 
	
	//注册受托人
	function registerDelegate() {
	  return JSON.stringify({
	    'secret':secret,
	    'username':'delegate_001'
	  });
	}
	
	axios.put(url, registerDelegate()).then(res => {
	  console.log(res);
	}).catch(err => {
	  console.error(err);
	})   

JSON返回示例：  
	
	{
		success: true,
		transaction: {
			type: 2,
			amount: 100000000000,
			senderPublicKey: 'bd93add22ab931a279f0ef741b768796afc3756ec697f76bef4e2f634969294d',
			requesterPublicKey: null,
			timestamp: 11735247,
			asset: [Object],
			recipientId: 'A4MFB3MaPd355ug19GYPMSakCAWKbLjDTb',
			signature: '3ba7eaa5b2996e21c5dbb5fea4b2cb629cb7f45939d74cf89acf740afb72e1db07d8d7b85a2438c047ef25c19e8e5848bc64147628cc3185df6569f0f2422d05',
			id: '544fb942393255e025c6a354333f6c62e6fefe08de364472dc502f2324900129',
			fee: 10000000,
			senderId: 'A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr'
		}
	}
	//查看钱包受托人
	102	delegate_001	A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr 0	0    0

#### 4.8 受托人开启出块  
接口地址：/api/delegates/forging/enable     
请求方式：POST       
支持格式：JSON    
请求说明：url必须是受托人所在服务器   
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| secret | String | Y   | 账户密码 |
| publicKey | String | N   | 受托人公钥 |

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| address | String  |受托人地址|

  

请求示例： 
	
	//POST请求
	//请在节点服务器上运行此代码  
	curl -k -H "Content-Type: application/json" -X POST -d '{"secret":"race forget pause shoe trick first abuse insane hope budget river enough"}' 'http://localhost:8096/api/delegates/forging/enable'   

JSON返回示例：  
	
	{
		"success": true,
		"address": "A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr"
	}
	
#### 4.9 受托人关闭出块  
接口地址：/api/delegates/forging/disable     
请求方式：POST       
支持格式：JSON    
请求说明：url必须是受托人所在服务器    
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| secret | String | Y   | 账户密码 |
| publicKey | String | N   | 受托人公钥 |

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| address | String  |受托人地址|

  

请求示例： 
	
	//post请求   
	curl -k -H "Content-Type: application/json" -X POST -d '{"secret":"race forget pause shoe trick first abuse insane hope budget river enough"}' 'http://localhost:8096/api/delegates/forging/disable'   

JSON返回示例：  
	
	{
		"success": true,
		"address": "A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr"
	}
	
	
#### 4.10 受托人出块状态查看  
接口地址：/api/delegates/forging/status     
请求方式：GET       
支持格式：urlencoded    
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| publicKey | String | Y   | 受托人公钥 |

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| fee | Integer  |转账费|

  

请求示例： 
	
	//get请求
	curl -k -X GET 'http://etm.red:8096/api/delegates/forging/status?publicKey=a08dc0d7b170a0e12caff0a7faaef952741e65f3585905a5847e4d877d650f07'   

JSON返回示例：  
	
	{
		"success":true,
		"enabled":true
	}

### 5.节点
#### 5.1 获取本机连接的所有节点信息  
接口地址：/api/peers     
请求方式：GET       
支持格式：urlencoded   
接口说明：展示节点只是和本机有连接的节点，并不是全网所有的节点    
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| state | Integer | N   | 节点状态,0: ,1:,2:,3: //TODO |
| os | String | N   | 内核版本 |
| version | String | N   | ETM版本 |
| limit | Integer | N   | 限制结果集个数，最小值：0,最大值：100 |
| orderBy | String | N   | 排序 |
| offset | Integer | N   | 偏移量 |
| port | Integer | N   | 端口 |

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| peers | array  |节点信息json构成的数组|
| totalCount | Integer  |当前正在运行的节点个数|

  

请求示例： 
	
	//get请求
	curl -k -X GET 'http://etm.red:8096/api/peers?limit=1'   

JSON返回示例：  
	
	//由于是单节点运行，所以没有peers
	{
		"success": true,
		"count": 0,
		"peers": []
	}
	
#### 5.2 获取本节点版本号等信息  
接口地址：/api/peers/version     
请求方式：GET       
支持格式：urlencoded    

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| version | String  |版本号|
| build | timestamp  |构建时间|
| net | String  |主链或者测试链|

  

请求示例： 
	
	//get请求
	curl -k -X GET 'http://etm.red:8096/api/peers/version'   

JSON返回示例：  
	
	{
		"success": true,
		"version": "1.0.0",
		"build": "development",
		"net": "localnet"
	}
	
#### 5.3 获取指定ip节点信息  
接口地址：/api/peers/get     
请求方式：GET       
支持格式：urlencoded    
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| ip | String | Y   | 待查询节点ip |
| port | Integer | Y   | 待查询节点端口，1~65535 |

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| peer | json  |节点数据返回|

  

请求示例： 
	
	//get请求
	curl -k -X GET 'http://etm.red:8096/api/peers/get?ip=47.96.68.153&port=8096'   

JSON返回示例：  
	
	{
		"success":true
	}

### 6.同步和加载
#### 6.1 查看本地区块链加载状态  
接口地址：/api/loader/status     
请求方式：GET       
支持格式：urlencoded    


返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| loaded | boolean  |是否加载|
| blocksCount | Integer  |//TODO|

  

请求示例： 
	
	//get请求
	curl -k -X GET 'http://etm.red:8096/api/loader/status'   

JSON返回示例：  
	
	{
		"success": true,
		"loaded": true,
		"blocksCount": 0
	}
#### 6.2 查看区块同步信息  
接口地址：/api/loader/status/sync     
请求方式：GET       
支持格式：urlencoded    


返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| height | Integer  |区块高度|

  

请求示例： 
	
	//get请求
	curl -k -X GET 'http://etm.red:8096/api/loader/status/sync'   

JSON返回示例：  
	
	{
		"success": true,
		"syncing": false,
		"blocks": 0,
		"height": 327158
	}

### 7.二级密码
#### 7.1 设置二级密码
接口地址：/api/signatures     
请求方式：PUT       
支持格式：JSON       
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| secret | String | Y   | 账户密码 |
| publicKey | String | N   | 公钥 |
| secondSecret | String | Y   | 账户二级密码，最小长度：1，最大长度：100 |
| multisigAccountPublicKey | String | N   | 多重签名账户公钥 |


返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| transaction | json  |设置二级密码产生的交易详情|

  

请求示例([参考](../utils/signatures.js))： 
	
	//主链
	let url = 'http://etm.red:8096/api/signatures'
	//侧链
	
	//设置二级密码的账户
	let secret = 'found razor spring fish surprise liar else argue tongue crouch fatal lucky';
	
	//设置二级密码
	function setSignature() {
	  return JSON.stringify({
	    'secret':secret,
	    'secondSecret':'test001'
	  });
	}
	
	axios.put(url, setSignature()).then(res => {
	  console.log(res);
	}).catch(err => {
	  console.error(err);
	}) 

JSON返回示例：  
	
	{
		success: true,
		transaction: {
			type: 1,//设置二级密码密码的交易类型为1  
			amount: 0,
			senderPublicKey: '88a2440cefa9d8b1204bd7b8f10f724c163c9fd49ecb9f568ce718ca5b91cc07',
			requesterPublicKey: null,
			timestamp: 11804694,
			asset: [Object],
			recipientId: null,
			signature: '11c3e36df365d07e422a9c288f9dc993db8d2d13fb4caef45dbd7598dad748332194bbeff0d255ea7e9944b9ebfd65259ec94dcfab129a9c43710d4558e54207',
			id: '7674ad2bcfe4a569f13fd679a244c0116be804817905f47a76338149fe2f0fe3',
			fee: 500000000,//设置二级密码密码的手续费为5ETM
			senderId: 'AGKTTewJzJkteWJ9MVEupgCLhgKELsvU7T'
		}
	}
#### 7.2 获取二级密码设置的手续费
接口地址：/api/signatures/fee     
请求方式：GET       
支持格式：urlencoded   


返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| fee | Integer  |手续费|

  

请求示例： 
	
	//get请求
	curl -k -X GET 'http://etm.red:8096/api/signatures/fee'   

JSON返回示例：  
	
	{
		"success": true,
		"fee": 500000000 //5ETM
	}

### 8.多重签名
#### 8.1 设置普通账户为多重签名账户
//TODO 该接口没有验证成功，没有设置成功，主要是因为还需要其他人签名，如何签名？   
接口地址：/api/multisignatures     
请求方式：PUT       
支持格式：JSON
接口说明：返回结果只是生成交易id，还需要其他人签名后该账户才能成功设置成多重签名账户。注册多重签名账户后任意一笔转账都需要多人签名，签名最少个数为min的值（含交易发起人自身）      
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| secret | String | Y   | 账户密码 |
| publicKey | String | N   | 公钥 |
| secondSecret | String | N   | 账户二级密码，最小长度：1，最大长度：100 |
| min | Integer | Y   | 多重签名交易账户的任意一笔转账都需要多人签名的最少个数，如果是注册多重签名账户操作，这该值不生效（此时需要所有人都签名）。最小值：2，最大值：16,该值需要小于keysgroup.length+1 |
| lifetime | Integer | Y   | 多重签名交易的最大挂起时间，最小值：1，最大值：24，暂时不生效//TODO |
| keysgroup | array | Y   | 其它签名人的公钥数组，每个公钥前需要加上+或者-号，代表增加/删除多重签名账户，数组最小长度：1，数组最大长度：10 |

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| transactionId | String  |多重签名交易的id|

  

请求示例([参考](../utils/multisignatures.js))： 
	
	//第一步 设置多重签名密码
	function setMultisignature() {
	  return JSON.stringify({
	    'secret':secret,
	    'min':2,
	    'lifetime':1,
	    'keysgroup':['+813a4934192334fdd55f966f25975757b3bc2b866552fa58687e7f8420190961']
	  });
	}
	
	
	axios.put(url, setMultisignature()).then(res => {
	  console.log(res);
	}).catch(err => {
	  console.error(err);
	})   

JSON返回示例：  
	
	{ 
		success: true,
		//返回结果只是生成交易id，还需要其他人签名后该账户才能成功设置成多重签名账户
		transactionId: '355ce9527e074e661b4b7cbb01496d5574693c9ead25b904484e0c83564c5646' 
	   }
#### 8.2 非交易发起人对交易进行多重签名
接口地址：/api/multisignatures/sign     
请求方式：POST       
支持格式：JSON      
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| secret | String | Y   | 账户密码|
| secondSecret | String | N   | 二级密码|
| publicKey | String | N   | 公钥 |
| transactionId | String | Y   | 交易id （请见8.1 返回结果） |

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| transactionId | String  |多重签名交易id|

  

请求示例（[参考](../utils/multisignatures.js)）： 
	
	//第二步  非交易发起人对设置多重签名交易进行签名
	function signatureMu() {
	  return JSON.stringify({
	    'secret':'pepper sleep youth blast vivid circle cross impact zebra neck salmon fee',
	    'transactionId':'355ce9527e074e661b4b7cbb01496d5574693c9ead25b904484e0c83564c5646'
	  });
	}  

JSON返回示例：  
	
	{ 
		success: false,
  		error: 'Transaction not found'
  	}
  	
#### 8.3 根据公钥获取挂起的多重签名交易详情
接口地址：/api/multisignatures/pending     
请求方式：GET       
支持格式：urlencoded    
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| publicKey | String | Y  | 公钥 |

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| transactions | array  |交易json组成的数组|

  

请求示例： 
	
	//get请求
	curl -k -X GET 'http://etm.red:8096/api/multisignatures/pending?publicKey=911e58e289cf237d08b71e296ba766b1c6fcf9816a415ff38846043135476aaa'   

JSON返回示例：  
	
	//TODO此接口有问题
	{
		"success":true,
		"transactions":[]
	}
	
#### 8.4 获取多重签名账户信息
接口地址：/api/multisignatures/accounts     
请求方式：GET       
支持格式：urlencoded     
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| publicKey | String | Y  | 公钥 |

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| accounts | array  |多重签名账户详情|

  

请求示例： 
	
	//get请求
	curl -k -X GET 'http://etm.red:8096/api/multisignatures/accounts?publicKey=911e58e289cf237d08b71e296ba766b1c6fcf9816a415ff38846043135476aaa'   

JSON返回示例：  
	
	//TODO 接口有问题
	{
		"success":false,
		"error":"TypeError: Cannot read property 'split' of null"
	}

### 9.点对点传输
#### 9.1 说明
/peer相关的api，在请求时都需要设置一个header
	
	axios.defaults.headers = {
	  'Content-Type': 'application/json',
	  'magic': 'personal',//测试链  根据链参数填写
	  'version': ''
	}
#### 9.2 普通交易

entanmo系统的所有写操作都是通过发起一个交易来完成的。 交易数据通过一个叫做etm-js的库来创建，然后再通过一个POST接口发布出去。   


##### 9.2.1 设置二级密码
接口地址：/peer/transactions     
请求方式：POST       
支持格式：JSON       
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| transaction | json | Y  | etm-js.signature.createSignature生成的交易数据 |

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |  
| transactionId |String  |交易id      |   

  

请求示例（[参考](../utils/normal_transactions.js)）： 
	
	//9.2.1 设置二级密码
	function setSecondPassword() {
	  let secondPassword = 'test001';
	  let transaction = etmjs.signature.createSignature(secret, secondPassword);
	  return JSON.stringify({
	    "transaction": transaction
	  })
	}   

JSON返回示例：  
	
	{ 
		success: true,
		transactionId: '9cb72093de3b2c9fd3c87d6131f71e948c852a6c43c80611e56a9766087da696' 
    }

##### 9.2.2 转账
接口地址：/peer/transactions     
请求方式：POST       
支持格式：JSON         
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| transaction | json | Y  | etm-js.transaction.createTransaction生成的交易数据 |

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| transactionId | String  |交易id |

  

请求示例（[参考](../utils/normal_transactions.js)）： 
	
	//9.2.2 转账 （转ETM）
	function transferETM() {
	  let targetAddress = "APeskjFa4KRR3oHHP7wqFP8tpQxiTrDD9a";
	  let amount = 100*100000000;
	  let password1 = 'race forget pause shoe trick first abuse insane hope budget river enough';
	  let secondPassword  = '';
	  let message = ''; // 转账备注
	
	  // 其中password是在用户登录的时候记录下来的，secondPassword需要每次让用户输入
	  // 可以通过user.secondPublicKey来判断用户是否有二级密码，如果没有，则不必输入，以下几个交易类型类似
	  let transaction = etmjs.transaction.createTransaction(targetAddress, amount, message, password1, secondPassword || undefined);
	
	  return JSON.stringify({
	    "transaction": transaction
	  })
	}  

JSON返回示例：  
	
	{ 
		success: true,
		transactionId: '1e35552a2b2ea4ad3426e2482e8c117e4943d77e14a3807bd8a786d4cbf9a95e' 
	}

##### 9.2.3 注册受托人
接口地址：/peer/transactions     
请求方式：POST       
支持格式：JSON         
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| transaction | json | Y  | etm-js.delegate.createDelegate生成的交易数据|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| transactionId | String  |交易id |

  

请求示例： 
	
	//9.2.3 注册受托人
	function registerDelegate() {
	  let secondPassword  = 'test001';
	  let userName = 'test001';
	
	  let transaction = etmjs.delegate.createDelegate(userName, secret, secondPassword || undefined);
	  return JSON.stringify({
	    "transaction": transaction
	  })
	}  

JSON返回示例：  
	
	//TODO 接口有问题
	{ 
		success: false,
		error: 'Invalid transaction type/fee: 70e21df3b3a348e05cc91a9d3d2e75653925dc2ad212ba5e59a1bec1fd54c798' 
	}

##### 9.2.4 投票与取消投票
接口地址：/peer/transactions     
请求方式：POST       
支持格式：JSON         
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| transaction | json | Y  | etm-js.vote.createVote生成的交易数据|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| transactionId | String  |交易id |

  

请求示例： 
	

	//9.2.4 投票与取消投票
	function vote() {
	  let secondPassword = 'test001';
	  // 投票内容是一个列表，列表中的每一个元素是一个符号加上所选择的受托人的公钥，符号为+表示投票，符号为-表示取消投票
	  let voteContent = [
	    '-ae28cc3069f4291756168e602a11e5b5d13e546050e3c1d9a09c0311f53a159c',
	    '+a08dc0d7b170a0e12caff0a7faaef952741e65f3585905a5847e4d877d650f07'
	  ];
	  let transaction = etmjs.vote.createVote(voteContent, secret, secondPassword || undefined);
	  return JSON.stringify({
	    "transaction": transaction
	  })
	}  

JSON返回示例：  

	//TODO  一次投几票？	
	{ 
		success: true,
		transactionId: '69b52c38b63711a1a9ee117c27e3a8a775eca6bef5bd0992328fbed5b10ccbd8' 
	}

##### 9.2.5 账户锁仓
接口地址：/peer/transactions     
请求方式：POST       
支持格式：JSON   
请求说明：锁仓后且区块高度未达到锁仓高度，则该账户不能执行如下操作   

|交易类型type	|备注  |  
|------ |-----  |
| 0 | 主链ETM转账 |
| 6 | Dapp充值 |
| 7 | Dapp提现 |
| 8 | 存储小文件 |
| 9 | 发行商注册 |
| 10 | 资产注册 |
| 13 | 资发行产 |
| 14 | 主链uia转账 |

请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| transaction | json | Y  | etm-js.transaction.createLock生成的交易数据|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| transactionId | String  |交易id |

  

请求示例： 
	
	//9.2.5 锁仓
	function createLock() {
	  let height = 344900; // 锁仓高度 要大于主链高度
	  let secondPassword = 'test001';
	  // 其中password是在用户登录的时候记录下来的，secondPassword需要每次让用户输入
	  // 可以通过user.secondPublicKey来判断用户是否有二级密码，如果没有，则不必输入，以下几个交易类型类似
	  let transaction = etmjs.transaction.createLock(height, secret, secondPassword || undefined);
	  return JSON.stringify({
	    "transaction": transaction
	  })
	}
  

JSON返回示例：  
	
	{ 
		success: true,
		transactionId: 'a9907b367c40244153a82e78343e7663e749937c7351cf4005893dfd87a46628' 
	}

#### 9.3 UIA相关交易
##### 9.3.1 注册资产发行商
接口地址：/peer/transactions     
请求方式：POST       
支持格式：JSON         
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| transaction | json | Y  | etm-js.uia.createIssuer根据发行商名字、描述、一级密码、二级密码生成的交易数据|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| transactionId | String  |交易id |

  

请求示例： 
	
	//9.3.1 注册资产发行商  花费100 ETM
	function registerAssertIssuer() {
	  let password = 'found razor spring fish surprise liar else argue tongue crouch fatal lucky'
	  let secondPassword ='test001'
	  let transaction = etmjs.uia.createIssuer('issuerName', "issuer", password, secondPassword);
	  return JSON.stringify({
	    transaction
	  });
	} 

JSON返回示例：  
	
	{ 
		success: true,
		transactionId: '2c093b41dbae45a20095dc623359d4cb71975d441b3ca7aaf1d1b5d21cb25dbe' 
	}

##### 9.3.2 注册资产
接口地址：/peer/transactions     
请求方式：POST       
支持格式：JSON       
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| transaction | json | Y  | etm-js.uia.createAsset根据资产名字、描述、上限、精度、策略、一级密码、二级密码生成的交易数据|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| transactionId | String  |交易id |

  

请求示例： 
	
	//9.3.2 注册资产 500 ETM
	function registerAssrt() {
	  let password = 'found razor spring fish surprise liar else argue tongue crouch fatal lucky'
	  // 资产名称，发行商名.资产名，唯一标识
	  let name = 'issuerName.CNY';
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
	
	  let secondPassword ='test001'
	  // 构造交易数据
	  let trs = etmjs.uia.createAsset(name, desc, maximum, precision, strategy, allowWriteoff, allowWhitelist, allowBlacklist, password, secondPassword)
	  return JSON.stringify({
	    "transaction": trs
	  })
	} 

JSON返回示例：  
	
	 { 
	 	success: true,
	 	transactionId: 'db46dea3f1a5c99d2b4e3186b950f1ee309c95291d4874a8b839f0d26c63d1c9' 
	 }

##### 9.3.3 资产设置acl模式
接口地址：/peer/transactions     
请求方式：POST       
支持格式：JSON       
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| transaction | json | Y  | etm-js.uia.createFlags根据资产名、流通状态、黑白名单模式、一级密码、二级密码生成的交易数据|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| transactionId | String  |交易id |

  

请求示例： 
	
	//9.3.3 资产设置acl模式
	function setAcl() {
	  let password = 'found razor spring fish surprise liar else argue tongue crouch fatal lucky'
	  let secondSecret = 'test001'
	  let currency = 'issuerName.CNY'
	  // 资产是否注销，1：流通，2：注销
	  let flagType = 1
	  // 访问控制列表的类型，0：黑名单， 1：白名单，资产创建后默认为黑名单模式
	  let flag = 1
	  let trs = etmjs.uia.createFlags(currency, flagType, flag, password, secondSecret)
	
	  return JSON.stringify({
	    "transaction": trs
	  })
	} 

JSON返回示例：  
	
	//TODO 接口有问题
	{ 
		success: false,
		error: 'Whitelist not allowed' 
	}

##### 9.3.4 更新访问控制列表
接口地址：/peer/transactions     
请求方式：POST       
支持格式：JSON       
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| transaction | json | Y  | etm-js.uia.createAcl根据资产名字、列表操作方法、黑名单还是白名单、地址列表、一级密码、二级密码生成的交易数据|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| transactionId | String  |交易id |

  

请求示例： 
	
	//9.3.4 更新访问控制列表
	function updateAcl() {
	  let password = 'found razor spring fish surprise liar else argue tongue crouch fatal lucky'
	  let secondSecret = 'test001'
	  let currency = 'issuerName.CNY'
	  // '+'表示增加列表， ‘-’表示删除列表
	  var operator = '+'
	  // 将生成的交易数据通过post发送给server，把地址列表['A77LPkv5jEkMXAcsQ5iTzUS9rUeLezWxdB']增加到该白名单中，只修改名单列表，不修改acl模式，手续费0.2ETM
	  var list = ['A77LPkv5jEkMXAcsQ5iTzUS9rUeLezWxdB']
	  // 访问控制列表的类型，0：黑名单， 1：白名单
	  var flag =1
	  var trs = etmjs.uia.createAcl(currency, operator, flag, list, password, secondSecret)
	  return JSON.stringify({
	    "transaction": trs
	  })
	} 

JSON返回示例：  
	
	//TODO 接口有问题
	{ 
		success: false, 
		error: 'Whitelist not allowed' 
	} 

##### 9.3.5 资产发行
接口地址：/peer/transactions     
请求方式：POST       
支持格式：JSON     
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| transaction | json | Y  | etm-js.uia.createIssuer根据发行商名字、描述、一级密码、二级密码生成的交易数据|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| transactionId | String  |交易id |

  

请求示例： 
	
	//9.3.5 资产发行  0.1 ETM
	function issueAssert() {
	  let password = 'found razor spring fish surprise liar else argue tongue crouch fatal lucky'
	  let currency = 'issuerName.CNY';
	  let secondSecret = 'test001'
	  // 本次发行量=真实数量（100）*10**精度（3），所有发行量之和需 <= 上限*精度
	  //发行1亿
	  let amount = '10000000000000000'
	  let trs = etmjs.uia.createIssue(currency, amount, password, secondSecret)
	  return JSON.stringify({
	    "transaction": trs
	  })
	} 

JSON返回示例：  
	
	{ 
		success: true,
		transactionId: '901ebff4dca989eef66265a86a96a3d34689c045ada327919b49c3a41d7e6b84' 
	}
##### 9.3.6 资产转账
接口地址：/peer/transactions     
请求方式：POST       
支持格式：JSON   
请求说明：对比参考 [10.12.5 资产转账](#10125-资产转账)   
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| transaction | json | Y  | etm-js.uia.createTransfer根据资产名字、数量、接收者地址、一级密码、二级密码生成的交易数据|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| transactionId | String  |交易id |

  

请求示例： 
	
	//9.3.6 发行的资产转账
	function transferIssueAssert() {
	  let password = 'found razor spring fish surprise liar else argue tongue crouch fatal lucky'
	  let currency = 'issuerName.CNY';
	  let secondSecret = 'test001'
	  // 本次转账数（10000）=真实数量（10）*10**精度（3），需 <= 当前资产发行总量
	  let amount = '10000'
	  // 接收地址，需满足前文定义好的acl规则
	  let recipientId = 'A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr'
	  let trs = etmjs.uia.createTransfer(currency, amount, recipientId, password, secondSecret)
	  return JSON.stringify({
	    "transaction": trs
	  })
	} 

JSON返回示例：  
	
	//TODO 接口有问题
	{ 
		success: false, 
		error: 'loadAccount : can not found Account' 
	} 

##### 9.3.7 资产注销
接口地址：/peer/transactions     
请求方式：POST       
支持格式：JSON       
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| transaction | json | Y  | etm-js.uia.createFlags根据资产名字、注销状态、黑白名单模式、一级密码、二级密码生成的交易数据|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| transactionId | String  |交易id |

  

请求示例： 
	
	//9.3.7 注销资产
	function destroyAssert() {
	  let password = 'found razor spring fish surprise liar else argue tongue crouch fatal lucky'
	  let currency = 'issuerName.CNY';
	  let secondSecret = 'test001'
	  // flagType为资产是否注销，1：流通，2：注销
	  var flagType = 2
	  // flag为黑、白名单模式
	  var flag =1
	  var trs = etmjs.uia.createFlags(currency, flagType, flag, password, secondSecret)
	
	  return JSON.stringify({
	    "transaction": trs
	  })
	} 

JSON返回示例：  
	
	//TODO 接口有问题
	{ 
		success: false, 
		error: 'Writeoff not allowed' 
	} 



### 10.用户自定义资产
#### 10.1 获取全网所有发行商
接口地址：/api/uia/issuers     
请求方式：GET       
支持格式：urlencoded       
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| limit | Integer | N  | 限制结果集个数，最小值：0,最大值：100|
| offset | Integer | N  | 偏移量，最小值0|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| issuers | array  |查找的发行商|
| count | integer  |发行商总个数|

  

请求示例： 
	
	//get 请求
	http://etm.red:8096/api/uia/issuers?offset=0&limit=5 

JSON返回示例：  
	
	{
		"success": true,
		"issuers": [{
			"name": "RAY",
			"desc": "issuer",
			"issuerId": "AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX"
		}, {
			"name": "issuerName",
			"desc": "issuer",
			"issuerId": "AGKTTewJzJkteWJ9MVEupgCLhgKELsvU7T"
		}],
		"count": 2
	}


#### 10.2 查询指定发行商的信息
接口地址：/api/uia/issuers/:name     
请求方式：GET       
支持格式：urlencoded       
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| name | String | Y  | 可以为发行商名称或ETM账户地址|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| issuers | array  |包含发行商名字、描述、id(地址)|

  

请求示例： 
	
	//get 请求
	http://etm.red:8096/api/uia/issuers/RAY 

JSON返回示例：  
	
	{
		"success": true,
		"issuer": {
			"name": "RAY",
			"desc": "issuer",
			"issuerId": "AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX"
		}
	}
	
#### 10.3 查看指定发行商的资产
接口地址：/api/uia/issuers/:name/assets     
请求方式：GET       
支持格式：urlencoded       
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| name | String | Y  | 可以为发行商名称或ETM账户地址|
| limit | Integer | N  | 限制结果集个数，最小值：0,最大值：100|
| offset | Integer | N  | 偏移量，最小值0|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| assets | array  |每个元素是一个字典，每个字典是一个资产详情，包含资产名字、描述、上限（最大发行量=真实发行量*10**精度）、精度、策略、当前发行量、发行高度、发行商id，acl模式（0：黑名单，1：白名单）、是否注销|
| count | integer  |该发行商注册的资产总个数（包含已注销的）|

  

请求示例： 
	
	//get 请求
	http://etm.red:8096/api/uia/issuers/RAY/assets

JSON返回示例：  
	
	{
		"success": true,
		"assets": [{
			"name": "RAY.CNY",
			"desc": "测试",
			"maximum": "100000000000000000",
			"precision": 8,
			"strategy": "",
			"quantity": "10000000000000000",
			"height": 1777,
			"issuerId": "AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX",
			"acl": 0,
			"writeoff": 0,
			"allowWriteoff": 0,
			"allowWhitelist": 0,
			"allowBlacklist": 0,
			"maximumShow": "1000000000",
			"quantityShow": "100000000"
		}],
		"count": 1
	}
	
#### 10.4 获取全网所有资产信息
接口地址：/api/uia/assets   
请求方式：GET       
支持格式：urlencoded       
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| limit | Integer | N  | 限制结果集个数，最小值：0,最大值：100|
| offset | Integer | N  | 偏移量，最小值0|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| assets | array  |每个元素是一个字典，每个字典是一个资产详情，包含资产名字、描述、上限、精度、策略、当前发行量、发行高度、发行商id，acl、是否注销|
| count | integer  |所有资产的个数|

  

请求示例： 
	
	//get 请求
	http://etm.red:8096/api/uia/assets

JSON返回示例：  
		
	{
		"success": true,
		"assets": [{
			"name": "RAY.CNY",
			"desc": "测试",
			"maximum": "100000000000000000",
			"precision": 8,
			"strategy": "",
			"quantity": "10000000000000000",
			"height": 1777,
			"issuerId": "AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX",
			"acl": 0,
			"writeoff": 0,
			"allowWriteoff": 0,
			"allowWhitelist": 0,
			"allowBlacklist": 0,
			"maximumShow": "1000000000",
			"quantityShow": "100000000"
		}, {
			"name": "issuerName.CNY",
			"desc": "测试",
			"maximum": "100000000000000000",
			"precision": 8,
			"strategy": "",
			"quantity": "10000000000000000",
			"height": 345640,
			"issuerId": "AGKTTewJzJkteWJ9MVEupgCLhgKELsvU7T",
			"acl": 0,
			"writeoff": 0,
			"allowWriteoff": 0,
			"allowWhitelist": 0,
			"allowBlacklist": 0,
			"maximumShow": "1000000000",
			"quantityShow": "100000000"
		}],
		"count": 2
	}

#### 10.5 获取指定资产信息
接口地址：/api/uia/assets/:name   
请求方式：GET       
支持格式：urlencoded       
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| name | String | Y  | 资产名|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| asset | json  |包含资产名字、描述、上限、精度、策略、当前发行量、发行高度、发行商id，acl、是否注销|

  

请求示例： 
	
	//get 请求
	http://etm.red:8096/api/uia/assets/RAY.CNY

JSON返回示例：  
		
	{
		"success": true,
		"asset": {
			"name": "RAY.CNY",
			"desc": "测试",
			"maximum": "100000000000000000",
			"precision": 8,
			"strategy": "",
			"quantity": "10000000000000000",
			"height": 1777,
			"issuerId": "AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX",
			"acl": 0,
			"writeoff": 0,
			"allowWriteoff": 0,
			"allowWhitelist": 0,
			"allowBlacklist": 0,
			"maximumShow": "1000000000",
			"quantityShow": "100000000"
		}
	}

#### 10.6 获取指定资产的访问控制列表
接口地址：/api/uia/assets/:name/acl/flag   
请求方式：GET       
支持格式：urlencoded       
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| name | String | Y  | 资产名|
| flag | boolen | Y  | 取值0和1，0表示黑名单，1表示白名单|
| limit | Integer | N  | 限制结果集个数，最小值：0,最大值：100|
| offset | Integer | N  | 偏移量，最小值0|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| list | array  |符合规则的账户列表|
| count | integer  |符合规则账户总数|
  

请求示例： 
	
	//get 请求
	http://etm.red:8096/api/uia/assets/RAY.CNY/acl/1
	http://etm.red:8096/api/uia/assets/RAY.CNY/acl/0

JSON返回示例：  
		
	//TODO 这里肯定有问题 发行的资产默认全部都是黑名单中的，需要设置acl
	//flag = 1	
	{
		"success": true,
		"list": [],
		"count": 0
	}
	//flag = 0 
	{
		"success": true,
		"list": [],
		"count": 0
	}


#### 10.7 获取指定账户所有uia的余额
接口地址：/api/uia/balances/:address   
请求方式：GET       
支持格式：urlencoded       
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| address | String | Y  | 账户地址|
| limit | Integer | N  | 限制结果集个数，最小值：0,最大值：100|
| offset | Integer | N  | 偏移量，最小值0|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| balances | array  |拥有的资产详情列表，每个元素是一个资产，包含资产名、余额、上限、精度、当前发行量、是否注销（0：未注销，1：已注销）|
| count | integer  |当前该地址拥有的资产个数|
  

请求示例： 
	
	//get 请求
	http://etm.red:8096/api/uia/balances/AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX

JSON返回示例：  
		
	{
		"success": true,
		"balances": [{
			"currency": "RAY.CNY",
			"balance": "9998000000000000",
			"maximum": "100000000000000000",
			"precision": 8,
			"quantity": "10000000000000000",
			"writeoff": 0,
			"allowWriteoff": 0,
			"allowWhitelist": 0,
			"allowBlacklist": 0,
			"maximumShow": "1000000000",
			"quantityShow": "100000000",
			"balanceShow": "99980000"
		}],
		"count": 1
	}


#### 10.8 获取指定账户所有资产相关操作记录
接口地址：/api/uia/transactions/my/:address   
请求方式：GET       
支持格式：urlencoded  
请求说明：包含发行商创建以及资产创建、发行、转账等        
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| address | String | Y  | 账户地址|
| limit | Integer | N  | 限制结果集个数，最小值：0,最大值：100|
| offset | Integer | N  | 偏移量，最小值0|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| transactions | array  |交易列表，每个元素是一个字典代表一次交易，包含交易id、区块高度、区块id、交易类型、时间戳、发送者公钥、发送者id、接收者id（系统为空，如资产注册）、交易数量（资产交易都为0）、手续费0.1ETM、签名、多重签名、确认数、资产信息（包含发行商id、发行商名字、描述）、交易id|
| count | integer  |资产交易总个数|
  

请求示例： 
	
	//get 请求
	http://etm.red:8096/api/uia/my/transactions/AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX

JSON返回示例：  
		
	//TODO接口不存在	
	{
		"success":false,
		"error":"API endpoint not found"
	}
	//应该出现的结果
	{
		"success": true,
		"transactions": [{
			"id": "12372526051670720162",   // 交易id
			"height": "286",    // 交易所在区块高度
			"blockId": "14863181420651287815",  // 交易所在区块id
			"type": 9,  // 交易类型，9代表注册发行商
			"timestamp": 17597873,  // 交易时间，距离创世块的offset
			"senderPublicKey": "d39d6f26869067473d685da742339d1a9117257fe14b3cc7261e3f2ed5a339e3",  // 交易发起者公钥
			"senderId": "AKKHPvQb2A119LNicCQWLZQDFxhGVEY57a",   // 交易发起者id
			"recipientId": "",  //  接收者id，如果是系统则为空
			"amount": 0,    //  交易数量，如果是资产或者XAS则为非0，否则为0
			"fee": 10000000,    // 交易费
			"signature": "6a1e66387f610de5a89489105697082037b82bff4fb6f95f9786304176efe59f7d41e8fe9c5501e1b0b34a47e957a38e10e940fdb180f8ebcaf0ac062a63c601", // 交易签名
			"signSignature": "",    // 二级签名，有二级密码时才有
			"signatures": null, // 多重签名，使用多重签名账户时才有
			"confirmations": "155998",  // 交易确认数
			"asset": {
				"uiaIssuer": {
					"transactionId": "12372526051670720162",    // 交易id
					"name": "zhenxi",   // 发行商名字
					"desc": "注册资产发行商-测试"   // 发行商描述
				}
			},
			"t_id": "12372526051670720162"  // 交易id
		},
		{
			"id": "17308768226103450697",
			"height": "371",
			"blockId": "244913990990213995",
			"type": 9,
			"timestamp": 17598730,
			"senderPublicKey": "7bd645f9626820d390311fb28dc30875e8bd26cce2d04ba2809df82e84088020",
			"senderId": "AEVWQWAq3TEJkCPSDxXMP2uCRrL2xbQnsy",
			"recipientId": "",
			"amount": 0,
			"fee": 10000000,
			"signature": "6ea76ff6f58f1bc99d6b40ece45e371948db58a68f6fa41e13b34ff86bbf1f0bea53d6afe982562392861727f879205efc7d1342f6e963028985e243a94e5507",
			"signSignature": "",
			"signatures": null,
			"confirmations": "155913",
			"asset": {
				"uiaIssuer": {
					"transactionId": "17308768226103450697",
					"name": "speedtest",
					"desc": "speedtest"
				}
			},
			"t_id": "17308768226103450697"
		}],
		"count": 58
	}	
	
#### 10.9 获取指定账户指定资产的余额
接口地址：/api/uia/balances/:address/:currency   
请求方式：GET       
支持格式：urlencoded        
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| address | String | Y  | 账户地址|
| currency | String | Y  | 资产名字|
| limit | Integer | N  | 限制结果集个数，最小值：0,最大值：100|
| offset | Integer | N  | 偏移量，最小值0|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| balances | array  |包含资产名、余额、最大发行量、精度、当前发行量、是否注销|
  

请求示例： 
	
	//get 请求
	http://etm.red:8096/api/uia/balances/AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX/RAY.CNY

JSON返回示例：  
		
	{
		"success": true,
		"balance": {
			"currency": "RAY.CNY",
			"balance": "9998000000000000",
			"maximum": "100000000000000000",
			"precision": 8,
			"quantity": "10000000000000000",
			"writeoff": 0,
			"allowWriteoff": 0,
			"allowWhitelist": 0,
			"allowBlacklist": 0,
			"maximumShow": "1000000000",
			"quantityShow": "100000000",
			"balanceShow": "99980000"
		}
	}


#### 10.10 获取指定账户指定资产转账记录
接口地址：/api/uia/transactions/my/:address/:currency   
请求方式：GET       
支持格式：urlencoded        
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| address | String | Y  | 账户地址|
| currency | String | Y  | 资产名字|
| limit | Integer | N  | 限制结果集个数，最小值：0,最大值：100|
| offset | Integer | N  | 偏移量，最小值0|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| transactions | array  |交易列表，每个元素是一个字典代表一次交易，包含交易id、区块高度、区块id、交易类型、时间戳、发送者公钥、发送者id、接收者id（系统为空，如资产注册）、交易数量（资产交易都为0）、手续费0.1ETM、签名、多重签名、确认数、资产信息（包含发行商id、发行商名字、描述）、交易id|
| count | integer  |资产交易总个数|   

请求示例： 
	
	//get 请求
	http://etm.red:8096/api/uia/transactions/my/AN8qanfYV4HFdtVYoVacYm9CvVeLQ8tKFX/RAY.CNY
JSON返回示例：  
		
	//TODO  应该是有交易的	
	{
		"success":true,
		"transactions":[],
		"count":0
	}
	
	//应该出现的结果
	{
		"success": true,
		"transactions": [{
			"id": "d6102fc30931e4dc449811cbbab705fd64bc79b09de703e8172f7bdd90835abc",
			"height": "173109",
			"blockId": "baa23acd566780e338436b48e4eb79a87d3bdd67caeb3812a663da8f77ae87d9",
			"type": 14,
			"timestamp": 19481489,
			"senderPublicKey": "fafcd01f6b813fdeb3c086e60bc7fa9bfc8ef70ae7be47ce0ac5d06e7b1a8575",
			"senderId": "16358246403719868041",
			"recipientId": "AKKHPvQb2A119LNicCQWLZQDFxhGVEY57a",
			"amount": 0,
			"fee": 10000000,
			"signature": "77789071a2ad6d407b9d1e0d654a9deb6d85340a3d2a13d786030e26ac773b4e9b5f052589958d2b8553ae5fc9449496946b5c225e0baa723e7ddecbd89f060a",
			"signSignature": "f0d4a000aae3dd3fa48a92f792d4318e41e3b56cdbaf98649261ae34490652b87645326a432d5deb69f771c133ee4b67d2d22789197be34249e6f7f0c30c1705",
			"signatures": null,
			"confirmations": "90853",
			"asset": {
				"uiaTransfer": {
					"transactionId": "d6102fc30931e4dc449811cbbab705fd64bc79b09de703e8172f7bdd90835abc",
					"currency": "IssuerName.CNY",
					"amount": "10000",
					"amountShow": "10"
				}
			},
			"t_id": "d6102fc30931e4dc449811cbbab705fd64bc79b09de703e8172f7bdd90835abc"
		}],
		"count": 15
	}


#### 10.11 获取指定资产转账记录
接口地址：/api/uia/transactions/my/:address/:currency   
请求方式：GET       
支持格式：urlencoded        
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| address | String | Y  | 账户地址|
| currency | String | Y  | 资产名字|
| limit | Integer | N  | 限制结果集个数，最小值：0,最大值：100|
| offset | Integer | N  | 偏移量，最小值0|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| transactions | array  |交易列表，每个元素是一个字典代表一次交易，包含交易id、区块高度、区块id、交易类型、时间戳、发送者公钥、发送者id、接收者id（系统为空，如资产注册）、交易数量（资产交易都为0）、手续费0.1ETM、签名、多重签名、确认数、资产信息（包含发行商id、发行商名字、描述）、交易id|
| count | integer  |资产交易总个数|   

请求示例： 
	
	//get 请求
	http://etm.red:8096/api/uia/transactions/RAY.CNY
JSON返回示例：  
		
	//TODO  应该是有交易的	
	{
		"success":true,
		"transactions":[],
		"count":0
	}
	
	//应该出现的结果
	{
		success: true,
		transactions: [{
			id: "a1ff79e3f37fd73b41abd293c22171ac7760160ad457e55f028e7a8b527651d3",
			height: "43",
			blockId: "b16b87e79b47edffdc2fd93bd1de70cbe3541684d5dbf8dc1d292903275e03dc",
			type: 14,
			timestamp: 39167334,
			senderPublicKey: "2856bdb3ed4c9b34fd2bba277ffd063a00f703113224c88c076c0c58310dbec4",
			senderId: "ANH2RUADqXs6HPbPEZXv4qM8DZfoj4Ry3M",
			recipientId: "AMzDw5BmZ39we18y7Ty9VW79eL9k7maZPH",
			amount: 0,
			fee: 10000000,
			signature: "a4e6b0e2c265e0d601fdfc9e82d971e7908457383835b801c725cdaac01bd619a435344241c64247599255f43a43b6576e1da3a357eac5bbd7058e013a8aa60e",
			signSignature: "",
			signatures: null,
			confirmations: "809",
			args: null,
			message: "",
			asset: {
				uiaTransfer: {
					transactionId: "a1ff79e3f37fd73b41abd293c22171ac7760160ad457e55f028e7a8b527651d3",
					currency: "absorb.YLB",
					amount: "200000000",
					amountShow: "2",
					precision: 8
				}
			}
		},
		{
			id: "7cf50223e12b6eb51096353a066befcf2ef862bdd4d4eddcba28a79aa0249af9",
			height: "809",
			blockId: "278b096893bc028bb79692faec02de8c2f367804485b71f14e46027f3dd3000c",
			type: 14,
			timestamp: 39182041,
			senderPublicKey: "b33b5fc45640cfc414981985bf92eef962c08c53e1a34f90dab039e985bb5fab",
			senderId: "AMzDw5BmZ39we18y7Ty9VW79eL9k7maZPH",
			recipientId: "1",
			amount: 0,
			fee: 10000000,
			signature: "560bd31a4efe103ef9bd92f52cae5cf5a3b2aeb90fc83298498ff4126705e0433f751169bc32a3a7cfe894c7d8586d7182ebc790f2311daf9f02b881dc2aca0e",
			signSignature: "",
			signatures: null,
			confirmations: "43",
			args: null,
			message: "",
			asset: {
				uiaTransfer: {
					transactionId: "7cf50223e12b6eb51096353a066befcf2ef862bdd4d4eddcba28a79aa0249af9",
					currency: "absorb.YLB",
					amount: "100000000",
					amountShow: "1",
					precision: 8
				}
			}
		}],
		count: 2
	}


#### 10.12 资产创建相关
接口地址：/api/uia/transactions/my/:address/:currency   
请求方式：GET       
支持格式：urlencoded        
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| address | String | Y  | 账户地址|
| currency | String | Y  | 资产名字|
| limit | Integer | N  | 限制结果集个数，最小值：0,最大值：100|
| offset | Integer | N  | 偏移量，最小值0|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| transactions | array  |交易列表，每个元素是一个字典代表一次交易，包含交易id、区块高度、区块id、交易类型、时间戳、发送者公钥、发送者id、接收者id（系统为空，如资产注册）、交易数量（资产交易都为0）、手续费0.1ETM、签名、多重签名、确认数、资产信息（包含发行商id、发行商名字、描述）、交易id|
| count | integer  |资产交易总个数|   

请求示例： 
	
	//get 请求
	http://etm.red:8096/api/uia/transactions/RAY.CNY
JSON返回示例：  
		
	//TODO  应该是有交易的	
	{
		"success":true,
		"transactions":[],
		"count":0
	}

##### 10.12.1 注册资产发行商
对比参考 [9.3 UIA相关交易](#93-UIA相关交易) 
##### 10.12.2 注册资产
对比参考 [9.3 UIA相关交易](#93-UIA相关交易) 
##### 10.12.3 更新资产访问控制列表
对比参考 [9.3 UIA相关交易](#93-UIA相关交易) 
##### 10.12.4 资产发行
对比参考 [9.3 UIA相关交易](#93-UIA相关交易) 
##### 10.12.5 资产转账
接口地址：/api/uia/transfers   
请求方式：PUT       
支持格式：json        
请求参数说明：  
  
|参数	|类型   |必填 |说明              |   
|------ |-----  |---  |----              |   
| secret | String | Y  | 账户密码|
| currency | String | Y  | 资产名字|
| amount | String | Y  | 转账金额，最大长度50|
| recipientId | String | Y  | 接收地址，最小长度1|
| publicKey | String | N  | 发送者公钥，格式必须符合公钥格式|
| secondSecret | String | N  | 发送者二级密码，最小长度1，最大长度：100|
| multisigAccountPublicKey | String | N  | 多签账户公钥，格式必须符合公钥格式|
| message | String | N  | 转账备注，最大长度256|

返回参数说明：   

|名称	|类型   |说明              |   
|------ |-----  |----              |   
|success|boolean  |是否成功获得response数据      |   
| transactionId | String  |交易id|

请求示例([参考](../utils/normal_transactions.js))： 
	
	//10.12.5 转账 pepper sleep youth blast vivid circle cross impact zebra neck salmon fee
	//url: etm.red:8096/api/uia/transfers
	function transferIssueAssert2() {
	  let password = 'pepper sleep youth blast vivid circle cross impact zebra neck salmon fee'
	  let currency = 'RAY.CNY';
	  let recipientId = 'A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr'
	  let amount ='1000000000'
	
	  return JSON.stringify({
	    "secret": password,
	    "amount":amount,
	    "recipientId":recipientId,
	    "currency":currency,
	    "secondSecret":"test001"
	  })
	}
	axios.put('http://etm.red:8096/api/uia/transfers', transferIssueAssert2()).then(res => {
	  console.log(res);
	}).catch(err => {
	  console.error(err);
	})

JSON返回示例：  
		
	{ 
		success: true,
		transactionId: '118b19b3c48d3660434b3016df08f94ef49458a800cbf4e7da6ae7ecc72b3a82' 
	}
	//查询转账信息
	http://etm.red:8096/api/uia/balances/A9mhydu4PJd3KnSbi1p6vwuoBMGcHc4xjr
	//结果
	{
		"success": true,
		"balances": [{
			"currency": "RAY.CNY",
			"balance": "1000000000",
			"maximum": "100000000000000000",
			"precision": 8,
			"quantity": "10000000000000000",
			"writeoff": 0,
			"allowWriteoff": 0,
			"allowWhitelist": 0,
			"allowBlacklist": 0,
			"maximumShow": "1000000000",
			"quantityShow": "100000000",
			"balanceShow": "10"
		}],
		"count": 1
	}
	
##### 10.12.6 更新黑白名单
	//TODO 没有接口



	
-----------
下一章：[实际demo](./demo.md)