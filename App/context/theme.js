import { useContext, createContext, useState } from "react";

export const themeContext = createContext({theme: 'light', togleTheme: () => {}});

export function themeProvider(children){
    const [theme, setTheme] = useState('light');

    const togleTheme = () => {
        if (theme == 'dark') {
            setTheme('light');
        } else {
            setTheme('dark');
        } 
    };

    return (
        <themeContext.Provider value={{theme, togleTheme}}>
            {children}
        </themeContext.Provider>
    );

};
