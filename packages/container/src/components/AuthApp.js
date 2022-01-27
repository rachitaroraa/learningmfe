import { mount } from 'auth/AuthApp';
import React, {useRef, useEffect} from 'react';
import { useHistory } from 'react-router-dom';

const AuthApp = ({onSignIn}) => {
    const ref = useRef(null);
    const history = useHistory()

    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            initialPath: history.location.pathname,
            onSignIn: () => {
                console.log('inside on sign in')
                onSignIn()
            },
            onNavigate: ({ pathname: nextPathName}) => {
                const pathname = history.location
                console.log('container authApp onNavigate', nextPathName, pathname)
                if(pathname !== nextPathName) {
                    history.push(nextPathName)
                }
            }
        }) 
        history.listen(onParentNavigate)
    }, [])

    return <div ref={ref}></div>
}

export default AuthApp