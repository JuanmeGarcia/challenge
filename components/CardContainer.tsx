import { FC } from "react";

interface Props {
    children: React.ReactNode;
}

export const CardContainer: FC<Props>  = ({ children }) => {
    return (
        <section 
            className="card-container"
        >
            {children}
        </section>
    )
}
