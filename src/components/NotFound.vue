<template>
  <div class="not-found">
    <h3>Wuh!?</h3>
    <p>Looks like you are lost.</p>
    <router-link to="/"><button class="button">Go Back Home</button></router-link>
  </div>
</template>

<script>
export default {
  name: 'login',
  data: function () {
    return {}
  },
  methods: {
    notFound () {
      this.$router.replace('/login')
    }
  }
}
</script>

<style scoped>
.not-found {
  margin-top: 40px;
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
p {
  margin-top: 40px;
  font-size: 13px;
}
h3 {
  font-weight: normal;
}
</style>
