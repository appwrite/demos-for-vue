<template>
  <p>Hello {{ user.name }}</p>
  <img :src="avatar" alt="" class="avatar">
  <p>Create QR code</p>
  <input type="text" placeholder="Content" v-model="qrcodeContent">
  <button @click="createQRCode">Create</button>
  <br>
  <img :src="qrcode" alt="" class="avatar">
  <br>
  <p>Get Credit Card Type</p>
  <input type="text" v-model="ccNumber" placeholder="Credit Card Number">
  <img :src="ccPicture" alt="">
  <br>
  <button @click="getCCType">Check Card Type</button>
  <div class="loginSwitchContainer">
    <p>Not you?</p>
    <span @click="logout">Log out</span>
  </div>
</template>

<script>
import client from "../appwrite";

export default {
  name: "Home",
  async setup() {
    const user = await client.account.get().catch((err) => {
      return null;
    });
    const avatar = await client.avatars.getInitials();
    return {
      user,
      avatar
    }
  },
  data() {
    return {
      qrcode: '',
      qrcodeContent: '',
      ccNumber: '',
      ccPicture: '',
      ccType: ''
    }
  },
  methods: {
    logout() {
      client.account.deleteSession('current');
      this.$router.push('/');
    },
    async createQRCode() {
      this.qrcode = await client.avatars.getQR(this.qrcodeContent);
    },
    async getCCType() {
      this.ccType = this.getCardType(this.ccNumber)
      this.ccPicture = await client.avatars.getCreditCard(this.ccType);
    },
    // from https://stackoverflow.com/questions/5911236/identify-card-type-from-card-number
    getCardType(number) {
      // visa
      var re = new RegExp("^4");
      if (number.match(re) != null)
        return "Visa";

      // Mastercard
      // Updated for Mastercard 2017 BINs expansion
      if (/^(5[1-5][0-9]{14}|2(22[1-9][0-9]{12}|2[3-9][0-9]{13}|[3-6][0-9]{14}|7[0-1][0-9]{13}|720[0-9]{12}))$/.test(number))
        return "Mastercard";

      // AMEX
      re = new RegExp("^3[47]");
      if (number.match(re) != null)
        return "AMEX";

      // Discover
      re = new RegExp("^(6011|622(12[6-9]|1[3-9][0-9]|[2-8][0-9]{2}|9[0-1][0-9]|92[0-5]|64[4-9])|65)");
      if (number.match(re) != null)
        return "Discover";

      // Diners
      re = new RegExp("^36");
      if (number.match(re) != null)
        return "Diners";

      // Diners - Carte Blanche
      re = new RegExp("^30[0-5]");
      if (number.match(re) != null)
        return "Diners - Carte Blanche";

      // JCB
      re = new RegExp("^35(2[89]|[3-8][0-9])");
      if (number.match(re) != null)
        return "JCB";

      // Visa Electron
      re = new RegExp("^(4026|417500|4508|4844|491(3|7))");
      if (number.match(re) != null)
        return "Visa Electron";

      return "";
    }
  }
}
</script>

<style scoped>
.avatar {
  width: 150px;
  height: auto;
}
</style>
