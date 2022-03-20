import React from 'react'
import { Box } from '@mui/material'

export default function NavItems({ children }) {
  return (
    <Box sx={{ display: "flex", alignItems: "center" }}>
        {children}
    </Box>
  )
}
