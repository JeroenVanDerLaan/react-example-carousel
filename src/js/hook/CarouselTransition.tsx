import * as React from "react";
import NumberRange from "../utility/NumberRange";

export type CarouselTransition = {
    readonly index: number;
    readonly style: React.CSSProperties;
    readonly slideTo: (index: number) => void;
}

const useCarouselTransition = (itemCount: number, initialIndex: number = 0): CarouselTransition =>
{
    const [currentIndex, setCurrentIndex] = React.useState<number>(initialIndex);
    const highestIndex: number = Math.max(itemCount - 1, 0);

    return {
        index: currentIndex,
        style: {
            left: -100 * currentIndex + '%'
        },
        slideTo: (index: number) => {
            index = NumberRange.clamp(0, highestIndex, index);
            setCurrentIndex(index);
        }
    };
};

export default useCarouselTransition;