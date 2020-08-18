import './BulletList.scss';
import * as React from 'react';
import NumberRange from "../../utility/NumberRange";
import UniqueKey from "../../utility/UniqueKey";

export interface BulletListProps
{
    bulletCount: number;
    currentIndex: number;
    onClick?: (index: number, event: React.MouseEvent<HTMLSpanElement>) => void;
}

const BulletList: React.FunctionComponent<BulletListProps> = props =>
{
    const bulletCount: number = Math.abs(props.bulletCount);
    const currentIndex: number = NumberRange.clamp(0, bulletCount - 1, props.currentIndex);

    function renderBullets(): JSX.Element[]
    {
        const bullets: JSX.Element[] = [];
        let index = 0;
        while (index < bulletCount) {
            bullets.push(renderBullet(index));
            index++;
        }
        return bullets;
    }

    function renderBullet(index: number): JSX.Element
    {
        return <li
            className="bullet-list__bullet"
            key={UniqueKey.generate()}
            style={{
                backgroundColor: index === currentIndex ? 'black' : 'silver'
            }}
            onClick={(event: React.MouseEvent<HTMLSpanElement>) => {
                props.onClick && props.onClick(index, event);
            }}
        />
    }
    
    return <ol className="bullet-list">
        {renderBullets()}
    </ol>
}

export default BulletList;