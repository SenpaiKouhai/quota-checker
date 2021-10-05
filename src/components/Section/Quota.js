import React, { useState, useEffect } from 'react'
import { Avatar, Box, Button, Container, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Stack, TextField, Typography } from '@mui/material'
import { makeStyles } from '@mui/styles'
import AddIcon from '@mui/icons-material/Add';
import axios from 'axios';
import { baseUrl } from '../utils'
import { LoadingButton } from '@mui/lab'
import { useLocation } from 'react-router-dom';
import moment from 'moment'

const style = makeStyles( (theme) => ({
    card: {
        // backgroundColor: 'white',
        // borderRadius: '10px',
        // width: '100%',
        // padding: '10px 12px'
    },
    avatar: {
        // paddingTop: '13px',
        // width: '80px',
        // height: '50px',
        // borderRadius: '50%',
    },
    quota: {
        textAlign: 'right',
        marginTop: '10px',
    },
    btn: {
        backgroundColor: '#fc00ff',
        // color: 'white',
        // '&:hover': {
        //     backgroundColor: '#e85d04',
        //     // backgroundColor: 'white'
        // }
    },
    txt: {
        color: "white"
    }
}) )


const Circle = ({ number, date }) => {
    const classes = style()
    return (
        <Stack direction="column" alignItems="center" width="100%" >
            <Avatar
                className={classes.avatar}
                sizes="large"
                sx={{ width: 50, height: 50, backgroundColor:'white' }}
            >
                <Typography align="center" fontWeight={500}  >{number}</Typography>
            </Avatar>
            <Typography variant="body2" fontWeight={300} style={{ color: 'white' }} >
                {date === moment().format('ll') ? "Today" : date }
            </Typography>
        </Stack>
    )
}

const List = ({ quotaList, isSubmit }) => {
    // const [ list, setList ] = useState(quotaList)

    // useEffect( () => {
    //     console.log(quotaList)
    //     if(list.length >= 3) {
    //         setList(list.slice(0,3))
    //     } else {
    //         setList(list)
    //     }
    // }, [quotaList] )
    
    return (
        <React.Fragment>
            <Stack direction="row" justifyContent="space-around" >
                { !isSubmit && <Circle number={"?"} date={moment().format('ll')} /> } 

                { quotaList.map( (i,index) => (
                    <React.Fragment key={index} >
 
                        <Circle number={i.daily} date={i.date_added} />
                        
                    </React.Fragment>
                ) ) }
                {/* <Circle number={"?"} date="Today" />
                <Circle number={219} date="2021-10-02" />
                <Circle number={233} date="2021-10-01" /> */}
            </Stack>
        </React.Fragment>
    )
}

