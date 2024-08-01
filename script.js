document.addEventListener("DOMContentLoaded", function() {
    // Helper function to create a promise that resolves after a random time between 1 and 3 seconds
    function createRandomPromise(index) {
        return new Promise((resolve) => {
            const startTime = Date.now();
            const delay = Math.floor(Math.random() * 2000) + 1000; // Random delay between 1000ms and 3000ms
            setTimeout(() => {
                const timeTaken = (Date.now() - startTime) / 1000; // Time taken in seconds
                resolve({ index, timeTaken });
            }, delay);
        });
    }

    // Create an array of 3 promises
    const promises = [createRandomPromise(1), createRandomPromise(2), createRandomPromise(3)];

    // Start timing the total duration for all promises
    const startTotalTime = Date.now();

    // Wait for all promises to resolve using Promise.all
    Promise.all(promises).then(results => {
        const totalTime = (Date.now() - startTotalTime) / 1000; // Total time in seconds

        const table = document.getElementById('promiseTable');

        // Remove the loading row
        table.innerHTML = '';

        // Populate the table with the results
        results.forEach(result => {
            const row = table.insertRow();
            const cell1 = row.insertCell(0);
            const cell2 = row.insertCell(1);
            cell1.textContent = `Promise ${result.index}`;
            cell2.textContent = `${result.timeTaken.toFixed(3)} seconds`;
        });

        // Add the total time row
        const totalRow = table.insertRow();
        const cell1 = totalRow.insertCell(0);
        const cell2 = totalRow.insertCell(1);
        cell1.textContent = 'Total';
        cell2.textContent = `${totalTime.toFixed(3)} seconds`;
    });
});

