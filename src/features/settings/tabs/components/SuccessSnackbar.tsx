
import React from 'react';
import { makeStyles } from '@material-ui/styles';
import { Snackbar, SnackbarContent, colors } from '@material-ui/core';
import CheckCircleIcon from '@material-ui/icons/CheckCircleOutlined';

const useStyles = makeStyles(theme => ({
    content: {
        backgroundColor: colors.green[600]
    },
    message: {
        display: 'flex',
        alignItems: 'center'
    },
    icon: {
        marginRight: "2px"
    }
}));

export default function SuccessSnackbar(props: any){
    const { open, onClose } = props;

    const classes = useStyles();

    // @ts-ignore
    return (
        <Snackbar
            anchorOrigin={{
                vertical: 'top',
                horizontal: 'center'
            }}
            autoHideDuration={6000}
            onClose={onClose}
            open={open}
        >
            <SnackbarContent
                className={classes.content}
                message={
                    <span className={classes.message}>
            <CheckCircleIcon className={classes.icon} />
            Successfully saved changes!
          </span>
                }
                // @ts-ignore
                variant="h6"
            />
        </Snackbar>
    );
};



