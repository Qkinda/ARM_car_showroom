function buildMonthTable() {
    const table = document.getElementById('timeManagerTable');
    const headerRow = table.querySelector('thead tr');
    const body = table.querySelector('tbody');

    const currentDate = new Date();
    const currentYear = currentDate.getFullYear();
    const currentMonth = currentDate.getMonth();

    // Очистим таблицу перед построением новых данных
    headerRow.innerHTML = '<th></th>';
    body.innerHTML = '';

    const daysInMonth = new Date(currentYear, currentMonth + 1, 0).getDate();

    // Создаем заголовок с датами
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentYear, currentMonth, day);
        const formattedDate = formatDate(date);

        const th = document.createElement('th');
        th.textContent = formattedDate;
        headerRow.appendChild(th);
    }
   
    const employees = ["Daniil", "Alexey", "Maria", "Vladimir", "Alena"];

    // Создаем строки для каждого сотрудника
    employees.forEach(employee => {
        const tr = document.createElement('tr');
        const tdEmployee = document.createElement('td');
        tdEmployee.textContent = employee;
        tr.appendChild(tdEmployee);

        for (let day = 1; day <= daysInMonth; day++) {
            // Создаем ячейки для времени прихода и ухода сотрудников
            const tdTime = document.createElement('td');
            tdTime.classList.add('time-cell');
            tdTime.setAttribute('data-date', `${day}.${currentMonth + 1}.${currentYear}`);
            tr.appendChild(tdTime);
        }

        body.appendChild(tr);
    });
}

function formatDate(date) {
    const options = { day: 'numeric', month: 'short' };
    return date.toLocaleDateString('en-US', options);
}

window.onload = function () {
    buildMonthTable();
};