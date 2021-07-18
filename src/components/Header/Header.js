"use strict;"

import React from 'react';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import InputBase from '@material-ui/core/InputBase';
import { makeStyles } from '@material-ui/core/styles';
import Link from '@material-ui/core/Link';
import Avatar from '@material-ui/core/Avatar';
import SearchIcon from '@material-ui/icons/Search';

// assets
import Logo from "../../assets/logo.jpeg";

const useStyles = makeStyles((theme) => ({
    root: {
        flexGrow: 1,
    },
    title: {
        flexGrow: 1,
        display: 'none',
        // [theme.breakpoints.up('sm')]: {
        //     display: 'block',
        // },
    },
    search: {
        position: 'relative',
        color: "black !important",
        borderRadius: "0 .4em .4em 0",
        backgroundColor: "#f5f5f6",
        margin: "2em 2em 2em 6em",
        border: ".1em solid #f5f5f6",
        width: '33% !important',
        // [theme.breakpoints.up('sm')]: {
        //     width: 'auto',
        // },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        width: '92% !important',
        paddingLeft: "3rem",
        boxSizing: "content-box"
    },
    inputInput: {
        width: '100% !important',
        // [theme.breakpoints.up('sm')]: {
        //     width: '12ch',
        //     '&:focus': {
        //         width: '20ch',
        //     },
        // },
    },
    headingContainer: {
        marginLeft: "3.5%",
        float: "left",
        fontWeight: "500",
        fontSize: ".9rem",
        color: "black",
        width: "38%"
    },
    heading: {
        float: "left",
        textTransform: "uppercase",
        padding: "0 .5rem"
    },
    profileContainer: {
        height: "60px",
        margin: "0 20px 0 15px",
        float: "left"
    },
    profileIcon: {
        background: "url(https://constant.myntassets.com/web/assets/img/MyntraWebSprite_27_01_2021.png)",
        backgroundSize: "1404px 105px",
        width: "24px",
        height: "24px",
        backgroundPosition: "-298px -56px",
        margin: "10px 0 0",
        display: "block"
    },
    profileTitle: {
        color: "#000",
        fontSize: "12px",
        fontWeight: "500",
        display: "inline-block",
        lineHeight: "6px"
    }
}));

export default function Header() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <AppBar position="static" style={{
                backgroundColor: "white"
            }}>
                <Toolbar>
                    <Typography style={{
                        float: "left",
                        marginLeft: "4%"
                    }}>
                        <Link href="https://www.myntra.com">
                            <Avatar src={Logo} />
                        </Link>
                    </Typography>
                    <Box className={classes.headingContainer} >
                        <div className={classes.heading}>
                            <div>
                                Men
                            </div>
                        </div>
                        <div className={classes.heading}>
                            <div>
                                Women
                            </div>
                        </div>
                        <div className={classes.heading}>
                            <div>
                                Kids
                            </div>
                        </div>
                        <div className={classes.heading}>
                            <div>
                                Home & Living
                            </div>
                        </div>
                        <div className={classes.heading} >
                            <div>
                                Beauty
                            </div>
                        </div>
                    </Box>
                    <div className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search for products..."
                            classes={{
                                root: classes.inputRoot,
                                input: classes.inputInput,
                            }}
                            inputProps={{ 'aria-label': 'search' }}
                        />
                    </div>
                    <div style={{ float: "right" }}>
                        <div>
                            <div className={classes.profileContainer}>
                                <span className={classes.profileIcon} ></span>
                                <span className={classes.profileTitle}>
                                    Profile
                                </span>
                            </div>
                            <div className={classes.profileContainer}>
                                <span className={classes.profileIcon} style={{
                                    width: "17px",
                                    height: "24px",
                                    backgroundPosition: "-315px -187px",
                                    margin: "10px 0 0 12px"
                                }}></span>
                                <span className={classes.profileTitle} >
                                    Wishlist
                                </span>
                            </div>
                            <div className={classes.profileContainer} style={{ float: "right" }}>
                                <span className={classes.profileIcon} style={{
                                    width: "22px",
                                    height: "22px",
                                    backgroundPosition: "-341px -56px",
                                    margin: "10px 0 0",
                                }}></span>
                                <span className={classes.profileTitle}>
                                    Bag
                                </span>
                            </div>
                        </div>
                    </div>
                </Toolbar>
            </AppBar>
        </div>
    );
}