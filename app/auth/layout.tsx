"use client"

import { useAppSelector } from '@/resources/redux/hooks'
import { useRouter } from 'next/navigation'
import React, { useEffect } from 'react'

const AuthLayout = ({children}: {children: React.ReactNode}) => {
    const navigate = useRouter();
    const home = useAppSelector(state => state.home);

    useEffect(() => {
        if (home.user) {
            navigate.push('/home');
        }
    }, [])

    return (
        <div>
            {children}
        </div>
    )
}

export default AuthLayout