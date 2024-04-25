import React from 'react'
import { LogOut, getSession } from '@/lib/actions'
import NavbarElements from './navbarElements';


const Navbar = async () => {
    const session = await getSession();

    const sessionData = JSON.parse(JSON.stringify(session));
    return (
        <NavbarElements session={sessionData} />
    )
}

export default Navbar