#!/bin/bash
# =========================================================
# Mstatili Tech - Deployment Script (after git pull)
# Run this script after pulling new changes from GitHub
# =========================================================

set -e

DOMAIN="mstatilitechnologies.com"
HOME_DIR="/home/${DOMAIN}"
PUBLIC_HTML="${HOME_DIR}/public_html"
VENV_DIR="${HOME_DIR}/venv"

echo "======================================"
echo "Mstatili Tech - Deploying Updates"
echo "======================================"

# Navigate to public_html
cd "${PUBLIC_HTML}"

echo "[1/4] Pulling latest changes from GitHub..."
git pull origin main

echo "[2/4] Installing/updating Python dependencies..."
"${VENV_DIR}/bin/pip" install -r backend/requirements.txt

echo "[3/4] Building React frontend..."
cd frontend
npm ci
npm run build

echo "[4/4] Copying build files to public_html..."
# Copy build output to public_html root (for OpenLiteSpeed to serve)
cp -r build/* "${PUBLIC_HTML}/"

# Restart the backend
echo "Restarting backend service..."
sudo systemctl restart mstatili-backend

echo ""
echo "======================================"
echo "Deployment Complete!"
echo "======================================"
echo ""
echo "Check the site at: https://mstatilitechnologies.com"
echo "Check API health: curl https://mstatilitechnologies.com/api/health"
