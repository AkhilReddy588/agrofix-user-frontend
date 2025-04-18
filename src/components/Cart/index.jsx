import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { Box, Typography, Button } from '@mui/material'
import CartItem from './cartItem'
import Swal from 'sweetalert2'
import Cookies from 'js-cookie';
import { useNavigate } from 'react-router-dom'

const Cart = () => {
    const [cartItems, setCartItems] = useState([])
    const navigate = useNavigate()

    useEffect(() => {
        const storedCart = JSON.parse(localStorage.getItem('cart')) || []
        setCartItems(storedCart)
    }, [])

    const updateCart = (updatedCart) => {
        setCartItems(updatedCart)
    }

    const getTotalPrice = () => {
        return cartItems.reduce((total, item) => total + (item.price * (item.quantity || 1)), 0)
    }

    const onPlaceOrder = async () => {
        const { value: address } = await Swal.fire({
            title: 'Enter your address',
            input: 'textarea',
            inputLabel: 'Shipping Address',
            inputPlaceholder: 'Enter your full delivery address here...',
            inputAttributes: {
                'aria-label': 'Type your address here',
            },
            showCancelButton: true,
            confirmButtonText: 'Place Order',
            inputValidator: (value) => {
                if (!value) {
                  return 'Please enter your address!';
                }
              }
        });
    
        if (address) {
            try {
                const orderItems = cartItems.map(item => ({
                    product: item._id,
                    quantity: item.quantity || 1,
                }));
    
                const url = `${import.meta.env.VITE_API_BASE_URL}/orders`;
                const options = {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': `Bearer ${Cookies.get('token')}`,
                    },
                    body: JSON.stringify({
                        items: orderItems,
                        address: address, // Send address
                    }),
                };
    
                const response = await fetch(url, options);
    
                if (!response.ok) {
                    throw new Error('Failed to place order');
                }
    
                await response.json();
    
                Swal.fire(
                    'Order Placed!',
                    'Your order has been successfully placed.',
                    'success'
                );
    
                localStorage.removeItem('cart');
                setCartItems([]);
                navigate('/my-orders');
    
            } catch (error) {
                Swal.fire(
                    'Error!',
                    'There was an issue placing your order. Please try again.',
                    'error'
                );
            }
        }
    };
    
    return (
        <div>
            <Navbar />
            <Box sx={{ pt: '50px', px: 3 }}>
                <h2 className='products-heading'>Cart Items</h2>

                {cartItems.length > 0 ? (
                    <>
                        {cartItems.map(eachItem => (
                            <CartItem key={eachItem._id} item={eachItem} updateCart={updateCart} />
                        ))}

                        {/* Total Cost */}
                        <Box
                            sx={{
                                mt: 4,
                                p: 2,
                                textAlign: 'right',
                                borderTop: '1px solid #ddd',
                                fontWeight: 'bold',
                            }}
                        >
                            <Typography variant="h6">
                                Total: ₹{getTotalPrice().toFixed(2)}
                            </Typography>
                        </Box>
                        <Button onClick={onPlaceOrder} variant='contained' disableElevation sx={{ textTransform: 'none', }}>Place Order</Button>
                    </>
                ) : (
                    <Typography sx={{ mt: 5 }} variant="h6" align="center">
                        Your cart is empty.
                    </Typography>
                )}
            </Box>

        </div>
    )
}

export default Cart
