chrome.storage.local.get(null, data => {
    let output = "";
    let weeklyTotal = 0;

    for (let date in data) {
        output += `<h3>${date}</h3>`;

        let dailyData = data[date];

        for (let site in dailyData) {
            let time = Math.round(dailyData[site] / 1000);
            weeklyTotal += time;

            let type = "Productive";
            if (site.includes("youtube") || site.includes("instagram")) {
                type = "Unproductive";
            }

            output += `<p>${site}: ${time} sec (${type})</p>`;
        }
    }

    output += `<h2>Weekly Total: ${weeklyTotal} sec</h2>`;

    document.getElementById("data").innerHTML = output;
});