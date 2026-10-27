# Deployment Guide: Netlify, Vercel & Production Host

DataQuery Web is engineered to deploy cleanly to both **Netlify** and **Vercel** with zero code changes, leveraging Next.js App Router static optimization and client-side WebAssembly execution.

---

## 🚀 Side-by-Side Setup

### Option A: Vercel Deployment

1. **Push your code to GitHub**:
   Ensure `main` (production) and `dev` (staging) branches exist on GitHub.
2. **Import Repository in Vercel Dashboard**:
   - Go to [vercel.com/new](https://vercel.com/new).
   - Log in with GitHub and select your repository: `AkbarDev/dataquery-web` (or `dataquery`).
   - Framework Preset: **Next.js** (detected automatically).
   - Root Directory: `./` (leave default).
3. **Environment Variables**:
   In the "Environment Variables" section, add:
   - `NEXT_PUBLIC_APP_NAME` = `DataQuery AI`
   - `NEXT_PUBLIC_APP_URL` = `https://dataquery.in`
   - `NEXT_PUBLIC_API_BASE_URL` = `/api`
   - `NEXT_PUBLIC_ENABLE_MOCKS` = `true`
4. **Deploy**:
   Click **Deploy**. Every pull request will automatically generate an immutable Preview URL.

---

### Option B: Netlify Deployment

1. **Import Repository in Netlify Dashboard**:
   - Go to [app.netlify.com](https://app.netlify.com) and click **"Add new site" > "Import an existing project"**.
   - Authenticate with GitHub and choose `dataquery-web`.
2. **Build Configuration**:
   - Build command: `npm run build`
   - Publish directory: `.next`
   - Netlify will detect `netlify.toml` automatically and install `@netlify/plugin-nextjs`.
3. **Environment Variables**:
   - Go to **Site configuration > Environment variables**.
   - Add the same variables as above (`NEXT_PUBLIC_APP_NAME`, `NEXT_PUBLIC_APP_URL`, etc.).
4. **Deploy**:
   Click **Deploy site**.

---

## 🌐 Custom Domain Binding: `dataquery.in`

### DNS Records Configuration
Configure your DNS provider (e.g., Cloudflare, Namecheap, GoDaddy):

#### For Vercel:
| Type | Name | Value / Target | Notes |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `76.76.21.21` | Apex domain |
| **CNAME** | `www` | `cname.vercel-dns.com` | Automatically redirects www to apex (or vice versa) |

#### For Netlify:
| Type | Name | Value / Target | Notes |
| :--- | :--- | :--- | :--- |
| **A** | `@` | `75.2.60.5` | Netlify Apex Load Balancer |
| **CNAME** | `www` | `<your-site-name>.netlify.app` | Netlify Subdomain |

### SSL & HTTPS Certificate
Both Vercel and Netlify provision automated, free Let's Encrypt certificates within 10–15 minutes of DNS propagation.

---

## ⚠️ Free-Plan Terms & Commercial Limits Notice

> [!IMPORTANT]
> **Free-Tier Limits and Commercial Usage Guidelines**:
> - **Bandwidth & Build Limits**: Free plans on both Netlify and Vercel provide generous free limits (typically 100 GB bandwidth and 300–450 build minutes per month).
> - **Commercial Terms Note**: The **Vercel Hobby plan is strictly for non-commercial, personal projects**. If `dataquery.in` processes commercial transactions or charges for Pro subscriptions, you **must upgrade to Vercel Pro ($20/user/mo)** or choose **Netlify**, which allows commercial projects on its tiers.
> - **Action Required**: Please confirm current terms and quotas on the official pricing pages for [Vercel](https://vercel.com/pricing) and [Netlify](https://www.netlify.com/pricing) prior to public commercial launch.

---

## 🐳 Self-Hosted Backend Deployment Note (Docker + Nginx)

When transitioning to a dedicated self-hosted backend (e.g., running FastAPI, DuckDB server, Airflow, and vLLM):

1. **Docker Compose**:
   Run the backend and reverse proxy in Docker containers on an independent cloud VM (AWS EC2, DigitalOcean, or Hetzner).
2. **Nginx Reverse Proxy**:
   Route API requests from `api.dataquery.in` directly to the backend container:
   ```nginx
   server {
       server_name api.dataquery.in;

       location / {
           proxy_pass http://127.0.0.1:8000;
           proxy_set_header Host $host;
           proxy_set_header X-Real-IP $remote_addr;
           proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
           proxy_set_header X-Forwarded-Proto $scheme;
       }
   }
   ```
3. Update `NEXT_PUBLIC_API_BASE_URL` in your Netlify/Vercel settings to `https://api.dataquery.in` and set `NEXT_PUBLIC_ENABLE_MOCKS=false`. The frontend will switch without any rebuild required.
