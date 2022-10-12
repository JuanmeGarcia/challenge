import axios from "axios";
import { FC, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { Card } from "../components";

interface SearchContextType {
    search: string;
    setSearch: (search: string) => void;
}

interface Props {
    children: React.ReactNode;
}

const SearchContext = createContext({
    search: '',
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>):void => {},
    searchedData: [],
    handleOnSubmit: (e: React.FormEvent<HTMLFormElement>):void => {},
    handleSearchedFavourites: (id: string):void => {},
})

export const SearchContextProvider: FC<Props> = ({children}) => {
    const [search, setSearch] = useState('');
    const [searchedData, setSearchedData] = useState<any>([]);
    const [query, setQuery] = useState('')

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setSearch(e.target.value);
    }

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
        setQuery(search);
    }

    const handleSearchedFavourites = (id: string) => {
        setSearchedData((prevSearchedData: Card[]) => (
            prevSearchedData.map((card: Card) => ({
                ...card,
                isFavourite: card.id === id 
                ? !card.isFavourite 
                : card.isFavourite
            }))
        ))
    }

    const getData = async () => {
        try {
            const { data } = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=HC5YScnd2Kws9G5xAgZFUAC0XGj16Xse&q=${query}`)
            const cards: Card[] = data.data.map((card: any) => ({
                id: card.id,
                image: card.images.original.url,
                isFavourite: false
            }))
            setSearchedData(cards);
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getData();
    }, [query])

    return (
        <SearchContext.Provider value={{
            search,
            handleSearch,
            searchedData,
            handleOnSubmit,
            handleSearchedFavourites
        }}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchContext = () => useContext(SearchContext);