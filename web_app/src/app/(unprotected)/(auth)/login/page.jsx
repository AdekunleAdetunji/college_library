import LoginForm from '@/components/LoginForm'
import { getSession } from '@/lib/actions'
import { redirect } from 'next/navigation';
import React from 'react'

const Login = async () => {
    const session = await getSession();
    if (session.isLoggedIn) {
        redirect("/")
    }

    return (
        <LoginForm />
    )
}

export default Login