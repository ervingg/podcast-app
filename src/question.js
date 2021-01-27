export class Question {
   static create(question) {
      return fetch('https://podcast-app-6478d-default-rtdb.firebaseio.com/questions.json', {
            method: 'POST',
            body: JSON.stringify(question),
            headers: {
               'Content-Type': 'application/json'
            }
         })
         .then(response => response.json())
         .then(response => {
            question.id = response.name;
            return question;
         })
         .then(addToLocalStorage)
         .then(Question.renderList);
   }

   static renderList() {
      let questions = getQuestionsFromLocalStogare();

      const html = questions.length
         ? questions.map(toCard).reverse().join('')
         : `<div class="mui--text-headline">You haven't asked anything yet</div>`;

      const list = document.getElementById('list');
      list.innerHTML = html;
   }

   static listToHTML(questions) {
      return questions.length 
         ? `<ol>${questions.map(q => `<li>${q.text}</li>`).join('')}</ol>`
         : '<p>No questions yet</p>';
   }

   static fetch(token) {
      if (!token) {
         return Promise.resolve('<p class="error">You have not token</p>');
      }
      return fetch(`https://podcast-app-6478d-default-rtdb.firebaseio.com/questions.json?auth=${token}`)
         .then(response => response.json())
         .then(response => {
            if (response && response.error) {
               return `<p class="error">${response.error}</p>`;
            }

            return response ? Object.keys(response).map(key => ({
               ...response[key],
               id: key
            })) : [];
         });
   }
}

function addToLocalStorage(question) {
   const allQuestions = getQuestionsFromLocalStogare();
   allQuestions.push(question);
   localStorage.setItem('questions', JSON.stringify(allQuestions));
}

function getQuestionsFromLocalStogare() {
   return JSON.parse(localStorage.getItem('questions') || '[]');
}

function toCard(question) {
   return `
      <div class="mui--text-black-54">
         ${new Date(question.date).toLocaleDateString()}
         ${new Date(question.date).toLocaleTimeString()}
      </div>
      <div>${question.text}</div>
      <br>
   `;
}