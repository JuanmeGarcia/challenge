import axios from 'axios'

export const getTrendingGifs = async () => {
    const { data } = await axios.get('https://api.giphy.com/v1/gifs/trending?api_key=HC5YScnd2Kws9G5xAgZFUAC0XGj16Xse')

    return data
}

export const getSpecificsGifs = async (query: string) => {
    const { data } = await axios.get(`https://api.giphy.com/v1/gifs/search?api_key=HC5YScnd2Kws9G5xAgZFUAC0XGj16Xse&q=${query}`)

    return data
}