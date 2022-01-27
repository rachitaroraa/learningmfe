import React from 'react'
import ReactDOM from 'react-dom'
import { createMemoryHistory, createBrowserHistory } from 'history'

import App from './App'

const mount = (el, { onSignIn, onNavigate, defaultHistory, initialPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    })
    if(onNavigate) {
        history.listen(onNavigate)
    }
    ReactDOM.render(<App history={history} onSignIn={onSignIn} />, el)
    return{
        onParentNavigate({ pathname: nextPathName}) {
            
            const {pathname} = history.location
            console.log('auth onParentNavigte', nextPathName, pathname)
            if(pathname !== nextPathName) {
                history.push(nextPathName)
            }
        }
    }
}

if (process.env.NODE_ENV === 'development') {
    const el = document.querySelector('#_auth-dev-div')
    if (el) {
        mount(el, { defaultHistory: createBrowserHistory() })
    }
}

export { mount }

