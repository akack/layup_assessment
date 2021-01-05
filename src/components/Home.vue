<template>
  <div class="container">
    <h4 class="h4">New User</h4>
    <b-form @submit="onSubmit" @reset="onReset" v-if="show">
      <b-form-group id="input-group-1" label="First Name:" label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="form.name"
          required
          placeholder="First name"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-2" label="Last Name:" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.surname"
          required
          placeholder="Last name"
        ></b-form-input>
      </b-form-group>

      <b-form-group
        id="input-group-3"
        label="Email address:"
        label-for="input-3"
      >
        <b-form-input
          id="input-3"
          v-model="form.email"
          type="email"
          required
          placeholder="Enter email"
        ></b-form-input>
      </b-form-group>

      <b-form-group id="input-group-4" label="Address:" label-for="input-4">
        <b-form-input
          id="input-4"
          v-model="form.address"
          type="text"
          required
          placeholder="Address"
        ></b-form-input>
      </b-form-group>

      <b-button type="submit" variant="primary">Submit</b-button>
      <b-button type="reset" variant="danger" class="reset">Reset</b-button>
    </b-form>
    <b-card class="mt-3" header="Users" v-if="!loading">
      <ul class="list-group list-group-flush">
        <li class="list-group-item" v-for="user in users" :key="user._id">
          {{ user.name }} {{ user.surname }} - {{ user.address }}
        </li>
      </ul>
      <p v-if="!users.length">No users available</p>
    </b-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      form: {
        email: "",
        name: "",
        surname: "",
        address: "",
      },
      show: true,
      users: [],
      loading: false,
      index: 0,
      newUser: null,
    };
  },
  methods: {
    fetchData() {
      this.loading = true;
      return fetch("http://localhost:3000/api/getUsers", {
        method: "get",
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            const error = new Error(res.statusText);
            error.json = res.json();
            throw error;
          }
          return res.json();
        })
        .then((json) => {
          this.users = json.data;
          this.loading = false;
        })
        .catch((error) => {
          console.log(error);
        });
    },
    clearForm() {
      this.form.email = "";
      this.form.name = "";
      this.form.surname = "";
      this.form.address = "";
    },
    onSubmit(evt) {
      evt.preventDefault();
      fetch("http://localhost:3000/api/addUser", {
        method: "post",
        body: JSON.stringify(this.form),
        headers: {
          "content-type": "application/json",
        },
      })
        .then((res) => {
          if (!res.ok) {
            const error = new Error(res.statusText);
            error.json = res.json();
            throw error;
          }
          return res.json();
        })
        .then((json) => {
          this.newUser = json.data;
          this.fetchData();
          this.clearForm();
        })
        .catch((error) => {
          this.clearForm();
          console.log(error);
        });
    },
    onReset(evt) {
      evt.preventDefault();
      this.clearForm();
      this.show = false;
      this.$nextTick(() => {
        this.show = true;
      });
    },
  },
  mounted() {
    this.fetchData();
  },
  watch: {
    users() {
      console.log("users updated");
    },
  },
};
</script>

<style>
.h4 {
  margin-bottom: 0.5em;
  color: forestgreen;
  font-weight: bold;
  text-transform: uppercase;
}

.reset {
  margin-left: 0.3em;
}
</style>
