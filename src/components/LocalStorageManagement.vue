<script setup lang="ts">
import { ref, reactive, onMounted, computed } from 'vue';

interface localStorageData {
  name: any;
  value: any;
  originValue: any;
}

const collapse = ref(true);

const localStorageList = ref<Array<localStorageData>>([]);

const newLocalStorage = reactive({ name: '', value: '' });

const searchText = ref('');

const filterLocalStorageList = computed((): Array<localStorageData> => {
  if (searchText.value === '') {
    return localStorageList.value;
  } else {
    return localStorageList.value.filter((o: any) => {
      return o.name.search(searchText.value) !== -1;
    });
  }
});

onMounted(() => {
  getLocalStorage();
});

function getLocalStorage() {
  chrome.tabs.query(
    { active: true, currentWindow: true },
    function (tabs: any) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          fn: 'localStorageGet',
        },
        function (response: any) {
          localStorageList.value = [...response.localStorage];
        }
      );
    }
  );
}

function createLocalStorage() {
  if (
    newLocalStorage.name.trim() === '' ||
    newLocalStorage.value.trim() === ''
  ) {
    alert('error');
  } else {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      function (tabs: any) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            fn: 'localStorageCreate',
            args: {
              name: newLocalStorage.name,
              value: newLocalStorage.value,
            },
          },
          function (response: any) {
            newLocalStorage.name = '';
            newLocalStorage.value = '';
            getLocalStorage();
          }
        );
      }
    );
    // window.localStorage.setItem(newLocalStorage.name, newLocalStorage.value);
  }
}

function editLocalStorage(name: any, value: any) {
  if (value.trim() === '') {
    alert('error');
  } else {
    chrome.tabs.query(
      { active: true, currentWindow: true },
      function (tabs: any) {
        chrome.tabs.sendMessage(
          tabs[0].id,
          {
            fn: 'localStorageEdit',
            args: {
              name: name,
              value: value,
            },
          },
          function (response: any) {
            getLocalStorage();
          }
        );
      }
    );
    // window.localStorage.setItem(name, value);
  }
}

function clearLocalStorage(name: any) {
  chrome.tabs.query(
    { active: true, currentWindow: true },
    function (tabs: any) {
      chrome.tabs.sendMessage(
        tabs[0].id,
        {
          fn: 'localStorageRemove',
          args: {
            name: name,
          },
        },
        function (response: any) {
          getLocalStorage();
        }
      );
    }
  );
  // window.localStorage.removeItem(name);
}

function resetLocalStorage(item: any) {
  item.value = item.originValue;
}

function changeCollapse() {
  collapse.value = !collapse.value;
}
</script>

<template>
  <div class="local-storage">
    <div class="local-storage-title" @click="changeCollapse">
      Local Storage
      <img :class="{ up: !collapse }" src="@/assets/collapse.svg" />
    </div>
    <div class="local-storage-overview" v-show="collapse">
      <input
        type="text"
        name=""
        id=""
        v-model="searchText"
        placeholder="search" />
      <img src="@/assets/search.svg" />
    </div>
    <div class="local-storage-list" v-show="collapse">
      <TransitionGroup name="list">
        <div
          class="local-storage-list-item local-storage-list-item-new"
          key="new">
          <div
            class="local-storage-list-item-name"
            :title="newLocalStorage.name">
            <input type="text" name="" id="" v-model="newLocalStorage.name" />
          </div>
          <div
            class="local-storage-list-item-value"
            :title="newLocalStorage.value">
            <input type="text" name="" id="" v-model="newLocalStorage.value" />
          </div>
          <div class="local-storage-list-item-action">
            <div
              class="local-storage-list-item-action-new"
              @click="createLocalStorage">
              new
            </div>
          </div>
        </div>
        <div
          class="local-storage-list-item"
          v-for="(item, idx) in filterLocalStorageList"
          :key="idx">
          <div class="local-storage-list-item-name" :title="item.name">
            <p>{{ item.name }}</p>
          </div>
          <div class="local-storage-list-item-value" :title="item.value">
            <input type="text" name="" id="" v-model="item.value" />
          </div>
          <div class="local-storage-list-item-action">
            <div
              v-if="item.originValue !== item.value"
              class="local-storage-list-item-action-save"
              @click="editLocalStorage(item.name, item.value)">
              <img src="@/assets/save.svg" />
            </div>
            <div
              v-if="item.originValue !== item.value"
              class="local-storage-list-item-action-reset"
              @click="resetLocalStorage(item)">
              <img src="@/assets/reset.svg" />
            </div>
            <div
              class="local-storage-list-item-action-delete"
              @click="clearLocalStorage(item.name)">
              <img src="@/assets/delete.svg" />
            </div>
          </div>
        </div>
      </TransitionGroup>
    </div>
  </div>
