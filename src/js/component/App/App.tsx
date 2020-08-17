import './App.scss';
import * as React from 'react';
import Carousel, {CarouselItems} from "../Carousel/Carousel";
import BulletList from "../Navigation/BulletList";

export interface AppProps
{

}

const App: React.FunctionComponent<AppProps> = props =>
{
    const [index, setIndex] = React.useState<number>(0);

    const imageUrls: string[] = [
        'https://cdn.pixabay.com/photo/2015/12/01/20/28/road-1072823_1280.jpg',
        'https://static.scientificamerican.com/sciam/cache/file/4E0744CD-793A-4EF8-B550B54F7F2C4406_source.jpg',
        'https://cdn.climatechangenews.com/files/2019/12/09161458/adventure-awesome-boardwalk-726298.jpg',
        'https://scx1.b-cdn.net/csz/news/800/2019/2-nature.jpg',
        'https://images.pexels.com/photos/3031075/pexels-photo-3031075.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500',
        'https://images.pexels.com/photos/2754200/pexels-photo-2754200.jpeg?auto=compress&cs=tinysrgb&dpr=2&w=500'
    ];

    function renderImages(): React.ReactNode[]
    {
        const images: React.ReactNode[] = [];
        imageUrls.forEach((url: string) => {
            images.push(<div
                className="example-carousel-item"
                style={{
                    width: '100%',
                    height: '300px',
                    backgroundSize: 'cover',
                    backgroundRepeat: 'no-repeat',
                    backgroundPosition: 'center center',
                    backgroundImage: `url('${url}')`
                }}
            />);
        });
        return images;
    }

    return <main className="app">
        <Carousel
            items={renderImages() as CarouselItems}
            index={index}
        />
        <BulletList
            bulletCount={imageUrls.length}
            currentIndex={index}
            onClick={(index: number) => setIndex(index)}
        />
    </main>
}

export default App;