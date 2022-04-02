import React from 'react'
import { Link } from 'react-router-dom'
import { MenuItem, Typography } from '@mui/material'

export default function CustomMenuItem({ closeMenu, logOut }) {
  return (
    <MenuItem onClick={closeMenu}>
      <Link to="/signin" onClick={logOut}>
        <Typography>Logout</Typography>
      </Link>
    </MenuItem>
  )
}
