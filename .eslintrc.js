module.exports = {
  env: {
    node: true,
    browser: true,
    jest: true,
  },
  parser: "@typescript-eslint/parser", // Specifies the ESLint parser
  extends: [
    "plugin:@typescript-eslint/recommended", // Uses the recommended rules from @typescript-eslint/eslint-plugin
    "plugin:react/recommended", // Uses the recommended rules from @eslint-plugin-react
    "plugin:react-hooks/recommended",
    "plugin:import/errors",
    "plugin:import/warnings",
    "plugin:import/typescript",
    "plugin:jsdoc/recommended",
    "prettier", // Enables eslint-plugin-prettier and displays prettier errors as ESLint errors. Make sure this is always the last configuration in the extends array.
    "prettier/@typescript-eslint", // Uses eslint-config-prettier to disable ESLint rules from @typescript-eslint/eslint-plugin that would conflict with prettier
    "prettier/react",
  ],
  parserOptions: {
    ecmaVersion: 2018, // Allows for the parsing of modern ECMAScript features
    sourceType: "module", // Allows for the use of imports
    ecmaFeatures: {
      jsx: true, // Allows for the parsing of JSX
    },
  },
  rules: {
    // Place to specify ESLint rules. Can be used to overwrite rules specified from the extended configs
    // e.g. "@typescript-eslint/explicit-function-return-type": "off",
    "@typescript-eslint/explicit-function-return-type": [
      "warn",
      {
        allowTypedFunctionExpressions: true,
        allowExpressions: true,
      },
    ],
    "react/prop-types": 0,
    "import/first": 2,
    "import/newline-after-import": 2,
    "import/order": [
      "error",
      {
        groups: [
          "builtin",
          "external",
          "internal",
          "parent",
          "sibling",
          "index",
        ],
        "newlines-between": "never",
      },
    ],
    "no-restricted-imports": [
      "error",
      {
        paths: [
          {
            name: "react-redux",
            importNames: ["useSelector", "useDispatch", "useStore"],
            message:
              "Use the selectors from `src/lib` or `src/helpers/*/useSelector` instead",
          },
          {
            name: "next/router",
            importNames: ["useRouter"],
            message: "Use `src/lib:useRouter` instead",
          },
          {
            name: "next/document",
            importNames: ["Head"],
            message: "Use `next/head:default` instead",
          },
          {
            name: "next/link",
            importNames: ["default"],
            message: "Use `src/components/_lib_:Link` instead",
          },
          {
            name: "classnames",
            importNames: ["default"],
            message: "Use `src/lib:cc` instead",
          },
          {
            name: "classcat",
            importNames: ["default"],
            message: "Use `src/lib:cc` instead",
          },
          {
            name: "shelljs",
            importNames: ["exec"],
            message: "Use `scripts/lib:spawn` instead",
          },
          {
            name: "npm-run",
            importNames: ["spawn"],
            message: "Use `scripts/lib:spawn` instead",
          },
        ],
        patterns: [
          "src/types/*", // types should only be imported from `src/types`
          "src/lib/*", // lib funcs should only be imported from `src/lib`
          "src/components/_lib_/*", // _lib_ components should only be imported from `src/components/_lib_`

          // styles should only be imported from `src/styles`, except for .s?[ac]ss files
          "src/styles/*",
          "!src/styles/**/*.scss",
          "!src/styles/**/*.sass",
          "!src/styles/**/*.css",
        ],
      },
    ],
    "no-return-assign": ["error", "except-parens"],
    "import/no-default-export": [0],
    "react/no-children-prop": [0], // turn this off so it doesn't conflict with things like Grommet's `children` prop
    "@typescript-eslint/explicit-function-return-type": [0], // maybe can turn back on once project is complete?

    // JSDoc stuff, let's progressively use JSDoc, not force it on people. typescript should do most of this work
    "jsdoc/require-jsdoc": [0],
    "jsdoc/require-returns": [0],
    "spaced-comment": ["error", "always", { markers: ["/"] }], // prevents errors in *.d.ts files - https://github.com/typescript-eslint/typescript-eslint/issues/600
    "react-hooks/rules-of-hooks": "error",
    "react-hooks/exhaustive-deps": "warn",
    "react/react-in-jsx-scope": "off", // no need for react import with new nextjs
  },
  settings: {
    react: {
      version: "detect", // Tells eslint-plugin-react to automatically detect the version of React to use
    },
    "import/resolver": {
      "babel-plugin-root-import": {},
      node: {
        paths: ["./"],
      },
    },
  },
};
