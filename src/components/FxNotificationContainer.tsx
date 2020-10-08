interface UseNotificationContainer {
  container: HTMLElement;
}

const fxNotificationContainerId = 'fx-notification-container';
export function useNotificationContainer(): UseNotificationContainer {
  const container =
    document.getElementById(fxNotificationContainerId) ||
    (() => {
      const dom = document.createElement('div');
      dom.id = fxNotificationContainerId;
      dom.classList.add('flax');
      dom.classList.add('fx-notification-container');
      document.body.appendChild(dom);

      return dom;
    })();

  return {
    container,
  };
}
