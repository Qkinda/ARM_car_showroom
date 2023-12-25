window.onload = getCars;

async function submitForm() {
    const carMake = document.getElementById('carMake').value;
    const carModel = document.getElementById('carModel').value;
    const carYear = document.getElementById('carYear').value;

    const response = await fetch('http://localhost:3000/addCar', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            make: carMake,
            model: carModel,
            year: carYear,
        }),
    });

    const result = await response.text();
    alert(result);
    document.getElementById('carForm').reset();
    getCars();
}

async function getCars() {
    const makeFilter = document.getElementById('makeFilter').value;
    const yearFilter = document.getElementById('yearFilter').value;

    let url = 'http://localhost:3000/getCars';

    // Передаем параметры фильтрации в URL
    if (makeFilter || yearFilter) {
        url += `?make=${makeFilter}&year=${yearFilter}`;
    }

    const response = await fetch(url);
    const cars = await response.json();

    displayCars(cars);
}

function displayCars(cars) {
    const carListContainer = document.getElementById('carList');
    carListContainer.innerHTML = '';

    const table = document.createElement('table');
    table.classList.add('car-table');

    const headerRow = document.createElement('tr');
    headerRow.innerHTML = `
        <th>Brand</th>
        <th>Model</th>
        <th>Year</th>
        <th>Actions</th>
    `;
    table.appendChild(headerRow);

    cars.forEach((car) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${car.make}</td>
            <td>${car.model}</td>
            <td>${car.year}</td>
            <td>
                <button class="button-edit" onclick="editCar(${car.id})">Edit</button>
                <button class="button-delete" onclick="deleteCar(${car.id})">Delete</button>
            </td>
        `;
        table.appendChild(row);
    });

    carListContainer.appendChild(table);
}


// Модальные окна для редактирования машин
function openEditModal() {
    const editModal = document.getElementById('editCarModal');
    editModal.style.display = 'block';
}

function closeEditModal() {
    const editModal = document.getElementById('editCarModal');
    editModal.style.display = 'none';
}

// Функция редактирования машины
async function editCar(carId) {
    const response = await fetch(`http://localhost:3000/getCar/${carId}`);
    const car = await response.json();

    // Заполнение формы редактирования данными о машине
    const editForm = document.getElementById('editCarForm');
    editForm.innerHTML = `
        <label for="editCarMake">Car brand:</label>
        <input type="text" id="editCarMake" name="editCarMake" value="${car.make}" required>

        <label for="editCarModel">Car model:</label>
        <input type="text" id="editCarModel" name="editCarModel" value="${car.model}" required>

        <label for="editCarYear">Year:</label>
        <input type="number" id="editCarYear" name="editCarYear" value="${car.year}" required>

        <button class="button-edit-form" type="button" onclick="updateCar(${car.id})">Save changes</button>
    `;

    openEditModal();
}

// Удаление машины
async function deleteCar(carId) {
    const confirmDelete = confirm('Вы уверены, что хотите удалить эту машину?');

    if (confirmDelete) {
        const response = await fetch(`http://localhost:3000/deleteCar/${carId}`, {
            method: 'DELETE',
        });

        const result = await response.text();
        alert(result);

        getCars();
    }
}

// Обновление
async function updateCar(carId) {
    const editCarMake = document.getElementById('editCarMake').value;
    const editCarModel = document.getElementById('editCarModel').value;
    const editCarYear = document.getElementById('editCarYear').value;

    const response = await fetch(`http://localhost:3000/updateCar/${carId}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            make: editCarMake,
            model: editCarModel,
            year: editCarYear,
        }),
    });

    const result = await response.text();
    alert(result);

    // После редактирования машины, обновляем отображение
    getCars();
    closeEditModal();
}