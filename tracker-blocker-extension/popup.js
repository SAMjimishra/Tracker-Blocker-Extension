// -----------------------------
// Tracker Blocker Pro - Popup Script
// -----------------------------

document.addEventListener("DOMContentLoaded", async() => {
    const blockedCountEl = document.getElementById("blockedCount");
    const logListEl = document.getElementById("logList");
    const clearBtn = document.getElementById("clearLogs");
    const optionsBtn = document.getElementById("optionsBtn");

    // 🔹 Load data from storage
    async function loadData() {
        const data = await chrome.storage.local.get(["blockedCount", "logs"]);
        const count = data.blockedCount || 0;
        const logs = data.logs || [];

        blockedCountEl.textContent = count;

        // Clear old logs
        logListEl.innerHTML = "";

        if (logs.length === 0) {
            logListEl.innerHTML = `<p style="text-align:center; color:#bbb;">No trackers blocked yet 🎉</p>`;
            return;
        }

        // Show logs
        logs.forEach((log, idx) => {
            const div = document.createElement("div");
            div.className = "log-item";
            div.innerHTML = `
        <div>${log.url.length > 40 ? log.url.slice(0, 40) + "..." : log.url}</div>
        <div class="log-time">⏱ ${log.time}</div>
      `;
            logListEl.appendChild(div);

            // Animate newly added log (only the first one)
            if (idx === 0) {
                div.style.borderLeftColor = "#ff6b6b";
                setTimeout(() => {
                    div.style.borderLeftColor = "#00f5d4";
                }, 1000);
            }
        });
    }

    // 🔹 Clear logs
    clearBtn.addEventListener("click", async() => {
        await chrome.storage.local.set({ logs: [], blockedCount: 0 });
        blockedCountEl.textContent = "0";
        logListEl.innerHTML = `<p style="text-align:center; color:#bbb;">Logs cleared 🧹</p>`;
    });

    // 🔹 Open options page
    optionsBtn.addEventListener("click", () => {
        if (chrome.runtime.openOptionsPage) {
            chrome.runtime.openOptionsPage();
        } else {
            window.open(chrome.runtime.getURL("options.html"));
        }
    });

    // 🔹 Listen for updates in real-time
    chrome.storage.onChanged.addListener((changes) => {
        if (changes.blockedCount || changes.logs) {
            loadData();
        }
    });

    // First load
    loadData();
});