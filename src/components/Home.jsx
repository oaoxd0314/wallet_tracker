import React from "react";
import Icon from "./Icon";
import { FaStripeS } from "react-icons/fa";

export default function Home() {
  return (
    <div className="flex flex-col flex-center items-center">
        <p className="text-8xl mt-12 dark:text-green-500">Track your wallet </p>
        <p className="text-2xl mt-8 dark:text-green-500"> Every Thing Every Where</p> 

        <button className="bg-green-linear style-button">Track it</button>
    </div>
  );
}
