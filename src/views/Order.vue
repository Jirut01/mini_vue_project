<template>
  <div>
    <h1 class="subheading grey--text">ออเดอร์</h1>
    <v-container>

      <v-card class="pa-3" v-for="project in projects" :key="project.tile">
        <v-layout row wrap class="pa-3">
          <v-flex xs12 md3>
            <div class="caption grey--text">ลำดับ</div>
            <div>{{ project.title }}</div>
          </v-flex>
          <v-flex ms6 md3>
            <div class="caption grey--text">มูลค่า</div>
            <div>{{ project.team }}</div>
          </v-flex>
          <v-flex ms6 md3>
            <div class="caption grey--text">วันที่</div>
            <v-chip :class="project.code" close>{{ project.status }}</v-chip>
          </v-flex>
          <v-flex ms6 md3>
            <div class="caption grey--text">รายละเอียด</div>
            <DialogEdit :data="project.title" :datas="projects"/>
          </v-flex>
        </v-layout>
      </v-card>

       <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="lime"
            dark
            v-bind="attrs"
            v-on="on"
            @click="sortBy('title')"
            class="ml-2 mt-2"
            small
          >
            <v-icon>mdi-file-document-multiple-outline</v-icon>
          </v-btn>
        </template>
        <span>เรียงตามชื่อโปรเจค</span>
      </v-tooltip>

      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="warning"
            dark
            v-bind="attrs"
            v-on="on"
            @click="sortBy('team')"
            small
            class="ml-2 mt-2"
          >
            <v-icon>mdi-human-capacity-increase</v-icon>
          </v-btn>
        </template>
        <span>เรียงตามชื่อทีม</span>
      </v-tooltip>

      <v-tooltip top>
        <template v-slot:activator="{ on, attrs }">
          <v-btn
            color="success"
            dark
            v-bind="attrs"
            v-on="on"
            @click="sortBy('status')"
            small
            class="ml-2 mt-2"
          >
            <v-icon>mdi-list-status</v-icon>
          </v-btn>
        </template>
        <span>เรียงตามสถานะ</span>
      </v-tooltip>

    </v-container>
  </div>
</template>

<script>
import DialogEdit from "../components/DialogEdit";
export default {
  data() {
    return {
      show: true,
      projects: [
        {
          title: "ชำระเงินออนไลน์",
          team: "ดรีมทีม",
          status: "สำเร็จ",
          code: "success",
        },
        {
          title: "ธนาคารเพื่อชาวบ้าน",
          team: "หมูป่า",
          status: "กำลังตรวจสอบ",
          code: "info",
        },
        {
          title: "ระบบจองโต๊ะร้านชาบู",
          team: "ไทบ้านโปรแกรมเมอร์",
          status: "กำลังดำเนินการ",
          code: "warning",
        },
        {
          title: "ระบบจองหอพัก",
          team: "นักรัก",
          status: "ล้มเหลว",
          code: "error",
        },
        {
          title: "ระบบจองร้านเหล้า",
          team: "นักดื่ม",
          status: "ล้มเหลว",
          code: "error",
        },
      ],
    };
  },
  methods: {
    sortBy(prop) {
      this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
    },
  },
  components: {
    DialogEdit
  },
};
</script>

<style>
</style>