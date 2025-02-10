import { Button, Container, Grid2, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import httpClient from 'src/utils/httpClient'
import { getIsAuthenticated, setAccessToken, setProfile } from 'src/utils/storage'
import getHttpError from 'src/utils/getHttpError'
import { Navigate } from 'react-router-dom'
import { useSnackbar } from 'notistack'
import { isAdult } from 'src/utils/isAdult'

const SignUpPage = () => {
  const { enqueueSnackbar } = useSnackbar()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isAuthenticated = getIsAuthenticated()

  const [errors, setErrors] = useState({})
  const [values, setValues] = useState({
    firstName: '',
    lastName: '',
    shippingAddress: '',
    email: '',
    password: '',
    birthDate: ''
  })

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

  const onConfirmPasswordChange = (event) => {
    const value = event.target.value
    if (value !== values.password)
      setErrors({
        ...errors,
        confirmPassword: 'La contraseña no coincide'
      })
    else {
      const errorKeys = { ...errors }
      delete errorKeys.confirmPassword
      setErrors(errorKeys)
    }
  }

  const handleBirthDateChange = (event) => {
    const value = event.target.value

    handleChange(event)
    if (!isAdult(value)) {
      setErrors({
        ...errors,
        birthDate: 'Debes ser mayor de edad para registrarte'
      })
    } else {
      const errorKeys = { ...errors }
      delete errorKeys.birthDate
      setErrors(errorKeys)
    }
  }

  const handleSubmit = async () => {
    const inputErrors = validateInputs()
    setErrors(inputErrors)
    if (Object.keys(inputErrors).length === 0) {
      setIsSubmitting(true)
      try {
        const response = await httpClient.post('/auth/signup', values)
        if (response.status === 200) {
          setIsSubmitting(false)
          setAccessToken(response.data.accessToken)
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
    let inputErrors = { ...errors }
    Object.keys(values).forEach((key) => {
      if (!values[key].toString().length) inputErrors[key] = `${key} es un campo requerido`
    })
    return inputErrors
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
          <Typography variant="h4">Registrarse</Typography>
        </Grid2>
        <Grid2 size="12">
          <TextField label="Nombres" id="firstName" fullWidth onChange={handleChange} />
          {errors.firstName && <span style={{ color: 'red' }}>{errors.firstName}</span>}
        </Grid2>
        <Grid2 size="12">
          <TextField label="Apellidos" id="lastName" fullWidth onChange={handleChange} />
          {errors.lastName && <span style={{ color: 'red' }}>{errors.lastName}</span>}
        </Grid2>
        <Grid2 size="12">
          <TextField label="Dirección de envío" id="shippingAddress" fullWidth onChange={handleChange} />
          {errors.shippingAddress && <span style={{ color: 'red' }}>{errors.shippingAddress}</span>}
        </Grid2>
        <Grid2 size="12">
          <TextField label="Correo" id="email" fullWidth onChange={handleEmailChange} />
          {errors.email && <span style={{ color: 'red' }}>{errors.email}</span>}
        </Grid2>
        <Grid2 size="12">
          <TextField label="Contraseña" id="password" type="password" fullWidth onChange={handleChange} />
          {errors.password && <span style={{ color: 'red' }}>{errors.password}</span>}
        </Grid2>
        <Grid2 size="12">
          <TextField
            label="Confirmar contraseña"
            id="confirmPassword"
            type="password"
            fullWidth
            onChange={onConfirmPasswordChange}
          />
          {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword}</span>}
        </Grid2>
        <Grid2 size="12">
          <TextField
            label="Fecha de nacimiento"
            type="date"
            id="birthDate"
            fullWidth
            onChange={handleBirthDateChange}
          />
          {errors.birthDate && <span style={{ color: 'red' }}>{errors.birthDate}</span>}
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
            Registrarse
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

export default SignUpPage
