# AngularBestPractice

## Environnement

node 16.14.0
npm 8.3.1

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.3.

## Eslint/Prettier/husky/commitlint

### Reference website

`https://dev.to/smetankajakub/how-to-integrate-husky-eslint-prettier-to-project-in-less-than-15-minutes-5gh`

`https://itnext.io/angular-with-eslint-prettier-husky-6581ecd66fbb`

`https://delicious-insights.com/fr/articles/git-hooks-et-commitlint/`

### Installation of libraries

`npm install --save-dev prettier pretty-quick eslint eslint-plugin-prettier eslint-config-prettier husky @commitlint/config-conventional @commitlint/cli @commitlint/cz-commitlint @commitlint/config-angular commitizen`

`ng add @angular-eslint/schematics`

### Configuration of libraries

`./node_modules/.bin/eslint --init`

`npx husky-init && npm install`

`npx husky add .husky/pre-push "ng build --aot true"`

#### `.husky/commit-msg`

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npx --no -- commitlint --edit $1
```

#### `.husky/pre-commit`

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

ng lint --quiet --fix
npx pretty-quick --staged
```

#### `.husky/pre-push`

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

ng build --aot true
```

#### `.eslintrc`

```json
{
  "root": true,
  "ignorePatterns": ["projects/**/*"],
  "overrides": [
    {
      "files": ["*.ts"],
      "parserOptions": {
        "project": ["tsconfig.json", "e2e/tsconfig.json"],
        "createDefaultProgram": true
      },
      "extends": [
        "plugin:@typescript-eslint/recommended",
        "plugin:@angular-eslint/recommended",
        "plugin:@angular-eslint/template/process-inline-templates",
        "plugin:prettier/recommended"
      ],
      "rules": {
        "@angular-eslint/component-class-suffix": [
          "error",
          {
            "suffixes": ["Page", "Component"]
          }
        ],
        "@angular-eslint/component-selector": [
          "error",
          {
            "type": "element",
            "prefix": "app",
            "style": "kebab-case"
          }
        ],
        "@angular-eslint/directive-selector": [
          "error",
          {
            "type": "attribute",
            "prefix": "app",
            "style": "camelCase"
          }
        ],
        "@typescript-eslint/member-ordering": 0,
        "@typescript-eslint/naming-convention": 0
      }
    },
    {
      "files": ["*.html"],
      "extends": ["plugin:@angular-eslint/template/recommended"],
      "rules": {}
    },
    {
      "files": ["*.html"],
      "excludedFiles": ["*inline-template-*.component.html"],
      "extends": ["plugin:prettier/recommended"],
      "rules": {
        "prettier/prettier": [
          "error",
          {
            "parser": "angular"
          }
        ]
      }
    }
  ]
}
```

#### `.prettierignore`

```
package.json
package-lock.json
yarn.lock
dist
node_modules
```

#### `.prettierrc`

```json
{
  "tabWidth": 2,
  "useTabs": false,
  "bracketSameLine": true,
  "bracketSpacing": true,
  "singleQuote": true,
  "jsxSingleQuote": true,
  "arrowParens": "avoid",
  "trailingComma": "es5",
  "printWidth": 160,
  "semi": true,
  "overrides": [
    {
      "files": ["*.json", ".babelrc"],
      "options": {
        "parser": "json-stringify"
      }
    },
    {
      "files": ["*.jsonc", "tsconfig*.json"],
      "options": {
        "parser": "json"
      }
    },
    {
      "files": ["*.js", "*.cjs", "*.mjs"],
      "options": {
        "parser": "babel"
      }
    },
    {
      "files": ["*.ts"],
      "options": {
        "parser": "typescript"
      }
    },
    {
      "files": ["*.html"],
      "options": {
        "parser": "html"
      }
    }
  ]
}
```

#### `commitlint.config.js`

```javascript
module.exports = {
  extends: ['@commitlint/config-angular'],
  parserPreset: 'conventional-changelog-conventionalcommits',
  rules: {
    'subject-case': [2, 'always', 'sentence-case'],
  },
  prompt: {
    messages: {
      skip: ':skip',
      max: 'pas plus de %d caractères',
      min: 'au moins %d caractères',
      emptyWarning: 'ne peut être vide',
      upperLimitWarning: 'au-dessus de la limite',
      lowerLimitWarning: 'sous la limite',
    },
    questions: {
      type: {
        description: 'Choisissez le type de modification que concerne votre commit :',
        enum: {
          feat: {
            description: 'Ajout/mise à jour de fonctionnalité',
            title: 'Features',
            emoji: '✨',
          },
          fix: {
            description: 'Correction de bug',
            title: 'Bug Fixes',
            emoji: '🐛',
          },
          docs: {
            description: 'Ajout/modif. de documentation',
            title: 'Documentation',
            emoji: '📚',
          },
          style: {
            description: 'Modifs de style et de mise en forme du code (espacements, virgules, etc.)',
            title: 'Styles',
            emoji: '💎',
          },
          refactor: {
            description: 'Modif. des sources n’étant ni un correctif, ni un ajout de fonctionnalité',
            title: 'Code Refactoring',
            emoji: '📦',
          },
          perf: {
            description: 'Amélioration de la performance',
            title: 'Performance Improvements',
            emoji: '🚀',
          },
          test: {
            description: 'Ajout ou correction de tests',
            title: 'Tests',
            emoji: '🚨',
          },
          build: {
            description: 'Modif. affectant le "build" ou les dépendances externes (exemples de contextes :  webpack, broccoli, npm)',
            title: 'Builds',
            emoji: '🛠',
          },
          ci: {
            description: 'Modif. de la configuration ou des scripts liés à la CI (Travis, Circle, BrowserStack, SauceLabs, etc.)',
            title: 'Continuous Integrations',
            emoji: '⚙️',
          },
          chore: {
            description: 'Autres mises à jour ne modifiant ni les sources, ni les tests',
            title: 'Chores',
            emoji: '♻️',
          },
          revert: {
            description: 'Annuler (revert) un commit précédent',
            title: 'Revert',
            emoji: '🗑',
          },
        },
      },
      scope: {
        description: 'Quel est le contexte des modifications (composant, nom de fichier)',
      },
      subject: {
        description: 'Écrivez une description concise, à l’impératif',
      },
      body: {
        description: 'Renseignez une description plus détaillée des modifications',
      },
      isBreaking: {
        description: 'Y a-il des changements majeurs ("breaking changes") ?',
      },
      breakingBody: {
        description:
          'Un commit cassant la compatibilité ascendante ("breaking changes") nécessite un corps de message. Veuillez renseigner une description plus longue et détaillée que la première ligne du commit.',
      },
      breaking: {
        description: 'Décrivez les "breaking changes"',
      },
      isIssueAffected: {
        description: 'Cela concerne-t-il un ticket existant ?',
      },
      issuesBody: {
        description:
          'Vous devez ajouter un corps au message si ce commit ferme des tickets. Essayez de renseigner une description plus longue et détaillée que la première ligne du commit.',
      },
      issues: {
        description: 'Ajoutez une référence de ticket ("fix #123", "ref #123")',
      },
    },
  },
};
```

#### `package.json`

```json
  "scripts" : {
    "prepare": "husky install",
    "lint": "ng lint --fix",
    "format": "npx prettier \"src/**/*.{js,jsx,ts,tsx,html,css,scss}\" --write"
  },
  "config": {
    "commitizen": {
      "path": "@commitlint/cz-commitlint"
    }
  },
