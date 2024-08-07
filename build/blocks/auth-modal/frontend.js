/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	// The require scope
/******/ 	var __webpack_require__ = {};
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
/*!*******************************************!*\
  !*** ./src/blocks/auth-modal/frontend.js ***!
  \*******************************************/
__webpack_require__.r(__webpack_exports__);
document.addEventListener('DOMContentLoaded', () => {
  const openModalbtn = document.querySelectorAll(".open-modal");
  const modalEl = document.querySelector(".wp-block-udemy-plus-auth-modal");
  const closeModalEl = document.querySelectorAll(".modal-overlay, .modal-btn-close");
  const signinForm = document.querySelector('#signin-tab');
  const signupForm = document.querySelector('#signup-tab');
  openModalbtn.forEach(el => {
    el.addEventListener('click', event => {
      event.preventDefault();
      modalEl.classList.add('modal-show');
    });
  });
  closeModalEl.forEach(el => {
    el.addEventListener('click', event => {
      event.preventDefault();
      modalEl.classList.remove('modal-show');
    });
  });
  const tabs = document.querySelectorAll('.tabs a');
  tabs.forEach(tab => {
    tab.addEventListener('click', event => {
      event.preventDefault();
      tabs.forEach(currentTab => {
        currentTab.classList.remove('active-tab');
      });
      event.currentTarget.classList.add('active-tab');
      const activeTab = event.currentTarget.getAttribute('href');
      if (activeTab === '#signin-tab') {
        signinForm.style.display = 'block';
        signupForm.style.display = 'none';
      } else {
        signinForm.style.display = 'none';
        signupForm.style.display = 'block';
      }
    });
  });
  signupForm.addEventListener('submit', async event => {
    event.preventDefault();
    const signupFieldSet = signupForm.querySelector('fieldset');
    signupFieldSet.setAttribute('disabled', true);
    const signupStatus = signupForm.querySelector('#signup-status');
    signupStatus.innerHTML = `
            <div class = "modal-status modal-status-info">
                All forms must be completed to create account.
            </div>
        `;
    const formData = {
      username: signupForm.querySelector('#su-name').value,
      email: signupForm.querySelector('#su-email').value,
      password: signupForm.querySelector('#su-password').value
    };
    const response = await fetch(up_auth_rest.signup, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const responseJSON = await response.json();
    if (responseJSON === 2) {
      signupStatus.innerHTML = `<div class="modal-status modal-status-success">
                Success! Your account has been created.
            </div>`;
      location.reload();
    } else {
      signupFieldSet.removeAttribute('disabled');
      signupStatus.innerHTML = `
                <div class = "modal-status modal-status-danger">
                    Unable to create account! Please try again later.
                </div>
            `;
    }
  });
  signinForm.addEventListener('submit', async event => {
    event.preventDefault();
    const signinFieldSet = document.querySelector('fieldset');
    const signinStatus = document.querySelector('#signin-status');
    signinFieldSet.setAttribute('disabled', true);
    signinStatus.innerHTML = `
            <div class = "modal-status modal-status-info">
                Please wait! We're logging you in.
            </div>
        `;
    const formData = {
      user_login: signinForm.querySelector('#si-login').value,
      password: signinForm.querySelector('#si-password').value
    };
    const response = await fetch(up_auth_rest.signin, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(formData)
    });
    const responseJSON = await response.json();
    if (responseJSON.status === 2) {
      signinStatus.innerHTML = `<div class="modal-status modal-status-success">
                Success! You're now logged in.
            </div>`;
      location.reload();
    } else {
      signinFieldSet.removeAttribute('disabled');
      signinStatus.innerHTML = `<div class="modal-status modal-status-danger">
                Ya done fucked up a-aron.
            </div>`;
    }
  });
});
/******/ })()
;
//# sourceMappingURL=frontend.js.map