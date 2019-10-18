<template>
  <transition name="move_bottom">
    <div class="password_Mask"
         v-show="isTrue"
         @click="backHandle">
      <transition name="page-move">
        <div class="pay-tool"
             v-show="isTrue">
          <div class="top_title">
            <i class="close_password"
               @click.stop="backHandle"></i>
            <div class="pay-number-price">
            </div>
            <p class="confirm_close"
               @click.stop="confirm">确认</p>
          </div>
          <div style="clear:both"></div>
          <div class="pay-tool-keyboard">
            <ul>
              <li @click.stop="keyUpHandle($event)"
                  v-for="val in keys"
                  :key="val"
                  :data-item="val==='清空'?'clear':''">
                {{ val }}
              </li>
              <li class="del"
                  @click.stop="delHandle">
                <i>
                  返回
                </i>
              </li>
            </ul>
          </div>
        </div>
      </transition>
    </div>
  </transition>
</template>

<script>
import pswBox from './pswBox'
export default pswBox
</script>

<style lang="scss">
@import './pwdBox.scss'
</style>
