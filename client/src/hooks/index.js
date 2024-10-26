import { useEffect, useLayoutEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { setCookie } from "../utils/cookies";
import { CUR_PAGE_COOKIE } from "../constants";

// Хук для установления текущей страницы, удобен при рефреше
export const useSetCookie = () => {
    const location = useLocation();
    useEffect(
        () => {
            setCookie(CUR_PAGE_COOKIE, location.pathname);
        }, []
    );
}

export function useWindowSize() {
    const [size, setSize] = useState([0, 0]);
    useLayoutEffect(() => {
        function updateSize() {
            setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
    }, []);
    return size;
}