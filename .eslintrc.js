module.exports = {
    "env": {
        "browser": true,
        "es2020": true
    },
    "extends": [
        "airbnb",
        "eslint:recommended",
        "plugin:react/recommended",
        "plugin:@typescript-eslint/recommended",
        "plugin:prettier/recommended"
    ],
    "parser": "@typescript-eslint/parser",
    "parserOptions": {
        "ecmaFeatures": {
            "jsx": true
        },
        "ecmaVersion": 11,
        "sourceType": "module"
    },
    "plugins": [
        "react",
        "@typescript-eslint"
    ],
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".tsx", ".ts", ".js"] }],
        "react/jsx-curly-newline": "off",
        "import/extensions": [
            "error",
            "ignorePackages",
            {
              "js": "never",
              "jsx": "never",
              "ts": "never",
              "tsx": "never"
            }
        ],
        "@typescript-eslint/explicit-module-boundary-types": "off",
        "prettier/prettier": [
          "error",
          {
            endOfLine: "auto",
          },
        ],
    },
    "settings": {
      "import/resolver": {
        "node": {
          "extensions": [
            ".js",
            ".jsx",
            ".json",
            ".ts",
            ".tsx"
          ]
        }
      }
    }
};
