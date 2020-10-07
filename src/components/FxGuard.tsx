import React, {Component, Suspense, useEffect, useState} from 'react';
import {request, FxApiRequest, FxResp} from '../request';

type Renderer<T> = (data: T) => React.ReactNode;

type LazyStatus = 'PENDING' | 'SUCCESS' | 'ERROR';
interface Lazy<T> {
  status: LazyStatus;
  error: Error | null;
  result: T | null;
}

function lazyResponse<T>(
  res: FxResp<T> | null,
  error: Error | null
): () => {status: LazyStatus; result: T | null; error: Error | null} {
  return () => ({
    status: error ? 'ERROR' : 'SUCCESS',
    result: res?.data || null,
    error: error,
  });
}

const lazy = function <T>(
  release: ReleaseDelegateInternal,
  p: Promise<FxResp<T>>
) {
  let status: LazyStatus = 'PENDING';
  let error: Error | null;
  let result: T | null;

  p.then(res => {
    ({result, status, error} = lazyResponse<T>(res, null)());
    release(true);
  }).catch(err => {
    ({result, status, error} = lazyResponse<T>(null, err)());
    release(false);
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
  releaseBusy: ReleaseDelegateInternal;
  refreshId: number;
  reloadId: number;
}

function FxGuardInner<T>(props: FxGuardInnerProps<T>) {
  const [prepared, setPrepared] = useState<Function>();
  const {api, refreshId, reloadId} = props;
  const req = () => {
    return request<T>(
      Object.assign(
        {
          throttle: api.throttle === false ? false : true,
          refreshId,
        },
        props.api
      )
    );
  };

  useEffect(() => {
    if (reloadId > 0) {
      req()
        .then(res => {
          setPrepared(() => lazyResponse<T>(res, null));
          props.releaseBusy(true);
        })
        .catch(err => {
          setPrepared(() => lazyResponse<T>(null, err));
          props.releaseBusy(false);
        });
    }
  }, [reloadId]);

  useEffect(() => {
    setPrepared(() => lazy<T>(props.releaseBusy, req()));
  }, [api.method, api.url, refreshId]);

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
  done?: ReleaseDelegate;
}

type ReleaseDelegate = (succeed?: boolean) => void;
type ReleaseDelegateInternal = (succeed: boolean) => void;
interface FxGuardStates {
  refreshId: number;
  reloadId: number;
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
      refreshId: 0,
      reloadId: 0,
      busy: false,
    };
  }

  reload(silent?: boolean) {
    if (this.state.busy) return;

    if (silent) {
      this.setState({
        ...this.state,
        reloadId: this.state.reloadId + 1,
        busy: true,
      });
      return;
    }

    this.setState({
      ...this.state,
      refreshId: this.state.refreshId + 1,
      busy: true,
    });
  }

  releaseBusy(succeed: boolean) {
    if (this.props.done) {
      this.props.done(succeed);
    }

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
            releaseBusy={succeed => this.releaseBusy(succeed)}
            refreshId={this.state.refreshId}
            reloadId={this.state.reloadId}
            api={this.props.api}
            render={this.props.render}
          />
        </Suspense>
      </div>
    );
  }
}
