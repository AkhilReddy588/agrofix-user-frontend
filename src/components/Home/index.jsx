import React, { useEffect, useState } from 'react'
import Navbar from '../Navbar'
import { Grid, Card, CardContent, Typography, Button, CardMedia, Box } from '@mui/material'
import ProductItem from './productItem'
import '../../styles.css'

const Home = () => {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)

  const fetchProducts = async () => {
    try {
      const response = await fetch(`${import.meta.env.VITE_API_BASE_URL}/products`) // Update with your backend URL
      if (!response.ok) {
        throw new Error('Failed to fetch products')
      }
      const data = await response.json()
      setProducts(data)
      setLoading(false)
    } catch (error) {
      console.error("Error fetching products:", error)
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProducts()
  }, [])

  if (loading) {
    return <h2>Loading...</h2>
  }

  return (
    <div>
      <Navbar />
      <Box sx={{ pt: 5 }}>
        <h1 className='products-heading'>Fruits and Vegetables</h1>
        <Box  spacing={2} sx={{display: 'flex', flexWrap: 'wrap'}}>
          {products.map(item => (
              <ProductItem item={item} />
          ))}
        </Box>
      </Box>
    </div>
  )
}

export default Home
