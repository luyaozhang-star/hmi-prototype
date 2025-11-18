# Quick Start Guide

## 5-Minute Setup

### Step 1: Install Dependencies (2 minutes)

Open two terminal windows:

**Terminal 1 - Backend:**
```bash
cd hmi-prototype/backend
npm install
```

**Terminal 2 - Frontend:**
```bash
cd hmi-prototype/frontend
npm install
```

### Step 2: Start Servers (30 seconds)

**Terminal 1 - Backend:**
```bash
npm start
```

Wait for: `🚗 HMI Backend Server running on port 3000`

**Terminal 2 - Frontend:**
```bash
npm run dev
```

Wait for: `Local: http://localhost:5173/`

### Step 3: Open Displays (1 minute)

1. Open your browser and go to `http://localhost:5173`
2. Click the three "Open ↗" links to open each display in a new tab:
   - Open Cluster ↗
   - Open Central ↗
   - Open Passenger ↗
3. Drag each tab to a different monitor (or arrange them on your screen)

### Step 4: Test It! (1 minute)

Try these interactions:

1. **Go to Central Display** → Click the 🎵 Media tab
2. Click the **Play button** ▶️
3. **Watch the Cluster Display** → Media status updates to "Playing"
4. **Adjust the volume slider** on Central Display
5. **Check all displays** → Volume updates everywhere!

## That's It! 🎉

You now have a working multi-display HMI prototype with real-time sync!

## Next Steps

- Read the full [README.md](README.md) for detailed documentation
- Customize the displays for your specific use case
- Add new features and interactions
- Start your user testing sessions

## Quick Troubleshoots

**Backend won't start?**
- Make sure Node.js is installed: `node --version`
- Try: `cd backend && npm install` again

**Frontend won't start?**
- Make sure backend is running first
- Check if port 5173 is available

**Displays not syncing?**
- Check that all displays show "● Connected" in green
- Refresh all browser tabs
- Restart the backend server

---

**Happy Testing! 🚀**

