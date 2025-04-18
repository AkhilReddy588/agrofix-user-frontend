import React, { useState, useEffect } from 'react'
import Navbar from '../Navbar'
import { Box, Card, CardContent, Typography, Divider } from '@mui/material'
import '../../styles.css'
import Cookies from 'js-cookie'

const Orders = () => {
  const [orders, setOrders] = useState([])

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/orders/my-orders`, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${Cookies.get('token')}`,
          },
        })

        if (!res.ok) {
          throw new Error('Failed to fetch orders')
        }

        const data = await res.json()
        setOrders(data)
      } catch (err) {
        console.error(err)
      }
    }

    fetchOrders()
  }, [])

  return (
    <div>
      <Navbar />
      <Box sx={{ pt: '60px', px: 3 }}>
        <h1 className='products-heading'>My Orders</h1>

        {orders.length > 0 ? (
          orders.map((order, index) => (
            <Card key={order._id} sx={{p: 2, mt: 2 }}>
              <Typography variant="h6" gutterBottom>
                Order #{index + 1}
              </Typography>
              <Typography variant="body2" color="textSecondary" gutterBottom>
                Status: <strong>{order.status || 'Pending'}</strong>
              </Typography>
              <Divider sx={{ my: 1 }} />
              {order.items.map((item, i) => (
                <Box key={i} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                  <Typography>{item.product.name}</Typography>
                  <Typography>₹{item.product.price} x {item.quantity}</Typography>
                </Box>
              ))}
              <Divider sx={{ mt: 1 }} />
              <Typography variant="subtitle1" sx={{ mt: 1, fontWeight: 'bold' }}>
                Total: ₹{order.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0).toFixed(2)}
              </Typography>
            </Card>
          ))
        ) : (
          <Typography variant="h6" align="center" sx={{ mt: 5 }}>
            You have no orders.
          </Typography>
        )}
      </Box>
    </div>
  )
}

export default Orders
