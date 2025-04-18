import React from 'react'
import {
  Card,
  CardContent,
  Typography,
  CardActions,
  CardMedia,
  Button,
  useMediaQuery,
  Box
} from '@mui/material'
import { useTheme } from '@mui/material/styles'
import Swal from 'sweetalert2'

const ProductItem = ({ item }) => {
  const { price, name, _id } = item
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  // Function to check if the product is already in the cart
  const isProductInCart = () => {
    const cart = JSON.parse(localStorage.getItem('cart')) || []
    return cart.some(product => product._id === _id)
  }

  // Function to handle adding the product to the cart
  const handleAddToCart = () => {
    if (isProductInCart()) {
      Swal.fire({
        icon: 'info',
        title: 'Already in Cart',
        text: 'This product is already in your cart.',
      })
      return
    }

    // Ask for confirmation before adding the product to the cart
    Swal.fire({
      title: 'Are you sure?',
      text: 'Do you want to add this product to your cart?',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, add it!',
      cancelButtonText: 'No, cancel',
    }).then(result => {
      if (result.isConfirmed) {
        // Get the cart from localStorage or create a new one
        const cart = JSON.parse(localStorage.getItem('cart')) || []
        
        const newItem = { ...item, quantity: 1 }
        cart.push(newItem)

        // Save the updated cart back to localStorage
        localStorage.setItem('cart', JSON.stringify(cart))

        // Show success alert
        Swal.fire({
          icon: 'success',
          title: 'Added to Cart',
          text: 'Product has been added to your cart.',
        })
      }
    })
  }

  return (
    <Card
      sx={{
        width: isMobile ? '100%' : 250,
        m: isMobile ? 1 : 2,
        boxShadow: 3,
        borderRadius: 2,
        transition: 'transform 0.2s ease-in-out',
        '&:hover': {
          transform: 'scale(1.02)',
        },
      }}
    >
      <CardMedia
        component="img"
        height="160"
        image="https://img.freepik.com/free-vector/multiple-fruits-vegetables-wallpaper_23-2148481554.jpg?t=st=1744954357~exp=1744957957~hmac=6a05a64036b3ba3b8225cbe8f3da2fb340082edf31b99878eb6ac76c010a3f57&w=1380"
        alt={name}
      />
      <CardContent>
        <Typography variant="h6" component="div" fontWeight="bold" gutterBottom>
          {name}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          ₹{price}
        </Typography>
      </CardContent>
      <CardActions>
        <Button
          size="small"
          variant="contained"
          color="primary"
          fullWidth
          sx={{ textTransform: 'none' }}
          onClick={handleAddToCart}
        >
          Add to Cart
        </Button>
      </CardActions>
    </Card>
  )
}

export default ProductItem
