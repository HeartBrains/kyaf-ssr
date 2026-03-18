# kyaf-ssr

Combined site for Bangkok Kunsthalle (`/bkkk`) and Khao Yai Art Forest (`/kyaf`) with a shared landing page at `/`.

Built with [TanStack Start](https://tanstack.com/start) (SSR, Node.js server via Nitro).

## Development

```bash
npm install
npm run dev        # http://localhost:3000
```

## Build

```bash
npm run build      # outputs to .output/
npm run start      # node .output/server/index.mjs
```

## Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `WORDPRESS_BKKK_API_URL` | WordPress REST API base URL for Bangkok Kunsthalle | No (falls back to mock data) |
| `WORDPRESS_KYAF_API_URL` | WordPress REST API base URL for Khao Yai Art Forest | No (falls back to mock data) |
| `PORT` | Server port (default: 3000) | No |

## Deployment (Hostinger Cloud Startup)

The GitHub Actions workflow (`.github/workflows/deploy.yml`) builds and deploys automatically on every push to `main`.

### Required GitHub Secrets

| Secret | Description |
|--------|-------------|
| `HOSTINGER_SSH_HOST` | Server IP or hostname |
| `HOSTINGER_SSH_USER` | SSH username |
| `HOSTINGER_SSH_KEY` | Private SSH key (PEM format) |
| `HOSTINGER_DEPLOY_PATH` | Remote deploy path, e.g. `/home/user/kyaf-ssr` |
| `GITLAB_TOKEN` | GitLab Personal Access Token (for mirror push) |

### First-time server setup

```bash
# On Hostinger server
npm install -g pm2
mkdir -p ~/kyaf-ssr
# After first deploy via GitHub Actions:
cd ~/kyaf-ssr && pm2 start ecosystem.config.js && pm2 save && pm2 startup
```

## GitLab Mirror

This repo is mirrored to `gitlab.com/mrolim77/kyaf-ssr` on every push to `main`.

## Route Structure

```
/           Landing page (BKK / KYAF selector)
/bkkk/*     Bangkok Kunsthalle
/kyaf/*     Khao Yai Art Forest
```
