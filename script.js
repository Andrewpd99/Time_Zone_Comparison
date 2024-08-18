function updateClock() {
    const now = new Date();
    const selectedTimeZone = document.getElementById('timezone').value;
    const compareTimeZone = document.getElementById('compareZoneSelect').value;

    // Time zone acronyms
    const timeZoneAcronyms = {
        'UTC': 'UTC',
        'America/New_York': 'ET',
        'America/Chicago': 'CT',
        'America/Denver': 'MT',
        'America/Los_Angeles': 'PT',
        'Europe/London': 'GMT',
        'Europe/Paris': 'CET',
        'Europe/Berlin': 'CET',
        'Asia/Tokyo': 'JST',
        'Australia/Sydney': 'AET',
        'Asia/Kolkata': 'IST',
        'Asia/Singapore': 'SGT',
        'Asia/Hong_Kong': 'HKT',
        'Pacific/Auckland': 'NZT',
        'America/Sao_Paulo': 'BRT',
        'America/Bogota': 'COT',
        'America/Lima': 'PET',
        'America/Argentina/Buenos_Aires': 'ART',
        'Africa/Johannesburg': 'SAST'
    };

    try {
        // Get current time in both selected time zones
        const selectedTimeString = new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: selectedTimeZone
        }).format(now);

        const compareTimeString = new Intl.DateTimeFormat('en-US', {
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            timeZone: compareTimeZone
        }).format(now);

        // Get acronyms
        const selectedAcronym = timeZoneAcronyms[selectedTimeZone];
        const compareAcronym = timeZoneAcronyms[compareTimeZone];

        document.getElementById('clock').textContent = `${selectedAcronym} vs ${compareAcronym}: ${selectedTimeString} / ${compareTimeString}`;
    } catch (error) {
        console.error('Error formatting time:', error);
    }
}

function updateTimeDifference() {
    const selectedTimeZone = document.getElementById('timezone').value;
    const compareZone = document.getElementById('compareZoneSelect').value;

    // Time zone acronyms
    const timeZoneAcronyms = {
        'UTC': 'UTC',
        'America/New_York': 'ET',
        'America/Chicago': 'CT',
        'America/Denver': 'MT',
        'America/Los_Angeles': 'PT',
        'Europe/London': 'GMT',
        'Europe/Paris': 'CET',
        'Europe/Berlin': 'CET',
        'Asia/Tokyo': 'JST',
        'Australia/Sydney': 'AET',
        'Asia/Kolkata': 'IST',
        'Asia/Singapore': 'SGT',
        'Asia/Hong_Kong': 'HKT',
        'Pacific/Auckland': 'NZT',
        'America/Sao_Paulo': 'BRT',
        'America/Bogota': 'COT',
        'America/Lima': 'PET',
        'America/Argentina/Buenos_Aires': 'ART',
        'Africa/Johannesburg': 'SAST'
    };

    try {
        const now = new Date();
        const tzOffset = getTimeZoneOffset(now, selectedTimeZone);
        const compareOffset = getTimeZoneOffset(now, compareZone);

        const offsetDifference = compareOffset - tzOffset;

        let message;
        const roundedDifference = Math.round(offsetDifference);
        const selectedAcronym = timeZoneAcronyms[selectedTimeZone];
        const compareAcronym = timeZoneAcronyms[compareZone];

        if (roundedDifference > 0) {
            message = `${compareAcronym} is ahead by ${roundedDifference} ${roundedDifference === 1 ? 'hour' : 'hours'}.`;
        } else if (roundedDifference < 0) {
            message = `${compareAcronym} is behind by ${Math.abs(roundedDifference)} ${Math.abs(roundedDifference) === 1 ? 'hour' : 'hours'}.`;
        } else {
            message = `The time zones are the same.`;
        }

        document.getElementById('timeDifference').textContent = message;
    } catch (error) {
        console.error('Error calculating time difference:', error);
    }
}

function getTimeZoneOffset(date, timeZone) {
    const utcDate = new Date(date.toLocaleString("en-US", { timeZone: "UTC" }));
    const localDate = new Date(date.toLocaleString("en-US", { timeZone: timeZone }));
    return (localDate.getTime() - utcDate.getTime()) / 1000 / 3600; // Offset in hours
}

function populateTimeZones() {
    const timezoneSelect = document.getElementById('timezone');
    const compareZoneSelect = document.getElementById('compareZoneSelect');
    const timeZoneData = {
        'UTC': 'UTC',
        'America/New_York': 'ET',
        'America/Chicago': 'CT',
        'America/Denver': 'MT',
        'America/Los_Angeles': 'PT',
        'Europe/London': 'GMT',
        'Europe/Paris': 'CET',
        'Europe/Berlin': 'CET',
        'Asia/Tokyo': 'JST',
        'Australia/Sydney': 'AET',
        'Asia/Kolkata': 'IST',
        'Asia/Singapore': 'SGT',
        'Asia/Hong_Kong': 'HKT',
        'Pacific/Auckland': 'NZT',
        'America/Sao_Paulo': 'BRT',
        'America/Bogota': 'COT',
        'America/Lima': 'PET',
        'America/Argentina/Buenos_Aires': 'ART',
        'Africa/Johannesburg': 'SAST'
    };

    for (const [tz, displayName] of Object.entries(timeZoneData)) {
        const option1 = document.createElement('option');
        option1.value = tz;
        option1.textContent = displayName;
        timezoneSelect.appendChild(option1);

        const option2 = document.createElement('option');
        option2.value = tz;
        option2.textContent = displayName;
        compareZoneSelect.appendChild(option2);
    }

    // Set default time zones
    if (Object.keys(timeZoneData).length > 0) {
        timezoneSelect.value = 'America/Chicago'; // Default to Central Time
        compareZoneSelect.value = 'America/New_York'; // Default comparison zone
    }
}

document.getElementById('timezone').addEventListener('change', () => {
    updateClock();
    updateTimeDifference();
});

document.getElementById('compareZoneSelect').addEventListener('change', updateTimeDifference);

document.addEventListener('DOMContentLoaded', () => {
    populateTimeZones();
    updateClock(); // Display current time right away
    updateTimeDifference(); // Display time difference right away
    setInterval(updateClock, 1000); // Update clock every second
});
