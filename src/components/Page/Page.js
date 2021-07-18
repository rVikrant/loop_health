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
            // un comment below line to show error in case of failer
            // showError(true);
            console.log("erorr-----------", e);
            showLoader(false);
            setBrands(brandss);
            setProducts(productss);
            setPriceFilter(prices);
            setCategories(categoriess);
            setTotalProducts(100);
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

let productss = [{
    "landingPageUrl": "Track-Pants/Puma/Puma-Men-Black-Printed-Straight-Fit-Track-Pants/13887470/buy",
    "loyaltyPointsEnabled": false,
    "adId": "",
    "isPLA": false,
    "productId": 13887470,
    "product": "Puma Men Black Printed Straight Fit Track Pants",
    "productName": "Puma Men Black Printed Straight Fit Track Pants",
    "rating": 0,
    "ratingCount": 0,
    "isFastFashion": false,
    "futureDiscountedPrice": 0,
    "futureDiscountStartDate": "",
    "discount": 1800,
    "brand": "Puma",
    "searchImage": "http://assets.myntassets.com/assets/images/13887470/2021/6/17/e4253dc4-8fb7-419b-ad86-f70878c0fef81623931321039-Puma-Men-Track-Pants-5131623931320409-1.jpg",
    "effectiveDiscountPercentageAfterTax": 0,
    "effectiveDiscountAmountAfterTax": 0,
    "buyButtonWinnerSkuId": 46865024,
    "buyButtonWinnerSellerPartnerId": 6206,
    "relatedStylesCount": 0,
    "relatedStylesType": "",
    "productVideos": [],
    "inventoryInfo": [
        {
            "skuId": 46865024,
            "label": "XS",
            "inventory": 0,
            "available": false
        },
        {
            "skuId": 46865025,
            "label": "S",
            "inventory": 45,
            "available": true
        },
        {
            "skuId": 46865026,
            "label": "M",
            "inventory": 105,
            "available": true
        },
        {
            "skuId": 46865027,
            "label": "L",
            "inventory": 47,
            "available": true
        },
        {
            "skuId": 46865028,
            "label": "XL",
            "inventory": 3,
            "available": true
        },
        {
            "skuId": 46865029,
            "label": "XXL",
            "inventory": 3,
            "available": true
        }
    ],
    "sizes": "S,M,L,XL,XXL",
    "images": [
        {
            "view": "default",
            "src": "http://assets.myntassets.com/assets/images/13887470/2021/6/17/e4253dc4-8fb7-419b-ad86-f70878c0fef81623931321039-Puma-Men-Track-Pants-5131623931320409-1.jpg"
        },
        {
            "view": "size_representation",
            "src": ""
        },
        {
            "view": "back",
            "src": "http://assets.myntassets.com/assets/images/13887470/2021/6/17/d1c2665b-d0b9-4535-8e8d-ef0eb0c81cab1623931321021-Puma-Men-Track-Pants-5131623931320409-3.jpg"
        },
        {
            "view": "right",
            "src": "http://assets.myntassets.com/assets/images/13887470/2021/6/17/5c00261c-fbf2-4d8b-bab2-f8668cb275011623931321013-Puma-Men-Track-Pants-5131623931320409-4.jpg"
        },
        {
            "view": "left",
            "src": "http://assets.myntassets.com/assets/images/13887470/2021/6/17/464d7496-0ec1-418e-b939-bad6d802c2cc1623931321006-Puma-Men-Track-Pants-5131623931320409-5.jpg"
        },
        {
            "view": "bottom",
            "src": "http://assets.myntassets.com/assets/images/13887470/2021/6/17/ae131906-add8-47af-b2a8-7f2832ff01041623931320991-Puma-Men-Track-Pants-5131623931320409-7.jpg"
        },
        {
            "view": "front",
            "src": "http://assets.myntassets.com/assets/images/13887470/2021/6/17/6411e22d-88c9-48d8-8e3a-b289b183532e1623931321029-Puma-Men-Track-Pants-5131623931320409-2.jpg"
        },
        {
            "view": "search",
            "src": "http://assets.myntassets.com/assets/images/13887470/2021/6/17/e4253dc4-8fb7-419b-ad86-f70878c0fef81623931321039-Puma-Men-Track-Pants-5131623931320409-1.jpg"
        },
        {
            "view": "top",
            "src": "http://assets.myntassets.com/assets/images/13887470/2021/6/17/8ccf4109-880f-48b9-a98b-4a8357f5a5391623931320998-Puma-Men-Track-Pants-5131623931320409-6.jpg"
        }
    ],
    "gender": "Men",
    "primaryColour": "Black",
    "discountLabel": "Flat_Search_Percent",
    "discountDisplayLabel": "(60% OFF)",
    "additionalInfo": "Straight Fit Track Pants",
    "category": "Track Pants",
    "mrp": 2999,
    "price": 1199,
    "advanceOrderTag": "",
    "colorVariantAvailable": false,
    "productimagetag": "",
    "listViews": 0,
    "discountType": "1",
    "tdBxGyText": "",
    "catalogDate": "1623888000000",
    "season": "Spring",
    "year": "2021",
    "isPersonalised": false,
    "eorsPicksTag": "",
    "personalizedCoupon": "",
    "personalizedCouponValue": 0,
    "productMeta": "",
    "systemAttributes": [],
    "attributeTagsPriorityList": [],
    "preferredDeliveryTag": ""
},
{
    "landingPageUrl": "Kurta-Sets/AASI---HOUSE-OF-NAYO/AASI---HOUSE-OF-NAYO-Women-Black--Mustard-Yellow-Solid-Kurta-with-Trousers--Dupatta/9438657/buy",
    "loyaltyPointsEnabled": false,
    "adId": "",
    "isPLA": false,
    "productId": 9438657,
    "product": "AASI - HOUSE OF NAYO Women Black \u0026 Mustard Yellow Solid Kurta with Trousers \u0026 Dupatta",
    "productName": "AASI - HOUSE OF NAYO Women Black \u0026 Mustard Yellow Solid Kurta with Trousers \u0026 Dupatta",
    "rating": 4.088244438171387,
    "ratingCount": 3207,
    "isFastFashion": true,
    "futureDiscountedPrice": 0,
    "futureDiscountStartDate": "",
    "discount": 1740,
    "brand": "AASI - HOUSE OF NAYO",
    "searchImage": "http://assets.myntassets.com/assets/images/9438657/2019/5/8/5f44fbff-658c-40f2-ae17-4ae52b7381e31557297223910-AASI---HOUSE-OF-NAYO-Women-Black--Mustard-Solid-Kurta-with-T-1.jpg",
    "effectiveDiscountPercentageAfterTax": 0,
    "effectiveDiscountAmountAfterTax": 0,
    "buyButtonWinnerSkuId": 34192745,
    "buyButtonWinnerSellerPartnerId": 8688,
    "relatedStylesCount": 0,
    "relatedStylesType": "",
    "productVideos": [],
    "inventoryInfo": [
        {
            "skuId": 34192745,
            "label": "XS",
            "inventory": 3282,
            "available": true
        },
        {
            "skuId": 34192747,
            "label": "S",
            "inventory": 2183,
            "available": true
        },
        {
            "skuId": 34192749,
            "label": "M",
            "inventory": 2234,
            "available": true
        },
        {
            "skuId": 34192751,
            "label": "L",
            "inventory": 3324,
            "available": true
        },
        {
            "skuId": 34192752,
            "label": "XL",
            "inventory": 2233,
            "available": true
        },
        {
            "skuId": 34192754,
            "label": "XXL",
            "inventory": 2218,
            "available": true
        },
        {
            "skuId": 34192755,
            "label": "3XL",
            "inventory": 68,
            "available": true
        }
    ],
    "sizes": "XS,S,M,L,XL,XXL,3XL",
    "images": [
        {
            "view": "default",
            "src": "http://assets.myntassets.com/assets/images/9438657/2019/5/8/5f44fbff-658c-40f2-ae17-4ae52b7381e31557297223910-AASI---HOUSE-OF-NAYO-Women-Black--Mustard-Solid-Kurta-with-T-1.jpg"
        },
        {
            "view": "size_representation",
            "src": ""
        },
        {
            "view": "back",
            "src": "http://assets.myntassets.com/assets/images/9438657/2019/5/8/4f50e362-347a-4857-8900-77530fca97c21557297223856-AASI---HOUSE-OF-NAYO-Women-Black--Mustard-Solid-Kurta-with-T-3.jpg"
        },
        {
            "view": "right",
            "src": "http://assets.myntassets.com/assets/images/9438657/2019/5/8/5b97e28b-c71b-4142-8759-68e6358937071557297223834-AASI---HOUSE-OF-NAYO-Women-Black--Mustard-Solid-Kurta-with-T-4.jpg"
        },
        {
            "view": "front",
            "src": "http://assets.myntassets.com/assets/images/9438657/2019/5/8/cf82d41a-565a-4ad7-b62e-9fdd11e258c31557297223884-AASI---HOUSE-OF-NAYO-Women-Black--Mustard-Solid-Kurta-with-T-2.jpg"
        },
        {
            "view": "search",
            "src": "http://assets.myntassets.com/assets/images/9438657/2019/5/8/5f44fbff-658c-40f2-ae17-4ae52b7381e31557297223910-AASI---HOUSE-OF-NAYO-Women-Black--Mustard-Solid-Kurta-with-T-1.jpg"
        },
        {
            "view": "top",
            "src": "http://assets.myntassets.com/assets/images/9438657/2019/5/8/634146d1-254e-456d-a70b-d65245664cce1557297223798-AASI---HOUSE-OF-NAYO-Women-Black--Mustard-Solid-Kurta-with-T-6.jpg"
        },
        {
            "view": "left",
            "src": "http://assets.myntassets.com/assets/images/9438657/2019/5/8/35c7e5b9-35c1-4d9e-bcbd-583636df5df21557297223815-AASI---HOUSE-OF-NAYO-Women-Black--Mustard-Solid-Kurta-with-T-5.jpg"
        }
    ],
    "gender": "Women",
    "primaryColour": "Black",
    "discountLabel": "Flat_Search_Percent",
    "discountDisplayLabel": "(58% OFF)",
    "additionalInfo": "Women Solid Kurta with Trousers \u0026 Dupatta",
    "category": "Kurta Sets",
    "mrp": 2999,
    "price": 1259,
    "advanceOrderTag": "",
    "colorVariantAvailable": false,
    "productimagetag": "",
    "listViews": 0,
    "discountType": "1",
    "tdBxGyText": "",
    "catalogDate": "1556755200000",
    "season": "Summer",
    "year": "2019",
    "isPersonalised": false,
    "eorsPicksTag": "",
    "personalizedCoupon": "",
    "personalizedCouponValue": 0,
    "productMeta": "",
    "systemAttributes": [
        {
            "attribute": "SA_XT_PICWORTHY",
            "value": "PIC-WORTHY"
        },
        {
            "attribute": "SA_XT_BESTSELLER",
            "value": "BESTSELLER"
        }
    ],
    "attributeTagsPriorityList": [],
    "preferredDeliveryTag": ""
},
{
    "landingPageUrl": "Kajal-and-Eyeliner/Maybelline/Maybelline-New-York-Colossal-Bold-Liner---Black/9747207/buy",
    "loyaltyPointsEnabled": false,
    "adId": "",
    "isPLA": false,
    "productId": 9747207,
    "product": "Maybelline New York Colossal Bold Liner - Black",
    "productName": "Maybelline New York Colossal Bold Liner - Black",
    "rating": 4.466673851013184,
    "ratingCount": 9062,
    "isFastFashion": false,
    "futureDiscountedPrice": 0,
    "futureDiscountStartDate": "",
    "discount": 38,
    "brand": "Maybelline",
    "searchImage": "http://assets.myntassets.com/assets/images/9747207/2019/7/22/74ea0159-7270-4916-8780-74d3628192061563800066182-Maybelline-Women-Kajal-and-Eyeliner-271563800065867-1.jpg",
    "effectiveDiscountPercentageAfterTax": 0,
    "effectiveDiscountAmountAfterTax": 0,
    "buyButtonWinnerSkuId": 34418578,
    "buyButtonWinnerSellerPartnerId": 4215,
    "relatedStylesCount": 0,
    "relatedStylesType": "",
    "productVideos": [],
    "inventoryInfo": [
        {
            "skuId": 34418578,
            "label": "Onesize",
            "inventory": 5710,
            "available": true
        }
    ],
    "sizes": "Onesize",
    "images": [
        {
            "view": "default",
            "src": "http://assets.myntassets.com/assets/images/9747207/2019/7/22/74ea0159-7270-4916-8780-74d3628192061563800066182-Maybelline-Women-Kajal-and-Eyeliner-271563800065867-1.jpg"
        },
        {
            "view": "swatchImage",
            "src": "http://assets.myntassets.com/assets/images/9747207/2020/1/16/52ea095b-f6ca-4033-a054-e03fef4c83731579173345932-Maybelline-New-York-Colossal-Bold-Liner-3-ml-761157917334590-9.jpg"
        },
        {
            "view": "search",
            "src": "http://assets.myntassets.com/assets/images/9747207/2019/7/22/74ea0159-7270-4916-8780-74d3628192061563800066182-Maybelline-Women-Kajal-and-Eyeliner-271563800065867-1.jpg"
        },
        {
            "view": "size_representation",
            "src": ""
        },
        {
            "view": "certificate",
            "src": "http://assets.myntassets.com/assets/images/banner2021/6/15/143130d2-bab7-4e7f-a78f-819ebb95566b1623745550591-1.jpg"
        },
        {
            "view": "back",
            "src": "http://assets.myntassets.com/assets/images/9747207/2019/7/22/73d4ec0b-5fa9-4330-a630-a0d38c2e87e11563800066159-Maybelline-Women-Kajal-and-Eyeliner-271563800065867-3.jpg"
        },
        {
            "view": "front",
            "src": "http://assets.myntassets.com/assets/images/9747207/2019/7/22/59fab980-9fac-4991-b654-b4cdeb72023b1563800066169-Maybelline-Women-Kajal-and-Eyeliner-271563800065867-2.jpg"
        }
    ],
    "gender": "Women",
    "primaryColour": "Black",
    "discountLabel": "Flat_Search_Percent",
    "discountDisplayLabel": "(15% OFF)",
    "additionalInfo": "Colossal Bold Liner - Black",
    "category": "Kajal and Eyeliner",
    "mrp": 249,
    "price": 211,
    "advanceOrderTag": "",
    "colorVariantAvailable": false,
    "productimagetag": "",
    "listViews": 0,
    "discountType": "1",
    "tdBxGyText": "",
    "catalogDate": "1563408000000",
    "season": "Summer",
    "year": "2019",
    "isPersonalised": false,
    "eorsPicksTag": "",
    "personalizedCoupon": "",
    "personalizedCouponValue": 0,
    "productMeta": "",
    "systemAttributes": [
        {
            "attribute": "SA_XT_PICWORTHY",
            "value": "PIC-WORTHY"
        },
        {
            "attribute": "SA_XT_BESTSELLER",
            "value": "BESTSELLER"
        }
    ],
    "attributeTagsPriorityList": [],
    "preferredDeliveryTag": ""
},
{
    "landingPageUrl": "Tshirts/HM/HM-Men-Black-Solid-Cotton-T-shirt-Regular-Fit/11468732/buy",
    "loyaltyPointsEnabled": false,
    "adId": "",
    "isPLA": false,
    "productId": 11468732,
    "product": "H\u0026M Men Black Solid Cotton T-shirt Regular Fit",
    "productName": "H\u0026M Men Black Solid Cotton T-shirt Regular Fit",
    "rating": 4.368888854980469,
    "ratingCount": 2025,
    "isFastFashion": true,
    "futureDiscountedPrice": 0,
    "futureDiscountStartDate": "",
    "discount": 60,
    "brand": "H\u0026M",
    "searchImage": "http://assets.myntassets.com/assets/images/11468732/2020/3/24/bece2abc-3045-41a5-a4e2-8caaa2354c331585042911269-HM-Men-Black-Solid-Cotton-T-shirt-Regular-Fit-51515850429100-1.jpg",
    "effectiveDiscountPercentageAfterTax": 0,
    "effectiveDiscountAmountAfterTax": 0,
    "buyButtonWinnerSkuId": 39851098,
    "buyButtonWinnerSellerPartnerId": 6771,
    "relatedStylesCount": 0,
    "relatedStylesType": "",
    "productVideos": [],
    "inventoryInfo": [
        {
            "skuId": 39851098,
            "label": "XS",
            "inventory": 51,
            "available": true
        },
        {
            "skuId": 39851100,
            "label": "S",
            "inventory": 214,
            "available": true
        },
        {
            "skuId": 39851102,
            "label": "M",
            "inventory": 573,
            "available": true
        },
        {
            "skuId": 39851104,
            "label": "L",
            "inventory": 462,
            "available": true
        },
        {
            "skuId": 39851106,
            "label": "XL",
            "inventory": 265,
            "available": true
        },
        {
            "skuId": 39851108,
            "label": "XXL",
            "inventory": 97,
            "available": true
        }
    ],
    "sizes": "XS,S,M,L,XL,XXL",
    "images": [
        {
            "view": "default",
            "src": "http://assets.myntassets.com/assets/images/11468732/2020/3/24/bece2abc-3045-41a5-a4e2-8caaa2354c331585042911269-HM-Men-Black-Solid-Cotton-T-shirt-Regular-Fit-51515850429100-1.jpg"
        },
        {
            "view": "search",
            "src": "http://assets.myntassets.com/assets/images/11468732/2020/3/24/bece2abc-3045-41a5-a4e2-8caaa2354c331585042911269-HM-Men-Black-Solid-Cotton-T-shirt-Regular-Fit-51515850429100-1.jpg"
        },
        {
            "view": "size_representation",
            "src": ""
        },
        {
            "view": "back",
            "src": "http://assets.myntassets.com/assets/images/11468732/2020/3/24/626d7fd8-1b39-41fb-9759-97040869a8f61585042911134-HM-Men-Black-Solid-Cotton-T-shirt-Regular-Fit-51515850429100-3.jpg"
        },
        {
            "view": "right",
            "src": "http://assets.myntassets.com/assets/images/11468732/2020/3/24/1b528dc1-c210-4c23-9e13-459107c5ebf21585042911076-HM-Men-Black-Solid-Cotton-T-shirt-Regular-Fit-51515850429100-4.jpg"
        },
        {
            "view": "front",
            "src": "http://assets.myntassets.com/assets/images/11468732/2020/3/24/6f14a9d0-4dfb-456e-a1b6-594d1a7084b91585042911199-HM-Men-Black-Solid-Cotton-T-shirt-Regular-Fit-51515850429100-2.jpg"
        }
    ],
    "gender": "Men",
    "primaryColour": "Black",
    "discountLabel": "Flat_Search_Percent",
    "discountDisplayLabel": "(15% OFF)",
    "additionalInfo": "Men Cotton T-shirt Regular Fit",
    "category": "Tshirts",
    "mrp": 399,
    "price": 339,
    "advanceOrderTag": "",
    "colorVariantAvailable": false,
    "productimagetag": "",
    "listViews": 0,
    "discountType": "1",
    "tdBxGyText": "",
    "catalogDate": "1580947200000",
    "season": "Winter",
    "year": "2020",
    "isPersonalised": false,
    "eorsPicksTag": "",
    "personalizedCoupon": "",
    "personalizedCouponValue": 0,
    "productMeta": "",
    "systemAttributes": [
        {
            "attribute": "Custom_Label2",
            "value": "SA_FD_Label2"
        },
        {
            "attribute": "SA_XT_PICWORTHY",
            "value": "PIC-WORTHY"
        }
    ],
    "attributeTagsPriorityList": [],
    "preferredDeliveryTag": ""
},
{
    "landingPageUrl": "Hair-Appliance/VEGA/VEGA-VHSCC-01-3-in-1-Hair-Styler---Black--Gold-Toned/5911028/buy",
    "loyaltyPointsEnabled": false,
    "adId": "",
    "isPLA": false,
    "productId": 5911028,
    "product": "VEGA VHSCC-01 3-in-1 Hair Styler - Black \u0026 Gold-Toned",
    "productName": "VEGA VHSCC-01 3-in-1 Hair Styler - Black \u0026 Gold-Toned",
    "rating": 4.186136245727539,
    "ratingCount": 1558,
    "isFastFashion": false,
    "futureDiscountedPrice": 0,
    "futureDiscountStartDate": "",
    "discount": 270,
    "brand": "VEGA",
    "searchImage": "http://assets.myntassets.com/assets/images/5911028/2021/5/18/7e993189-251d-475d-93ee-0374e0adc17f1621330217531-VEGA-VHSCC-01-3-in-1-Hair-Styler---Black--Gold-Toned-6291621-1.jpg",
    "effectiveDiscountPercentageAfterTax": 0,
    "effectiveDiscountAmountAfterTax": 0,
    "buyButtonWinnerSkuId": 27958745,
    "buyButtonWinnerSellerPartnerId": 4024,
    "relatedStylesCount": 0,
    "relatedStylesType": "",
    "productVideos": [],
    "inventoryInfo": [
        {
            "skuId": 27958745,
            "label": "Onesize",
            "inventory": 1167,
            "available": true
        }
    ],
    "sizes": "Onesize",
    "images": [
        {
            "view": "default",
            "src": "http://assets.myntassets.com/assets/images/5911028/2021/5/18/7e993189-251d-475d-93ee-0374e0adc17f1621330217531-VEGA-VHSCC-01-3-in-1-Hair-Styler---Black--Gold-Toned-6291621-1.jpg"
        },
        {
            "view": "front",
            "src": "http://assets.myntassets.com/assets/images/5911028/2021/5/18/ef23eeb2-dda6-4eba-ae0f-7d3954d05da11621330217508-VEGA-VHSCC-01-3-in-1-Hair-Styler---Black--Gold-Toned-6291621-2.jpg"
        },
        {
            "view": "image11",
            "src": "http://assets.myntassets.com/assets/images/5911028/2021/5/18/cd4f77d6-3f13-46ea-9929-2e2b2caff3df1621330217364-VEGA-VHSCC-01-3-in-1-Hair-Styler---Black--Gold-Toned-6291621-11.jpg"
        },
        {
            "view": "search",
            "src": "http://assets.myntassets.com/assets/images/5911028/2021/5/18/7e993189-251d-475d-93ee-0374e0adc17f1621330217531-VEGA-VHSCC-01-3-in-1-Hair-Styler---Black--Gold-Toned-6291621-1.jpg"
        },
        {
            "view": "left",
            "src": "http://assets.myntassets.com/assets/images/5911028/2021/5/18/b202d4e0-ae6e-4e9e-bf2c-a9b297455a631621330217440-VEGA-VHSCC-01-3-in-1-Hair-Styler---Black--Gold-Toned-6291621-5.jpg"
        },
        {
            "view": "bottom",
            "src": "http://assets.myntassets.com/assets/images/5911028/2021/5/18/25906be3-359d-41bf-a826-c2328f9385bf1621330217387-VEGA-VHSCC-01-3-in-1-Hair-Styler---Black--Gold-Toned-6291621-7.jpg"
        },
        {
            "view": "back",
            "src": "http://assets.myntassets.com/assets/images/5911028/2021/5/18/dcdc97c4-9c16-4c2b-bba6-ca3dd64c7fe21621330217485-VEGA-VHSCC-01-3-in-1-Hair-Styler---Black--Gold-Toned-6291621-3.jpg"
        },
        {
            "view": "image12",
            "src": "http://assets.myntassets.com/assets/images/5911028/2021/5/18/e44ccd8a-1374-4cf1-9d4c-db932bee987a1621330217336-VEGA-VHSCC-01-3-in-1-Hair-Styler---Black--Gold-Toned-6291621-12.jpg"
        },
        {
            "view": "top",
            "src": "http://assets.myntassets.com/assets/images/5911028/2021/5/18/0991e079-e438-4f1a-90d3-10bf80b4ac5f1621330217411-VEGA-VHSCC-01-3-in-1-Hair-Styler---Black--Gold-Toned-6291621-6.jpg"
        },
        {
            "view": "size_representation",
            "src": ""
        },
        {
            "view": "right",
            "src": "http://assets.myntassets.com/assets/images/5911028/2021/5/18/342fd5ab-e3bb-4d3f-96ac-43800984fadb1621330217462-VEGA-VHSCC-01-3-in-1-Hair-Styler---Black--Gold-Toned-6291621-4.jpg"
        }
    ],
    "gender": "Women",
    "primaryColour": "Black",
    "discountLabel": "Flat_Search_Percent",
    "discountDisplayLabel": "(15% OFF)",
    "additionalInfo": "VHSCC-01 3-in-1 Hair Styler",
    "category": "Hair Appliance",
    "mrp": 1799,
    "price": 1529,
    "advanceOrderTag": "",
    "colorVariantAvailable": false,
    "productimagetag": "",
    "listViews": 0,
    "discountType": "1",
    "tdBxGyText": "",
    "catalogDate": "1538611200000",
    "season": "Summer",
    "year": "2019",
    "isPersonalised": false,
    "eorsPicksTag": "",
    "personalizedCoupon": "",
    "personalizedCouponValue": 0,
    "productMeta": "",
    "systemAttributes": [
        {
            "attribute": "SA_XT_BESTSELLER",
            "value": "BESTSELLER"
        },
        {
            "attribute": "SA_XT_PICWORTHY",
            "value": "PIC-WORTHY"
        }
    ],
    "attributeTagsPriorityList": [],
    "preferredDeliveryTag": ""
},
{
    "landingPageUrl": "Sports-Shoes/Puma/Puma-Men-Black--Red-IGNITE-Dual-NM-Running-Shoes/6815971/buy",
    "loyaltyPointsEnabled": false,
    "adId": "",
    "isPLA": false,
    "productId": 6815971,
    "product": "Puma Men Black \u0026 Red IGNITE Dual NM Running Shoes",
    "productName": "Puma Men Black \u0026 Red IGNITE Dual NM Running Shoes",
    "rating": 4.61904764175415,
    "ratingCount": 42,
    "isFastFashion": false,
    "futureDiscountedPrice": 0,
    "futureDiscountStartDate": "",
    "discount": 3500,
    "brand": "Puma",
    "searchImage": "http://assets.myntassets.com/assets/images/6815971/2020/5/21/1a046a0b-c266-4ca6-85d7-c24b0becb1291590079993549PumaMenBlackRedIGNITEDualNMRunningShoes1.jpg",
    "effectiveDiscountPercentageAfterTax": 0,
    "effectiveDiscountAmountAfterTax": 0,
    "buyButtonWinnerSkuId": 30626918,
    "buyButtonWinnerSellerPartnerId": 6206,
    "relatedStylesCount": 0,
    "relatedStylesType": "",
    "productVideos": [],
    "inventoryInfo": [
        {
            "skuId": 30626913,
            "label": "UK6",
            "inventory": 64,
            "available": true
        },
        {
            "skuId": 30626914,
            "label": "UK7",
            "inventory": 132,
            "available": true
        },
        {
            "skuId": 30626915,
            "label": "UK8",
            "inventory": 212,
            "available": true
        },
        {
            "skuId": 30626916,
            "label": "UK9",
            "inventory": 202,
            "available": true
        },
        {
            "skuId": 30626917,
            "label": "UK10",
            "inventory": 139,
            "available": true
        },
        {
            "skuId": 30626918,
            "label": "UK11",
            "inventory": 53,
            "available": true
        }
    ],
    "sizes": "6,7,8,9,10,11",
    "images": [
        {
            "view": "default",
            "src": "http://assets.myntassets.com/assets/images/6815971/2020/5/21/1a046a0b-c266-4ca6-85d7-c24b0becb1291590079993549PumaMenBlackRedIGNITEDualNMRunningShoes1.jpg"
        },
        {
            "view": "size_representation",
            "src": ""
        },
        {
            "view": "back",
            "src": "http://assets.myntassets.com/assets/images/6815971/2020/5/21/f92afc57-aeae-4d2c-9635-de5a58d1d50d1590079993662PumaMenBlackRedIGNITEDualNMRunningShoes3.jpg"
        },
        {
            "view": "right",
            "src": "http://assets.myntassets.com/assets/images/6815971/2020/5/21/591b4321-d0b3-448f-acd0-c0be007500451590079993708PumaMenBlackRedIGNITEDualNMRunningShoes4.jpg"
        },
        {
            "view": "front",
            "src": "http://assets.myntassets.com/assets/images/6815971/2020/5/21/9a39ccd4-dcee-4e8f-b8ef-47f1c0f71fce1590079993619PumaMenBlackRedIGNITEDualNMRunningShoes2.jpg"
        },
        {
            "view": "search",
            "src": "http://assets.myntassets.com/assets/images/6815971/2020/5/21/1a046a0b-c266-4ca6-85d7-c24b0becb1291590079993549PumaMenBlackRedIGNITEDualNMRunningShoes1.jpg"
        },
        {
            "view": "top",
            "src": "http://assets.myntassets.com/assets/images/6815971/2020/5/21/766eae88-41df-48d4-ba33-839561fbf2cf1590079993799PumaMenBlackRedIGNITEDualNMRunningShoes6.jpg"
        },
        {
            "view": "left",
            "src": "http://assets.myntassets.com/assets/images/6815971/2020/5/21/3414ed1a-33d6-437a-895c-08efd2e3156d1590079993751PumaMenBlackRedIGNITEDualNMRunningShoes5.jpg"
        }
    ],
    "gender": "Men",
    "primaryColour": "Black",
    "discountLabel": "Flat_Search_Percent",
    "discountDisplayLabel": "(50% OFF)",
    "additionalInfo": "Men IGNITE Dual Running Shoes",
    "category": "Sports Shoes",
    "mrp": 6999,
    "price": 3499,
    "advanceOrderTag": "",
    "colorVariantAvailable": false,
    "productimagetag": "",
    "listViews": 0,
    "discountType": "1",
    "tdBxGyText": "",
    "catalogDate": "1530144000000",
    "season": "Summer",
    "year": "2020",
    "isPersonalised": false,
    "eorsPicksTag": "",
    "personalizedCoupon": "",
    "personalizedCouponValue": 0,
    "productMeta": "",
    "systemAttributes": [],
    "attributeTagsPriorityList": [],
    "preferredDeliveryTag": ""
},
{
    "landingPageUrl": "Smart-Watches/Realme/Realme-Unisex-Black-SpO2-M-Monitor-and-Large-Color-Touch-Screen-Watch-RMA161/13089672/buy",
    "loyaltyPointsEnabled": false,
    "adId": "",
    "isPLA": false,
    "productId": 13089672,
    "product": "Realme Unisex Black SpO2 M Monitor and Large Color Touch Screen Watch RMA161",
    "productName": "Realme Unisex Black SpO2 M Monitor and Large Color Touch Screen Watch RMA161",
    "rating": 4.246242046356201,
    "ratingCount": 1397,
    "isFastFashion": false,
    "futureDiscountedPrice": 0,
    "futureDiscountStartDate": "",
    "discount": 3500,
    "brand": "Realme",
    "searchImage": "http://assets.myntassets.com/assets/images/13089672/2021/1/20/52c98624-390f-4aec-b3b2-9a8b81ad431f1611133634601-Realme-Unisex-Black-SpO2-Monitor-and-Large-Color-Touch-Scree-7.jpg",
    "effectiveDiscountPercentageAfterTax": 0,
    "effectiveDiscountAmountAfterTax": 0,
    "buyButtonWinnerSkuId": 45386071,
    "buyButtonWinnerSellerPartnerId": 4036,
    "relatedStylesCount": 0,
    "relatedStylesType": "",
    "productVideos": [],
    "inventoryInfo": [
        {
            "skuId": 45386071,
            "label": "Onesize",
            "inventory": 5,
            "available": true
        }
    ],
    "sizes": "Onesize",
    "images": [
        {
            "view": "default",
            "src": "http://assets.myntassets.com/assets/images/13089672/2021/1/20/52c98624-390f-4aec-b3b2-9a8b81ad431f1611133634601-Realme-Unisex-Black-SpO2-Monitor-and-Large-Color-Touch-Scree-7.jpg"
        },
        {
            "view": "bottom",
            "src": "http://assets.myntassets.com/assets/images/13089672/2020/12/15/6dc622c2-6af1-4994-8487-807a1b37cd641608034238336-Realme-Unisex-Black-SpO2-Monitor-and-Large-Color-Touch-Scree-1.jpg"
        },
        {
            "view": "size_representation",
            "src": ""
        },
        {
            "view": "back",
            "src": "http://assets.myntassets.com/assets/images/13089672/2020/12/15/94c0c8f1-abf2-43d2-95e7-5493c28d3d101608034238242-Realme-Unisex-Black-SpO2-Monitor-and-Large-Color-Touch-Scree-3.jpg"
        },
        {
            "view": "front",
            "src": "http://assets.myntassets.com/assets/images/13089672/2020/12/15/7b55bd9f-dee0-4298-aeba-98e1a22a68851608034238283-Realme-Unisex-Black-SpO2-Monitor-and-Large-Color-Touch-Scree-2.jpg"
        },
        {
            "view": "right",
            "src": "http://assets.myntassets.com/assets/images/13089672/2020/12/15/28c51091-6bd1-4e52-a860-489cb5b578411608034238192-Realme-Unisex-Black-SpO2-Monitor-and-Large-Color-Touch-Scree-4.jpg"
        },
        {
            "view": "search",
            "src": "http://assets.myntassets.com/assets/images/13089672/2021/1/20/52c98624-390f-4aec-b3b2-9a8b81ad431f1611133634601-Realme-Unisex-Black-SpO2-Monitor-and-Large-Color-Touch-Scree-7.jpg"
        }
    ],
    "gender": "Unisex",
    "primaryColour": "Black",
    "discountLabel": "Flat_Search_Amount",
    "discountDisplayLabel": "(Rs. 3500 OFF)",
    "additionalInfo": "Large Color Touch Screen Watch",
    "category": "Smart Watches",
    "mrp": 6999,
    "price": 3499,
    "advanceOrderTag": "",
    "colorVariantAvailable": false,
    "productimagetag": "",
    "listViews": 0,
    "discountType": "1",
    "tdBxGyText": "",
    "catalogDate": "1606953600000",
    "season": "Fall",
    "year": "2020",
    "isPersonalised": false,
    "eorsPicksTag": "",
    "personalizedCoupon": "",
    "personalizedCouponValue": 0,
    "productMeta": "",
    "systemAttributes": [
        {
            "attribute": "SA_XT_BESTSELLER",
            "value": "BESTSELLER"
        },
        {
            "attribute": "SA_XT_Best_Price",
            "value": "Price may go up"
        },
        {
            "attribute": "SA_XT_PICWORTHY",
            "value": "PIC-WORTHY"
        },
        {
            "attribute": "SA_XT_OOS",
            "value": "1 Days"
        }
    ],
    "attributeTagsPriorityList": [],
    "preferredDeliveryTag": ""
},
{
    "landingPageUrl": "Shirts/WROGN/WROGN-Men-Black--Grey-Slim-Fit-Checked-Casual-Shirt/11361636/buy",
    "loyaltyPointsEnabled": false,
    "adId": "",
    "isPLA": false,
    "productId": 11361636,
    "product": "WROGN Men Black \u0026 Grey Slim Fit Checked Casual Shirt",
    "productName": "WROGN Men Black \u0026 Grey Slim Fit Checked Casual Shirt",
    "rating": 4.3980584144592285,
    "ratingCount": 206,
    "isFastFashion": true,
    "futureDiscountedPrice": 0,
    "futureDiscountStartDate": "",
    "discount": 1080,
    "brand": "WROGN",
    "searchImage": "http://assets.myntassets.com/assets/images/11361636/2020/2/14/d3cc5d08-9855-44c4-80c0-197ae8d6dda41581676488065-WROGN-Men-Shirts-5401581676486712-1.jpg",
    "effectiveDiscountPercentageAfterTax": 0,
    "effectiveDiscountAmountAfterTax": 0,
    "buyButtonWinnerSkuId": 39396120,
    "buyButtonWinnerSellerPartnerId": 4214,
    "relatedStylesCount": 0,
    "relatedStylesType": "",
    "productVideos": [],
    "inventoryInfo": [
        {
            "skuId": 39396120,
            "label": "39",
            "inventory": 352,
            "available": true
        },
        {
            "skuId": 39396122,
            "label": "40",
            "inventory": 491,
            "available": true
        },
        {
            "skuId": 39396124,
            "label": "42",
            "inventory": 231,
            "available": true
        },
        {
            "skuId": 39396126,
            "label": "44",
            "inventory": 45,
            "available": true
        },
        {
            "skuId": 39396128,
            "label": "46",
            "inventory": 90,
            "available": true
        }
    ],
    "sizes": "39,40,42,44,46",
    "images": [
        {
            "view": "default",
            "src": "http://assets.myntassets.com/assets/images/11361636/2020/2/14/d3cc5d08-9855-44c4-80c0-197ae8d6dda41581676488065-WROGN-Men-Shirts-5401581676486712-1.jpg"
        },
        {
            "view": "right",
            "src": "http://assets.myntassets.com/assets/images/11361636/2020/2/14/2f81b3c9-3cdc-4da0-9413-c190533a5a3a1581676487956-WROGN-Men-Shirts-5401581676486712-4.jpg"
        },
        {
            "view": "front",
            "src": "http://assets.myntassets.com/assets/images/11361636/2020/2/14/fb7b6e80-a359-4771-8bf3-525d369378f21581676488032-WROGN-Men-Shirts-5401581676486712-2.jpg"
        },
        {
            "view": "search",
            "src": "http://assets.myntassets.com/assets/images/11361636/2020/2/14/d3cc5d08-9855-44c4-80c0-197ae8d6dda41581676488065-WROGN-Men-Shirts-5401581676486712-1.jpg"
        },
        {
            "view": "top",
            "src": "http://assets.myntassets.com/assets/images/11361636/2020/2/14/af37eff2-b08f-4083-a190-cede0de945951581676487872-WROGN-Men-Shirts-5401581676486712-6.jpg"
        },
        {
            "view": "left",
            "src": "http://assets.myntassets.com/assets/images/11361636/2020/2/14/b3052c98-b002-4a55-a428-3afd62c96bbc1581676487911-WROGN-Men-Shirts-5401581676486712-5.jpg"
        },
        {
            "view": "size_representation",
            "src": ""
        },
        {
            "view": "back",
            "src": "http://assets.myntassets.com/assets/images/11361636/2020/2/14/86355731-efcf-4610-97b0-a0d28addce2b1581676487995-WROGN-Men-Shirts-5401581676486712-3.jpg"
        }
    ],
    "gender": "Men",
    "primaryColour": "Black",
    "discountLabel": "Flat_Search_Percent",
    "discountDisplayLabel": "(45% OFF)",
    "additionalInfo": "Men Slim Fit Casual Shirt",
    "category": "Shirts",
    "mrp": 2399,
    "price": 1319,
    "advanceOrderTag": "",
    "colorVariantAvailable": false,
    "productimagetag": "",
    "listViews": 0,
    "discountType": "1",
    "tdBxGyText": "",
    "catalogDate": "1581552000000",
    "season": "Spring",
    "year": "2020",
    "isPersonalised": false,
    "eorsPicksTag": "",
    "personalizedCoupon": "",
    "personalizedCouponValue": 0,
    "productMeta": "",
    "systemAttributes": [
        {
            "attribute": "SA_XT_Best_Price",
            "value": "Price may go up"
        }
    ],
    "attributeTagsPriorityList": [],
    "preferredDeliveryTag": ""
},
{
    "landingPageUrl": "Tshirts/HRX-by-Hrithik-Roshan/HRX-by-Hrithik-Roshan-Men-Black-Advanced-Rapid-Dry-Raglan-Polo-Collar-T-shirt/2314374/buy",
    "loyaltyPointsEnabled": false,
    "adId": "",
    "isPLA": false,
    "productId": 2314374,
    "product": "HRX by Hrithik Roshan Men Black Advanced Rapid Dry Raglan Polo Collar T-shirt",
    "productName": "HRX by Hrithik Roshan Men Black Advanced Rapid Dry Raglan Polo Collar T-shirt",
    "rating": 3.9248366355895996,
    "ratingCount": 1836,
    "isFastFashion": true,
    "futureDiscountedPrice": 0,
    "futureDiscountStartDate": "",
    "discount": 520,
    "brand": "HRX by Hrithik Roshan",
    "searchImage": "http://assets.myntassets.com/assets/images/2314374/2018/5/24/9a8448fe-0e67-4ffb-822a-6d5ba77f1c621527137356669-HRX-by-Hrithik-Roshan-Men-Black-Advanced-Rapid-Dry-Raglan-Polo-Collar-T-shirt-3321527137356492-1.jpg",
    "effectiveDiscountPercentageAfterTax": 0,
    "effectiveDiscountAmountAfterTax": 0,
    "buyButtonWinnerSkuId": 14975589,
    "buyButtonWinnerSellerPartnerId": 4027,
    "relatedStylesCount": 0,
    "relatedStylesType": "",
    "productVideos": [],
    "inventoryInfo": [
        {
            "skuId": 14975586,
            "label": "S",
            "inventory": 155,
            "available": true
        },
        {
            "skuId": 14975587,
            "label": "M",
            "inventory": 200,
            "available": true
        },
        {
            "skuId": 14975588,
            "label": "L",
            "inventory": 133,
            "available": true
        },
        {
            "skuId": 14975589,
            "label": "XL",
            "inventory": 94,
            "available": true
        },
        {
            "skuId": 32926657,
            "label": "XXL",
            "inventory": 0,
            "available": false
        }
    ],
    "sizes": "S,M,L,XL",
    "images": [
        {
            "view": "default",
            "src": "http://assets.myntassets.com/assets/images/2314374/2018/5/24/9a8448fe-0e67-4ffb-822a-6d5ba77f1c621527137356669-HRX-by-Hrithik-Roshan-Men-Black-Advanced-Rapid-Dry-Raglan-Polo-Collar-T-shirt-3321527137356492-1.jpg"
        },
        {
            "view": "search",
            "src": "http://assets.myntassets.com/assets/images/2314374/2018/5/24/9a8448fe-0e67-4ffb-822a-6d5ba77f1c621527137356669-HRX-by-Hrithik-Roshan-Men-Black-Advanced-Rapid-Dry-Raglan-Polo-Collar-T-shirt-3321527137356492-1.jpg"
        },
        {
            "view": "top",
            "src": "http://assets.myntassets.com/assets/images/2314374/2018/5/24/20b16c0b-9ae6-4a99-b7e4-c2e69b789bfa1527137356584-HRX-by-Hrithik-Roshan-Men-Black-Advanced-Rapid-Dry-Raglan-Polo-Collar-T-shirt-3321527137356492-6.jpg"
        },
        {
            "view": "left",
            "src": "http://assets.myntassets.com/assets/images/2314374/2018/5/24/ed3b8d76-f9bd-4be8-bf8c-53ec7ed7037d1527137356600-HRX-by-Hrithik-Roshan-Men-Black-Advanced-Rapid-Dry-Raglan-Polo-Collar-T-shirt-3321527137356492-5.jpg"
        },
        {
            "view": "size_representation",
            "src": ""
        },
        {
            "view": "back",
            "src": "http://assets.myntassets.com/assets/images/2314374/2018/5/24/35471002-505f-425a-adb5-cbd52055bc811527137356638-HRX-by-Hrithik-Roshan-Men-Black-Advanced-Rapid-Dry-Raglan-Polo-Collar-T-shirt-3321527137356492-3.jpg"
        },
        {
            "view": "front",
            "src": "http://assets.myntassets.com/assets/images/2314374/2018/5/24/9227b5df-b7f6-4511-be5e-057d8a37b0dc1527137356653-HRX-by-Hrithik-Roshan-Men-Black-Advanced-Rapid-Dry-Raglan-Polo-Collar-T-shirt-3321527137356492-2.jpg"
        },
        {
            "view": "right",
            "src": "http://assets.myntassets.com/assets/images/2314374/2018/5/24/409c330b-f294-4deb-a669-ddac4ba7d2841527137356616-HRX-by-Hrithik-Roshan-Men-Black-Advanced-Rapid-Dry-Raglan-Polo-Collar-T-shirt-3321527137356492-4.jpg"
        }
    ],
    "gender": "Men",
    "primaryColour": "Black",
    "discountLabel": "Flat_Search_Percent",
    "discountDisplayLabel": "(40% OFF)",
    "additionalInfo": "Rapid Dry Raglan Polo T-shirt",
    "category": "Tshirts",
    "mrp": 1299,
    "price": 779,
    "advanceOrderTag": "",
    "colorVariantAvailable": false,
    "productimagetag": "",
    "listViews": 0,
    "discountType": "1",
    "tdBxGyText": "",
    "catalogDate": "1524700800000",
    "season": "Summer",
    "year": "2019",
    "isPersonalised": false,
    "eorsPicksTag": "",
    "personalizedCoupon": "",
    "personalizedCouponValue": 0,
    "productMeta": "",
    "systemAttributes": [
        {
            "attribute": "Custom_Label2",
            "value": "SA_FD_Label2"
        },
        {
            "attribute": "SA_XT_PICWORTHY",
            "value": "PIC-WORTHY"
        }
    ],
    "attributeTagsPriorityList": [],
    "preferredDeliveryTag": ""
},
{
    "landingPageUrl": "Watches/Mast--Harbour/Mast--Harbour-Men-Black-Analogue-Watch-MFB-PN-LW3211/2211670/buy",
    "loyaltyPointsEnabled": false,
    "adId": "",
    "isPLA": false,
    "productId": 2211670,
    "product": "Mast \u0026 Harbour Men Black Analogue Watch MFB-PN-LW3211",
    "productName": "Mast \u0026 Harbour Men Black Analogue Watch MFB-PN-LW3211",
    "rating": 3.702868938446045,
    "ratingCount": 976,
    "isFastFashion": false,
    "futureDiscountedPrice": 0,
    "futureDiscountStartDate": "",
    "discount": 2340,
    "brand": "Mast \u0026 Harbour",
    "searchImage": "http://assets.myntassets.com/assets/images/2211670/2018/4/13/11523594365636-Mast--Harbour-Men-Black-Analogue-Watch-MFB-PN-LW3211-9181523594365375-1.jpg",
    "effectiveDiscountPercentageAfterTax": 0,
    "effectiveDiscountAmountAfterTax": 0,
    "buyButtonWinnerSkuId": 14581974,
    "buyButtonWinnerSellerPartnerId": 4028,
    "relatedStylesCount": 0,
    "relatedStylesType": "",
    "productVideos": [],
    "inventoryInfo": [
        {
            "skuId": 14581974,
            "label": "Onesize",
            "inventory": 31,
            "available": true
        }
    ],
    "sizes": "Onesize",
    "images": [
        {
            "view": "default",
            "src": "http://assets.myntassets.com/assets/images/2211670/2018/4/13/11523594365636-Mast--Harbour-Men-Black-Analogue-Watch-MFB-PN-LW3211-9181523594365375-1.jpg"
        },
        {
            "view": "back",
            "src": "http://assets.myntassets.com/assets/images/2211670/2018/4/13/11523594365594-Mast--Harbour-Men-Black-Analogue-Watch-MFB-PN-LW3211-9181523594365375-3.jpg"
        },
        {
            "view": "right",
            "src": "http://assets.myntassets.com/assets/images/2211670/2018/4/13/11523594365574-Mast--Harbour-Men-Black-Analogue-Watch-MFB-PN-LW3211-9181523594365375-4.jpg"
        },
        {
            "view": "front",
            "src": "http://assets.myntassets.com/assets/images/2211670/2018/4/13/11523594365610-Mast--Harbour-Men-Black-Analogue-Watch-MFB-PN-LW3211-9181523594365375-2.jpg"
        },
        {
            "view": "search",
            "src": "http://assets.myntassets.com/assets/images/2211670/2018/4/13/11523594365636-Mast--Harbour-Men-Black-Analogue-Watch-MFB-PN-LW3211-9181523594365375-1.jpg"
        },
        {
            "view": "top",
            "src": "http://assets.myntassets.com/assets/images/2211670/2018/4/13/11523594365518-Mast--Harbour-Men-Black-Analogue-Watch-MFB-PN-LW3211-9181523594365375-6.jpg"
        },
        {
            "view": "left",
            "src": "http://assets.myntassets.com/assets/images/2211670/2018/4/13/11523594365552-Mast--Harbour-Men-Black-Analogue-Watch-MFB-PN-LW3211-9181523594365375-5.jpg"
        },
        {
            "view": "size_representation",
            "src": ""
        }
    ],
    "gender": "Men",
    "primaryColour": "Black",
    "discountLabel": "Flat_Search_Percent",
    "discountDisplayLabel": "(65% OFF)",
    "additionalInfo": "Men Analogue Watch",
    "category": "Watches",
    "mrp": 3599,
    "price": 1259,
    "advanceOrderTag": "",
    "colorVariantAvailable": false,
    "productimagetag": "",
    "listViews": 0,
    "discountType": "1",
    "tdBxGyText": "",
    "catalogDate": "1518048000000",
    "season": "Fall",
    "year": "2017",
    "isPersonalised": false,
    "eorsPicksTag": "",
    "personalizedCoupon": "",
    "personalizedCouponValue": 0,
    "productMeta": "",
    "systemAttributes": [
        {
            "attribute": "SA_XT_PICWORTHY",
            "value": "PIC-WORTHY"
        },
        {
            "attribute": "SA_XT_BESTSELLER",
            "value": "BESTSELLER"
        },
        {
            "attribute": "SA_XT_OOS",
            "value": "5 Days"
        }
    ],
    "attributeTagsPriorityList": [],
    "preferredDeliveryTag": ""
},
{
    "landingPageUrl": "Kajal-and-Eyeliner/Maybelline/Maybelline-New-York-The-Colossal-Liner---Black/620420/buy",
    "loyaltyPointsEnabled": false,
    "adId": "",
    "isPLA": false,
    "productId": 620420,
    "product": "Maybelline New York The Colossal Liner - Black",
    "productName": "Maybelline New York The Colossal Liner - Black",
    "rating": 4.2805962562561035,
    "ratingCount": 14822,
    "isFastFashion": false,
    "futureDiscountedPrice": 0,
    "futureDiscountStartDate": "",
    "discount": 105,
    "brand": "Maybelline",
    "searchImage": "http://assets.myntassets.com/assets/images/620420/2018/7/31/25e69cc6-65ea-4fca-8a85-2e84d82a356f1533035141364-Maybelline-The-Colossal-Black-Eyeliner-21533035141314-1.jpg",
    "effectiveDiscountPercentageAfterTax": 0,
    "effectiveDiscountAmountAfterTax": 0,
    "buyButtonWinnerSkuId": 3418158,
    "buyButtonWinnerSellerPartnerId": 4215,
    "relatedStylesCount": 2,
    "relatedStylesType": "Shades",
    "productVideos": [],
    "inventoryInfo": [
        {
            "skuId": 3418158,
            "label": "Onesize",
            "inventory": 12224,
            "available": true
        }
    ],
    "sizes": "Onesize",
    "images": [
        {
            "view": "default",
            "src": "http://assets.myntassets.com/assets/images/620420/2018/7/31/25e69cc6-65ea-4fca-8a85-2e84d82a356f1533035141364-Maybelline-The-Colossal-Black-Eyeliner-21533035141314-1.jpg"
        },
        {
            "view": "right",
            "src": "http://assets.myntassets.com/assets/images/620420/2018/10/23/7e5a266d-4f5d-442c-a29a-eb10158c53221540284474493-Maybelline-New-York-The-Colossal-Liner-12g-9311540284474466-4.jpg"
        },
        {
            "view": "swatchImage",
            "src": "http://assets.myntassets.com/assets/images/620420/2018/9/11/4f2024c6-748f-4ef5-9f49-1c561f8ad8b61536658345072-Maybelline-New-York-The-Colossal-Liner-12g-4541536658345042-9.jpg"
        },
        {
            "view": "search",
            "src": "http://assets.myntassets.com/assets/images/620420/2018/7/31/25e69cc6-65ea-4fca-8a85-2e84d82a356f1533035141364-Maybelline-The-Colossal-Black-Eyeliner-21533035141314-1.jpg"
        },
        {
            "view": "size_representation",
            "src": ""
        },
        {
            "view": "certificate",
            "src": "http://assets.myntassets.com/assets/images/banner2021/6/15/143130d2-bab7-4e7f-a78f-819ebb95566b1623745550591-1.jpg"
        },
        {
            "view": "back",
            "src": "http://assets.myntassets.com/assets/images/620420/2018/10/23/f5338d46-a4ce-4a4d-ba5f-2d7b4d2c2c671540284474507-Maybelline-New-York-The-Colossal-Liner-12g-9311540284474466-3.jpg"
        },
        {
            "view": "front",
            "src": "http://assets.myntassets.com/assets/images/620420/2018/7/31/7db5f4d0-c599-45de-8526-f8523736f8a51533035141347-Maybelline-The-Colossal-Black-Eyeliner-21533035141314-2.jpg"
        }
    ],
    "gender": "Women",
    "primaryColour": "Black",
    "discountLabel": "Flat_Search_Percent",
    "discountDisplayLabel": "(25% OFF)",
    "additionalInfo": "The Colossal Liner - Black",
    "category": "Kajal and Eyeliner",
    "mrp": 420,
    "price": 315,
    "advanceOrderTag": "",
    "colorVariantAvailable": false,
    "productimagetag": "",
    "listViews": 0,
    "discountType": "1",
    "tdBxGyText": "",
    "catalogDate": "1421884800000",
    "season": "Summer",
    "year": "2019",
    "isPersonalised": false,
    "eorsPicksTag": "",
    "personalizedCoupon": "",
    "personalizedCouponValue": 0,
    "productMeta": "",
    "systemAttributes": [
        {
            "attribute": "Virtual-try-on",
            "value": "Youcam"
        },
        {
            "attribute": "SA_XT_PICWORTHY",
            "value": "PIC-WORTHY"
        },
        {
            "attribute": "SA_XT_BESTSELLER",
            "value": "BESTSELLER"
        }
    ],
    "attributeTagsPriorityList": [],
    "preferredDeliveryTag": ""
},
{
    "landingPageUrl": "Casual-Shoes/Puma/Puma-Men-Black-Sneakers/11335336/buy",
    "loyaltyPointsEnabled": false,
    "adId": "",
    "isPLA": false,
    "productId": 11335336,
    "product": "Puma Men Black Sneakers",
    "productName": "Puma Men Black Sneakers",
    "rating": 4.200934410095215,
    "ratingCount": 642,
    "isFastFashion": true,
    "futureDiscountedPrice": 0,
    "futureDiscountStartDate": "",
    "discount": 1925,
    "brand": "Puma",
    "searchImage": "http://assets.myntassets.com/assets/images/11335336/2020/5/21/18cb03c3-7943-420b-9529-b20977c849461590079988014PumaMenBlackSneakers1.jpg",
    "effectiveDiscountPercentageAfterTax": 0,
    "effectiveDiscountAmountAfterTax": 0,
    "buyButtonWinnerSkuId": 39280988,
    "buyButtonWinnerSellerPartnerId": 6206,
    "relatedStylesCount": 0,
    "relatedStylesType": "",
    "productVideos": [],
    "inventoryInfo": [
        {
            "skuId": 39280986,
            "label": "UK6",
            "inventory": 778,
            "available": true
        },
        {
            "skuId": 39280988,
            "label": "UK7",
            "inventory": 1380,
            "available": true
        },
        {
            "skuId": 39280990,
            "label": "UK8",
            "inventory": 2109,
            "available": true
        },
        {
            "skuId": 39280992,
            "label": "UK9",
            "inventory": 2224,
            "available": true
        },
        {
            "skuId": 39280994,
            "label": "UK10",
            "inventory": 672,
            "available": true
        },
        {
            "skuId": 39280996,
            "label": "UK11",
            "inventory": 372,
            "available": true
        }
    ],
    "sizes": "6,7,8,9,10,11",
    "images": [
        {
            "view": "default",
            "src": "http://assets.myntassets.com/assets/images/11335336/2020/5/21/18cb03c3-7943-420b-9529-b20977c849461590079988014PumaMenBlackSneakers1.jpg"
        },
        {
            "view": "front",
            "src": "http://assets.myntassets.com/assets/images/11335336/2020/5/21/dc540b39-5bf2-4129-a83c-34e8f46d2c8b1590079988083PumaMenBlackSneakers2.jpg"
        },
        {
            "view": "image11",
            "src": "http://assets.myntassets.com/assets/images/11335336/2020/11/27/06576565-374a-47be-8f05-e1a6095e28e41606461454563-Puma-Men-Black-Sneakers-6411606461454159-11.jpg"
        },
        {
            "view": "top",
            "src": "http://assets.myntassets.com/assets/images/11335336/2020/5/21/6dd3a977-965c-48b3-9675-f2c8174b36311590079988258PumaMenBlackSneakers6.jpg"
        },
        {
            "view": "left",
            "src": "http://assets.myntassets.com/assets/images/11335336/2020/5/21/90704f25-7a08-4aab-a0f7-bebba6b975fd1590079988212PumaMenBlackSneakers5.jpg"
        },
        {
            "view": "size_representation",
            "src": ""
        },
        {
            "view": "back",
            "src": "http://assets.myntassets.com/assets/images/11335336/2020/5/21/a2616592-e75a-48c5-b781-29bc801b4c751590079988125PumaMenBlackSneakers3.jpg"
        },
        {
            "view": "search",
            "src": "http://assets.myntassets.com/assets/images/11335336/2020/5/21/18cb03c3-7943-420b-9529-b20977c849461590079988014PumaMenBlackSneakers1.jpg"
        },
        {
            "view": "right",
            "src": "http://assets.myntassets.com/assets/images/11335336/2020/5/21/61ae185b-cd47-4d23-8e7c-efdf4bdea34c1590079988167PumaMenBlackSneakers4.jpg"
        }
    ],
    "gender": "Men",
    "primaryColour": "Black",
    "discountLabel": "Flat_Search_Percent",
    "discountDisplayLabel": "(55% OFF)",
    "additionalInfo": "Sneakers",
    "category": "Casual Shoes",
    "mrp": 3499,
    "price": 1574,
    "advanceOrderTag": "",
    "colorVariantAvailable": true,
    "productimagetag": "",
    "listViews": 0,
    "discountType": "1",
    "tdBxGyText": "",
    "catalogDate": "1583366400000",
    "season": "Summer",
    "year": "2020",
    "isPersonalised": false,
    "eorsPicksTag": "",
    "personalizedCoupon": "",
    "personalizedCouponValue": 0,
    "productMeta": "",
    "systemAttributes": [
        {
            "attribute": "SA_XT_BESTSELLER",
            "value": "BESTSELLER"
        },
        {
            "attribute": "SA_XT_PICWORTHY",
            "value": "PIC-WORTHY"
        }
    ],
    "attributeTagsPriorityList": [],
    "preferredDeliveryTag": ""
},
{
    "landingPageUrl": "Tops/Carlton-London/Carlton-London-Women-Black-Solid-Victorian-Crop-Fitted-Top/11679908/buy",
    "loyaltyPointsEnabled": false,
    "adId": "",
    "isPLA": false,
    "productId": 11679908,
    "product": "Carlton London Women Black Solid Victorian Crop Fitted Top",
    "productName": "Carlton London Women Black Solid Victorian Crop Fitted Top",
    "rating": 4.344491958618164,
    "ratingCount": 4212,
    "isFastFashion": true,
    "futureDiscountedPrice": 0,
    "futureDiscountStartDate": "",
    "discount": 695,
    "brand": "Carlton London",
    "searchImage": "http://assets.myntassets.com/assets/images/11679908/2020/5/25/8046704c-bff4-45bc-bf0f-5d438724b7b81590424372490CottinfabWomensBrownPleatedTrouserTopsCarltonLondonWomenTops1.jpg",
    "effectiveDiscountPercentageAfterTax": 0,
    "effectiveDiscountAmountAfterTax": 0,
    "buyButtonWinnerSkuId": 40607272,
    "buyButtonWinnerSellerPartnerId": 3030,
    "relatedStylesCount": 0,
    "relatedStylesType": "",
    "productVideos": [],
    "inventoryInfo": [
        {
            "skuId": 40607268,
            "label": "XS",
            "inventory": 234,
            "available": true
        },
        {
            "skuId": 40607270,
            "label": "S",
            "inventory": 185,
            "available": true
        },
        {
            "skuId": 40607272,
            "label": "M",
            "inventory": 215,
            "available": true
        },
        {
            "skuId": 40607274,
            "label": "L",
            "inventory": 1104,
            "available": true
        },
        {
            "skuId": 40607276,
            "label": "XL",
            "inventory": 1137,
            "available": true
        }
    ],
    "sizes": "XS,S,M,L,XL",
    "images": [
        {
            "view": "default",
            "src": "http://assets.myntassets.com/assets/images/11679908/2020/5/25/8046704c-bff4-45bc-bf0f-5d438724b7b81590424372490CottinfabWomensBrownPleatedTrouserTopsCarltonLondonWomenTops1.jpg"
        },
        {
            "view": "front",
            "src": "http://assets.myntassets.com/assets/images/11679908/2020/5/25/be681ee4-0662-4421-a157-31d95587ed161590424372547CottinfabWomensBrownPleatedTrouserTopsCarltonLondonWomenTops2.jpg"
        },
        {
            "view": "right",
            "src": "http://assets.myntassets.com/assets/images/11679908/2020/5/25/a39a4d2b-c2d2-45dd-a548-e1e296ec9e4e1590424372668CottinfabWomensBrownPleatedTrouserTopsCarltonLondonWomenTops4.jpg"
        },
        {
            "view": "search",
            "src": "http://assets.myntassets.com/assets/images/11679908/2020/5/25/8046704c-bff4-45bc-bf0f-5d438724b7b81590424372490CottinfabWomensBrownPleatedTrouserTopsCarltonLondonWomenTops1.jpg"
        },
        {
            "view": "left",
            "src": "http://assets.myntassets.com/assets/images/11679908/2020/5/25/08416810-8325-4599-ba0e-28dea56701661590424372735CottinfabWomensBrownPleatedTrouserTopsCarltonLondonWomenTops5.jpg"
        },
        {
            "view": "size_representation",
            "src": ""
        },
        {
            "view": "back",
            "src": "http://assets.myntassets.com/assets/images/11679908/2020/5/25/0e2f660e-572e-443b-8765-c1375c70d2071590424372610CottinfabWomensBrownPleatedTrouserTopsCarltonLondonWomenTops3.jpg"
        }
    ],
    "gender": "Women",
    "primaryColour": "Black",
    "discountLabel": "Flat_Search_Percent",
    "discountDisplayLabel": "(50% OFF)",
    "additionalInfo": "Victorian Crop Fitted Top",
    "category": "Tops",
    "mrp": 1390,
    "price": 695,
    "advanceOrderTag": "",
    "colorVariantAvailable": false,
    "productimagetag": "",
    "listViews": 0,
    "discountType": "1",
    "tdBxGyText": "",
    "catalogDate": "1590019200000",
    "season": "Summer",
    "year": "2020",
    "isPersonalised": false,
    "eorsPicksTag": "",
    "personalizedCoupon": "",
    "personalizedCouponValue": 0,
    "productMeta": "",
    "systemAttributes": [
        {
            "attribute": "SA_XT_BESTSELLER",
            "value": "BESTSELLER"
        },
        {
            "attribute": "SA_XT_PICWORTHY",
            "value": "PIC-WORTHY"
        }
    ],
    "attributeTagsPriorityList": [],
    "preferredDeliveryTag": ""
},
{
    "landingPageUrl": "Backpacks/HM/HM-Women-Black-Textured-Backpack/11309920/buy",
    "loyaltyPointsEnabled": false,
    "adId": "",
    "isPLA": false,
    "productId": 11309920,
    "product": "H\u0026M Women Black Textured Backpack",
    "productName": "H\u0026M Women Black Textured Backpack",
    "rating": 4.215686321258545,
    "ratingCount": 204,
    "isFastFashion": false,
    "futureDiscountedPrice": 0,
    "futureDiscountStartDate": "",
    "discount": 0,
    "brand": "H\u0026M",
    "searchImage": "http://assets.myntassets.com/assets/images/productimage/2020/1/11/947f2b5e-ea9a-405c-95d9-3e6d4f2a47511578695298299-1.jpg",
    "effectiveDiscountPercentageAfterTax": 0,
    "effectiveDiscountAmountAfterTax": 0,
    "buyButtonWinnerSkuId": 39178888,
    "buyButtonWinnerSellerPartnerId": 6771,
    "relatedStylesCount": 0,
    "relatedStylesType": "",
    "productVideos": [],
    "inventoryInfo": [
        {
            "skuId": 39178888,
            "label": "Onesize",
            "inventory": 5,
            "available": true
        }
    ],
    "sizes": "Onesize",
    "images": [
        {
            "view": "default",
            "src": "http://assets.myntassets.com/assets/images/productimage/2020/1/11/947f2b5e-ea9a-405c-95d9-3e6d4f2a47511578695298299-1.jpg"
        },
        {
            "view": "search",
            "src": "http://assets.myntassets.com/assets/images/productimage/2020/1/11/947f2b5e-ea9a-405c-95d9-3e6d4f2a47511578695298299-1.jpg"
        },
        {
            "view": "size_representation",
            "src": ""
        },
        {
            "view": "front",
            "src": "http://assets.myntassets.com/assets/images/productimage/2020/1/11/5c893c1b-2cbf-43b9-9aa9-57dd761950191578695298435-2.jpg"
        }
    ],
    "gender": "Women",
    "primaryColour": "Black",
    "discountLabel": "",
    "discountDisplayLabel": "",
    "additionalInfo": "Women Backpack",
    "category": "Backpacks",
    "mrp": 1499,
    "price": 1499,
    "advanceOrderTag": "",
    "colorVariantAvailable": false,
    "productimagetag": "",
    "listViews": 0,
    "discountType": "",
    "tdBxGyText": "",
    "catalogDate": "1578528000000",
    "season": "Summer",
    "year": "2021",
    "isPersonalised": false,
    "eorsPicksTag": "",
    "personalizedCoupon": "",
    "personalizedCouponValue": 0,
    "productMeta": "",
    "systemAttributes": [],
    "attributeTagsPriorityList": [],
    "preferredDeliveryTag": ""
},
{
    "landingPageUrl": "Flip-Flops/AfroJack/AfroJack-Men-Black-Sliders/14714720/buy",
    "loyaltyPointsEnabled": false,
    "adId": "",
    "isPLA": false,
    "productId": 14714720,
    "product": "AfroJack Men Black Sliders",
    "productName": "AfroJack Men Black Sliders",
    "rating": 0,
    "ratingCount": 0,
    "isFastFashion": false,
    "futureDiscountedPrice": 0,
    "futureDiscountStartDate": "",
    "discount": 1165,
    "brand": "AfroJack",
    "searchImage": "http://assets.myntassets.com/assets/images/productimage/2021/7/1/9a93433f-debe-48a7-aa96-c47d293a3c981625153822348-1.jpg",
    "effectiveDiscountPercentageAfterTax": 0,
    "effectiveDiscountAmountAfterTax": 0,
    "buyButtonWinnerSkuId": 48782758,
    "buyButtonWinnerSellerPartnerId": 3643,
    "relatedStylesCount": 0,
    "relatedStylesType": "",
    "productVideos": [],
    "inventoryInfo": [
        {
            "skuId": 48782758,
            "label": "UK7",
            "inventory": 163,
            "available": true
        },
        {
            "skuId": 48782759,
            "label": "UK8",
            "inventory": 171,
            "available": true
        },
        {
            "skuId": 48782760,
            "label": "UK9",
            "inventory": 178,
            "available": true
        },
        {
            "skuId": 48782761,
            "label": "UK10",
            "inventory": 180,
            "available": true
        }
    ],
    "sizes": "7,8,9,10",
    "images": [
        {
            "view": "default",
            "src": "http://assets.myntassets.com/assets/images/productimage/2021/7/1/9a93433f-debe-48a7-aa96-c47d293a3c981625153822348-1.jpg"
        },
        {
            "view": "search",
            "src": "http://assets.myntassets.com/assets/images/productimage/2021/7/1/9a93433f-debe-48a7-aa96-c47d293a3c981625153822348-1.jpg"
        },
        {
            "view": "left",
            "src": "http://assets.myntassets.com/assets/images/productimage/2021/7/1/8975a298-32d6-45e2-8283-36ac0c7d53241625153822376-5.jpg"
        },
        {
            "view": "size_representation",
            "src": ""
        },
        {
            "view": "back",
            "src": "http://assets.myntassets.com/assets/images/productimage/2021/7/1/04465c56-6635-4746-90af-a8bf659455f21625153822361-3.jpg"
        },
        {
            "view": "right",
            "src": "http://assets.myntassets.com/assets/images/productimage/2021/7/1/6921c2f3-e0a9-4b11-80a4-cb555fa24d991625153822369-4.jpg"
        },
        {
            "view": "front",
            "src": "http://assets.myntassets.com/assets/images/productimage/2021/7/1/f2899f60-5f03-405a-a0d3-23935acef1621625153822355-2.jpg"
        }
    ],
    "gender": "Men",
    "primaryColour": "Black",
    "discountLabel": "Flat_Search_Percent",
    "discountDisplayLabel": "(70% OFF)",
    "additionalInfo": "Men Sliders",
    "category": "Flip Flops",
    "mrp": 1663,
    "price": 498,
    "advanceOrderTag": "",
    "colorVariantAvailable": false,
    "productimagetag": "",
    "listViews": 0,
    "discountType": "1",
    "tdBxGyText": "",
    "catalogDate": "1625097600000",
    "season": "Summer",
    "year": "2021",
    "isPersonalised": false,
    "eorsPicksTag": "",
    "personalizedCoupon": "",
    "personalizedCouponValue": 0,
    "productMeta": "",
    "systemAttributes": [
        {
            "attribute": "SA_XT_Best_Price",
            "value": "Price may go up"
        }
    ],
    "attributeTagsPriorityList": [],
    "preferredDeliveryTag": ""
},
{
    "landingPageUrl": "Kurtas/AHIKA/AHIKA-Women-Black--Pink-Printed-Straight-Kurta/10808324/buy",
    "loyaltyPointsEnabled": false,
    "adId": "",
    "isPLA": false,
    "productId": 10808324,
    "product": "AHIKA Women Black \u0026 Pink Printed Straight Kurta",
    "productName": "AHIKA Women Black \u0026 Pink Printed Straight Kurta",
    "rating": 3.677818536758423,
    "ratingCount": 2182,
    "isFastFashion": true,
    "futureDiscountedPrice": 0,
    "futureDiscountStartDate": "",
    "discount": 379,
    "brand": "AHIKA",
    "searchImage": "http://assets.myntassets.com/assets/images/10808324/2019/10/31/4452bfa4-151d-4a0f-8d80-523a2bb076811572503364525-AHIKA-Women-Kurtas-4521572503363288-1.jpg",
    "effectiveDiscountPercentageAfterTax": 0,
    "effectiveDiscountAmountAfterTax": 0,
    "buyButtonWinnerSkuId": 46086725,
    "buyButtonWinnerSellerPartnerId": 11564,
    "relatedStylesCount": 0,
    "relatedStylesType": "",
    "productVideos": [],
    "inventoryInfo": [
        {
            "skuId": 46086725,
            "label": "XS",
            "inventory": 318,
            "available": true
        },
        {
            "skuId": 37134980,
            "label": "S",
            "inventory": 311,
            "available": true
        },
        {
            "skuId": 37134988,
            "label": "M",
            "inventory": 179,
            "available": true
        },
        {
            "skuId": 37134990,
            "label": "L",
            "inventory": 260,
            "available": true
        },
        {
            "skuId": 37134992,
            "label": "XL",
            "inventory": 252,
            "available": true
        },
        {
            "skuId": 37134994,
            "label": "XXL",
            "inventory": 329,
            "available": true
        },
        {
            "skuId": 37134996,
            "label": "3XL",
            "inventory": 412,
            "available": true
        },
        {
            "skuId": 37134998,
            "label": "4XL",
            "inventory": 449,
            "available": true
        }
    ],
    "sizes": "XS,S,M,L,XL,XXL,3XL,4XL",
    "images": [
        {
            "view": "default",
            "src": "http://assets.myntassets.com/assets/images/10808324/2019/10/31/4452bfa4-151d-4a0f-8d80-523a2bb076811572503364525-AHIKA-Women-Kurtas-4521572503363288-1.jpg"
        },
        {
            "view": "search",
            "src": "http://assets.myntassets.com/assets/images/10808324/2019/10/31/4452bfa4-151d-4a0f-8d80-523a2bb076811572503364525-AHIKA-Women-Kurtas-4521572503363288-1.jpg"
        },
        {
            "view": "left",
            "src": "http://assets.myntassets.com/assets/images/10808324/2019/10/31/1e778883-0ecb-4a79-bb70-213667bbf8e61572503364285-AHIKA-Women-Kurtas-4521572503363288-5.jpg"
        },
        {
            "view": "size_representation",
            "src": ""
        },
        {
            "view": "back",
            "src": "http://assets.myntassets.com/assets/images/10808324/2019/10/31/5d27e886-cbc1-4374-aad2-86ac6f035a771572503364391-AHIKA-Women-Kurtas-4521572503363288-3.jpg"
        },
        {
            "view": "right",
            "src": "http://assets.myntassets.com/assets/images/10808324/2019/10/31/9b3ccf85-e6fc-4b9c-8016-a2ac015b6af61572503364339-AHIKA-Women-Kurtas-4521572503363288-4.jpg"
        },
        {
            "view": "front",
            "src": "http://assets.myntassets.com/assets/images/10808324/2019/10/31/a8c84f97-7656-4cda-b4b6-80dd46d63c391572503364443-AHIKA-Women-Kurtas-4521572503363288-2.jpg"
        }
    ],
    "gender": "Women",
    "primaryColour": "Black",
    "discountLabel": "Flat_Search_Percent",
    "discountDisplayLabel": "(44% OFF)",
    "additionalInfo": "Printed Straight Kurta",
    "category": "Kurtas",
    "mrp": 860,
    "price": 481,
    "advanceOrderTag": "",
    "colorVariantAvailable": false,
    "productimagetag": "",
    "listViews": 0,
    "discountType": "1",
    "tdBxGyText": "",
    "catalogDate": "1572480000000",
    "season": "Fall",
    "year": "2019",
    "isPersonalised": false,
    "eorsPicksTag": "",
    "personalizedCoupon": "",
    "personalizedCouponValue": 0,
    "productMeta": "",
    "systemAttributes": [
        {
            "attribute": "SA_XT_PICWORTHY",
            "value": "PIC-WORTHY"
        },
        {
            "attribute": "SA_XT_BESTSELLER",
            "value": "BESTSELLER"
        }
    ],
    "attributeTagsPriorityList": [],
    "preferredDeliveryTag": ""
},
{
    "landingPageUrl": "Heels/Catwalk/Catwalk-Women-Black-Printed-Wedges/7331538/buy",
    "loyaltyPointsEnabled": false,
    "adId": "",
    "isPLA": false,
    "productId": 7331538,
    "product": "Catwalk Women Black Printed Wedges",
    "productName": "Catwalk Women Black Printed Wedges",
    "rating": 4.412068843841553,
    "ratingCount": 580,
    "isFastFashion": true,
    "futureDiscountedPrice": 0,
    "futureDiscountStartDate": "",
    "discount": 898,
    "brand": "Catwalk",
    "searchImage": "http://assets.myntassets.com/assets/images/7331538/2018/9/28/7f88bc44-1365-4d3f-b14b-e470f87054581538114103109-Catwalk-Women-Heels-9871538114102346-1.jpg",
    "effectiveDiscountPercentageAfterTax": 0,
    "effectiveDiscountAmountAfterTax": 0,
    "buyButtonWinnerSkuId": 31640916,
    "buyButtonWinnerSellerPartnerId": 4118,
    "relatedStylesCount": 0,
    "relatedStylesType": "",
    "productVideos": [],
    "inventoryInfo": [
        {
            "skuId": 31640916,
            "label": "EURO36",
            "inventory": 85,
            "available": true
        },
        {
            "skuId": 31640917,
            "label": "EURO37",
            "inventory": 387,
            "available": true
        },
        {
            "skuId": 31640918,
            "label": "EURO38",
            "inventory": 322,
            "available": true
        },
        {
            "skuId": 31640919,
            "label": "EURO39",
            "inventory": 489,
            "available": true
        },
        {
            "skuId": 31640920,
            "label": "EURO40",
            "inventory": 484,
            "available": true
        },
        {
            "skuId": 31640921,
            "label": "EURO41",
            "inventory": 450,
            "available": true
        }
    ],
    "sizes": "36,37,38,39,40,41",
    "images": [
        {
            "view": "default",
            "src": "http://assets.myntassets.com/assets/images/7331538/2018/9/28/7f88bc44-1365-4d3f-b14b-e470f87054581538114103109-Catwalk-Women-Heels-9871538114102346-1.jpg"
        },
        {
            "view": "search",
            "src": "http://assets.myntassets.com/assets/images/7331538/2018/9/28/7f88bc44-1365-4d3f-b14b-e470f87054581538114103109-Catwalk-Women-Heels-9871538114102346-1.jpg"
        },
        {
            "view": "left",
            "src": "http://assets.myntassets.com/assets/images/7331538/2018/9/28/e1986e33-9530-4f5c-b979-570544ba9c111538114103056-Catwalk-Women-Heels-9871538114102346-5.jpg"
        },
        {
            "view": "size_representation",
            "src": ""
        },
        {
            "view": "back",
            "src": "http://assets.myntassets.com/assets/images/7331538/2018/9/28/415dda4e-42ae-4838-8206-90a46443a7791538114103082-Catwalk-Women-Heels-9871538114102346-3.jpg"
        },
        {
            "view": "right",
            "src": "http://assets.myntassets.com/assets/images/7331538/2018/9/28/9e5f91c3-d9f9-4270-a3a8-ecdfebe3c3411538114103067-Catwalk-Women-Heels-9871538114102346-4.jpg"
        },
        {
            "view": "front",
            "src": "http://assets.myntassets.com/assets/images/7331538/2018/9/28/c31b5afa-4b75-4df2-9134-47b0c311076d1538114103095-Catwalk-Women-Heels-9871538114102346-2.jpg"
        }
    ],
    "gender": "Women",
    "primaryColour": "Black",
    "discountLabel": "Flat_Search_Percent",
    "discountDisplayLabel": "(45% OFF)",
    "additionalInfo": "Women Wedges",
    "category": "Heels",
    "mrp": 1995,
    "price": 1097,
    "advanceOrderTag": "",
    "colorVariantAvailable": false,
    "productimagetag": "",
    "listViews": 0,
    "discountType": "1",
    "tdBxGyText": "",
    "catalogDate": "1538006400000",
    "season": "Summer",
    "year": "2021",
    "isPersonalised": false,
    "eorsPicksTag": "",
    "personalizedCoupon": "",
    "personalizedCouponValue": 0,
    "productMeta": "",
    "systemAttributes": [
        {
            "attribute": "MP_High_Depth_Intent",
            "value": "High_Depth_Intent"
        },
        {
            "attribute": "MP_High_Depth",
            "value": "High_Depth"
        },
        {
            "attribute": "SA_XT_BESTSELLER",
            "value": "BESTSELLER"
        }
    ],
    "attributeTagsPriorityList": [],
    "preferredDeliveryTag": ""
},
{
    "landingPageUrl": "Watches/WROGN/WROGN-Men-Black-Analogue-Watch-WRG00041B/13036772/buy",
    "loyaltyPointsEnabled": false,
    "adId": "",
    "isPLA": false,
    "productId": 13036772,
    "product": "WROGN Men Black Analogue Watch WRG00041B",
    "productName": "WROGN Men Black Analogue Watch WRG00041B",
    "rating": 4.424489974975586,
    "ratingCount": 245,
    "isFastFashion": false,
    "futureDiscountedPrice": 0,
    "futureDiscountStartDate": "",
    "discount": 1920,
    "brand": "WROGN",
    "searchImage": "http://assets.myntassets.com/assets/images/13036772/2021/1/6/27516bb1-d40a-470f-a548-d7104bf8f9531609905962112-WROGN-Men-Black-Analogue-Watch-WRG00041B-9221609905961133-1.jpg",
    "effectiveDiscountPercentageAfterTax": 0,
    "effectiveDiscountAmountAfterTax": 0,
    "buyButtonWinnerSkuId": 45301146,
    "buyButtonWinnerSellerPartnerId": 4214,
    "relatedStylesCount": 0,
    "relatedStylesType": "",
    "productVideos": [],
    "inventoryInfo": [
        {
            "skuId": 45301146,
            "label": "Onesize",
            "inventory": 354,
            "available": true
        }
    ],
    "sizes": "Onesize",
    "images": [
        {
            "view": "default",
            "src": "http://assets.myntassets.com/assets/images/13036772/2021/1/6/27516bb1-d40a-470f-a548-d7104bf8f9531609905962112-WROGN-Men-Black-Analogue-Watch-WRG00041B-9221609905961133-1.jpg"
        },
        {
            "view": "search",
            "src": "http://assets.myntassets.com/assets/images/13036772/2021/1/6/27516bb1-d40a-470f-a548-d7104bf8f9531609905962112-WROGN-Men-Black-Analogue-Watch-WRG00041B-9221609905961133-1.jpg"
        },
        {
            "view": "size_representation",
            "src": ""
        },
        {
            "view": "top",
            "src": "http://assets.myntassets.com/assets/images/13036772/2021/1/6/21a49699-021e-456c-a10c-2f183d6cec6c1609905961919-WROGN-Men-Black-Analogue-Watch-WRG00041B-9221609905961133-6.jpg"
        },
        {
            "view": "left",
            "src": "http://assets.myntassets.com/assets/images/13036772/2021/1/6/84d090ed-9a30-49a5-84ad-45d70edcc0821609905961957-WROGN-Men-Black-Analogue-Watch-WRG00041B-9221609905961133-5.jpg"
        },
        {
            "view": "bottom",
            "src": "http://assets.myntassets.com/assets/images/13036772/2021/1/6/194a240b-8c1a-40a0-aac0-6e17747bf3c71609905961872-WROGN-Men-Black-Analogue-Watch-WRG00041B-9221609905961133-7.jpg"
        },
        {
            "view": "back",
            "src": "http://assets.myntassets.com/assets/images/13036772/2021/1/6/99586065-dee8-4175-824c-fd73eb72da031609905962034-WROGN-Men-Black-Analogue-Watch-WRG00041B-9221609905961133-3.jpg"
        },
        {
            "view": "front",
            "src": "http://assets.myntassets.com/assets/images/13036772/2021/1/6/b4e2d26a-aa71-4ade-99b2-07d68fbb806d1609905962072-WROGN-Men-Black-Analogue-Watch-WRG00041B-9221609905961133-2.jpg"
        },
        {
            "view": "right",
            "src": "http://assets.myntassets.com/assets/images/13036772/2021/1/6/59cf575e-f94c-4106-9d27-51658093901e1609905961995-WROGN-Men-Black-Analogue-Watch-WRG00041B-9221609905961133-4.jpg"
        }
    ],
    "gender": "Men",
    "primaryColour": "Black",
    "discountLabel": "Flat_Search_Percent",
    "discountDisplayLabel": "(60% OFF)",
    "additionalInfo": "Men Analogue Watch",
    "category": "Watches",
    "mrp": 3199,
    "price": 1279,
    "advanceOrderTag": "",
    "colorVariantAvailable": false,
    "productimagetag": "",
    "listViews": 0,
    "discountType": "1",
    "tdBxGyText": "",
    "catalogDate": "1607558400000",
    "season": "Winter",
    "year": "2020",
    "isPersonalised": false,
    "eorsPicksTag": "",
    "personalizedCoupon": "",
    "personalizedCouponValue": 0,
    "productMeta": "",
    "systemAttributes": [
        {
            "attribute": "SA_XT_BESTSELLER",
            "value": "BESTSELLER"
        }
    ],
    "attributeTagsPriorityList": [],
    "preferredDeliveryTag": ""
},
{
    "landingPageUrl": "Sports-Shoes/Nike/Nike-Men-Black--Red-ZOOM-SPAN-3-Running-Shoes/13762708/buy",
    "loyaltyPointsEnabled": false,
    "adId": "",
    "isPLA": false,
    "productId": 13762708,
    "product": "Nike Men Black \u0026 Red ZOOM SPAN 3 Running Shoes",
    "productName": "Nike Men Black \u0026 Red ZOOM SPAN 3 Running Shoes",
    "rating": 5,
    "ratingCount": 6,
    "isFastFashion": false,
    "futureDiscountedPrice": 0,
    "futureDiscountStartDate": "",
    "discount": 1799,
    "brand": "Nike",
    "searchImage": "http://assets.myntassets.com/assets/images/13762708/2021/4/6/25430483-33b9-4a48-af4e-b5b66292ff671617712825114-Nike-Men-Black--Red-ZOOM-SPAN-3-Running-Shoes-36816177128237-1.jpg",
    "effectiveDiscountPercentageAfterTax": 0,
    "effectiveDiscountAmountAfterTax": 0,
    "buyButtonWinnerSkuId": 46629616,
    "buyButtonWinnerSellerPartnerId": 4024,
    "relatedStylesCount": 0,
    "relatedStylesType": "",
    "productVideos": [],
    "inventoryInfo": [
        {
            "skuId": 46629616,
            "label": "UK6",
            "inventory": 7,
            "available": true
        },
        {
            "skuId": 46629617,
            "label": "UK7",
            "inventory": 18,
            "available": true
        },
        {
            "skuId": 46629618,
            "label": "UK8",
            "inventory": 49,
            "available": true
        },
        {
            "skuId": 46629619,
            "label": "UK9",
            "inventory": 46,
            "available": true
        },
        {
            "skuId": 46629620,
            "label": "UK10",
            "inventory": 17,
            "available": true
        },
        {
            "skuId": 46629621,
            "label": "UK11",
            "inventory": 0,
            "available": false
        }
    ],
    "sizes": "6,7,8,9,10",
    "images": [
        {
            "view": "default",
            "src": "http://assets.myntassets.com/assets/images/13762708/2021/4/6/25430483-33b9-4a48-af4e-b5b66292ff671617712825114-Nike-Men-Black--Red-ZOOM-SPAN-3-Running-Shoes-36816177128237-1.jpg"
        },
        {
            "view": "search",
            "src": "http://assets.myntassets.com/assets/images/13762708/2021/4/6/25430483-33b9-4a48-af4e-b5b66292ff671617712825114-Nike-Men-Black--Red-ZOOM-SPAN-3-Running-Shoes-36816177128237-1.jpg"
        },
        {
            "view": "left",
            "src": "http://assets.myntassets.com/assets/images/13762708/2021/4/6/462e613e-3752-4491-b49e-c2f5ae88e2841617712825022-Nike-Men-Black--Red-ZOOM-SPAN-3-Running-Shoes-36816177128237-5.jpg"
        },
        {
            "view": "size_representation",
            "src": ""
        },
        {
            "view": "back",
            "src": "http://assets.myntassets.com/assets/images/13762708/2021/4/6/5b86f594-3c78-4089-9d9a-4954739036a91617712825060-Nike-Men-Black--Red-ZOOM-SPAN-3-Running-Shoes-36816177128237-3.jpg"
        },
        {
            "view": "right",
            "src": "http://assets.myntassets.com/assets/images/13762708/2021/4/6/9ad87c4b-415c-4418-9c86-cae471a7c2901617712825039-Nike-Men-Black--Red-ZOOM-SPAN-3-Running-Shoes-36816177128237-4.jpg"
        },
        {
            "view": "front",
            "src": "http://assets.myntassets.com/assets/images/13762708/2021/4/6/f5aaead1-6829-4cf1-8a91-cefe915f4fbb1617712825084-Nike-Men-Black--Red-ZOOM-SPAN-3-Running-Shoes-36816177128237-2.jpg"
        }
    ],
    "gender": "Men",
    "primaryColour": "Black",
    "discountLabel": "Flat_Search_Percent",
    "discountDisplayLabel": "(25% OFF)",
    "additionalInfo": "Men ZOOM SPAN 3 Running Shoes",
    "category": "Sports Shoes",
    "mrp": 7195,
    "price": 5396,
    "advanceOrderTag": "",
    "colorVariantAvailable": false,
    "productimagetag": "",
    "listViews": 0,
    "discountType": "1",
    "tdBxGyText": "",
    "catalogDate": "1616630400000",
    "season": "Summer",
    "year": "2021",
    "isPersonalised": false,
    "eorsPicksTag": "",
    "personalizedCoupon": "",
    "personalizedCouponValue": 0,
    "productMeta": "",
    "systemAttributes": [
        {
            "attribute": "SA_XT_PICWORTHY",
            "value": "PIC-WORTHY"
        }
    ],
    "attributeTagsPriorityList": [],
    "preferredDeliveryTag": ""
},
{
    "landingPageUrl": "Jeans/Roadster/Roadster-Women-Black-Skinny-Fit-Mid-Rise-Clean-Look-Stretchable-Cropped-Jeans/2168025/buy",
    "loyaltyPointsEnabled": false,
    "adId": "",
    "isPLA": false,
    "productId": 2168025,
    "product": "Roadster Women Black Skinny Fit Mid-Rise Clean Look Stretchable Cropped Jeans",
    "productName": "Roadster Women Black Skinny Fit Mid-Rise Clean Look Stretchable Cropped Jeans",
    "rating": 3.7729403972625732,
    "ratingCount": 1493,
    "isFastFashion": true,
    "futureDiscountedPrice": 0,
    "futureDiscountStartDate": "",
    "discount": 855,
    "brand": "Roadster",
    "searchImage": "http://assets.myntassets.com/assets/images/2168025/2019/5/6/10ab1eb5-01b6-4982-91ee-cc1101d37ef31557148230280-Roadster-Women-Black-Skinny-Fit-Mid-Rise-Clean-Look-Stretcha-1.jpg",
    "effectiveDiscountPercentageAfterTax": 0,
    "effectiveDiscountAmountAfterTax": 0,
    "buyButtonWinnerSkuId": 14418264,
    "buyButtonWinnerSellerPartnerId": 4118,
    "relatedStylesCount": 0,
    "relatedStylesType": "",
    "productVideos": [],
    "inventoryInfo": [
        {
            "skuId": 14418264,
            "label": "26",
            "inventory": 38,
            "available": true
        },
        {
            "skuId": 14418265,
            "label": "28",
            "inventory": 117,
            "available": true
        },
        {
            "skuId": 14418266,
            "label": "30",
            "inventory": 90,
            "available": true
        },
        {
            "skuId": 14418267,
            "label": "32",
            "inventory": 106,
            "available": true
        },
        {
            "skuId": 14418268,
            "label": "34",
            "inventory": 38,
            "available": true
        },
        {
            "skuId": 14418269,
            "label": "36",
            "inventory": 31,
            "available": true
        }
    ],
    "sizes": "26,28,30,32,34,36",
    "images": [
        {
            "view": "default",
            "src": "http://assets.myntassets.com/assets/images/2168025/2019/5/6/10ab1eb5-01b6-4982-91ee-cc1101d37ef31557148230280-Roadster-Women-Black-Skinny-Fit-Mid-Rise-Clean-Look-Stretcha-1.jpg"
        },
        {
            "view": "top",
            "src": "http://assets.myntassets.com/assets/images/2168025/2019/5/6/9812025f-02cc-4b37-9aaf-10ccc07d163c1557148230188-Roadster-Women-Black-Skinny-Fit-Mid-Rise-Clean-Look-Stretcha-6.jpg"
        },
        {
            "view": "bottom",
            "src": "http://assets.myntassets.com/assets/images/2168025/2019/5/6/8948e577-1d71-4189-b6b3-931746702a021557148230170-Roadster-Women-Black-Skinny-Fit-Mid-Rise-Clean-Look-Stretcha-7.jpg"
        },
        {
            "view": "size_representation",
            "src": ""
        },
        {
            "view": "front",
            "src": "http://assets.myntassets.com/assets/images/2168025/2019/5/6/b9625c77-8728-4f9e-99bb-11ec3f092d371557148230263-Roadster-Women-Black-Skinny-Fit-Mid-Rise-Clean-Look-Stretcha-2.jpg"
        },
        {
            "view": "search",
            "src": "http://assets.myntassets.com/assets/images/2168025/2019/5/6/10ab1eb5-01b6-4982-91ee-cc1101d37ef31557148230280-Roadster-Women-Black-Skinny-Fit-Mid-Rise-Clean-Look-Stretcha-1.jpg"
        },
        {
            "view": "left",
            "src": "http://assets.myntassets.com/assets/images/2168025/2019/5/6/7b15964d-cb34-4d21-9534-7f00a7d95a651557148230208-Roadster-Women-Black-Skinny-Fit-Mid-Rise-Clean-Look-Stretcha-5.jpg"
        },
        {
            "view": "back",
            "src": "http://assets.myntassets.com/assets/images/2168025/2019/5/6/10822338-10aa-4f85-8f74-dd646ec3fed31557148230247-Roadster-Women-Black-Skinny-Fit-Mid-Rise-Clean-Look-Stretcha-3.jpg"
        },
        {
            "view": "right",
            "src": "http://assets.myntassets.com/assets/images/2168025/2019/5/6/e076adf9-db97-4581-995c-97cd09c552721557148230230-Roadster-Women-Black-Skinny-Fit-Mid-Rise-Clean-Look-Stretcha-4.jpg"
        }
    ],
    "gender": "Women",
    "primaryColour": "Black",
    "discountLabel": "Flat_Search_Percent",
    "discountDisplayLabel": "(45% OFF)",
    "additionalInfo": "Women Skinny Fit Cropped Jeans",
    "category": "Jeans",
    "mrp": 1899,
    "price": 1044,
    "advanceOrderTag": "",
    "colorVariantAvailable": false,
    "productimagetag": "",
    "listViews": 0,
    "discountType": "1",
    "tdBxGyText": "",
    "catalogDate": "1518652800000",
    "season": "Summer",
    "year": "2021",
    "isPersonalised": false,
    "eorsPicksTag": "",
    "personalizedCoupon": "",
    "personalizedCouponValue": 0,
    "productMeta": "",
    "systemAttributes": [
        {
            "attribute": "SA_XT_PICWORTHY",
            "value": "PIC-WORTHY"
        },
        {
            "attribute": "SA_XT_BESTSELLER",
            "value": "BESTSELLER"
        }
    ],
    "attributeTagsPriorityList": [],
    "preferredDeliveryTag": ""
},
{
    "landingPageUrl": "Kurtas/Anubhutee/Anubhutee-Women-Black--Orange-Printed-Straight-Kurta/10848096/buy",
    "loyaltyPointsEnabled": false,
    "adId": "",
    "isPLA": false,
    "productId": 10848096,
    "product": "Anubhutee Women Black \u0026 Orange Printed Straight Kurta",
    "productName": "Anubhutee Women Black \u0026 Orange Printed Straight Kurta",
    "rating": 4.253076076507568,
    "ratingCount": 4145,
    "isFastFashion": true,
    "futureDiscountedPrice": 0,
    "futureDiscountStartDate": "",
    "discount": 798,
    "brand": "Anubhutee",
    "searchImage": "http://assets.myntassets.com/assets/images/10848096/2019/11/8/86bdec54-7ca6-4a6a-9bba-0ceb7830204f1573214846109-Anubhutee-Women-Kurtas-6221573214844382-1.jpg",
    "effectiveDiscountPercentageAfterTax": 0,
    "effectiveDiscountAmountAfterTax": 0,
    "buyButtonWinnerSkuId": 37294596,
    "buyButtonWinnerSellerPartnerId": 10688,
    "relatedStylesCount": 0,
    "relatedStylesType": "",
    "productVideos": [],
    "inventoryInfo": [
        {
            "skuId": 37294596,
            "label": "S",
            "inventory": 263,
            "available": true
        },
        {
            "skuId": 37294598,
            "label": "M",
            "inventory": 40,
            "available": true
        },
        {
            "skuId": 37294600,
            "label": "L",
            "inventory": 101,
            "available": true
        },
        {
            "skuId": 37294602,
            "label": "XL",
            "inventory": 152,
            "available": true
        },
        {
            "skuId": 37294604,
            "label": "XXL",
            "inventory": 244,
            "available": true
        }
    ],
    "sizes": "S,M,L,XL,XXL",
    "images": [
        {
            "view": "default",
            "src": "http://assets.myntassets.com/assets/images/10848096/2019/11/8/86bdec54-7ca6-4a6a-9bba-0ceb7830204f1573214846109-Anubhutee-Women-Kurtas-6221573214844382-1.jpg"
        },
        {
            "view": "right",
            "src": "http://assets.myntassets.com/assets/images/10848096/2019/11/8/8b275b21-6c69-47f9-ab12-ab2a86415c471573218871611-Anubhutee-Women-Kurtas-2621573218871330-4.jpg"
        },
        {
            "view": "front",
            "src": "http://assets.myntassets.com/assets/images/10848096/2019/11/8/e9217f2a-8697-4898-bbe7-a88cbf0a09e31573214846033-Anubhutee-Women-Kurtas-6221573214844382-2.jpg"
        },
        {
            "view": "search",
            "src": "http://assets.myntassets.com/assets/images/10848096/2019/11/8/86bdec54-7ca6-4a6a-9bba-0ceb7830204f1573214846109-Anubhutee-Women-Kurtas-6221573214844382-1.jpg"
        },
        {
            "view": "left",
            "src": "http://assets.myntassets.com/assets/images/10848096/2019/11/8/6bd02b46-db91-4c2f-9f90-964d7be7a1f21573214845860-Anubhutee-Women-Kurtas-6221573214844382-5.jpg"
        },
        {
            "view": "size_representation",
            "src": ""
        },
        {
            "view": "back",
            "src": "http://assets.myntassets.com/assets/images/10848096/2019/11/8/44ddb000-3189-4ef6-b772-47a984365d2a1573214845977-Anubhutee-Women-Kurtas-6221573214844382-3.jpg"
        }
    ],
    "gender": "Women",
    "primaryColour": "Black",
    "discountLabel": "Flat_Search_Percent",
    "discountDisplayLabel": "(57% OFF)",
    "additionalInfo": "Printed Straight Kurta",
    "category": "Kurtas",
    "mrp": 1399,
    "price": 601,
    "advanceOrderTag": "",
    "colorVariantAvailable": false,
    "productimagetag": "",
    "listViews": 0,
    "discountType": "1",
    "tdBxGyText": "",
    "catalogDate": "1573084800000",
    "season": "Winter",
    "year": "2019",
    "isPersonalised": false,
    "eorsPicksTag": "",
    "personalizedCoupon": "",
    "personalizedCouponValue": 0,
    "productMeta": "",
    "systemAttributes": [
        {
            "attribute": "SA_XT_BESTSELLER",
            "value": "BESTSELLER"
        },
        {
            "attribute": "SA_XT_PICWORTHY",
            "value": "PIC-WORTHY"
        }
    ],
    "attributeTagsPriorityList": [],
    "preferredDeliveryTag": ""
},
{
    "landingPageUrl": "Dresses/Tokyo-Talkies/Tokyo-Talkies-Black-Floral-Print-Flared-Maxi-Dress-with-a-Belt/2299060/buy",
    "loyaltyPointsEnabled": false,
    "adId": "",
    "isPLA": false,
    "productId": 2299060,
    "product": "Tokyo Talkies Black Floral Print Flared Maxi Dress with a Belt",
    "productName": "Tokyo Talkies Black Floral Print Flared Maxi Dress with a Belt",
    "rating": 4.156124114990234,
    "ratingCount": 6956,
    "isFastFashion": true,
    "futureDiscountedPrice": 0,
    "futureDiscountStartDate": "",
    "discount": 1350,
    "brand": "Tokyo Talkies",
    "searchImage": "http://assets.myntassets.com/assets/images/2299060/2018/7/30/7584b116-2a2c-4fb1-881c-af58cc484b181532944603854-Tokyo-Talkies-Women-Black-Printed-Maxi-Dress-4791532944603727-1.jpg",
    "effectiveDiscountPercentageAfterTax": 0,
    "effectiveDiscountAmountAfterTax": 0,
    "buyButtonWinnerSkuId": 14912831,
    "buyButtonWinnerSellerPartnerId": 4215,
    "relatedStylesCount": 0,
    "relatedStylesType": "",
    "productVideos": [],
    "inventoryInfo": [
        {
            "skuId": 14912831,
            "label": "S",
            "inventory": 102,
            "available": true
        },
        {
            "skuId": 14912830,
            "label": "M",
            "inventory": 90,
            "available": true
        },
        {
            "skuId": 14912829,
            "label": "L",
            "inventory": 176,
            "available": true
        },
        {
            "skuId": 14912828,
            "label": "XL",
            "inventory": 23,
            "available": true
        }
    ],
    "sizes": "S,M,L,XL",
    "images": [
        {
            "view": "default",
            "src": "http://assets.myntassets.com/assets/images/2299060/2018/7/30/7584b116-2a2c-4fb1-881c-af58cc484b181532944603854-Tokyo-Talkies-Women-Black-Printed-Maxi-Dress-4791532944603727-1.jpg"
        },
        {
            "view": "front",
            "src": "http://assets.myntassets.com/assets/images/2299060/2018/7/30/7b9cd323-82d4-41cd-b239-5063e7de14651532944603830-Tokyo-Talkies-Women-Black-Printed-Maxi-Dress-4791532944603727-2.jpg"
        },
        {
            "view": "search",
            "src": "http://assets.myntassets.com/assets/images/2299060/2018/7/30/7584b116-2a2c-4fb1-881c-af58cc484b181532944603854-Tokyo-Talkies-Women-Black-Printed-Maxi-Dress-4791532944603727-1.jpg"
        },
        {
            "view": "left",
            "src": "http://assets.myntassets.com/assets/images/2299060/2018/7/30/a51c9cef-69c3-4528-b16c-0107e2a0b7751532944603877-Tokyo-Talkies-Women-Black-Printed-Maxi-Dress-4791532944603727-5.jpg"
        },
        {
            "view": "size_representation",
            "src": ""
        },
        {
            "view": "back",
            "src": "http://assets.myntassets.com/assets/images/2299060/2018/7/30/5c87edf2-dbd3-4569-b0c7-45bc98573a1b1532944603811-Tokyo-Talkies-Women-Black-Printed-Maxi-Dress-4791532944603727-3.jpg"
        },
        {
            "view": "right",
            "src": "http://assets.myntassets.com/assets/images/2299060/2018/7/30/0fc1e1b2-e2c7-4abd-a7e8-2aae131c30bb1532944603794-Tokyo-Talkies-Women-Black-Printed-Maxi-Dress-4791532944603727-4.jpg"
        }
    ],
    "gender": "Women",
    "primaryColour": "Black",
    "discountLabel": "Flat_Search_Percent",
    "discountDisplayLabel": "(60% OFF)",
    "additionalInfo": "Floral Flared Belted Dress",
    "category": "Dresses",
    "mrp": 2249,
    "price": 899,
    "advanceOrderTag": "",
    "colorVariantAvailable": false,
    "productimagetag": "",
    "listViews": 0,
    "discountType": "1",
    "tdBxGyText": "",
    "catalogDate": "1512000000000",
    "season": "Winter",
    "year": "2020",
    "isPersonalised": false,
    "eorsPicksTag": "",
    "personalizedCoupon": "",
    "personalizedCouponValue": 0,
    "productMeta": "",
    "systemAttributes": [
        {
            "attribute": "Pleats",
            "value": "Pleats"
        },
        {
            "attribute": "Botanical Print",
            "value": "Botanical Print"
        },
        {
            "attribute": "SA_XT_BESTSELLER",
            "value": "BESTSELLER"
        },
        {
            "attribute": "SA_XT_PICWORTHY",
            "value": "PIC-WORTHY"
        },
        {
            "attribute": "SA_XT_OOS",
            "value": "4 Days"
        }
    ],
    "attributeTagsPriorityList": [],
    "preferredDeliveryTag": ""
},
{
    "landingPageUrl": "Kurta-Sets/Libas/Libas-Women-Black-Embroidered-Silk-Blend-Straight-Kurta-With-Palazzos--Dupatta/14602180/buy",
    "loyaltyPointsEnabled": false,
    "adId": "",
    "isPLA": false,
    "productId": 14602180,
    "product": "Libas Women Black Embroidered Silk Blend Straight Kurta With Palazzos \u0026 Dupatta",
    "productName": "Libas Women Black Embroidered Silk Blend Straight Kurta With Palazzos \u0026 Dupatta",
    "rating": 4.4782609939575195,
    "ratingCount": 23,
    "isFastFashion": true,
    "futureDiscountedPrice": 0,
    "futureDiscountStartDate": "",
    "discount": 1980,
    "brand": "Libas",
    "searchImage": "http://assets.myntassets.com/assets/images/productimage/2021/6/21/988f0459-3abc-4d3f-8918-397dbb0b473b1624284667886-1.jpg",
    "effectiveDiscountPercentageAfterTax": 0,
    "effectiveDiscountAmountAfterTax": 0,
    "buyButtonWinnerSkuId": 48461372,
    "buyButtonWinnerSellerPartnerId": 3422,
    "relatedStylesCount": 0,
    "relatedStylesType": "",
    "productVideos": [],
    "inventoryInfo": [
        {
            "skuId": 48461364,
            "label": "XS",
            "inventory": 66,
            "available": true
        },
        {
            "skuId": 48461366,
            "label": "S",
            "inventory": 182,
            "available": true
        },
        {
            "skuId": 48461368,
            "label": "M",
            "inventory": 7,
            "available": true
        },
        {
            "skuId": 48461370,
            "label": "L",
            "inventory": 131,
            "available": true
        },
        {
            "skuId": 48461372,
            "label": "XL",
            "inventory": 10,
            "available": true
        },
        {
            "skuId": 48461374,
            "label": "XXL",
            "inventory": 43,
            "available": true
        }
    ],
    "sizes": "XS,S,M,L,XL,XXL",
    "images": [
        {
            "view": "default",
            "src": "http://assets.myntassets.com/assets/images/productimage/2021/6/21/988f0459-3abc-4d3f-8918-397dbb0b473b1624284667886-1.jpg"
        },
        {
            "view": "top",
            "src": "http://assets.myntassets.com/assets/images/productimage/2021/6/21/4cef599f-07f1-44cf-bd8f-b7348cba573f1624284667954-6.jpg"
        },
        {
            "view": "size_representation",
            "src": ""
        },
        {
            "view": "back",
            "src": "http://assets.myntassets.com/assets/images/productimage/2021/6/21/64775ab3-79ca-4589-a9c4-17fcb669b12c1624284667909-3.jpg"
        },
        {
            "view": "search",
            "src": "http://assets.myntassets.com/assets/images/productimage/2021/6/21/988f0459-3abc-4d3f-8918-397dbb0b473b1624284667886-1.jpg"
        },
        {
            "view": "bottom",
            "src": "http://assets.myntassets.com/assets/images/productimage/2021/6/21/6bcbf768-84b7-429a-a9a5-75387a13be431624284667970-7.jpg"
        },
        {
            "view": "front",
            "src": "http://assets.myntassets.com/assets/images/productimage/2021/6/21/89fc4ec5-8740-487f-80eb-c06b5e4978501624284667897-2.jpg"
        },
        {
            "view": "right",
            "src": "http://assets.myntassets.com/assets/images/productimage/2021/6/21/710c7472-a933-4eaf-b504-6cb5ec5d6b361624284667923-4.jpg"
        },
        {
            "view": "left",
            "src": "http://assets.myntassets.com/assets/images/productimage/2021/6/21/b2655ac7-bcd9-48e0-a492-fcdfcbc5a71e1624284667939-5.jpg"
        }
    ],
    "gender": "Women",
    "primaryColour": "Black",
    "discountLabel": "Flat_Search_Percent",
    "discountDisplayLabel": "(55% OFF)",
    "additionalInfo": "Women Embroidered Kurta Set",
    "category": "Kurta Sets",
    "mrp": 3599,
    "price": 1619,
    "advanceOrderTag": "",
    "colorVariantAvailable": false,
    "productimagetag": "",
    "listViews": 0,
    "discountType": "1",
    "tdBxGyText": "",
    "catalogDate": "1623888000000",
    "season": "Summer",
    "year": "2021",
    "isPersonalised": false,
    "eorsPicksTag": "",
    "personalizedCoupon": "",
    "personalizedCouponValue": 0,
    "productMeta": "",
    "systemAttributes": [
        {
            "attribute": "SA_XT_PICWORTHY",
            "value": "PIC-WORTHY"
        }
    ],
    "attributeTagsPriorityList": [],
    "preferredDeliveryTag": ""
},
{
    "landingPageUrl": "Jeans/HERENOW/HERENOW-Men-Black-Skinny-Fit-Mid-Rise-Highly-Distressed-Stretchable-Jeans/9713665/buy",
    "loyaltyPointsEnabled": false,
    "adId": "",
    "isPLA": false,
    "productId": 9713665,
    "product": "HERE\u0026NOW Men Black Skinny Fit Mid-Rise Highly Distressed Stretchable Jeans",
    "productName": "HERE\u0026NOW Men Black Skinny Fit Mid-Rise Highly Distressed Stretchable Jeans",
    "rating": 3.8709394931793213,
    "ratingCount": 1139,
    "isFastFashion": true,
    "futureDiscountedPrice": 0,
    "futureDiscountStartDate": "",
    "discount": 960,
    "brand": "HERE\u0026NOW",
    "searchImage": "http://assets.myntassets.com/assets/images/9713665/2019/9/20/ec5e1903-e34b-41ea-96ce-46bb7449b6a91568974466679-HERENOW-Men-Jeans-3161568974462578-1.jpg",
    "effectiveDiscountPercentageAfterTax": 0,
    "effectiveDiscountAmountAfterTax": 0,
    "buyButtonWinnerSkuId": 34384742,
    "buyButtonWinnerSellerPartnerId": 4027,
    "relatedStylesCount": 0,
    "relatedStylesType": "",
    "productVideos": [],
    "inventoryInfo": [
        {
            "skuId": 34384742,
            "label": "28",
            "inventory": 152,
            "available": true
        },
        {
            "skuId": 34384744,
            "label": "30",
            "inventory": 431,
            "available": true
        },
        {
            "skuId": 34384746,
            "label": "32",
            "inventory": 429,
            "available": true
        },
        {
            "skuId": 34384747,
            "label": "34",
            "inventory": 157,
            "available": true
        },
        {
            "skuId": 34384748,
            "label": "36",
            "inventory": 50,
            "available": true
        }
    ],
    "sizes": "28,30,32,34,36",
    "images": [
        {
            "view": "default",
            "src": "http://assets.myntassets.com/assets/images/9713665/2019/9/20/ec5e1903-e34b-41ea-96ce-46bb7449b6a91568974466679-HERENOW-Men-Jeans-3161568974462578-1.jpg"
        },
        {
            "view": "front",
            "src": "http://assets.myntassets.com/assets/images/9713665/2019/9/20/dd02de73-3a95-443e-bad9-5cf547eaaeae1568974466653-HERENOW-Men-Jeans-3161568974462578-2.jpg"
        },
        {
            "view": "back",
            "src": "http://assets.myntassets.com/assets/images/9713665/2019/9/20/3641e72e-7620-4627-939c-cfc5fb06d1ec1568974466628-HERENOW-Men-Jeans-3161568974462578-3.jpg"
        },
        {
            "view": "right",
            "src": "http://assets.myntassets.com/assets/images/9713665/2019/9/20/d7656939-fb40-4f62-8f3f-f6ba5dd4d1961568974466603-HERENOW-Men-Jeans-3161568974462578-4.jpg"
        },
        {
            "view": "search",
            "src": "http://assets.myntassets.com/assets/images/9713665/2019/9/20/ec5e1903-e34b-41ea-96ce-46bb7449b6a91568974466679-HERENOW-Men-Jeans-3161568974462578-1.jpg"
        },
        {
            "view": "top",
            "src": "http://assets.myntassets.com/assets/images/9713665/2019/9/20/c6a98e9c-0713-4d5d-8d10-df7a13e10edf1568974466549-HERENOW-Men-Jeans-3161568974462578-6.jpg"
        },
        {
            "view": "left",
            "src": "http://assets.myntassets.com/assets/images/9713665/2019/9/20/6421b31b-f472-4dac-8d3e-dbab0f5b500c1568974466575-HERENOW-Men-Jeans-3161568974462578-5.jpg"
        },
        {
            "view": "bottom",
            "src": "http://assets.myntassets.com/assets/images/9713665/2019/9/20/516a08f0-72dd-4422-b6ad-b30e2f2f3a0d1568974466523-HERENOW-Men-Jeans-3161568974462578-7.jpg"
        },
        {
            "view": "size_representation",
            "src": ""
        }
    ],
    "gender": "Men",
    "primaryColour": "Black",
    "discountLabel": "Flat_Search_Percent",
    "discountDisplayLabel": "(40% OFF)",
    "additionalInfo": "Men Skinny Fit Jeans",
    "category": "Jeans",
    "mrp": 2399,
    "price": 1439,
    "advanceOrderTag": "",
    "colorVariantAvailable": false,
    "productimagetag": "",
    "listViews": 0,
    "discountType": "1",
    "tdBxGyText": "",
    "catalogDate": "1568851200000",
    "season": "Winter",
    "year": "2019",
    "isPersonalised": false,
    "eorsPicksTag": "",
    "personalizedCoupon": "",
    "personalizedCouponValue": 0,
    "productMeta": "",
    "systemAttributes": [
        {
            "attribute": "Custom_Label2",
            "value": "SA_FD_Label2"
        },
        {
            "attribute": "SA_XT_BESTSELLER",
            "value": "BESTSELLER"
        }
    ],
    "attributeTagsPriorityList": [],
    "preferredDeliveryTag": ""
},
{
    "landingPageUrl": "Smart-Watches/NOISE/NOISE-Black-ColoFit-Pro-2-Oxy-Smartwatch/14564520/buy",
    "loyaltyPointsEnabled": false,
    "adId": "",
    "isPLA": false,
    "productId": 14564520,
    "product": "NOISE Black ColoFit Pro 2 Oxy Smartwatch",
    "productName": "NOISE Black ColoFit Pro 2 Oxy Smartwatch",
    "rating": 4.192307472229004,
    "ratingCount": 26,
    "isFastFashion": false,
    "futureDiscountedPrice": 0,
    "futureDiscountStartDate": "",
    "discount": 1500,
    "brand": "NOISE",
    "searchImage": "http://assets.myntassets.com/assets/images/14564520/2021/6/22/99ee83cd-38e5-4042-9474-514c780bf3501624340886347-Noise-ColoFit-Pro-2-Oxy-Smartwatch---Onyx-Black-306162434088-1.jpg",
    "effectiveDiscountPercentageAfterTax": 0,
    "effectiveDiscountAmountAfterTax": 0,
    "buyButtonWinnerSkuId": 48338110,
    "buyButtonWinnerSellerPartnerId": 4216,
    "relatedStylesCount": 0,
    "relatedStylesType": "",
    "productVideos": [],
    "inventoryInfo": [
        {
            "skuId": 48338110,
            "label": "Onesize",
            "inventory": 154,
            "available": true
        }
    ],
    "sizes": "Onesize",
    "images": [
        {
            "view": "default",
            "src": "http://assets.myntassets.com/assets/images/14564520/2021/6/22/99ee83cd-38e5-4042-9474-514c780bf3501624340886347-Noise-ColoFit-Pro-2-Oxy-Smartwatch---Onyx-Black-306162434088-1.jpg"
        },
        {
            "view": "front",
            "src": "http://assets.myntassets.com/assets/images/14564520/2021/6/22/460c6e2d-6506-47bc-8887-9146b38a99cb1624340886339-Noise-ColoFit-Pro-2-Oxy-Smartwatch---Onyx-Black-306162434088-2.jpg"
        },
        {
            "view": "image11",
            "src": "http://assets.myntassets.com/assets/images/14564520/2021/6/22/87a1c525-b623-45a3-b1ff-1beda96302dd1624340886294-Noise-ColoFit-Pro-2-Oxy-Smartwatch---Onyx-Black-306162434088-11.jpg"
        },
        {
            "view": "search",
            "src": "http://assets.myntassets.com/assets/images/14564520/2021/6/22/99ee83cd-38e5-4042-9474-514c780bf3501624340886347-Noise-ColoFit-Pro-2-Oxy-Smartwatch---Onyx-Black-306162434088-1.jpg"
        },
        {
            "view": "bottom",
            "src": "http://assets.myntassets.com/assets/images/14564520/2021/6/22/25699ea0-2e17-4050-9b89-7d4fe8e901d11624340886303-Noise-ColoFit-Pro-2-Oxy-Smartwatch---Onyx-Black-306162434088-7.jpg"
        },
        {
            "view": "back",
            "src": "http://assets.myntassets.com/assets/images/14564520/2021/6/22/19543cba-c4f4-46e0-b7a2-d9024dce9f6a1624340886331-Noise-ColoFit-Pro-2-Oxy-Smartwatch---Onyx-Black-306162434088-3.jpg"
        },
        {
            "view": "right",
            "src": "http://assets.myntassets.com/assets/images/14564520/2021/6/22/999f3f7d-67b0-46b9-9919-f83a34aad85b1624340886324-Noise-ColoFit-Pro-2-Oxy-Smartwatch---Onyx-Black-306162434088-4.jpg"
        },
        {
            "view": "top",
            "src": "http://assets.myntassets.com/assets/images/14564520/2021/6/22/d84f87ee-46bc-4678-ac5e-44944855d0f51624340886310-Noise-ColoFit-Pro-2-Oxy-Smartwatch---Onyx-Black-306162434088-6.jpg"
        },
        {
            "view": "left",
            "src": "http://assets.myntassets.com/assets/images/14564520/2021/6/22/86d38a55-1ec8-40b8-8672-7a8b07e5f06b1624340886317-Noise-ColoFit-Pro-2-Oxy-Smartwatch---Onyx-Black-306162434088-5.jpg"
        },
        {
            "view": "size_representation",
            "src": ""
        }
    ],
    "gender": "Unisex",
    "primaryColour": "Black",
    "discountLabel": "Flat_Search_Amount",
    "discountDisplayLabel": "(Rs. 1500 OFF)",
    "additionalInfo": "ColoFit Pro 2 Oxy Smartwatch",
    "category": "Smart Watches",
    "mrp": 4999,
    "price": 3499,
    "advanceOrderTag": "",
    "colorVariantAvailable": false,
    "productimagetag": "",
    "listViews": 0,
    "discountType": "1",
    "tdBxGyText": "",
    "catalogDate": "1623888000000",
    "season": "Fall",
    "year": "2021",
    "isPersonalised": false,
    "eorsPicksTag": "",
    "personalizedCoupon": "",
    "personalizedCouponValue": 0,
    "productMeta": "",
    "systemAttributes": [
        {
            "attribute": "SA_XT_BESTSELLER",
            "value": "BESTSELLER"
        },
        {
            "attribute": "SA_XT_OOS",
            "value": "4 Days"
        },
        {
            "attribute": "SA_XT_New",
            "value": "NEW"
        }
    ],
    "attributeTagsPriorityList": [],
    "preferredDeliveryTag": ""
},
{
    "landingPageUrl": "Jeggings/Roadster/Roadster-Women-Black-Jeggings/2367843/buy",
    "loyaltyPointsEnabled": false,
    "adId": "",
    "isPLA": false,
    "productId": 2367843,
    "product": "Roadster Women Black Jeggings",
    "productName": "Roadster Women Black Jeggings",
    "rating": 4.184040069580078,
    "ratingCount": 1391,
    "isFastFashion": true,
    "futureDiscountedPrice": 0,
    "futureDiscountStartDate": "",
    "discount": 1040,
    "brand": "Roadster",
    "searchImage": "http://assets.myntassets.com/assets/images/2367843/2018/2/21/11519201566926-Roadster-Women-Black-Jeggings--1271519201566738-1.jpg",
    "effectiveDiscountPercentageAfterTax": 0,
    "effectiveDiscountAmountAfterTax": 0,
    "buyButtonWinnerSkuId": 15212333,
    "buyButtonWinnerSellerPartnerId": 4118,
    "relatedStylesCount": 0,
    "relatedStylesType": "",
    "productVideos": [],
    "inventoryInfo": [
        {
            "skuId": 15212333,
            "label": "26",
            "inventory": 0,
            "available": false
        },
        {
            "skuId": 15212334,
            "label": "28",
            "inventory": 60,
            "available": true
        },
        {
            "skuId": 15212335,
            "label": "30",
            "inventory": 36,
            "available": true
        },
        {
            "skuId": 15212336,
            "label": "32",
            "inventory": 169,
            "available": true
        },
        {
            "skuId": 15212337,
            "label": "34",
            "inventory": 126,
            "available": true
        },
        {
            "skuId": 15212338,
            "label": "36",
            "inventory": 143,
            "available": true
        }
    ],
    "sizes": "28,30,32,34,36",
    "images": [
        {
            "view": "default",
            "src": "http://assets.myntassets.com/assets/images/2367843/2018/2/21/11519201566926-Roadster-Women-Black-Jeggings--1271519201566738-1.jpg"
        },
        {
            "view": "search",
            "src": "http://assets.myntassets.com/assets/images/2367843/2018/2/21/11519201566926-Roadster-Women-Black-Jeggings--1271519201566738-1.jpg"
        },
        {
            "view": "left",
            "src": "http://assets.myntassets.com/assets/images/2367843/2018/2/21/11519201566825-Roadster-Women-Black-Jeggings--1271519201566738-5.jpg"
        },
        {
            "view": "size_representation",
            "src": ""
        },
        {
            "view": "back",
            "src": "http://assets.myntassets.com/assets/images/2367843/2018/2/21/11519201566874-Roadster-Women-Black-Jeggings--1271519201566738-3.jpg"
        },
        {
            "view": "front",
            "src": "http://assets.myntassets.com/assets/images/2367843/2018/2/21/11519201566900-Roadster-Women-Black-Jeggings--1271519201566738-2.jpg"
        },
        {
            "view": "right",
            "src": "http://assets.myntassets.com/assets/images/2367843/2018/2/21/11519201566852-Roadster-Women-Black-Jeggings--1271519201566738-4.jpg"
        }
    ],
    "gender": "Women",
    "primaryColour": "Black",
    "discountLabel": "Flat_Search_Percent",
    "discountDisplayLabel": "(65% OFF)",
    "additionalInfo": "Women Jeggings",
    "category": "Jeggings",
    "mrp": 1599,
    "price": 559,
    "advanceOrderTag": "",
    "colorVariantAvailable": false,
    "productimagetag": "",
    "listViews": 0,
    "discountType": "1",
    "tdBxGyText": "",
    "catalogDate": "1518652800000",
    "season": "Summer",
    "year": "2019",
    "isPersonalised": false,
    "eorsPicksTag": "",
    "personalizedCoupon": "",
    "personalizedCouponValue": 0,
    "productMeta": "",
    "systemAttributes": [
        {
            "attribute": "SA_XT_PICWORTHY",
            "value": "PIC-WORTHY"
        },
        {
            "attribute": "SA_XT_BESTSELLER",
            "value": "BESTSELLER"
        },
        {
            "attribute": "SA_XT_Best_Price",
            "value": "Price may go up"
        }
    ],
    "attributeTagsPriorityList": [],
    "preferredDeliveryTag": ""
},
{
    "landingPageUrl": "Track-Pants/HRX-by-Hrithik-Roshan/HRX-by-Hrithik-Roshan-Men-Black-Solid-Joggers/2314359/buy",
    "loyaltyPointsEnabled": false,
    "adId": "",
    "isPLA": false,
    "productId": 2314359,
    "product": "HRX by Hrithik Roshan Men Black Solid Joggers",
    "productName": "HRX by Hrithik Roshan Men Black Solid Joggers",
    "rating": 3.999006509780884,
    "ratingCount": 3020,
    "isFastFashion": true,
    "futureDiscountedPrice": 0,
    "futureDiscountStartDate": "",
    "discount": 680,
    "brand": "HRX by Hrithik Roshan",
    "searchImage": "http://assets.myntassets.com/assets/images/2314359/2018/5/17/4010da6c-79a6-4452-aca8-006502ec55141526534323055-HRX-by-Hrithik-Roshan-Men-Track-Pants-451526534322918-1.jpg",
    "effectiveDiscountPercentageAfterTax": 0,
    "effectiveDiscountAmountAfterTax": 0,
    "buyButtonWinnerSkuId": 14975526,
    "buyButtonWinnerSellerPartnerId": 4027,
    "relatedStylesCount": 0,
    "relatedStylesType": "",
    "productVideos": [],
    "inventoryInfo": [
        {
            "skuId": 36379416,
            "label": "XS",
            "inventory": 0,
            "available": false
        },
        {
            "skuId": 14975526,
            "label": "S",
            "inventory": 798,
            "available": true
        },
        {
            "skuId": 14975527,
            "label": "M",
            "inventory": 1501,
            "available": true
        },
        {
            "skuId": 14975528,
            "label": "L",
            "inventory": 1441,
            "available": true
        },
        {
            "skuId": 14975529,
            "label": "XL",
            "inventory": 734,
            "available": true
        },
        {
            "skuId": 32051234,
            "label": "XXL",
            "inventory": 5,
            "available": true
        }
    ],
    "sizes": "S,M,L,XL,XXL",
    "images": [
        {
            "view": "default",
            "src": "http://assets.myntassets.com/assets/images/2314359/2018/5/17/4010da6c-79a6-4452-aca8-006502ec55141526534323055-HRX-by-Hrithik-Roshan-Men-Track-Pants-451526534322918-1.jpg"
        },
        {
            "view": "size_representation",
            "src": ""
        },
        {
            "view": "back",
            "src": "http://assets.myntassets.com/assets/images/2314359/2018/5/17/cca3e8db-17d6-4bf3-8946-65ec38aca18e1526534323020-HRX-by-Hrithik-Roshan-Men-Track-Pants-451526534322918-3.jpg"
        },
        {
            "view": "right",
            "src": "http://assets.myntassets.com/assets/images/2314359/2018/5/17/e2dcb4fa-820c-4ac5-9cf6-183e156c94bf1526534322999-HRX-by-Hrithik-Roshan-Men-Track-Pants-451526534322918-4.jpg"
        },
        {
            "view": "front",
            "src": "http://assets.myntassets.com/assets/images/2314359/2018/5/17/c11062b4-cf2f-43fa-a055-61a9fbb96c161526534323039-HRX-by-Hrithik-Roshan-Men-Track-Pants-451526534322918-2.jpg"
        },
        {
            "view": "search",
            "src": "http://assets.myntassets.com/assets/images/2314359/2018/5/17/4010da6c-79a6-4452-aca8-006502ec55141526534323055-HRX-by-Hrithik-Roshan-Men-Track-Pants-451526534322918-1.jpg"
        },
        {
            "view": "left",
            "src": "http://assets.myntassets.com/assets/images/2314359/2018/5/17/1d8b27fb-bf65-448f-958a-8c5dd120a5541526534322986-HRX-by-Hrithik-Roshan-Men-Track-Pants-451526534322918-5.jpg"
        }
    ],
    "gender": "Men",
    "primaryColour": "Black",
    "discountLabel": "Flat_Search_Percent",
    "discountDisplayLabel": "(40% OFF)",
    "additionalInfo": "Men Solid Joggers",
    "category": "Track Pants",
    "mrp": 1699,
    "price": 1019,
    "advanceOrderTag": "",
    "colorVariantAvailable": false,
    "productimagetag": "",
    "listViews": 0,
    "discountType": "1",
    "tdBxGyText": "",
    "catalogDate": "1526515200000",
    "season": "Summer",
    "year": "2019",
    "isPersonalised": false,
    "eorsPicksTag": "",
    "personalizedCoupon": "",
    "personalizedCouponValue": 0,
    "productMeta": "",
    "systemAttributes": [
        {
            "attribute": "Custom_Label2",
            "value": "SA_FD_Label2"
        },
        {
            "attribute": "SA_XT_PICWORTHY",
            "value": "PIC-WORTHY"
        },
        {
            "attribute": "SA_XT_BESTSELLER",
            "value": "BESTSELLER"
        }
    ],
    "attributeTagsPriorityList": [],
    "preferredDeliveryTag": ""
},
{
    "landingPageUrl": "Speakers/boAt/boAt-Stone-1500-40W-Active-Black-Wireless-Speaker-with-boAt-Signature-Sound-IPX6/11888878/buy",
    "loyaltyPointsEnabled": false,
    "adId": "",
    "isPLA": false,
    "productId": 11888878,
    "product": "boAt Stone 1500 40W Active Black Wireless Speaker with boAt Signature Sound IPX6",
    "productName": "boAt Stone 1500 40W Active Black Wireless Speaker with boAt Signature Sound IPX6",
    "rating": 4.716216087341309,
    "ratingCount": 74,
    "isFastFashion": false,
    "futureDiscountedPrice": 0,
    "futureDiscountStartDate": "",
    "discount": 6000,
    "brand": "boAt",
    "searchImage": "http://assets.myntassets.com/assets/images/11888878/2021/6/8/b87150df-ad9b-4bd9-8752-017776eb0c281623126496063-boAt-Stone-1500-40W-Active-Black-Wireless-Speaker-with-boAt--1.jpg",
    "effectiveDiscountPercentageAfterTax": 0,
    "effectiveDiscountAmountAfterTax": 0,
    "buyButtonWinnerSkuId": 41386478,
    "buyButtonWinnerSellerPartnerId": 4076,
    "relatedStylesCount": 0,
    "relatedStylesType": "",
    "productVideos": [],
    "inventoryInfo": [
        {
            "skuId": 41386478,
            "label": "Onesize",
            "inventory": 985,
            "available": true
        }
    ],
    "sizes": "Onesize",
    "images": [
        {
            "view": "default",
            "src": "http://assets.myntassets.com/assets/images/11888878/2021/6/8/b87150df-ad9b-4bd9-8752-017776eb0c281623126496063-boAt-Stone-1500-40W-Active-Black-Wireless-Speaker-with-boAt--1.jpg"
        },
        {
            "view": "front",
            "src": "http://assets.myntassets.com/assets/images/11888878/2021/6/8/0606504f-f8e4-4d6d-9655-a440afcc1ec01623126496045-boAt-Stone-1500-40W-Active-Black-Wireless-Speaker-with-boAt--2.jpg"
        },
        {
            "view": "search",
            "src": "http://assets.myntassets.com/assets/images/11888878/2021/6/8/b87150df-ad9b-4bd9-8752-017776eb0c281623126496063-boAt-Stone-1500-40W-Active-Black-Wireless-Speaker-with-boAt--1.jpg"
        },
        {
            "view": "top",
            "src": "http://assets.myntassets.com/assets/images/11888878/2021/6/8/3f557a9c-ba50-455b-b058-ad10170fecb91623126495968-boAt-Stone-1500-40W-Active-Black-Wireless-Speaker-with-boAt--6.jpg"
        },
        {
            "view": "left",
            "src": "http://assets.myntassets.com/assets/images/11888878/2021/6/8/bf17aefd-3620-487f-ba2d-949b14d4cd0d1623126495988-boAt-Stone-1500-40W-Active-Black-Wireless-Speaker-with-boAt--5.jpg"
        },
        {
            "view": "size_representation",
            "src": ""
        },
        {
            "view": "back",
            "src": "http://assets.myntassets.com/assets/images/11888878/2021/6/8/e8436318-5d17-4023-944f-26ecd977485e1623126496026-boAt-Stone-1500-40W-Active-Black-Wireless-Speaker-with-boAt--3.jpg"
        },
        {
            "view": "right",
            "src": "http://assets.myntassets.com/assets/images/11888878/2021/6/8/a9d5a01f-cfbf-4ba2-aacb-016b6e660b9b1623126496007-boAt-Stone-1500-40W-Active-Black-Wireless-Speaker-with-boAt--4.jpg"
        }
    ],
    "gender": "Unisex",
    "primaryColour": "Black",
    "discountLabel": "Flat_Search_Amount",
    "discountDisplayLabel": "(Rs. 6000 OFF)",
    "additionalInfo": "Stone 1500 Wireless Speaker",
    "category": "Speakers",
    "mrp": 12990,
    "price": 6990,
    "advanceOrderTag": "",
    "colorVariantAvailable": false,
    "productimagetag": "",
    "listViews": 0,
    "discountType": "1",
    "tdBxGyText": "",
    "catalogDate": "1590624000000",
    "season": "Summer",
    "year": "2020",
    "isPersonalised": false,
    "eorsPicksTag": "",
    "personalizedCoupon": "",
    "personalizedCouponValue": 0,
    "productMeta": "",
    "systemAttributes": [
        {
            "attribute": "SA_XT_BESTSELLER",
            "value": "BESTSELLER"
        },
        {
            "attribute": "SA_XT_PICWORTHY",
            "value": "PIC-WORTHY"
        }
    ],
    "attributeTagsPriorityList": [],
    "preferredDeliveryTag": ""
}];

