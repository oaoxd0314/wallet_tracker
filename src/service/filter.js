export function sortBy(data,target,order){
    if(order === 'dec'){
        return data.sort((a,b)=>a[target]-b[target])
    }
    
    if(order === 'acc'){
        return  data.sort((a,b)=>b[target]-a[target])
    }
}