'use client'
import React, { useState, useEffect } from 'react';
import { Input } from '../ui/input';
import { useSearchParams, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';


function NavSearch() {
  const {replace, push} = useRouter();
  const searchParams = useSearchParams();
  const [search, setSearch] = useState(searchParams.get('search')?.toString() || '' );

  const handleSearch = useDebouncedCallback((value:string)=>{
    const params = new URLSearchParams(searchParams); // useSearchPararams will get current url params, with useSearchparams we cannot modify the query params but with URLSearchParams we can modify the query params
    if (value) {
      setSearch(value);
      params.set('search', value);
    }
    else{
      params.delete('search')   
    }
    push(`/products?${params.toString()}`); // will replace the current browser history with this route so that if you route back it wont have no difference
  },500)

    useEffect(() => {
      if (!searchParams.get('search')) {
        setSearch('');
      }
    }, [searchParams.get('search')]);

  return (
    <Input type='search' 
           placeholder='search product...' 
           className='max-w-[40%] sm:max-w-xs lg:max-w-xl transition-all duration-300 ease-in-out dark:bg-muted' // on dark mode background will be muted
           onChange={(e)=>{setSearch(e.target.value); handleSearch(e.target.value)}}
           value={search}
    />
  )
}

export default NavSearch;