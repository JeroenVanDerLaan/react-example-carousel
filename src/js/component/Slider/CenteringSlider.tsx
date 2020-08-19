import './CenteringSlider.scss';
import * as React from 'react';
import UniqueKey from "../../utility/UniqueKey";

export interface CenteringSliderProps
{

}

const CenteringSlider: React.FunctionComponent<CenteringSliderProps> = props =>
{
    const [sliderLeftPosition, setSliderLeftPosition] = React.useState<number>(0);
    const children = React.Children.map<React.ReactNode, React.ReactNode>(props.children, renderChild);

    function renderChild(child: React.ReactChild): React.ReactNode
    {
        return <li
            className="centering-slider__slider__item"
            key={UniqueKey.generate()}
            onClick={(event: React.MouseEvent<HTMLSpanElement>) => {
                const newSliderLeftPosition = calculateSliderPositionX(event.currentTarget);
                setSliderLeftPosition(newSliderLeftPosition);
            }}
        >
            {child}
        </li>
    }

    return <div className="centering-slider">
        <ol
            className="centering-slider__slider"
            style={{
                left: sliderLeftPosition + 'px'
            }}
        >
            {children}
        </ol>
    </div>
}

//@TODO Refactor this into a more verbose implementation
function calculateSliderPositionX(item: Element): number
{
        const slider = item.parentElement;
        if (null === slider) {
            throw new Error('Slider item does not have a DOM parent element');
        }
        const container = slider.parentElement;
        if (null === container) {
            throw new Error('Slider does not have a DOM parent element');
        }

        const itemBounds = item.getBoundingClientRect();
        const sliderBounds = slider.getBoundingClientRect();
        const containerBounds = container.getBoundingClientRect();

        const sliderOffsetX = containerBounds.left - sliderBounds.left;
        const sliderOverflowX = sliderBounds.width - containerBounds.width;
        if (sliderOverflowX <= 0) {
            // slider has less width than container and thus can't move
            return 0;
        }

        const containerCenterX = containerBounds.left + (containerBounds.width / 2);
        const itemCenterX = itemBounds.left + (itemBounds.width / 2);
        const itemCenterOffsetX = containerCenterX - itemCenterX;

        if (itemCenterOffsetX <= 0) {
            // item has a higher center x than the container center x, slider x position decreases to center the item
            if (Math.abs(itemCenterOffsetX) + sliderOffsetX > sliderOverflowX) {
                // the item is too far left, slider x position can not go lower
                return 0 - sliderOverflowX;
            } else {
                return itemCenterOffsetX - sliderOffsetX;
            }
        } else {
            // item has a lower center x than the container center x, slider x position increases to center the item
            if (sliderOffsetX - itemCenterOffsetX <= 0) {
                // the item is too far right, slider x position can not go higher
                return 0;
            } else {
                return 0 - (sliderOffsetX - itemCenterOffsetX);
            }
        }
}

export default CenteringSlider;