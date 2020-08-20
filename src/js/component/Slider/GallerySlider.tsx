import "./GallerySlider.scss"
import * as React from 'react';
import useCarouselTransition, {GallerySliderTransition} from "../../hook/GallerySliderTransition";
import {NonEmptyArray} from "../../utility/NonEmptyArray";
import UniqueKey from "../../utility/UniqueKey";

export type GallerySliderItems = NonEmptyArray<React.ReactNode>;

export interface GallerySliderProps
{
    items: GallerySliderItems;
    index?: number;
}

const GallerySlider: React.FunctionComponent<GallerySliderProps> = props =>
{
    const index: number = props.index ? props.index : 0;
    const transition: GallerySliderTransition = useCarouselTransition(props.items.length, 0);

    React.useLayoutEffect(() => {
        transition.slideTo(index);
    }, [props.index]);

    function renderItems(): JSX.Element[]
    {
        const items: JSX.Element[] = [];
        props.items.forEach((item: React.ReactNode) => {
            items.push(<div
                className="gallery-slider__container__item"
                key={'gallery-slider-item-' + UniqueKey.generate()}
            >
                {item}
            </div>);
        });
        return items;
    }

    return <aside className="gallery-slider">
        <div
            className="gallery-slider__container"
            style={transition.style}
        >
            {renderItems()}
        </div>
    </aside>
}

export default GallerySlider;