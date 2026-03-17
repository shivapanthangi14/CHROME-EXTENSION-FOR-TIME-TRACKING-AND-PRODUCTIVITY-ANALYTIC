let activeTab = null;
let startTime = Date.now();

function getToday() {
    return new Date().toLocaleDateString();
}

// When tab changes
chrome.tabs.onActivated.addListener(async (activeInfo) => {
    const tab = await chrome.tabs.get(activeInfo.tabId);
    updateTime();
    activeTab = new URL(tab.url).hostname;
    startTime = Date.now();
});

// When page loads
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === "complete" && tab.active) {
        updateTime();
        activeTab = new URL(tab.url).hostname;
        startTime = Date.now();
    }
});

function updateTime() {
    if (!activeTab) return;

    let timeSpent = Date.now() - startTime;
    let today = getToday();

    chrome.storage.local.get([today], (result) => {
        let dailyData = result[today] || {};

        let total = dailyData[activeTab] || 0;
        total += timeSpent;

        dailyData[activeTab] = total;

        chrome.storage.local.set({
            [today]: dailyData
        });
    });
}