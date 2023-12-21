import React from 'react'
import { category } from "../../feature/index";
import { Dropdown, DropdownItem } from 'flowbite-react';
import { useState, useEffect } from 'react';
import { Link } from "react-router-dom";

function Categorylist() {
    const [categories, setCategories] = useState([]); 
    useEffect(() => {
        category.getAllCategories().then((response)=>setCategories(response.data.categories))
    }, [])
    
  return (
      <div className='w-full h-11 box-border bg-gray-600 border-gray-500'>
          <ul className='  overflow-hidden flex-row space-x-8 md:font-medium pl-6 h-full pt-2 hidden lg:flex'>
              {categories.map((category) => (<Link key={category._id} to={`/categories/${category._id}`}><li  className="h-full border-b-transparent transition-all dark:border-b-transparent border-b-2  text-base text-slate-200  dark:border-gray-700 dark:text-gray-400 hover:border-white md:hover:bg-transparent hover:text-blue-500 dark:hover:border-white dark:hover:bg-transparent dark:hover:text-white">{category.name}</li></Link>))}
          </ul>
       <Dropdown label="" dismissOnClick={true} renderTrigger={() => <span className='lg:hidden block text-xl font-bold w-52 text-slate-200 items-center pt-2 pl-2 dark:border-gray-700 dark:text-gray-400  hover:text-blue-500 dark:hover:border-white dark:hover:bg-transparent dark:hover:text-white'>Shop by categories</span>}>
              {categories.map(category => (<Link key={category._id} to={`/categories/${category._id}`}><DropdownItem >{category.name}</DropdownItem></Link>))}
    </Dropdown>
          
   </div>
  )
}

export default Categorylist