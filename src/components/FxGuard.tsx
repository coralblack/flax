import PCancelable from 'p-cancelable';
import React, {Component, Suspense, useEffect, useState} from 'react';
import {request, FxApiRequest, FxResp, FxError} from '../request';
import {classNames} from '../utils';

type Renderer<T> = (data: T | null, reloaded?: boolean) => React.ReactNode;
type ErrorRenderer<T, TR> = (
  data: TR | null,
  error: FxError<T, TR>
) => React.ReactNode;
type LoadingRenderer = () => React.ReactNode;

type LazyStatus = 'PENDING' | 'SUCCESS' | 'ERROR';
interface Lazy<TR, TE, TRR = TR, TER = TE> {
  status: LazyStatus;
  error: FxError<TE, TER> | null;
  result: FxResp<TR, TRR> | null;
}

type LazyResponse<TR, TE, TRR, TER> = {
  status: LazyStatus;
  result: FxResp<TR, TRR> | null;
  error: FxError<TE, TER> | null;
};

function lazyResponse<TR, TE, TRR, TER>(
  result: FxResp<TR, TRR> | null,
  error: FxError<TE, TER> | null
): () => LazyResponse<TR, TE, TRR, TER> {
  return () => ({
    status: error ? 'ERROR' : 'SUCCESS',
    result,
    error,
  });
}

const lazy = function <TR, TE, TRR = TR, TER = TE>(
  release: ReleaseDelegateInternal,
  p: PCancelable<FxResp<TR, TRR>>
) {
  let status: LazyStatus = 'PENDING';
  let error: FxError<TE, TER> | null;
  let result: FxResp<TR, TRR> | null;

  p.then(res => {
    if (p.isCanceled) return;
    ({result, status, error} = lazyResponse<TR, TE, TRR, TER>(res, null)());
    release(true);
  }).catch(err => {
    if (p.isCanceled) return;
    ({result, status, error} = lazyResponse<TR, TE, TRR, TER>(null, err)());
    release(false);
  });

  return (): Lazy<TR, TE, TRR, TER> => {
    if (status === 'PENDING') throw p;

    return {
      status,
      error,
      result,
    };
  };
};

interface FxGuardInnerProps<TR, TE, TRR, TER>
  extends FxGuardProps<TR, TE, TRR, TER> {
  releaseBusy: ReleaseDelegateInternal;
  refreshId: number;
  reloadId: number;
}

function FxGuardInner<TR, TE, TRR, TER>(
  props: FxGuardInnerProps<TR, TE, TRR, TER>
) {
  const [prepared, setPrepared] = useState<
    () => LazyResponse<TR, TE, TRR, TER>
  >();
  const {api, refreshId, reloadId, error, naked} = props;
  const req = () => {
    return request<TR, TE, TRR, TER>(
      Object.assign(
        {
          throttle: api.throttle === false ? false : true,
          refreshId,
        },
        props.api,
        {
          reducer: undefined,
          errReducer: undefined,
        }
      )
    );
  };

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let rp: PCancelable<any> | undefined = undefined;

    if (reloadId > 0) {
      rp = req();

      rp.then(res => {
        if (rp?.isCanceled) return;

        setPrepared(() => lazyResponse<TR, TE, TRR, TER>(res, null));
        props.releaseBusy(true);
      }).catch(err => {
        if (rp?.isCanceled) return;

        setPrepared(() => lazyResponse<TR, TE, TRR, TER>(null, err));
        props.releaseBusy(false);
      });
    }

    return () => {
      if (rp) {
        rp.cancel();
      }
    };
  }, [reloadId]);

  useEffect(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    let rp: PCancelable<any> | undefined = undefined;

    setPrepared(() => {
      rp = req();

      return lazy<TR, TE, TRR, TER>(props.releaseBusy, rp);
    });

    return () => {
      if (rp) {
        rp.cancel();
      }
    };
  }, [api.method, api.url, refreshId]);

  if (!prepared) return <></>;

  const resp = prepared();

  if (resp.status === 'ERROR') {
    const rr = () => {
      if (!resp.error?.response?.data) return null;
      return props.api.errReducer
        ? props.api.errReducer(resp.error?.response.data, resp.error)
        : resp.error?.response.data;
    };

    const r = () => (
      <>
        {error && error(rr() as TER, resp.error!)}
        {!error && <div>Error ({resp.error?.message})</div>}
      </>
    );

    return (
      <>
        {naked && r()}
        {!naked && <div className="flax fx-guard-error">{r()}</div>}
      </>
    );
  }

  const rr = () => {
    if (!resp.result?.data) return null;
    return props.api.reducer
      ? props.api.reducer(resp.result?.data)
      : resp.result?.data;
  };

  return <>{props.render(rr() as TRR, props.refreshId > 0)}</>;
}

interface FxGuardProps<TR, TE, TRR, TER> {
  api: FxApiRequest<TR, TE, TRR, TER>;
  render: Renderer<TRR>;
  error?: ErrorRenderer<TE, TER>;
  done?: ReleaseDelegate;
  loading?: LoadingRenderer;
  disableLoading?: boolean;
  naked?: boolean;
}

type ReleaseDelegate = (succeed?: boolean) => void;
type ReleaseDelegateInternal = (succeed: boolean) => void;
interface FxGuardStates {
  refreshId: number;
  reloadId: number;
  busy: boolean;
  silent: boolean;
  className: string | undefined;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class FxGuard<TR = any, TE = any, TRR = TR, TER = TE> extends Component<
  FxGuardProps<TR, TE, TRR, TER>,
  FxGuardStates
> {
  constructor(props: FxGuardProps<TR, TE, TRR, TER>) {
    super(props);

    this.state = {
      refreshId: 0,
      reloadId: 0,
      busy: true,
      silent: false,
      className: undefined,
    };
  }

  reload(silent?: boolean, className?: string) {
    if (this.state.busy) return;

    if (silent) {
      this.setState({
        ...this.state,
        reloadId: this.state.reloadId + 1,
        busy: true,
        silent: true,
        className,
      });
      return;
    }

    this.setState({
      ...this.state,
      refreshId: this.state.refreshId + 1,
      busy: true,
      silent: false,
      className: undefined,
    });
  }

  releaseBusy(succeed: boolean) {
    if (this.props.done) {
      this.props.done(succeed);
    }

    this.setState({
      ...this.state,
      busy: false,
      silent: false,
      className: undefined,
    });
  }

  render() {
    const r = () => {
      const rl = () => (
        <>
          {this.props.disableLoading && (
            <>{this.props.render(null, this.state.refreshId > 0)}</>
          )}
          {this.props.loading && this.props.loading()}
          {!this.props.loading && !this.props.disableLoading && (
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
                  <div
                    className={classNames('flax fx-guard-loading', {
                      '--silent': this.props.disableLoading,
                    })}
                  >
                    {rl()}
                  </div>
                )}
              </>
            }
          >
            <FxGuardInner<TR, TE, TRR, TER>
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
              '--silent': this.state.silent,
              [this.state.className || '--noname']: !!this.state.className,
            })}
          >
            {r()}
          </div>
        )}
      </>
    );
  }
}
