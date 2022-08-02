import React from "react"
import { TailSpin } from "react-loader-spinner"
import { spinnerColor } from "../constants/spinner"

interface ILoadingSpinner {
    height: string
    width: string
}

const style = { 
    position: 'fixed', 
    top: "50%", 
    left: "50%", 
    transform: "translate(-50%, -50%)" 
} as React.CSSProperties

const LoadingSpinner: React.FC<ILoadingSpinner> = ({...rest}) => {
    
    return (
        <div style={style}>
            <TailSpin {...rest} color={spinnerColor} /> 
        </div>
    )
}

export default LoadingSpinner;