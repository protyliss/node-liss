# node-liss

CLI for node.js-based workspace

```bash
# Now Available
node-liss
node-liss [PLATFORM]
node-liss [PLATFORM] [JOB]
```

* [PLATFORM]:
    * Listing to Console
    * **node**
    * **ts**
    * **ng**
* [JOB]:
    * Listing to Console
    * **Follow the below job section**

## Workspace Configure

Create `liss.json` to workspace root for customization.    
Follow the detailed description in below `Configure` Section.

```json
{
  "[PLATFORM]": {
    "[JOB]": {
    }
  }
}
```



---




## Platform - `node`: node.js

Auto-detecting by `package.json` when not entered [PLATFORM] parameter

#### Direct Execute

```bash
node-liss node
node-liss node [JOB]
```



###  Job - `node-package-version`

*Update `package.json`*

Change Version by Last Modified Time of Source files.

#### Direct Execute

```bash
node-liss node package-version
```



---



## Platform - `ng`: Angular

Auto-detecting by `angular.json` when not entered [PLATFORM] parameter

```bash
node-liss ng
node-liss ng [JOB]
```



###  Job - `ng-app-detach`
*Update `angular.json`, `package.json`, `tsconfig.json`*
__Caution: Remove Unused files from Selected Project__

Make Workspace to Single Application from Multiple Application and Libraries    


#### Direct Execute

```bash
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


###  Job - `ng-lib-from-dist`

*Update `tsconfig.json`*

Libraries from Set Library Path by Destination Directory after `ng build`

__tsconfig.json > compilerOptions > paths__:
```json
{
	"{{key}}": "dist/{{key}}"
}
```

#### Direct Execute

```bash
node-liss ng lib-from-dist --project
```


### Job - `ng-lib-from-module`

*Update `tsconfig.json`*

Set Library Path by node_modules after `npm install`


#### Direct Execute

```bash
node-liss ng lib-from-module --project
```


###  Job - `ng-lib-from-src`

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

#### Direct Call
```bash
node-liss ng lib-from-src --project
```


###  Job - `ng-lib-package`
*Update `${project.root}/ng-package.json`, `${project.root}/${sub-package}/package.json`*

Create or Update Library Package for `umdIds`, `styleIncludePaths`

#### Direct Execute

```bash
node-liss ng lib-package
```


###  Job - `ng-optimize-scripts`

*Update `package.json`*

Make Project's shorten commands

#### Direct Execute

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
      }
    }
  }
}
```
* `{{key}}` will replace to project key of angular


###  Job - `ng-optimize-tslint`

*Update `${project.root}/tslint.json`*

Append Director and Component Selector

#### Direct Execute

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
