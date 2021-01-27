export function getAuthFrom() {
   return `
      <form class="mui-form" id="auth-form">
         <div class="mui-textfield mui-textfield--float-label">
            <input type="email" id="email" required minlength="5" maxlength="256" autocomplete>
            <label for="email">Email</label>
         </div>
         <div class="mui-textfield mui-textfield--float-label">
            <input type="password" id="password" required minlength="5" maxlength="256" autocomplete>
            <label for="password">Password</label>
         </div>
         <button id="signin" type="submit" class="mui-btn mui-btn--raised mui-btn--danger">Sing-In</button>
         <button id="signin" type="submit" class="mui-btn mui-btn--raised mui-btn--primary">Sing-Up</button>
      </form>
   `;
}

export function authWithEmailAndPassword(email, password) {
   const apiKey = 'AIzaSyCX9__iTxeFwqp8pp9cgm9tTaI86bcoqv4';
   return fetch(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${apiKey}`, {
      method: 'POST',
      body: JSON.stringify({email, password, returnSecureToken: true}),
      headers: {
         'Content-Type': 'application/json'
      }
   })
      .then(response => response.json())
      .then(data => data.idToken);
}