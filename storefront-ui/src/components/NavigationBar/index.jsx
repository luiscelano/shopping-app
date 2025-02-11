import * as React from 'react'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import { AccountCircle, ShoppingCart } from '@mui/icons-material'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import { useSelector } from 'react-redux'
import * as cartSelectors from 'src/redux/cart/selectors'
import { Badge, Grid2 } from '@mui/material'
import { useNavigate } from 'react-router-dom'
import { getIsAuthenticated } from 'src/utils/storage'

const NavigationBar = () => {
  const isAuthenticated = getIsAuthenticated()
  const navigate = useNavigate()
  const cartItems = useSelector(cartSelectors.getCartItemsSelector)

  const totalItemsQuantity = Array.from(cartItems || []).reduce((sum, current) => sum + current.quantity, 0)

  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenu = (event) => {
    if (isAuthenticated) {
      setAnchorEl(event.currentTarget)
    } else {
      navigate('/auth/login')
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  const handleSignOut = () => {
    localStorage.removeItem('accessToken')
    localStorage.removeItem('profile')
    window.location.reload()
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative" color="primary">
        <Toolbar>
          {/* <Typography href="" variant="h6" component="a" sx={{ flexGrow: 1, textDecoration: 'none', color: 'inherit' }}>
            TIGO SHOP
          </Typography> */}
          <Grid2
            size="12"
            flexGrow={1}
            container
            display="flex"
            flexDirection="row"
            justifyContent="space-between"
            alignItems="center">
            <Grid2>
              <Typography component="a" href="/" variant="h6" sx={{ textDecoration: 'none', color: 'white' }}>
                Sports Shop
              </Typography>
            </Grid2>
            <Grid2>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit">
                <Badge color="secondary" variant="dot" invisible={!isAuthenticated}>
                  <AccountCircle />
                </Badge>
              </IconButton>
              <IconButton
                size="large"
                aria-label="cart"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={() => navigate('/checkout')}
                color="inherit">
                <Badge badgeContent={totalItemsQuantity} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
              {isAuthenticated && (
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={Boolean(anchorEl)}
                  onClose={handleClose}>
                  <MenuItem onClick={() => navigate('/account/profile')}>Mi cuenta</MenuItem>
                  <MenuItem onClick={handleSignOut}>Cerrar sesión</MenuItem>
                </Menu>
              )}
            </Grid2>
          </Grid2>
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavigationBar
