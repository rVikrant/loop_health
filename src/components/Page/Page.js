"use strict;"

import React, { useState, useEffect } from "react";
import Grid from '@material-ui/core/Grid';
import Container from '@material-ui/core/Container';
import Box from '@material-ui/core/Box';
import Typography from '@material-ui/core/Typography';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Radio from '@material-ui/core/Radio';
import CircularProgress from '@material-ui/core/CircularProgress';
import { makeStyles } from '@material-ui/core/styles';

import axios from 'axios';

import ItemCard from "./ItemCard";
import FiltersListing from "./FilterListing";

const useStyles = makeStyles({
    loader: {
        justifyContent: "center",
        position: "absolute",
        top: "45%"
    },
    genderFilterContainer: {
        borderRight: "1px solid #e9e9ed",
        borderBottom: "1px solid #e9e9ed",
        padding: "0 0.5em",
        fontWeight: "700",

        '& .MuiRadio-root, .MuiListItem-root': {
            paddingBottom: "2px !important",
            paddingTop: 0
        },

        '& .MuiListItemIcon-root': {
            minWidth: "34px"
        },

        '& .MuiSvgIcon-fontSizeSmall': {
            fontSize: "1.2rem",
        },

        '& .MuiListItemText-primary': {
            fontWeight: 600,
            fontSize: "13px"
        }
    },
    downArrow: {
        background: "url(https://constant.myntassets.com/web/assets/img/MyntraWebSprite_27_01_2021.png)",
        backgroundSize: "1404px 105px",
        display: "inline-block",
        backgroundPosition: "-2679px -89px",
        width: "15px",
        height: "15px",
        verticalAlign: "middle",
        transform: "scale(.8)",
        marginLeft: "4px"
    },
    sortByContainer: {
        padding: ".7em 1em",
        fontSize: "14px",
        color: "#282c3f",
        boxSizing: "border-box",
        borderRadius: "2px",
        backgroundColor: "#fff",
        border: "1px solid #d4d5d9",

        '& span': {
            fontWeight: 600,
            color: "#282c3f"
        }
    },
    discountBannerContainer: {
        position: "fixed",
        bottom: "11rem",
        width: "3.5rem",
        height: "23rem",
        backgroundColor: "#535766",
        zIndex: 10,
        color: "#fff",
        letterSpacing: ".1em",
        cursor: "pointer",
        right: "0",

        '& div': {
            borderRight: "1rem solid #fff",
            margin: "2.1rem 1.3rem",
            borderTop: "1rem solid transparent",
            borderBottom: "1rem solid transparent"
        },

        '& p': {
            writingMode: "vertical-rl",
            transform: "rotate(-180deg)",
            width: "3rem",
            padding: ".3px",
            height: "15rem",
            verticalAlign: "middle",
            textAlign: "center",
            fontSize: "2.1em",
            fontWeight: "500",
            color: "#fcfcfc",
            display: "inline-block"
        }
    },
    countContainer: {
        paddingTop: "2rem",
        textAlign: "justify",
        paddingLeft: "10.3rem",
        fontSize: "1rem",
        fontWeight: 600,

        '& span': {
            color: "#94969f",
            fontWeight: 500
        }
    }
});

