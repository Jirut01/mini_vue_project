<template>
  <v-app>
    <v-main>
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import axios from 'axios'
export default {
  name: 'App',

  data: () => ({
    //
  }),
  methods:{
    async verdifyuser() {
     await axios.post("http://localhost:3000/users/welcome",{},{
        headers:{
          auth: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiNjQyNDNiZGIwZTAyZWM0ZWQ0MmZjNzI3IiwidXNlcm5hbWUiOiJianJzY2giLCJpYXQiOjE2ODAxMTE4NzQsImV4cCI6MTY4MDExOTA3NH0.zld3K-aanCigqBi0uC4mDas2RyiAixnfmBG-xz3AON0"
        }
      }).then((response) => {
        console.log(response);
      }).catch((err) =>{
        console.log(err);
        this.$router.push('/login')
      })
    },
  },
   created() {
    this.verdifyuser();
  },
}
</script>
