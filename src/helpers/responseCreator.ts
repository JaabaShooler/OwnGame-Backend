export const responseCreator = <T>(data: T, success = true) => {
  return {
    data,
    success,
  };
};