export default function Page() {
    const classes = useStyles();

    let [page, setPage] = useState(1);
    let [error, showError] = useState(false);
    let [loader, showLoader] = useState(true);
    let [gender, setGender] = useState([{ id: "Men" }, { id: "Women" }, { id: "Boys" }, { id: "Girls" }]);
    let [brands, setBrands] = useState([]);
    let [products, setProducts] = useState([]);
    let [categories, setCategories] = useState([]);
    let [genderFilter, setGenderFilter] = useState("");
    let [priceFilters, setPriceFilter] = useState([]);
    let [totalProducts, setTotalProducts] = useState(0);

    const fetchProducts = async () => {
        try {
            let uri = process.env.REACT_APP_API_URL + `/v1/products?page=${page}`;

            // fetch products with complete datat
            const { data } = await axios.get(uri);

            const { totalCount, products, filters } = data;

            let { price, brands, categories } = filters;

            console.log(gender, "gjkkkkkkkkkkkkkkkkkkkk", filters.gender);

            // set required variable 
            // ************* --------------  dummy data is placed only to test  --------------- *************
            setGender(filters.gender);
            setBrands(brands);
            setProducts(products);
            setPriceFilter(price);
            setCategories(categories);
            setTotalProducts(totalCount);
            showLoader(false);
        } catch(e) {
            showError(true);
            console.log("erorr-----------", e);
            showLoader(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, [page])

    return (
        <>
            {
                loader && <Grid container className={classes.loader}><CircularProgress color="secondary" /></Grid> ||
                error && <Grid container justify="center" className={classes.loader}><h2>Oops.. Something went wrong. Please try later.</h2></Grid> ||
                (totalProducts < 1 ?
                    <Grid container justify="center" className={classes.loader}><h2>No Product found.</h2></Grid> :
                    <Grid lg={12}>
                        <Grid lg={12} style={{ height: "3rem" }}>
                            <Typography component="p" className={classes.countContainer}>
                                Black <span>- {totalProducts} items</span>
                            </Typography>
                        </Grid>
                        <Box>
                            <div className={classes.discountBannerContainer}>
                                <div></div>
                                <Typography component="p">
                                    FLAT Rs. 300 OFF
                                </Typography>
                            </div>
                        </Box>
                        <Grid container style={{ margin: "0 auto", maxWidth: "98rem" }}>
                            <Grid lg={2}>
                                <div style={{
                                    textTransform: "uppercase",
                                    borderBottom: "1px solid #e9e9ed",
                                    paddingTop: "2rem"
                                    // marginLeft: "24%",
                                }}>
                                    <Typography component="h2" variant="subtitle1" style={{
                                        display: "flex",
                                        fontWeight: 800,
                                        padding: "1rem 2rem"
                                    }}>
                                        Filters
                                    </Typography>
                                </div>
                                <Box className={classes.genderFilterContainer}>
                                    <List>
                                        {gender.map((value, index) => {
                                            const labelId = `gender-label-${value.id}`;

                                            return (
                                                <ListItem key={index} button>
                                                    <ListItemIcon>
                                                        <Radio
                                                            checked={genderFilter.toLocaleLowerCase() === value.id.toLocaleLowerCase()}
                                                            size="small"
                                                            value={value.id}
                                                            onChange={e => setGenderFilter(e.target.value)}
                                                        />
                                                    </ListItemIcon>
                                                    <ListItemText style={{ fontWeight: 600, textTransform: "capitalize" }} id={labelId} primary={`${value.id}`} />
                                                </ListItem>
                                            );
                                        })}
                                    </List>
                                </Box>
                                <FiltersListing title="Categories" data={categories} isShowMore={true} />
                                <FiltersListing title="Brand" data={brands} isShowMore={true} />
                                <FiltersListing title="Price" data={priceFilters} />
                            </Grid>
                            <Grid lg={10}>
                                <Box style={{
                                    borderBottom: "1px solid #e9e9ed",
                                    paddingTop: "2.53rem",
                                    position: "relative"
                                }}>
                                    <div style={{
                                        display: "flex"
                                    }}>
                                        <Typography alignLeft component="body2" variant="caption" style={{
                                            padding: "1rem 1rem",
                                        }}>
                                            Bundles
                                            <span className={classes.downArrow}></span>
                                        </Typography>
                                        <Typography alignLeft component="body2" variant="caption" style={{
                                            padding: "1rem 0"
                                        }}>
                                            Size
                                            <span className={classes.downArrow}></span>
                                        </Typography>
                                    </div>
                                    <div style={{
                                        float: "right",
                                        position: "absolute",
                                        bottom: "1em",
                                        right: "3em"
                                    }}>
                                        <div className={classes.sortByContainer}>
                                            Sort by :
                                            <span> Recommended</span>
                                            <span className={classes.downArrow} style={{ marginLeft: "6.5em" }}></span>
                                        </div>
                                    </div>
                                </Box>
                                <Container>
                                    <Grid
                                        container
                                        justify="center"
                                        style={{ marginTop: '50px' }}
                                        spacing={2}>
                                        {products && products.length && (
                                            products.map((content) => {
                                                return (
                                                    <Grid
                                                        item
                                                        key={content.id}
                                                        xs={12}
                                                        md={3}
                                                        className="cards-div">
                                                        <ItemCard
                                                            content={content}
                                                        />
                                                    </Grid>
                                                );
                                            })
                                        )}
                                    </Grid>
                                    {/* {showLoadMore && totalProducts && (
                                        <LoadMore onClick={() => loadMore()} />
                                    )} */}
                                </Container>
                            </Grid>
                        </Grid>
                    </Grid>
                )
            }
        </>
    )
}