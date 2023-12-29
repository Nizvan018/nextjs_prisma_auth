'use client'

import React from 'react'
import Link from 'next/link'
import { signOut } from 'next-auth/react'

function Navbar() {
    return (
        <nav className='flex items-center py-4 px-6 mb-6  rounded-lg hover:shadow-lg duration-500 hover:shadow-black/5'>
            <div className='text-xl font-semibold min-w-fit mr-16'>NextAuth</div>
            <div className='flex items-center justify-between w-full'>
                <div className='flex gap-4'>
                    <Link href={'/dashboard'} className='text-sm duration-300 hover:font-semibold'>Dashboard</Link>
                    <Link href={'/'} className='text-sm duration-300 hover:font-semibold'>Sobre nosotros</Link>
                </div>
                <button onClick={signOut} className='px-6 button-black'>Cerrar sesión</button>
            </div>
        </nav>
    )
}

export default Navbar