"use client"

import { createUser } from '@/lib/services/mongodb'
import { UserType } from '@/lib/types'
import React from 'react'

const HomePage = () => {
    const user : UserType = {
        email: 'Yaro',
        password: 'Knaz',
        connectionsIds: ['123','123','123']
    }

    return (
        <div>
            <button onClick={() => {createUser(user)}}>Click Me</button>
        </div>
    )
}

export default HomePage