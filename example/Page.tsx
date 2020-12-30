import React, {useRef} from 'react';
import {FxGuard} from '../src/components/FxGuard';
import {FxApiRequest} from '../src/request';

//const mockApiUrl = 'http://127.0.0.1:3009/mock';
const mockApiUrl =
  'https://jsonplaceholder.typicode.com/todos/1?q=it_will_be_cached';

interface JsonPlaceHolderTodo {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  createdAt: Date;
}

export const PageApi: FxApiRequest<JsonPlaceHolderTodo> = {
  method: 'GET',
  url: mockApiUrl,
  cacheMaxAge: 5500,
};

export function Page() {
  const validFirstRef = useRef<FxGuard>();

  return (
    <>
      Valid Request (Delay: 1.5s):
      <button onClick={() => validFirstRef.current.reload()}>reload</button>
      <FxGuard<JsonPlaceHolderTodo>
        ref={validFirstRef}
        api={{...PageApi, delay: 1500}}
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
