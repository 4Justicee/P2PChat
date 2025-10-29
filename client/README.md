# P2P Chat Client (Vite + React + TypeScript)

This is the frontend for the P2P Chat application. It uses Vite for development and build, and connects to a Socket.IO signaling server to establish WebRTC peer-to-peer data channels for chat.

## Dev URLs and Ports

- App (Vite dev server): http://localhost:30002
- API/Signaling (server): http://localhost:30001

## Environment Variables

Create these files (values shown are typical defaults):

- `.env.development`
  ```env
  REACT_APP_SIGNALING_SERVER_URL=http://localhost:30001
  REACT_APP_API_BASE_URL=http://localhost:30001
  ```

- `.env.production`
  ```env
  REACT_APP_SIGNALING_SERVER_URL=wss://api.p2pchat.luckyverse.club
  REACT_APP_API_BASE_URL=https://api.p2pchat.luckyverse.club
  ```

Notes:
- Only variables prefixed with `REACT_APP_` are exposed to the app.
- Production values should use `wss://` for Socket.IO and `https://` for REST.

## Scripts

From the `client/` directory:

- `npm run dev` — Start Vite dev server on port 30002
- `npm run build` — Build for production (outputs to `dist/`)
- `npm run preview` — Preview the built app locally on port 30002

## API Proxy (Dev)

`vite.config.js` proxies `/api` to your local server:

```js
server: {
  host: true,
  port: 30002,
  proxy: {
    '/api': {
      target: 'http://localhost:30001',
      changeOrigin: true
    }
  }
}
```

The app uses absolute URLs derived from `REACT_APP_API_BASE_URL` and `REACT_APP_SIGNALING_SERVER_URL` for fetch and Socket.IO connections.

## Build & Deploy

1. Set production env vars (see above)
2. `npm run build`
3. Serve the `dist/` directory via your hosting/CDN

If your platform uses Vite Preview for staging, `vite.config.js` includes:

```js
preview: {
  host: true,
  port: 30002,
  allowedHosts: ['localhost', 'p2pchat.luckyverse.club', '.luckyverse.club']
}
```

## Troubleshooting

- Seeing CORS errors? Ensure the server allows your client origin and that env URLs are correct.
- Cannot connect via WebSocket in production? Use `wss://` and ensure TLS termination is configured at the reverse proxy.
- Messages not delivered P2P? The app falls back to server relay; verify STUN/TURN if P2P is required across NATs.
