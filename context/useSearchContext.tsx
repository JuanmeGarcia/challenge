import { FC, useContext, useEffect, useState } from "react";
import { createContext } from "react";
import { Card } from "../components";
import { getSpecificsGifs } from "../service";

interface Props {
    children: React.ReactNode;
}

const SearchContext = createContext({
    search: '',
    handleSearch: (e: React.ChangeEvent<HTMLInputElement>):void => {},
    searchedData: [],
    handleOnSubmit: (e: React.FormEvent<HTMLFormElement>):void => {},
    handleSearchedFavourites: (id: string):void => {},
    isloading: false,
})

export const SearchContextProvider: FC<Props> = ({children}) => {
    const [search, setSearch] = useState('');
    const [searchedData, setSearchedData] = useState<any>([]);
    const [query, setQuery] = useState('')
    const [isloading, setIsLoading] = useState(false)

    const handleSearch = (e: React.ChangeEvent<HTMLInputElement>):void => {
        setSearch(e.target.value);
    }

    const handleOnSubmit = (e: React.FormEvent<HTMLFormElement>):void => {
        e.preventDefault();
        setQuery(search.trim());
        setSearch(prevSearch => prevSearch.trim())
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
            setIsLoading(true);
            const { data } = await getSpecificsGifs(query);
            const cards: Card[] = data.map((card: any) => ({
                id: card.id,
                image: card.images.original.url,
                isFavourite: false
            }))
            setSearchedData(cards);
            setIsLoading(false);
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
            handleSearchedFavourites,
            isloading
        }}>
            {children}
        </SearchContext.Provider>
    )
}

export const useSearchContext = () => useContext(SearchContext);