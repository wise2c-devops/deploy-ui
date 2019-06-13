const Index = {
  title: 'Welcome to Breeze - kubernetes components deployment system',
  button: 'start',
  developers: 'Developer',
  contact: 'Contact us'
}
const clusters = {
  add: {
    modalTile: 'Add clusters',
    clusterName: 'Cluster name',
    clusterNameTips: 'Please enter the cluster name',
    clusterDescrtipion: 'Descrtipion'
  },
  menu: {
    host: 'Host',
    serviceComponents: 'Service components',
    installLog: 'Install logs'
  },
  delteTips: 'Are you sure you want to delete the cluster?',
  routerName: 'Cluster'
}
const host = {
  addHostButton: 'Add host',
  delteTips: 'Are you sure you want to delete the host?',
  table: {
    num: 'Number',
    name: 'Host name',
    ip: 'IP',
    des: 'Description',
    operate: 'Operation'
  },
  hostModal: {
    modalTile: 'Host',
    hostName: 'Host name',
    hostNameTips: 'Please enter the name of the host',
    hostIp: 'Host ip',
    hostIpTips: 'Please enter a valid ip address',
    hostDescrtipion: 'Description'
  }
}

const serviceComponent = {
  startInstallButton: 'Start install',
  resets: 'Reset',
  addComponentsButton: 'Add component',
  addComponentsTips: 'There is no more component to add',
  delteTips: 'Are you sure you want to delete the service?',
  startInstallCulsterTips: 'Are you sure you want to start the installation? Existing cluster data will probably be overwritten.',
  resetTips: 'Are you sure you want to reset/remove those selected components?',
  resetSuccessMsg: 'It will take some time to complete the resetting process. Please refresh the "Install Logs" page to get the results from time to time.',
  table: {
    num: 'Number',
    serviceName: 'Service name',
    version: 'Version',
    attribute: 'Attribute',
    host: 'Host',
    operate: 'Operation'
  },
  componentModal: {
    modalTile: 'Service component',
    componentType: 'Component type',
    version: 'Version',
    hostTips: 'Select at least one host',
    tips: 'Please enter a valid'
  }
}

const errorMsg = {
  errGetCluster: 'Failed to get cluster',
  errAddCluster: 'Adding a cluster failed',
  errDeleteCluster: 'Failed to delete cluster',
  errGetCulsterDetail: 'Failed to get cluster details',
  errGetHostList: 'Failed to get the host list under the cluster',
  errGetCmponentList: 'Failed to get the list of service components under the cluster',
  errGetCulsterState: 'Failed to get cluster status',

  errAddHost: 'Add host failed',
  errDelHost: 'Deleting a host failed',
  errUpdateHost: 'Update host failed',

  errAddComponent: 'Create service component failed',
  errDeleteComponent: 'Failed to delete component',
  errUpdateComponent: 'Update component failed',
  errGetComponentType: 'Failed to get component type',
  errGetComponentVersion: 'Failed to get component version information',
  errGetComponentProperties: 'Failed to get component properties',

  errDeploy: 'Unable to execute deployment command, please try again later',
  errGetInstallCulsterLog: 'Failed to get cluster installation log'
}

module.exports = {
  slectPlaceholder: 'please choose',
  slectEmpty: 'empty',
  layer: {
    toggle: 'Do you really want to switch the language ?',
    tips: 'Warning',
    deleteSuccess: 'Delete completed',
    createSuccess: 'Create completed',
    editSuccess: 'Update completed',
    warnTips: 'Please fill in all the required parameters first'
  },
  tipsButton: {
    ok: 'Ok',
    cancel: 'Cancel',
    next: 'Next step',
    prev: 'Last step',
    back: 'Back',
    done: 'Done',
    fail: 'failure'
  },
  Index,
  clusters,
  host,
  serviceComponent,
  errorMsg
}
