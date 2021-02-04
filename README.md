# node-liss

CLI for node.js-based workspace

```bash
node-liss
node-liss [platform]
node-liss [platform] [job]
```

* platform:
    * node
    * ts
    * ng

## node.js

Auto-detecting by `package.json`

### node-package-version

*Update `package.json`*

Change Version by Last Modified Time of Source files.

```bash
node-liss node package-version
```


---


## Angular

Auto-detecting by `angular.json`

### ng-app-detach
*Update `angular.json`, `package.json`, `tsconfig.json`*

Make Workspace to Single Application from Multiple Application and Libraries

```bash
node-liss ng app-detach --project
```


### ng-lib-from-dist

*Update `tsconfig.json`*

Libraries from Set Library Path by Destination Directory after `ng build`

```bash
node-liss ng lib-from-dist --project
```


### ng-lib-from-module

*Update `tsconfig.json`*

Set Library Path by node_modules after `npm install`

```bash
node-liss ng lib-from-module --project
```


### ng-lib-from-src

*Update `tsconfig.json`*

Set Library Path by Source direction

```bash
node-liss ng lib-from-src --project
```


### ng-lib-package
*Update `${project.root}/ng-package.json`, `${project.root}/${sub-package}/package.json`*

Create or Update Library Package for `umdIds`, `styleIncludePaths`

```bash
node-liss ng lib-package
```


### ng-optimize-scripts

*Update `package.json`*

Make Project's shorten commands

```bash
node-liss ng optimize-scripts
```


### ng-optimize-tslint

*Update `${project.root}/tslint.json`*

Append Director and Component Selector

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
