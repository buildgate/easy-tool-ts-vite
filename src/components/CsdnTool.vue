<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';

onMounted(() => {});

function setCSDN() {
  chrome.tabs.query(
    { active: true, currentWindow: true },
    function (tabs: any) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          fn: 'csdn',
        },
        function (response: any) {
          console.log('ok');
        }
      );
    }
  );
}
</script>

<template>
  <div class="csdn-tool" @click="setCSDN">CSDN</div>
</template>

<style scoped lang="less">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.csdn-tool {
  width: 70px;
  height: 22.5px;
  background: #fc5531;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 14px;
  font-weight: bold;
  box-sizing: border-box;
  border-radius: 5px;
  font-weight: bolder;
  cursor: pointer;
  box-shadow: #606266 2px 2px 2px 1px;
  border: salmon 1px solid;
  transition: all 0.2s;
  color: #303133;
  user-select: none;
  &:active {
    box-shadow: none;
    transform: translate(2px, 2px);
  }

  &:hover {
    border: #ffffff 1px solid;
    color: #ffffff;
  }
  > img {
    width: 15px;
  }
}
</style>
