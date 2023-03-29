<template>
  <div>
    <v-tooltip left>
      <template v-slot:activator="{ on, attrs }">
        <v-badge bordered color="green" :content="card.length" overlap>
          <v-btn
            color="blue"
            dark
            v-bind="attrs"
            v-on="on"
            class="ml-2 mt-2"
            @click="clickit(card)"
          >
            <v-icon>mdi-cart</v-icon>
          </v-btn>
        </v-badge>
      </template>
      <span>ตะกร้า</span>
    </v-tooltip>

    <!-- <v-badge bordered color="green" :content=card overlap>
        <v-btn class="white--text" color="blue" depressed>
          <v-icon>mdi-cart</v-icon>
        </v-btn>
      </v-badge> -->

    <v-row justify="center">
      <v-dialog v-model="dialog" persistent width="600px">
        <v-card>
          <v-card-title>
            <span class="text-h5">ตะกร้าสินค้า</span><br />
          </v-card-title>
          <v-card-text>
            <!-- {{card}} -->
            <v-simple-table dense class="responsive no-wrap">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-center">ลำดับ</th>
                    <th class="text-center">รูป</th>
                    <th class="text-center">ชื่อสินค้า</th>
                    <th class="text-center">ราคา</th>
                    <th class="text-center">จำนวน</th>
                    <th class="text-center">รวม</th>
                    <th class="text-center">จัดการ</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="(item, index) in card" :key="index">
                    <td style="text-align: center">{{ index + 1 }}</td>
                    <td style="text-align: center">
                      <v-img max-width="50px" :src="item.img"></v-img>
                    </td>
                    <td style="text-align: center">{{ item.product_name }}</td>
                    <td style="text-align: center">{{ item.price }}</td>
                    <td style="text-align: center">
                      <input
                        :id="'myInput' + index"
                        style="
                          width: 60px;
                          height: 30px;
                          border: 1px solid #ccc;
                          border-radius: 4px;
                          box-sizing: border-box;
                          margin-left: 8px;
                        "
                        class=""
                        min="0"
                        type="number"
                        :value="Number(item.amount_sell)"
                        @change="changeData(index, card)"
                      />
                    </td>
                    <td style="text-align: center">{{ item.sumary }}</td>
                    <td style="text-align: center">
                      <v-btn small color="red white--text" @click="del(index)"
                        >ลบ</v-btn
                      >
                    </td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
            <v-row class="mt-1">
              <v-col cols="md6"> </v-col>
              <v-col cols="md6">
                <p class="d-flex flex-row-reverse" id="summary">
                  รวมเงิน {{ format_number(summaryAll) }} บาท
                </p>
              </v-col>
            </v-row>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error darken-1" text @click="dialog = false">
              ปิด
            </v-btn>
            <v-btn color="green darken-1" text @click="insertOrder(card)">
              ซื้อสินค้า
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-row>
  </div>
</template>

<script>
import { EventBus } from "@/EventBus";
export default {
  data() {
    return {
      dialog: false,
      postdata: {
        detail: [],
      },
    };
  },
  methods: {
    del(index) {
      EventBus.$emit("removeCart", index);
    },
    changeData(index, card) {
      var id = document.getElementById("myInput" + index);
      var value = id.value;
      if (card[index].amount < value) {
        alert("สินค้าไม่พอ");
        id.value = card[index].amount;
        value = card[index].amount;
        EventBus.$emit("updateCart", index, value);
      } else if (value <= 0 || isNaN(value)) {
        alert("กรุณกรอกให้ถูกต้อง");
        value = 1;
        id.value = 1;
        EventBus.$emit("updateCart", index, value);
      } else {
        EventBus.$emit("updateCart", index, value);
      }
    },
    clickit() {
      EventBus.$emit("sumAll");
      this.dialog = true;
    },
    format_number(number) {
      const formattedNumber = number.toLocaleString(undefined, {
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
      });
      return formattedNumber;
    },
    async insertOrder(items) {
      if(items.length == 0){
        alert('ไม่มีสินค้าในตะกร้า')
        return false
      }
    //   this.postdata.detail.push(items);
    var total = 0
    items.forEach(el => {
        this.postdata.detail.push({
            product_id: el.product_id,
            amount: Number(el.amount_sell),
            img: el.img,
            product_name: el.product_name,
            sum: el.price * Number(el.amount_sell),
            price: el.price
        });
        total += el.price * Number(el.amount_sell)
    });

        this.postdata.total = total

        console.log(this.postdata);

      try {
        const { data } = await this.axios.post(
          "http://localhost:3000/orders",
          this.postdata
        );
        alert(data.message);
        this.dialog = false;
        EventBus.$emit("clearData");
      } catch (error) {
        console.log(error);
      }
      console.log(items);
    },
  },
  props: ["card", "summaryAll"],
  computed: {
    //ประมวณผลแบบเรียลทาม //
    // sum() {
    //   const sum = card.reduce((acc, obj) => acc + obj.value, 0);
    //   return sum;
    // },
  },
};
</script>

<style>
</style>