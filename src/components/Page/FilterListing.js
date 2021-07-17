import React from 'react';
import Box from '@material-ui/core/Box';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import SearchIcon from '@material-ui/icons/Search';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles'

const useStyles = makeStyles({
    listRoot: {
        paddingBottom: "2px",
        paddingTop: 0,

        '& .MuiListItemIcon-root': {
            minWidth: "32px"
        },

        '& .MuiIconButton-root': {
            padding: "2px 8px"
        },

        '& .MuiListItemText-primary': {
            whiteSpace: "nowrap",
            cursor: "pointer",
            overflow: "hidden",
            textOverflow: "ellipsis",
            minHeight: "17px",
            color: "#4a4f68",

            '& div': {
                fontWeight: 500,
                fontSize: "14px"
            },

            '& span': {
                color: "#94969f",
                fontSize: "11px",
                marginLeft: "4px"
            }
        }
    },
    container: {
        borderRight: "1px solid #e9e9ed",
        borderBottom: "1px solid #e9e9ed",
        padding: "2rem 1rem",
        fontWeight: "700"
    },
    titleContainer: {
        width: "50%",
        textAlign: "justify",
        paddingLeft: "20px"
    },
    searchIcon: {
        width: "12%",
        position: "absolute",
        top: "-8px",
        right: 0,
        backgroundColor: "#f5f5f6",
        borderRadius: "3em"
    },
    countLeft: {
        color: "#ff3f6c",
        cursor: "pointer",
        width: "94%"
    }
});


export default function FiltersListing(props) {
    const classes = useStyles();

    return <Box className={classes.container}>
        <div style={{
            position: "relative"
        }}>
            <div className={classes.titleContainer}>
                <Typography component="h3" variant="subtitle2" style={{
                    textTransform: "uppercase",
                    fontWeight: 600
                }}>
                    {props.title}
                </Typography>
            </div>
            <div className={classes.searchIcon}>
                <SearchIcon />
            </div>
        </div>
        <List>
            {props.data.slice(0, 8).map((value) => {
                const labelId = `gender-label-${value}`;

                return (
                    <ListItem key={value} button className={classes.listRoot}>
                        <ListItemIcon>
                            {/* <Checkbox /> */}
                            <input type="checkbox" value={value.id} size="3" />
                        </ListItemIcon>
                        <ListItemText
                            id={labelId}
                            primary={
                                <div>{value.id}<span>{`(${value.count || 0})`}</span></div>
                            }
                        />
                    </ListItem>
                );
            })}
        </List>
        {props.isShowMore && props.data.length - 8 > 0 && <div className={classes.countLeft}>
            <Typography variant="body1">
                + {props.data.length - 8} more
            </Typography>
        </div>
        }
    </Box>
}