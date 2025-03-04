let timer;
let isRunning = false;
let seconds = 0;
let minutes = 0;
let hours = 0;
let lapTimes = [];

const timeDisplay = document.getElementById('time');
const startStopButton = document.getElementById('startStop');
const resetButton = document.getElementById('reset');
const lapButton = document.getElementById('lap');
const lapList = document.getElementById('lapList');

// Format time into MM:SS:SS
function formatTime(sec) {
    let hrs = Math.floor(sec / 3600);
    let mins = Math.floor((sec % 3600) / 60);
    let secs = sec % 60;
    return `${pad(hrs)}:${pad(mins)}:${pad(secs)}`;
}

// Add leading zero to single digits
function pad(num) {
    return num < 10 ? '0' + num : num;
}

// Update time display every second
function updateTime() {
    seconds++;
    timeDisplay.textContent = formatTime(seconds);
}

// Start or Stop the timer
startStopButton.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(timer);
        startStopButton.textContent = 'Start';
    } else {
        timer = setInterval(updateTime, 1000);
        startStopButton.textContent = 'Stop';
    }
    isRunning = !isRunning;
});

// Reset the timer
resetButton.addEventListener('click', () => {
    clearInterval(timer);
    isRunning = false;
    seconds = 0;
    timeDisplay.textContent = '00:00:00';
    lapList.innerHTML = '';
    startStopButton.textContent = 'Start';
    lapTimes = [];
});

// Record Lap time
lapButton.addEventListener('click', () => {
    if (isRunning) {
        lapTimes.push(formatTime(seconds));
        const lapItem = document.createElement('li');
        lapItem.textContent = `Lap ${lapTimes.length}: ${formatTime(seconds)}`;
        lapList.appendChild(lapItem);
    }
});