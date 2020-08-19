import * as React from 'react';
import UniqueKey from "../../utility/UniqueKey";
import TextButton from "../Button/TextButton";
import CenteringSlider from "../Slider/CenteringSlider";

export interface ExampleCenterSliderProps
{

}

const ExampleCenterSlider: React.FunctionComponent<ExampleCenterSliderProps> = props =>
{
    const [currentIndex, setCurrentIndex] = React.useState<number>(0);

    function renderButtons(): React.ReactNode[]
    {
        const labels: string[] = [];
        let i = 1;
        while (i < 30) {
            labels.push('Item ' + i);
            i++;
        }

        const buttons: React.ReactNode[] = [];
        labels.forEach((label: string, index: number) => {
            buttons.push(<span
                key={UniqueKey.generate()}
                style={{
                    fontWeight: index === currentIndex ? 'bold' : 'normal'
                }}
            >
                <TextButton onClick={() => setCurrentIndex(index)}>
                    {label}
                </TextButton>
            </span>);
        });
        return buttons;
    }

    return <>
        <CenteringSlider>
            {renderButtons()}
        </CenteringSlider>
    </>
}

export default ExampleCenterSlider;