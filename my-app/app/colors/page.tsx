import React from 'react'

function page() {
  return (
    <div className='w-full relative'>
        <ul>
            <li className='bg-background'>background</li>
            <li className='bg-foreground'>foreground</li>
            <li className='bg-card'>card</li>
            <li className='bg-card-foreground'>card-foreground</li>
            <li className='bg-popver'>popver</li>
            <li className='bg-primary'>primary</li>
            <li className='bg-primary-foreground'>primary-foreground</li>
            <li className='bg-secondary'>secondary</li>
            <li className='bg-secondary-foreground'>secondary-foreground</li>
            <li className='bg-muted'>muted</li>
            <li className='bg-muted-foreground'>muted-foreground</li>
            <li className='bg-accent'>accent</li>
            <li className='bg-accent-foreground'>accent-foreground</li>
            <li className='bg-destructive'>destructive</li>
            <li className='bg-destructive-foreground'>destructive-foreground</li>
            <li className='bg-border'>border</li>
            <li className='bg-input'>input</li>
            <li className='bg-ring'>ring</li>
        </ul>
    </div>
  )
}

export default page