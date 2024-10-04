import React from 'react'
import Nav from '../Components/Nav';
import { Outlet } from 'react-router';

function AdminLayout() {
    return (
        <>
            <Nav />
            <Outlet />
        </>
    )
}

export default AdminLayout