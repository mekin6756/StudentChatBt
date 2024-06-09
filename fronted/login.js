document.addEventListener('click', function(event) {
  const inputBox = document.querySelector('.input-box');
  const passInputBox = document.querySelector('.passInput-box');
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
      userTypeDesc.textContent = 'Hello Students! Please login to get started';
  } else if (userType === 'faculty') {
      studentIcon.style.display = 'none';
      facultyIcon.style.display = 'block';
      userTypeDesc.textContent = 'Hello Faculty! Please login to get started';
  }
}

document.querySelectorAll('.input-box').forEach(function(inputBox) {
  const input = inputBox.querySelector('input');
  input.addEventListener('blur', function() {
      if (input.value === '') {
          inputBox.classList.remove('focused');
      }
  });

  input.addEventListener('input', function() {
      if (input.value !== '') {
          inputBox.classList.add('focused');
      }
  });
});

document.querySelectorAll('.passInput-box').forEach(function(passInputBox) {
  const input = passInputBox.querySelector('input');
  input.addEventListener('blur', function() {
      if (input.value === '') {
          passInputBox.classList.remove('focused');
      }
  });

  input.addEventListener('input', function() {
      if (input.value !== '') {
          passInputBox.classList.add('focused');
      }
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
