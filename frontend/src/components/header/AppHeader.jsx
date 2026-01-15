import React from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../../features/auth/authSlice';
import { Bell } from 'lucide-react';

function AppHeader() {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.auth);
  const role = useSelector((state) => state.auth.user?.role);

  return (
    <header className='w-full bg-card border-b'>
      <div className='max-w-7xl mx-auto px-4 py-4 flex items-center justify-between'>
        <h1 className='text-lg font-bold text-primary'>
          HiveWorkAI
        </h1>
        <span className='hidden sm:block text-sm text-textSecondary'>
          {role} Dashboard
        </span>

        <div className='flex items-center gap-4'>
          <button className='relative'>
            <Bell size={16} className='text-xl' />
            <span className='absolute -top-1 -right-1 w-2 h-2 bg-danger rounded-full'>
              8
            </span>
          </button>

          <span className='hidden sm:block text-sm'>
            {user?.name || "User"}
          </span>

          <button
            onClick={() => dispatch(logout())}
            className='text-sm px-3 py-1 rounded-md border hover:bg-bg transition'
          >
            Logout
          </button>
        </div>
      </div>
    </header>
  )
}

export default AppHeader
