let startTime = 0;
let elapsedTime = 0;
let intervalId;
let isRunning = false;
let lapCounter = 1;

// Elements
const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');
const lapBtn = document.getElementById('lap-btn');
const lapList = document.getElementById('lap-list');

// Format time in HH:MM:SS format
function formatTime(ms) {
    const totalSeconds = Math.floor(ms / 1000);
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;

    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
}

// Update the time display
function updateDisplay() {
    elapsedTime = Date.now() - startTime;
    timeDisplay.textContent = formatTime(elapsedTime);
}

// Start the stopwatch
startBtn.addEventListener('click', () => {
    if (!isRunning) {
        startTime = Date.now() - elapsedTime; // Keep track of time between pauses
        intervalId = setInterval(updateDisplay, 1000);
        isRunning = true;
        startBtn.textContent = 'Resume';
        pauseBtn.disabled = false;
        resetBtn.disabled = false;
        lapBtn.disabled = false;
    }
});

// Pause the stopwatch
pauseBtn.addEventListener('click', () => {
    if (isRunning) {
        clearInterval(intervalId);
        isRunning = false;
        pauseBtn.disabled = true;
        startBtn.textContent = 'Resume';
    }
});

// Reset the stopwatch
resetBtn.addEventListener('click', () => {
    clearInterval(intervalId);
    elapsedTime = 0;
    timeDisplay.textContent = '00:00:00';
    isRunning = false;
    startBtn.textContent = 'Start';
    pauseBtn.disabled = true;
    resetBtn.disabled = true;
    lapBtn.disabled = true;
    lapCounter = 1;
    lapList.innerHTML = '';
});

// Record a lap
lapBtn.addEventListener('click', () => {
    const lapTime = formatTime(elapsedTime);
    const lapItem = document.createElement('li');
    lapItem.textContent = `Lap ${lapCounter}: ${lapTime}`;
    lapList.appendChild(lapItem);
    lapCounter++;
});
