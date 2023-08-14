import { PostWithRatesType } from "../types/postWithRatesType";

export const sortArray = <T extends PostWithRatesType>(
  arr: T[],
  type: "increase" | "decrease"
): T[] => {
  const arrCopy = JSON.parse(JSON.stringify(arr));

  switch (type) {
  case "increase":
    return arrCopy.sort((a: T, b: T) => {
      if (a[1].averageRate < b[1].averageRate) {
        return 1;
      }
      if (a[1].averageRate > b[1].averageRate) {
        return -1;
      }
      return 0;
    });
  case "decrease":
    return arrCopy.sort((a: T, b: T) => {
      if (a[1].averageRate > b[1].averageRate) {
        return 1;
      }
      if (a[1].averageRate < b[1].averageRate) {
        return -1;
      }
      return 0;
    });
  default:
    return arrCopy;
  }
};
