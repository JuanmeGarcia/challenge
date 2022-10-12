import { Skeleton } from "@mui/material"

export const SkeletonComponent = () => {

    const renderSkeletons = Array(15).fill(0).map((_, index) =>(
        <div 
            style={{
                position: 'relative',
            }}
            key={index}
        >
            <Skeleton
                sx={{ bgcolor: '#c3c3c3' }}
                variant="rectangular"
                width={400}
                height={300}
            />
            <Skeleton 
                variant="circular" 
                width={40} 
                height={40} 
                sx={{
                    position: 'absolute',
                    top: 30,
                    right: 30,
                }}
            />
        </div>
    ))

    return (
        <div
            style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(3, 2fr)',
                width: '100%',
                gap: '1rem',

            }}
        >
            {renderSkeletons}
        </div>
    )
}
