import { useEffect, useState, useRef, useCallback } from 'react'
import withSpinner from 'src/containers/spinner/withSpinner'
import httpClient from 'src/utils/httpClient'
import withError from 'src/containers/error/withError'

const withOrders = (Component) => (props) => {
  const [isLoading, setIsLoading] = useState(true)
  const [errorState, setErrorState] = useState({
    failed: false,
    message: null
  })
  const [orders, setOrders] = useState(null)
  const ordersRef = useRef(false)

  const getOrders = useCallback(async () => {
    try {
      const response = await httpClient.get('/orders')
      if (response.status === 200) {
        setOrders(response.data)
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
    if (ordersRef.current) return
    ordersRef.current = true
    setIsLoading(true)
    getOrders()
  }, [getOrders])

  useEffect(() => {
    if (isLoading && (orders || errorState.failed)) setIsLoading(false)
  }, [orders, errorState, isLoading])

  const componentProps = { ...props, orders }

  return withSpinner(isLoading)(withError(errorState.failed, errorState.message)(Component))(componentProps)
}

export default withOrders
