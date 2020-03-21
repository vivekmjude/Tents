<template>
  <div class="hello">
    <br><br>
    <h3>{{ msg }}</h3>
    <br>
    <b-card no-body>
      <b-tabs pills card content-class="mt-3" align="left">
        <div class="redirect">
          <router-link to="/login">
            <a v-on:click="logout" class="redirect">Logout</a>
          </router-link>
        </div>
        <b-tab title="All Tenants" active>
          <article class="tenants" v-for="(tenant, id) in tenants" :key="id">
            <p >{{ tenant.name }}&nbsp;&nbsp;
              <button class="deleteButton" @click="deleteTenant(tenant.id)">
                Delete
              </button>
              &nbsp;
              <button class="deleteButton" @click="viewTenant(tenant.id)">
                View
              </button>
            </p>
          </article>
          <div class="form-style">
            <form @submit="saveTenant(name, ins, addr, dob, mob, guardMob, email, room)">
              <h4>Tenant Details</h4>
              <input v-model="name" type="text" placeholder="Name *" class="input" required/>
              <input v-model="ins" type="text" placeholder="Institution" class="input" />
              <input v-model="addr" type="text" placeholder="Home Address" class="input" />
              <!-- <label>DOB</label> -->
              <input v-model="dob" type="date" placeholder="DOB" class="input">
              <input v-model="mob" placeholder="Mobile *" type="number" class="input" required/>
              <input v-model="guardMob" type="number" placeholder="Mobile of Guardian" class="input" />
              <input v-model="email" type="text" placeholder="Email" class="input" />
              <input v-model="room" type="text" placeholder="Allotted Room Number" class="input" />
              <button type="submit" class="button" v-if="id">Update Tenant</button>
              <button type="submit" class="button" v-else>Add New Tenant</button>
            </form>
            <br>
            <button type="submit" @click="clear()" class="button" v-if="id">Back</button>
          </div>
        </b-tab>
        <b-tab title="In Tenants"><p>I'm the second tab</p></b-tab>
        <b-tab title="Out Tenants"><p>I'm the tab with the very, very long title</p></b-tab>
    </b-tabs>
  </b-card>
  </div>
</template>

<script>
import firebase from 'firebase'
import { db } from '../main'
import { BTabs, CardPlugin } from 'bootstrap-vue'

// Use v-calendar & v-date-picker components
export default {
  name: 'AdminConsole',
  components: {
    'b-tabs': BTabs,
    'b-cards': CardPlugin
  },
  data () {
    return {
      tenants: [],
      msg: 'Welcome Admin!',
      name: null,
      ins: null,
      addr: null,
      dob: null,
      mob: null,
      guardMob: null,
      email: null,
      room: null,
      id: null
    }
  },
  firestore () {
    return {
      tenants: db.collection('Tenant')
    }
  },
  methods: {
    logout () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace('login')
        })
    },
    saveTenant (name, ins, addr, dob, mob, guardMob, email, room) {
      // if id has a value, then an update is in progress
      // id is null -> adding new tenant, else updating an existing
      const createdOn = new Date()
      const lastUpdatedOn = new Date()
      if (this.id == null) {
        db.collection('Tenant')
          .add({ name, ins, addr, dob, mob, guardMob, email, room, createdOn, lastUpdatedOn })
          .then(() => {
            console.log('Tenant Added')
            window.alert('Tenant Added')
          })
      } else {
        db.collection('Tenant').doc(this.id).update(
          {
            name, ins, addr, dob, mob, guardMob, email, room, lastUpdatedOn
          }
        ).then(() => {
          window.alert('Tenant Updated')
          this.id = null
        })
      }
      // Clear values
      this.name = null
      this.ins = null
      this.addr = null
      this.dob = null
      this.mob = null
      this.guardMob = null
      this.email = null
      this.room = null
    },
    viewTenant (id) {
      // const lastUpdatedOn = new Date()
      db.collection('Tenant')
        .doc(id).get()
        .then((snapshot) => {
          // Assign values
          this.name = snapshot.data().name
          this.ins = snapshot.data().ins
          this.addr = snapshot.data().addr
          this.dob = snapshot.data().dob
          this.mob = snapshot.data().mob
          this.guardMob = snapshot.data().guardMob
          this.email = snapshot.data().email
          this.room = snapshot.data().room
          this.id = id
          window.alert('Populated Tenant Details')
        })
    },
    deleteTenant (id) {
      var name = ''
      db.collection('Tenant').doc(id).get().then((snapshot) => {
        name = snapshot.data().name
        if (confirm('Are you sure you want to delete the tenant ' + name + ' from the database?')) {
          db.collection('Tenant')
            .doc(id)
            .delete()
        }
      })
    },
    clear () {
      this.name = null
      this.ins = null
      this.addr = null
      this.dob = null
      this.mob = null
      this.guardMob = null
      this.email = null
      this.room = null
      this.id = null
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h1,
h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.redirect {
  position: fixed;
  top: 0;
  right: 0;
}

.deleteButton:hover,
button[type="submit"]:focus {
  opacity: 0.8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  transition: 0.1s ease;
}

.deleteButton {
  width: 60px;
  height: 25px;
  background: #16a085;
  border: none;
  border-radius: 2px;
  color: #FFF;
  font-weight: 50;
  transition: 0.1s ease;
  cursor: pointer;
}

.deleteButton:hover,
.deleteButton:focus {
  opacity: 0.8;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.4);
  transition: 0.1s ease;
}

.form-style {
  max-width: 400px;
  margin: 10px auto;
  padding: 16px;
  background: #F7F7F7;
}
.form-style h1{
  background: #43D1AF;
  padding: 20px 0;
  font-size: 140%;
  font-weight: 300;
  text-align: center;
  color: #fff;
  margin: -16px -16px 16px -16px;
}
.form-style input[type="text"],
.form-style input[type="date"],
.form-style input[type="datetime"],
.form-style input[type="email"],
.form-style input[type="number"],
.form-style input[type="search"],
.form-style input[type="time"],
.form-style input[type="url"],
.form-style textarea,
.form-style select
{
  outline: none;
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  width: 100%;
  background: #fff;
  margin-bottom: 4%;
  border: 1px solid #ccc;
  padding: 3%;
  color: #555;
  /* font: 95% Arial, Helvetica, sans-serif; */
}
.form-style input[type="text"]:focus,
.form-style input[type="date"]:focus,
.form-style input[type="datetime"]:focus,
.form-style input[type="email"]:focus,
.form-style input[type="number"]:focus,
.form-style input[type="search"]:focus,
.form-style input[type="time"]:focus,
.form-style input[type="url"]:focus,
.form-style textarea:focus,
.form-style select:focus
{
  box-shadow: 0 0 5px #43D1AF;
  padding: 3%;
  border: 1px solid #43D1AF;
}

.form-style input[type="submit"],
.form-style input[type="button"],
.form-style button[type="submit"]{
  box-sizing: border-box;
  -webkit-box-sizing: border-box;
  -moz-box-sizing: border-box;
  width: 100%;
  padding: 3%;
  background: #16a085;
  border-bottom: 2px solid #30C29E;
  border-top-style: none;
  border-right-style: none;
  border-left-style: none;
  color: #fff;
}
.form-style input[type="submit"]:hover,
.form-style input[type="button"]:hover,
.form-style button[type="submit"]:hover {
  background: #2EBC99;
}
</style>
