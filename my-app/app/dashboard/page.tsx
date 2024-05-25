import React from 'react'
import ProductsTables from './_components/ProductsTables'
import AddProductDialog from './_components/AddProductDialog'

function Dashboard() {
  return (
    <div className='w-screen'>
       <ProductsTables/>
       <AddProductDialog/>
    </div>
  )
}

export default Dashboard