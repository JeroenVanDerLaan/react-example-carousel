# Example React Carousel

A simple React carousel example. 

## Install

```shell script
git clone git@github.com:JeroenVanDerLaan/react-example-carousel.git react-example-carousel &&
cd react-example-carousel &&
docker-compose up -d --build &&
docker-compose exec node sh -c 'yarn install' &&
docker-compose exec node sh -c 'yarn webpack --mode="production" --devtool=false'
```

Open `index.html` in a browser of choice to view the example.

## Usage

Use the `Carousel` component, passing the items it manages, and the index of the currently visible item.

```tsx
<Carousel
    // Provide the carousel items
    items={['foo', 'bar', 'baz', 'qux']}
    // Specify the index of the currently visible carousel item
    index={0}
/>
```

A higher level component should be responsible for managing the state of the `Carousel`
by passing the appropriate item index.

```tsx
const [index, setIndex] = React.useState<number>(0);

<Carousel
    items={['foo', 'bar', 'baz', 'qux']}
    // Pass the appropriate (stateful) index value
    index={index}
/>

// Example means of manipulating the respective state
<button onClick={() => setIndex(index - 1)}>Previous</button>
<button onClick={() => setIndex(index + 1)}>Next</button>
```