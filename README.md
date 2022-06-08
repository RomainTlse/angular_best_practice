# AngularBestPractice

## Environnement

node 16.14.0
npm 8.3.1

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 13.3.3.

## Installation de `@types/node`

`npm i --save-dev @types/node`

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
    "build:hook": "ng build --aot true",
    "lint:hook": "ng lint --quiet --fix",
    ...
    "lint": "ng lint",
    "lint:hook": "ng lint --quiet --fix",
    "format": "npx prettier \"src/**/*.{js,jsx,ts,tsx,html,css,scss}\" --write",
  },
  "config": {
    "commitizen": {
      "path": "@commitlint/cz-commitlint"
    }
  },
```

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

npm run lint:hook
npx pretty-quick --staged
```

#### `.husky/pre-push`

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run build:hook
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

##### `package.json`

rajouter les lignes suivantes :

```json
  "scripts" : {
    "test": "ng test",
    "test:hook": "ng test  --code-coverage --watch=false --browsers=ChromeHeadless",
    "test:ci": "ng test  --code-coverage --watch=false --browsers=ChromeHeadless",
  },
```

##### `.husky/pre-commit`

mofidier le fichier pour obtenir :

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint:hook
npm run test:hook
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

`npm install cypress cypress-mochawesome-reporter junit-report-merger mocha-junit-reporter cypress-multi-reporters mocha start-server-and-test-D`
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

Rajouter les lignes suivantes :

```json
{
  "scripts": {
    "e2e": "ng e2e",
    "cy:run": "cypress run --browser chrome",
    "cy:serve": "ng serve",
    "cy:hook": "start-server-and-test cy:serve http://localhost:4200 cy:run",
    "cy:ci": "start-server-and-test cy:serve http://localhost:4200 cy:run"
  }
}
```

##### `.husky/pre-commit`

Modifier le fichier pour obtenir :

```
#!/bin/sh
. "$(dirname "$0")/_/husky.sh"

npm run lint:hook
npm run test:hook
npm run cy:hook
npx pretty-quick --staged
```

#### command

