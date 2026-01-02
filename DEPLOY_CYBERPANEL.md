# Mstatili Tech - CyberPanel + OpenLiteSpeed Deployment Guide

This guide explains how to deploy the Mstatili Tech website on a VPS with CyberPanel and OpenLiteSpeed.

## Architecture

```
┌─────────────────────────────────────────────────────────┐
│                    OpenLiteSpeed                         │
│                (serves static files)                     │
├─────────────────────────────────────────────────────────┤
│  /                    │  /api/*                          │
│  React Build Files    │  Proxy to Backend                │
│  (index.html, JS,     │  (127.0.0.1:8000)               │
│   CSS, images)        │                                  │
└───────────┬───────────┴───────────────┬─────────────────┘
            │                           │
            ▼                           ▼
┌───────────────────────┐   ┌───────────────────────────┐
│   Static Files        │   │   FastAPI Backend         │
│   /public_html/       │   │   (Gunicorn + Uvicorn)    │
└───────────────────────┘   │   Port 8000               │
                            │                           │
                            │   SQLite Database         │
                            │   /data/mstatili.db       │
                            └───────────────────────────┘
```

## Prerequisites

- CyberPanel installed with OpenLiteSpeed
- Domain `mstatilitechnologies.com` configured in CyberPanel
- Git repository connected to `/home/mstatilitechnologies.com/public_html`
- Node.js 18+ installed
- Python 3.10+ installed

## File Structure on VPS

```
/home/mstatilitechnologies.com/
├── public_html/              # Git root & web root
│   ├── index.html           # React build output (root)
│   ├── static/              # React static assets
│   ├── .htaccess            # OpenLiteSpeed rewrite rules
│   ├── backend/             # FastAPI application
│   │   ├── server.py
│   │   └── requirements.txt
│   ├── frontend/            # React source (for building)
│   │   └── ...
│   └── deploy/              # Deployment scripts
├── venv/                    # Python virtual environment
├── data/                    # SQLite database
│   └── mstatili.db
├── logs/                    # Application logs
│   ├── access.log
│   └── error.log
└── .env                     # Environment configuration
```

## Initial Setup (First-time deployment)

### 1. SSH into your VPS
```bash
ssh root@your-vps-ip
```

### 2. Navigate to the site directory
```bash
cd /home/mstatilitechnologies.com/public_html
```

### 3. Pull the repository (if not already)
```bash
git pull origin main
```

### 4. Run the setup script
```bash
sudo bash deploy/setup.sh
```

This will:
- Create necessary directories (`data/`, `logs/`)
- Set up Python virtual environment
- Install Python dependencies
- Create environment file template
- Install and enable the systemd service

### 5. Configure environment variables
```bash
nano /home/mstatilitechnologies.com/.env
```

Edit the file to configure SMTP settings if you want email notifications:
```env
ALLOWED_ORIGINS=https://mstatilitechnologies.com,https://www.mstatilitechnologies.com
DATABASE_PATH=/home/mstatilitechnologies.com/data/mstatili.db

# Uncomment and configure for email notifications
SMTP_HOST=smtp.gmail.com
SMTP_PORT=587
SMTP_USER=your-email@gmail.com
SMTP_PASS=your-app-password
NOTIFICATION_EMAIL=info@mstatilitechnologies.com
```

### 6. Build the React frontend
```bash
cd frontend
npm ci
npm run build
```

### 7. Copy build files to public_html
```bash
cp -r build/* /home/mstatilitechnologies.com/public_html/
```

### 8. Configure OpenLiteSpeed Proxy (Important!)

OpenLiteSpeed needs to proxy `/api/` requests to the backend. There are two options:

#### Option A: Via .htaccess (Recommended)
The `.htaccess` file is already set up. Make sure `mod_rewrite` is enabled in OpenLiteSpeed.

