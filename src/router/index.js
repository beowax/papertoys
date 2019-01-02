import Vue from 'vue'
import Router from 'vue-router'
import Panel3D from '@/components/papertoys/cube/Panel3D'
import Panel2D from '@/components/papertoys/cube/Panel2D'
import Workspace from '@/components/Workspace'

Vue.use(Router)
//Vue.listen(process.env.PORT || 8080);

export default new Router({
  routes: [
    {
      path: '/',
      name: '2D&3D Panels WOrkspace',
      component: Workspace
    },
    {
      path: '/2D',
      name: '2D Panel',
      component: Panel2D
    },
    {
      path: '/3D',
      name: '3D Panel',
      component: Panel3D
    }
  ]
})
