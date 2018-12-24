# 查看日志
### 主链log查看
目录：xxx/etm/logs/xxx.log

如何查看日志？如果出现问题立刻可以查看日志

	//将最新的10000行日志写入debug.log 因为此时的log文件可能很大
	tail -n 10000 xxx.log > debug.log
	//根据自己的dappID等关键词查看问题
	vi debug.log
	//此处需要大家有一定的bug查看能力

### 侧链log查看
xxx/etm/dapps/dappId/logs/xxx.log


	//将最新的10000行日志写入debug.log
	tail -n 10000 xxx.log > debug.log
	//根据自己的dappID等关键词查看问题
	vi debug.log
	//此处需要大家有一定的bug查看能力
