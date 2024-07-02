//your JS code here. If required.
document.addEventListener('DOMContentLoaded', () => {
  const output = document.getElementById('output');

  // Adding the loading row
  const loadingRow = document.createElement('tr');
  const loadingCell = document.createElement('td');
  loadingCell.setAttribute('colspan', '2');
  loadingCell.textContent = 'Loading...';
  loadingRow.appendChild(loadingCell);
  output.appendChild(loadingRow);

  // Function to create a promise that resolves after a random time between 1 and 3 seconds
  function createRandomPromise(promiseName) {
    return new Promise((resolve) => {
      const time = Math.random() * 2 + 1; // Random time between 1 and 3 seconds
      setTimeout(() => resolve({ promiseName, time }), time * 1000);
    });
  }

  // Create 3 promises
  const promises = [
    createRandomPromise('Promise 1'),
    createRandomPromise('Promise 2'),
    createRandomPromise('Promise 3'),
  ];

  const startTime = performance.now();

  // Use Promise.all to wait for all promises to resolve
  Promise.all(promises)
    .then(results => {
      const endTime = performance.now();
      const totalTime = ((endTime - startTime) / 1000).toFixed(3);

      // Remove the loading row
      output.removeChild(loadingRow);

      // Populate the table with the resolved values
      results.forEach((result, index) => {
        const row = document.createElement('tr');
        const promiseNameCell = document.createElement('td');
        const timeTakenCell = document.createElement('td');

        promiseNameCell.textContent = `Promise ${index + 1}`;
        timeTakenCell.textContent = result.time.toFixed(3);

        row.appendChild(promiseNameCell);
        row.appendChild(timeTakenCell);

        output.appendChild(row);
      });

      // Add the total time row
      const totalRow = document.createElement('tr');
      const totalNameCell = document.createElement('td');
      const totalTimeCell = document.createElement('td');

      totalNameCell.textContent = 'Total';
      totalTimeCell.textContent = totalTime;

      totalRow.appendChild(totalNameCell);
      totalRow.appendChild(totalTimeCell);

      output.appendChild(totalRow);
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
