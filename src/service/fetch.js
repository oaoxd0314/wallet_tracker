
export function fetchAPI(url,param){
    return new Promise((resolve,reject)=>{
        fetch(url,param).then((response)=>{
            response.json().then(resp=>{
                // let respObj = responseHandler(response,resp)
                if(response.ok){
                    resolve(resp)
                }else{
                    // can handle situation ,caught backend message and return to view 
                    reject(resp)
                }
            })

        }).catch(err=>{
            // can't handle situation ,always given 500 error
            console.error("Network error, check Internet or server state")
            console.error(err)
            reject({code:500,message:"Network error, check Internet or server state",error: err});
        })
    })
}

