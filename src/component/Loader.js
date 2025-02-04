import React from 'react'
import { ProgressBar } from 'react-loader-spinner'

function Loader() {
    return (
        <ProgressBar
            visible={true}
            height="80"
            width="80"
            barColor='#27374d'
            borderColor='#27374d'
            color="#4fa94d"
            ariaLabel="progress-bar-loading"
            wrapperStyle={{}}
            wrapperClass=""
        />
    )
}

export default Loader
