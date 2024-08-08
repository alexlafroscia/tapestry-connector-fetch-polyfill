# tapesty-connector-fetch-polyfill

This package provides a [`fetch`][fetch] polyfill for the [Tapestry Connector][tapestry] runtime, which does not provide a `fetch` implementation itself. The goal for this package is to provide as much of a `fetch` implementation as is possible on top of the [`sendRequest`][sendRequest] API that Tapestry defines.

Note: this is in _no way_ a full implementation of `fetch` or the `Request`, `Response` or `Header` APIs. At this time, only a global `fetch` implementation is provided at all. It might not be sufficient for your needs, but in my case, I was able to make due with this!

In places where the correct API is not able to be implemented, execeptions are thrown so that the limitations of this polyfill are made very obvious.

## Installation

This package can be installed from the `npm` registry in any Node project:

```bash
yarn add -D @alexlafroscia/tapestry-connector-fetch-polyfill
```

You can then install the polyfill by importing this into your plugin's source code:

```js
import "@alexlafroscia/tapestry-connector-fetch-polyfill/install";
```

With that in place, you will now have a global `fetch` function defined!

## Usage Tips

Tapestry connectors are not allowed to import other files. If you want to make use of this package in your own Tapestry connector, you will need to perform a bundling step that outputs the `plugin.js` file, rather than authoring it directly yourself.

I have had success with this by using [`esbuild`][esbuild] with the `--bundle` option, which stitches together any imported modules into a single file that Tapestry can handle!

## Why use this?

I would _not_ recommend using this just to call the `fetch` API yourself; if you are in full control over the code being authored, I would strongly suggest you directly interact with the [`sendRequest`][sendRequest] API.

This _can_ be useful, however, if you want to bundle other external code into your plugin that itself makes use of the `fetch` API. Polyfilling `fetch` based off of `sendRequest` can help run code that assumes that `fetch` has been defined in whatever environment is executing the code, since that is typical of most JavaScript environments these days.

## Other Resources

- [Tapestry Connector Type Defs][tapestry-type-defs]: provides TypeScript types for the Tapestry Connector API
- [Tapestry Connector Fastmail][tapestry-connector-fastmail]: this makes use of both the type definitions and this `fetch` polyfill!

[fetch]: https://developer.mozilla.org/en-US/docs/Web/API/Window/fetch
[tapestry]: https://github.com/TheIconfactory/Tapestry/blob/main/Documentation/API.md
[sendRequest]: https://github.com/TheIconfactory/Tapestry/blob/main/Documentation/API.md#sendrequesturl-method-parameters-extraheaders--promise
[esbuild]: https://esbuild.github.io
[tapestry-type-defs]: https://github.com/alexlafroscia/tapestry-connector-type-defs
[tapestry-connector-fastmail]: https://github.com/alexlafroscia/tapestry-connector-fastmail
