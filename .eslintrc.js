module.exports = {
    "env": {
        "es6": true,
        "node": true,
        "mocha": true
    },
    "globals": {
      // "window": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "script",
        "ecmaVersion":6
    },
    "parser":"babel-eslint",
    "rules": {
        "indent": [
            "error",
            2
        ],
        // "linebreak-style": [
        //     "error",
        //     "unix"
        // ],
        "quotes": [
            "error",
            "single"
        ],
        "semi": [
            "error",
            "always"
        ],
        "no-console": ["error", {
          "allow": ["warn", "error", "info"]
        }]
    }
};
