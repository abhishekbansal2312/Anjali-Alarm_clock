const currentTimeDisplay = document.getElementById("currentTime");
const currentDateDisplay = document.getElementById("currentDate");
const alarmHour = document.getElementById("alarmHour");
const alarmMinute = document.getElementById("alarmMinute");
const alarmPeriod = document.getElementById("alarmPeriod");
const setAlarmButton = document.getElementById("setAlarmButton");
const statusText = document.getElementById("status");
const alarmSound = document.getElementById("alarmSound");

let alarmTime = null;
let alarmTimeout = null;

// Initialize options for hours and minutes
for (let i = 1; i <= 12; i++) {
    let option = document.createElement("option");
    option.value = i;
    option.text = i;
    alarmHour.appendChild(option);
}

for (let i = 0; i < 60; i++) {
    let option = document.createElement("option");
    option.value = i < 10 ? "0" + i : i;
    option.text = i < 10 ? "0" + i : i;
    alarmMinute.appendChild(option);
}

// Update current time and date
function updateClock() {
    const now = new Date();
    const hours = now.getHours();
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = hours >= 12 ? "PM" : "AM";
    const hour = hours % 12 || 12;

    currentTimeDisplay.textContent = `${hour < 10 ? "0" + hour : hour}:${
        minutes < 10 ? "0" + minutes : minutes
    }:${seconds < 10 ? "0" + seconds : seconds} ${ampm}`;
    currentDateDisplay.textContent = now.toLocaleDateString("en-US", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
    });

    // Check if the current time matches the alarm time
    if (alarmTime && now >= alarmTime) {
        triggerAlarm();
    }
}

// Set the alarm
function setAlarm() {
    const selectedHour = alarmHour.value;
    const selectedMinute = alarmMinute.value;
    const selectedPeriod = alarmPeriod.value;

    if (!selectedHour || !selectedMinute || !selectedPeriod) {
        alert("Please select a valid time for the alarm.");
        return;
    }

    // Set the alarm time based on selected values
    alarmTime = new Date();
    alarmTime.setHours(
        selectedPeriod === "PM" ? parseInt(selectedHour) % 12 + 12 : parseInt(selectedHour) % 12
    );
    alarmTime.setMinutes(parseInt(selectedMinute));
    alarmTime.setSeconds(0);

    if (alarmTime < new Date()) {
        alarmTime.setDate(alarmTime.getDate() + 1); // Set for the next day
    }

    statusText.textContent = `Alarm set for ${alarmTime.toLocaleTimeString([], {
        hour: "2-digit",
        minute: "2-digit",
        hour12: true,
    })}`;
    setAlarmButton.disabled = true;
}

// Trigger the alarm
function triggerAlarm() {
    alarmSound.play();
    alert("Wake up! Alarm ringing!");
    statusText.textContent = "No alarm set";
    alarmTime = null;
    setAlarmButton.disabled = false;
}

setAlarmButton.addEventListener("click", setAlarm);

// Update the clock every second
setInterval(updateClock, 1000);
