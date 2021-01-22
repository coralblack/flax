/* eslint-disable @typescript-eslint/no-explicit-any */
import PCancelable from 'p-cancelable';
import {useState} from 'react';
import {
  FxNotificationType,
  useNotification,
} from '../components/FxNotification';
import {
  Data,
  DoneDelegate,
  ErrorDelegate,
  FxApiRequest,
  Notifiable,
  Queries,
  Headers,
  request,
  SucceedDelegate,
} from '../request';

export interface UseRequestProps<TR, TE, TRR = TR, TER = TE> {
  done?: DoneDelegate<TR>;
  success?: SucceedDelegate<TRR>;
  error?: ErrorDelegate<TER>;
}

export const notify = (payload: Notifiable, type: FxNotificationType) => {
  if (!payload) return;
  if (typeof payload === 'string') {
    payload = {
      message: payload,
    };
  }

  if (!payload.message) return;
  payload.type = payload.type || type;

  const {alert: notiAlert} = useNotification({});
  notiAlert(payload);
};

export function useRequest<TR = any, TE = any, TRR = TR, TER = TE>(
  api: FxApiRequest<TR, TE, TRR, TER>,
  props?: UseRequestProps<TR, TE, TRR, TER>
) {
  const [reqId, setReqId] = useState(0);
  const [resp, setResp] = useState<{
    busy: boolean;
    response: TRR | undefined;
    errorResponse: TER | undefined;
  }>({busy: false, response: undefined, errorResponse: undefined});

  const {success, done, error} = props || {};
  const queues: Array<PCancelable<any>> = [];

  const requestWrapper = (wrapperParams?: {
    data?: Data;
    query?: Queries;
    headers?: Headers;
  }): boolean => {
    if (resp.busy) return false;

    setResp({
      busy: true,
      response: undefined,
      errorResponse: undefined,
    });

    const reqParams = {...api};

    if (wrapperParams?.data) {
      reqParams.data = wrapperParams.data;
    }
    if (wrapperParams?.query) {
      reqParams.query = wrapperParams?.query;
    }
    if (wrapperParams?.headers) {
      reqParams.headers = wrapperParams?.headers;
    }

    const rp = request<TR, TE, TRR, TER>(reqParams);

    rp.then(res => {
      notify(success && success(res.reduced, res.response), 'SUCC');
      notify(done && done(res.data, null, res.response), 'INFO');

      setReqId(reqId + 1);
      setResp({
        busy: false,
        response: res.reduced,
        errorResponse: undefined,
      });
    }).catch(err => {
      const type =
        typeof err.response?.status === 'number' && err.response?.status < 500
          ? 'WARN'
          : 'ERROR';
      notify(error && error(err.response?.reduced || err, err), type);
      notify(done && done(err.response?.data, err, err.response), type);

      setReqId(reqId + 1);
      setResp({
        busy: false,
        response: err.response?.reduced,
        errorResponse: undefined,
      });
    });

    queues.push(rp);

    return true;
  };

  const cancel = () => {
    let rp;

    while ((rp = queues.pop())) {
      rp.cancel();
    }
  };

  return {
    reqId,
    request: requestWrapper,
    response: resp,
    cancel,
  };
}