const Quota = () => {
    const classes = style()
    const location = useLocation()
    const [ user, setUser ] = useState({})
    const [ open, setOpen] = useState(false)
    const [ isSubmit, setIsSubmit ] = useState(localStorage.getItem("didSubmitToday"))
    const [ quota, setQuota ] = useState("")
    const [ resubmitQuota, setResubmitQuota ] = useState("")
    const [ submitting, setSubmitting ] = useState(false)
    const [ error, setError ] = useState(false)
    const [ loading, setLoading ] = useState(true)

    useEffect( () => {
        if(localStorage.getItem("submitDate") === moment().format('ll')) {
            setIsSubmit(true)
        } else {
            setIsSubmit(false)
        }
        let slice = isSubmit ? 3 : 2
        axios.get(baseUrl + 'quota-list/' + localStorage.getItem("username")  + '/' + slice )
        .then( res => {
            setUser(res.data.user)
            setLoading(false)
            
        } )
        .catch( e => {
            console.log(e)
            setError(true)
            setLoading(false)
        } )
    }, [])

    const handleOpen = () => {
        setOpen(true)
    }
    const handleClose = () => {
        setOpen(false)
    }

    const handleSubmit= e => {
        e.preventDefault()
        // only submit if quota is 75 and up
        if(quota > 74 ) {
            setSubmitting(true)
            console.log("Submitting quota...")

            axios.post(baseUrl + 'submit-quota', { username: localStorage.getItem('username'), quotaToday: quota })
            .then( res => {
                console.log(res.data)
                // record submit date
                const submitDate = moment().format('ll')
                localStorage.setItem('submitDate', submitDate)
                localStorage.setItem('didSubmitToday', true)

                localStorage.setItem("total_slp", res.data.user.total_slp)
                setSubmitting(false)
                setOpen(false)
                // refresh the page to do update
                window.location.reload()
            } )
            .catch( e => {
                console.log(e)
                setError(true)
            } )
        } else {
            setError(true)
        }
    }

    const handleResubmit = e => {
        e.preventDefault()
        if(resubmitQuota > 74 && Number(resubmitQuota) !== Number(user.quota[0].daily) ) {
            setSubmitting(true)
            console.log("Submitting quota...")

            axios.post(baseUrl + 'resubmit-quota', { username: localStorage.getItem('username'), date: moment().format('ll'), editQuota: resubmitQuota })
            .then( res => {
                console.log(res.data)
                // record submit date
                const submitDate = moment().format('ll')
                localStorage.setItem('submitDate', submitDate)
                localStorage.setItem('didSubmitToday', true)

                localStorage.setItem("total_slp", res.data.user.total_slp)
                setSubmitting(false)
                setOpen(false)
                // refresh the page to do update
                window.location.reload()
            } )
            .catch( e => {
                console.log(e)
                setError(true)
                setSubmitting(false)
            } )
        } else {
            setError(true)
        }
    } 

    return loading ? "Loading..." : (
        <Box className={classes.card} >
            <Typography variant="h6" marginBottom={1} style={{ color: 'white' }} >Quota</Typography>

            <Container>
                {/* pass quota list */}
                <List quotaList={user.quota} isSubmit={isSubmit} />

                <div className={classes.quota}>
                    <Button onClick={handleOpen} variant="contained" color={ !isSubmit ? "warning" : "error" } className={classes.btn}  >
                        { !isSubmit ? "Submit Quota" : "Resubmit" }
                    </Button>
                </div>

            </Container>
            
            <div >
                <Dialog open={ submitting ? true : open} onClose={handleClose} maxWidth="xs" >
                    { !isSubmit ? 
                    <form onSubmit={handleSubmit} method="POST" >
                        <DialogTitle>Daily Report</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                            After submitting it will automatically update your total slp. If you submit a wrong quota click resubmit.
                            </DialogContentText>
                            <Stack spacing={1} marginTop={2} direction="row" alignItems="center"  >
                                <Typography>Quota: </Typography>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    inputProps={{ inputMode: 'numeric', maxLength: 3  }}
                                    value={quota}
                                    onChange={ e => setQuota(e.target.value) }
                                />
                            </Stack>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="text" color="warning" onClick={handleClose}>Cancel</Button>
                            <LoadingButton 
                                component={Button}
                                variant="contained" 
                                loading={submitting}
                                type="submit"
                            >
                                Submit
                            </LoadingButton>
                        </DialogActions>
                    </form>

                    :
                    <form onSubmit={handleResubmit} method="POST" >
                        <DialogTitle>Resubmit Quota</DialogTitle>
                        <DialogContent>
                            <DialogContentText>
                                Please input the correct amount of slp this time to avoid miscalculations to database.
                                
                                
                            </DialogContentText>
                            <DialogContentText fontWeight="bold" >
                                Date: {user.quota[0].date_added}
                            </DialogContentText>
                            <DialogContentText fontWeight="bold" >
                                You previous quota: {user.quota[0].daily}
                            </DialogContentText>
                            <Stack spacing={1} marginTop={2} direction="row" alignItems="center"  >
                                <Typography>Resubmit: </Typography>
                                <TextField
                                    autoFocus
                                    margin="dense"
                                    type="number"
                                    variant="outlined"
                                    size="small"
                                    inputProps={{ inputMode: 'numeric', maxLength: 3  }}
                                    value={resubmitQuota}
                                    onChange={ e => setResubmitQuota(e.target.value) }
                                />
                            </Stack>
                        </DialogContent>
                        <DialogActions>
                            <Button variant="text" color="warning" onClick={handleClose}>Cancel</Button>
                            <LoadingButton 
                                component={Button}
                                variant="contained" 
                                loading={submitting}
                                type="submit"
                            >
                                Submit
                            </LoadingButton>
                        </DialogActions>
                    </form>
                    }
                </Dialog>
            </div>
        </Box>
    )
}

export default Quota
