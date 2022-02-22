# node-liss

Automatic node.js-based Development Environment Configuration

```bash
node-liss
node-liss [ENVIRONMENT]
node-liss [ENVIRONMENT] [JOB]
```

* [ENVIRONMENT]:
  * Listing to Console when skip
  * [**node**](./docs/NODE.md)
  * [**ts**](./docs/TS.md)
  * [**ng**](./docs/NG.md)
* [JOB]:
  * Listing to Console when skip

## Customize

Create `liss.json` to workspace root for customization.    
Follow the detailed description in `Configure` Section of Job.

```json
{
  "[ENVIRONMENT]": {
    "[JOB]": {
    }
  }
}
```
