#!/bin/bash
# =========================================================
# Mstatili Tech - CyberPanel + OpenLiteSpeed Deployment Script
# Domain: mstatilitechnologies.com
# =========================================================

set -e

# Configuration
DOMAIN="mstatilitechnologies.com"
USER="mstat8499"
GROUP="mstat8499"
HOME_DIR="/home/${DOMAIN}"
PUBLIC_HTML="${HOME_DIR}/public_html"
VENV_DIR="${HOME_DIR}/venv"
DATA_DIR="${HOME_DIR}/data"
LOGS_DIR="${HOME_DIR}/logs"
ENV_FILE="${HOME_DIR}/.env"

echo "======================================"
echo "Mstatili Tech Deployment Setup"
echo "======================================"

# Check if running as root or sudo
if [ "$EUID" -ne 0 ]; then 
    echo "Please run as root or with sudo"
    exit 1
fi

# Create necessary directories
echo "[1/8] Creating directories..."
mkdir -p "${DATA_DIR}"
mkdir -p "${LOGS_DIR}"
chown -R ${USER}:${GROUP} "${DATA_DIR}"
chown -R ${USER}:${GROUP} "${LOGS_DIR}"

# Install Python dependencies (if not already installed)
echo "[2/8] Checking Python installation..."
if ! command -v python3.11 &> /dev/null && ! command -v python3.10 &> /dev/null; then
    echo "Installing Python 3.11..."
    apt update
    apt install -y python3.11 python3.11-venv python3.11-dev
fi

# Create Python virtual environment
echo "[3/8] Setting up Python virtual environment..."
if [ ! -d "${VENV_DIR}" ]; then
    python3 -m venv "${VENV_DIR}"
fi
chown -R ${USER}:${GROUP} "${VENV_DIR}"

# Install Python packages
echo "[4/8] Installing Python dependencies..."
sudo -u ${USER} "${VENV_DIR}/bin/pip" install --upgrade pip
sudo -u ${USER} "${VENV_DIR}/bin/pip" install -r "${PUBLIC_HTML}/backend/requirements.txt"

# Create environment file if it doesn't exist
echo "[5/8] Setting up environment file..."
if [ ! -f "${ENV_FILE}" ]; then
    cat > "${ENV_FILE}" << EOF
# Mstatili Tech Environment Configuration
# Generated on $(date)

# CORS - comma-separated list of allowed origins
ALLOWED_ORIGINS=https://mstatilitechnologies.com,https://www.mstatilitechnologies.com

# Database Path (SQLite)
DATABASE_PATH=${DATA_DIR}/mstatili.db

# Email Notifications (Optional - configure if needed)
# SMTP_HOST=smtp.gmail.com
# SMTP_PORT=587
# SMTP_USER=your-email@gmail.com
# SMTP_PASS=your-app-password
# NOTIFICATION_EMAIL=notifications@mstatilitechnologies.com
EOF
    chown ${USER}:${GROUP} "${ENV_FILE}"
    chmod 600 "${ENV_FILE}"
    echo "Environment file created at ${ENV_FILE}"
    echo "Please edit it to configure SMTP settings if needed."
fi

# Install systemd service
echo "[6/8] Installing systemd service..."
cp "${PUBLIC_HTML}/deploy/mstatili-backend.service" /etc/systemd/system/
systemctl daemon-reload
systemctl enable mstatili-backend

# Configure OpenLiteSpeed Proxy for API
echo "[7/8] OpenLiteSpeed Proxy Configuration..."
VHOST_CONF="/usr/local/lsws/conf/vhosts/${DOMAIN}/vhost.conf"
PROXY_CONF="${PUBLIC_HTML}/deploy/vhost-proxy.conf"

if [ -f "${VHOST_CONF}" ]; then
    # Check if proxy config already exists
    if grep -q "mstatili_backend" "${VHOST_CONF}"; then
        echo "Proxy configuration already exists in vhost.conf"
    else
        echo "Adding proxy configuration to vhost.conf..."
        cat "${PROXY_CONF}" >> "${VHOST_CONF}"
        echo "Proxy configuration added successfully"
    fi

    # Restart LiteSpeed
    echo "Restarting OpenLiteSpeed..."
    /usr/local/lsws/bin/lswsctrl restart
else
    echo ""
    echo "WARNING: vhost.conf not found at ${VHOST_CONF}"
    echo "You need to manually add the proxy configuration."
    echo ""
    echo "Append contents of ${PROXY_CONF} to your vhost.conf:"
    echo "  cat ${PROXY_CONF} >> ${VHOST_CONF}"
    echo "  /usr/local/lsws/bin/lswsctrl restart"
    echo ""
fi

# Start the backend service
echo "[8/8] Starting backend service..."
systemctl start mstatili-backend
systemctl status mstatili-backend --no-pager

echo ""
echo "======================================"
echo "Deployment Setup Complete!"
echo "======================================"
echo ""
echo "Next Steps:"
echo "1. Edit ${ENV_FILE} to configure SMTP (optional)"
echo "2. Build the React frontend and ensure files are in ${PUBLIC_HTML}"
echo "3. Configure SSL via CyberPanel if not already done"
echo "4. Test the API: curl https://mstatilitechnologies.com/api/health"
echo ""
echo "Useful commands:"
echo "  - View backend logs: journalctl -u mstatili-backend -f"
echo "  - Restart backend: systemctl restart mstatili-backend"
echo "  - Check backend status: systemctl status mstatili-backend"
echo ""
