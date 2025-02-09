import React from 'react'
import { Grid2 } from '@mui/material'
import ProductItem from '../ProductItem'

const ProductItems = ({ products = [] }) => {
  return (
    <Grid2 container display="flex" flexDirection="row" spacing={2}>
      {products.map((item, index) => (
        <Grid2 display="flex" key={`product-item-${index}`} size={{ xs: 12, md: 6 }}>
          <ProductItem details={item} />
        </Grid2>
      ))}
    </Grid2>
  )
}

export default ProductItems
