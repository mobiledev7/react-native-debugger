# Redux DevTools Integration

We used [RemoteDev App](https://github.com/zalmoxisus/remotedev-app) and made the API same with [Redux DevTools Extension](https://github.com/zalmoxisus/redux-devtools-extension).

If you've enabled `Debug JS remotely` with React Native Debugger, the following API is already included in global:

- `window.__REDUX_DEVTOOLS_EXTENSION__`
- `window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__`
- `window.__REDUX_DEVTOOLS_EXTENSION__.connect`
- You can just use [`redux-devtools-extension`](https://www.npmjs.com/package/redux-devtools-extension) npm package.

See also:

- [API Reference](https://github.com/zalmoxisus/redux-devtools-extension/tree/master/docs/API)
- [Troubleshooting](https://github.com/zalmoxisus/redux-devtools-extension/blob/master/docs/Troubleshooting.md)
- Other Integrations
  - [MobX](https://github.com/mobxjs/mobx)
    - [`mobx-remotedev`](https://github.com/zalmoxisus/mobx-remotedev) - See [`the counter example`](../examples/counter-with-mobx/src/stores/counter), make sure `remote` option is `false`.
    - [`mobx-state-tree`](https://github.com/mobxjs/mobx-state-tree) - Use [`connectReduxDevtools`](https://github.com/mobxjs/mobx-state-tree/blob/a3c59ac816026f3c2d3d5621d8f74be2b95e2891/middleware/README.md#connectreduxdevtools) middleware.

You can ignore the things specified by the browser extension.

## About `trace` feature

- The debugger app might be slowed down if you enabled the `trace` feature and visited the `Trace` tab, because it will load and parse the source map for every selected action.

## Other documentations

- [Getting Started](getting-started.md)
- [Debugger Integration](debugger-integration.md)
- [React DevTools Integration](react-devtools-integration.md)
- [Apollo Client DevTools Integration](apollo-client-devtools-integration.md)
- [Shortcut references](shortcut-references.md)
- [Network inspect of Chrome Developer Tools](network-inspect-of-chrome-devtools.md)
- [Enable open in editor in console](enable-open-in-editor-in-console.md)
- [Config file in home directory](config-file-in-home-directory.md)
- [Troubleshooting](troubleshooting.md)
- [Contributing](contributing.md)
