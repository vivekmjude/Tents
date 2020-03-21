<template>
  <div class="hello">
    <br><br>
    <div id="clock">
      <b>
        {{time}} | {{date}}
      </b>
    </div>
    <br>
    <h3>{{ msg }}</h3>
    <br>
    <label>Tenants:</label>
    <select v-model="selectedTenantId">
      <option disabled value="">Please select one</option>
      <option v-for="tenant in tenants" :key="tenant.id" v-bind:value="tenant.id">{{tenant.name}}</option>
   </select>
    <span>Selected: {{ selectedTenantId }}</span>&nbsp;
    <button type="submit" @click="tenantClockIn(selectedTenantId, tenantDb)" class="button" v-if="(selectedTenantId!=null)&&(!clockInLoading)">ClockIn</button>
    <div class="redirect">
      <router-link :to="{ name: 'AdminConsole' }">Admin</router-link>
    </div>
  </div>
</template>

<script>
// import DigitalClock from 'vue-digital-clock'
// import firebase from 'firebase'
import NProgress from 'nprogress'
import { db } from '../main'
export default {
  name: 'LandingPage',
  // components: { DigitalClock },
  data () {
    return {
      msg: 'Welcome Tenant!',
      date: '',
      time: '',
      selectedTenantId: null,
      tenants: [],
      tenantDb: db.collection('Tenant'),
      clockInLoading: false // hides clockin button if true
    }
  },
  firestore () {
    return {
      tenants: db.collection('Tenant')
    }
  },
  methods: {
    clock () {
      var self = this
      var week = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday']
      var cd = new Date()
      if (cd.getSeconds() % 2 === 0) {
        this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2)
      } else {
        this.time = this.zeroPadding(cd.getHours(), 2) + ' ' + this.zeroPadding(cd.getMinutes(), 2) + ' ' + this.zeroPadding(cd.getSeconds(), 2)
      }
      this.date = this.zeroPadding(cd.getDate(), 2) + '-' + this.zeroPadding(cd.getMonth() + 1, 2) + '-' + this.zeroPadding(cd.getFullYear(), 4) + ' | ' + week[cd.getDay()]
      setInterval(self.clock, 1000)
    },
    zeroPadding (num, digit) {
      var zero = ''
      for (var i = 0; i < digit; i++) {
        zero += '0'
      }
      return (zero + num).slice(-digit)
    },
    tenantClockIn (tenantId, tenantDb) {
      NProgress.start()
      this.clockInLoading = true
      const clockInTime = new Date()
      const date = this.zeroPadding(clockInTime.getDate(), 2) + '-' + this.zeroPadding(clockInTime.getMonth() + 1, 2) + '-' + this.zeroPadding(clockInTime.getFullYear(), 4)
      const checkOutTime = null
      var tenantName = null
      var tenantRoom = null
      tenantDb.doc(tenantId).get()
        .then((snapshot) => {
          // Assign values
          tenantName = snapshot.data().name
          tenantRoom = snapshot.data().room
          console.log('Tenant Details Collected')
        }).then(() => {
          console.log('Looking for Duplicate')
          db.collection('TenantClockInRecord')
            .where('tenantId', '==', tenantId)
            .where('date', '==', date)
            .limit(1).get().then((snapshot) => {
              console.log(snapshot)
              console.log(snapshot.docs[0].exists)
              if (!snapshot.exists) {
                if (snapshot.docs[0].data().checkOutTime == null) { // if there's a clockin entry on the same date without a clockout
                  db.collection('TenantClockInRecord').doc(snapshot.docs[0].ref.id).delete().then(() => {
                    console.log(snapshot.docs[0].data().checkOutTime == null)
                    console.log(snapshot.docs[0].data().date, date, snapshot.docs[0].data().tenantId, tenantId)
                    window.alert('Duplicate ClockIn Detected and Deleted')
                  })
                }
              } else console.log('No ClockIn entries for today')
            })
        }).then(() => {
          db.collection('TenantClockInRecord')
            .add({ tenantId, tenantName, tenantRoom, date, clockInTime, checkOutTime })
            .then(() => {
              console.log('Tenant Checked In')
              window.alert('Tenant Checked In')
              this.selectedTenantId = null
              this.clockInLoading = false
              NProgress.done() // Loader end
            }).catch((err) => {
              console.error(err)
            })
        }
        )
    }
  },
  mounted: function () {
    this.clock()
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
  position: absolute;
  top: 0;
  right: 0;
}
#clock {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
}
/* .clock {
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  text-align: center;
  font-family: "Helvetica";
} */

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
</style>
