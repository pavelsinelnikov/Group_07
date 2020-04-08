<template>
  <div class="wrapper">
    <b-form class="form-signin" @submit="onSubmit" v-if="show">
      <h2 class="form-signin-heading">Sign Up</h2>
      <b-alert v-model="showError" variant="danger" dismissible>{{ errorMsg }}</b-alert>
      <b-form-group id="input-group-1">
        <b-form-input
          class="form-signin"
          id="input-1"
          v-model="form.name"
          type="text"
          required
          placeholder="Enter name"
        ></b-form-input>
        <b-form-input
          class="form-signin"
          id="input-1"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
        <b-form-select v-model="form.country">
          <option disabled value>Select Country</option>
          <option>Argentina</option>
          <option>Austria</option>
          <option>Australia</option>
          <option>Belgium</option>
          <option>Bulgaria</option>
          <option>Brazil</option>
          <option>Canada</option>
          <option>Switzerland</option>
          <option>China</option>
          <option>Colombia</option>
          <option>Cuba</option>
          <option>Czech Republic</option>
          <option>Denmark</option>
          <option>Egypt</option>
          <option>France</option>
          <option>United Kingdom</option>
          <option>Greece</option>
          <option>Hong Kong</option>
          <option>Hungary</option>
          <option>Indonesia</option>
          <option>Israel</option>
          <option>India</option>
          <option>Italy</option>
          <option>Japan</option>
          <option>South Korea</option>
          <option>Lithuania</option>
          <option>Latvia</option>
          <option>Morocco</option>
          <option>Mexico</option>
          <option>Malaysia</option>
          <option>Nigeria</option>
          <option>Netherlands</option>
          <option>Norway</option>
          <option>New Zealand</option>
          <option>United States</option>
        </b-form-select>
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
          <b-form-checkbox value="me">Receive news alerts and updates</b-form-checkbox>
        </b-form-checkbox-group>
      </b-form-group>
      <b-button class="btn btn-lg btn-primary btn-block" type="submit" variant="primary">Submit</b-button>
    </b-form>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      form: {
        name: "",
        country: "",
        email: "",
        password: "",
        checked: []
      },
      show: true,
      errorMsg: "",
      showError: false
    };
  },
  methods: {
    onSubmit(evt) {
      evt.preventDefault();
      axios({
        method: "post",
        url: "http://localhost:3000/users",
        data: {
          username: this.form.name,
          email: this.form.email,
          country: this.form.country,
          password: this.form.password
        }
      })
        .then(res => {
          if (res.data === true) {
            this.$router.push("/login");
            this.$router.go();
          } else {
            this.errorMsg = res.data;
            this.showError = true;
          }
        })
        .catch(err => {
          this.errorMsg = err;
          this.showError = true;
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

.form-signin-heading,
.checkbox {
  margin-bottom: 30px;
}

.form-control {
  position: relative;
  font-size: 16px;
  height: auto;
  padding: 10px;
}

input[type="email"] {
  border-bottom-left-radius: 0;
  border-bottom-right-radius: 0;
}

input[type="password"] {
  margin-bottom: 20px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