let prices = [
    {
        "id": "49.0 TO 53994.0"
    },
    {
        "id": "53994.0 TO 107939.0"
    },
    {
        "id": "107939.0 TO 161884.0"
    },
    {
        "id": "161884.0 TO 215829.0"
    }
]

let brandss = [{
    "id": "109F",
    "count": 49,
     
},
{
    "id": "20Dresses",
    "count": 183,
     
},
{
    "id": "2GO",
    "count": 10,
     
},
{
    "id": "321 Sportswear",
    "count": 1,
     
},
{
    "id": "361 Degree",
    "count": 5,
     
},
{
    "id": "3BO",
    "count": 5,
     
},
{
    "id": "3PIN",
    "count": 55,
     
},
{
    "id": "513",
    "count": 38,
     
},
{
    "id": "612 Ivy League",
    "count": 2,
     
},
{
    "id": "612 league",
    "count": 49,
     
},
{
    "id": "6Y COLLECTIVE",
    "count": 9,
     
},
{
    "id": "7Rainbow",
    "count": 2,
     
},
{
    "id": "7Threads",
    "count": 37,
     
},
{
    "id": "98 Degree North",
    "count": 50,
     
},
{
    "id": "999Store",
    "count": 122,
     
},
{
    "id": "9rasa",
    "count": 9,
     
},
{
    "id": "9teenAGAIN",
    "count": 7,
     
},
{
    "id": "A Homes Grace",
    "count": 2,
     
},
{
    "id": "A Vintage Affair- Home Decor",
    "count": 7,
     
},
{
    "id": "Aaboli",
    "count": 1,
     
},
{
    "id": "aadi",
    "count": 15,
     
},
{
    "id": "aadita",
    "count": 2,
     
},
{
    "id": "AADY AUSTIN",
    "count": 26,
     
},
{
    "id": "aamna",
    "count": 12,
     
},
{
    "id": "Aapno Rajasthan",
    "count": 50,
     
},
{
    "id": "AARA",
    "count": 28,
     
}]

