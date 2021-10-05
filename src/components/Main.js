import React, { useEffect, useState } from 'react'
import Header from './Header/Header'
import { makeStyles } from '@mui/styles'
import { Container as MuiContainer } from '@mui/material'
import Section from './Section/Section'
import Login from './login/Login'
import { 
    BrowserRouter as Router,
    Switch,
    Route,
    Link,
    useHistory,
    useLocation
} from 'react-router-dom'
import Register from './login/Register'
import Container from './Container'
import axios from 'axios'

const style = makeStyles( (theme) => ({
    background: {
        // backgroundColor: "#0167c8",
        // backgroundColor: "",
        // height: '100vh',
        // background: 'linear-gradient(0deg, transparent 0, transparent 75%, #00b4d8 0, #00b4d8 100%)',
        // borderRadius: '20px'
    },
    header: {
        // position: 'relative'
    },
    card: {
        marginTop: '-20%'
    },
    section: {
        color: 'white'
    }
}) )

export default function Main() {
    const classes = style()
    const history = useHistory()
    const [ slpPrice, setSlpPrice ] = useState(0)
    useEffect( () => {
        // if(window.location.pathname === '/') {
        //     window.location.pathname = '/login'
        // }
        // fetch slp
        axios.get('https://api.coingecko.com/api/v3/simple/price?ids=smooth-love-potion&vs_currencies=php')
        .then( res => {
            // console.log(res.data.["smooth-love-potion"].php)
            setSlpPrice(res.data.["smooth-love-potion"].php)
        } )
        .catch( e => console.log(e) )
    }, [])

    return (
        <MuiContainer maxWidth="xs" className={classes.background} >
            <Router>
                <Switch>
                    <Route exact path='/' >
                        <Container slpPrice={slpPrice} />   
                    </Route>

                    <Route path="/login" component={Login} />
                    <Route path="/register" component={Register} />
                </Switch>
            </Router>
           
        </MuiContainer>
    )
}
