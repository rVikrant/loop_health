// required dependencies
import React from 'react';

import Box from '@material-ui/core/Box';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import Typography from '@material-ui/core/Typography';
import CardContent from '@material-ui/core/CardContent';
import CardActionArea from '@material-ui/core/CardActionArea';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
  root: {
    boxShadow: "none"
  },
  media: {
    height: "280px"
  },
  ratingsContainer: {
    position: 'absolute',
    top: '-40px',
    color: 'black',
    backgroundColor: 'white',
    padding: "0 0 0 4px",
    borderRadius: "3px",
    fontWeight: 800,
    display: "flex",
    alignItems: "center"
  },
  ratingsStar: {
    background: "url(https://constant.myntassets.com/web/assets/img/MyntraWebSprite_27_01_2021.png)",
    backgroundSize: "1404px 105px",
    display: "inline-block",
    backgroundPosition: "-171px -28px",
    width: "24px",
    height: "28px",
    transform: "scale(.55)"
  },
  indent: {
    margin: "0",
    padding: "0",
  },
});

const ItemCard = (props) => {
  const classes = useStyles();

  const formatCash = num => {
    if (num < 1e3) return num;
    if (num < 1e6) return +(num / 1e3).toFixed(1) + "k";
    if (num < 1e9) return +(num / 1e6).toFixed(1) + "m";
    if (num < 1e12) return +(num / 1e9).toFixed(1) + "b";
    if (num >= 1e12) return +(num / 1e12).toFixed(1) + "t";
  };

  return (
    <Card xs={12} sm={3} md={3} className={classes.root}>
      <CardActionArea>
        <CardMedia
          className={classes.media}
          image={props.content.searchImage}
        />
        <CardContent style={{
          position: "relative"
        }}>
          {props.content.rating > 0 && <Box className={classes.ratingsContainer}>
            <span>{props.content.rating && props.content.rating.toFixed(1)}</span>
            <span className = {classes.ratingsStar}></span>
            <Box component="div" style={{
              display: "flex",
              paddingRight: "4px"
            }}>
              <div style={{
                fontSize: "10px",
                margin: "-.5px 6px 0 -2px"
              }}>|</div>
              {formatCash(props.content.ratingCount)}
            </Box>
          </Box>
          }
          <Box
            style={{
              textAlign: 'justify',
            }}>
            <div>
              <Typography
                variant="body1"
                component="h3"
                noWrap
                style={{
                  fontWeight: "900",
                  color: "#282c3f",
                  width: "100%"
                }}>
                {props.content.brand}
              </Typography>
            </div>
            <div>
              <Typography
                component="h4"
                variant="body2"
                noWrap
              >
                {props.content.productName}
              </Typography>
            </div>
            <Box>
              <Box className={classes.indent} component="div" p={1} m={1} display="inline-block">
                <Typography variant="body2" style={{
                  fontWeight: "600"
                }}>
                  Rs. {props.content.price}
                </Typography>
              </Box>
              <Box component="div" display="inline-block" p={1} m={1} style={{
                margin: "4px",
                padding: "1px"
              }}>
                <Typography variant="body2" style={{
                  color: "#7e818c",
                  fontSize: "12px",
                  textDecoration: "line-through"
                }}>
                  Rs. {props.content.mrp}
                </Typography>
              </Box>
              <Box className={classes.indent} component="div" p={1} m={1} display="inline-block">
                <Typography variant="body2" style={{
                  color: "#ff905a",
                  fontSize: "12px",
                }}>
                  (Rs. {props.content.discount} OFF)
                </Typography>
              </Box>
            </Box>
          </Box>
        </CardContent>
      </CardActionArea>
    </Card>
  );
};

export default ItemCard;
