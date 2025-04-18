// cartItem.jsx
import React from 'react'
import { ButtonGroup, IconButton, Typography, Box, Button, Paper } from '@mui/material'
import DeleteIcon from '@mui/icons-material/Delete'

const CartItem = ({ item, updateCart }) => {
    const handleIncrease = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || []
        const updatedCart = cart.map(cartItem => {
            if (cartItem._id === item._id) {
                return { ...cartItem, quantity: (cartItem.quantity || 1) + 1 }
            }
            return cartItem
        })
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        updateCart(updatedCart)
    }

    const handleDecrease = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || []
        const updatedCart = cart.map(cartItem => {
            if (cartItem._id === item._id && (cartItem.quantity || 1) > 1) {
                return { ...cartItem, quantity: cartItem.quantity - 1 }
            }
            return cartItem
        })
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        updateCart(updatedCart)
    }

    const handleDelete = () => {
        const cart = JSON.parse(localStorage.getItem('cart')) || []
        const updatedCart = cart.filter(cartItem => cartItem._id !== item._id)
        localStorage.setItem('cart', JSON.stringify(updatedCart))
        updateCart(updatedCart)
    }

    return (
        <Box
            sx={{
                border: '1px solid #ddd',
                borderRadius: 2,
                p: 2,
                mb: 2,
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}
        >
            <Box>
                <Typography variant="h6">{item.name}</Typography>
                <Typography>Price: ₹{item.price}</Typography>
                <Typography>Quantity: {item.quantity || 1}</Typography>
            </Box>
            <Box
                display="flex"
                alignItems="center"
                justifyContent="space-between"
                sx={{
                    borderRadius: 2,
                    px: 2,
                    py: 1,
                    boxShadow: '0 2px 5px rgba(0, 128, 0, 0.1)',
                    border: '1px solid #c8e6c9',
                    width: 'fit-content',
                }}
            >
                <ButtonGroup variant="contained" size="small" sx={{ boxShadow: 'none'}}>
                    <Button
                        onClick={handleDecrease}
                        disabled={item.quantity <= 1}
                        sx={{ backgroundColor: '#66bb6a', '&:hover': { backgroundColor: '#57a05a' } }}
                    >
                        -
                    </Button>
                    <Button
                        disabled
                        sx={{
                            backgroundColor: 'white',
                            color: 'black',
                            minWidth: 40,
                            fontWeight: 'bold',
                            cursor: 'default',
                            fontSize: '18px'
                        }}
                    >
                        {item.quantity || 1}
                    </Button>
                    <Button
                        onClick={handleIncrease}
                        sx={{ backgroundColor: '#66bb6a', '&:hover': { backgroundColor: '#57a05a' } }}
                    >
                        +
                    </Button>
                </ButtonGroup>

                <IconButton
                    color="error"
                    onClick={handleDelete}
                    sx={{
                        ml: 2,
                        backgroundColor: '#ffebee',
                        '&:hover': {
                            backgroundColor: '#ffcdd2'
                        }
                    }}
                >
                    <DeleteIcon />
                </IconButton>
            </Box>
        </Box>
    )
}

export default CartItem
