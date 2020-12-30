import React, {useRef} from 'react';
import {PageApi} from './Page';
import {FxGuard} from '../src/components/FxGuard';

export function PageChild() {
  const validFirstRef = useRef<FxGuard>();

  return (
    <>
      Valid Request (Delay: 1.5s):
      <button onClick={() => validFirstRef.current.reload()}>reload</button>
      <FxGuard
        ref={validFirstRef}
        api={PageApi}
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
