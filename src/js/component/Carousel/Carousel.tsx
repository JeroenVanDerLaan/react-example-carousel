import "./Carousel.scss"
import * as React from 'react';
import useCarouselTransition, {CarouselTransition} from "../../hook/CarouselTransition";
import {NonEmptyArray} from "../../utility/NonEmptyArray";
import UniqueKey from "../../utility/UniqueKey";

export type CarouselItems = NonEmptyArray<React.ReactNode>;

export interface CarouselProps
{
    items: CarouselItems;
    index?: number;
}

const Carousel: React.FunctionComponent<CarouselProps> = props =>
{
    const index: number = props.index ? props.index : 0;
    const transition: CarouselTransition = useCarouselTransition(props.items.length, 0);

    React.useLayoutEffect(() => {
        transition.slideTo(index);
    }, [props.index]);

    function renderItems(): JSX.Element[]
    {
        const items: JSX.Element[] = [];
        props.items.forEach((item: React.ReactNode) => {
            items.push(<div
                className="carousel__container__item"
                key={'carousel-item-' + UniqueKey.generate()}
            >
                {item}
            </div>);
        });
        return items;
    }

    return <aside className="carousel">
        <div
            className="carousel__container"
            style={transition.style}
        >
            {renderItems()}
        </div>
    </aside>
}

export default Carousel;