

🛡️ Tracker Blocker Extension

📋 Project Overview

In today’s digital world, online tracking has become everywhere — from advertising networks collecting user behavior to hidden analytics scripts logging your actions.
Tracker Blocker is a lightweight Chrome Extension designed to help users take back control of their privacy by automatically blocking known trackers, ads, and analytics domains.

It works entirely client-side using Chrome’s Declarative Net Request (DNR) API, ensuring fast performance and zero backend reliance.
With intuitive settings, real-time statistics, customizable whitelists, and advanced features, Tracker Blocker empowers users to browse cleaner and safer. 🚀
## Features

- Light/dark mode toggle
- Live previews
- Fullscreen mode
- Cross platform

✔️ Dynamic Blocking
Uses a default list of commonly known trackers (e.g., doubleclick.net, google-analytics.com), plus any custom trackers you add.

✔️ Custom Tracker List & Whitelist
Users can easily add or remove patterns in the Custom Tracker List and maintain a Whitelist of trusted sites where no blocking occurs.

✔️ Remote Auto-Update
Optionally fetch and merge a public remote list (e.g., from DuckDuckGo) every 24 hours automatically, keeping the blocking rules up to date without manual intervention.

✔️ Block or Redirect Mode
Choose between completely blocking trackers or redirecting them to a blank image placeholder.

✔️ Detailed Live Logs & Stats
Track exactly what was blocked, when, from which tab, including the blocked URL, initiator domain, tab title, and matched rule IDs.

✔️ Badge Icon Counter
Shows real-time blocked trackers count per tab on the extension icon for immediate insight.
## 📸Screenshots Preview
 
1️⃣ Tracker Blocker Popup

(Shows current status and settings shortcuts)  ![image alt](https://github.com/SAMjimishra/Tracker-Blocker-Extension/blob/49ab5a6c7655bb4776f7af87d3ed4e3164da7a27/tracker-blocker-extension/SS/Screenshot%202025-09-07%20232637.png)                                                                           2️⃣ Tracker Blocker Settings Page
![image alt](https://github.com/SAMjimishra/Tracker-Blocker-Extension/blob/49ab5a6c7655bb4776f7af87d3ed4e3164da7a27/tracker-blocker-extension/SS/Screenshot%202025-09-07%20232413.png)
                                                                                                                         (Add custom trackers, manage whitelist, toggle options)


3️⃣ Real-time Stats Section
    
(View block logs, per-tab stats, blocked count)
 ![image alt](https://github.com/SAMjimishra/Tracker-Blocker-Extension/blob/4c5f5cde241b70ba5fc483a4aface18fb29276eb/tracker-blocker-extension/SS/Screenshot%202025-09-07%20232314.png)

## 🎯 Example Use Cases
✅ Prevent third-party tracking scripts from sending user behavior data.

✅ Block annoying ad domains while browsing.

✅ Keep sensitive sites clean by whitelisting only your trusted domains.

✅ Automatically stay up to date without manual rule management.
## Run Locall
🚀 How to Install & Use

1️⃣ Clone or download the project:

```bash 
git clone https://github.com/your-username/tracker-blocker-extension.git
```

2️⃣ Open Chrome and navigate to:
chrome://extensions/

3️⃣ Enable Developer Mode in the top-right corner.

4️⃣ Click Load unpacked and select the project folder.

5️⃣ The extension icon will appear in your toolbar.

6️⃣ Click the icon → Go to Settings →
  • Add your custom tracker patterns
  • Add trusted sites to whitelist
  • Toggle Redirect Mode ON/OFF
  • Enable remote auto-update and specify a remote list URL (optional)

7️⃣ View Stats for live blocked count and logs. 🎯
## ⚙️ Tech Stack

◉Javascript (Vanilla)

◉Chrome Declarative Net Request (DNR API)

◉Chrome Storage API for settings persistence

◉HTML + CSS for UI (Popup & Options pages)

## 🎯 Example Use Cases
✅ Prevent third-party tracking scripts from sending user behavior data.

✅ Block annoying ad domains while browsing.

✅ Keep sensitive sites clean by whitelisting only your trusted domains.

✅ Automatically stay up to date without manual rule management.
## 💬 Final Thought

This extension empowers you to block invasive trackers intelligently without slowing down your browser.
Stay in control of your data, browse securely, and help keep the web a more private place. 🌐🔒
