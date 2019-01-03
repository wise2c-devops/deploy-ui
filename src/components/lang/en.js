const Index = {
  title: 'Welcome to use the kubernetes component deployment system',
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
  delteTips: 'Are you sure you want to delete the cluster ?',
  routerName: 'Cluster'
}
const host = {
  addHostButton: 'Add host',
  delteTips: 'Are you sure you want to delete the host ?',
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

const componets = {
  startInstallButton: 'Start install',
  resets: 'Reset',
  addComponentsButton: 'Add component',
  addComponentsTips: 'No components are available for adding',
  delteTips: 'Are you sure you want to delete the service ?',
  startInstallCulsterTips: 'Confirm to start installing the cluster',
  resetTips: 'Confirm resetting the cluster to its initial state?',
  resetSuccessMsg: 'Resetting is successful. The system needs some time to process the request. Please refresh the page later',
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

module.exports ={
  slectEmpty: 'empty',
  layer: {
    toggle: 'Do you determine the handover language',
    tips: 'Warning',
    deleteSuccess: 'Delete completed',
    createSuccess: 'Create completed',
    editSuccess: 'Update completed',
    warnTips: 'Please fill in the required parameters before submitting'
  },
  tipsButton: {
    ok: 'Ok',
    cancel: 'Cancel',
    next: 'Next step',
    prev: 'Last step',
    back: 'Back',
    done: 'Done',
    fail: 'Failed'
  },
  Index: Index,
  clusters: clusters,
  host: host,
  componets: componets
}