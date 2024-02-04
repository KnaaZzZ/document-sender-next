"use client"

import { useRouter } from 'next/navigation'
import React, { ReactNode } from 'react'

const ConnectionsLayout = ({children}: {children: ReactNode}) => {
    const navigate = useRouter();

    return (
        <div>
            <div>
                <button onClick={() => {navigate.back()}}>Go Back</button>
            </div>
            <div>
                {children}
            </div>
        </div>
    )
}

export default ConnectionsLayout