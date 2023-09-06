module.exports = {
  root: true,
  env: {
    node: true,
  },
  extends: "airbnb-base",
  rules: {
    "no-underscore-dangle": 0,
    "no-param-reassign": 0,
    "no-return-assign": 0,
    camelcase: 0,
    quotes: [2, "double"],
    "no-plusplus": 0,
    "arrow-body-style": 1,
    "import/no-extraneous-dependencies": 0,
  },
};
