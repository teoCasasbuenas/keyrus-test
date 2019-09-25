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
    $('body').append(buildMessage(isValidMail, isValidPassword));
    setTimeout(() => {
      $('.alert').fadeOut('slow', () => {
        $('.alert').alert('close');
      })
    }, 4000);
  }

}

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

  return passField.val().length > 0;
};

const checkUser = (mail, pass) => {
  const users = JSON.parse(sessionStorage.getItem('users')),
    user = users.find(user => {
      console.log(user);
      return user.user === mail && user.password === pass
    });
  console.log(user, mail, pass);
  if (user) {
    $('body').append(buildMessage(true, true));
    setTimeout(() => {
      $('.alert').fadeOut('slow', () => {
        $('.alert').alert('close');
      });
      window.location = '/keyrus-test/welcome.html'
    }, 4000);
  }
}
