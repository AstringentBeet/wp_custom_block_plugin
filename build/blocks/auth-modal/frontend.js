/******/ (() => { // webpackBootstrap
var __webpack_exports__ = {};
/*!*******************************************!*\
  !*** ./src/blocks/auth-modal/frontend.js ***!
  \*******************************************/
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
  signupForm.addEventListener('submit', event => {
    event.preventDefault();
    const signupFieldSet = signupForm.querySelector('fieldset');
    signupFieldSet.setAttribute('disabled', true);
    const signupStatus = signupForm.querySelector('#signup-status');
    signupStatus.innerHTML = `
            <div class = "modal-status modal-status-info">
                All forms must be completed to create account.
            </div>
        `;
  });
});
/******/ })()
;
//# sourceMappingURL=frontend.js.map