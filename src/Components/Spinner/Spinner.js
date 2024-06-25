import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom';

function Spinner() {
    const [count, setCount] = useState(5);
    const navigate = useNavigate();

    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue);
        }, 1000);
        count === 0 && navigate("/login")
        return () => clearInterval(interval)
    }, [count, navigate])
    return (
        <div>
            <h1>REDIRECTING TO YOU IN {count}</h1>
        </div>
    )
}

export default Spinner;