<br />
<div align="center">
  <picture>
    <img src="assets/icons/icon.svg" height="200px" align="center">
  </picture>
</div>
<div align="center">

  [![Release](https://img.shields.io/github/package-json/v/getezy/ezy)](https://github.com/getezy/ezy/releases/latest)
  [![Discord](https://img.shields.io/badge/Discord-7289DA?style=flat&logo=discord&logoColor=white)](https://discord.gg/r26ETPgj6R)

</div>

`ezy` - desktop gRPC client.

<div align="center">
  <img src="docs/preview.gif" align="center">
</div>
<br />

🚧 This project is in beta phase and can get breaking changes at any time until it goes to v1.

## Features
✅ Localy persisted collections.  
✅ Multi-tabs.  
✅ Shortcuts.  
✅ Environments.  

**gRPC**  
✅ Unary calls.  
✅ Client/Server/Bidirectional streaming.  
✅ Stream cancelation.  
✅ Metadata support.  
✅ TLS (Server-side/Mutual) with CA/Self-Signed certificates.  
✅ Good errors output.  

**gRPC-web**  
🏃‍♂️ Coming soon... 🏃‍♂️  

## Getting started
Install the latest version for your OS from [release page](https://github.com/getezy/ezy/releases/latest).

Today you can update only by manually downloading new app version and reinstalling it. I'm working on automatic updates.

## Shortcuts

Use `⌘+K` (macOS) or `Ctrl+K`(Windows/Linux), just try it.

## Working with 64-bit integers
If you want to send 64-bit integers (`int64`, `uint64`, `sint64`, `fixed64`, `sfixed64`) just wrap values in quotes.

```json
{
  "int64": "9223372036854775807",
  "uint64": "18446744073709551615",
  "sint64": "-9223372036854775807",
  "fixed64": "18446744073709551615",
  "sfixed64": "-9223372036854775807"
}
```

## Build from source

```bash
  $ npm ci
  $ npm run make
```

## Roadmap

Actual roadmap available [here](https://github.com/orgs/getezy/projects/1/views/1).

## License
Mozilla Public License Version 2.0
