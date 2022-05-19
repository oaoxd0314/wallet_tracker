import { useEffect, useState } from 'react';
import useLocalStorage from "./useLocalStorage";

const useWallet = () => {
    const { ethereum } = window;
    const [wallet,setWallet] = useLocalStorage('');

    if(ethereum){
        ethereum.on("accountsChanged", ([newWallet]) => {
            console.log("accountsChanged: ", newWallet);
            setWallet(newWallet);
        })
    }

    return [wallet,setWallet];
};

export default useWallet;