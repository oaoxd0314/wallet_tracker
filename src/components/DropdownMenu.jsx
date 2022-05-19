import React, { useState, useEffect, useRef } from 'react';
import { CSSTransition } from 'react-transition-group';

export const DropdownMenu = (props) => {
  return (
      <ul className="absolute translate-x-[-80%] top-[64px] w-[250px] bg-primary ring-2 ring-gray-800 rounded-[8px] duration-500 p-4 overflow-hidden">
        {props.children}
      </ul>
  );
};

export const DropdownItem = (props) => {
  return (
    <li onClick={props.onClick} className="cursor-pointer text-white flex items-center rounded-[8px] duration-200 p-2 hover:bg-gray-500">
      {props.nonIcon 
        ? null
        : <span className="p-[5px] m-[2px] mr-[5px] w-[30px] h-[30px] flex items-center justify-center transion bg-gray-600 rounded-[50%]">{props.icon}</span>
      } 
      {props.children}
      {/* <span className="icon-right">{props.rightIcon}</span> */}
    </li>
  );
};
