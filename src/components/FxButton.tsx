import {AxiosResponse} from 'axios';
import React, {Component, ReactNode} from 'react';
import {FxApiRequest, request} from '../request';

type DoneDelegate<T> = (
  res: T | null,
  error: Error | null,
  resp?: AxiosResponse | null
) => void;
type SucceedDelegate<T> = (res: T, resp: AxiosResponse) => void;
type ErrorDelegate = (error: Error) => void;

interface FxButtonProps<T> {
  children?: ReactNode;
  className?: string;
  label?: string;

  api: FxApiRequest;
  done?: DoneDelegate<T>;
  success?: SucceedDelegate<T>;
  error?: ErrorDelegate;
}

interface FxButtonStates {
  busy: boolean;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export class FxButton<T = any> extends Component<
  FxButtonProps<T>,
  FxButtonStates
> {
  constructor(props: FxButtonProps<T>) {
    super(props);

    this.state = {
      busy: false,
    };
  }

  handleClick() {
    if (this.state.busy) return;

    this.setState({...this.state, busy: true});

    request<T>({...this.props.api})
      .then(res => {
        this.props.success && this.props.success(res.data, res.response);
        this.props.done && this.props.done(res.data, null, res.response);
        this.setState({...this.state, busy: false});
      })
      .catch(err => {
        this.props.error && this.props.error(err);
        this.props.done && this.props.done(null, err, null);
        this.setState({...this.state, busy: false});
      });
  }

  render() {
    return (
      <button
        className="fx-button"
        onClick={() => this.handleClick()}
        disabled={this.state.busy}
      >
        {this.props.children || this.props.label}
      </button>
    );
  }
}
