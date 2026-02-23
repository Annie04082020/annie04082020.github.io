document.addEventListener('DOMContentLoaded', () => {
    const contentDiv = document.getElementById('journal-content');
    const logSelector = document.getElementById('log-selector');

    if (!contentDiv || !logSelector) return;

    // Fetch the JSON manifest of available logs
    fetch('../logs/index.json')
        .then(response => {
            // Check if the response was ok. If testing locally via file:// protocol
            // this might fail with a CORS error depending on the browser.
            if (!response.ok) {
                throw new Error("Could not fetch index.json");
            }
            return response.json();
        })
        .then(logs => {
            if (logs.length === 0) {
                contentDiv.innerHTML = '<p>No journal entries found.</p>';
                return;
            }

            // Populate the dropdown selector
            logs.forEach(log => {
                const option = document.createElement('option');
                option.value = log.id;
                option.textContent = `${log.date} - ${log.title}`;
                logSelector.appendChild(option);
            });

            // Load the first (latest) log by default
            const initialLogId = logs[0].id;
            loadMarkdown(initialLogId);

            // Fetch new files when the dropdown changes
            logSelector.addEventListener('change', (e) => {
                loadMarkdown(e.target.value);
            });
        })
        .catch(error => {
            console.error('Error fetching logs index:', error);
            contentDiv.innerHTML = '<p>Failed to load the journal database. If you are viewing this locally without a web server (e.g. file:// URL), fetching local files may be blocked by your browser. Please use Live Server or host via GitHub Pages.</p>';
        });

    function loadMarkdown(filename) {
        contentDiv.innerHTML = '<p>Loading...</p>';
        fetch(`../logs/${filename}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.text();
            })
            .then(markdownText => {
                // Parse markdown string into HTML using the Marked.js CDN library
                const htmlContent = marked.parse(markdownText);
                contentDiv.innerHTML = htmlContent;
            })
            .catch(error => {
                console.error(`Error loading markdown file ${filename}:`, error);
                contentDiv.innerHTML = '<p>Error parsing the journal entry. It may have been moved or deleted.</p>';
            });
    }
});
