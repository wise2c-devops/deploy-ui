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
delteTips: 'Êtes-vous sûr de vouloir supprimer l'hôte ?',
table: {
num: 'Nomber',
name: 'Nom hôte',
ip: 'IP',
des: 'Description',
operate: 'Opération'
},
hostModal: {
modalTile: 'Hôte',
hostName: 'nom d'hôte',
hostNameTips: 'S'il vous plaît entrer le nom de l'hôte',
hostIp: 'adresse ip hôte',
hostIpTips: 'S'il vous plaît entrer une adresse IP validenter le nom de l'hôte',
hostDescrtipion: 'Description'
}
}

const componets = {
startInstallButton: 'Démarrer installation',
resets: 'Reset',
addComponentsButton: 'Ajouter composant',
delteTips: 'Êtes-vous sûr de vouloir supprimer le service ?',
startInstallCulsterTips: 'Confirmez le début de l'installation du cluster',
resetTips: 'Confirmer que le cluster est réinitialisé à l'état initial ?',
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
tips: 'S'il vous plaît, saisir une entrer valide'
}
}

module.exports ={
slectEmpty: 'vide',
layer: {
toggle: 'Validation du changement de langage',
tips: 'Attention',
deleteSuccess: 'Supprimer terminé',
createSuccess: 'Création terminé',
editSuccess: 'Mise à jour terminé',
warnTips: 'S'il vous plaît remplir les paramètres requis et le soumettre'
},
tipsButton: {
ok: 'Ok',
cancel: 'Annuler',
next: 'Suivant',
prev: 'Précédent',
back: 'Retour',
done: 'Terminé'
},
Index: Index,
clusters: clusters,
host: host,
componets: componets
}
