import React from 'react'
import ReactDOM from 'react-dom'
import { createMemoryHistory, createBrowserHistory } from 'history'
import App from './App'

const mount = (el, { onNavigate, defaultHistory, initialPath }) => {
    const history = defaultHistory || createMemoryHistory({
        initialEntries: [initialPath]
    })
    onNavigate && history.listen(onNavigate)
    ReactDOM.render(<App history={history} />, el)
    return {
        onParentNavigate({ pathname: nextPathName }) {
            
            const pathname = history.location.pathname
            console.log('marketing onParentNavigate', nextPathName, pathname)
            if (pathname !== nextPathName) {
                history.push(nextPathName)
            }
        }
    }
}

if (process.env.NODE_ENV === 'development') {
    const devRoot = document.querySelector('#_marketing-dev-root')
    if (devRoot) {
        mount(devRoot, {defaultHistory: createBrowserHistory()})
    }
}

export { mount }