```

### comamand

#### eslint

`ng lint --fix`

#### prettier

`npx prettier "src/**/*.{js,jsx,ts,tsx,html,css,scss}" --write`

#### commitlint

`npx cz`

## Tests

### TU

#### installation of libraries

`npm install karma-firefox-launcher karma-junit-reporter -D`

#### configuration of libraries

##### `karma.conf.js`

```javascript
// Karma configuration file, see link for more information
// https://karma-runner.github.io/1.0/config/configuration-file.html

module.exports = function (config) {
  config.set({
    basePath: '',
    frameworks: ['jasmine', '@angular-devkit/build-angular'],
    plugins: [
      require('karma-jasmine'),
      require('karma-chrome-launcher'),
      require('karma-firefox-launcher'),
      require('karma-jasmine-html-reporter'),
      require('karma-coverage'),
      require('karma-junit-reporter'),
      require('@angular-devkit/build-angular/plugins/karma'),
    ],
    client: {
      jasmine: {
        // you can add configuration options for Jasmine here
        // the possible options are listed at https://jasmine.github.io/api/edge/Configuration.html
        // for example, you can disable the random execution with `random: false`
        // or set a specific seed with `seed: 4321`
      },
      clearContext: false, // leave Jasmine Spec Runner output visible in browser
    },
    jasmineHtmlReporter: {
      suppressAll: true, // removes the duplicated traces
    },
    coverageReporter: {
      dir: require('path').join(__dirname, './coverage/angular_best_practice'),
      subdir: '.',
      reporters: [{ type: 'html' }, { type: 'text-summary' }, { type: 'cobertura' }],
    },
    reporters: ['progress', 'kjhtml', 'junit'],
    port: 9876,
    colors: true,
    logLevel: config.LOG_INFO,
    autoWatch: true,
    browsers: ['ChromeHeadlessCI', 'Chrome', 'Firefox'],
    customLaunchers: {
      ChromeHeadlessCI: {
        base: 'Chrome',
        flags: ['--no-sandbox', '--headless', '--disable-gpu', '--remote-debugging-port=9222'],
      },
    },
    singleRun: false,
    restartOnFileChange: true,
    junitReporter: {
      outputDir: '', // results will be saved as $outputDir/$browserName.xml
      outputFile: undefined, // if included, results will be saved as $outputDir/$browserName/$outputFile
      suite: '', // suite will become the package name attribute in xml testsuite element
      useBrowserName: true, // add browser name to report and classes names
      nameFormatter: undefined, // function (browser, result) to customize the name attribute in xml testcase element
      classNameFormatter: undefined, // function (browser, result) to customize the classname attribute in xml testcase element
      properties: {}, // key value pair of properties to add to the <properties> section of the report
      xmlVersion: null, // use '1' if reporting to be per SonarQube 6.2 XML format
    },
  });
};
```

##### `.husky/pre-commit`

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

ng lint --quiet --fix
ng test  --code-coverage --watch=false --browsers=ChromeHeadless
npx pretty-quick --staged
```

