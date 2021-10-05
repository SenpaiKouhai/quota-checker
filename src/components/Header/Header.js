import React from 'react'
import { makeStyles } from '@mui/styles'
import { Typography, Container, Stack } from '@mui/material'
import { toPhp, netWorth } from '../utils'

const style = makeStyles( (theme) => ({
    background: {
        height: '20vh',
        backgroundColor: "#5893df",
        borderBottomLeftRadius: '10px',
        borderBottomRightRadius: '10px',
        width: '100%',
        // paddingBottom: '30vh',
        color: 'white'
    },
    title: {
        paddingBottom: '20px',
        paddingTop: '10px'
    },
    name: {
        fontSize: '0.8em',
        textTransform: 'capitalize'
    },
    paper: {}
}) )

export default function Header({ slpPrice }) {
    const classes = style()

    const total = localStorage.getItem("total_slp")
    const username = localStorage.getItem("username")
    const totalPhp = netWorth(total, slpPrice)
    return (
        <div className={classes.background} >
            <Container>
                <div className={classes.title}>
                    <Stack direction="row" justifyContent="center" >
                        <Stack direction="row" alignItems="center" spacing={0.5}>
                            <Typography className={classes.name} fontWeight={400} >Hi, </Typography>
                            <Typography className={classes.name} fontWeight={400} >{username}</Typography>
                        </Stack>
                    </Stack>
                    
                    <Typography variant="h6" align="center" >
                        Total: {toPhp(totalPhp)} 
                    </Typography>
                    <Typography align="center" margin={-0.5} fontSize={11} fontWeight={300} >
                        Slp Price: {toPhp(slpPrice)}
                    </Typography>
                </div>
            </Container>
        </div>
    )
}
