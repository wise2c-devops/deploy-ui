const Index = {
  title: '欢迎使用 Kubernetes 组件部署系统',
  button: '开始',
  developers: '开发者',
  contact: '联系我们'
}
const clusters = {
  add: {
    modalTile: '添加集群',
    clusterName: '集群名称',
    clusterNameTips: '请输入集群名称',
    clusterDescrtipion: '集群描述'
  },
  menu: {
    host: '主机',
    serviceComponents: '服务组件',
    installLog: '安装日志'
  },
  delteTips: '确定要删除该集群吗',
  routerName: '集群'
}
const host = {
  addHostButton: '添加主机',
  delteTips: '确定要删除该主机吗',
  table: {
    num: '序号',
    name: '名称',
    ip: 'IP',
    des: '描述',
    operate: '操作'
  },
  hostModal: {
    modalTile: '主机',
    hostName: '主机名称',
    hostNameTips: '请输入主机名称',
    hostIp: '主机 IP',
    hostIpTips: '请输入有效的IP地址',
    hostDescrtipion: '描述信息'
  }
}

const componets = {
  startInstallButton: '开始安装',
  resets: '重置',
  addComponentsButton: '添加组件',
  delteTips: '确定要删除该服务吗',
  startInstallCulsterTips: '确认开始安装集群',
  resetTips: '确认重置该集群到初始状态？',
  resetSuccessMsg: '重置成功，系统需要一些时间处理请求，请稍后刷新页面查看',
  table: {
    num: '序号',
    serviceName: '服务名称',
    version: '版本',
    attribute: '属性',
    host: '主机',
    operate: '操作'
  },
  componentModal: {
    modalTile: '服务组件',
    componentType: '组件类型',
    version: '版本',
    hostTips :'至少选择一个主机',
    tips: '请输入有效的'
  }
}

const errorMsg = {
  errGetCluster: '获取集群失败',
  errAddCluster: '添加集群失败',
  errDeleteCluster: '删除集群失败',
  errGetCulsterDetail: '获取集群详情失败',
  errGetHostList: '获取集群下主机列表失败',
  errGetCmponentList: '获取集群下服务组件列表失败',
  errGetCulsterState: '获取集群状态失败',

  errAddHost: '添加主机失败',
  errDelHost: '删除主机失败',
  errUpdateHost: '更新主机失败',

  errAddComponent: '创建服务组件失败',
  errDeleteComponent: '删除组件失败',
  errUpdateComponent: '更新组件失败',
  errGetComponentType: '获取组件类型失败',
  errGetComponentVersion: '获取组件版本信息失败',
  errGetComponentProperties: '获取组件属性失败',

  errDeploy: '无法执行部署命令，请稍后重试',
  errGetInstallCulsterLog: '获取集群安装日志失败'
}

module.exports = {
  slectPlaceholder: '请选择',
  slectEmpty: '无数据',
  layer: {
    toggle: '确定切换语言吗',
    tips: '提示',
    deleteSuccess: '删除成功',
    createSuccess: '创建成功',
    editSuccess: '更新成功',
    warnTips: '请填充必须参数后再进行提交'
  },
  tipsButton: {
    ok: '确 定',
    cancel: '取 消',
    next: '下一步',
    prev: '上一步',
    back: '返 回',
    done: '完 成'
  },
  Index,
  clusters,
  host,
  componets,
  errorMsg
}
