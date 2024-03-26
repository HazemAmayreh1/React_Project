import React from 'react'
import { Navigate } from 'react-router-dom';

function ProtectedRouter({children}) {
    const token = localStorage.getItem('userToken');
    if(!token){
        return <Navigate to='/login' replace/>
    }
    return children;

}

export default ProtectedRouter
