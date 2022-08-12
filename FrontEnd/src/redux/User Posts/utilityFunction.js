export const ObjectToArray = (data) => {
  if (typeof data !== "object") return [];

  const result = Object.keys(data).map((key) => data[key]);

  return result;
};
