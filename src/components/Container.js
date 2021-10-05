import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import Header from './Header/Header'
import Section from './Section/Section'

const Container = ({ slpPrice }) => {
    const history = useHistory()
    useEffect( () => {
        if( !localStorage.getItem("username") ) {
            history.push('/login')
        }
    }, [])

    return (
        <React.Fragment>
            <div >
                <Header slpPrice={slpPrice} />
            </div>

            <div >
                <Section slpPrice={slpPrice} />
            </div>   
        </React.Fragment>
    )
}

export default Container
