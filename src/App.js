import Footer from "./components/Footer";
import Header from "./components/Header";
import {Routes , Route } from "react-router-dom"
import Home from "./components/Home";
import { useWallet } from "./hooks/useWallet";

function App() {
  // const { currentAccount, setCurrentAccount } = useWallet();

  return (
    <div className="content content-layout">
      {/* <Header currentAccount={currentAccount} setCurrentAccount={setCurrentAccount} /> */}
      <Header />
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
