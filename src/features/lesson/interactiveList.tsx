import React from "react";
import { makeStyles, Theme, createStyles } from "@material-ui/core/styles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";

import CodeIcon from "@material-ui/icons/Code";
import PlayArrowRoundedIcon from "@material-ui/icons/PlayArrowRounded";
import TextFieldsRoundedIcon from "@material-ui/icons/TextFieldsRounded";

const useStyles = makeStyles((theme: Theme) =>
    createStyles({
        root: {
            flexGrow: 1,
            maxWidth: 752
        },
        demo: {
            backgroundColor: theme.palette.background.paper
        },
        title: {
            margin: theme.spacing(4, 0, 2)
        }
    })
);

export default function InteractiveList() {
    const classes = useStyles();

    return (
        <div className={classes.root}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                    <Typography variant="h6" className={classes.title}>
                        Icon with text
                    </Typography>
                    <div className={classes.demo}>
                        <List>
                            <ListItem>
                                <ListItemIcon>
                                    <CodeIcon />
                                </ListItemIcon>
                                <ListItemText primary="Single-line item" />
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <PlayArrowRoundedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Single-line item" />
                            </ListItem>

                            <ListItem>
                                <ListItemIcon>
                                    <TextFieldsRoundedIcon />
                                </ListItemIcon>
                                <ListItemText primary="Single-line item" />
                            </ListItem>
                        </List>
                    </div>
                </Grid>
            </Grid>
        </div>
    );
}
