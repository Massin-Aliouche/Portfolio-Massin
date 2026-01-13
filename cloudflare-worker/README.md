Minimal Cloudflare Worker to proxy portfolio RSS JSON.

Files:
- `worker.js`: Worker script. Exposes `/rss` which fetches the raw `rss.json` from the GitHub repo and returns it with CORS headers.
- `wrangler.toml`: Example config. Add your `account_id` and adjust `route` if you want to publish.

Quick test (locally with `miniflare`):

1. npm install -g miniflare
2. cd cloudflare-worker
3. miniflare worker.js --watch
4. curl http://127.0.0.1:8787/rss

To deploy with Wrangler:

1. npm install -g wrangler
2. Set `account_id` in `wrangler.toml` and run `wrangler publish`

