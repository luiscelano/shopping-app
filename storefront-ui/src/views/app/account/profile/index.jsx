import { Button, Grid2, TextField, Typography } from '@mui/material'
import { enqueueSnackbar } from 'notistack'
import React, { useState } from 'react'
import getHttpError from 'src/utils/getHttpError'
import httpClient from 'src/utils/httpClient'
import { getProfile, setProfile } from 'src/utils/storage'

const ProfilePage = () => {
  const [editMode, setEditMode] = useState(false)
  const profile = getProfile()
  const [values, setValues] = useState({
    firstName: profile.firstName,
    lastName: profile.lastName,
    shippingAddress: profile.shippingAddress,
    birthDate: new Date(profile.birthDate).toLocaleDateString('en-CA')
  })
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.id]: event.target.value
    })
  }

  const handleSubmit = async () => {
    setIsSubmitting(true)
    try {
      const response = await httpClient.patch('/accounts/profile', values)
      if (response.status === 200) {
        setIsSubmitting(false)
        setProfile(response.data)
        enqueueSnackbar('Perfil actualizado correctamente!', {
          autoHideDuration: 2000,
          variant: 'success'
        })
        setEditMode(false)
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

  return (
    <Grid2 container display="flex" flexDirection="column" spacing={3}>
      <Grid2
        size="12"
        sx={{ flexGrow: 1 }}
        display="flex"
        flexDirection="row"
        justifyContent="center"
        textAlign="center">
        <Typography variant="h6">{`cuenta: ${profile.email}`}</Typography>
      </Grid2>
      <Grid2 size="12">
        <TextField
          defaultValue={values.firstName}
          disabled={!editMode}
          label="Nombres"
          id="firstName"
          fullWidth
          onChange={handleChange}
        />
      </Grid2>
      <Grid2 size="12">
        <TextField
          defaultValue={values.lastName}
          disabled={!editMode}
          label="Apellidos"
          id="lastName"
          fullWidth
          onChange={handleChange}
        />
      </Grid2>
      <Grid2 size="12">
        <TextField
          defaultValue={values.shippingAddress}
          disabled={!editMode}
          label="Dirección de envío"
          id="shippingAddress"
          fullWidth
          onChange={handleChange}
        />
      </Grid2>
      <Grid2 size="12">
        <TextField
          defaultValue={values.birthDate}
          disabled={!editMode}
          label="Fecha de nacimiento"
          type="date"
          id="birthDate"
          fullWidth
          onChange={handleChange}
        />
      </Grid2>
      <Grid2 container size="12" display="flex" flexDirection="row">
        <Grid2 size="6" flexGrow={1}>
          <Button disableElevation disabled={editMode} fullWidth variant="contained" onClick={() => setEditMode(true)}>
            Editar
          </Button>
        </Grid2>
        <Grid2 size="6" flexGrow={1}>
          <Button
            loading={isSubmitting}
            loadingPosition="start"
            disableElevation
            disabled={!editMode}
            fullWidth
            variant="contained"
            onClick={handleSubmit}>
            Actualizar
          </Button>
        </Grid2>
      </Grid2>
    </Grid2>
  )
}

export default ProfilePage
