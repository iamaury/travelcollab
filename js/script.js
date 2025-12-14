// Calendar State
let currentMonth = new Date().getMonth();
let currentYear = new Date().getFullYear();
let selectedDates = new Set();

// Get DOM elements
const monthYearElement = document.getElementById('monthYear');
const calendarGrid = document.getElementById('calendarGrid');
const selectedDatesElement = document.getElementById('selectedDates');
const prevMonthBtn = document.getElementById('prevMonth');
const nextMonthBtn = document.getElementById('nextMonth');
const clearSelectionsBtn = document.getElementById('clearSelections');

// Month names
const monthNames = [
    'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
];

// Day names
const dayNames = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

// Initialize calendar
function initCalendar() {
    renderCalendar();
    updateSelectedDatesDisplay();
}

// Render the calendar
function renderCalendar() {
    // Update month/year display
    monthYearElement.textContent = `${monthNames[currentMonth]} ${currentYear}`;
    
    // Clear grid
    calendarGrid.innerHTML = '';
    
    // Add day headers
    dayNames.forEach(day => {
        const dayHeader = document.createElement('div');
        dayHeader.className = 'day-header';
        dayHeader.textContent = day;
        calendarGrid.appendChild(dayHeader);
    });
    
    // Get first day of month and total days
    const firstDay = new Date(currentYear, currentMonth, 1).getDay();
    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyCell = document.createElement('div');
        emptyCell.className = 'calendar-day disabled';
        calendarGrid.appendChild(emptyCell);
    }
    
    // Add day cells
    const today = new Date();
    
    for (let day = 1; day <= daysInMonth; day++) {
        const dayCell = document.createElement('div');
        dayCell.className = 'calendar-day';
        dayCell.textContent = day;
        
        const dateStr = `${currentYear}-${currentMonth + 1}-${day}`;
        
        // Check if it's today
        if (day === today.getDate() && 
            currentMonth === today.getMonth() && 
            currentYear === today.getFullYear()) {
            dayCell.classList.add('today');
        }
        
        // Check if date is selected
        if (selectedDates.has(dateStr)) {
            dayCell.classList.add('selected');
        }
        
        // Add click event
        dayCell.addEventListener('click', () => toggleDate(dateStr, dayCell));
        
        calendarGrid.appendChild(dayCell);
    }
}

// Toggle date selection
function toggleDate(dateStr, element) {
    if (selectedDates.has(dateStr)) {
        selectedDates.delete(dateStr);
        element.classList.remove('selected');
    } else {
        selectedDates.add(dateStr);
        element.classList.add('selected');
    }
    updateSelectedDatesDisplay();
}

// Update selected dates display
function updateSelectedDatesDisplay() {
    if (selectedDates.size === 0) {
        selectedDatesElement.innerHTML = '<p class="empty-state">Click dates on the calendar to select them</p>';
        return;
    }
    
    // Convert Set to Array and sort
    const sortedDates = Array.from(selectedDates).sort();
    
    selectedDatesElement.innerHTML = '';
    
    sortedDates.forEach(dateStr => {
        const [year, month, day] = dateStr.split('-');
        const date = new Date(year, month - 1, day);
        const formattedDate = date.toLocaleDateString('en-US', { 
            weekday: 'short', 
            month: 'short', 
            day: 'numeric',
            year: 'numeric'
        });
        
        const dateTag = document.createElement('div');
        dateTag.className = 'selected-date';
        dateTag.innerHTML = `
            ${formattedDate}
            <span onclick="removeDate('${dateStr}')">✕</span>
        `;
        selectedDatesElement.appendChild(dateTag);
    });
}

// Remove a specific date
function removeDate(dateStr) {
    selectedDates.delete(dateStr);
    renderCalendar();
    updateSelectedDatesDisplay();
}

// Clear all selections
function clearAllSelections() {
    selectedDates.clear();
    renderCalendar();
    updateSelectedDatesDisplay();
}

// Navigation functions
function previousMonth() {
    currentMonth--;
    if (currentMonth < 0) {
        currentMonth = 11;
        currentYear--;
    }
    renderCalendar();
}

function nextMonth() {
    currentMonth++;
    if (currentMonth > 11) {
        currentMonth = 0;
        currentYear++;
    }
    renderCalendar();
}

// Event listeners
prevMonthBtn.addEventListener('click', previousMonth);
nextMonthBtn.addEventListener('click', nextMonth);
clearSelectionsBtn.addEventListener('click', clearAllSelections);

// Initialize on page load
document.addEventListener('DOMContentLoaded', initCalendar);

console.log('✅ Calendar loaded successfully!');
