# API proxing using Cloudflare Workers

This project uses [Clouflare Workers](https://workers.cloudflare.com/) serverless functions resources to build an API Proxy aiming protect API keys. This project is inspired by [Transversy Media](https://www.youtube.com/channel/UC29ju8bIPH5as8OGnQzwJyA) [video](https://www.youtube.com/watch?v=ZGymN8aFsv4&list=PLWqO4DsAhHwDX2qGcHePltj9w5Bo_OaNf), where he creates an API Proxy server, but using express server. The original code base is available [here](https://github.com/bradtraversy/node-api-proxy-server). 

## Dependencies

This project was build and configured using [Wrangler CLI](https://developers.cloudflare.com/workers/cli-wrangler). Please, ensure you have wrangler configured properly in your machine if you want to test and publish. 

## Configuring

Create a copy of `wrangler.toml.example`, renaming it to `wrangler.toml`.

In `wrangler.toml`, you can change your worker name by setting up variable `name`.

Set up your API-related environment variables attributing values to `API_BASE_URL`, `API_KEY_NAME`, and `API_KEY_VALUE`. If you are using this code to exercise or learning, follow original Transversy Media [Open Weather Map API](https://openweathermap.org/api) configuration. 

Create a KV namespace on Cloudflare Workers settings, following [official docs](https://developers.cloudflare.com/workers/runtime-apis/kv). Set up `id` variable on `wrangler.toml` with created KV namespace id. If you want to use another bind than `KV_CACHE`, does not forget to update it also on the source code. 

Now you are ready to both modify the code and/or publish it on your Cloudflare workers space.

## Publishing

Wse Wrangler Cli to publish the project, making it available online:

```shell
wrangler publish
```

Additional publish paths could be found on [official docs](https://developers.cloudflare.com/workers/get-started/guide#8-publish-your-project).

