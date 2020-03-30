/** Convert a list of objects to a dictionary keyed off of key */
export function listToDictionary<
  K extends string,
  T extends { [K: string]: any }
>(list: T[], key: K) {
  const dictionary: Record<string, T> = {};

  list.forEach(item => {
    const id = item[key];
    dictionary[id] = item;
  });

  return dictionary;
}
