import React from 'react'

function PublicLayout({ children }) {
  return (
    <div className='min-h-screen flex flex-col'>
      {children}
    </div>
  )
}

export default PublicLayout
