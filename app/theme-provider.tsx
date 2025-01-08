'use client';

import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';


export default function ThemeProvider({ children, ...props }: any) {
  return <NextThemesProvider {...props}>{children}</NextThemesProvider>;
}

// export default function ThemeProvider( {children}:any ) {
//   return <NextThemesProvider > {children}</NextThemesProvider>;
// }


























// 'use client';
// import React from 'react'
// import {ThemeProvider as NextThemeProvider} from 'next-themes';
// import { ThemeProviderProps } from 'next-themes';


// function ThemeProvider({children, ...props}: ThemeProviderProps) {
//   return (
//     <NextThemeProvider {...props}>
//         {children}
//     </NextThemeProvider>
//   )
// }

// export default ThemeProvider;