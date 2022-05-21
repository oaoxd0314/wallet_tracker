import Web3 from "web3/dist/web3.min";

export function timeToYYYYMMDD(timestamp){
    const time =new Date(timestamp*1000)
    return time.getFullYear()+ '-' + coverTen(time.getMonth()+1) + '-' + coverTen(time.getDate())
}

export function stringTimeToTimeStamp(timelabel){
    return new Date(timelabel).getTime()
}

export function transGweiToEth(Gwei){
    return Web3.utils.fromWei(Gwei,'ether')
}

export function walletAddrShortcut(addr){
    return addr.substring(0, 7) + '...' +addr.substring(addr.length - 7)
}

function coverTen(num){
    return num > 10 ? num : '0'+num
}