export default {
  ACCESS_JWT_SECRET: process.env.ACCESS_JWT_SECRET || "secretyek",
  REFRESH_JWT_SECRET: process.env.REFRESH_JWT_SECRET || "secretrefreshkey",
  jwtExpiration: 900,
  jwtRefreshExpiration: 7200,
  jwtRememberExpiration: 864,
};
