<script setup lang="ts">
import { ref, reactive } from 'vue';

interface localStorageData {
  name: any;
  value: any;
  id?: any;
}

const localStorageList = reactive<Array<localStorageData>>([
  { name: 'fff', value: 111 },
]);
</script>

<template>
  <div class="local-storage-list">
    <div
      class="local-storage-list-item"
      v-for="(item, idx) in localStorageList"
      :key="idx">
      <div class="local-storage-list-item-name" :title="item.name">
        {{ item.name }}
      </div>
      <div class="local-storage-list-item-value" :title="item.value">
        {{ item.value }}
      </div>
      <div class="local-storage-list-item-action">
        <div class="local-storage-list-item-action-delete">
          <img src="@/assets/delete.svg" />
        </div>
      </div>
    </div>
    <!-- <table class="local-storage-list-table">
      <tbody class="local-storage-list-tbody">
        <tr v-for="item in localStorageList" class="local-storage-list-tr">
          <td style="width: 20" class="local-storage-list-td">{{ item.name }}</td>
          <td style="width: 50px" class="local-storage-list-td">{{ item.value }}</td>
          <td style="width: 100px" class="local-storage-list-td">删除</td>
        </tr>
      </tbody>
    </table> -->
  </div>
</template>

<style scoped lang="less">
.local-storage-list {
  > .local-storage-list-item {
    width: 100%;
    display: grid;
    grid-template-columns: 2fr 5fr 2fr;
    > .local-storage-list-item-name {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    > .local-storage-list-item-value {
      display: flex;
      justify-content: center;
      align-items: center;
    }
    > .local-storage-list-item-action {
      display: flex;
      justify-content: center;
      align-items: center;
      > .local-storage-list-item-action-delete {
        width: 50px;
        height: 30px;
        background: #f56c6c;
        display: flex;
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
          width: 20px;
        }
      }
    }
  }
}
</style>
