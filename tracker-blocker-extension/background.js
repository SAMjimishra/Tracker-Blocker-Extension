// -----------------------------
// Tracker Blocker Pro - Background Service Worker
// -----------------------------

// Default tracker domains (base rules)
const defaultTrackers = [
    "*://*.doubleclick.net/*",
    "*://*.facebook.net/*",
    "*://*.google-analytics.com/*",
    "*://*.ads.yahoo.com/*",
    "*://*.adnxs.com/*",
    "*://*.scorecardresearch.com/*"
];

// Maintain blocked stats
let blockedCount = 0;
let perTabBlocked = {};

// Apply rules (default + custom)
async function applyRules() {
    const stored = await chrome.storage.local.get(["customTrackers", "whitelist"]);
    const customTrackers = stored.customTrackers || [];
    const whitelist = stored.whitelist || [];

    // Merge trackers
    let finalTrackers = [...defaultTrackers, ...customTrackers];

    // Create rules (skip whitelisted sites)
    let rules = finalTrackers.map((tracker, index) => ({
        id: index + 1,
        priority: 1,
        action: { type: "block" },
        condition: {
            urlFilter: tracker,
            excludedInitiatorDomains: whitelist // e.g. ["example.com"]
        }
    }));

    // First clear all old rules, then add new ones
    const ruleIds = rules.map(r => r.id);
    await chrome.declarativeNetRequest.updateDynamicRules({
        removeRuleIds: ruleIds,
        addRules: rules
    });
}

// On install / update
chrome.runtime.onInstalled.addListener(() => {
    applyRules();
    chrome.storage.local.set({ blockedCount: 0, logs: [] });
});

// Update rules when storage changes
chrome.storage.onChanged.addListener((changes) => {
    if (changes.customTrackers || changes.whitelist) {
        applyRules();
    }
});

// Count blocked requests (requires declarativeNetRequestFeedback permission)
if (chrome.declarativeNetRequest.onRuleMatchedDebug) {
    chrome.declarativeNetRequest.onRuleMatchedDebug.addListener(async(info) => {
        blockedCount++;

        // Save total logs
        let logs = await chrome.storage.local.get("logs");
        let logArr = logs.logs || [];
        logArr.unshift({
            url: info.request.url,
            time: new Date().toLocaleTimeString()
        });
        if (logArr.length > 20) logArr = logArr.slice(0, 20);
        chrome.storage.local.set({ blockedCount, logs: logArr });

        // Per tab counter
        let tabId = info.request.tabId;
        if (tabId >= 0) {
            perTabBlocked[tabId] = (perTabBlocked[tabId] || 0) + 1;
            chrome.action.setBadgeText({ text: perTabBlocked[tabId].toString(), tabId });
            chrome.action.setBadgeBackgroundColor({ color: "#e63946", tabId });
        }
    });
}

// Reset counter when tab reloads/changes
chrome.tabs.onActivated.addListener(activeInfo => {
    let tabId = activeInfo.tabId;
    chrome.action.setBadgeText({ text: (perTabBlocked[tabId] || 0).toString(), tabId });
});

chrome.tabs.onRemoved.addListener(tabId => {
    delete perTabBlocked[tabId];
});