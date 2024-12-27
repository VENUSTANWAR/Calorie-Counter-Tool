document.addEventListener('DOMContentLoaded', () => {
    const form = document.getElementById('calorie-form');
    const foodItemInput = document.getElementById('food-item');
    const caloriesInput = document.getElementById('calories');
    const entriesDiv = document.getElementById('entries');

    // Load entries from local storage
    loadEntries();

    form.addEventListener('submit', (e) => {
        e.preventDefault();
        const foodItem = foodItemInput.value;
        const calories = parseInt(caloriesInput.value);

        if (foodItem && calories) {
            const entry = { foodItem, calories, date: new Date().toLocaleDateString() };
            saveEntry(entry);
            foodItemInput.value = '';
            caloriesInput.value = '';
            loadEntries();
        }
    });

    function saveEntry(entry) {
        const entries = getEntries();
        entries.push(entry);
        localStorage.setItem('calorieEntries', JSON.stringify(entries));
    }

    function getEntries() {
        const entries = localStorage.getItem('calorieEntries');
        return entries ? JSON.parse(entries) : [];
    }

    function loadEntries() {
        const entries = getEntries();
        entriesDiv.innerHTML = '';
        entries.forEach(entry => {
            const div = document.createElement('div');
            div.className = 'entry';
            div.innerHTML = `<span>${entry.foodItem} - ${entry.calories} calories (${entry.date})</span>`;
            entriesDiv.appendChild(div);
        });
    }
});