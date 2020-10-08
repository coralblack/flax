export function classNames(
  ...args: Array<
    string | boolean | {[key: string]: boolean | undefined} | undefined | null
  >
): string {
  return args
    .reduce<Array<string>>((o, e) => {
      if (typeof e === 'string' && e) o.push(e);
      else if (Array.isArray(e)) o.push(classNames(e));
      else if (e && typeof e === 'object') {
        Object.keys(e).forEach(k => {
          if (e[k]) o.push(k);
        });
      }

      return o;
    }, [])
    .join(' ');
}
