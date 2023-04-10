<template>
  <v-container>
    <!-- <v-spacer></v-spacer> -->
    <v-row class="d-flex justify-space-between mb-6">
      <h1 class="subheading grey--text">รายการสินค้า</h1>
      <Cart :card="dataCart" :summaryAll="summaryAll"
    /></v-row>

    <!-- เปลี่ยนสีระบุใน class สีคัวอักษรใช้ <สี>--text -->
    <v-row>
      <v-col cols="4" v-for="(item, index) in GetData.data" :key="index">
        <v-card class="mx-auto" max-width="344">
          <v-img :src="item.image" height="200px"></v-img>

          <v-card-title>
            {{ item.product_name }}
          </v-card-title>

          <v-card-subtitle> ราคา {{ item.price }} บาท </v-card-subtitle>

          <v-card-actions>
            <!-- <input value="0" min="0" :id="'count'+index" maxlength="4" size="4" type=number /> -->
            <v-row md12 ms12>
              <v-col cols="md3 sm-12" class="">
                <v-btn
                  color="orange"
                  text
                  @click="dialogpurchaseAction(index, item)"
                >
                  ซื้อสินค้า
                </v-btn>
              </v-col>
              <v-col cols="md3 sm-12">
                <input
                  label="จำนวน"
                  type="number"
                  min="0"
                  value="1"
                  :id="'count' + index"
                  style="
                    width: 50px;
                    height: 30px;
                    border: 1px solid #ccc;
                    border-radius: 4px;
                    box-sizing: border-box;
                    margin: 8px 0;
                    padding: auo;
                  "
                />
              </v-col>
              <v-col cols="md3 sm-12" class="">
                <v-btn color="green" text @click="actionCart(item, index)">
                  หยิบใส่ตะกร้า
                </v-btn>
              </v-col>
            </v-row>

            <!-- <v-spacer></v-spacer> -->

            <!-- <v-btn
        icon
        @click="show = !show"
      >
        <v-icon>{{ show ? 'mdi-chevron-up' : 'mdi-chevron-down' }}</v-icon>
      </v-btn> -->
          </v-card-actions>
        </v-card>
      </v-col>
    </v-row>

    <v-dialog persistent v-model="dialogpurchase" max-width="500">
      <v-card>
        <v-card-title>ยืนยันการสั่งซื้อ</v-card-title>
        <v-card-text>
          <v-card-title class="text-h6">
            ต้องการยืนยันการสั่งซื้อหรือไม่ ?
            <br />
            <p>{{ sumprice_one_text }}</p>
          </v-card-title>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn text color="error" @click="dialogpurchase = false"
              >ยกเลิก</v-btn
            >
            <v-btn text color="success" @click="postData(product_id, amount)"
              >ตกลง</v-btn
            >
          </v-card-actions>
        </v-card-text>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { EventBus } from "@/EventBus";
