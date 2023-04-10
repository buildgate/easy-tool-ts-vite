<script setup lang="ts">
import LocalStorageManagement from '@/components/LocalStorageManagement.vue';
import CsdnTool from '@/components/CsdnTool.vue';
</script>

<template>
  <div class="toolWrapper">
    <CsdnTool></CsdnTool>
  </div>
  <div class="localStorageWrapper">
    <LocalStorageManagement></LocalStorageManagement>
  </div>
</template>

<style scoped lang="less">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}
.localStorageWrapper {
  min-width: 500px;
  max-height: 320px;
  overflow-y: auto;
  overflow-x: hidden;
}
.toolWrapper {
  min-width: 500px;
  max-height: 320px;
  overflow-y: auto;
  overflow-x: hidden;
  padding: 5px;
  display: flex;
  justify-content: flex-end;
}
</style>
