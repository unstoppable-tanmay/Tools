import React from "react";
import { Link } from "react-router-dom"

import "./App.css"

import IconButton from '@mui/material/IconButton';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';


const Tools = [
  {
    name: "DDA Algo",
    des: "Demonstration of Digital defination algorthim",
    img: "./img/ddalgo.jpg",
    link: "/ddaalgo"
  },
  {
    name: "Coming Soon",
    des: "Coming Soon the next algorthim...",
    img: "./img/coming_soon.webp"
  }
]

function CardDiv(props) {
  return (
    props.card.map((val, ind) => {
      return (
        <Link to={val.link}>
          <Card sx={{ maxWidth: 300 }} key={ind}>
            <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image={val.img}
                alt={val.name}
              />
              <CardContent>
                <Typography gutterBottom variant="h3" component="div">
                  {val.name}
                </Typography>
                <Typography variant="body" color="text.secondary">
                  {val.des}
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Link>
      )
    })
  )
}

function App() {
  return (
    <div className="App">
      <div className="Nav">
        <IconButton color="primary" className="icon_button" aria-label="add to shopping cart" size="large">
          <ArrowBackIcon fontSize="inherit" />
        </IconButton>
        Tools
      </div>
      <div className="App_Home">
        <div className="Main_letter">TOOLS</div>
        <br /><br /><br />
        {/* <div className="search">
          
        </div> */}
        <div className="Tools_container">
          <CardDiv card={Tools} />
      </div>
    </div>
    </div >
  );
}

export default App;
