export const generateRateColor = (rate: number) => {
  const postStyle = {
    green: "#086d1e",
    yellow: "#a3a10a",
    red: "#a30a0a",
  };

  const degree = {
    hight: 4,
    average: 3.2,
    low: 0,
  };

  if (rate >= 4) {
    return postStyle.green;
  } else if (rate > degree.average && rate < degree.hight) {
    return postStyle.yellow;
  } else if (rate > degree.low && rate <= degree.average) {
    return postStyle.red;
  }
};
