import './App.scss';
import * as React from 'react';
import ExampleCarousel from "./ExampleCarousel";
import ExampleCenterSlider from "./ExampleCenterSlider";

export interface AppProps
{

}

const App: React.FunctionComponent<AppProps> = props =>
{
    return <main className="app">
        <ExampleCenterSlider/>
    </main>

    return <main className="app">
        <ExampleCarousel/>
    </main>
}

export default App;