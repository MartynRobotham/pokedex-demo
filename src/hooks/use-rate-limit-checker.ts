import {useEffect} from "react"

let count = 0;

export const useRateLimitChecker = (url: string) => {
    useEffect(() => {
        count++;
    }, [url])
    
    return [count > 5 ? true : false]
}
