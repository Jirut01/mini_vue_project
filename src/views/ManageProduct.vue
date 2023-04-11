<template>
  <div>
    <v-container>
      <div class="mt-1"></div>
      <h1 class="subheading grey--text mb-2 text-center">จัดการสินค้า</h1>
      <v-btn color="success" @click="newItemMode()"
        ><v-icon>mdi-plus-box-multiple-outline</v-icon>เพิ่มสินค้า</v-btn
      >
      <v-btn color="orange" class="white--text ml-3" @click="actiontest()"
        ><v-icon>mdi-refresh</v-icon></v-btn
      >
      <br />
      <v-row class="mt-2">
        <v-col cols="4" v-for="(item, index) in apidata.data" :key="index">
          <v-card max-width="350">
            <v-img :src="item.image" height="200px"> </v-img>
            <v-card-title primary-title>
              {{ item.product_name }} {{ format_number(item.amount) }} ชิ้น
            </v-card-title>
            <v-card-subtitle class="text-center">
              <v-row>
                <v-col cols="md4 sm12"> ราคา {{ item.price }} บาท </v-col>
                <v-col cols="md4 sm12">
                  <v-btn
                    color="teal lighten-2 white--text"
                    @click="editMode(item)"
                    ><v-icon>mdi-pencil</v-icon>แก้ไข</v-btn
                  >
                </v-col>
                <v-col cols="md4 sm12">
                  <v-btn @click="selectDelete(item)" color="error white--text"
                    ><b><v-icon>mdi-delete</v-icon>ลบ</b></v-btn
                  >
                </v-col>
              </v-row>
            </v-card-subtitle>
          </v-card>
        </v-col>

        <v-col cols="12"> </v-col>
      </v-row>
      <v-dialog persistent v-model="dialogedit" max-width="500">
        <v-card>
          <v-card-title> {{ savemode }} </v-card-title>
          <v-card-text>
            <v-row>
              <v-col cols="6">
                <v-text-field
                  name="product_id"
                  label="Product ID"
                  id="product_id"
                  require
                  v-model="postdata.product_id"
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  name="product_name"
                  label="Product Name"
                  id="product_name"
                  v-model="postdata.product_name"
                >
                </v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-text-field
                  name="description"
                  label="Description"
                  id="description"
                  v-model="postdata.description"
                >
                </v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="6">
                <v-text-field
                  name="price"
                  label="Price"
                  id="price"
                  type="number"
                  v-model="postdata.price"
                >
                </v-text-field>
              </v-col>
              <v-col cols="6">
                <v-text-field
                  name="amount"
                  label="Amount"
                  id="amount"
                  type="number"
                  v-model="postdata.amount"
                >
                </v-text-field>
              </v-col>
            </v-row>

            <v-row>
              <v-col cols="12">
                <v-text-field
                  name="image"
                  label="Image Url"
                  id="image"
                  v-model="postdata.image"
                >
                </v-text-field>
              </v-col>
            </v-row>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="error" @click="dialogedit = false"
                >Cancel</v-btn
              >
              <v-btn text color="success" @click="selectSave()">Save</v-btn>
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-dialog>

      <v-dialog persistent v-model="dialogDelete" max-width="500">
        <v-card>
          <v-card-title>ลบข้อมูล</v-card-title>
          <v-card-text>
            <v-card-title class="text-h6">
              ต้องการลบข้อมูลใช่หรือไม่ ?
            </v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text color="error" @click="dialogDelete = false"
                >ยกเลิก</v-btn
              >
              <v-btn text color="success" @click="deleteItem(datadelete)"
                >ตกลง</v-btn
              >
            </v-card-actions>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-container>
  </div>
</template>
<script>
export default {
  data() {
    return {
      id: "",
      apidata: [],
      dialogedit: false,
      yesdelect: "",
      datadelete: "",
      dialogDelete: false,
      postdata: {
        product_id: "",
        product_name: "",
        description: "",
        price: "",
        amount: "",
        image: "",
      },
      postdataDefalut: {
        product_id: "",
        product_name: "",
        description: "",
        price: "",
        amount: "",
        image: "",
      },
    };
  },
  computed: {
    //ประมวณผลแบบเรียลทาม //
    savemode() {
      return this.id === "" ? "เพิ่มข้อมูล" : "แก้ไขข้อมูล";
    },
  },
  created() {
    this.getData();
  },
  methods: {
    selectSave() {
      if (this.savemode === "แก้ไขข้อมูล") {
        this.putData();
      } else {
        this.postData();
      }
    },
    selectDelete(item) {
      this.dialogDelete = true;
      this.datadelete = item;
    },
    getData() {
      var token = this.getToken();
      this.axios
        .get("http://localhost:3000/products", {
          headers: {
            auth: token,
          },
        })
        .then((response) => {
          this.apidata = response.data;
        })
        .catch((err) => {
          // this.$router.push("/stock");
        });
    },
    async postData() {
      try {
        var token = this.getToken();
        if (
          this.postdata.product_id == "" ||
          this.postdata.product_name == "" ||
          this.postdata.price == "" ||
          this.postdata.amount == ""
        ) {
          alert("กรุณากรอกข้อมูลให้เครบถ้วน");
          return false;
        }
        const { data } = await this.axios.post(
          "http://localhost:3000/products",
          this.postdata,
          {
            headers: {
              auth: token,
            },
          }
        );
        alert(data.message);
        this.getData();
        this.postdata = { ...this.postdataDefalut };
        this.dialogedit = false;
      } catch (error) {
        console.log(error);
      }
    },
    editMode(item) {
      this.id = item._id;
      this.postdata = { ...item };
      this.dialogedit = true;
    },
    newItemMode() {
      this.id = "";
      this.postdata = { ...this.postdataDefalut };
      this.dialogedit = true;
    },
    async putData() {
      try {
        var token = this.getToken();
        if (
          this.postdata.product_id == "" ||
          this.postdata.product_name == "" ||
          this.postdata.price == "" ||
          this.postdata.amount == ""
        ) {
          alert("กรุณากรอกข้อมูลให้เครบถ้วน");
          return false;
        }
        const { data } = await this.axios.put(
          "http://localhost:3000/products/" + this.id,
          this.postdata,
          {
            headers: {
              auth: token,
            },
          }
        );
        alert(data.message);
        this.getData();
        this.id = "";
        this.postdata = { ...this.postdataDefalut };
        this.dialogedit = false;
      } catch (error) {
        console.log(error);
      }
    },
    deleteItem(item) {
      this.id = item._id;
      try {
        var token = this.getToken();
        this.axios
          .delete("http://localhost:3000/products/" + this.id, {
            headers: {
              auth: token,
            },
          })
          .then((response) => {
            alert(response.data.message);
            this.dialogDelete = false;
            this.getData();
            this.id = "";
          });
      } catch (error) {
        console.log(error);
      }
    },
    format_number(number) {
      const formattedNumber = number.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      return formattedNumber;
    },
    actiontest() {
      // this.$router.push('/')      //redirect
    },
    getToken() {
      var user = JSON.parse(localStorage.getItem("users"));
      return user.token;
    },
  },
};
</script>

<style>
</style>