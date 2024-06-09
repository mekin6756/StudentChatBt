document.addEventListener('click', function(event) {
    const inputBoxes = document.querySelectorAll('.input-box');
    const passInputBox = document.querySelectorAll('.passInput-box');

    let isOutsideInput = true;
    inputBoxes.forEach(function(inputBox) {
        if (inputBox.contains(event.target)) {
            isOutsideInput = false;
        }
    });

    const isOutsidePassInput = !passInputBox.contains(event.target);
    if (isOutsideInput && isOutsidePassInput) {
        inputBoxes.forEach(function(inputBox) {
            if (inputBox.querySelector('input').value === '') {
                inputBox.classList.remove('focused');
            }
        });
        passInputBox.classList.remove('focused');
    }
  
});


document.querySelectorAll('.input-box').forEach(function(inputBox) {
    const input = inputBox.querySelector('input');
    input.addEventListener('focus', function() {
        inputBox.classList.add('focused');
    });
    input.addEventListener('input', function() {
        if (input.value !== '') {
            inputBox.classList.add('focused');
        }
    });
    input.addEventListener('blur', function() {
        if (input.value === '') {
            inputBox.classList.remove('focused');
        }
    });
});

document.querySelectorAll('.passInput-box').forEach(function(passInputBox) {
    const input = passInputBox.querySelector('input');
    input.addEventListener('focus', function() {
        passInputBox.classList.add('focused');
    });
    input.addEventListener('input', function() {
        if (input.value !== '') {
            passInputBox.classList.add('focused');
        }
    });
    input.addEventListener('blur', function() {
        if (input.value === '') {
            passInputBox.classList.remove('focused');
        }
    });
});

function toggleLabel(inputBox) {
    inputBox.classList.toggle('show-label');
}

function selectUser(userType) {
    const studentIcon = document.getElementById('student-icon');
    const facultyIcon = document.getElementById('faculty-icon');
    const userTypeDesc = document.getElementById('userTypeDesc');

    if (userType === 'student') {
        studentIcon.style.display = 'block';
        facultyIcon.style.display = 'none';
        userTypeDesc.textContent = 'Hello Students! Please fill out the form below to get started';
    } else if (userType === 'faculty') {
        studentIcon.style.display = 'none';
        facultyIcon.style.display = 'block';
        userTypeDesc.textContent = 'Hello Faculty! Please fill out the form below to get started';
    }

    const inputBoxes = document.querySelectorAll('.input-box');
    inputBoxes.forEach(function(inputBox) {
        inputBox.classList.remove('focused');
    });

    const passInputBox = document.querySelector('.passInput-box');
    passInputBox.classList.remove('focused');
}
document.addEventListener('DOMContentLoaded', function() {
    const inputBoxes = document.querySelectorAll('.input-box');

    function handleInputBox(inputBox) {
        const input = inputBox.querySelector('input');
        const label = inputBox.querySelector('span');

        input.addEventListener('focus', function() {
            inputBox.classList.add('focused');
        });

        input.addEventListener('input', function() {
            if (input.value !== '') {
                inputBox.classList.add('focused');
            } else {
                inputBox.classList.remove('focused');
            }
        });

        input.addEventListener('blur', function() {
            if (input.value === '') {
                inputBox.classList.remove('focused');
            }
        });
    }

    inputBoxes.forEach(function(inputBox) {
        handleInputBox(inputBox);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    const passInputBox = document.querySelector('.passInput-box');
    const passInput = passInputBox.querySelector('input');
    const passIcon = passInputBox.querySelector('.pass-icon svg');

    passIcon.addEventListener('click', function() {
        if (passInput.type === 'password') {
            passInput.type = 'text';
        } else {
            passInput.type = 'password';
        }
    });

    passInput.addEventListener('focus', function() {
        passInputBox.classList.add('focused');
    });

    passInput.addEventListener('input', function() {
        if (passInput.value !== '') {
            passInputBox.classList.add('focused');
        } else {
            passInputBox.classList.remove('focused');
        }
    });

    passInput.addEventListener('blur', function() {
        if (passInput.value === '') {
            passInputBox.classList.remove('focused');
        }
    });
});
