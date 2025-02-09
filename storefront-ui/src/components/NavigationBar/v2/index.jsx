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
import { Badge } from '@mui/material'

const NavigationBarV2 = () => {
  const cartItems = useSelector(cartSelectors.getCartItemsSelector)

  const totalItemsQuantity = Array.from(cartItems || []).reduce((sum, current) => sum + current.quantity, 0)

  const [auth] = React.useState(true)
  const [anchorEl, setAnchorEl] = React.useState(null)

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="relative">
        <Toolbar>
          <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
            TIGO SHOP
          </Typography>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit">
                <AccountCircle />
              </IconButton>
              <IconButton
                size="large"
                aria-label="cart"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit">
                <Badge badgeContent={totalItemsQuantity} color="secondary">
                  <ShoppingCart />
                </Badge>
              </IconButton>
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
                <MenuItem onClick={handleClose}>Profile</MenuItem>
                <MenuItem onClick={handleClose}>My account</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </AppBar>
    </Box>
  )
}

export default NavigationBarV2
