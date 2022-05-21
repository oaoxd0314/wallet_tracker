import React,{useState,useEffect} from 'react'
import { Navigate, Outlet } from 'react-router-dom';

export default function PrivateRoute(props) {
    return ( 
            props.wallet
                ? <Outlet /> 
                : <Navigate to="/" />
    )
    
}