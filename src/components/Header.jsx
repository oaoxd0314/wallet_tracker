import React from "react";
import Icon from "./Icon";
import {
  FaSearch,
  FaHashtag,
  FaRegBell,
  FaUserCircle,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import MetaMaskOnboarding from '@metamask/onboarding'
import useDarkMode from "../hooks/useDarkMode";

export default function Header(props) {
  // const {currentAccount,setCurrentAccount} = props
  const { ethereum } = window;
  const onBooarding = new MetaMaskOnboarding()

  const connectWallet = async () => {
    console.log(window);
    console.log(ethereum);

    if (window.web3) {
      // 有安裝 MetaMask
    } else {
        alert( '沒有安裝 MetaMask' );
    }
  };

  return (
    <nav className="navbar">
      <p className="text-right font-bold text-lg uppercase">wallet tracker</p>

      <div className="flex items-center">
        <ThemeIcon />
        <div onClick={()=>connectWallet()}>
          <Icon icon={<FaUserCircle size="28" />} />
        </div>
      </div>
    </nav>
  );
}

const ThemeIcon = () => {
  const [darkTheme, setDarkTheme] = useDarkMode();
  const handleMode = () => setDarkTheme(!darkTheme);
  return (
    <span onClick={handleMode}>
      {darkTheme ? (
        <FaSun size="24" className="nav-icon" />
      ) : (
        <FaMoon size="24" className="nav-icon" />
      )}
    </span>
  );
};

const LoginButton = () =>{
  
}