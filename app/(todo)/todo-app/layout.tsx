import React, { ReactNode } from 'react'

interface Props {
  children : ReactNode
}

export default function Layout(
  {
    children
  }: Props
) {
  return (
    <div className='k'>
      {children}
    </div>
  )
}
