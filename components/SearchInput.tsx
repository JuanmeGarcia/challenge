import SearchIcon from '@mui/icons-material/Search';
import { Button } from '@mui/material';
import { useEffect, useState } from 'react'
import { useSearchContext } from '../context/useSearchContext';

export const SearchInput = () => {
    const [isMobile, setIsMobile] = useState(false)

    const handleResize = () => {
        if(window.innerWidth <= 1052){
            setIsMobile(true)
        }else{
            setIsMobile(false)
        }
    }

    useEffect(() => {
        handleResize()
        window.addEventListener('resize', handleResize)

        return () => window.removeEventListener('resize', handleResize)
    }, [])

    const { search, handleSearch, handleOnSubmit } = useSearchContext();

    return (
        <form 
            className='search-form'
            onSubmit={handleOnSubmit}
        >   
        <div className='search-form__container'>
            <label htmlFor="search">
                <SearchIcon 
                    sx={{
                        color: '#B4B4B4',
                    }}
                    className="search-icon"
                />
            </label>
            <input 
                id='search'
                type="text" 
                placeholder="Buscar" 
                value={search}
                onChange={handleSearch}
            />
        </div>
        {
            !isMobile
                ? <Button 
                    variant="contained"
                    type="submit"
                    sx={{
                        backgroundColor: '#111',
                        padding: '0.5rem 1.5rem',
                        width: '176px',
                        height: '48px',
                        borderRadius: 20,
                    }}
                    >
                        Contained
                    </Button>
                : null
        }
        </form>
    )
}
