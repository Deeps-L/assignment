document.addEventListener("DOMContentLoaded", function () {

  // Fetch the header and footer and inject them into the DOM
  const loadHeaderFooter = () => {
    return Promise.all([
      fetch('../Header/header.html')
        .then(response => response.text())
        .then(data => {
          document.querySelector('#header').innerHTML = data;
        }),
      
      fetch('../Footer/footer.html')
        .then(response => response.text())
        .then(data => {
          document.querySelector('#footer').innerHTML = data;
        })
    ]);
  };

  // Once header and footer are loaded, attach event listeners
  loadHeaderFooter().then(() => {

    // Email subscription form validation
    const email = document.getElementById('email');
    const emailHelp = document.getElementById('emailHelp');
    const subscribeBtn = document.getElementById('subscribeBtn');

    if (email && subscribeBtn) {
      email.addEventListener('input', () => {
        const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
        const isValidEmail = emailRegex.test(email.value);

        if (isValidEmail) {
          emailHelp.textContent = '';
          subscribeBtn.disabled = false;
        } else {
          emailHelp.textContent = 'Please enter a valid email address';
          subscribeBtn.disabled = true;
        }
      });

      subscribeBtn.addEventListener('click', (event) => {
        event.preventDefault();
        console.log('Subscribed email:', email.value);
        setTimeout(() => {
          window.location.href = '../pages/thanku.html';
        }, 3000);
      });
    }

    // Contact form validation
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const messageInput = document.getElementById('messageInput');
    const nameErr = document.getElementById('nameErr');
    const emailErr = document.getElementById('emailErr');
    const messageErr = document.getElementById('messageErr');
    const submitBtn = document.getElementById('submitBtn');

    const validateForm = () => {
      let isValid = true;

      if (nameInput.value.trim() === '') {
        nameErr.textContent = 'Please enter your name';
        isValid = false;
      } else {
        nameErr.textContent = '';
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(emailInput.value.trim())) {
        emailErr.textContent = 'Please enter a valid email address';
        isValid = false;
      } else {
        emailErr.textContent = '';
      }

      if (messageInput.value.trim() === '') {
        messageErr.textContent = 'Please enter your message';
        isValid = false;
      } else {
        messageErr.textContent = '';
      }

      submitBtn.disabled = !isValid;
      return isValid;
    };

    if (nameInput && emailInput && messageInput && submitBtn) {
      nameInput.addEventListener('input', validateForm);
      emailInput.addEventListener('input', validateForm);
      messageInput.addEventListener('input', validateForm);

      submitBtn.addEventListener('click', (event) => {
        event.preventDefault();

        if (validateForm()) {
          const formData = {
            name: nameInput.value,
            email: emailInput.value,
            message: messageInput.value
          };

          console.log('Form data:', formData);

          setTimeout(() => {
            window.location.href = '../pages/thanku.html';
          }, 2000);
        }
      });
    }
  }).catch(err => {
    console.error('Error loading header/footer:', err);
  });

});
