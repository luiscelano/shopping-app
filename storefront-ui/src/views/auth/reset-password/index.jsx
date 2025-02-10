import { Button, Container, Grid2, TextField, Typography } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import React, { useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import getHttpError from 'src/utils/getHttpError'
import httpClient from 'src/utils/httpClient'
import { getIsAuthenticated } from 'src/utils/storage'
import useQueryParams from 'src/utils/useQueryParams'

const ResetPasswordPage = () => {
  const query = useQueryParams()
  const navigate = useNavigate()
  const [values, setValues] = useState({
    newPassword: ''
  })
  const [confirmPassword, setConfirmPassword] = useState('')
  const [errors, setErrors] = useState({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const isAuthenticated = getIsAuthenticated()
  const recoveryToken = query.get('token')

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value
    })
  }

  const onConfirmPasswordChange = (event) => {
    const value = event.target.value
    setConfirmPassword(value)
    if (value !== values.newPassword)
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

  const handleSubmit = async () => {
    if (Object.keys(errors).length === 0 || !values.newPassword.length) {
      setIsSubmitting(true)
      try {
        const response = await httpClient.post('/auth/password/reset', { ...values, recoveryToken })
        if (response.status === 200) {
          setIsSubmitting(false)
          enqueueSnackbar('Contraseña actualizada correctamente!', {
            autoHideDuration: 2000,
            variant: 'success'
          })
          navigate('/auth/login')
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
          <Typography variant="h4">Actualizar contraseña</Typography>
        </Grid2>
        <Grid2 size="12">
          <TextField fullWidth type="password" label="Nueva contraseña" id="newPassword" onChange={handleChange} />
          {errors.newPassword && <span style={{ color: 'red' }}>{errors.newPassword}</span>}
        </Grid2>
        <Grid2 size="12">
          <TextField
            fullWidth
            type="password"
            label="Confirmar contraseña"
            id="confirmPassword"
            onChange={onConfirmPasswordChange}
          />
          {errors.confirmPassword && <span style={{ color: 'red' }}>{errors.confirmPassword}</span>}
        </Grid2>
        <Grid2 size="12">
          <Button
            fullWidth
            disableElevation
            variant="contained"
            loading={isSubmitting}
            loadingPosition="start"
            disabled={Object.keys(errors).length || !values.newPassword.length || !confirmPassword.length}
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

export default ResetPasswordPage
