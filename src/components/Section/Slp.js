import React from 'react'
import { makeStyles } from '@mui/styles'
import { Button, Container, LinearProgress, Paper, Stack, Typography } from '@mui/material'
import { format, netWorth, toPhp } from '../utils'
const style = makeStyles( (theme) => ({
    card: {
        backgroundColor: 'white',
        // height: '20vh',
        borderRadius: '10px',
        // padding: "50px 0",
        width: '100%',
        padding: '10px 12px'
    }
}) )

function Slp({ slpPrice }) {
    const classes = style()

    // const slp = 5876;
    const total = localStorage.getItem("total_slp")

    const scholarSlp = Number(total) * 0.60
    const managerSlp = Number(total) * 0.40

    return (
        <Container>
            <Paper className={classes.card} >
                <Stack direction="row" justifyContent="space-between" alignItems="center" marginBottom={0.3} >
                    <Typography variant="h6" >Slp</Typography>

                    <Typography 
                        variant="body1" 
                        classes={classes.title}
                        fontWeight={400}
                    >
                        Total: {format(total)}
                    </Typography>
                </Stack>

                <Stack direction="row" justifyContent="space-between"  >
                    <Typography fontWeight={300} >Scholar</Typography>
                    <Typography fontWeight={300} >Manager</Typography>
                </Stack>

                <LinearProgress variant="buffer" value={60} valueBuffer={100} />

                <Stack direction="row" justifyContent="space-between"  >
                    {/* Scholar */}
                    <Typography fontWeight={300} >{format(scholarSlp)} </Typography>

                    {/* Manager */}
                    <Typography fontWeight={300} >{format(managerSlp)}</Typography>
                </Stack>
                
                <Stack direction="row" justifyContent="space-between" marginBottom={1} >
                    <Stack>
                        <Typography fontSize={12} fontWeight={300} >60%</Typography>
                        <Typography fontSize={12} fontWeight={300} >
                            {toPhp(netWorth(scholarSlp, slpPrice))}
                        </Typography>
                    </Stack>

                    <Stack textAlign="right" >
                        <Typography fontSize={12} fontWeight={300} >40%</Typography>
                        <Typography fontSize={12} fontWeight={300} >
                            {toPhp(netWorth(managerSlp, slpPrice))}
                        </Typography>
                    </Stack>
                </Stack>

                <Button  variant="contained" fullWidth >
                    Update
                </Button>
            </Paper>
        </Container>
    )
}

export default Slp
