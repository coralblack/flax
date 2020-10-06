import React, {Component, Suspense, useEffect, useState} from 'react';
import {request, FxApiRequest, FxResp} from '../request';

type Renderer<T> = (data: T) => React.ReactNode;

type LazyStatus = 'PENDING' | 'SUCCESS' | 'ERROR';
interface Lazy<T> {
  status: LazyStatus;
  error: Error;
  result: T;
}
const lazy = function <T>(release: () => void, p: Promise<FxResp<T>>) {
  let status: LazyStatus = 'PENDING';
  let error: Error;
  let result: T;

  p.then(res => {
    result = res.data;
    status = 'SUCCESS';
    release();
  }).catch(err => {
    error = err;
    status = 'ERROR';
    release();
  });

  return (): Lazy<T> => {
    if (status === 'PENDING') throw p;

    return {
      status,
      error,
      result,
    };
  };
};

interface FxGuardInnerProps<T> extends FxGuardProps<T> {
  releaseBusy: () => void;
  count: number;
}

function FxGuardInner<T>(props: FxGuardInnerProps<T>) {
  const [prepared, setPrepared] = useState<Function>();
  const {api, count} = props;

  useEffect(() => {
    setPrepared(() =>
      lazy<T>(
        props.releaseBusy,
        request<T>(
          Object.assign(
            {
              throttle: api.throttle === false ? false : true,
              count,
            },
            props.api
          )
        )
      )
    );
  }, [api.method, api.url, count]);

  if (!prepared) return <></>;

  const resp = prepared();

  if (resp.status === 'ERROR') {
    return (
      <>
        <div>Error ({resp.error.message})</div>
      </>
    );
  }

  return <>{props.render(resp.result)}</>;
}

interface FxGuardProps<T> {
  api: FxApiRequest;
  render: Renderer<T>;
}

interface FxGuardStates {
  count: number;
  busy: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class FxGuard<T = any> extends Component<
  FxGuardProps<T>,
  FxGuardStates
> {
  constructor(props: FxGuardProps<T>) {
    super(props);
    this.state = {
      count: 0,
      busy: false,
    };
  }

  reload() {
    if (this.state.busy) return;

    this.setState({
      count: this.state.count + 1,
      busy: true,
    });
  }

  releaseBusy() {
    this.setState({
      ...this.state,
      busy: false,
    });
  }

  render() {
    return (
      <div className="fx-guard">
        <Suspense fallback={<div className="fx-guard-loader">Loading ..</div>}>
          <FxGuardInner<T>
            releaseBusy={() => this.releaseBusy()}
            count={this.state.count}
            api={this.props.api}
            render={this.props.render}
          />
        </Suspense>
      </div>
    );
  }
}
