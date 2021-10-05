import React from 'react'
import { Container, Stack, Typography } from '@mui/material'
import Slp from './Slp'
import { makeStyles } from '@mui/styles'
import Quota from './Quota'
import Crypto from './Crypto'

const style = makeStyles( (theme) => ({
    overlap: {
        marginTop: '-10%',
        marginBottom: '20px'
    }
}) )

function Section({ slpPrice }) {
    const classes = style()
    return (
        <div className={classes.overlap} >
            <Stack spacing={2} >
                <Slp slpPrice={slpPrice} />
                <Quota />
                <Crypto slpPrice={slpPrice} />
            </Stack>
        </div>
    )
}

export default Section
