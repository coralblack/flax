![flax](./flax.png)

# flax

`flax` is consists of components that help you invoke HTTP API super-simply.

## Installation

```bash
npm install --save @coralblack/flax
```

## Usage

```tsx
import 'flax/dist/styles/index.css';
import {FxButton, FxGuard} from 'flax';
```

## FxGuard

A component that makes it super simple to HTTP API inquiry requests.

```tsx
<FxGuard
  api={{
    method: 'GET',
    url: 'https://jsonplaceholder.typicode.com/todos/1',
  }}
  render={data => (
    <>
      <div>
        <label>userId:</label> {data.userId}
        <br />
        <label>id:</label> {data.id}
        <br />
        <label>title:</label> {data.title}
      </div>
    </>
  )}
/>
```

## FxButton

A component that makes it super simple to HTTP API invoke requests.

```tsx
<FxButton
  label="Post"
  api={{
    method: 'POST',
    url: 'https://jsonplaceholder.typicode.com/posts',
  }}
  success={(res) => document.location.href = '/posts/' + res.id}
  error=((err) => Message.show(`An error has occurred. (${err.message})`))
/>
```
