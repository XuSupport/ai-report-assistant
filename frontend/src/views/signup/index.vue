<template>
  <div id="layout" class="theme-cyan">
    <div class="authentication">
      <div class="container d-flex flex-column">
        <div class="row align-items-center justify-content-center no-gutters min-vh-100">
          <div class="col-12 col-md-7 col-lg-5 col-xl-4 py-md-11">
            <div class="card border-0 shadow-sm">
              <div class="card-body">
                <h3 class="text-center">Sign up</h3>
                <p class="text-center mb-6">Make it simple, but significant</p>
                <form class="mb-4 mt-5" @submit.prevent="handleSubmit">
                  <div class="input-group mb-2">
                    <input type="text" class="form-control form-control-lg" placeholder="Enter your username" v-model="username" required>
                  </div>
                  <div class="input-group mb-4">
                    <input type="password" class="form-control form-control-lg" placeholder="Enter your password" v-model="password" required>
                  </div>
                  <div class="input-group mb-4">
                    <input type="file" class="form-control form-control-lg" @change="handleFileChange" required>
                  </div>
                  <div class="form-group d-flex justify-content-between">
                    <label class="c_checkbox">
                      <input type="checkbox">
                      <span class="ms-2 todo_name">Remember me</span>
                      <span class="checkmark"></span>
                    </label>
                    <a class="link" href="#">Reset password</a>
                  </div>
                  <div class="text-center mt-5">
                    <button type="submit" class="btn btn-lg btn-primary" title="">Sign up</button>
                  </div>
                </form>
                <p class="text-center mb-0">Already have an account?
                  <a class="link" href="#" @click="handleSignin">Sign in</a>
                </p>
              </div>
            </div>
          </div>
          <div class="signin-img d-none d-lg-block text-center">
            <img src="../../assets/signin-img-cyan.svg" alt="Sign In Image">
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  name: 'SignUpPage',
  data() {
    return {
      username: '',
      password: '',
      file: null as File | null,
    };
  },
  setup() {
    const router = useRouter();
    const handleSignin = () => {
      router.push({ name: 'signin' });
    };
    return { handleSignin, router };
  },
  methods: {
    handleFileChange(event: Event) {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        this.file = target.files[0];
      }
    },
    async handleSubmit() {
      if (!this.username || !this.password || !this.file) {
        alert('Please fill in all fields.');
        return;
      }

      const formData = new FormData();
      formData.append('username', this.username);
      formData.append('password', this.password);
      formData.append('image', this.file);

      try {
        const response = await axios.post('http://127.0.0.1:3000/api/regUser', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        alert(response.data.message);
        if (response.data.status === 0) {
          this.router.push({ name: 'signin' });
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          alert('Error: ' + error.response.data.message);
        } else {
          alert('An unexpected error occurred.');
        }
      }
    },
  },
});
</script>

<style scoped>
@media (min-width: 1024px) {
  .about {
    min-height: 100vh;
    display: flex;
    align-items: center;
  }
}
</style>



<!--<script setup lang='ts'>-->
<!--import { useRoute, useRouter } from 'vue-router'-->
<!--import { ref } from 'vue'-->

<!--const firstname = ref<string>('')-->
<!--const lastname = ref<string>('')-->
<!--const email = ref<string>('')-->

<!--const router = useRouter();-->

<!--function handleSignin() {-->
<!--  router.push({ name:"signin" })-->
<!--}-->

<!--function handleRegistration() {-->

<!--  if (!firstname || firstname.value.trim() === '')-->
<!--    return-->

<!--  if (!lastname || lastname.value.trim() === '')-->
<!--    return-->

<!--  if (!email || email.value.trim() === '')-->
<!--    return-->

<!--  console.log(firstname.value, lastname.value, email.value)-->

<!--  let data = {-->
<!--    "firstname": firstname.value.trim(),-->
<!--    "lastname": lastname.value.trim(),-->
<!--    "email": email.value.trim()-->
<!--  }-->

<!--  fetch('http://api.uniconnector.com/portal/environments/DEFAULT/users/registration', {-->
<!--    method: 'POST',-->
<!--    headers: {-->
<!--      'Content-Type': 'application/json'-->
<!--    },-->
<!--    body: JSON.stringify(data),-->
<!--  })-->
<!--	.then(response => response.text())-->
<!--	.catch(error => console.error('Error:', error))-->
<!--	.then(function (response) {-->
<!--    router.push({ name:"chat" })-->
<!--  })-->
<!--}-->
<!--</script>-->
<!--<template>-->
<!--    <div id="layout" class="theme-cyan">-->
<!--      <div class="authentication">-->
<!--        <div class="container d-flex flex-column">-->
<!--          <div class="row align-items-center justify-content-center no-gutters min-vh-100">-->
<!--            <div class="col-12 col-md-7 col-lg-5 col-xl-4 py-md-11">-->
<!--              <div class="card border-0 shadow-sm">-->
<!--                <div class="card-body">-->
<!--                  <h3 class="text-center">Sign up</h3>-->
<!--                  <p class="text-center mb-6">Create your free Account</p>-->
<!--                  <form class="mb-4 mt-5">-->
<!--                    <div class="input-group mb-2">-->
<!--                      <input type="text" class="form-control form-control-lg" v-model="firstname" placeholder="Enter your firstname"></div>-->
<!--                    <div class="input-group mb-2">-->
<!--                      <input type="text" class="form-control form-control-lg" v-model="lastname" placeholder="Enter your lastname"></div>-->
<!--                    <div class="input-group mb-4">-->
<!--                      <input type="email" class="form-control form-control-lg" v-model="email" placeholder="Enter your email"></div>-->
<!--                    <div class="text-center mt-5">-->
<!--                      <a href="#" class="btn btn-lg btn-primary" @click="handleRegistration" title="">Sign up</a></div>-->
<!--                  </form>-->
<!--                  <p class="text-center mb-0">Already have an account?-->
<!--                    <a class="link" href="#" onclick="handleSignin()">Sign in</a>.</p>-->
<!--                  <div class="mt-4 d-grid gap-2">-->
<!--                    <button type="button" class="btn btn-block btn-outline-google">Signup with Google</button>-->
<!--                    <button type="button" class="btn btn-block btn-outline-facebook">Signup with Facebook</button></div>-->
<!--                </div>-->
<!--              </div>-->
<!--            </div>-->
<!--            <div class="signin-img d-none d-lg-block text-center">-->
<!--              <img src="../../assets/signin-img-cyan.svg" alt="Sign In Image"></div>-->
<!--          </div>-->
<!--        </div>-->
<!--      </div>-->
<!--    </div>-->
<!--</template>-->
<!-- -->