// Need following packages beside typescript
// eslint eslint-config-airbnb-base eslint-plugin-import @typescript-eslint/parser @typescript-eslint/eslint-plugin

module.exports = {
  "extends": [
    "eslint-config-airbnb-base",
    "plugin:@typescript-eslint/recommended",
  ],
  "env": {
    "browser": true,
    "es6": true,
    "jest": true,
  },
  "parser": "@typescript-eslint/parser",
  "settings": {
    "import/resolver": {
      "node": {
        "extensions": [".js", ".jsx", ".ts", ".tsx"],
      },
    },
  },
	"rules": {
    "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/no-unused-vars": "off", // tsc takes care of this
    "@typescript-eslint/no-use-before-define": "off",
    "arrow-parens": ["error", "always"],
    "class-methods-use-this": "off",
    "import/prefer-default-export": "off",
  },
  "overrides": [
    {
      "files": ["*.js"],
      "rules": {
        "@typescript-eslint/no-var-requires": "off",
      },
    },
  ],
};
