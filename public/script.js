
const form = document.getElementById('registrationForm');
const result = document.getElementById('result');

form.addEventListener('submit', async function(event) {

    event.preventDefault();

    const studentData = {
        name: document.getElementById('name').value,
        email: document.getElementById('email').value,
        phone: document.getElementById('phone').value,
        password: document.getElementById('password').value
    };

    try {

        const response = await fetch('/register', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(studentData)
        });

        const data = await response.json();

        if (data.success) {

            result.style.color = 'green';
            result.textContent = data.message;

            form.reset();

        } else {

            result.style.color = 'red';
            result.innerHTML = data.errors.join('<br>');

        }

    } catch (error) {

        result.style.color = 'red';
        result.textContent = 'Unable to connect to server';

    }

});