#### command

`ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

### test e2e

#### Reference website

```
https://dzone.com/articles/7-easy-steps-to-generate-xml-and-html-reports-in-cypress
https://dev.to/ganeshsirsi/how-to-generate-both-junit-xml-and-html-reports-in-cypress-step-by-step-guide-4dgd
https://www.npmjs.com/package/@cypress/schematic
```

#### installation of libraries

`npm install cypress cypress-mochawesome-reporter junit-report-merger mocha-junit-reporter cypress-multi-reporters mocha -D`

`ng add @cypress/schematic`

#### configuration of libraries

##### `cypress.json`

```json
{
  "integrationFolder": "cypress/integration",
  "supportFile": "cypress/support/index.ts",
  "videosFolder": "cypress/videos",
  "screenshotsFolder": "cypress/screenshots",
  "pluginsFile": "cypress/plugins/index.ts",
  "fixturesFolder": "cypress/fixtures",
  "baseUrl": "http://localhost:4200",
  "reporter": "cypress-multi-reporters",
  "reporterOptions": {
    "reporterEnabled": "cypress-mochawesome-reporter, mocha-junit-reporter",
    "cypressMochawesomeReporterReporterOptions": {
      "reportDir": "cypress/reports",
      "charts": true,
      "html": true,
      "json": true,
      "reportPageTitle": "Angular best practice test e2e",
      "embeddedScreenshots": true,
      "inlineAssets": true
    },
    "mochaJunitReporterReporterOptions": {
      "mochaFile": "cypress/reports/junit/results-[hash].xml"
    }
  },
  "video": false
}
```

##### `cypress/plugin/index.js`

```javascript
// Plugins enable you to tap into, modify, or extend the internal behavior of Cypress
// For more info, visit https://on.cypress.io/plugins-api
const { beforeRunHook, afterRunHook } = require('cypress-mochawesome-reporter/lib');
const exec = require('child_process').execSync;
module.exports = on => {
  on('before:run', async details => {
    console.log('override before:run');
    await beforeRunHook(details);
  });

  on('after:run', async () => {
    console.log('override after:run');
    //if you are using other than Windows remove below line (having await exec)
    await exec('npx jrm ./cypress/reports/junitreport.xml ./cypress/reports/junit/*.xml');
    await afterRunHook();
  });
};
```

##### `cypress/support/index.js`

```javascript
import './commands';
import 'cypress-mochawesome-reporter/register';
```

##### `package.json`

```json
{
  "scripts": {
    ...
    "e2e": "ng e2e",
    "clean:screenshots": "if exist cypress\\screenshots rmdir /s/q cypress\\screenshots",
    "cy:run": "npm run clean:screenshots && cypress run --browser chrome"
  }
}
```

##### `.husky/pre-commit`

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

ng lint --quiet --fix
ng test  --code-coverage --watch=false --browsers=ChromeHeadless
npm run cy:run
npx pretty-quick --staged
```

#### command

`ng e2e` to execute the graphical e2e tests via [Cypress](https://docs.cypress.io/guides/overview/why-cypress).

`npm run cy:run` to execute the terminal e2e tests via [Karma](https://karma-runner.github.io).

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The application will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via a platform of your choice. To use this command, you need to first add a package that implements end-to-end testing capabilities.

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
