import axios from "@/utils/request";


export function getSectionList(data) {
  return axios({
    url: '/getSectionList',
    method: 'post',
    data:data
  })
}

export function insertSectionOrUpdate(data) {
  return axios({
    url: '/insertSectionOrUpdate',
    method: 'post',
    data:data
  })
}

export function delSection(data) {
  return axios({
    url: '/delSection',
    method: 'post',
    data:data
  })
}


export function getPost(data) {
  return axios({
    url: '/getPost',
    method: 'post',
    data:data
  })
}

export function insertPostOrUpdate(data) {
  return axios({
    url: '/insertPostOrUpdate',
    method: 'post',
    data:data
  })
}

export function delPost(data) {
  return axios({
    url: '/delPost',
    method: 'post',
    data:data
  })
}


export function changePassword(data) {
  return axios({
    url: "/changePassword",
    method: "post",
    data
  });
}

export function login(data) {
  return axios({
    url: '/login',
    method: 'post',
    data
  })
}


export function getGoodsType(data) {
  return axios({
    url: '/getGoodsType',
    method: 'post',
    data:data
  })
}

export function insertGoodsTypeOrUpdate(data) {
  return axios({
    url: '/insertGoodsTypeOrUpdate',
    method: 'post',
    data:data
  })
}

export function delGoodsType(data) {
  return axios({
    url: '/delGoodsType',
    method: 'post',
    data:data
  })
}


export function getGoods(data) {
  return axios({
    url: '/getGoods',
    method: 'post',
    data:data
  })
}

export function insertGoodsOrUpdate(data) {
  return axios({
    url: '/insertGoodsOrUpdate',
    method: 'post',
    data:data
  })
}

export function delGoods(data) {
  return axios({
    url: '/delGoods',
    method: 'post',
    data:data
  })
}

export function getStaffs(data) {
  return axios({
    url: '/getStaffs',
    method: 'post',
    data:data
  })
}

export function insertStaffsOrUpdate(data) {
  return axios({
    url: '/insertStaffsOrUpdate',
    method: 'post',
    data:data
  })
}

export function delStaffs(data) {
  return axios({
    url: '/delStaffs',
    method: 'post',
    data:data
  })
}

export function getCustomer(data) {
  return axios({
    url: '/getCustomer',
    method: 'post',
    data:data
  })
}

export function insertCustomerOrUpdate(data) {
  return axios({
    url: '/insertCustomerOrUpdate',
    method: 'post',
    data:data
  })
}

export function delCustomer(data) {
  return axios({
    url: '/delCustomer',
    method: 'post',
    data:data
  })
}


export function getOrder(data) {
  return axios({
    url: '/getOrder',
    method: 'post',
    data:data
  })
}

export function insertOrderOrUpdate(data) {
  return axios({
    url: '/insertOrdersOrUpdate',
    method: 'post',
    data:data
  })
}


export function getCustomerFollow(data) {
  return axios({
    url: '/getCustomerFollow',
    method: 'post',
    data:data
  })
}

export function insertCustomerFollowOrUpdate(data) {
  return axios({
    url: '/insertCustomerFollowOrUpdate',
    method: 'post',
    data:data
  })
}

export function getVisit(data) {
  return axios({
    url: '/getVisit',
    method: 'post',
    data:data
  })
}

export function insertVisitOrUpdate(data) {
  return axios({
    url: '/insertVisitOrUpdate',
    method: 'post',
    data:data
  })
}

/////////////////////////////////////////////////////


export function delDepartment(data) {
  return axios({
    url: '/delDepartment',
    method: 'post',
    data:data
  })
}


export function getDepartment(data) {
  return axios({
    url: '/getDepartment',
    method: 'post',
    data:data
  })
}

export function insertDepartmentOrUpdate(data) {
  return axios({
    url: '/insertDepartmentOrUpdate',
    method: 'post',
    data:data
  })
}

export function delProxy(data) {
  return axios({
    url: '/delProxy',
    method: 'post',
    data:data
  })
}


export function getProxy(data) {
  return axios({
    url: '/getProxy',
    method: 'post',
    data:data
  })
}

export function insertProxyOrUpdate(data) {
  return axios({
    url: '/insertProxyOrUpdate',
    method: 'post',
    data:data
  })
}

export function delStandard(data) {
  return axios({
    url: '/delStandard',
    method: 'post',
    data:data
  })
}


export function getStandard(data) {
  return axios({
    url: '/getStandard',
    method: 'post',
    data:data
  })
}

export function insertStandardOrUpdate(data) {
  return axios({
    url: '/insertStandardOrUpdate',
    method: 'post',
    data:data
  })
}

export function getUserList(data) {
  return axios({
    url: '/getUserList',
    method: 'post',
    data:data
  })
}
export function insertUserOrUpdate(data) {
  return axios({
    url: '/insertUserOrUpdate',
    method: 'post',
    data:data
  })
}

export function delUser(data) {
  return axios({
    url: '/delUser',
    method: 'post',
    data:data
  })
}

export function getTask(data) {
  return axios({
    url: '/getTask',
    method: 'post',
    data:data
  })
}
export function addTask(data) {
  return axios({
    url: '/addTask',
    method: 'post',
    data:data
  })
}
export function getPlan(data) {
  return axios({
    url: '/getPlan',
    method: 'post',
    data:data
  })
}
export function addPlan(data) {
  return axios({
    url: '/addPlan',
    method: 'post',
    data:data
  })
}
export function getWork(data) {
  return axios({
    url: '/getWork',
    method: 'post',
    data:data
  })
}

export function addTaskDetail(data) {
  return axios({
    url: '/addTaskDetail',
    method: 'post',
    data:data
  })
}

export function addPlanDetail(data) {
  return axios({
    url: '/addPlanDetail',
    method: 'post',
    data:data
  })
}
export function getWorkAdmin(data) {
  return axios({
    url: '/getWorkAdmin',
    method: 'post',
    data:data
  })
}
export function getPlanDetail(data) {
  return axios({
    url: '/getPlanDetail',
    method: 'post',
    data:data
  })
}
export function getTaskDetail(data) {
  return axios({
    url: '/getTaskDetail',
    method: 'post',
    data:data
  })
}

export function getTaskByfid(data) {
  return axios({
    url: '/getTaskByfid',
    method: 'post',
    data:data
  })
}

export function updateTaskScore(data) {
  return axios({
    url: '/updateTaskScore',
    method: 'post',
    data:data
  })
}
export function updatePlanScore(data) {
  return axios({
    url: '/updatePlanScore',
    method: 'post',
    data:data
  })
}
export function getStandardByfid(data) {
  return axios({
    url: '/getStandardByfid',
    method: 'post',
    data:data
  })
}




