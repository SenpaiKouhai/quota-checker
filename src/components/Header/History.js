import React from 'react'
import { Paper, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'

const style = makeStyles( (theme) => ({
    paper: {
        // backgroundColor: 'white',
        padding: '10px',
        borderRadius: '50%'
    }
}) )

function History() {
    const classes = style();
    return (
        <div >
            <Paper className={classes.paper} >
                <Typography>200</Typography>
            </Paper>

            <Typography>
                Today
            </Typography>
        </div>
    )
}

export default History
