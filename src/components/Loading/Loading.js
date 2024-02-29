import React, { useEffect, useState } from 'react'
import './Loading.css'

const Loading = ({ children, condition }) => {

    const [isLoading, setLoading] = useState(true)

    useEffect(() => {
        if (typeof condition === 'boolean') {
            setLoading(condition)
        } else if (Array.isArray(condition)) {
            setLoading(condition.length === 0)
        } else if (typeof condition === 'object' && condition !== null) {
            setLoading(Object.keys(condition).length === 0)
        } else {
            setLoading(false)
        }
    }, [condition])

    return (
        isLoading ? <div className="spinner absolute top-1/2 left-1/2"></div> : children
    )
}

export default Loading