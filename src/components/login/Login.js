import React, { useState } from 'react'
import { Box, Button, Divider, FormControl, InputAdornment, Paper, Select, Stack, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import { LoadingButton } from '@mui/lab'
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { useHistory } from 'react-router-dom';
import axios from 'axios'
import { baseUrl } from '../utils'

const style = makeStyles( theme => ({
    img: {
        height: '200px',
        width: '50%',
        margin: 'auto'
    },
    paper: {
        // height: '80vh',
        borderRadius: '20px',
        padding: '20px 20px',
        margin: '40px 0'
    },
    login: {
        padding: '40px 0'
    },
    acc: {
        marginTop: theme.spacing(5),
        marginBottom: theme.spacing(5)
    },
    submit: {
        marginTop: '20px'
    }
}) )

const Login = () => {
    const classes = style()
    const history = useHistory()
    const [ user, setUser ] = useState({
        username: '',
        password: ''
    })
    const [ loading, setLoading ] = useState(false)
    const [ error, setError ] = useState(false)
    const [ errMsg, setErrMsg ] = useState("")

    const handleSubmit = e => {
        e.preventDefault()
        setError(false)
        if(user.username.trim().length >= 3 && user.password.trim().length >= 3) {
            // submit form
            setLoading(true)
            axios.post(baseUrl + 'login', user)
            .then( res => {

                if(res.data.result.success) {
                    const { role, username, total_slp } = res.data.result
                    localStorage.setItem("role", role)
                    localStorage.setItem("username", username)
                    localStorage.setItem("total_slp", total_slp)
                    history.push('/')
                } else {
                    setError(true)
                    setErrMsg(res.data.result.msg)
                }
               
                setLoading(false)
            } )
            .catch( e => {
                console.log(e)
            } )
        } else {
            setError(true)
        }
    }

    return (
        <Paper className={classes.paper} style={{ borderRadius: '10px' }} >
            <div className={classes.login} >
                <Divider>
                <Typography variant="h4" fontWeight={600} align="center" >LogIn</Typography>
                </Divider>
            </div>

            {/* error message */}
            <div className="class">
                { error && <Typography color="red" align="center" >Error: {errMsg}</Typography> }
            </div>

            <form onSubmit={handleSubmit} >
                <FormControl fullWidth variant="outlined" >
                    <div className={classes.acc} >
                        <Stack spacing={4} direction="column" height="100%" justifyContent="flex-end" >
                            <TextField 
                                label="Username" 
                                variant="outlined"
                                size="medium"
                                placeholder="Username"
                                helperText="Username must be 3characters long"
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start" >
                                            <PersonOutlineIcon />
                                        </InputAdornment>
                                    )
                                }}
                                value={user.username}
                                onChange={ e => setUser({ ...user, username: e.target.value }) }
                            />

                            <TextField 
                                label="Password" 
                                variant="outlined"
                                size="medium"
                                placeholder="Password"
                                type="password"
                                required
                                InputProps={{
                                    startAdornment: (
                                        <InputAdornment position="start" >
                                            <LockOutlinedIcon />
                                        </InputAdornment>
                                    )
                                }}
                                value={user.password}
                                onChange={ e => setUser({ ...user, password: e.target.value }) }
                            />
                        </Stack>
                    </div>

                    <div className={classes.submit}>
                        <LoadingButton 
                            component={Button}
                            variant="contained" 
                            fullWidth 
                            size="large" 
                            loading={loading}
                            type="submit"
                            // loadingIndicator="Submitting..." 
                            // loadingPosition="start"
                        >
                            Login
                        </LoadingButton>
                    </div>

                </FormControl>
            </form>

            <Divider style={{ margin: '20px 0' }} >or</Divider>

            <div className="class">
                <Button color="warning" fullWidth onClick={ () => history.push('/register') } >register</Button>
            </div>
        </Paper>
    )
}

export default Login
