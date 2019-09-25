'use strict';
$(document).ready(() => {
  $('#loginForm').on('submit', (e) => {
    e.preventDefault();
    const mail = $('#email'),
      pass = $('#password');

    $('body').append(buildMessage(validateEmail(mail), validatePassword(pass)));
    setTimeout(() => {
      $('.alert').fadeOut('slow', () => {
        $('.alert').alert('close');
      })
    }, 4000);

  });

  // Validamos el campo email cuando se pierde el foco del elemento
  $('#email').on('blur', function () {
    validateEmail($(this));
  });

  // Validamos el campo password cuando se pierde el foco del elemento
  $('#password').on('blur', function () {
    validatePassword($(this));
  });

  // Eliminamos la clase error cuando hay foco en el elemento
  $('input').on('focus', function () {
    $(this).removeClass('error');
  });
});


const buildMessage = (validEmail, validPass) => {
  const messageText = !validEmail || !validPass ? 'Digite seu email o senha' : 'Você foi logado com succeso',
    messageIcon = !validEmail || !validPass ? 'fa fa-close' : 'fa fa-check',
    messageClass = !validEmail || !validPass ? 'alert-danger' : 'alert-success';

  return `<div class="alert ${messageClass}" role="alert" data-dissmiss="alert">
            <i class="fa ${messageIcon}"></i> ${messageText}
          </div>`;
};

const validateEmail = mailField => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mailField.val().toLowerCase())) {
    mailField.removeClass('error');
    return (true);
  }
  mailField.addClass('error');
  return (false);
};

const validatePassword = passField => {
  passField.removeClass('error');
  if (passField.val().length === 0) {
    passField.addClass('error');
  }

  return passField.val().length > 0 && passField.val() === 'mateopass123';
};
