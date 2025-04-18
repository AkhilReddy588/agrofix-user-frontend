import React, { useState } from 'react'
import Cookies from 'js-cookie'
import { useNavigate } from 'react-router-dom'
import AppBar from '@mui/material/AppBar'
import Box from '@mui/material/Box'
import Toolbar from '@mui/material/Toolbar'
import Typography from '@mui/material/Typography'
import Button from '@mui/material/Button'
import IconButton from '@mui/material/IconButton'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { useTheme } from '@mui/material/styles'
import useMediaQuery from '@mui/material/useMediaQuery'
import MenuIcon from '@mui/icons-material/Menu'
import MobileDrawer from './drawer'
import Badge from '@mui/material/Badge'
import Swal from 'sweetalert2'

const Navbar = () => {
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const navigate = useNavigate()

  // State for Drawer
  const [drawerOpen, setDrawerOpen] = useState(false)

  const toggleDrawer = () => {
    setDrawerOpen(!drawerOpen)
  }

  const onLogin = () => {
    navigate('/login')
  }

  const onLogout = () => {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You will be logged out!',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, logout'
    }).then((result) => {
      if (result.isConfirmed) {
        Cookies.remove('token');
        navigate('/login');
        Swal.fire('Logged Out', 'You have been successfully logged out.', 'success');
      }
    });
  };

  const token = Cookies.get('token')

  // Function to get the number of items in the cart
  const getCartItemCount = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    return cart.length
  }

  const cartItemCount = getCartItemCount()

  return (
    <AppBar color="default" elevation={1}>
      <Toolbar sx={{ justifyContent: 'space-between', px: 2 }}>
        {/* Logo */}

        <Box onClick={() => { navigate('/') }} display="flex" alignItems="center" >
          <img
            src="https://img.freepik.com/premium-vector/fresh-fruit-logo-design-mascot_157713-4.jpg?w=740"
            alt="Logo"
            style={{ height: 50, marginRight: 10, borderRadius: '50%' }}
          />
          <Typography variant="h6" noWrap
            sx={{
              fontWeight: 'bold',
              fontFamily: 'Bree Serif, serif',
              fontSize: '25px',
              background: 'linear-gradient(to right, #ff7e5f, #feb47b)',
              WebkitBackgroundClip: 'text',
              color: 'transparent'
            }} >
            AgroFix
          </Typography>
        </Box>

        {/* Mobile View Hamburger Menu */}
        {isMobile ? (
          <>
            {token &&
              <IconButton
                edge="end"
                color="inherit"
                aria-label="menu"
                onClick={toggleDrawer}
                sx={{ display: { xs: 'block', sm: 'none' } }}
              >
                <MenuIcon />
              </IconButton>
            }
            {!token &&
              <Button onClick={onLogin} color="primary" variant="contained" sx={{ width: '80px', height: '27px', textTransform: 'none' }}>
                Login
              </Button>
            }
          </>
        ) : (
          /* Desktop View Buttons */
          <Box display="flex" gap={2} sx={{ alignItems: 'center' }}>
            {token &&
              <>
                <Button color="primary" onClick={() => { navigate('/cart') }}  >
                  <Badge badgeContent={cartItemCount} color="success">
                    <ShoppingCartIcon sx={{ color: 'green' }} />
                  </Badge>
                </Button>
                <Button color="primary" variant="outlined" sx={{ width: '110px', height: '27px', textTransform: 'none' }}
                  onClick={() => { navigate('/my-orders') }}
                >
                  My Orders
                </Button>
                <Button color="primary" variant="contained" sx={{ width: '80px', height: '27px', textTransform: 'none' }}
                  onClick={onLogout}
                >
                  Logout
                </Button>
              </>
            }
            {!token &&
              <Button color="primary" variant="contained" sx={{ width: '80px', height: '27px', textTransform: 'none' }}
                onClick={onLogin}
              >
                Login
              </Button>
            }
          </Box>
        )}

        {/* Drawer for Mobile View */}
        <MobileDrawer open={drawerOpen} toggleDrawer={toggleDrawer} />
      </Toolbar>
    </AppBar>
  )
}

export default Navbar
