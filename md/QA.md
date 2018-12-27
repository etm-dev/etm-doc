# Q&A

这篇文档里，我们讲述常见的DApp开发问题和它们的解决方案. 

**Dapp 安装在哪个目录？**	
DApp安装在 `ETM_HOME/dapps/your-dapp-id` 目录 your-dapp-id是你注册Dapp的时候生成的. 
主项目logs文件存放的地方 (`ETM_HOME/logs/`).

查看所有注册的DApps: `curl http://localhost:4096/api/dapps`  
所有安装的DApps: `curl http://localhost:4096/api/dapps/installed` 
具体接口请看[http接口文档](./http_api.md) 

日志文件 
如果你希望查看dapp的日志的话，进入`ETM_HOME/dapps/your-dapp-id/logs/debug.log`. 如果希望查看dapp主链的日志，cd 到 `ETM_HOME/logs/`,在里边可以找到日志文件.	
具体可以参考[日志章节](./log.md)

__文档通用规定__  
以下所说的文件是指在`ETM_HOME/dapps/your-dapp-id/` 下的文件 , 确保你修改了正确的文件，并且修改后，重启的dapp侧链

	config.json = ETM_HOME/dapps/your-dapp-id/config.json


<br/><br/>

* [1.DApp无法启动](#1Dapp无法启动)
* [2.DApp不出块](#2Dapp不出块)
* [3.交易失败](#3交易失败)
* [4.无法注册合约](#4无法注册合约)
* [5.请求404](#5请求404)
* [6.在ETM目录运行npm install失败](#6在ETM目录运行npm-install失败)
* [7.请求发送到侧链失败](#7请求发送到侧链失败)
* [8.侧链充值问题](#8侧链充值问题)
* [9.float精度溢出问题](#9float精度溢出问题)
* [10.合约储存boolean值问题](#10合约储存boolean值问题)
* [11.old value问题](#11old-value问题)
* [12.时间戳问题](#12时间戳问题)
* [13.等等](#13等等)

### 1.Dapp无法启动


#### 1.1 **config.json里边的peers配置不正确**

 `config.json` 文件里边的peers 配置，要么不配置，要么至少提供一个peer配置，不要整一个空的数组:

移除 `peers` 属性:  
```diff
- {
-   "peers": [],
-   "secrets": [
-     "flame bottom dragon rely endorse garage supply urge turtle team demand put",
-     "thrive veteran child enforce puzzle buzz valley crew genuine basket start top",
-     "black tool gift useless bring nothing huge vendor asset mix chimney weird",
-   ]
- }
+ {
+   "secrets": [
+     "flame bottom dragon rely endorse garage supply urge turtle team demand put",
+     "thrive veteran child enforce puzzle buzz valley crew genuine basket start top",
+     "black tool gift useless bring nothing huge vendor asset mix chimney weird",
+   ]
+ }
```

或者提供至少一个peer:  
```diff
- {
-   "peers": [],
-   "secrets": [
-     "flame bottom dragon rely endorse garage supply urge turtle team demand put",
-     "thrive veteran child enforce puzzle buzz valley crew genuine basket start top",
-     "black tool gift useless bring nothing huge vendor asset mix chimney weird",
-   ]
- }
+ {
+   "peers": [{"ip":"127.0.0.1","port":4096}],
+   "secrets": [
+     "flame bottom dragon rely endorse garage supply urge turtle team demand put",
+     "thrive veteran child enforce puzzle buzz valley crew genuine basket start top",
+     "black tool gift useless bring nothing huge vendor asset mix chimney weird",
+   ]
+ }
```

<br/><br/>

#### 1.2 **DApp 的目录结构必须正确**

最小的文件配置如下所示:  
1. config.json -> 配置文件<br>
2. dapp.json   -> peer和delegate 配置<br>
3. init.js     -> 初始化配置, 里边主要定义交易费用和合约 <br>
4. model     ->  这个里边定义模型 <br>
5. contract ->  定义合约 <br>
6. interface  -> 定义接口 <br>



#### 1.3 **检查DApp是否已经注册并启动**
确保你的dapp 文件就在 `ETM_HOME/dapps/your-dapp-name`,目录. 打开下面的链接，可以查看到所有已经安装的dapp: `curl http://localhost:4096/api/dapps/installed`


#### 1.4 ** ETM_HOME/public/dist/dapps 这个目录必须存在**

确保 `ETM_HOME/public/dist/dapps` 这个目录必须存在， 如果不存在的话， 需要创建这个目录， 比如在linux 环境下， 运行 mkdir -p public/dist/dapp

#### 1.5 **Dapp model 里边的字符串类型的数据没有写长度**

在 DApp 目录下的 `model/` 目录存放了所有的自定义的表和表的字段的定义. 如果你定义某一列为 `string` 类型的话，你 __必须__ 同时为这个列提供 `length` 属性!

错误的方式:  
```js
module.exports = {
  name: 'articles',
  fields: [
    {
      name: 'tid',
      type: 'String'
    }
  ]
}
```

正确的方式:  
```js
module.exports = {
  name: 'articles',
  fields: [
    {
      name: 'tid',
      type: 'String',
      length: 64
    }
  ]
}
```

<br/><br/>

### 2.Dapp不出块
### 3.交易失败
### 4.无法注册合约
### 5.请求404
### 6.在ETM目录运行npm install失败
### 7.请求发送到侧链失败
### 8.侧链充值问题
### 9.float精度溢出问题
### 10.合约储存boolean值问题
### 11.old value问题
### 12.时间戳问题
### 13.等等

------------
下一章：[TODO](./TODO.md)