import Cart from "../components/Cart";
export default {
  data() {
    return {
      cart: 0,
      show: false,
      GetData: [],
      dialogpurchase: false,
      product_id: "",
      dataCart: [],
      amount: 0,
      img: "",
      product_name: "",
      sum: 0,
      price: 0,
      sumprice_one_text: "",
      summaryAll: 0,
      total: 0,
      postdata: {
        total: 0,
        detail: [
          {
            product_id: "",
            amount: 0,
            img: "",
            product_name: "",
            sum: 0,
            price: 0,
          },
        ],
      },
    };
  },
  mounted() {
    EventBus.$on("removeCart", this.removeCart);
    EventBus.$on("updateCart", this.updateCart);
    EventBus.$on("sumAll", this.sumAll);
    EventBus.$on("clearData", this.clearData);
    // EventBus.$on("caldisplaymessage", this.display2);
  },
  created() {
    this.getData();
  },
  methods: {
    addCart() {
      this.cart += 1;
    },
    getData() {
      var token = this.getToken();
      this.axios
        .get("http://localhost:3000/products", { 
            headers:{
              auth: token
            }
        })
        .then((response) => {
          this.GetData = response.data;
        });
    },
    dialogpurchaseAction(i, count) {
      var id = document.getElementById("count" + i);
      var value = id.value;
      var sum = value * count.price;
      if (value == 0 || value < 1) {
        alert("กรุณากำหนดจำนวนสินค้า และกรอกให้ถูกต้อง");
        id.value = 1;
        return false;
      } else {
        if (value > count.amount) {
          alert("สินค้าไม่พอ");
          return false;
        } else {
          this.dialogpurchase = true;
          this.product_id = count.product_id;
          this.sumprice_one_text = `ราคารวม = ${value} X ${count.price} = ${sum} บาท`;
          this.amount = value;

          this.img = count.image;
          this.product_name = count.product_name;
          this.sum = count.price * value;
          this.price = count.price;
          this.total = count.price * value;
        }
      }
    },
    async postData(product_id, amount) {
      var token = this.getToken();
      // console.log(product_id);
      this.postdata.detail[0].product_id = product_id;
      this.postdata.detail[0].amount = Number(amount);

      this.postdata.detail[0].img = this.img;
      this.postdata.detail[0].product_name = this.product_name;
      this.postdata.detail[0].sum = this.sum;
      this.postdata.detail[0].price = this.price;
      this.postdata.total = this.total;

      try {
        const { data } = await this.axios.post(
          "http://localhost:3000/orders",
          this.postdata,{ 
            headers:{
              auth: token
            }
        }
        );
        alert(data.message);
        this.getData();
        this.dialogpurchase = false;
      } catch (error) {
        console.log(error);
      }
    },
    actionCart(item, index) {
      // console.log(item);
      // console.log(this.dataCart);
      var id = document.getElementById("count" + index);
      var value = id.value;
      if (value == 0 || value < 1) {
        alert("กรุณากำหนดจำนวนสินค้า และกรอกให้ถูกต้อง");
        id.value = 1;
        return false;
      } else {
        if (value > item.amount) {
          alert("สินค้าไม่พอ");
          return false;
        }

        const hasObject = this.dataCart.some(
          (obj) => obj.product_id === item.product_id
        );
        if (hasObject) {
          let a = this.dataCart;
          a.forEach((el) => {
            if (el.product_id == item.product_id) {
              var cal = Number(el.amount_sell) + Number(value);
              if (cal > item.amount) {
                alert("สินค้าไม่พอ");
                id.value = 1;
                return false;
              } else {
                el.amount_sell = Number(el.amount_sell) + Number(value);
                el.sumary = Number(el.amount_sell) * el.price;
              }
              alert("ใส่ตะกร้าแล้ว");
              id.value = 1;
            }
          });
        } else {
          let data = this.dataCart;
          data.push({
            product_id: item.product_id,
            product_name: item.product_name,
            id: item._id,
            price: item.price,
            amount: item.amount,
            amount_sell: value,
            img: item.image,
            sumary: item.price * value,
          });

          this.dataCart = data;
          alert("ใส่ตะกร้าแล้ว");
          id.value = 1;
        }
      }
    },
    format_number(number) {
      const formattedNumber = number.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      return formattedNumber;
    },
    removeCart(index) {
      this.dataCart.splice(index, 1);
      this.summaryAll = this.dataCart.reduce(
        (dataCart, obj) => dataCart + obj.sumary,
        0
      );
    },
    updateCart(index, val) {
      this.dataCart[index].sumary = this.dataCart[index].price * val;
      this.dataCart[index].amount_sell = val;
      this.summaryAll = this.dataCart.reduce(
        (dataCart, obj) => dataCart + obj.sumary,
        0
      );
    },
    sumAll() {
      this.summaryAll = this.dataCart.reduce(
        (dataCart, obj) => dataCart + obj.sumary,
        0
      );
    },
    clearData() {
      this.dataCart = [];
    },
    getToken() {
      var user = JSON.parse(localStorage.getItem("users"));
      return user.token
    },
  },
  components: {
    Cart,
    // Expand
  },
};
</script>

<style>
</style>