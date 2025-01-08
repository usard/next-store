'use client';
import  ThemeProvider  from './theme-provider';
import { Toaster } from '@/components/ui/toaster';
function Providers({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Toaster />
      <ThemeProvider
        attribute='class'
        defaultTheme='system'
        enableSystem
        disableTransitionOnChange
      >
        {children}
      </ThemeProvider>
    </>
  );
}
export default Providers;












// 'use client';
// import React from 'react';
// import ThemeProvider from './theme-provider';


// function Providers({children}:{children: React.ReactNode}) {
//   return (
//     <>
//     <ThemeProvider
//         attribute='class' // this is used to apply theme (light or dark css class) to html element
//         defaultTheme='system'
//         enableSystem
//         disableTransitionOnChange
//     >
//       {children}
//     </ThemeProvider>
//     </>
//   )
// }


// export default Providers;