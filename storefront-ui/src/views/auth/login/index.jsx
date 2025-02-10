import { Button, Container, Grid2, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import httpClient from 'src/utils/httpClient'
import { getIsAuthenticated, setAccessToken, setProfile } from 'src/utils/storage'
import getHttpError from 'src/utils/getHttpError'
import { Navigate, useNavigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'

const LoginPage = () => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isAuthenticated = getIsAuthenticated()

  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({
    email: '',
    password: ''
  })

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value
    })
  }

  const handleSubmit = async () => {
    const inputErrors = validateInputs()
    setErrors(inputErrors)

    if (Object.keys(inputErrors).length === 0) {
      setIsSubmitting(true)
      try {
        const response = await httpClient.post('/auth/login', values)
        if (response.status === 200) {
          setIsSubmitting(false)
          setAccessToken(response.data?.accessToken)
          setProfile(response.data?.user)
        }
      } catch (error) {
        const errorMessage = getHttpError(error).message
        setIsSubmitting(false)
        enqueueSnackbar(errorMessage, {
          autoHideDuration: 2000,
          variant: 'error'
        })
      }
    }
  }

  const validateInputs = () => {
    let errors = {}
    Object.keys(values).forEach((key) => {
      if (!values[key].toString().length) errors[key] = `${key} es un campo requerido`
    })
    return errors
  }

  if (isAuthenticated) return <Navigate to={'/'} />

  return (
    <Container maxWidth="xs">
      <Grid2 container display="flex" flexDirection="column" spacing={3}>
        <Grid2
          size="12"
          sx={{ flexGrow: 1 }}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          textAlign="center">
          <Typography variant="h4">Iniciar sesión</Typography>
        </Grid2>
        <Grid2 size="12">
          <TextField label="correo" id="email" fullWidth onChange={handleChange} />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </Grid2>
        <Grid2 size="12">
          <TextField label="Contraseña" id="password" type="password" fullWidth onChange={handleChange} />
          {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
        </Grid2>
        <Grid2 size="12">
          <Button
            onClick={handleSubmit}
            fullWidth
            variant="contained"
            disableElevation
            loading={isSubmitting}
            loadingPosition="start"
            sx={{ borderRadius: '50px' }}>
            Iniciar Sesión
          </Button>
        </Grid2>
        <Grid2 size="12">
          <Button fullWidth variant="text" disableElevation onClick={() => navigate('/auth/signup')}>
            Registrase
          </Button>
        </Grid2>
        <Grid2
          size="12"
          sx={{ flexGrow: 1 }}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          textAlign="center">
          <Typography variant="body1" href="/auth/request-password" component="a">
            ¿Olvidaste tu contraseña?
          </Typography>
        </Grid2>
      </Grid2>
    </Container>
  )
}

export default LoginPage
