// -----------------------------
// Tracker Blocker Pro - Options Script
// -----------------------------

document.addEventListener("DOMContentLoaded", async() => {
    const trackerInput = document.getElementById("trackerInput");
    const addTrackerBtn = document.getElementById("addTracker");
    const trackerListEl = document.getElementById("trackerList");

    const whitelistInput = document.getElementById("whitelistInput");
    const addWhitelistBtn = document.getElementById("addWhitelist");
    const whitelistEl = document.getElementById("whitelist");

    const totalBlockedEl = document.getElementById("totalBlocked");

    const exportBtn = document.getElementById("exportData");
    const importBtn = document.getElementById("importData");
    const importFile = document.getElementById("importFile");

    // Toast message utility
    function showToast(msg, color = "#00f5d4") {
        let toast = document.createElement("div");
        toast.textContent = msg;
        toast.style.position = "fixed";
        toast.style.bottom = "20px";
        toast.style.left = "50%";
        toast.style.transform = "translateX(-50%)";
        toast.style.background = color;
        toast.style.color = "#000";
        toast.style.padding = "8px 16px";
        toast.style.borderRadius = "6px";
        toast.style.fontWeight = "600";
        toast.style.zIndex = "9999";
        toast.style.boxShadow = "0 4px 10px rgba(0,0,0,0.3)";
        document.body.appendChild(toast);
        setTimeout(() => toast.remove(), 1800);
    }

    // Load lists and stats
    async function loadData() {
        const data = await chrome.storage.local.get(["customTrackers", "whitelist", "blockedCount"]);
        const trackers = data.customTrackers || [];
        const whitelist = data.whitelist || [];
        const blockedCount = data.blockedCount || 0;

        totalBlockedEl.textContent = blockedCount;
        renderList(trackers, trackerListEl, "customTrackers");
        renderList(whitelist, whitelistEl, "whitelist");
    }

    // Render list items
    function renderList(items, container, type) {
        container.innerHTML = "";
        if (items.length === 0) {
            container.innerHTML = `<li style="color:#bbb; text-align:center;">Empty</li>`;
            return;
        }

        items.forEach((item, idx) => {
            let li = document.createElement("li");
            li.innerHTML = `
        <span>${item}</span>
        <button data-type="${type}" data-index="${idx}">Remove</button>
      `;
            container.appendChild(li);

            // Small highlight effect for newly added
            setTimeout(() => {
                li.style.transition = "background 0.5s";
                li.style.background = "rgba(0,255,212,0.2)";
            }, 50);
            setTimeout(() => {
                li.style.background = "rgba(255,255,255,0.08)";
            }, 800);
        });
    }

    // Add tracker
    addTrackerBtn.addEventListener("click", async() => {
        const val = trackerInput.value.trim();
        if (!val) return showToast("Enter a valid tracker pattern!", "#ff6b6b");

        let data = await chrome.storage.local.get("customTrackers");
        let list = data.customTrackers || [];

        if (list.includes(val)) return showToast("Already exists!", "#ffb703");

        list.push(val);
        await chrome.storage.local.set({ customTrackers: list });
        trackerInput.value = "";
        showToast("Tracker added ✅");
        loadData();
    });

    // Add whitelist
    addWhitelistBtn.addEventListener("click", async() => {
        const val = whitelistInput.value.trim();
        if (!val) return showToast("Enter a valid domain!", "#ff6b6b");

        let data = await chrome.storage.local.get("whitelist");
        let list = data.whitelist || [];

        if (list.includes(val)) return showToast("Already whitelisted!", "#ffb703");

        list.push(val);
        await chrome.storage.local.set({ whitelist: list });
        whitelistInput.value = "";
        showToast("Whitelisted ✅");
        loadData();
    });

    // Remove tracker/whitelist
    document.body.addEventListener("click", async(e) => {
        if (e.target.tagName === "BUTTON" && e.target.dataset.type) {
            const type = e.target.dataset.type;
            const index = parseInt(e.target.dataset.index);

            let data = await chrome.storage.local.get(type);
            let list = data[type] || [];

            if (index >= 0 && index < list.length) {
                list.splice(index, 1);
                await chrome.storage.local.set({
                    [type]: list });
                showToast("Removed ❌", "#ff6b6b");
                loadData();
            }
        }
    });

    // Export data
    exportBtn.addEventListener("click", async() => {
        const data = await chrome.storage.local.get(["customTrackers", "whitelist"]);
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
        const url = URL.createObjectURL(blob);

        let a = document.createElement("a");
        a.href = url;
        a.download = "tracker_blocker_backup.json";
        a.click();
        URL.revokeObjectURL(url);
        showToast("Exported 📤");
    });

    // Import data
    importBtn.addEventListener("click", () => importFile.click());

    importFile.addEventListener("change", async() => {
        const file = importFile.files[0];
        if (!file) return;

        const text = await file.text();
        try {
            const data = JSON.parse(text);
            await chrome.storage.local.set({
                customTrackers: data.customTrackers || [],
                whitelist: data.whitelist || []
            });
            showToast("Imported 📥");
            loadData();
        } catch (err) {
            showToast("Invalid file ❌", "#ff6b6b");
        }
    });

    // Real-time sync
    chrome.storage.onChanged.addListener(() => loadData());

    // Initial load
    loadData();
});