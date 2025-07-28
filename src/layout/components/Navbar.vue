<template>
  <div class="navbar">
    <Hamburger
      id="hamburger-container"
      :is-active="appStore.sidebar.opened"
      class="hamburger-container"
      @toggle-click="toggleSideBar"
    />
    <Breadcrumb v-if="!settingsStore.topNav" id="breadcrumb-container" class="breadcrumb-container" />
    <TopNav v-if="settingsStore.topNav" id="topmenu-container" class="topmenu-container" />

    <div class="right-menu">
      <template v-if="appStore.device !== 'mobile'">
        <HeaderSearch id="header-search" class="right-menu-item" />

        <Screenfull id="screenfull" class="right-menu-item hover-effect" />

        <el-tooltip content="布局大小" effect="dark" placement="bottom">
          <SizeSelect id="size-select" class="right-menu-item hover-effect" />
        </el-tooltip>
      </template>

      <el-dropdown class="avatar-container right-menu-item hover-effect" trigger="hover" @command="handleCommand">
        <div class="avatar-wrapper">
          <img :src="userStore.avatar" class="user-avatar">
          <span class="user-nickname"> {{ userStore.nickName }} </span>
        </div>
        <template #dropdown>
          <el-dropdown-menu>
            <router-link to="/user/profile">
              <el-dropdown-item>个人中心</el-dropdown-item>
            </router-link>
            <el-dropdown-item divided command="logout">
              <span>退出登录</span>
            </el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <div v-if="settingsStore.showSettings" class="right-menu-item hover-effect setting" @click="setLayout">
        <svg-icon icon-class="more-up" />
      </div>
    </div>
  </div>
</template>

<script setup>
import { ElMessageBox } from 'element-plus'
import Breadcrumb from '@/components/Breadcrumb'
import Hamburger from '@/components/Hamburger'
import HeaderSearch from '@/components/HeaderSearch'
import Screenfull from '@/components/Screenfull'
import SizeSelect from '@/components/SizeSelect'
import TopNav from '@/components/TopNav'
import useAppStore from '@/store/modules/app'
import useSettingsStore from '@/store/modules/settings'
import useUserStore from '@/store/modules/user'

const emits = defineEmits(['setLayout'])
const appStore = useAppStore()
const userStore = useUserStore()
const settingsStore = useSettingsStore()

function toggleSideBar() {
  appStore.toggleSideBar()
}

function handleCommand(command) {
  switch (command) {
    case 'setLayout':
      setLayout()
      break
    case 'logout':
      logout()
      break
    default:
      break
  }
}

function logout() {
  ElMessageBox.confirm('确定注销并退出系统吗？', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning',
  }).then(() => {
    userStore.logOut().then(() => {
      location.href = '/index'
    })
  }).catch(() => { })
}

function setLayout() {
  emits('setLayout')
}
</script>

<style lang='scss' scoped>
.navbar {
  position: relative;
  height: 50px;
  overflow: hidden;
  background: var(--navbar-bg);
  box-shadow: 0 1px 4px rgb(0, 21, 41, 0.08);

  .hamburger-container {
    float: left;
    height: 100%;
    line-height: 46px;
    cursor: pointer;
    transition: background 0.3s;
    -webkit-tap-highlight-color: transparent;

    &:hover {
      background: rgb(0, 0, 0, 0.025);
    }
  }

  .breadcrumb-container {
    float: left;
  }

  .topmenu-container {
    position: absolute;
    left: 50px;
  }

  .errLog-container {
    display: inline-block;
    vertical-align: top;
  }

  .right-menu {
    float: right;
    display: flex;
    height: 100%;
    line-height: 50px;

    &:focus {
      outline: none;
    }

    .right-menu-item {
      display: inline-block;
      height: 100%;
      padding: 0 8px;
      font-size: 18px;
      vertical-align: text-bottom;
      color: #5a5e66;

      &.hover-effect {
        cursor: pointer;
        transition: background 0.3s;

        &:hover {
          background: rgb(0, 0, 0, 0.025);
        }
      }

      &.theme-switch-wrapper {
        display: flex;
        align-items: center;

        svg {
          transition: transform 0.3s;

          &:hover {
            transform: scale(1.15);
          }
        }
      }
    }

    .avatar-container {
      padding-right: 0;
      margin-right: 0;

      .avatar-wrapper {
        position: relative;
        right: 5px;
        margin-top: 10px;

        .user-avatar {
          width: 30px;
          height: 30px;
          cursor: pointer;
          border-radius: 50%;
        }

        .user-nickname{
          position: relative;
          bottom: 10px;
          left: 5px;
          font-size: 14px;
          font-weight: bold;
        }

        i {
          position: absolute;
          top: 25px;
          right: -20px;
          font-size: 12px;
          cursor: pointer;
        }
      }
    }
  }
}
</style>
