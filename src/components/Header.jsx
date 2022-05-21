import React, { useState,useRef,useEffect} from "react";
import Icon from "./Icon";
import {
  FaSearch,
  FaHashtag,
  FaRegBell,
  FaUserCircle,
  FaMoon,
  FaSun,
} from "react-icons/fa";
import {IoMdArrowRoundBack} from 'react-icons/io'
import { BiLogOut } from "react-icons/bi";
import MetaMaskOnboarding from "@metamask/onboarding";
import { CSSTransition } from "react-transition-group";
import { ReactComponent as MetaMaskIcon } from "../assets/icons/metamask.svg";
import useDarkMode from "../hooks/useDarkMode";
import { DropdownMenu, DropdownItem } from "./DropdownMenu";
import { NavBar,DropDownNavItem } from "./Navbar";
import { walletAddrShortcut } from "../service/parser";


export default function Header({ wallet, setWallet }) {
  return (
    <NavBar>
      <p className="font-bold text-lg uppercase">wallet tracker</p>

      <div className="flex items-center">
        <ThemeIcon />
        <DropDownNavItem icon={<Icon icon={<FaUserCircle size="28" />} />} >
          <MainMenu wallet={wallet} setWallet={setWallet}/>
        </DropDownNavItem>
      </div>
    </NavBar>
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

const MainMenu = (props) => {
  const [activeMenu, setActiveMenu] = useState('main')
  const [menuHeight, setMenuHeight] = useState(null);
  const { ethereum } = window;
  const onBoarding = new MetaMaskOnboarding();
  const dropdownRef = useRef(null);

  // view stuff
  

  // wallet stuff
  const connectWallet = async () => {
    if (ethereum) {
      const [account] = await ethereum.request({
        method: "eth_requestAccounts",
      });
      console.log("connected");
      props.setWallet(account);
    } else {
      alert("你需要安裝 MetaMask");
      installMetaMask();
    }
  };

  const logoutWallet = async () => {
    if (ethereum) {
      // const res = await ethereum.request({method:'disconnect'})
      // ethereum.clearCachedProvider()
      // console.log(res)

      await ethereum.request({
        method: "eth_requestAccounts",
        params: [{ eth_accounts: {} }],
      });

      props.setWallet("");
      console.log("disconnect");
    }
  };

  const installMetaMask = () => {
    onBoarding.startOnboarding();
  };

  // ------- view stuff -------

  useEffect(() => {
    setMenuHeight(dropdownRef.current?.firstChild.offsetHeight+32)
  }, [])

  function calcHeight(el) {
    const height = el.offsetHeight;
    setMenuHeight(height+32);
  }

  // -------  view case  -------
  if(!props.wallet){
    return(
      <DropdownMenu>
        <DropdownItem icon={<MetaMaskIcon />} onClick={() => connectWallet()}>
          Login with MetaMask
        </DropdownItem>
      </DropdownMenu>
    )
  }
  // ------------------------- 

  return(
    <div style={{ height: menuHeight }} ref={dropdownRef} className="absolute translate-x-[-80%] top-[64px] w-[250px] bg-primary ring-2 ring-gray-800 rounded-[8px] duration-500 p-4 overflow-hidden">
        <CSSTransition
          in={activeMenu === 'main'}
          timeout={500}
          classNames="menu-primary"
          unmountOnExit
          onEnter={calcHeight}>
          <div>
            <DropdownItem onClick={()=>setActiveMenu('profile')} icon={<FaUserCircle />}> 
              {walletAddrShortcut(props.wallet)}
            </DropdownItem>
            <DropdownItem icon={<BiLogOut />} onClick={() => logoutWallet()}>
              Logout
            </DropdownItem>
          </div>
        </CSSTransition>

        <CSSTransition
          in={activeMenu === 'profile'}
          timeout={500}
          classNames="menu-secondary"
          unmountOnExit
          onEnter={calcHeight}>
          <div>
            <DropdownItem onClick={()=>setActiveMenu('main')} icon={<IoMdArrowRoundBack />}/>
            <DropdownItem nonIcon={true}>
              <div className="h-[100px]">
                hey
              </div>
            </DropdownItem>
            <DropdownItem nonIcon={true}>
              <div className="h-[50px]">
                you
              </div>
            </DropdownItem>
          </div>
        </CSSTransition>
      </div>
    )
}