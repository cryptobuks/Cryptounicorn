<template>
  <div id="app">
    <transition name="fade">
      <router-view></router-view>
    </transition>
  </div>
</template>

<script>
export default {
  data: () => ({
    mobile: (/Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent))
  })
}
</script>

<style>

@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 300;
  src: local('Roboto Mono Light'), local('RobotoMono-Light'),
       url('../assets/fonts/roboto-mono-v5-latin-300.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('../assets/fonts/roboto-mono-v5-latin-300.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 400;
  src: local('Roboto Mono'), local('RobotoMono-Regular'),
       url('../assets/fonts/roboto-mono-v5-latin-regular.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('../assets/fonts/roboto-mono-v5-latin-regular.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
@font-face {
  font-family: 'Roboto Mono';
  font-style: normal;
  font-weight: 700;
  src: local('Roboto Mono Bold'), local('RobotoMono-Bold'),
       url('../assets/fonts/roboto-mono-v5-latin-700.woff2') format('woff2'), /* Chrome 26+, Opera 23+, Firefox 39+ */
       url('../assets/fonts/roboto-mono-v5-latin-700.woff') format('woff'); /* Chrome 6+, Firefox 3.6+, IE 9+, Safari 5.1+ */
}
.std-font {
  font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Roboto,Oxygen,Ubuntu,Cantarell,"Fira Sans","Droid Sans","Helvetica Neue",sans-serif;
}
* {
  box-sizing: border-box;
}
body {
  font-size: 12px;
  font-family: 'Roboto Mono';
  -webkit-font-smoothing: antialiased;
  user-select: none;
  -webkit-user-select: none;
  -moz-user-select: none;
  background-color: #111;
  margin: 0;
  padding: 0;
}
body,#app,html {
  width: 100%;
  height: 100%;
}
* {
    -webkit-tap-highlight-color: rgba(0, 0, 0, 0);
    -moz-tap-highlight-color: rgba(0, 0, 0, 0);
}
a {
  text-decoration: none;
  color: inherit;
}
.fade-enter-active, .fade-leave-active {
  transition-property: opacity;
  transition-duration: 0.25s;
}
.fade-enter-active {
  transition-delay: 0.25s;
}
.fade-enter, .fade-leave-active {
  opacity: 0
}
.roboto {
  font-family: "Roboto Mono", -apple-system;
}
</style>
