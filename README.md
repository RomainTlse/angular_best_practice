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
  font-family: "Overlock"
  src: url("/assets/fonts/Overlock-Regular.ttf")

@font-face
  font-family: "Overlock Italic"
  src: url("/assets/fonts/Overlock-Italic.ttf")

@font-face
  font-family: "Overlock Black"
  font-weight: 900
  src: url("/assets/fonts/Overlock-Black.ttf")

@font-face
  font-family: "Overlock Black Italic"
  font-weight: 900
  src: url("/assets/fonts/Overlock-BlackItalic.ttf")

@font-face
  font-family: "Overlock Bold"
  font-weight: 700
  src: url("/assets/fonts/Overlock-Bold.ttf")

@font-face
  font-family: "Overlock Bold Italic"
  font-weight: 700
  src: url("/assets/fonts/Overlock-BoldItalic.ttf")

@font-face
  font-family: "Overlock Italic"
  src: url("/assets/fonts/Overlock-Italic.ttf")

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
$my-custom-typography-config: mat.define-typography-config($headline: mat.define-typography-level($font-family: 'Montserrat Bold', $font-weight: 500, $font-size: 48px, $line-height: 1.25, $letter-spacing: normal), $title: mat.define-typography-level($font-family: 'Montserrat Bold', $font-size: 32px, $line-height: 1.25, $letter-spacing: normal), $subheading-2: mat.define-typography-level($font-family: 'Montserrat Bold', $font-size: 28px, $line-height: 1.25, $letter-spacing: normal), $subheading-1: mat.define-typography-level($font-family: 'Montserrat Bold', $font-size: 24px, $line-height: 1.25, $letter-spacing: normal), $body-1: mat.define-typography-level($font-family: 'Montserrat', $font-size: 16px, $line-height: 1.5, $letter-spacing: 1px), $body-2: mat.define-typography-level($font-family: 'Montserrat bold', $font-size: 16px, $line-height: 1.5, $letter-spacing: normal), $caption: mat.define-typography-level($font-family: 'Montserrat', $font-size: 13px, $line-height: 1.5, $letter-spacing: normal), $button: mat.define-typography-level($font-family: 'Montserrat', $font-size: 12px), $input: mat.define-typography-level($font-family: 'Montserrat', $font-size: 16px, $line-height: 1, $letter-spacing: normal))
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

## Mise en place de l'architecture de base

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

###### `page-in-progress`

```
ng g m core/ui/pages/page-in-progress
ng g c core/ui/pages/page-in-progress --module=core/ui/pages/page-in-progress
```

###### `page-not-found`

```
ng g m core/ui/pages/page-not-found
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
│   └── sass-helper
├── interceptors
│   └── http-request.interceptor.ts
├── services
│   └── http-request.services.ts
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

##### Initialisation des services

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
│   └── home
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
```

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
```

#### `cooking-recipe`

##### Architecture de base du module

```
cooking-recipe
├── components
├── pages
│   └── home
├── cooking-recipe.module.ts
└── cooking-recipe-routing.module.ts
```

##### Initialisation du module `cooking-recipe`

```
ng g m modules/cooking-recipe --routing --module=app
```

###### Initialisation des pages

####### `page-in-progress`

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
