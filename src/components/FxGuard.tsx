import {AxiosError} from 'axios';
import React, {Component, Suspense, useEffect, useState} from 'react';
import {request, FxApiRequest, FxResp} from '../request';
import {classNames} from '../utils';

type Renderer<T> = (data: T) => React.ReactNode;
type ErrorRenderer<T> = (data: T, error: AxiosError<T>) => React.ReactNode;
type LoadingRenderer = () => React.ReactNode;

type LazyStatus = 'PENDING' | 'SUCCESS' | 'ERROR';
interface Lazy<TR, TE> {
  status: LazyStatus;
  error: AxiosError<TE> | null;
  result: TR | null;
}

function lazyResponse<TR, TE>(
  res: FxResp<TR> | null,
  error: AxiosError<TE> | null
): () => {status: LazyStatus; result: TR | null; error: AxiosError<TE> | null} {
  return () => ({
    status: error ? 'ERROR' : 'SUCCESS',
    result: res?.data || null,
    error: error,
  });
}

const lazy = function <TR, TE>(
  release: ReleaseDelegateInternal,
  p: Promise<FxResp<TR>>
) {
  let status: LazyStatus = 'PENDING';
  let error: AxiosError<TE> | null;
  let result: TR | null;

  p.then(res => {
    ({result, status, error} = lazyResponse<TR, TE>(res, null)());
    release(true);
  }).catch(err => {
    ({result, status, error} = lazyResponse<TR, TE>(null, err)());
    release(false);
  });

  return (): Lazy<TR, TE> => {
    if (status === 'PENDING') throw p;

    return {
      status,
      error,
      result,
    };
  };
};

interface FxGuardInnerProps<TR, TE> extends FxGuardProps<TR, TE> {
  releaseBusy: ReleaseDelegateInternal;
  refreshId: number;
  reloadId: number;
}

function FxGuardInner<TR, TE>(props: FxGuardInnerProps<TR, TE>) {
  const [prepared, setPrepared] = useState<Function>();
  const {api, refreshId, reloadId, error, naked} = props;
  const req = () => {
    return request<TR>(
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
          setPrepared(() => lazyResponse<TR, TE>(res, null));
          props.releaseBusy(true);
        })
        .catch(err => {
          setPrepared(() => lazyResponse<TR, TE>(null, err));
          props.releaseBusy(false);
        });
    }
  }, [reloadId]);

  useEffect(() => {
    setPrepared(() => lazy<TR, TE>(props.releaseBusy, req()));
  }, [api.method, api.url, refreshId]);

  if (!prepared) return <></>;

  const resp = prepared();

  if (resp.status === 'ERROR') {
    const r = () => (
      <>
        {error && error(resp.error?.response?.data || null, resp.error)}
        {!error && <div>Error ({resp.error.message})</div>}
      </>
    );

    return (
      <>
        {naked && r()}
        {!naked && <div className="flax fx-guard-error">r()</div>}
      </>
    );
  }

  return <>{props.render(resp.result)}</>;
}

interface FxGuardProps<TR, TE = AxiosError> {
  api: FxApiRequest;
  render: Renderer<TR>;
  error?: ErrorRenderer<TE>;
  done?: ReleaseDelegate;
  loading?: LoadingRenderer;
  naked?: boolean;
}

type ReleaseDelegate = (succeed?: boolean) => void;
type ReleaseDelegateInternal = (succeed: boolean) => void;
interface FxGuardStates {
  refreshId: number;
  reloadId: number;
  busy: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class FxGuard<TR = any, TE = any> extends Component<
  FxGuardProps<TR, TE>,
  FxGuardStates
> {
  constructor(props: FxGuardProps<TR, TE>) {
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
    const r = () => {
      const rl = () => (
        <>
          {this.props.loading && this.props.loading()}
          {!this.props.loading && (
            <div className="flax fx-guard-loader">Loading ..</div>
          )}
        </>
      );

      return (
        <>
          <Suspense
            fallback={
              <>
                {this.props.naked && rl()}
                {!this.props.naked && (
                  <div className="flax fx-guard-loading">{rl()}</div>
                )}
              </>
            }
          >
            <FxGuardInner<TR, TE>
              releaseBusy={succeed => this.releaseBusy(succeed)}
              refreshId={this.state.refreshId}
              reloadId={this.state.reloadId}
              api={this.props.api}
              render={this.props.render}
              error={this.props.error}
              naked={this.props.naked}
            />
          </Suspense>
        </>
      );
    };

    return (
      <>
        {this.props.naked && r()}
        {!this.props.naked && (
          <div
            className={classNames('flax fx-guard', {
              '--loading': this.state.busy,
            })}
          >
            {r()}
          </div>
        )}
      </>
    );
  }
}
