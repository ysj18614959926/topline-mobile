<template>
  <div>
    <van-nav-bar
      title="登录"
      class="loginNavBar"
    />
    <form class="loginBox">
      <van-cell-group>
          <van-field
            v-model="user.mobile"
            v-validate="'required'"
            name="phone"
            clearable
            label="手机号"
            :error-message="errors.first('phone')"
            placeholder="请输入手机号"
          />
          <van-field
            v-model="user.code"
            label="验证码"
            placeholder="请输入验证码"
            :error-message="errors.first('code')"
            v-validate="'required'"
            name="code"
          />
        </van-cell-group>
        <van-button type="info" @click.prevent='handelLogin'>登录</van-button>
    </form>
  </div>
</template>
<script>
import { userLogin } from '@/api/user'
export default {
  data () {
    return {
      user: {
        mobile: '18614959926',
        code: '246810'
      }
    }
  },
  methods: {
    async handelLogin () {
      const valid = await this.$validator.validate()
      try {
        if (!valid) {
          return
        }
        const res = await userLogin(this.user)
        this.$store.commit('addUser', res.data)
        this.$router.push('/')
      } catch (err) {
        console.log(err)
      }
    }
  }
}
</script>
<style lang='less' scoped>
.loginNavBar {
  background-color: #3296fa;
}
.loginBox{
  width: 100%;
  box-sizing: border-box;
  padding: 20px;
  button {
    margin-top: 20px;
    width: 100%;
  }
}
</style>
