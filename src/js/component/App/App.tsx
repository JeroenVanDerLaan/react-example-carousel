import './App.scss';
import * as React from 'react';
import ExampleGallerySlider from "./ExampleGallerySlider";
import ExampleCenterSlider from "./ExampleCenterSlider";

export interface AppProps
{

}

const App: React.FunctionComponent<AppProps> = props =>
{
    return <main className="app">
        <h2>Gallery Slider:</h2>
        <ExampleGallerySlider/>
        <h2>Centering Slider:</h2>
        <ExampleCenterSlider/>
    </main>
}

export default App;