# 案例

本章将会讲解多个实际案例，由浅及深，由难到易的为开发者剖析DApp的全过程。
如果开发者对dapp还不甚了解 ，请查看[合约开发](./smart_contract.md),该章节讲解了合约模版各个文件的作用，以及开发者需要关注的模块，其实entanmo官方为开发者考虑了非常多，合约开发者只需要关注业务逻辑即可。

### 初识dapp
详细样例请参考[hello world](../example/helloworld),此例子仅供参考，只为更方便的为大家讲解entanmo dapp的使用。

**注：学到这里，开发者们应该已经可以熟练的发布Dapp**

#### 1.配置及路由 
**我们从哪里开始呢？**

代码都会有一个开始位置，比如java中`main()`函数, Android中 `onCreate()`等等。在entanmo中合约的入口文件是[ `init.js`](../example/helloworld/init.js)

	module.exports = async function () {
		//...
		//注册合约方法
  		app.registerContract(1000, 'helloworld.hello')
  		//....
	}

很显然，可以看到注册的接口（并不是合约）；然后可以参考（[远程接口](./http_api.md)）,这里调用接口的方式仅仅是一个带参数的put请求。   
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


继续查看interface目录下的[helloworld.js](../example/helloworld/interface/helloworld.js) 。

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

综上两种方式，开发者应该不难发现，合约的请求分为两种，一种是put请求（一般定义在contract目录下），一种是get请求（一般定义在interface目录下）。  
	

#### 2.模型定义
模型的定义其实是定义数据结构，让数据以什么方式存储到区块链上，在dapp模版中，我们可以看到model目录，此example对应的[words.js](../example/helloworld/model/words.js)就是对于的数据模型定义文件。

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

#### 3.合约实现
之前我们已经说过，entanmo官方为了让开发者更容易的开发合约，在设计上就是尽量让开发者只做逻辑相关的工作。那我们来看一下contract目录下的[helloworld.js](../example/helloworld/contract/helloworld.js)实现

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

### 图书demo
需要成功发布以后，对着代码讲解。	
[news]([domain](../example/README.md))
### 案例展示（epony）
[epony.cn](epony.cn)

------------
下一章：[Q&A](./QA.md)