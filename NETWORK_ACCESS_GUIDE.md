# Network Access Guide

This guide explains how to access your HMI prototype from other devices on the same network.

## Quick Setup

### 1. Find Your IP Address
Run this command in PowerShell:
```powershell
ipconfig | findstr IPv4
```

Look for your local IP address (e.g., `192.168.1.100` or `10.0.0.100`)

### 2. Configure the Frontend

Edit `frontend/.env` and replace `localhost` with your IP address:

```env
VITE_BACKEND_URL=http://YOUR_IP_ADDRESS:3001
```

For example:
```env
VITE_BACKEND_URL=http://192.168.1.100:3001
```

### 3. Allow Firewall Access

Run PowerShell **as Administrator** and execute:

```powershell
# Allow Vite dev server (port 5173)
New-NetFirewallRule -DisplayName "Vite Dev Server" -Direction Inbound -LocalPort 5173 -Protocol TCP -Action Allow

# Allow Backend server (port 3001)
New-NetFirewallRule -DisplayName "HMI Backend Server" -Direction Inbound -LocalPort 3001 -Protocol TCP -Action Allow
```

### 4. Start the Servers

```bash
# Terminal 1 - Backend
npm run dev:backend

# Terminal 2 - Frontend
npm run dev:frontend
```

### 5. Access from Other Devices

On any device connected to the same network, open a browser and go to:

- **Cluster Display**: `http://YOUR_IP_ADDRESS:5173/cluster`
- **Central Display**: `http://YOUR_IP_ADDRESS:5173/central`
- **Passenger Display**: `http://YOUR_IP_ADDRESS:5173/passenger`

## Switching Back to Local Development

To switch back to local-only development, edit `frontend/.env`:

```env
VITE_BACKEND_URL=http://localhost:3001
```

Then restart the frontend dev server.

## Troubleshooting

### Devices can't connect
1. Verify firewall rules are active:
   ```powershell
   Get-NetFirewallRule -DisplayName "Vite Dev Server"
   Get-NetFirewallRule -DisplayName "HMI Backend Server"
   ```

2. Make sure both backend and frontend servers are running

3. Ensure all devices are on the same network (same WiFi)

4. Try temporarily disabling Windows Firewall to test if it's a firewall issue

### WebSocket connection fails
- Verify the backend is accessible: Open `http://YOUR_IP_ADDRESS:3001/api/state` in a browser
- Check that `VITE_BACKEND_URL` in `.env` matches your backend server address
- Restart the frontend dev server after changing `.env` files

### Changes to .env not taking effect
- Restart the frontend dev server (Vite requires restart for environment variable changes)
- Clear browser cache or open in incognito mode

## Removing Firewall Rules (Optional)

When done testing, you can remove the firewall rules:

```powershell
Remove-NetFirewallRule -DisplayName "Vite Dev Server"
Remove-NetFirewallRule -DisplayName "HMI Backend Server"
```

## Security Note

These firewall rules allow any device on your network to access the development servers. This is safe on trusted private networks (home/office) but should be avoided on public WiFi. Remove the firewall rules when not actively testing network access.

