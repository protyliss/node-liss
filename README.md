# node-liss

CLI for node.js-based workspace

```bash
liss
```

## node.js

Auto-detecting by `package.json`

### node-pkg-ver

> Update `package.json`

Change Version by Last Modified Time of Source files.

---

## Angular

Auto-detecting by `angular.json`

### ng-lib-from-dist

> Update `tsconfig.json`

Libraries from Set Library Path by Destination Directory after `ng build`

### ng-lib-from-module

> Update `tsconfig.json`

Set Library Path by node_modules after `npm install`

### ng-lib-from-src

> Update `tsconfig.json`

Set Library Path by Source direction

### ng-optimize-scripts

> Update `package.json`

Make Project's shorten commands

### ng-optimize-tslint

> Update `${project.root}/tslint.json`

Append Director and Component Selector

__Configure__:

```json
{
  "ng": {
    "optimizeTslint": {
      "^foo": "foo"
    }
  }
}
```

__projects/foo/tslint.json__:

```json
{
  "rules": {
    "directory-selector": [
      "foo"
    ],
    "component-selector": [
      "foo"
    ]
  }
}
```
