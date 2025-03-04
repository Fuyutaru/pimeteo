# 🌞 Projet Pimeteo 🌞

[![Vue.js](https://img.shields.io/badge/vuejs-%2335495e.svg?style=for-the-badge&logo=vuedotjs&logoColor=%234FC08D)](https://vuejs.org/)
![Bootstrap](https://img.shields.io/badge/bootstrap-%238511FA.svg?style=for-the-badge&logo=bootstrap&logoColor=white)
![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB)
![InfluxDB](https://img.shields.io/badge/InfluxDB-22ADF6?style=for-the-badge&logo=InfluxDB&logoColor=white)

Le but du projet est de réaliser la partie Software d'une station météo composé de sondes et d'une centrale en utilisant exclusivement des technologies web et des raspberry Pi (miam!)

# 🚀 Démarrage 🚀

Il faut que vous soyez sur un ordi de l'école et que les raspberrys soient bien branchés en L309 avec leurs services lancés pour voir notre dashboard météo fait avec énormément de passion, accessible à l'adresse : [http://piensg028.ensg.eu:3000](http://piensg028.ensg.eu:3000)

# 🤔 Guide utilisateur 🤔

Vous avez accès à trois vues :

- Live, présentant toutes les dernières données disponible pour une sonde.
- History, présentant l'historique des données pour une sonde sur une période donnée.
- Map, présentant la position de toutes les sondes sur une carte web.

Pour naviguer entre les différentes vues, cliquez sur les boutons associés situés sur la droite dans la boite affichant la date actuelle.

## 🔴 Live

- Pour visualiser les données des capteurs souhaités cliquez sur les checkbox du menu Sensor qui sur trouve sur le coté gauche du board.
- Pour visualiser les données des autres stations cliquez sur les boutons situés sur le header du dashboard, les checkbox restent selectionnés lorsque vous changez de station afin de vous permettre de comparer agréablement les données des stations.

## 🗓️ History

1. Choissisez tout d'abord les capteurs qui vous intéressent en clicquant sur les checkbox comme dans la vue Live.

2. Choissisez ensuite une période donnée en cliquant sur les radios ou en selectionnant une date personnalisée en cliquant sur l'input associé :

   - Dans le calendrier qui s'affiche, vous pouvez sélectionner une période donnée ou un seul jour en cliquant une seul fois sur le jour souhaité et une horaire donnée en faisant glisser les sliders en bas du calendrier, cela affichera les données depuis ce jour jusqu'à maintenant.

   - La période que vous aurez séléctionnée s'affiche dans le menu, une fois satisfait, cliquez sur le bouton vert See Results, pour voir les résultats.

### Notes

Les données de notre station peuvent prendre du temps à charger, pendant ce temps plus ou moins long vous pouvez donc admirer une boussole qui tourne.

## 🗺️ Map

Dans cette vue, vous pouvez voir l'emplacement des stations météo, si vous cliquez sur les boutons des stations situés dans le header, cela vous centrera la carte sur la station que vous avez sélectionné.
