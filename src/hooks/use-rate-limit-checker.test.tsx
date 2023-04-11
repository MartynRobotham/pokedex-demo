// import { renderHook, act } from '@testing-library/react-hooks';
// import {useRateLimitChecker} from "./use-rate-limit-checker";
//
// describe('useRateLimitChecker', () => {
//     it('should return false if count is less than or equal to 5', () => {
//         const { result, rerender } = renderHook((url: string[]) => useRateLimitChecker(url), {
//             initialProps: ['http://example.com'],
//         });
//         expect(result.current).toBe(false);
//
//         act(() => {
//             rerender(['http://example.com']);
//         });
//         expect(result.current).toBe(true);
//     });
//
//     it('should return true if count is greater than 5', () => {
//         const { result, rerender } = renderHook((url: string[]) => useRateLimitChecker(url), {
//             initialProps: ['http://example.com'],
//         });
//         expect(result.current).toBe(false);
//
//         act(() => {
//             for (let i = 0; i < 6; i++) {
//                 rerender(['http://example.com']);
//             }
//         });
//         expect(result.current).toBe(true);
//     });
//
//     it('should reset the count when the url changes', () => {
//         const { result, rerender } = renderHook((url: string[]) => useRateLimitChecker(url), {
//             initialProps: ['http://example.com'],
//         });
//         expect(result.current).toBe(false);
//
//         act(() => {
//             for (let i = 0; i < 6; i++) {
//                 rerender(['http://example.com']);
//             }
//         });
//         expect(result.current).toBe(true);
//
//         act(() => {
//             rerender(['http://example.org']);
//         });
//         expect(result.current).toBe(false);
//     });
// });

export {}
