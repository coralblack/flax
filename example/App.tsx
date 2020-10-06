import React from 'react';

import {FxButton} from '../src/components/FxButton';
import {FxGuard} from '../src/components/FxGuard';

export function App() {
  return (
    <>
      <div id="App">
        <FxButton />
        <hr />
        <FxGuard />
      </div>
    </>
  );
}
