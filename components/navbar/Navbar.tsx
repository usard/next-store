'use client';
import Container from '../global/Container';
import Logo from './Logo';
import NavSearch from './NavSearch';
import CartButton from './CartButton';
import DarkMode from './DarkMode' 
import LinksDropdown from './LinksDropdown';
import {useState, useEffect} from 'react';
import  UserIcon  from './UserIcon';
import { Suspense } from 'react';



// export const isMobile = () => {
//     return /Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent) || window.innerWidth < 768;
// }

function Navbar() {
  const [isMobile, setIsMobile] = useState(/Mobi|Android|iPhone|iPad|iPod/i.test(navigator.userAgent));
  
  useEffect(()=>{
      const handleResize = () => {
          setIsMobile(window.innerWidth < 768)
      }

      window.addEventListener('resize', handleResize)

      return (()=>{
          window.removeEventListener('resize', handleResize)
      })

  },[])

  return (
    <nav className='border-b'> 
        <Container className='flex justify-between items-center  py-8' >
            <Logo />
            <Suspense>
              <NavSearch />
            </Suspense>
              {/* { 
                isMobile ? 
                  <Button asChild variant='outline' className='text-black' onClick={()=>{setIsMobile(true)}}>
                    <IoSearchSharp />
                  </Button>
                 : <NavSearch /> 
              } */}
            <div className='flex gap-4 items-center'>
                <CartButton />
                <DarkMode />
                <div className='flex gap-2'>
                  {/* <UserIcon /> */}
                  <LinksDropdown />
                </div>
            </div>
        </Container>
    </nav>
  )
}

export default Navbar;