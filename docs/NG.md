# node-liss for Angular

Environments:

* [__Angular__](NG.md) - Current Document
* [Typescript](TS.md)
* [Node](NODE.md)

---

Auto-detecting by `angular.json` when not entered [PLATFORM] parameter

```bash
node-liss ng
node-liss ng [JOB]
```

## Jobs

### ng-app-detach

*Update `angular.json`, `package.json`, `tsconfig.json`*
__Caution: Remove Unused files from Selected Project__

Make Workspace to Single Application from Multiple Application and Libraries

Direct Execute:

```bash
node-liss ng app-detach
node-liss ng app-detach --project
node-liss ng app-detach --project --confirm
```

#### Configure

```json
{
  "ng": {
    "appDetach": {
      "addDependencies": {
        "[PACKAGE]": "[VERSION]"
      }
    }
  }
}
```

* `addDependencies` are including to DI after optimized.

### ng-app-worker

*Update `angular.json`*

Create `tsconfig.worker.json` File to Application Root And Add It path to `angular.json`

Direct Execute:

```bash
node-liss ng app-worker
node-liss ng app-worker --project
```

### ng-lib-from-dist

*Update `tsconfig.json`*

Libraries from Set Library Path by Destination Directory after `ng build`

__tsconfig.json > compilerOptions > paths__:

```json
{
  "{{key}}": "dist/{{key}}"
}
```

Direct Execute:

```bash
node-liss ng lib-from-dist
node-liss ng lib-from-dist --project
```

### ng-lib-from-src

*Update `tsconfig.json`*

Set Library Path by Source direction

__tsconfig.json > compilerOptions > paths__:

```json
{
  "{{key}}": [
    "projects/{{key}}/src/public-api"
  ]
}
```

Direct Execute:

```bash
node-liss ng lib-from-src
node-liss ng lib-from-src --project
```

### ng-lib-package

*Update `${project.root}/ng-package.json`, `${project.root}/${sub-package}/ng-package.json`*

Create or Update Sub Package's ng-package.json

Direct Execute:

```bash
node-liss ng lib-package
```

### ng-optimize-scripts

*Update `package.json`*

Make Project's shorten commands

Direct Execute:

```bash
node-liss ng optimize-scripts
```

#### Configure

```json
{
  "ng": {
    "optimizeScripts": {
      "library": {
        "{{key}}": "{{key}}"
      },
      "application": {
        "{{key}}": "{{key}}"
      },
      "scripts": {
        "foo": "foo",
        "bar": "bar"
      }
    }
  }
}
```

* `{{key}}` - key of `projects` in angular.json
* `{{root}}` - `projects[key].root` in angular.json
* `scripts` property are static scripts

### ng-optimize-tslint

*Update `${project.root}/tslint.json`*

Append Director and Component Selector

Direct Execute:

```bash
node-liss ng optimize-tslint
```

#### Configure

```json
{
  "ng": {
    "optimizeTslint": {
      "^foo": "foo"
    }
  }
}
```

* Property Key is `RegExp`

> projects/foo/tslint.json :
> ```json
> {
>   "rules": {
>     "directory-selector": [
>       "foo"
>     ],
>     "component-selector": [
>       "foo"
>     ]
>   }
> }
> ```

### ng-remove-project

*Update `angular.json`, `tsconfig.json`*

Remove Project File and Properties.

Direct Execute:

```bash
node-liss ng remove-project
node-liss ng remove-project --project
node-liss ng remove-project --project --confirm
```
