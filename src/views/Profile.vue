<template>
<div>
<h1 class="subheading grey--text">Profile</h1>
  <div class="container">
    <div class="row">
      <div class="col-md-12 text-center mt-auto">
          <img
            src="https://scontent.fbkk27-1.fna.fbcdn.net/v/t1.6435-9/128214291_3531073590312573_8876833349761757286_n.jpg?_nc_cat=105&ccb=1-7&_nc_sid=09cbfe&_nc_eui2=AeHF9U0HAAA6gXbkwykWitSa-pfS2nP-gVD6l9Lac_6BUBu5XS-WmJErpRqxKO4nwT9Cjemvh6JtvtcFTTU_mnaN&_nc_ohc=7BnB9FCenOMAX_qSW5e&_nc_ht=scontent.fbkk27-1.fna&oh=00_AfCk5rL5zvGJE548lrD3DfBg7_nfzMjp1rQ-5TFkc6xkeQ&oe=644381FF"
            class="rounded-circle border-secondary brds zoom responsive"
            style="width: 400px; height: 400px"
            alt="me"
          />
          <div class="mt-4">
            <ul style="list-style-type: disc">
              <li class="mt-4"><b>ชื่อจริง :</b> {{ first_name }}</li>
              <li class="mt-4"><b>ชื่อเล่น :</b> {{ nickname }}</li>
              <li class="mt-4"><b>การศึกษา :</b> {{ education }}</li>
              <li class="mt-4"><b>งานอดิเรก :</b> {{ hobby }}</li>
              <li class="mt-4"><b>สิ่งที่ชอบ :</b> {{ admire }}</li>
              <li class="mt-4"><b>สิ่งที่ไม่ชอบ :</b> {{ notadmire }}</li>
              <li class="mt-4"><b>จุดเเข็ง :</b> {{ stange }}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "แนะนำตัวเอง",
      first_name: "นาย จิรัฏฐ์ แสงฉาย",
      nickname: "บอล",
      education: `จบจากมหาวิทยาลัยแม่โจ้ สาขาวิชา วิทยาการคอมพิวเตอร์`,
      hobby: "เล่นดนตรี,ท่องเที่ยว",
      admire: "การได้ออกไปเที่ยว",
      notadmire: "โหระพา",
      stange: "ไม่ค่อยยอมแพ้กับปัญหา",
    };
  },
};
</script>

<style>
li {
  list-style-type: none;
}
.container {
  padding: 2px 16px;
}
img.brds {
  border-style: solid;
  border-color: #ffffff;
  border-width: 1px;
}
.zoom {
  padding: 5px;
  background-color: #ffffff;
  transition: transform 0.2s; /* Animation */
  width: 50px;
  height: 50px;
  margin: 0 auto;
}
.zoom:hover {
  transform: scale(
    1.5
  ); /* (150% zoom - Note: if the zoom is too large, it will go outside of the viewport) */
}
</style>