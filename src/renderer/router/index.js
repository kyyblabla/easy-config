import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'edit-page',
      component: require('@/view/EditPage').default
    },
    {
      path: '*',
      redirect: '/'
    }
  ]
})
