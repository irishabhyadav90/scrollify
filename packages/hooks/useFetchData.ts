import { useState } from 'react';

export const useFetchData = () => {
    const [counter, updateCounter] = useState(0);

    return {
        counter,
        updateCounter
    }
}

export default useFetchData;
