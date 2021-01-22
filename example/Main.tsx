import React, {useEffect, useRef, useState} from 'react';

import {FxButton} from '../src/components/FxButton';
import {FxGuard} from '../src/components/FxGuard';
import {useRequest} from '../src/hooks/useRequest';
import {setBaseUrl, setDefaultHeaders} from '../src/request';

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

  setDefaultHeaders({
    Authorization: 'Bearer Token',
    CustomHeader: 'CustomHeaderValue',
  });

  setBaseUrl('https://jsonplaceholder.typicode.com');

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
        label="Click Me !"
        api={{
          method: 'POST',
          url: '/posts',
        }}
        success={res => setPostId(res.id)}
      />
      <hr />
      <FxButton<JsonPlaceHolderPostTodo>
        label="Click Me (Toast on Success)"
        api={{
          method: 'POST',
          url: 'https://jsonplaceholder.typicode.com/posts',
        }}
        success={res => `Post created (ID: ${res.id})`}
        done={() => 'Done!'}
      />
      <hr />
      <FxButton<JsonPlaceHolderPostTodo>
        label="Click Me (Toast on Success)"
        api={{
          method: 'POST',
          url: 'https://jsonplaceholder.typicode.com/posts',
        }}
        success={res => `Post created (ID: ${res.id})`}
        done={() => 'Done!'}
      />
      <hr />
      <FxButton<JsonPlaceHolderPostTodo, {code: string; message: string}>
        api={{
          method: 'GET',
          url: 'http://127.0.0.1:3009/error/400',
        }}
        error={err => `400 Error! (${err.code}: ${err.message}`}
      >
        Click Me 400!
      </FxButton>
      <hr />
      <FxButton<JsonPlaceHolderPostTodo, {code: string; message: string}>
        api={{
          method: 'GET',
          url: 'http://127.0.0.1:3009/error/500',
        }}
        error={err => ({
          title: 'ERROR!',
          message: `500 Error! (${err.code}: ${err.message}`,
        })}
      >
        Click Me 500!
      </FxButton>
      <hr />
      <FxButton
        api={{
          method: 'POST',
          url: 'https://jsonplaceholder.typicode.com/posts',
          reducer: (res: JsonPlaceHolderPostTodo): {manipulated: number} => {
            console.log('xxx');
            return {
              manipulated: res.id,
            };
          },
        }}
        success={res => {
          return `Post created (ID: ${res.manipulated})`;
        }}
      >
        Type Hinting
      </FxButton>
      <hr />
      <FxButton
        api={{
          method: 'GET',
          url: 'http://127.0.0.1:3009/error/400',
          errReducer: (res: {
            code: string;
            message: string;
          }): {manipulated: string} => ({
            manipulated: `${res.code} | ${res.message}`,
          }),
        }}
        error={err => `400 Error! (${err.manipulated})`}
      >
        Type Hinting
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

function SampleHook() {
  const {reqId, request, response, cancel} = useRequest<JsonPlaceHolderTodo>(
    {
      method: 'GET',
      url: mockApiUrl,
      delay: 500,
    },
    {success: data => data.title}
  );

  useEffect(() => {
    return () => {
      cancel();
    };
  }, [reqId]);

  return (
    <>
      <button onClick={() => request()} disabled={response.busy}>
        Request
      </button>
      <br />
      response: {JSON.stringify(response, null, 2)}
    </>
  );
}

function SampleHook2() {
  const {reqId, request, response, cancel} = useRequest(
    {
      method: 'GET',
      url: mockApiUrl,
      delay: 500,
    },
    {done: () => 'Done!!!'}
  );

  useEffect(() => {
    return () => {
      cancel();
    };
  }, [reqId]);

  return (
    <>
      <button onClick={() => request()} disabled={response.busy}>
        Request
      </button>
      <br />
      response: {JSON.stringify(response, null, 2)}
    </>
  );
}

function SampleHook3() {
  const {reqId, request, response, cancel} = useRequest<
    JsonPlaceHolderTodo,
    {code: string; message: string}
  >(
    {
      method: 'GET',
      url: 'http://127.0.0.1:3009/error/400/delay',
      delay: 500,
    },
    {error: data => `${data?.message} ~`}
  );

  useEffect(() => {
    return () => {
      cancel();
    };
  }, [reqId]);

  return (
    <>
      <button onClick={() => request()} disabled={response.busy}>
        Request
      </button>
      <br />
      response: {JSON.stringify(response, null, 2)}
    </>
  );
}

function SampleHook4() {
  const {reqId, request, response, cancel} = useRequest<JsonPlaceHolderTodo>(
    {
      method: 'GET',
      url: 'http://127.0.0.1:3009/error/400',
      delay: 500,
      data: () => ({
        arrayParam: [1, 2, 3],
      }),
    },
    {error: data => `${data?.message} ~`}
  );

  useEffect(() => {
    return () => {
      cancel();
    };
  }, [reqId]);

  return (
    <>
      <button onClick={() => request()} disabled={response.busy}>
        Request
      </button>
      <br />
      response: {JSON.stringify(response, null, 2)}
    </>
  );
}

