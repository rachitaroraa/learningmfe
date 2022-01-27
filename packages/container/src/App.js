import React, { lazy, Suspense, useEffect, useState } from 'react'
import { Router, Route, Switch, Redirect } from 'react-router-dom'
import { createBrowserHistory } from 'history'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import Header from './components/Header'
import Progress from './components/Progress'

const AuthAppLazy = lazy(() => import('./components/AuthApp'))
const MarketingAppLazy = lazy(() => import('./components/MarketingApp'))
const DashboardAppLazy = lazy(() => import('./components/DashboardApp'))

const generateClassName = new createGenerateClassName({
    productionPrefix: 'co'
})
const history = createBrowserHistory()

export default () => {
    
    const [isSignIn, setIsSignIn] = useState(false)
    useEffect(() => {
        if(isSignIn) {
            history.push('/dashboard')
        }
    })
    return (
        <Router history={history}>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header onSignOut={() => setIsSignIn(false)} isSignIn={isSignIn} />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path='/auth' component={AuthAppLazy} >
                                <AuthAppLazy onSignIn={() => setIsSignIn(true)} />
                            </Route>
                            <Route path={"/dashboard"}>
                                {!isSignIn && <Redirect to="/" />}
                                <DashboardAppLazy />
                            </Route>
                            <Route path='/' component={MarketingAppLazy} />
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </Router>
    )
}
