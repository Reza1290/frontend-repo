"use client";
import { store } from "@/store/store";
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { Provider } from "react-redux";


const ReduxProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const pathname = usePathname();
    useEffect(() => {
       
    }, [pathname])

    return (
        <Provider store={store}>{children}</Provider>
    )
};


export default ReduxProvider;