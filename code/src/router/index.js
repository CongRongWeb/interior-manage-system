// 导入组件
import Vue from 'vue';
import Router from 'vue-router';
// 登录
import login from '@/views/login';
// 首页
import index from '@/views/index';
/**
 * 基础菜单
 */

import userManagement from "../views/userManagement/index"
import departmentManagement from "../views/departmentManagement/index.vue";
import proxyManagement from "../views/proxyManagement/index.vue";
import standardManagement from "../views/standardManagement/index.vue";
import taskManagement from "../views/taskManagement/index.vue";
import planManagement from "../views/planManagement/index.vue";
import workManagement from "../views/workManagement/index.vue";
import assessManagement from "../views/assessManagement/index.vue";
import monthSummary from "../views/monthSummary/index.vue";
// 启用路由
Vue.use(Router);

// 导出路由
export default new Router({
    routes: [{
        path: '/',
        name: '',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    }, {
        path: '/login',
        name: '登录',
        component: login,
        hidden: true,
        meta: {
            requireAuth: false
        }
    }, {
        path: '/index',
        name: '首页',
        component: index,
        iconCls: 'el-icon-tickets',
        children: [{
            path: '/userManagement',
            name: '用户管理',
            component: userManagement,
            meta: {
                requireAuth: true
            }
        },{
            path: '/departmentManagement',
            name: '部门管理',
            component: departmentManagement,
            meta: {
                requireAuth: true
            }
        },{
          path: '/proxyManagement',
          name: '指标管理',
          component: proxyManagement,
          meta: {
            requireAuth: true
          }
        }, {
          path: '/standardManagement',
          name: '标准管理',
          component: standardManagement,
          meta: {
            requireAuth: true
          }
        }, {
            path: '/taskManagement',
            name: '任务管理',
            component:taskManagement,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/planManagement',
            name: '计划管理',
            component: planManagement,
            meta: {
                requireAuth: true
            }
        }, {
            path: '/workManagement',
            name: '工作管理',
            component: workManagement,
            meta: {
                requireAuth: true
            }
        },
          {
            path: '/assessManagement',
            name: '考评管理',
            component: assessManagement,
            meta: {
              requireAuth: true
            }
          }, {
            path: '/monthSummary',
            name: '月度汇总报表',
            component: monthSummary,
            meta: {
              requireAuth: true
            }
          }

        ]
    }]
})
