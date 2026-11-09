# OctoFit Tracker frontend

React 19 and Vite presentation tier for OctoFit Tracker.

## Development

Before starting Vite, configure the API host in `octofit-tracker/frontend/.env.local`:

```dotenv
VITE_CODESPACE_NAME=your-codespace-name
```

Use the value of the `CODESPACE_NAME` environment variable without a protocol or port. Vite reads `VITE_CODESPACE_NAME` at startup, so restart the dev server after changing the file. The API URL will use `https://<name>-8000.app.github.dev`. If it is unset or blank, requests use `http://localhost:8000`.

Run the frontend with `npm run dev --prefix octofit-tracker/frontend`; make sure the backend API is running on port `8000`.

Build with `npm run build --prefix octofit-tracker/frontend`.
