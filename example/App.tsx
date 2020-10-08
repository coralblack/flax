import React, {useRef, useState} from 'react';

import {FxButton} from '../src/components/FxButton';
import {FxGuard} from '../src/components/FxGuard';

//const mockApiUrl = 'http://127.0.0.1:3009/mock';
const mockApiUrl = 'https://jsonplaceholder.typicode.com/todos/1';

interface JsonPlaceHolderTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
}

interface JsonPlaceHolderPostTodo {
  id: number;
}

function SamplePost() {
  const [postId, setPostId] = useState(0);
  const [titleValue, setTitleValue] = useState('');
  const titleRef = useRef();
  const title2Ref = useRef(null);

  return (
    <>
      Title: <input ref={titleRef} />
      <br />
      Title2: <input ref={title2Ref} defaultValue="1234" />
      <br />
      Title3:{' '}
      <input value={titleValue} onChange={e => setTitleValue(e.target.value)} />
      <hr />
      <FxButton<JsonPlaceHolderPostTodo>
        label="Click Me"
        api={{
          method: 'POST',
          url: 'https://jsonplaceholder.typicode.com/posts',
        }}
        success={res => setPostId(res.id)}
      />
      <hr />
      <FxButton<JsonPlaceHolderPostTodo>
        api={{
          method: 'POST',
          url: 'https://jsonplaceholder.typicode.com/posts',
          headers: {
            foo: 'bar',
          },
          data: {
            postId,
            title: titleRef,
            title2: title2Ref,
            titleValue,
          },
        }}
        done={(res, err) => {
          err && console.log('>>', err);
          err ? setPostId(-1) : setPostId(res.id);
        }}
      >
        Click Me!
      </FxButton>
      <hr />
      {postId}
    </>
  );
}

function SampleReloadable() {
  const validSilentRef = useRef<FxGuard>();
  const [isBusy, setBusy] = useState(true);

  return (
    <>
      Valid Request (Delay: 0.3s):
      <button
        onClick={() => {
          setBusy(true);
          validSilentRef.current.reload(true);
        }}
        disabled={isBusy}
      >
        reload (silent) {isBusy ? 'Loading ..' : ''}
      </button>
      <FxGuard<JsonPlaceHolderTodo>
        ref={validSilentRef}
        api={{
          method: 'GET',
          url: mockApiUrl,
          delay: 300,
        }}
        done={succeed => {
          console.log('>', succeed);
          setBusy(false);
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
              <label>completed:</label> {data.completed ? 'true' : 'false'}
              <br />
              <label>createdAt:</label> {data.createdAt}
            </div>
          </>
        )}
      />
    </>
  );
}

export function App() {
  const validFirstRef = useRef<FxGuard>();

  return (
    <>
      <div id="App">
        <SamplePost />
        <hr />
        Valid Request (Delay: 1.5s):
        <button onClick={() => validFirstRef.current.reload()}>reload</button>
        <FxGuard<JsonPlaceHolderTodo>
          ref={validFirstRef}
          api={{
            method: 'GET',
            url: mockApiUrl,
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
                <label>completed:</label> {data.completed ? 'true' : 'false'}
                <br />
                <label>createdAt:</label> {data.createdAt}
              </div>
            </>
          )}
        />
        <hr />
        <SampleReloadable />
        <hr />
        Valid Request (Continuous Request 1):
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
        Valid Request (Continuous Request 2):
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
        Valid Request (Continuous Request, Qs, Delay: 3s):
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
        <FxGuard<JsonPlaceHolderTodo, {code: string; message: string}>
          api={{
            method: 'GET',
            url: 'http://127.0.0.1:3009/error/400',
          }}
          error={(data, error) => {
            return (
              <>
                {data.message} ({data.code}), {error.message}
              </>
            );
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
        Custom Loading:
        <FxGuard<JsonPlaceHolderTodo>
          api={{
            method: 'GET',
            url: mockApiUrl,
            delay: 30000,
          }}
          loading={() => <>Loading ...</>}
          render={data => <>{data.title}</>}
        />
        <hr />
        Naked (Success):
        <FxGuard<JsonPlaceHolderTodo>
          api={{
            method: 'GET',
            url: mockApiUrl,
            delay: 10000,
          }}
          loading={() => <>Loading ...</>}
          error={() => <>An error has occurred</>}
          render={data => <>{data.title}</>}
          naked={true}
        />
        <hr />
        Naked (Error):
        <FxGuard<JsonPlaceHolderTodo>
          api={{
            method: 'GET',
            url: mockApiUrl + '/invalid-suffix',
            delay: 5000,
          }}
          loading={() => <>Loading ...</>}
          error={() => <>An error has occurred</>}
          render={data => <>{data.title}</>}
          naked={true}
        />
        <hr />
      </div>
    </>
  );
}
