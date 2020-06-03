<template>
  <div class="login">
    <div class="left"></div>
    <div class="rigth">
      <img src='@/assets/img/login_banner_ele@2x.png' />
    </div>
  </div>
</template>

<script>
export default {
  data () {
    return {

    }
  }
}
</script>

<style lang='less'>
.login {
  display: flex;
  justify-content: space-around;
  align-items: center;
  // width: 1400px;
  // height: 788px;
  height: 100%;
  background: linear-gradient(
    225deg,
    rgba(20, 147, 250, 1),
    rgba(1, 198, 250, 1)
  );
  .rigth {
    // img{
    //   width: 630px;
    //   height: 435px;
    // }
  }
}
.left {
  width: 478px;
  height: 550px;
  background: rgba(245, 245, 245, 1);
}
</style>
