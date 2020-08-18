# Example React Carousel

A simple React carousel example. 

## Deployment

```shell script
docker-compose up -d --build && docker-compose exec node sh -c 'yarn deploy'
```

This builds the __production__ `dist` assets.

Open `index.html` in your browser to load the app.

## Development

```shell script
docker-compose up -d --build && docker-compose exec node sh -c 'yarn develop'
```

This build the __development__ `dist` assets,
while also telling `webpack` to keep watching for changes made to the `src` files.

Open `index.html` in your browser to load the app.

## Usage

The `Carousel` component takes an array of items to manage,
and the index value of the currently visible item.

```tsx
<Carousel
    // Provide the carousel items
    items={['foo', 'bar', 'baz', 'qux']}
    // Specify the index of the currently visible item
    index={0}
/>
```

Have a higher level component manage the state of the currently visible item.

```tsx
// Define state to manage the current item index value
const [index, setIndex] = React.useState<number>(0);

// Provide means to manipulate the item index value
<button onClick={() => setIndex(index - 1)}>Previous</button>
<button onClick={() => setIndex(index + 1)}>Next</button>

// Pass the stateful item index value to the Carousel component
<Carousel
    items={['foo', 'bar', 'baz', 'qux']}
    index={index}
/>
```
