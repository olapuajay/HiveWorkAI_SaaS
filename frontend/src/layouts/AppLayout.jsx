import React from 'react'

function AppLayout({ children }) {
  return (
    <div className='min-h-screen bg-bg'>
      <main className='p-6'>{children}</main>
    </div>
  )
}

export default AppLayout
