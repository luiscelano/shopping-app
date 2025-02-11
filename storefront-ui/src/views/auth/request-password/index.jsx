import { Button, Container, Grid2, TextField, Typography } from '@mui/material'
import { useSnackbar } from 'notistack'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import getHttpError from 'src/utils/getHttpError'
import httpClient from 'src/utils/httpClient'
import { getIsAuthenticated } from 'src/utils/storage'

const RequestPasswordRecoveryPage = () => {
  const navigate = useNavigate()
  const { enqueueSnackbar } = useSnackbar()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isAuthenticated = getIsAuthenticated()
  const [values, setValues] = useState({
    email: ''
  })
  const [errors, setErrors] = useState({})

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value
    })
  }

  const handleEmailChange = (event) => {
    const value = event.target.value
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/
    handleChange(event)
    if (!emailRegex.test(value)) {
      setErrors({
        ...errors,
        email: 'Ingresa un correo válido'
      })
    } else {
      const errorKeys = { ...errors }
      delete errorKeys.email
      setErrors(errorKeys)
    }
  }

  const handleSubmit = async () => {
    if (!Object.keys(errors).length) {
      setIsSubmitting(true)
      try {
        const response = await httpClient.post('/auth/password/recovery/request', values)
        if (response.status === 200) {
          setIsSubmitting(false)
          navigate('/')
          enqueueSnackbar('Te hemos enviado un correo electrónico para recuperar tu contraseña', {
            autoHideDuration: 5000,
            variant: 'success'
          })
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

  if (isAuthenticated) return <Navigate to={'/'} />

  return (
    <Container maxWidth="xs">
      <Grid2 container display="flex" flexDirection="column" spacing={2}>
        <Grid2
          size="12"
          sx={{ flexGrow: 1 }}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          textAlign="center">
          <Typography variant="h4">Recuperación de contraseña</Typography>
        </Grid2>
        <Grid2
          size="12"
          sx={{ flexGrow: 1 }}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          textAlign="center">
          <Typography variant="body">Ingresa tu correo electrónico para restablecer tu contraseña</Typography>
        </Grid2>
        <Grid2 size="12">
          <TextField
            fullWidth
            label="Correo"
            placeholder="ej. example@mail.com"
            id="email"
            onChange={handleEmailChange}
          />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </Grid2>
        <Grid2 size="12">
          <Button
            fullWidth
            disableElevation
            variant="contained"
            loading={isSubmitting}
            loadingPosition="start"
            disabled={Object.keys(errors).length}
            sx={{ borderRadius: '50px' }}
            onClick={handleSubmit}>
            Restablecer contraseña
          </Button>
        </Grid2>
        <Grid2
          size="12"
          sx={{ flexGrow: 1 }}
          display="flex"
          flexDirection="row"
          justifyContent="center"
          textAlign="center">
          <Typography variant="body1" href="/auth/login" component="a">
            Regresar
          </Typography>
        </Grid2>
      </Grid2>
    </Container>
  )
}

export default RequestPasswordRecoveryPage
