module.exports = {
  "env": {
    "es6": true,
    "node": true
  },
  "extends": [
    "eslint:recommended",
    "prettier",
    "plugin:prettier/recommended",
    "plugin:jest/recommended"
  ],
  "plugins": [
    "prettier",
    "jest"
  ],
  "parserOptions": {
    "ecmaVersion": 2018,
    "sourceType": "module"
  },
  "rules": {
    "prettier/prettier": ["error", {
      "singleQuote": true
    }]
  }
};
