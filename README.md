# Use Size React

Use Size React is a react hook to track size of HTML element by passing ref.

#Install
```
npm i use-size-react
//or
yarn add use-size-react
```


### Usage
```js
import React from 'react';
import {useSize} from 'use-size-react';

const App = () => {
  const {ref, size: {width, height}} = useSize();

  return (
    <div>
      <p>Track div size</p>
      <div ref={ref}>
        width: {width} {'  '} height: {height}
      </div>
    </div>
  );
}

```

## License

MIT
