import $ from 'jquery'
let routes = [
  {
    path: '/',
    name: 'index',
    redirect: '/',
    component: () => import(/* webpackChunkName: "basicIndex" */ '../layouts/BasicLayout'),
    children: [
      {
        path: '/',
        name: '首页1',
        isNav: true,
        component: () => import(/* webpackChunkName: "contentIndex" */ '../layouts/ContentLayout'),
        redirect: '/',
        children: [
          {
            path: '/',
            name: '首页',
            isNav: true,
            component: () => import(/* webpackChunkName: "index" */ '../views/Content.vue'),
            meta: {
              title: '首页 - SHIJTING'
            }
          },
          {
            path: '/detail',
            name: 'detail',
            component: () => import(/* webpackChunkName: "detail" */ '../views/Detail')
          },
          {
            path: '/tag',
            name: 'tag',
            component: () => import(/* webpackChunkName: "tag" */ '../views/Content.vue')
          }
        ]
      }
    ]
  },
  {
    path: '*',
    name: '404',
    component: () => import(/* webpackChunkName: "404" */ '../layouts/UserLayout'),
    redirect: '/404',
    children: [
      {
        path: '/404',
        name: 'exception404',
        component: () => import(/* webpackChunkName: "exception404" */ '../views/Exception/404.vue'),
        meta: {
          title: '404-页面开发中..'
        }
      }
    ]
  }
]
function getCategory () {
  $.ajax({
    url: 'https://blog.twho.top/cate',
    type: 'get',
    data: {},
    dataType: 'json',
    async: false,
    success: function (res) {
      const category = res.data.category
      category.forEach(item => {
        routes[0].children[0].children.push({ path: `/${item.id}`, name: `${item.category_name}`, isNav: true, meta: { title: `${item.category_name} - SHIJTING` }, component: () => import(/* webpackChunkName: "cate" */ '../views/Content.vue') })
      })
    }
  })
}
getCategory()
export default routes
