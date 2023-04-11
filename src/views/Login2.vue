<template>
  <v-container fluid fill-height>
    <v-layout align-center justify-center>
      <v-flex xs12 sm8 md4>
        <v-card>
          <v-toolbar flat color="dark" dark>
            <v-toolbar-title>Shop</v-toolbar-title>
          </v-toolbar>
          <v-tabs vertical>
            <v-tab>
              <v-icon left> mdi-account </v-icon>
              Log-In
            </v-tab>
            <v-tab>
              <v-icon left> mdi-account </v-icon>
              Sign-Up
            </v-tab>

            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-alert dense outlined type="error" v-model="error">
                    ชื่อผู้ใช้หรือรหัสผ่านไม่ถูกต้อง
                    <strong>กรุณา</strong> กรอกใหม่
                    <strong>อีกครั้ง</strong>
                  </v-alert>
                  <v-text-field
                    v-model="login.username"
                    label="Username"
                    type="text"
                  ></v-text-field>
                  <v-text-field
                    v-model="login.password"
                    name="password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn type="submit" color="primary" @click="submit()"
                      >Login</v-btn
                    >
                  </v-card-actions>
                </v-card-text>
              </v-card>
            </v-tab-item>
            <v-tab-item>
              <v-card flat>
                <v-card-text>
                  <v-text-field
                    v-model="signup.username"
                    label="Username"
                    type="text"
                  ></v-text-field>
                  <v-row>
                    <v-col cols="6">
                      <v-text-field
                        v-model="signup.first_name"
                        label="FirstName"
                        type="text"
                      ></v-text-field>
                    </v-col>
                    <v-col cols="6">
                      <v-text-field
                        v-model="signup.last_name"
                        label="LastName"
                        type="text"
                      ></v-text-field>
                    </v-col>
                  </v-row>
                  <v-text-field
                    v-model="signup.password"
                    name="password"
                    label="Password"
                    type="password"
                  ></v-text-field>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn type="submit" color="primary" @click="signupsubmit()"
                      >submit</v-btn
                    >
                  </v-card-actions>
                </v-card-text>
              </v-card>
            </v-tab-item>
          </v-tabs>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      error: false,
      login: {
        username: "",
        password: "",
      },
      signup: {
        username: "",
        password: "",
        first_name: "",
        last_name: "",
      },
    };
  },
  methods: {
    async submit() {
      try {
        const data = await this.axios.post(
          "http://localhost:3000/users/login",
          this.login
        );
        delete data.data.password;
        delete data.data.__v;
        localStorage.setItem("users", JSON.stringify(data.data));
        this.$router.push("/");
      } catch (error) {
        this.login.password = "";
        this.error = true;
      }
    },
    check() {
      var user = JSON.parse(localStorage.getItem("users"));
      if (user) {
        this.$router.push("/");
      }
    },
    async signupsubmit() {
      try {
        const data = await this.axios.post(
          "http://localhost:3000/users/register",
          this.signup
        );
        alert(data.statusText)
        location.reload();
        
      } catch (error) {
        alert(error.response.data)
        this.error = true;
      }
    },
  },
};
</script>

<style>
</style>