import { FC } from 'react'
import {
    FavoriteBorder
} from '@mui/icons-material'

export interface Card{
    id: string;
    image: string,
    isFavourite: false
    handleFavourite: () => void
}

export const Card: FC<Card> = ({image, isFavourite, handleFavourite}) => {
    return (
        <div className='card'>
            <div
                className={`card-icon ${isFavourite ? 'card-icon--favourite' : ''}`}
                onClick={handleFavourite}
            >
                <FavoriteBorder 
                    sx={{
                        color: `${isFavourite ? '#fff' : '#000'}`
                    }}
                />
            </div>
            <img src={image} alt="imagen" />
        </div>
    )
}
