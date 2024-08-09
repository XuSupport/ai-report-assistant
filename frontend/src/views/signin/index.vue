<template>
  <transition name="cube-flip">
    <div v-if="isVisible" id="layout" class="theme-cyan">
      <div class="authentication">
        <div class="container d-flex flex-column">
          <div class="row align-items-center justify-content-center no-gutters min-vh-100">
            <div class="col-12 col-md-7 col-lg-5 col-xl-4 py-md-11">
              <div class="card border-0 shadow-sm">
                <div class="card-body">
                  <h3 class="text-center">登 录</h3>
                  <p class="text-center mb-6">简约而不简单</p>
                  <form class="mb-4 mt-5" @submit.prevent="handleLogin">
                    <div class="input-group mb-2">
                      <input type="text" class="form-control form-control-lg" v-model="username" placeholder="输入您的账号" required>
                    </div>
                    <div class="input-group mb-4">
                      <input type="password" class="form-control form-control-lg" v-model="password" placeholder="输入您的密码" required>
                    </div>
                    <div class="form-group d-flex justify-content-between">
                      <label class="c_checkbox">
                        <input type="checkbox">
                        <span class="ms-2 todo_name">记住我</span>
                        <span class="checkmark"></span>
                      </label>
                      <a class="link" href="#">重置密码</a>
                    </div>
                    <div class="text-center mt-5">
                      <button type="submit" class="btn btn-lg btn-primary" title="">登 录</button>
                    </div>
                  </form>
                  <p class="text-center mb-0">还没有账户？
                    <a class="link" href="#" @click="handleRegistration">注册</a>.
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
  </transition>
</template>

<script setup lang='ts'>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

const isVisible = ref(true);
const username = ref<string>('');
const password = ref<string>('');

const router = useRouter();
const userImage = ref<string>('');
async function handleLogin() {
  if (!username.value || username.value.trim() === '') return;
  if (!password.value || password.value.trim() === '') return;

  try {
    const response = await axios.post('http://127.0.0.1:3000/api/login', {
      username: username.value.trim(),
      password: password.value.trim(),
    });

    if (response.data.status === 0) {
      console.log('登录成功:', response.data);
      const chatId = 1722947388608;
      userImage.value = response.data.userImage;
      window.localStorage.setItem("userImage", `http://127.0.0.1:3000${response.data.userImage}`);
      console.log('userImage:', response.data.userImage);
      alert(response.data.message);
      router.push({ name: 'Chat', params: { uuid: chatId } });
    } else {
      alert('“登录失败”: ' + response.data.message);
    }
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      alert('Error: ' + error.response.data.message);
    } else {
      alert('发生了意外错误。');
    }
    console.error('“登录时出错”:', error);
  }
}

function handleRegistration() {
  isVisible.value = false;
  setTimeout(() => {
    router.push({ name: "signup" });
  }, 300);
}
</script>

<style scoped>
/* 立方体切换效果 */
.cube-flip-enter-active, .cube-flip-leave-active {
  transition: transform 0.6s ease-in-out, opacity 0.6s ease-in-out;
}

.cube-flip-enter, .cube-flip-leave-to {
  transform: rotateY(90deg);
  opacity: 0;
}

.cube-flip-enter-to {
  transform: rotateY(0deg);
  opacity: 1;
}
</style>
