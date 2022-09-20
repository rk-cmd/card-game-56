import React from 'react'
import './ToggleSwitch.css'

// import App from '../../../../App'

const ToggleSwitch = ({ item, handler}) => {    

    // const t = (e) => {debugger; App.testertheme()}

    return (
        <label className="switch">
            <input id={item} type="checkbox" onChange={(e) => handler.toggleSwitchHandler(e)}/>
            <span className="slider round"></span>
        </label>
    )
}

export default ToggleSwitch