`ng e2e` to execute the graphical e2e tests via [Cypress](https://docs.cypress.io/guides/overview/why-cypress).

`npm run cy:run` to execute the terminal e2e tests via [Karma](https://karma-runner.github.io).

## Graphical charter

You can find an example of the graphic charter here:

`src/assets/graphical_charter`

### Angular material

#### Installation

`ng add @angular/material`

![alt text](src/assets/images/readme/add%20material.PNG)

![alt text](src/assets/images/readme/custom%20material.PNG)

![alt text](src/assets/images/readme/material%20typo.PNG)

![alt text](src/assets/images/readme/material%20animation.PNG)

#### Custom theme angular material

change `custom-theme.scss` to `custom-theme.sass`

update `angular.json` with

```json
"projects": {
  "angular_best_practice": {
    "architect": {
      "build": {
        "styles": [
          "src/custom-theme.sass",
          "src/styles.sass"
        ],
        "stylePreprocessorOptions": {
          "includePaths": [
            "src/assets/styles/"
          ]
        }
      },
      "test": {
        "options": {
        "stylePreprocessorOptions": {
          "includePaths": [
            "src/assets/styles/"
          ]
        },
      }
    }
  }
}
```

edit `custom-theme.sass`

```sass

// Custom Theming for Angular Material
// For more information: https://material.angular.io/guide/theming
@use '@angular/material' as mat

@include mat.core()

@import 'assets/styles/variables'
@import '~@angular/material/theming'

// define fonts

@font-face
  font-family: "Montserrat"
  font-weight: 400
  src: url('/assets/fonts/Montserrat/Montserrat-VariableFont_wght.ttf')

@font-face
  font-family: "Montserrat Italic"
  font-weight: 400
  src: url("/assets/fonts/Montserrat/Montserrat-Italic-VariableFont_wght.ttf")

@font-face
  font-family: "Montserrat Bold"
  font-weight: 600
  src: url('/assets/fonts/Montserrat/Montserrat-VariableFont_wght.ttf')

@font-face
  font-family: "Montserrat Italic Bold"
  font-weight: 600
  src: url("/assets/fonts/Montserrat/Montserrat-Italic-VariableFont_wght.ttf")

@font-face
  font-family: "Montserrat Black"
  font-weight: 800
  src: url('/assets/fonts/Montserrat/Montserrat-VariableFont_wght.ttf')

@font-face
  font-family: "Montserrat Italic Black"
  font-weight: 800
  src: url("/assets/fonts/Montserrat/Montserrat-Italic-VariableFont_wght.ttf")

@font-face
  font-family: 'Iceland'
  src: url("/assets/fonts/Iceland/Iceland-Regular.ttf")


//define colors palettes
$angular_best_practice-primary-palette: (50 : #fbe2ec, 100 : #f6b8cf, 200 : #f088af, 300 : #e9588f, 400 : #e53577, 500 : #e0115f, 600 : #dc0f57, 700 : #d80c4d,800 : #d30a43, 900 : #cb0532, A100 : #fff4f6, A200 : #ffc1cc, A400 : #ff8ea2, A700 : #ff758d, contrast: (50 : #000000, 100 : #000000, 200 : #000000, 300 : #000000, 400 : #ffffff, 500 : #ffffff, 600 : #ffffff, 700 : #ffffff, 800 : #ffffff, 900 : #ffffff, A100 : #000000, A200 : #000000, A400 : #000000, A700 : #000000))
$angular_best_practice-accent-palette: (50 : #e4e6e7, 100 : #bcc0c3, 200 : #8f979b, 300 : #626d72, 400 : #414d54, 500 : #1f2e36, 600 : #1b2930, 700 : #172329, 800 : #121d22, 900 : #0a1216, A100 : #58c1ff, A200 : #25adff, A400 : #0097f1, A700 : #0087d8, contrast: (50 : #000000, 100 : #000000, 200 : #000000, 300 : #ffffff, 400 : #ffffff, 500 : #ffffff, 600 : #ffffff, 700 : #ffffff, 800 : #ffffff, 900 : #ffffff, A100 : #000000, A200 : #000000, A400 : #ffffff, A700 : #ffffff))
$angular_best_practice-warn-palette: (50 : #f6e0e0, 100 : #e8b3b3, 200 : #d98080, 300 : #ca4d4d, 400 : #be2626, 500 : #b30000, 600 : #ac0000, 700 : #a30000, 800 : #9a0000, 900 : #8b0000, A100 : #ffb7b7, A200 : #ff8484, A400 : #ff5151, A700 : #ff3737, contrast: ( 50 : #000000, 100 : #000000, 200 : #000000, 300 : #ffffff, 400 : #ffffff, 500 : #ffffff, 600 : #ffffff, 700 : #ffffff, 800 : #ffffff, 900 : #ffffff, A100 : #000000, A200 : #000000, A400 : #000000, A700 : #ffffff))

$angular_best_practice-primary: mat.define-palette($angular_best_practice-primary-palette)
$angular_best_practice-accent: mat.define-palette($angular_best_practice-primary-palette, A200, A100, A400)
$angular_best_practice-warn: mat.define-palette($angular_best_practice-warn-palette)

$angular_best_practice-background-palette: (status-bar: map_get($angular_best_practice-accent-palette, 800),app-bar: map_get($angular_best_practice-accent-palette, 800), background: $primary--background, hover: rgba(white, 0.04), card: map_get($angular_best_practice-accent-palette, 700), dialog: map_get($angular_best_practice-accent-palette, 800),disabled-button: rgba(white, 0.25),raised-button: map_get($angular_best_practice-accent-palette, 800),focused-button: rgba(white, 0.25),selected-button: map_get($angular_best_practice-primary-palette, 200),selected-disabled-button: map_get($angular_best_practice-primary-palette, 100),disabled-button-toggle: black,unselected-chip: map_get($angular_best_practice-primary-palette, 300),disabled-list-option: rgba(white, 0.25),tooltip: map_get($angular_best_practice-accent-palette, 900))
$angular_best_practice-foreground-palette: (base: map_get($angular_best_practice-accent-palette, 200),divider: rgba(#f088af, 0.25),dividers: rgba(#f088af, 0.25),disabled: rgba(white, 0.5),disabled-button: rgba(white, 0.5),disabled-text: rgba(white, 0.5),elevation: rgba(black, 0.2),hint-text: rgba(white, 0.2),secondary-text: rgba(white, 0.75),icon: rgba(white, 0.54),icons: rgba(white, 0.54),text: rgba(white, 0.87),slider-min: rgba(white, 0.57),slider-off: rgba(white, 0.26),slider-off-active: rgba(white, 0.58))

// define theme
@function create-esa-theme()
  @return (primary: $angular_best_practice-primary, accent: $angular_best_practice-accent, warn: $angular_best_practice-warn, is-dark: true, foreground: $angular_best_practice-foreground-palette, background: $angular_best_practice-background-palette)

$esa-material-custom-theme: create-esa-theme()
@include angular-material-theme($esa-material-custom-theme)

// define typographies
$my-custom-typography-config: mat.define-typography-config($headline: mat.define-typography-level($font-family: 'Iceland', $font-weight: 500, $font-size: 48px, $line-height: 1.25, $letter-spacing: normal), $title: mat.define-typography-level($font-family: 'Iceland', $font-size: 32px, $line-height: 1.25, $letter-spacing: normal), $subheading-2: mat.define-typography-level($font-family: 'Iceland', $font-size: 28px, $line-height: 1.25, $letter-spacing: normal), $subheading-1: mat.define-typography-level($font-family: 'Iceland', $font-size: 24px, $line-height: 1.25, $letter-spacing: normal), $body-1: mat.define-typography-level($font-family: 'Montserrat', $font-size: 16px, $line-height: 1.5, $letter-spacing: 2px), $body-2: mat.define-typography-level($font-family: 'Montserrat bold', $font-size: 16px, $line-height: 1.5, $letter-spacing: normal), $caption: mat.define-typography-level($font-family: 'Montserrat', $font-size: 13px, $line-height: 1.5, $letter-spacing: normal), $button: mat.define-typography-level($font-family: 'Montserrat', $font-size: 12px), $input: mat.define-typography-level($font-family: 'Montserrat', $font-size: 16px, $line-height: 1, $letter-spacing: normal))
@include mat.core($my-custom-typography-config)

html, body
  height: 100%

body
  margin: 0

*
  box-sizing: border-box

.mat-button-wrapper
  text-transform: uppercase
  line-height: 1.5
  letter-spacing: 0.25em
```

#### Ajout des polices

Telecharger les polices suivantes et les copiers dans `assets/fonts` :

https://fonts.google.com/specimen/Montserrat?query=Montserrat

https://fonts.google.com/specimen/Iceland?category=Display

#### Création du fichiers `variables.sass`

Dans `src/assets/`

```
mkdir styles && cd $_ && nano variables.sass
```

Dans `src\app\app-routing.module.ts` modifier le chargement des routes

```typescript
import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {
      preloadingStrategy: PreloadAllModules,
    }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
```

#### Favicon

##### création du favicon

`https://www.favicon-generator.org/`

##### Mise en place du favicon

```html
<link rel="apple-touch-icon" sizes="57x57" href="assets/favicons/apple-icon-57x57.png" />
<link rel="apple-touch-icon" sizes="60x60" href="assets/favicons/apple-icon-60x60.png" />
<link rel="apple-touch-icon" sizes="72x72" href="assets/favicons/apple-icon-72x72.png" />
<link rel="apple-touch-icon" sizes="76x76" href="assets/favicons/apple-icon-76x76.png" />
<link rel="apple-touch-icon" sizes="114x114" href="assets/favicons/apple-icon-114x114.png" />
<link rel="apple-touch-icon" sizes="120x120" href="assets/favicons/apple-icon-120x120.png" />
<link rel="apple-touch-icon" sizes="144x144" href="assets/favicons/apple-icon-144x144.png" />
<link rel="apple-touch-icon" sizes="152x152" href="assets/favicons/apple-icon-152x152.png" />
<link rel="apple-touch-icon" sizes="180x180" href="assets/favicons/apple-icon-180x180.png" />
<link rel="icon" type="image/png" sizes="192x192" href="assets/favicons/android-icon-192x192.png" />
<link rel="icon" type="image/png" sizes="32x32" href="assets/favicons/favicon-32x32.png" />
<link rel="icon" type="image/png" sizes="96x96" href="assets/favicons/favicon-96x96.png" />
<link rel="icon" type="image/png" sizes="16x16" href="assets/favicons/favicon-16x16.png" />
<link rel="manifest" href="assets/favicons/manifest.json" />
<meta name="msapplication-TileColor" content="#ffffff" />
<meta name="msapplication-TileImage" content="assets/favicons/ms-icon-144x144.png" />
<meta name="theme-color" content="#ffffff" />
```

## Mise en place de l'intégration continue

### Référence

https://betterprogramming.pub/ci-cd-for-angular-developers-be9a1485d22b

### Configuration

Ajouter le fichier `.github/workflows/ci.yml` avec le contenu suivant :

```yaml
name: CI
on: push
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout ✅
        uses: actions/checkout@v2
      - name: Setup 🏗
        uses: actions/setup-node@v2
        with:
          node-version: 16.14.0
          cache: 'npm'
      - name: Install ⚙️
        run: npm ci
      - name: Build 🛠
        run: npm run build:ci
      - name: Test Unitaire 📋
        run: npm run test:ci
      - name: Test e2e 📋
        run: npm run cy:ci
```

## Mise en place déploiement continue

### Référence

https://dev.to/sandeepbalachandran/how-to-build-and-deploy-angular-application-to-surge-using-github-actions-38h9
https://localcoder.org/only-run-job-on-specific-branch-with-github-actions

### Installation

`npm install surge --save-dev`

### Configuration

`node_modules/.bin/surge login`
`./node_modules/.bin/surge -p dist/ --domain angular-best-pratice-stage.surge.sh`

Créer un token, si ça n'a pas été fait :

`./node_modules/.bin/surge token`

Définir `SURGE_DOMAIN` dans github avec `angular-best-pratice-stage.surge.sh`:
Définir `SURGE_TOKEN` dans github avec le token créé précédement :

`settings` -> `Secrets` -> `New repository secret`

```yaml
name: CI
on: push
jobs:
  ci:
    runs-on: ubuntu-latest
    steps:
      - name: Checkout ✅
        uses: actions/checkout@v2
      - name: Setup 🏗
        uses: actions/setup-node@v2
        with:
          node-version: 16.14.0
          cache: 'npm'
      - name: Install ⚙️
        run: npm ci
      - name: Test Unitaire 📋
        run: npm run test:ci
      - name: Test e2e 📋
        run: npm run cy:ci
      - name: Build 🛠
        run: npm run build:ci
      - name: Archive build
        if: success()
        uses: actions/upload-artifact@v1
        with:
          name: deploy_dist
          path: dist
  deploy:
    runs-on: ubuntu-latest
    needs: ci
    name: Deploying to surge
    if: github.ref == 'refs/heads/master'
    steps:
      - uses: actions/checkout@v2
      - name: Download build
        uses: actions/download-artifact@v1
        with:
          name: deploy_dist
      - name: Install surge and fire deployment
        uses: actions/setup-node@v1
        with:
          node-version: 16.14.0
      - run: npm install -g surge
      - run: surge ./deploy_dist/angular_best_practice ${{ secrets.SURGE_DOMAIN }} --token ${{ secrets.SURGE_TOKEN }}
```

## Mise en place de Docker

### Référence

https://medium.com/@jfgreffier/conteneuriser-votre-application-angular-avec-docker-et-nginx-6378b63a73f9

https://www.indellient.com/blog/how-to-dockerize-an-angular-application-with-nginx/

### `package.json`

```json
  "scripts" : {
    "build:docker": "ng build --aot true --configuration=production",
  },
```

### `Dockerfile`

```

# Stage 1: Compile and Build angular codebase

# Use official node image as the base image
FROM node:16.14.0-alpine as build

# Set the working directory
WORKDIR /usr/src/app

# Add the source code to app
COPY . .

# Install all the dependencies
RUN npm install

# Generate the build of the application
RUN npm run build:docker


# Stage 2: Serve app with nginx server

# Use official nginx image as the base image
FROM nginx:1.21-alpine

# Copy the build output to replace the default nginx contents.
COPY --from=build /usr/src/app/dist/angular_best_practice /usr/share/nginx/html

# Expose port 80
EXPOSE 80

```

### .dockerignore

```
.angular/
.github/
.husky/
.vscode/
coverage/
cypress/
dist/
node_modules/
.git
.gitignore
.prettierignore
```

### Commande

`docker build . -t maas-public-site`

`docker run -p 8080:80 maas-public-site` --> `http://localhost:8080/`

## Création de l'architecture de base

### `core`

##### Architecture de base du module

```
core
├── auth
├── ui
├── utils
└── core.module.ts
```

#### Initialisation du module `core`

```
ng g m core --module=app
```

#### Création du module `auth`

##### Architecture de base du module

TODO à revoir

```
auth
├── guards
├── interceptors
├── interfaces
├── pages
│   └── login
├── services
└── auth.module.ts
```

##### Initialisation du module

```
ng g m core/auth --module=core
```

#### Création du module `ui`

##### Architecture de base du module

```
ui
├── components
│   ├── loader
│   └── message
├── interfaces
│   ├── breadcrump.ts
│   ├── loader.ts
│   └── message.ts
├── pages
│   ├── page-error
│   ├── page-in-progress
│   └── page-not-found
├── services
│   ├── breadcrump.services.ts
│   ├── loader.services.ts
│   └── message.services.ts
├── shared
│   ├── breadcrumps
│   ├── footer
│   ├── header
│   └── menu
└── ui.module.ts
```

##### Initialisation du module

```
ng g m core/ui --module=core
```

##### Initialisation des components

###### `loader`

```
ng g c core/ui/components/loader --module=core/ui
```

###### `message`

```
ng g c core/ui/components/message --module=core/ui
```

##### Initialisation des interfaces

###### `breadcrumb`

```
ng g interface core/ui/interfaces/breadcrumb
```

###### `loader`

```
ng g interface core/ui/interfaces/loader
```

###### `message`

```
ng g interface core/ui/interfaces/message
```

##### Initialisation des pages

###### `page-error`

```
ng g m core/ui/pages/page-error --module=core/ui
ng g c core/ui/pages/page-error --module=core/ui/pages/page-error

###### `page-in-progress`

```

ng g m core/ui/pages/page-in-progress --module=core/ui
ng g c core/ui/pages/page-in-progress --module=core/ui/pages/page-in-progress

```

###### `page-not-found`

```

ng g m core/ui/pages/page-not-found --module=core/ui
ng g c core/ui/pages/page-not-found --module=core/ui/pages/page-not-found

```

##### Initialisation des services

###### `breadcrumb`

```

ng g s core/ui/services/breadcrumb

```

###### `loader`

```

ng g s core/ui/services/loader

```

###### `message`

```

ng g s core/ui/services/message

```

##### Initialisation des composants 'shared'

###### `breadcrumb`

```

ng g c core/ui/shared/breadcrumb --module=core/ui

```

###### `footer`

```

ng g c core/ui/shared/footer --module=core/ui

```

###### `header`

```

ng g c core/ui/shared/header --module=core/ui

```

###### `menu`

```

ng g c core/ui/shared/menu --module=core/ui

```

#### Création du module `utils`

##### Architecture de base du module

```

utils
├── components
│ └── sass-helper
├── interceptors
│ └── http-request.interceptor.ts
├── interfaces
│ └── config.ts
├── services
│ ├── external-link.service.ts
│ ├── global-config.service.ts
│ └── http-request.services.ts
└── ui.module.ts

```

##### Initialisation du module

```

ng g m core/utils --module=core

```

##### Initialisation des components

###### `sass-helper`

```

ng g c core/utils/components/sass-helper --module=core/utils

```

##### Initialisation des interceptors

###### `http-request`

```

ng g interceptor core/utils/interceptors/http-request

```

##### Initialisation des interfaces

###### `config`

```

ng g interface core/utils/interfaces/config

```

##### Initialisation des services

###### `external-link`

```

ng g s core/utils/services/external-link

```

###### `global-config`

```

ng g s core/utils/services/global-config

```

###### `http-request`

```

ng g s core/utils/services/http-request

```

### `Modules`

#### `graphical-charter`

##### Architecture de base du module

```

graphical-charter
├── components
├── pages
│ └── home
├── graphical-charter.module.ts
└── graphical-charter-routing.module.ts

```

##### Initialisation du module `graphical-charter`

```

ng g m modules/graphical-charter --routing --module=app

```

###### Initialisation des pages

####### `page-in-progress`

```

ng g m modules/graphical-charter/pages/home --module=modules/graphical-charter
ng g c modules/graphical-charter/pages/home --module=modules/graphical-charter/pages/home

````

Dans `src\app\modules\graphical-charter\graphical-charter.module.ts` modifier les routes

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';

const routes: Routes = [
  {
    path: 'graphicalcharter',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
        component: HomeComponent,
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class GraphicalCharterRoutingModule {}
````

#### `cooking-recipe`

##### Architecture de base du module

```
cooking-recipe
├── components
├── pages
│   └── home
├── resolvers
│   └── cooking.resolver.ts
├── cooking-recipe.module.ts
└── cooking-recipe-routing.module.ts
```

##### Initialisation du module `cooking-recipe`

```
ng g m modules/cooking-recipe --routing --module=app
```

###### Initialisation des pages

####### `cooking-recipe`

```
ng g m modules/cooking-recipe/pages/home --module=modules/cooking-recipe
ng g c modules/cooking-recipe/pages/home --module=modules/cooking-recipe/pages/home
```

Dans `src\app\modules\cooking-recipe\cooking-recipe-routing.module.ts` modifier les routes

```typescript
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from '../../core/ui/pages/page-not-found/page-not-found.component';

const routes: Routes = [
  {
    path: 'cookingrecipe',
    children: [
      {
        path: '',
        loadChildren: () => import('./pages/home/home.module').then(m => m.HomeModule),
        component: HomeComponent,
      },
    ],
  },
  {
    path: '**',
    pathMatch: 'full',
    loadChildren: () => import('../../core/ui/pages/page-not-found/page-not-found.module').then(m => m.PageNotFoundModule),
    component: PageNotFoundComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class CookingRecipeRoutingModule {}
```

###### Initialisation des resolvers

####### `cooking.resolver.ts`

`ng g resolver modules/cooking-recipe/resolvers/cooking`

## Mise en place de l'internationalisation

### Installation

```
npm install @ngx-translate/core --save
npm install @ngx-translate/http-loader --save
```

### Configuration

Modifier le fichier `app.module.ts`

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { CoreModule } from './core/core.module';
import { GraphicalCharterModule } from './modules/graphical-charter/graphical-charter.module';
import { CookingRecipeModule } from './modules/cooking-recipe/cooking-recipe.module';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';

export function createTranslateLoader(http: HttpClient) {
  return new TranslateHttpLoader(http, './assets/i18n/', '.json');
}

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    TranslateModule.forRoot({
      defaultLanguage: 'fr',
      loader: {
        provide: TranslateLoader,
        useFactory: createTranslateLoader,
        deps: [HttpClient],
      },
    }),
    CoreModule,
    GraphicalCharterModule,
    CookingRecipeModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
```

Modifier le fichier `app.component.ts`

```typescript
import { Component } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.sass'],
})
export class AppComponent {
  title = 'angular_best_practice';

  constructor(private _translate: TranslateService) {
    _translate.setDefaultLang('fr');
    _translate.use('fr');
  }
}
```

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
