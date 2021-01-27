import { Question } from './question';
import { createModal, isValid } from './utils';
import './styles.css';
import { authWithEmailAndPassword, getAuthFrom, registerWithEmailAndPassword } from './auth';

const form = document.getElementById('form');
const btnModal = document.getElementById('modal-btn');
const input = form.querySelector('#question-input');
const btnSubmit = form.querySelector('#submit');

window.addEventListener('load', Question.renderList);
form.addEventListener('submit', submitFormHandler);
btnModal.addEventListener('click', openModal);

input.addEventListener('input', () => {
   btnSubmit.disabled = !isValid(input.value);
});

function submitFormHandler(event) {
   event.preventDefault();

   if (isValid(input.value)) {
      const question = {
         text: input.value.trim(),
         date: new Date().toJSON()
      };
      
      btnSubmit.disabled = true;
      
      Question.create(question).then(() => {
         input.value = '';
         input.className = '';
         btnSubmit.disabled = false;
      });
   }
}

function openModal() {
   createModal('Sign-(In/Up)', getAuthFrom());
   document.getElementById('auth-form').addEventListener('submit', authFormHandler, {once: true});
}

function authFormHandler(event) {
   event.preventDefault();
   
   const btn = event.target.querySelector('button');
   const email = event.target.querySelector('#email').value;
   const password = event.target.querySelector('#password').value;

   btn.disabled = true;

   authWithEmailAndPassword(email, password)
      .then(Question.fetch)
      .then(renderModalAfterAuth)
      .then(() => btn.disabled = false);
}

function renderModalAfterAuth(content) {
   if (typeof content === 'string') {
      createModal('Error!', content);
   } else {
      createModal('Questions list', Question.listToHTML(content));
   }
}