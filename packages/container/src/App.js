import React, { lazy, Suspense, useState } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import { StylesProvider, createGenerateClassName } from '@material-ui/core/styles'
import Header from './components/Header'
import Progress from './components/Progress'

const AuthAppLazy = lazy(() => import('./components/AuthApp'))
const MarketingAppLazy = lazy(() => import('./components/MarketingApp'))

const generateClassName = new createGenerateClassName({
    productionPrefix: 'co'
})
export default () => {
    const [isSignIn, setIsSignIn] = useState(false)
    return (
        <BrowserRouter>
            <StylesProvider generateClassName={generateClassName}>
                <div>
                    <Header onSignOut={() => setIsSignIn(false)} isSignIn={isSignIn} />
                    <Suspense fallback={<Progress />}>
                        <Switch>
                            <Route path='/auth' component={AuthAppLazy} >
                                <AuthAppLazy onSignIn={() => setIsSignIn(true)} />
                            </Route>
                            <Route path='/' component={MarketingAppLazy} />
                        </Switch>
                    </Suspense>
                </div>
            </StylesProvider>
        </BrowserRouter>
    )
}
