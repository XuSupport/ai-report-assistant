<template>
  <transition name="cube-flip">
    <div v-if="isVisible" id="layout" class="theme-cyan">
      <div class="authentication">
        <div class="container d-flex flex-column">
          <div class="row align-items-center justify-content-center no-gutters min-vh-100">
            <div class="col-12 col-md-7 col-lg-5 col-xl-4 py-md-11">
              <div class="card border-0 shadow-sm">
                <div class="card-body">
                  <h3 class="text-center">注 册</h3>
                  <p class="text-center mb-6">简约而不简单</p>
                  <form class="mb-4 mt-5" @submit.prevent="handleSubmit">
                    <div class="input-group mb-2">
                      <input type="text" class="form-control form-control-lg" placeholder="输入您的用户名" v-model="username" required>
                    </div>
                    <div class="input-group mb-4">
                      <input type="password" class="form-control form-control-lg" placeholder="输入您的密码" v-model="password" required>
                    </div>
                    <div class="input-group mb-4">
                      <input type="file" class="form-control form-control-lg" @change="handleFileChange" required>
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
                      <button type="submit" class="btn btn-lg btn-primary" title="">注  册</button>
                    </div>
                  </form>
                  <p class="text-center mb-0">已经有一个账户?
                    <a class="link" href="#" @click="handleSignin">登 录</a>
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

<script lang="ts">
import { defineComponent, ref } from 'vue';
import { useRouter } from 'vue-router';
import axios from 'axios';

export default defineComponent({
  name: 'SignUpPage',
  setup() {
    const isVisible = ref(true);
    const username = ref('');
    const password = ref('');
    const file = ref<File | null>(null);
    const router = useRouter();

    const handleFileChange = (event: Event) => {
      const target = event.target as HTMLInputElement;
      if (target.files && target.files.length > 0) {
        file.value = target.files[0];
      }
    };

    const handleSubmit = async () => {
      if (!username.value || !password.value || !file.value) {
        alert('请填写所有字段。');
        return;
      }

      const formData = new FormData();
      formData.append('username', username.value);
      formData.append('password', password.value);
      formData.append('image', file.value);

      try {
        const response = await axios.post('http://127.0.0.1:3000/api/regUser', formData, {
          headers: {
            'Content-Type': 'multipart/form-data'
          }
        });
        alert(response.data.message);
        if (response.data.status === 0) {
          isVisible.value = false;
          setTimeout(() => {
            router.push({ name: 'signin' });
          }, 300);
        }
      } catch (error) {
        if (axios.isAxiosError(error) && error.response) {
          alert('Error: ' + error.response.data.message);
        } else {
          alert('发生了意外错误。');
        }
      }
    };

    const handleSignin = () => {
      isVisible.value = false;
      setTimeout(() => {
        router.push({ name: 'signin' });
      }, 300);
    };

    return { username, password, file, handleFileChange, handleSubmit, handleSignin, isVisible };
  },
});
</script>

<style scoped>
/* 立方体切换效果 */
.cube-flip-enter-active, .cube-flip-leave-active {
  transition: transform 0.6s ease-in-out, opacity 0.6s ease-in-out;
  transform-style: preserve-3d;
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
