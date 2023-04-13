import {renderHook, act} from '@testing-library/react-hooks';
import {useRateLimitChecker} from "./use-rate-limit-checker";

describe('useRateLimitChecker', () => {
    it('should return false if count is less than or equal to 5', () => {
        const {result, rerender} = renderHook((url: string[]) => useRateLimitChecker(url), {
            initialProps: ['http://example.com'],
        });
        expect(result.current).toStrictEqual([false]);
        for (let i = 0; i < 2; i++) {
            // eslint-disable-next-line testing-library/no-unnecessary-act
            act(() => {
                rerender(['http://example.com']);
            });
        }
        expect(result.current).toStrictEqual([false]);
    });
    it('should return true if count is greater than 5', () => {
        const {result, rerender} = renderHook((url: string[]) => useRateLimitChecker(url), {
            initialProps: ['http://example.com'],
        });
        expect(result.current).toStrictEqual([false]);
        for (let i = 0; i < 6; i++) {
            // eslint-disable-next-line testing-library/no-unnecessary-act
            act(() => {
                rerender(['http://example.com']);
            });
        }
        expect(result.current).toStrictEqual([true]);
    });
});

export {}
