document.addEventListener("DOMContentLoaded", function () {

  // Load Header and Footer
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
    
    // contact form validation code
    const nameInput = document.getElementById('nameInput');
    const emailInput = document.getElementById('emailInput');
    const messageInput = document.getElementById('messageInput');
    const nameErr = document.getElementById('nameErr');
    const emailErr = document.getElementById('emailErr');
    const messageErr = document.getElementById('messageErr');
    const submitBtn = document.getElementById('submitBtn');

    if (!nameInput || !emailInput || !messageInput || !submitBtn) {
      return;
    }

    let isNameTouched = false;
    let isEmailTouched = false;
    let isMessageTouched = false;

    const validateName = () => {
      if (nameInput.value.trim() === '' && isNameTouched) {
        nameErr.textContent = 'Please enter your name';
        return false;
      } else {
        nameErr.textContent = '';
        return true;
      }
    };

    const validateEmail = () => {
      const emailValue = emailInput.value.trim();
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;    

      if (emailValue === '' && isEmailTouched) {
        emailErr.textContent = 'Email cannot be blank';
        return false;
      }       
      if (!emailRegex.test(emailValue) && isEmailTouched && emailValue !== '') {
        emailErr.textContent = 'Please enter a valid email address';
        return false;
      }       
      emailErr.textContent = '';
      return true;
    };

    const validateMessage = () => {
      if (messageInput.value.trim() === '' && isMessageTouched) {
        messageErr.textContent = 'Please enter your message';
        return false;
      } else {
        messageErr.textContent = '';
        return true;
      }
    };

    const validateForm = () => {
      const isNameValid = validateName();
      const isEmailValid = validateEmail();
      const isMessageValid = validateMessage();

      submitBtn.disabled = !(isNameValid && isEmailValid && isMessageValid);
      return isNameValid && isEmailValid && isMessageValid;
    };

    // Add event listeners only when inputs exist
    nameInput.addEventListener('focus', () => { isNameTouched = true; });
    emailInput.addEventListener('focus', () => { isEmailTouched = true; });
    messageInput.addEventListener('focus', () => { isMessageTouched = true; });

    nameInput.addEventListener('input', () => {
      validateName();
      validateForm(); 
    });

    emailInput.addEventListener('input', () => {
      validateEmail();
      validateForm(); 
    });

    messageInput.addEventListener('input', () => {
      validateMessage();
      validateForm(); 
    });

    submitBtn.addEventListener('click', (event) => {
      event.preventDefault();      
      const isValid = validateForm();

      // If the form is valid and button is enabled, log the form data
      if (isValid && !submitBtn.disabled) {
        const formData = {
          name: nameInput.value,
          email: emailInput.value,
          message: messageInput.value
        };

        console.log('Form data:', formData);
        
        setTimeout(() => {
          window.location.href = '../pages/thanku.html';
        }, 3000);
      } else {
        console.log('Submit button disabled:', submitBtn.disabled);
        console.log('Form is valid:', isValid);
        console.log('Form is invalid or button is disabled.');
      }
    });

  }).catch(err => {
    console.error('Error loading header and footer:', err);
  });

});
