import React, {useRef} from 'react';

import {FxButton} from '../src/components/FxButton';
import {FxGuard} from '../src/components/FxGuard';

interface JsonPlaceHolderTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
}

export function App() {
  const validFirstRef = useRef<FxGuard>();

  return (
    <>
      <div id="App">
        <FxButton />
        <hr />
        Valid Request:{' '}
        <button onClick={() => validFirstRef.current.reload()}>reload</button>
        <FxGuard<JsonPlaceHolderTodo>
          ref={validFirstRef}
          api={{
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/todos/1',
            delay: 1500,
          }}
          render={data => (
            <>
              <div>
                <label>userId:</label> {data.userId}
                <br />
                <label>id:</label> {data.id}
                <br />
                <label>title:</label> {data.title}
                <br />
                <label>completed:</label> {data.completed}
              </div>
            </>
          )}
        />
        <hr />
        Valid Request (Continuous Request):
        <FxGuard<JsonPlaceHolderTodo>
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
                <br />
                <label>completed:</label> {data.completed}
              </div>
            </>
          )}
        />
        <hr />
        Valid Request (Continuous Request, Throttle = false):
        <FxGuard<JsonPlaceHolderTodo>
          api={{
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/todos/1',
            throttle: false,
          }}
          render={data => (
            <>
              <div>
                <label>userId:</label> {data.userId}
                <br />
                <label>id:</label> {data.id}
                <br />
                <label>title:</label> {data.title}
                <br />
                <label>completed:</label> {data.completed}
              </div>
            </>
          )}
        />
        <hr />
        Valid Request (Continuous Request, Qs):
        <FxGuard<JsonPlaceHolderTodo>
          api={{
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/todos/1',
            query: {
              foo: 'bar',
            },
            delay: 3000,
          }}
          render={data => (
            <>
              <div>
                <label>userId:</label> {data.userId}
                <br />
                <label>id:</label> {data.id}
                <br />
                <label>title:</label> {data.title}
                <br />
                <label>completed:</label> {data.completed}
              </div>
            </>
          )}
        />
        <hr />
        Invalid Request:
        <FxGuard<JsonPlaceHolderTodo>
          api={{
            method: 'GET',
            url: 'https://jsonplaceholder.typicode.com/not-valid-uri/1',
          }}
          render={data => (
            <>
              <div>
                <label>userId:</label> {data.userId}
                <br />
                <label>id:</label> {data.id}
                <br />
                <label>title:</label> {data.title}
                <br />
                <label>completed:</label> {data.completed}
              </div>
            </>
          )}
        />
        <hr />
      </div>
    </>
  );
}
