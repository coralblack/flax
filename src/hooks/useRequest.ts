import {useState} from 'react';
import {
  FxNotificationType,
  useNotification,
} from '../components/FxNotification';
import {
  DoneDelegate,
  ErrorDelegate,
  FxApiRequest,
  Notifiable,
  request,
  SucceedDelegate,
} from '../request';

export interface UseRequestProps<TR, TE, TRR, TER> {
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
  const [resp, setResp] = useState<{
    busy: boolean;
    response: TRR | undefined;
    errorResponse: TER | undefined;
  }>({busy: false, response: undefined, errorResponse: undefined});

  const {success, done, error} = props || {};

  const requestWrapper = (): boolean => {
    if (resp.busy) return false;

    setResp({
      busy: true,
      response: undefined,
      errorResponse: undefined,
    });

    request<TR, TE, TRR, TER>({...api})
      .then(res => {
        notify(success && success(res.reduced, res.response), 'SUCC');
        notify(done && done(res.data, null, res.response), 'INFO');

        setResp({
          busy: false,
          response: res.reduced,
          errorResponse: undefined,
        });
      })
      .catch(err => {
        const type =
          typeof err.response?.status === 'number' && err.response?.status < 500
            ? 'WARN'
            : 'ERROR';
        notify(error && error(err.response?.reduced, err), type);
        notify(done && done(err.response?.data, err, err.response), type);

        setResp({
          busy: false,
          response: err.response?.reduced,
          errorResponse: undefined,
        });
      });

    return true;
  };

  return {
    request: requestWrapper,
    response: resp,
  };
}
