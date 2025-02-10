import React from 'react'
import { Container, Grid2 } from '@mui/material'
import ProductItems from 'src/components/ProductItems'
import withProducts from 'src/containers/products/withProducts'

const HomePage = (props) => {
  return (
    <Container maxWidth="lg">
      <Grid2 container spacing={3}>
        <Grid2 size={12}>
          <ProductItems products={props.products} />
        </Grid2>
      </Grid2>
    </Container>
  )
}

export default withProducts(HomePage)
