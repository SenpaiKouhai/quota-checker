import React from 'react'
import { Paper, Stack, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

const style = makeStyles((theme) => ({
    paper: {
        backgroundColor: 'white',
        padding: '10px 0',
        borderRadius: '15px'
    },
    input: {
        padding: 0,
        margin: 0
    }
}) )

function Quota() {
    const classes = style();


    return (
        <Paper className={classes.paper} >
            <Stack direction="row" alignItems="center" justifyContent="space-evenly" >
                <Typography >Quota: </Typography>
                
                <TextField  
                    variant="outlined"
                    className={classes.input}
                    color="secondary"
                    size="small"
                />
            </Stack>
        </Paper>
    )
}

export default Quota
