'use strict';
$(document).ready(() => {
  $('#loginForm').on('submit', (e) => {
    e.preventDefault();
    const mail = $('#email').val(),
      pass = $('#password').val();
    $('body').append(buildMessage(validateEmail(mail.toLowerCase()), true));

    setTimeout(() => {
      $('.alert').fadeOut('slow', () => {
        $('.alert').alert('close');
      })
    }, 4000);

  });
});


const buildMessage = (validEmail, validPass) => {
  const messageText = !validEmail || !validPass ? 'Digite seu email o senha' : 'Você foi logado com succeso',
    messageIcon = !validEmail || !validPass ? 'fa fa-close' : 'fa fa-check',
    messageClass = !validEmail || !validPass ? 'alert-danger' : 'alert-success';

  return `<div class="alert ${messageClass}" role="alert" data-dissmiss="alert">
            <i class="fa ${messageIcon}"></i> ${messageText}
          </div>`;
}

const validateEmail = mail => {
  if (/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(mail)) {
    return (true);
  }
  return (false);
}
