import React from "react";
import {useNavigate} from 'react-router-dom'

export default function Home(props) {
  let navigate = useNavigate();

  const Track = async() => {
    navigate("/result")
  }

  return (
    <div className="flex flex-col flex-center items-center">
        <p className="text-8xl mt-12 dark:text-green-500">Track your wallet </p>
        <p className="text-2xl mt-8 dark:text-green-500"> Every Thing Every Where</p> 

        <button onClick={()=>Track()} className="bg-green-linear style-button">Track it</button>
    </div>
  );
}
