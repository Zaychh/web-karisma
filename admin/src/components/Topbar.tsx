import React from 'react';
import { Bell, UserCircle } from 'lucide-react';

export default function Topbar() {
    return (
        <header className='w-full h-16 bg-white shadow flex items-center justify-between px-6'>
            <div className='w-1/3'>
            <input type='text' placeholder='Search...' className='w-full rounded-full px-4 py-2 border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500'/>
            </div>

            <div className='flex items-center gap-6'>
                <button className='relative'>
                    <Bell className='w-6 h-6 text-gray-600 hover:text-blue-600 transition'/>
                    <span className='absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-4 h-4 flex items-center justify-center'>
                    3
                    </span>
                </button>

                <div className='flex items-center gap-2 cursor-pointer'>
                    <UserCircle className='w-8 h-8 text-gray-600'/>
                    <span className='text-sm font-medium text-gray-700'>Admin</span>
                </div>
            </div>
        </header>
    );
}