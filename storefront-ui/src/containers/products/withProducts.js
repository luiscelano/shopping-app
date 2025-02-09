import { useEffect, useState, useRef, useCallback } from 'react'
import withSpinner from 'src/containers/spinner/withSpinner'
import httpClient from 'src/utils/httpClient'
import withError from 'src/containers/error/withError'

const withProducts = (Component) => (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [isPlacingOrder] = useState(false)
  const [errorState, setErrorState] = useState({
    failed: false,
    message: null
  })
  const [products, setProducts] = useState(null)
  const productsRef = useRef(false)

  const getProducts = useCallback(async () => {
    try {
      const response = await httpClient.get('/products')
      if (response.status === 200) {
        setProducts(response.data)
      }
    } catch (error) {
      console.error('httpClient error:', error)
      setErrorState({
        failed: true,
        message: error.message
      })
    }
  }, [])

  useEffect(() => {
    if (productsRef.current) return
    productsRef.current = true
    setIsLoading(true)
    getProducts()
  }, [getProducts])

  useEffect(() => {
    if (isLoading && (products || errorState.failed)) setIsLoading(false)
  }, [products, errorState, isLoading])

  const componentProps = { ...props, products, isPlacingOrder }

  return withSpinner(isLoading)(withError(errorState.failed, errorState.message)(Component))(componentProps)
}

export default withProducts
