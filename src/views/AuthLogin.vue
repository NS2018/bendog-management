<template>
  <div class="col-md-5 col-sm-12 mx-auto">
    <div class="card pt-4">
      <div class="card-body">
        <div class="text-center mb-5">
          <img src="../assets/images/favicon.svg" height="48" class="mb-4" />
          <h3>Sign In</h3>
          <p>Please sign in to continue to Voler.</p>
        </div>
        <form action="index.html" @submit.prevent="handleLogin">
          <div class="form-group position-relative has-icon-left">
            <label for="username">Username</label>
            <div class="position-relative">
              <input type="text" 
                      class="form-control" 
                      id="username" 
                      v-model="form.username"
                      required/>
              <div class="form-control-icon">
                <i data-feather="user"></i>
              </div>
            </div>
          </div>
          <div class="form-group position-relative has-icon-left">
            <div class="clearfix">
              <label for="password">Password</label>
              <router-link to="/auth/forget-password"><small>Forgot password?</small></router-link>
            </div>
            <div class="position-relative">
              <input type="text" 
                      class="form-control" 
                      id="password" 
                      v-model="form.password" 
                      required/>
              <div class="form-control-icon">
                <i data-feather="lock"></i>
              </div>
            </div>
          </div>

          <div class="form-check clearfix my-4">
            <div class="checkbox float-left">
              <input type="checkbox" 
              id="checkbox1" 
              class="form-check-input" 
              v-model="form.remember"/>
              <label for="checkbox1">Remember me</label>
            </div>
            <div class="float-right">
              <!-- <a href="auth-register.html">Don't have an account?</a> -->
              <router-link to="/auth/register">Don't have an account?</router-link>
            </div>
          </div>
          <div class="clearfix">
            <button class="btn btn-primary float-right" type="submit" :disabled="loading">
              {{loading ? 'Signing in...' : 'Submit'}}
            </button>
          </div>
        </form>
        <div class="divider">
          <div class="divider-text">OR</div>
        </div>
        <div class="row">
          <div class="col-sm-6">
            <button class="btn btn-block mb-2 btn-primary">
              <i data-feather="facebook"></i> Facebook
            </button>
          </div>
          <div class="col-sm-6">
            <button class="btn btn-block mb-2 btn-secondary">
              <i data-feather="github"></i> Github
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import request from '../utils/request'

export default {
  name: "AuthLogin",
  data(){
    return {
      form:{
        username:'',
        password:'',
        remember: false
      },
      loading:false
    }
  },
  methods:{
    async handleLogin(){
      this.loading = true;

      if(!this.form.username || !this.form.password){
        alert('Please enter both username and password.');
        this.loading = false;
        return;
      }

      try{
        const response = await request.post('/login',{
          username:this.form.username,
          password:this.form.password,
          remember:this.form.remember
        });
        const {data,code,msg} = response.data;
        if(code === 200){
          // localStorage.setItem('token',data);
          this.$store.dispatch('auth/login',{'token':data,'user':''})
          //跳转逻辑 跳转到指定路径
          const redirect = this.$route.query.redirect || '/404';
          this.$router.push({path:redirect});
        }else{
          alert(msg)
        }
      }catch(error){
        console.log(error);
        let message = 'Login failed. Please check your credentials.';
        if (error.response) {
          // 后端返回了错误状态（如 401、400）
          message = error.response.data?.message || message;
        } else if (error.request) {
          // 网络错误（无响应）
          message = 'Network error. Please check your connection.';
        }
        alert(message);
      }finally{
        this.loading = false;
      }
    }
  }
};
</script>

<style>
</style>