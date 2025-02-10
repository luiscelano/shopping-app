import React, { useState } from 'react'
import { Container, Grid2, TextField } from '@mui/material'
import ProductItems from 'src/components/ProductItems'
import withProducts from 'src/containers/products/withProducts'

const HomePage = (props) => {
  const [productsResult, setProductsResult] = useState(props.products)
  const handleProductSearch = (event) => {
    const value = event.target.value
    if (value?.length) {
      setProductsResult(
        Array.from(props.products || []).filter(
          (item) =>
            item.title.toLowerCase().includes(value.toLowerCase()) ||
            item.description.toLowerCase().includes(value.toLowerCase())
        )
      )
    } else {
      setProductsResult(props.products)
    }
  }
  return (
    <Container maxWidth="lg">
      <Grid2 container spacing={3} display="flex" flexDirection="column">
        <Grid2 size="12" flexGrow={1}>
          <TextField fullWidth label="Buscar artículo" onChange={handleProductSearch} />
        </Grid2>
        <Grid2 size="12">
          <ProductItems products={productsResult} />
        </Grid2>
      </Grid2>
    </Container>
  )
}

export default withProducts(HomePage)