</template>

<style>
.list-move, /* 对移动中的元素应用的过渡 */
.list-enter-active,
.list-leave-active {
  transition: all 0.3s ease;
}

.list-enter-from,
.list-leave-to {
  opacity: 0;
  transform: translateX(30px);
}

/* 确保将离开的元素从布局流中删除
  以便能够正确地计算移动的动画。 */
.list-leave-active {
  position: absolute;
}
</style>

<style scoped lang="less">
* {
  box-sizing: border-box;
  margin: 0;
  padding: 0;
}
.local-storage {
  > .local-storage-title {
    user-select: none;
    cursor: pointer;
    font-weight: bolder;
    padding: 5px;
    width: 150px;
    display: flex;
    align-items: center;
    > img {
      width: 20px;
      object-fit: contain;
      margin-left: 5px;
      transition: all 0.2s;
    }
    > .up {
      transform: rotate(180deg);
    }
  }
  > .local-storage-overview {
    position: relative;
    margin-bottom: 10px;
    padding: 10px;
    > input {
      width: calc(100%);
      height: 28px;
      border: #cecece solid 1px;
      border-radius: 2px;
      transition: all 0.2s;
      padding: 10px;
      padding-left: 40px;
      box-shadow: #9e9e9e 1px 1px 2px 1px;
      &:focus {
        // box-shadow: #a3a3a3 0px 0px 1px 1px;
        outline: none;
      }
    }
    > img {
      position: absolute;
      left: 20px;
      top: 14px;
      height: 20px;
    }
  }
  > .local-storage-list {
    padding: 0 5px;
    padding-bottom: 5px;
    max-height: 225px;
    overflow-y: auto;
    overflow-x: hidden;
    > .local-storage-list-item {
      &:first-child {
        border-top: #cecece 1px solid;
      }
      &:hover {
        z-index: 2;
        box-shadow: #9e9e9e 1px 1px 2px 1px;
        background: #dddddd;
      }
      position: relative;
      box-sizing: border-box;
      width: 100%;
      display: grid;
      grid-template-columns: 2fr 5fr auto;
      border: #cecece 1px solid;
      border-top: none;
      padding: 10px 10px;
      background: #fcfcfc;
      > .local-storage-list-item-name {
        > p {
          width: 100%;
          overflow: hidden;
          text-overflow: ellipsis;
          white-space: nowrap;
        }
        > input {
          width: 100%;
          border: #cecece solid 1px;
          border-radius: 2px;
          transition: all 0.2s;
          &:focus {
            // box-shadow: #a3a3a3 0px 0px 1px 1px;
            outline: none;
          }
        }
        overflow: hidden;
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
      }
      > .local-storage-list-item-value {
        display: flex;
        justify-content: center;
        align-items: center;
        padding: 5px;
        > input {
          width: 100%;
          border: #cecece solid 1px;
          border-radius: 2px;
          transition: all 0.2s;
          &:focus {
            // box-shadow: #a3a3a3 0px 0px 1px 1px;
            outline: none;
          }
        }
      }
      > .local-storage-list-item-action {
        width: 140px;
        display: flex;
        justify-content: space-around;
        align-items: center;
        padding: 5px;
        > .local-storage-list-item-action-delete {
          width: 40px;
          height: 22.5px;
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
            width: 15px;
          }
        }
        > .local-storage-list-item-action-save {
          width: 40px;
          height: 22.5px;
          background: #67c23a;
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
          border: rgb(120, 173, 77) 1px solid;
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
        > .local-storage-list-item-action-new {
          width: 40px;
          height: 22.5px;
          background: #409eff;
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
          border: rgb(120, 173, 77) 1px solid;
          transition: all 0.2s;
          color: #ffffff;
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
        > .local-storage-list-item-action-reset {
          width: 40px;
          height: 22.5px;
          background: #e6a23c;
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
          border: #e4b267 1px solid;
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
      }
    }
    > .local-storage-list-item-new {
      z-index: 4 !important;
      position: sticky;
      top: 0;
      &:hover {
        z-index: 4;
        box-shadow: #9e9e9e 1px 1px 2px 1px;
        background: #f0f8ff !important;
      }
    }
  }
}
</style>
