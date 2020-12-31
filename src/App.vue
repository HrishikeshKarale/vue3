<template>
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/toDoApp">To Do App</router-link> |
    <router-link to="/calendar">Calendar</router-link> |
    <router-link to="/markdown">Markdown</router-link> |
    <router-link to="/slider">Slider Carousel</router-link>
  </nav>
  <router-view />
</template>

<style lang="less">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}

nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;

    &.router-link-exact-active {
      color: #42b983;
    }
  }
}
</style>
