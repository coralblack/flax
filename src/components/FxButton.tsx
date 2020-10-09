import {AxiosResponse} from 'axios';
import React, {Component, ReactNode} from 'react';
import {
  FxNotificationType,
  FxNotificationToast,
  useNotification,
} from './FxNotification';
import {FxApiRequest, request} from '../request';

export type Notifiable = FxNotificationToast | null | undefined | void;
export type DoneDelegate<T> = (
  res: T | null,
  error: Error | null,
  resp?: AxiosResponse | null
) => Notifiable;
export type SucceedDelegate<T> = (data: T, resp: AxiosResponse) => Notifiable;
export type ErrorDelegate<T> = (data: T, error: AxiosResponse<T>) => Notifiable;

interface FxButtonProps<TR, TE, TRR, TER> {
  children?: ReactNode;
  className?: string;
  label?: string;

  api: FxApiRequest<TR, TE, TRR, TER>;
  done?: DoneDelegate<TR>;
  success?: SucceedDelegate<TRR>;
  error?: ErrorDelegate<TER>;
}

interface FxButtonStates {
  busy: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class FxButton<TR = any, TE = any, TRR = TR, TER = TE> extends Component<
  FxButtonProps<TR, TE, TRR, TER>,
  FxButtonStates
> {
  constructor(props: FxButtonProps<TR, TE, TRR, TER>) {
    super(props);

    this.state = {
      busy: false,
    };
  }

  private noti(payload: Notifiable, type: FxNotificationType) {
    if (!payload) return;
    if (typeof payload === 'string') {
      payload = {
        message: payload,
      };
    }

    payload.type = payload.type || type;

    const {alert: notiAlert} = useNotification({});
    notiAlert(payload);
  }

  handleClick() {
    if (this.state.busy) return;

    this.setState({...this.state, busy: true});

    const {success, error, done} = this.props;

    request<TR, TE, TRR, TER>({...this.props.api})
      .then(res => {
        this.noti(success && success(res.reduced, res.response), 'SUCC');
        this.noti(done && done(res.data, null, res.response), 'INFO');
        this.setState({...this.state, busy: false});
      })
      .catch(err => {
        const type =
          typeof err.response?.status === 'number' && err.response?.status < 500
            ? 'WARN'
            : 'ERROR';
        this.noti(error && error(err.response?.reduced, err), type);
        this.noti(done && done(err.response?.data, err, err.response), type);
        this.setState({...this.state, busy: false});
      });
  }

  render() {
    return (
      <button
        className="flax fx-button"
        onClick={() => this.handleClick()}
        disabled={this.state.busy}
      >
        {this.props.children || this.props.label}
      </button>
    );
  }
}
