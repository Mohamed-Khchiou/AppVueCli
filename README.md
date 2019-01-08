# AppVueCli
[Master 1 MIAGE] Mini projet Javascript réalisé en Vue Cli

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build
```

For detailed explanation on how things work, consult the [docs for vue-loader](http://vuejs.github.io/vue-loader).


## Utilisation fonctionnel

Vous arrivez sur la page home de la correction du TP "Développer en mode "CLI" avec un environnement de build/testy".
En haut, vous avez un nouveau lien "restaurant", en cliquant dessus, vous vous retrouvez sur l'ancien TP, mais refait en Vue Cli avec un visuel modifié.

### Fonctionnalité 

- Au chargement, une liste de restaurants est récupérée à partir de la base de données et affichée dans un tableau.
- Possibilité d'afficher les détails d'un restaurant en cliquant sur son nom. Une popup s'ouvre avec différentes informations.
- Dans la pop-up, on peut cliquer sur "voir la carte" pour afficher un menu généré aléatoirement à partir d'un set de données.
- À droite de celle-ci, se trouve un récapitulatif de commande.
- Il est également possible de cliquer sur un élément de la carte pour l'ajouter a la commande.