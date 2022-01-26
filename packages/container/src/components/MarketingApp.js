import { mount } from 'marketing/MarketingApp'
import React, { useRef, useEffect } from "react";
import { useHistory } from 'react-router-dom';

const MarketingApp = () => {
    const ref = useRef(null);
    const history = useHistory()
    useEffect(() => {
        const { onParentNavigate } = mount(ref.current, {
            onNavigate: ({ pathname: nextPathName }) => {
                console.log('Navigation captured', location)
                const pathname = history.location
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