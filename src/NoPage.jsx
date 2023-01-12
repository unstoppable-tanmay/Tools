import React from 'react'
import { Link } from 'react-router-dom';

import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

const NoPage = () => {
  return (
    <div className="Error">
      <div className="Nav">
        <Link to="/">
          <IconButton color="primary" className="icon_button" aria-label="add to shopping cart" size="large">
            <ArrowBackIcon fontSize="inherit" />
          </IconButton>
        </Link>
        Digital Difference Algorthim
      </div>
      <div className="Error_Screen">
        No Page Found
      </div>
    </div>
  )
}

export default NoPage