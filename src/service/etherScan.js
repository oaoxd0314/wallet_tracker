import { fetchAPI } from "./fetch"
/* ethscan param doc
module: 指明接口所属模块，即上面包含的模块
action: API动作，如：txlist - 表示列出交易记录；
address: 所查询交易的账号地址；
contractaddress: 合约地址
apikey: 用户API-key 根据key来统计请求限额；
startblock: 起始查询块 id，可选，默认值为 0；
endblock: 结束查询块 id，可选，默认值为最后一个区块；
tag: 状态：pending 或 latest
blocktype: 块类型：blocks（主链块） 或 uncles （叔块）
page: 页码，可选；
offset: 每页查询记录数，可选，默认是查询 10000 条记录；
sort: 排序规则，支持正序asc和倒序desc。

source from https://learnblockchain.cn/docs/etherscan/Introduction.html
end of doc */

export function fetchEtherScan(endpoint){
    const URL = `https://api.etherscan.io/${endpoint}&apikey=${process.env.REACT_APP_ETHERSCAN_KEY}`
    return fetchAPI(URL)
}

export function getWalletFound(wallet){
    const endpoint = `api?module=account&action=balance&address=${wallet}&tag=latest`
    return fetchEtherScan(endpoint)
}

export function getMultiWalletFound(wallets){
    let wallet = wallets.join(',')
    const endpoint = `api?module=account&action=balancemulti&address=${wallet}&tag=latest`
    return fetchEtherScan(endpoint)
}

export function getTradeRecord(wallet){
    const endpoint = `api?module=account&action=txlist&address=${wallet}&startblock=0&endblock=99999999&page=1&offset=10&sort=asc`
    return fetchEtherScan(endpoint)
}