In CyberPanel WebAdmin Console:
1. Go to **Server Configuration** > **General**
2. Ensure "Enable Rewrite" is set to "Yes"
3. Go to **Virtual Hosts** > **mstatilitechnologies.com** > **General**
4. Set "Enable Rewrite" to "Yes"
5. **Graceful Restart** OpenLiteSpeed

#### Option B: Via WebAdmin External App
1. Go to **WebAdmin Console** (port 7080)
2. Navigate to **Virtual Hosts** > **mstatilitechnologies.com**
3. Add **External App**:
   - Name: `mstatili_backend`
   - Address: `127.0.0.1:8000`
   - Max Connections: `25`
   - Type: `Web Server`
4. Add **Context**:
   - Type: `Proxy`
   - URI: `/api/`
   - Web Server: `mstatili_backend`
5. **Graceful Restart** OpenLiteSpeed

### 9. Start the backend
```bash
sudo systemctl start mstatili-backend
sudo systemctl status mstatili-backend
```

### 10. Test the deployment
```bash
# Test backend health
curl https://mstatilitechnologies.com/api/health

# Should return: {"status":"healthy","database":"connected"}
```

## Updating the Site (After git push)

### Quick deploy via script:
```bash
cd /home/mstatilitechnologies.com/public_html
bash deploy/deploy.sh
```

### Manual deploy:
```bash
cd /home/mstatilitechnologies.com/public_html

# Pull latest changes
git pull origin main

# Update Python dependencies (if changed)
/home/mstatilitechnologies.com/venv/bin/pip install -r backend/requirements.txt

# Rebuild frontend
cd frontend
npm ci
npm run build
cp -r build/* /home/mstatilitechnologies.com/public_html/

# Restart backend
sudo systemctl restart mstatili-backend
```

## Useful Commands

```bash
# View backend logs
journalctl -u mstatili-backend -f

# View application logs
tail -f /home/mstatilitechnologies.com/logs/error.log

# Restart backend
sudo systemctl restart mstatili-backend

# Check backend status
sudo systemctl status mstatili-backend

# Restart OpenLiteSpeed
sudo systemctl restart lsws

# View SQLite data
sqlite3 /home/mstatilitechnologies.com/data/mstatili.db "SELECT * FROM contacts;"
```

## SSL Certificate

CyberPanel usually handles SSL via Let's Encrypt automatically. If not:
1. Go to CyberPanel > **SSL** > **Manage SSL**
2. Select `mstatilitechnologies.com`
3. Click **Issue SSL**

## Troubleshooting

### API returns 502 Bad Gateway
- Check if backend is running: `systemctl status mstatili-backend`
- Check backend logs: `journalctl -u mstatili-backend -n 50`
- Verify port 8000 is listening: `netstat -tlnp | grep 8000`

### React routes return 404
- Ensure `.htaccess` is present in `/public_html/`
- Verify OpenLiteSpeed has rewrite enabled
- Graceful restart: `systemctl restart lsws`

### Database errors
- Check database path exists: `ls -la /home/mstatilitechnologies.com/data/`
- Check permissions: `chown mstat9401:mstat9401 /home/mstatilitechnologies.com/data/`

### Permission denied errors
```bash
chown -R mstat9401:mstat9401 /home/mstatilitechnologies.com/
chmod 755 /home/mstatilitechnologies.com/public_html
```

## Database (SQLite)

The app uses SQLite instead of MongoDB - no external database server needed!

- **Location**: `/home/mstatilitechnologies.com/data/mstatili.db`
- **Tables**: `contacts`, `service_inquiries`
- **Backup**: Just copy the `.db` file

### View data:
```bash
sqlite3 /home/mstatilitechnologies.com/data/mstatili.db
> SELECT * FROM contacts;
> SELECT * FROM service_inquiries;
> .quit
```

### Backup:
```bash
cp /home/mstatilitechnologies.com/data/mstatili.db /home/mstatilitechnologies.com/data/backup_$(date +%Y%m%d).db
```
