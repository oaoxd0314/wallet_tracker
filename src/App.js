import {useEffect} from "react"
import {Routes , Route } from "react-router-dom"

import { getWalletFound } from "./service/etherScan";
import useWallet from "./hooks/useWallet";

import Home from "./Home";
import Result from "./Result";
import PrivateRoute from "./PrivateRoute";
import Footer from "./components/Footer";
import Header from "./components/Header";

function App() {
  const [wallet,setWallet] = useWallet('')
  

  useEffect(()=>{
    getWalletFound(wallet)
  },[wallet])

  return (
    <div className="content content-layout">
      <Header wallet={wallet} setWallet={setWallet} />
      <main className="main">
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Home wallet={wallet} />}/>
            <Route element={<PrivateRoute wallet={wallet} />}>
              <Route path="/result" element={<Result wallet={wallet}/>}/>
            </Route>
          </Routes>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
