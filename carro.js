        function saveData() {
            const car = {
                year: document.getElementById('year').value,
                manufacturer: document.getElementById('manufacturer').value,
                type: document.getElementById('type').value,
                plate: document.getElementById('plate').value,
                color: document.getElementById('color').value
            };

            // Recupera o banco de dados local ou cria um novo
            let cars = JSON.parse(localStorage.getItem('cars')) || [];
            cars.push(car);

            // Salva os dados no LocalStorage
            localStorage.setItem('cars', JSON.stringify(cars));

            alert('Dados salvos com sucesso!');
            document.getElementById('carForm').reset();
        }