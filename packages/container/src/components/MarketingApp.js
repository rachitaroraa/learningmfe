import { mount } from 'marketing/MarketingApp'
import React, { useRef, useEffect } from "react";
import { useHistory } from 'react-router-dom';

const MarketingApp = () => {
    const ref = useRef(null);
    const history = useHistory()
    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            initialPath: history.location.pathname,
            onNavigate: ({ pathname: nextPathName }) => {
                
                const pathname = history.location
                console.log('marketing onNavigate', nextPathName, pathname)
                if (pathname !== nextPathName) {
                    history.push(nextPathName)
                }

            }
        })
        history.listen(onParentNavigate)
    }, [])
    return <div ref={ref}></div>
}

export default MarketingApp