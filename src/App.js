import {useState,useEffect} from "react"
import {Routes , Route } from "react-router-dom"

import useWallet from "./hooks/useWallet";

import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./components/Home";

function App() {
  const [wallet,setWallet] = useWallet('')

  return (
    <div className="content content-layout">
      <Header wallet={wallet} setWallet={setWallet} />
      <main className="main">
        <div className="content-wrapper">
          <Routes>
            <Route path="/" element={<Home/>}/>
          </Routes>
        </div>
      </main>
      <Footer/>
    </div>
  );
}

export default App;
