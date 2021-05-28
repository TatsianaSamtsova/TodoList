import React, {useEffect} from 'react'
import './App.css'
import {AppBar, Button, Container, IconButton, LinearProgress, Toolbar, Typography} from '@material-ui/core'
import {Menu} from '@material-ui/icons'
import {TodolistsList} from '../features/TodolistsList/TodolistsList'
import {ErrorSnackbar} from '../components/ErrorSnackbar/ErrorSnackbar'
import {useDispatch, useSelector} from 'react-redux'
import {AppRootStateType} from './store'
import {initializeAppTC, RequestStatusType} from './app-reducer'
import {Login} from "../features/Login/Login";
import {Redirect, Route, Switch } from 'react-router-dom'

type PropsType = {
    demo?: boolean
}

function App({demo = false}: PropsType) {
    const dispatch= useDispatch()

    useEffect(() => {
        dispatch(initializeAppTC())}, [])

    const status = useSelector<AppRootStateType, RequestStatusType>((state) => state.app.status)
    return (
        <div className="App">
            <ErrorSnackbar />
            <AppBar position="static">
                <Toolbar>
                    <IconButton edge="start" color="inherit" aria-label="menu">
                        <Menu/>
                    </IconButton>
                    <Typography variant="h6">
                        News
                    </Typography>
                    <Button color="inherit">Login</Button>
                </Toolbar>
             { status === 'loading' &&  <LinearProgress /> }
            </AppBar>
            <Container fixed>
            <Switch>
                <Route exact path={'/'} render={()=><TodolistsList demo={demo}/>}/>
                <Route path={'/login'} render={()=> <Login/>}/>
                <Route path={'/404'} render={()=> <h1 style = {{textAlign: 'center', fontSize: '80px'}}>404. Page not found</h1>}/>
                <Redirect from = {'*'} to = {'/404'}/>
            </Switch>
            </Container>
        </div>
    )
}

export default App
