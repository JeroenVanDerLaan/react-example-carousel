import './CenteringSlider.scss';
import * as React from 'react';
import NumberRange from "../../utility/NumberRange";
import UniqueKey from "../../utility/UniqueKey";

export interface CenteringSliderProps
{
    index: number;
}

const CenteringSlider: React.FunctionComponent<CenteringSliderProps> = props =>
{
    const [sliderLeftPosition, setSliderLeftPosition] = React.useState<number>(0);
    const itemRefs: React.MutableRefObject<HTMLLIElement>[] = [];

    React.useLayoutEffect(() => {
        const index = NumberRange.clamp(0, itemRefs.length - 1, props.index);
        const item = itemRefs[index].current;
        const position = calculateSliderPositionX(item);
        setSliderLeftPosition(position);
    }, [props.index]);

    function renderChildren(): React.ReactNode
    {
        const children: React.ReactNode[] = []
        React.Children.forEach<React.ReactNode>(props.children, (child: React.ReactNode, index: number) => {
            itemRefs[index] = React.useRef<HTMLLIElement>(document.createElement('li'));
            children.push(<li
                className="centering-slider__slider__item"
                key={UniqueKey.generate()}
                ref={itemRefs[index]}
            >
                {child}
            </li>);
        });
        return children;
    }

    return <div className="centering-slider">
        <ol
            className="centering-slider__slider"
            style={{
                left: sliderLeftPosition + 'px'
            }}
        >
            {renderChildren()}
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