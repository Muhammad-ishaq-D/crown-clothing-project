import React from 'react'
import { Outlet } from 'react-router'
import Directory from '../../components/directory/directoryComponent'

export default function Home() { 
  return (
    <div>
      <Directory/>
      <Outlet />
    </div>
  )
}


