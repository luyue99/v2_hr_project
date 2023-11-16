import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
// 导入布局组件
import Layout from '@/layout'

/**
 * Note: 子菜单只有在 route 的 children.length >= 1 时才会显示
 * 详情参考：https://panjiachen.github.io/vue-element-admin-site/guide/essentials/router-and-nav.html
 *
 * hidden: true                   如果设置为 true，该菜单将不会在侧边栏中显示，默认为 false
 * alwaysShow: true               如果设置为 true，根菜单将始终显示，默认为 false
 * redirect: noRedirect           如果设置为 noRedirect，在面包屑中将不进行重定向
 * name:'router-name'             在 <keep-alive> 中使用的名称（必须设置）
 * meta : {
    roles: ['admin','editor']    控制页面的角色（可以设置多个角色）
    title: 'title'               在侧边栏和面包屑中显示的名称（建议设置）
    icon: 'svg-name'/'el-icon-x'  在侧边栏中显示的图标
    breadcrumb: false            如果设置为 false，菜单将不会在面包屑中显示（默认为 true）
    activeMenu: '/example/list'  设置路径后，侧边栏将突出显示您设置的路径
  }
 */

/**
 * constantRoutes
 * 无需权限要求的基本页面
 * 所有角色均可访问
 */
export const constantRoutes = [
  {
    path: '/login',
    component: () => import('@/views/login/index'),
    hidden: true
  },

  {
    path: '/404',
    component: () => import('@/views/404'),
    hidden: true
  },

  {
    path: '/',
    component: Layout,
    redirect: '/dashboard',
    children: [
      {
        path: 'dashboard',
        name: 'Dashboard',
        component: () => import('@/views/dashboard/index'),
        meta: { title: 'Dashboard', icon: 'dashboard' }
      }
    ]
  },

  {
    path: '/example',
    component: Layout,
    redirect: '/example/table',
    name: 'Example',
    meta: { title: 'Example', icon: 'el-icon-s-help' },
    children: [
      {
        path: 'table',
        name: 'Table',
        component: () => import('@/views/table/index'),
        meta: { title: 'Table', icon: 'table' }
      },
      {
        path: 'tree',
        name: 'Tree',
        component: () => import('@/views/tree/index'),
        meta: { title: 'Tree', icon: 'tree' }
      }
    ]
  },

  {
    path: '/form',
    component: Layout,
    children: [
      {
        path: 'index',
        name: 'Form',
        component: () => import('@/views/form/index'),
        meta: { title: 'Form', icon: 'form' }
      }
    ]
  },

  {
    path: '/nested',
    component: Layout,
    redirect: '/nested/menu1',
    name: 'Nested',
    meta: {
      title: 'Nested',
      icon: 'nested'
    },
    children: [
      {
        path: 'menu1',
        component: () => import('@/views/nested/menu1/index'), // 父级 router-view
        name: 'Menu1',
        meta: { title: 'Menu1' },
        children: [
          {
            path: 'menu1-1',
            component: () => import('@/views/nested/menu1/menu1-1'),
            name: 'Menu1-1',
            meta: { title: 'Menu1-1' }
          },
          {
            path: 'menu1-2',
            component: () => import('@/views/nested/menu1/menu1-2'),
            name: 'Menu1-2',
            meta: { title: 'Menu1-2' },
            children: [
              {
                path: 'menu1-2-1',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-1'),
                name: 'Menu1-2-1',
                meta: { title: 'Menu1-2-1' }
              },
              {
                path: 'menu1-2-2',
                component: () => import('@/views/nested/menu1/menu1-2/menu1-2-2'),
                name: 'Menu1-2-2',
                meta: { title: 'Menu1-2-2' }
              }
            ]
          },
          {
            path: 'menu1-3',
            component: () => import('@/views/nested/menu1/menu1-3'),
            name: 'Menu1-3',
            meta: { title: 'Menu1-3' }
          }
        ]
      },
      {
        path: 'menu2',
        component: () => import('@/views/nested/menu2/index'),
        name: 'Menu2',
        meta: { title: 'menu2' }
      }
    ]
  },

  {
    path: 'external-link',
    component: Layout,
    children: [
      {
        path: 'https://panjiachen.github.io/vue-element-admin-site/#/',
        meta: { title: 'External Link', icon: 'link' }
      }
    ]
  },

  // 404页面必须放在最后 !!!
  { path: '*', redirect: '/404', hidden: true }
]

/**
 * 创建路由
 */
const createRouter = () => new Router({
  // mode: 'history', // 需要服务端支持
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRoutes
})

/**
 * 创建并导出路由对象
 */
const router = createRouter()

/**
 * 详情参考：https://github.com/vuejs/vue-router/issues/1234#issuecomment-357941465
 * 重置路由
 */
export function resetRouter() {
  const newRouter = createRouter()
  router.matcher = newRouter.matcher // 重置路由
}

/**
 * 导出路由对象
 */
export default router
