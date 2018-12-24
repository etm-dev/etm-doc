# http请求接口详解	

开发之前：	
开发dapp应该分为智能合约开发、前端界面开发。本小节主要讲述了前端界面如何调用合约接口，重点关注[5.自定义合约接口调用](#5自定义合约接口调用)，因为大家的dapp功能各异，只有学习到了如何调用自定义的接口，大家调用起合约来才能得心应手。

* [http接口详解](#http请求接口详解)
	* [1.信息获取](#1信息获取)
		* [1.1 获取DApp区块高度](#11-获取DApp区块高度)
		* [1.2 获取DApp区块数据](#12-获取DApp区块数据)
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

### 1.信息获取
通过http请求获取dapp相关信息

#### 1.1 获取DApp区块高度
接口地址：/api/dapps/dappID/blocks/height	
请求方式：GET	
支持格式：urlencode
	
返回参数说明：	

| 参数        | 类型           |说明|
| ------------- |:-------------:| :-------------:|
| success      | boolean| 是否成功|
| height      | integer      | Dapp的区块高度|

请求示例：
	
	curl -k -H "Content-Type: application/json" -X GET http://localhost:4096/api/dapps/bebe3c57d76a5bbe3954bd7cb4b9e381e8a1ba3c78e183478b4f98b9d532f024/blocks/height && echo  

JSON返回示例： 

```
{    
	height: 10,    
	success: true    
}  

```


#### 1.2 获取DApp区块数据
接口地址：/api/dapps/dappID/blocks	
请求方式：GET	
支持格式：urlencode	
接口说明：不加参数则获取全网区块详情	
请求参数说明：

| 参数        | 类型             | 必填            | 说明          |
| ------------- |:-------------:| :-------------:|:-------------:|
| limit| integer|N|限制返回区块信息结果集数量,最大值：100|
| orderBy| string|N|根据表中字段排序，如height:desc|
| offset| integer|N|偏移量|
| generatorPublicKey| string|N|根据区块生产者公钥查询区块|
| totalAmount| integer | N |根据交易总额查询，最小值：0，最大值：10000000000000000|
| totalFee| integer| N|根据手续费总额查询，最小值：0，最大值：10000000000000000|
| previousBlock| string|N|根据上一个区块id查询|
| height| integer| N|根据区块高度查询|

返回参数说明：

| 参数        | 类型           |说明|
| ------------- |:-------------:| :-------------:|
| success      | boolean| 是否成功|
| count      | integer      | 符合条件的总结果数目|
| blocks      | array      | 每个元素是一个block对象，对象里面包含block的id、height、产块受托人公钥等信息|

请求示例：

	curl -k -H "Content-Type: application/json" -X GET http://localhost:4096/api/dapps/bebe3c57d76a5bbe3954bd7cb4b9e381e8a1ba3c78e183478b4f98b9d532f024/blocks?limit=1 && echo

JSON返回示例：

	{    
		blocks: [{    
			id: "451dd17f273ea5fbd240238178c1343b11031a1d309ee8b29e8b1a5838473ec6",    
			timestamp: 0,    
			height: 1,    
			payloadLength: 103,    
			payloadHash: "995f4749e1924af55f1cdefd202efd0b37b2aa70553982378c037bc6015d5634",    
			prevBlockId: "",    
			pointId: "",    
			pointHeight: 0,    
			delegate: "8065a105c785a08757727fded3a06f8f312e73ad40f1f3502e0232ea42e67efd",    
			signature: "b1d0171494ce6c0621902c6005f7a85e15f3509a68ac6106b166abf711ced73efaeaf1eae0cdf594143854e27b417b253485cf98b3cc9f7aa967a929b717020b",    
			count: 1    
		}],    
		count: 133,    
		success: true    
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