function SampleHook5() {
  const {reqId, request, response, cancel} = useRequest<JsonPlaceHolderTodo>(
    {
      method: 'POST',
      url: mockApiUrl,
      delay: 500,
      data: () => ({
        arrayParam: [1, 2, 3],
      }),
    },
    {error: data => `${data?.message} ~`}
  );

  useEffect(() => {
    return () => {
      cancel();
    };
  }, [reqId]);

  return (
    <>
      <button
        onClick={() => {
          const data = () => ({param: new Date().toISOString().toString()});
          const query = {query: 'query-string'};
          const headers = {'CUSTOM-HEADER': 'Custom-Header-Val'};
          request({data, query, headers});
        }}
        disabled={response.busy}
      >
        Request
      </button>
      response: {JSON.stringify(response, null, 2)}
    </>
  );
}

export function Main() {
  const validFirstRef = useRef<FxGuard>();
  const validFirstCacheRef = useRef<FxGuard>();
  const reloadFxGuardRef = useRef<FxGuard>();
  const [foo, setFoo] = useState(0);

  return (
    <>
      <SampleHook />
      <hr />
      <SampleHook2 />
      <hr />
      <SampleHook3 />
      <hr />
      <SampleHook4 />
      <hr />
      <SampleHook5 />
      <hr />
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
      Valid Request (Delay: .5s, Cache: 15s):
      <button onClick={() => validFirstCacheRef.current.reload()}>
        reload
      </button>
      <FxGuard<JsonPlaceHolderTodo>
        ref={validFirstCacheRef}
        api={{
          method: 'GET',
          url: mockApiUrl,
          delay: 500,
          cacheMaxAge: 10000,
        }}
        render={data => (
          <>
            <div>
              <label>title:</label> {data.title}
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
      <FxGuard
        api={{
          method: 'GET',
          url: 'https://jsonplaceholder.typicode.com/todos/1',
          reducer: (data: JsonPlaceHolderTodo): {manipulated: string} => ({
            manipulated: `${data.id} (${data.title})`,
          }),
        }}
        render={data => (
          <>
            <div>
              <label>manipulated:</label> {data.manipulated}
            </div>
          </>
        )}
      />
      <hr />
      Valid Request (Continuous Request 3):
      <FxGuard<JsonPlaceHolderTodo>
        api={{
          method: 'GET',
          url: 'https://jsonplaceholder.typicode.com/todos/1',
        }}
        render={data => (
          <>
            <div>
              <label>userId:</label> {data.userId}
            </div>
          </>
        )}
      />
      <hr />
      Valid Request (Continuous Request, Throttle = false):
      <FxGuard<JsonPlaceHolderTodo, unknown, {manipulated: string}>
        api={{
          method: 'GET',
          url: 'https://jsonplaceholder.typicode.com/todos/1',
          throttle: false,
          reducer: data => ({
            manipulated: `${data.id}, ${data.title}`,
          }),
        }}
        render={data => (
          <>
            <div>
              <label>id, title:</label> {data.manipulated}
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
        render={() => (
          <>
            <div>?</div>
          </>
        )}
      />
      <hr />
      Invalid Request (errReducer):
      <FxGuard<
        JsonPlaceHolderTodo,
        {code: string; message: string},
        unknown,
        string
      >
        api={{
          method: 'GET',
          url: 'http://127.0.0.1:3009/error/400',
          errReducer: data => `${data.code} | ${data.message}`,
        }}
        error={data => {
          return <>({data})</>;
        }}
        render={() => (
          <>
            <div>?</div>
          </>
        )}
      />
      <hr />
      Custom Loading:
      <FxGuard<JsonPlaceHolderTodo>
        api={{
          method: 'GET',
          url: mockApiUrl,
          delay: 10000,
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
      Nullable Loading:
      <FxGuard<JsonPlaceHolderTodo>
        api={{
          method: 'GET',
          url: mockApiUrl,
          delay: 5000,
        }}
        disableLoading={true}
        render={data => <>{!data ? 'Nullable Loading...' : data.title}</>}
      />
      <hr />
      ReLoading:{' '}
      <button
        onClick={() => {
          setFoo(Math.random() * 1000);
          reloadFxGuardRef.current.reload();
        }}
      >
        reload
      </button>
      <FxGuard<JsonPlaceHolderTodo>
        ref={reloadFxGuardRef}
        api={{
          method: 'GET',
          url: mockApiUrl,
          query: {
            foo,
          },
          delay: 3000,
        }}
        disableLoading={true}
        render={(data, reloaded) => (
          <>
            {data ? data.title : '...'} / {reloaded ? 'T' : 'F'}
          </>
        )}
      />
      <hr />
    </>
  );
}
