import React from 'react'
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  MenuItem,
  Menu,
} from '@mui/material'

const HeaderMenu: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null)
  const open = Boolean(anchorEl)

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget)
  }

  const handleClose = () => {
    setAnchorEl(null)
  }

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" style={{ flexGrow: 1 }}>
          My Website
        </Typography>
        <Button color="inherit" href="#simple-link">
          Simple Link
        </Button>
        <Button
          color="inherit"
          aria-label="more"
          aria-controls="long-menu"
          aria-haspopup="true"
          onMouseOver={handleMenu}
        >
          Hover for Menu
        </Button>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          keepMounted
          open={open}
          onClose={handleClose}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem onClick={handleClose}>My account</MenuItem>
          <MenuItem onClick={handleClose}>Logout</MenuItem>
        </Menu>
      </Toolbar>
    </AppBar>
  )
}

export default HeaderMenu
