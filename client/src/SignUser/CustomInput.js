import React from 'react';
import TextField from '@material-ui/core/TextField';
import {Grid, InputAdornment, IconButton} from '@material-ui/core';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import usestyle from './Style';

export const CustomInput = ({name, handleChange, label, type, showPassword, half}) => {
     const classes = usestyle();
    return(
        <Grid item xs={12} sm={half? 6:12}>
            <TextField
                name={name}
                className={classes.textField}
                onChange={handleChange}
                variant = "outlined"
                required
                fullWidth
                label={label}
                type={type}
                InputProps={name==='password' ? {
                    endAdornment:(
                        <InputAdornment position="end">
                            <IconButton onClick={showPassword}>
                                {type==="password" ? <Visibility/> : <VisibilityOff/>}
                            </IconButton>
                        </InputAdornment>
                    )
                }: null}
            />
        </Grid>
    )
}
