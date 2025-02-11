import React, { useEffect, useState } from 'react'

const useDebonceValue = (input, delay) => {
    const [debounceValue, setDebonceValue] = useState(input);

    useEffect(() => {
        const timeout = setTimeout(() => {
            setDebonceValue(input);
        }, delay);

        return () => {
            clearTimeout(timeout);
        }
    }, [input])

    return debounceValue
}

export default useDebonceValue