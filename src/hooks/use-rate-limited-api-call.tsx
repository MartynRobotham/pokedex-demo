import {useState, useEffect} from 'react';

export const useRateLimitedApiCall = (apiRequest: string, limit: number, interval: number | undefined) => {
    const [response, setResponse] = useState(null);
    const [error, setError] = useState<any>(null);

    useEffect(() => {
        let timerId: string | number | NodeJS.Timeout | undefined;
        let count = 0;

        const makeRequest = () => {
            try {
                fetch(apiRequest).then((data) => {
                    data.json().then((res) => {
                        setResponse(res)
                    })
                });
            } catch (err) {
                setError(err);
            }
        };

        const handleTimer = async () => {
            if (count < limit) {
                await makeRequest();
                count += 1;
                timerId = setTimeout(handleTimer, interval);
            }
        };

        handleTimer();

        return () => {
            clearTimeout(timerId);
        };
    }, []);

    return {response, error};
}
