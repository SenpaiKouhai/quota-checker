import React, { useEffect, useState } from 'react'
import { makeStyles } from '@mui/styles'
import { Avatar, Container, Paper, Stack, Typography } from '@mui/material'
import { toPhp } from '../utils'
import axios from 'axios'

const style = makeStyles( (theme) => ({
    paper: {
        padding: '15px',
        borderRadius: '10px'
    }
}) )

const Coin = ({ name, img, price }) => {
    const classes = style()
    return (
        <Paper className={classes.paper} >
            <Stack direction="row" spacing={2} >
                <Avatar 
                    alt={NamedNodeMap}
                    src={img}
                    variant="square"
                />
                <Stack>
                    <Typography fontWeight="bold" >{name}</Typography>
                    <Typography fontSize={12} >Price: {toPhp(price)}</Typography>
                </Stack>
            </Stack>
        </Paper>
    )
}

const Crypto = ({ slpPrice }) => {
    const [ axs, setAxs ] = useState(0)
    const [ eth, setEth ] = useState(0)
    useEffect( () => {
        axios.all([
            axios.get('https://api.coingecko.com/api/v3/simple/price?ids=axie-infinity&vs_currencies=php'),
            axios.get('https://api.coingecko.com/api/v3/simple/price?ids=ethereum&vs_currencies=php')
        ])
        .then( axios.spread(( data1, data2 ) => {
            setAxs(data1.data.["axie-infinity"].php)
            setEth(data2.data.["ethereum"].php)
        }) )
        .catch( e => console.log(e) )
    }, [] )

    return (
        <div>
            <Typography variant="h6" marginBottom={2} style={{ color: "white" }} >Crypto</Typography>

            <Container>
                <Stack spacing={3} >
                    <Coin 
                        name="AXS" 
                        price={axs} 
                        img="https://assets.coingecko.com/coins/images/13029/small/axie_infinity_logo.png?1604471082" 
                    />
                    <Coin 
                        name="SLP" 
                        price={slpPrice} 
                        img="https://assets.coingecko.com/coins/images/10366/small/SLP.png?1578640057" 
                    />
                    <Coin 
                        name="ETH" 
                        price={eth} 
                        img="https://assets.coingecko.com/coins/images/279/small/ethereum.png?1595348880" 
                    />
                </Stack>
            </Container>
        </div>
    )
}

export default Crypto
