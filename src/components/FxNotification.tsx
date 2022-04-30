import React, {useCallback, useEffect, useState} from 'react';
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

interface ProgressBar {
  pause: () => void;
  resume: () => void;
  done: () => void;
}

function Progress(
  callback: () => void,
  elem: HTMLSpanElement,
  delay: number
): ProgressBar {
  let timerId = setTimeout(callback, delay);
  let remaining = delay;
  let start = new Date().getTime();

  const anim = () => {
    const prev = ((delay - remaining) / delay) * 100;

    if (elem) {
      elem.style.width =
        String(
          prev + ((new Date().getTime() - start) / remaining) * (100 - prev)
        ) + '%';
    }
  };

  let animInterval = setInterval(anim, 5);

  return {
    pause() {
      clearTimeout(timerId);
      clearInterval(animInterval);
      remaining -= new Date().getTime() - start;
    },
    resume() {
      start = new Date().getTime();

      clearTimeout(timerId);
      clearInterval(animInterval);

      timerId = setTimeout(callback, remaining);
      animInterval = setInterval(anim, 5);
    },
    done() {
      clearTimeout(timerId);
      clearInterval(animInterval);
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
      render(<FxNotification {...props} />, wrapper, () => {
        const closeButton = wrapper.getElementsByTagName('button');
        const progressBar = wrapper.getElementsByTagName('span');

        let progress: ProgressBar | undefined = undefined;

        const cb = () => {
          wrapper.classList.add('--hide');
          !!progress && progress.done();

          setTimeout(() => {
            ReactDOM.unmountComponentAtNode(wrapper);
            wrapper.remove();
          }, 450);
        };

        closeButton[0]?.addEventListener('click', () => {
          cb();
        });

        progress = Progress(cb, progressBar[0], Math.min(delay || 5000, 5000));

        wrapper.addEventListener('mouseover', () => {
          !!progress && progress.pause();
        });

        wrapper.addEventListener('mouseout', () => {
          !!progress && progress.resume();
        });
      });
    },
  };
}

function Type(type: FxNotificationType) {
  if (!type || type === 'INFO') return null;

  return (
    <>
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
          </>
        )}
        {type === 'ERROR' && (
          <>
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
          </>
        )}
      </div>
    </>
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
        <button className="close">Close</button>
        <div className="progress">
          <span />
        </div>
      </div>
    </>
  );
}