let categoriess = [
    {
        "id": "Accessory Gift Set",
        "count": 942
    },
    {
        "id": "Action Figures and Play Set",
        "count": 8,
         
    },
    {
        "id": "Activity Toys and Games",
        "count": 17,
         
    },
    {
        "id": "Air Freshener",
        "count": 3,
         
    },
    {
        "id": "Anklet",
        "count": 7,
         
    },
    {
        "id": "Appliance covers",
        "count": 11,
         
    },
    {
        "id": "Aprons",
        "count": 11,
         
    },
    {
        "id": "Aroma Oil Diffusers",
        "count": 4,
         
    },
    {
        "id": "Aroma Oils",
        "count": 1,
         
    },
    {
        "id": "Artificial Flowers and Plants",
        "count": 7,
         
    },
    {
        "id": "BB and CC Cream",
        "count": 2,
         
    },
    {
        "id": "Baby Apparel Gift Set",
        "count": 1,
         
    },
    {
        "id": "Baby Care Products",
        "count": 5,
         
    },
    {
        "id": "Baby Dolls",
        "count": 148,
         
    },
    {
        "id": "Backpacks",
        "count": 1228,
         
    },
    {
        "id": "Bakeware",
        "count": 20,
         
    },
    {
        "id": "Bangle",
        "count": 2,
         
    },
    {
        "id": "Bar Accessories",
        "count": 11,
         
    }]