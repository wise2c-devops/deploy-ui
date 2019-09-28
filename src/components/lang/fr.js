const Index = {
  title: 'Bienvenue à utiliser le système de déploiement de composants kubernetes',
  button: 'démarrer',
  developers: 'Développeur',
  contact: 'Contactez nous'
}
const clusters = {
  add: {
    modalTile: 'Ajouter clusters',
    clusterName: 'Nom du cluster',
    clusterNameTips: 'Veuillez entrer le nom du cluster',
    clusterDescrtipion: 'Description'
  },
  menu: {
    host: 'Hôte',
    serviceComponents: 'Composants de service',
    installLog: 'Install logs'
  },
  delteTips: 'Êtes-vous sûr de vouloir supprimer le cluster??',
  routerName: 'Cluster'
}
const host = {
  addHostButton: 'Ajout hôte',
  delteTips: `Êtes-vous sûr de vouloir supprimer l'hôte ?`,
  table: {
    num: 'Nomber',
    name: 'Nom hôte',
    ip: 'IP/FQDN',
    des: 'Description',
    operate: 'Opération'
  },
  hostModal: {
    modalTile: 'Hôte',
    hostName: `nom d'hôte`,
    hostNameTips: `S'il vous plaît entrer le nom de l'hôte`,
    hostIp: 'adresse ip ou fqdn hôte', 
    hostIpTips: `S'il vous plaît entrer une IP/FQDN validenter le nom de l'hôte`,
    hostDescrtipion: 'Description'
  }
}

const components = {
  startInstallButton: 'Démarrer installation',
  resets: 'Reset',
  addComponentsButton: 'Ajouter composant',
  addComponentsTips: 'Il n’y a plus d’composant à ajouter',
  delteTips: 'Êtes-vous sûr de vouloir supprimer le service ?',
  startInstallCulsterTips: `Confirmez le début de l'installation du cluster`,
  resetTips: `Confirmer que le cluster est réinitialisé à l'état initial ?`,
  resetSuccessMsg: 'Réinitialisation réussie. Le système a besoin de temps pour traiter la demande. Veuillez actualiser la page plus tard',
  table: {
    num: 'Nombre',
    serviceName: 'Nom de service',
    version: 'Version',
    attribute: 'Attribute',
    host: 'Hôte',
    operate: 'Operation'
  },
  componentModal: {
    modalTile: 'Service composant',
    componentType: 'Type de composant',
    version: 'Version',
    hostTips: 'Sélectionnez au moins un hôte',
    tips: `S'il vous plaît, saisir une entrer valide`
  }
}

const errorMsg = {
  errGetCluster: `Impossible d'obtenir le cluster`,
  errAddCluster: `L'ajout d'un cluster a échoué`,
  errDeleteCluster: `Échec de la suppression du cluster`,
  errGetCulsterDetail: `Impossible d'obtenir les détails du cluster`,
  errGetHostList: `Impossible d'obtenir la liste des hôtes sous le cluster`,
  errGetCmponentList: `Impossible d'obtenir la liste des composants de service sous le cluster`,
  errGetCulsterState: `Impossible d'obtenir le statut du cluster`,

  errAddHost: `Echec de l'ajout d'hôte`,
  errDelHost: `La suppression d'un hôte a échoué`,
  errUpdateHost: `Echec de la mise à jour de l'hôte`,

  errAddComponent: `La création du composant de service a échoué`,
  errDeleteComponent: `Échec de la suppression du composant`,
  errUpdateComponent: `Le composant de mise à jour a échoué`,
  errGetComponentType: `Impossible d'obtenir le type de composant`,
  errGetComponentVersion: `Impossible d'obtenir les informations de version du composant`,
  errGetComponentProperties: `Impossible d'obtenir les propriétés du composant`,

  errDeploy: `Impossible d'exécuter la commande de déploiement, veuillez réessayer ultérieurement.`,
  errGetInstallCulsterLog: `Échec d'obtention du journal d'installation du cluster`
}

module.exports = {
  slectPlaceholder: `S'il vous plaît choisir`,
  slectEmpty: 'vide',
  layer: {
    toggle: 'Validation du changement de langage',
    tips: 'Attention',
    deleteSuccess: 'Supprimer terminé',
    createSuccess: 'Création terminé',
    editSuccess: 'Mise à jour terminé',
    warnTips: `S'il vous plaît remplir les paramètres requis et le soumettre`
  },
  tipsButton: {
    ok: 'Ok',
    cancel: 'Annuler',
    next: 'Suivant',
    prev: 'Précédent',
    back: 'Retour',
    done: 'Terminé'
  },
  Index,
  clusters,
  host,
  components,
  errorMsg
}
