<template>
  <div class="login">
    <!-- <img src="../assets/logo_.png" width="300px" /> -->
    <h3>Login to Admin Console</h3>
    <br>
    <div class="form-style">
      <input type="text" v-model="email" placeholder="Email address" class="input" required />
      <br />
      <input type="password" @keyup.enter="login" v-model="password" placeholder="Password" class="input" required />
      <br />
      <button v-on:click="login" class="button">Login</button>
      <p>
        <router-link to="/">Not an Admin? Head back to the landing page.</router-link>
      </p>
    </div>
  </div>
</template>

<script>
import firebase from 'firebase'
export default {
  name: 'Login',
  data: function () {
    return {
      email: '',
      password: ''
    }
  },
  methods: {
    login () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(user => {
          this.$router.replace('/console')
        })
        .catch(err => {
          alert(err.message)
        })
    }
  }
}
</script>

<style scoped>
.login {
  margin-top: 40px;
}
input {
  align-self: center;
  margin: 5px 0;
  width: auto;
  padding: 10px;
}
button {
  margin: 10px 0;
  background-color: #0e8318;
}
a {
  color: black;
  text-decoration: underline;
}
p {
  margin-top: 40px;
  font-size: 13px;
}
h1,
h2 {
  font-weight: normal;
}
.button {
  margin-top: 28px;
  width: 120px;
  height: 32px;
  background: #16a085;
  border: none;
  border-radius: 2px;
  color: #FFF;
  font-weight: 500;
  transition: 0.1s ease;
  cursor: pointer;
}

.button:hover,
.button:focus {
  opacity: 0.8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  transition: 0.1s ease;
}

.form-style input[type="text"],
.form-style input[type="password"]
{
  outline: none;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  background: #fff;
  margin-bottom: 4%;
  border: 1px solid #ccc;
  color: #555;
  align-self: center;
  margin: 5px 0;
  width: auto;
  padding: 10px;
}
.form-style input[type="text"]:focus,
.form-style input[type="password"]:focus
{
  box-shadow: 0 0 5px #43D1AF;
  border: 1px solid #43D1AF;
  color: #555;
  align-self: center;
  margin: 5px 0;
  width: auto;
  padding: 10px;
}
</style>
