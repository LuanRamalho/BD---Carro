window.onload = function() {
    loadTable();
};

function loadTable() {
    const cars = JSON.parse(localStorage.getItem('cars')) || [];
    const tableBody = document.getElementById('carTableBody');
    tableBody.innerHTML = '';

    cars.forEach((car, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td><span>${car.year}</span><input type="text" value="${car.year}" class="edit-input" style="display: none;"></td>
            <td><span>${car.manufacturer}</span><input type="text" value="${car.manufacturer}" class="edit-input" style="display: none;"></td>
            <td><span>${car.type}</span><input type="text" value="${car.type}" class="edit-input" style="display: none;"></td>
            <td><span>${car.plate}</span><input type="text" value="${car.plate}" class="edit-input" style="display: none;"></td>
            <td><span>${car.color}</span><input type="text" value="${car.color}" class="edit-input" style="display: none;"></td>
            <td>
                <button onclick="enableEdit(${index}, this)">Editar</button>
                <button onclick="deleteCar(${index})">Excluir</button>
                <button onclick="saveEdit(${index}, this)" style="display: none;">Salvar</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}

function filterTable() {
    const searchInput = document.getElementById('search').value.toLowerCase();
    const rows = document.getElementById('carTableBody').getElementsByTagName('tr');

    for (let i = 0; i < rows.length; i++) {
        const cells = rows[i].getElementsByTagName('td');
        let match = false;

        for (let j = 0; j < cells.length - 1; j++) { // Excluindo a coluna de ações
            const cellValue = cells[j].getElementsByTagName('span')[0].textContent.toLowerCase();
            if (cellValue.indexOf(searchInput) > -1) {
                match = true;
                break;
            }
        }

        rows[i].style.display = match ? '' : 'none';
    }
}

function enableEdit(index, editButton) {
    const row = editButton.parentElement.parentElement;
    const inputs = row.querySelectorAll('.edit-input');
    const spans = row.querySelectorAll('span');
    
    // Alterna a exibição dos campos para edição
    inputs.forEach(input => input.style.display = 'inline-block');
    spans.forEach(span => span.style.display = 'none');

    // Exibe o botão de salvar e oculta o de editar
    editButton.style.display = 'none';
    editButton.nextElementSibling.style.display = 'none'; // Esconde o botão excluir
    editButton.nextElementSibling.nextElementSibling.style.display = 'inline-block'; // Exibe o botão salvar
}

function saveEdit(index, saveButton) {
    const row = saveButton.parentElement.parentElement;
    const inputs = row.querySelectorAll('.edit-input');
    const spans = row.querySelectorAll('span');
    
    // Atualiza os valores do LocalStorage
    let cars = JSON.parse(localStorage.getItem('cars')) || [];
    cars[index].year = inputs[0].value;
    cars[index].manufacturer = inputs[1].value;
    cars[index].type = inputs[2].value;
    cars[index].plate = inputs[3].value;
    cars[index].color = inputs[4].value;

    localStorage.setItem('cars', JSON.stringify(cars));

    // Atualiza os spans com os novos valores
    spans.forEach((span, i) => span.textContent = inputs[i].value);

    // Alterna a exibição para não-edição
    inputs.forEach(input => input.style.display = 'none');
    spans.forEach(span => span.style.display = 'inline-block');

    // Exibe o botão editar novamente
    saveButton.style.display = 'none';
    saveButton.previousElementSibling.style.display = 'inline-block'; // Exibe o botão excluir
    saveButton.previousElementSibling.previousElementSibling.style.display = 'inline-block'; // Exibe o botão editar
}

function deleteCar(index) {
    let cars = JSON.parse(localStorage.getItem('cars')) || [];
    cars.splice(index, 1);
    localStorage.setItem('cars', JSON.stringify(cars));
    loadTable();
}
