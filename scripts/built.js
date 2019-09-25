'use strict';
$(document).ready(() => {

  sessionStorage.setItem('users', JSON.stringify([{user: 'mateo@mateo.com', password: 'pass123'}]));
  // Validacion del formulario en el evento submit;
  $('#loginForm').on('submit', function (e) {
    e.preventDefault();
    const mail = $('#email'),
      pass = $('#password'),
      keepSession = $('#keep-session'),
      formObj = {
        mail,
        pass,
        keepSession
      };

    validateForm(formObj);

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

const validateForm = (form) => {
  const isValidMail = validateEmail(form.mail),
    isValidPassword = validatePassword(form.pass);
  if (isValidMail && isValidPassword) {
    checkUser(form.mail.val(), form.pass.val());
  } else {
    buildMessage(isValidMail, isValidPassword);

  }

}

const buildMessage = (validEmail, validPass, message = '', messageTime = 4000) => {
  const messageText = message.length > 0 ? message : !validEmail || !validPass ? 'Digite seu email o senha' : 'Você foi logado com succeso',
    messageIcon = !validEmail || !validPass ? 'fa fa-close' : 'fa fa-check',
    messageClass = !validEmail || !validPass ? 'alert-danger' : 'alert-success';

  $('body').append(`<div class="alert ${messageClass}" role="alert" data-dissmiss="alert">
            <i class="fa ${messageIcon}"></i> ${messageText}
          </div>`);
  setTimeout(() => {
    $('.alert').fadeOut('slow', () => {
      $('.alert').alert('close');
    })
  }, messageTime);
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

  return passField.val().length > 0;
};

const checkUser = (mail, pass) => {
  const users = JSON.parse(sessionStorage.getItem('users')),
    user = users.find(user => {
      return user.user === mail && user.password === pass
    });
  if (user) {
    buildMessage(true, true, '', 2000);
    setTimeout(() => {
      window.location = 'welcome.html'
    }, 2000);
  } else {
    buildMessage(false, false, 'Nome de usuário ou senha inválidos, verifique e tente novamente', 4000);
  }
}
