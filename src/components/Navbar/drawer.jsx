import React from 'react'
import Drawer from '@mui/material/Drawer'
import { useNavigate } from 'react-router-dom'
import Cookies from 'js-cookie'
import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemText from '@mui/material/ListItemText'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart'
import AssignmentIcon from '@mui/icons-material/Assignment'
import LogoutIcon from '@mui/icons-material/Logout'

const MobileDrawer = ({ open, toggleDrawer }) => {
  const token = Cookies.get('token')  
  const navigate = useNavigate()

  const handleLogout = () => {
    Cookies.remove('token')
    navigate('/login')
  }

  return (
    <Drawer anchor="right" open={open} onClose={toggleDrawer}>
      <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer}>
        <List>
          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/cart')}>
              <ShoppingCartIcon sx={{ mr: 2 }} />
              <ListItemText primary="Cart" />
            </ListItemButton>
          </ListItem>

          <ListItem disablePadding>
            <ListItemButton onClick={() => navigate('/my-orders')}>
              <AssignmentIcon sx={{ mr: 2 }} />
              <ListItemText primary="My Orders" />
            </ListItemButton>
          </ListItem>

          {token && (
            <ListItem disablePadding>
              <ListItemButton onClick={handleLogout} sx={{ color: 'red' }}>
                <LogoutIcon sx={{ mr: 2 }} />
                <ListItemText primary="Logout" />
              </ListItemButton>
            </ListItem>
          )}
        </List>
      </Box>
    </Drawer>
  )
}

export default MobileDrawer
