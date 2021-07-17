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
    menuButton: {
        marginRight: theme.spacing(2),
    },
    title: {
        flexGrow: 1,
        display: 'none',
        [theme.breakpoints.up('sm')]: {
            display: 'block',
        },
    },
    search: {
        position: 'relative',
        color: "black !important",
        borderRadius: "0 .4em .4em 0",
        backgroundColor: "#f5f5f6",
        margin: "2em 2em 2em 6em",
        border: ".1em solid #f5f5f6",
        width: '33% !important',
        [theme.breakpoints.up('sm')]: {
            width: 'auto',
        },
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
        [theme.breakpoints.up('sm')]: {
            width: '12ch',
            '&:focus': {
                width: '20ch',
            },
        },
    },
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
                    <Box style={{
                        marginLeft: "3.5%",
                        float: "left",
                        fontWeight: "500",
                        fontSize: ".9rem",
                        color: "black",
                        width: "38%"
                    }}>
                        <div style={{
                            float: "left",
                            textTransform: "uppercase",
                        }}>
                            <div style={{
                                padding: "0 .5rem"
                            }} >
                                Men
                            </div>
                        </div>
                        <div style={{
                            float: "left",
                            textTransform: "uppercase"
                        }}>
                            <div style={{
                                padding: "0 .5rem"
                            }} >
                                Women
                            </div>
                        </div>
                        <div style={{
                            float: "left",
                            textTransform: "uppercase"
                        }}>
                            <div style={{
                                padding: "0 .5rem"
                            }} >
                                Kids
                            </div>
                        </div>
                        <div style={{
                            float: "left",
                            textTransform: "uppercase"
                        }}>
                            <div style={{
                                padding: "0 .5rem"
                            }} >
                                Home & Living
                            </div>
                        </div>
                        <div style={{
                            float: "left",
                            textTransform: "uppercase"
                        }}>
                            <div style={{
                                padding: "0 .5rem"
                            }} >
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
                    <div style={{
                        float: "right"
                    }}>
                        <div>
                            <div style = {{
                                height: "60px",
                                margin: "0 20px 0 15px",
                                float: "left"
                            }}>
                                <span style={{
                                    background: "url(https://constant.myntassets.com/web/assets/img/MyntraWebSprite_27_01_2021.png)",
                                    backgroundSize: "1404px 105px",
                                    width: "24px",
                                    height: "24px",
                                    backgroundPosition: "-298px -56px",
                                    margin: "10px 0 0",
                                    // position: "absolute",
                                    // bottom: "13px",
                                    // left: "5px",
                                    display: "block"
                                }}></span>
                                <span style={{
                                    color: "#000",
                                    // position: "absolute",
                                    // bottom: "4px",
                                    // left: "1px",
                                    fontSize: "12px",
                                    fontWeight: "500",
                                    display: "inline-block",
                                    // paddingTop: "10px",
                                    lineHeight: "6px"
                                }}>
                                    Profile
                                </span>
                            </div>
                            <div style = {{
                                float: "left",
                                height: "60px",
                                margin: "0 20px 0 15px"
                            }}>
                                <span style={{
                                    background: "url(https://constant.myntassets.com/web/assets/img/MyntraWebSprite_27_01_2021.png)",
                                    backgroundSize: "1404px 105px",
                                    width: "17px",
                                    height: "24px",
                                    backgroundPosition: "-315px -187px",
                                    margin: "10px 0 0 12px",
                                    // position: "absolute",
                                    // bottom: "13px",
                                    // left: "5px",
                                    display: "block"
                                }}></span>
                                <span style={{
                                    color: "#000",
                                    // position: "absolute",
                                    // bottom: "4px",
                                    // left: "1px",
                                    fontSize: "12px",
                                    fontWeight: "500",
                                    display: "inline-block",
                                    // paddingTop: "10px",
                                    lineHeight: "6px"
                                }}>
                                    Wishlist
                                </span>
                            </div>
                            <div style = {{
                                float: "right",
                                height: "60px",
                                margin: "0 20px 0 15px"
                            }}>
                                <span style={{
                                    background: "url(https://constant.myntassets.com/web/assets/img/MyntraWebSprite_27_01_2021.png)",
                                    backgroundSize: "1404px 105px",
                                    width: "22px",
                                    height: "22px",
                                    backgroundPosition: "-341px -56px",
                                    margin: "10px 0 0",
                                    // position: "absolute",
                                    // bottom: "13px",
                                    // left: "5px",
                                    display: "block"
                                }}></span>
                                <span style={{
                                    color: "#000",
                                    // position: "absolute",
                                    // bottom: "4px",
                                    // left: "1px",
                                    fontSize: "12px",
                                    fontWeight: "500",
                                    display: "inline-block",
                                    // paddingTop: "10px",
                                    lineHeight: "6px"
                                }}>
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