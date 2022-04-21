import React, {useEffect} from 'react';
import ReactDOM, {render} from 'react-dom';
import {useNotificationContainer} from './FxNotificationContainer';
import {classNames} from '../utils';

export type FxNotificationType = 'SUCC' | 'WARN' | 'ERROR' | 'INFO';
export interface FxNotificationPayload {
  type?: FxNotificationType;
  title?: string;
  message: string;
}
export interface FxNotificationAttrs extends FxNotificationPayload {
  delay?: number;
}
export type FxNotificationToast = string | FxNotificationPayload;

interface UseNotificationProps {}
interface UseNotification {
  container: HTMLElement;
  alert: (attrs: FxNotificationPayload) => void;
}

/* eslint-disable @typescript-eslint/no-explicit-any */
function PauseableTimeout(callback: any, delay: number) {
  let timerId = setTimeout(callback, delay);
  let remaining = delay;
  let start = new Date().getTime();

  return {
    pause() {
      clearTimeout(timerId);
      remaining -= new Date().getTime() - start;
    },

    resume() {
      start = new Date().getTime();
      clearTimeout(timerId);
      timerId = setTimeout(callback, remaining);
    },
  };
}

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export function useNotification(props: UseNotificationProps): UseNotification {
  const {container} = useNotificationContainer();

  return {
    container,
    alert: (attrs: FxNotificationAttrs) => {
      const {delay, ...props} = attrs;
      const wrapper = document.createElement('div');
      wrapper.classList.add('fx-notification-wrapper');
      container.appendChild(wrapper);
      render(<FxNotification {...props} />, wrapper);

      const closed = wrapper.children[0];

      const cb = () => {
        wrapper.classList.add('--hide');
        setTimeout(() => {
          ReactDOM.unmountComponentAtNode(wrapper);
          wrapper.remove();
        }, 450);
      };

      attrs.type === ('WARN' || 'ERROR') &&
        closed &&
        closed.addEventListener('click', () => {
          wrapper.classList.add('--hide');
          setTimeout(() => {
            ReactDOM.unmountComponentAtNode(closed);
            ReactDOM.unmountComponentAtNode(wrapper);
            wrapper.remove();
          }, 450);
        });

      const timer = PauseableTimeout(cb, delay || 5000);

      wrapper.addEventListener('mouseover', () => {
        <div className={'pause'}></div>;

        timer.pause();
      });

      wrapper.addEventListener('mouseout', () => {
        timer.resume();
      });
    },
  };
}

function Type(type: FxNotificationType) {
  if (!type || type === 'INFO') return null;

  return (
    <div className="--icon">
      {type === 'SUCC' && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M5 13l4 4L19 7"
          />
        </svg>
      )}
      {type === 'WARN' && (
        <>
          <div className="--closed">
            <div className="line-box">
              <span className="line-01"></span>
              <span className="line-02"></span>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <div className="meter">
            <span>
              <span className="progress"></span>
            </span>
          </div>
        </>
      )}
      {type === 'ERROR' && (
        <>
          <div className="--closed">
            <div className="line-box">
              <span className="line-01"></span>
              <span className="line-02"></span>
            </div>
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
          <div className="meter">
            <span>
              <span className="progress"></span>
            </span>
          </div>
        </>
      )}
    </div>
  );
  //if (type === 'WARN') return <div>W</div>;
  //if (type === 'ERROR') return <div>E</div>;
}

interface FxNotificationProps extends FxNotificationPayload {}

export function FxNotification(props: FxNotificationProps) {
  const {type, title, message} = props;

  useEffect(() => {
    // Initialize

    return () => {
      // Clear
    };
  });

  return (
    <>
      <div
        className={classNames(
          'flax fx-notification',
          `--${(type || 'info').toLocaleLowerCase()}`
        )}
      >
        {type && Type(type)}
        {title && <strong>{title}</strong>}
        {message}
      </div>
    </>
  );
}
