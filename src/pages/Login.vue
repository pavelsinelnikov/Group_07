<template>
  <div class="wrapper">
    <b-form class="form-signin" @submit="onSubmit" v-if="show">
      <h2 class="form-signin-heading">Login</h2>
      <b-form-group id="input-group-1">
        <b-form-input
          class="form-signin"
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
        <b-form-input
          class="form-signin"
          id="input-2"
          v-model="form.password"
          required
          type="password"
          placeholder="Enter password"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4">
        <b-form-checkbox-group v-model="form.checked" id="checkboxes-4">
          <b-form-checkbox value="me">Remember Me</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
      <b-button
        class="btn btn-lg btn-primary btn-block"
        type="submit"
        variant="primary"
        >Submit</b-button
      >
      <h3 class="form-signup">
        Dont have an account?<a href="/signup">Sign up!</a>
      </h3>
    </b-form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      form: {
        email: '',
        password: '',
        checked: []
      },
      show: true
    };
  },
  methods: {
    async onSubmit(evt) {
      evt.preventDefault();
      axios({
        method: 'post',
        url: 'http://localhost:3000/user/auth',
        data: {
          username: this.form.email,
          password: this.form.password
        }
      })
        .then(res => {
          if (res.data) {
            this.$session.start();
            this.$session.set('user', this.form.email);
            this.$router.push('/');
            this.$router.go();
          } else {
            // Should return inside the page (displayed as an error message)
            console.log(res);
          }
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>

<style>
body {
  background: #eee !important;
}

.wrapper {
  margin-top: 80px;
  margin-bottom: 80px;
}

.form-signin {
  max-width: 380px;
  padding: 15px 35px 45px;
  margin: 0 auto;
  background-color: #fff;
  border: 1px solid rgba(0, 0, 0, 0.1);
}
.form-signup {
  font-size: 16px;
  padding-top: 30px;
}
.form-signin-heading,
#checkboxes-4 {
  padding-bottom: 10px;
}

.form-control {
  position: relative;
  font-size: 16px;
  height: auto;
  padding: 10px;
}

input[type='email'] {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

input[type='password'] {
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
