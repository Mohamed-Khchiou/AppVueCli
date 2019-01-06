<template>
	<div id="carte">
		<h3>Carte du restaurant</h3>
		<app-commande>
			<template slot="articles">
				<div id="articles">
					<p v-for="e, index in commandeRecap.articles">{{e.nom}}<span style="float:right;">{{e.prix}} </span></p>
				</div>
			</template>

			<template slot="total">
				<p>Total : <span style="float:right;">{{commandeRecap.total}}€ </span></p>
			</template>
		</app-commande>
		<table>
            <tr>
                <th colspan="2">Entrées</th>
            </tr>
            <tbody>
                <tr v-for="r,index in randEntree">
                    <td class="nomBouffe" v-on:click="ajouterArticle(index)">{{r.nom}}</br>{{r.description}}</td>
                    <td class="prixBouffe">{{r.prix}}€</td>
                </tr>
            </tbody>
        </table>

		<table>
            <tr>
                <th colspan="2">Plats</th>
            </tr>
            <tbody>
                <tr v-for="r,index in randPlats">
                    <td class="nomBouffe">{{r.nom}}</br>{{r.description}}</td>
                    <td class="prixBouffe">{{r.prix}}€</td>
                </tr>
            </tbody>
        </table>

        <table>
            <tr>
                <th colspan="2">Desserts</th>
            </tr>
            <tbody>
                <tr v-for="r,index in randDesserts">
                    <td class="nomBouffe">{{r.nom}}</td>
                    <td class="prixBouffe">{{r.prix}}€</td>
                </tr>
            </tbody>
        </table>

	</div>

</template>

<script>

import Commande from './Commande.vue'; // LOCAL COMPONENT

export default {
	data() {
		return {
			// les entrées
			entrees:[{
				nom:'Pissaladiere',
				description :'Recette Niçoise.',
				prix:8.90
			},
			{
				nom:'Saumon fumé Maison',
				description :'crème ciboulette et ses toasts',
				prix:14.90
			},
			{
				nom:'Carpaccio de thon et de Saint-Jacques',
				description :'fines trances de thon et Saint-Jaques au basilic',
				prix:12.90
			},
			{
				nom:'Soupe de poissons Maison',
				description :'avec rouille, croutons et rapé',
				prix:11.90
			},
			{
				nom:'Cuisses de grenouilles',
				description :'en persillade',
				prix:15.90
			}],
			//<!-- les plats -->
			plats:[{
				nom:'Tartare de boeuf',
				description :'',
				prix:17.20
			},
			{
				nom:'Tartare César poelé aller-retour',
				description :'',
				prix:17.50
			},
			{
				nom:'Tartare Parmegiano',
				description :'',
				prix:17.50
			},
			{
				nom:'Carpaccio de boeuf',
				description :'parmesan ou gorgonzola ou basilic, frites ou salade',
				prix:13.90
			},
			{
				nom:'Entrecote grillée',
				description :'sauce au choix',
				prix:23.90
			},
			{
				nom:'Onglet de boeuf poelé',
				description :'à l\'echalote',
				prix:17.90
			},
			{
				nom:'Magret de canard français',
				description :'rôti au miel',
				prix:17.90
			},
			{
				nom:'Aiguillette de volaille',
				description :'',
				prix:16.90
			},
			{
				nom:'Moules marinières / Frites',
				description :'',
				prix:13.90
			}],
			//<!-- les desserts -->
			desserts:[{
				nom:'Tarte tatin',
				description :'',
				prix:7.00
			},
			{
				nom:'Mousse au chocolat',
				description :'',
				prix:7.00
			},
			{
				nom:'Crème brulée vanillée',
				description :'',
				prix:7.00
			},
			{
				nom:'Profiteroles au chocolat',
				description :'',
				prix:7.50
			},
			{
				nom:'Fondant au chocolat',
				description :'',
				prix:7.00
			},
			{
				nom:'Café gourmand',
				description :'',
				prix:8.00
			},
			{
				nom:'Tiramisu',
				description :'',
				prix:7.00
			}],
			randEntree:[{
				nom:'',
				description :'',
				prix:0
			}],
			randPlats:[{
				nom:'',
				description :'',
				prix:0
			}],
			randDesserts:[{
				nom:'',
				description :'',
				prix:0
			}],
			commandeRecap:{
				articles:[{
					nom:'',
					prix:0,
					quantite:0,
					
				}],
				total:0
			}
		}
	},
	components: { 				// LOCAL COMPONENTS
		'app-commande': Commande 
	},
    mounted() {
  		this.randEntree = this.shuffle(this.entrees).slice(0, 4);
  		this.randPlats = this.shuffle(this.plats).slice(0, 6);
  		this.randDesserts = this.shuffle(this.desserts).slice(0, 4);
		
		console.log(this.randEntree);
    },
    methods: {
		shuffle(array) {
			var currentIndex = array.length, temporaryValue, randomIndex;

			// While there remain elements to shuffle...
			while (0 !== currentIndex) {

				// Pick a remaining element...
				randomIndex = Math.floor(Math.random() * currentIndex);
				currentIndex -= 1;

				// And swap it with the current element.
				temporaryValue = array[currentIndex];
				array[currentIndex] = array[randomIndex];
				array[randomIndex] = temporaryValue;
			}

			return array;
		},
		ajouterArticle(index){
			console.log(index);
			var article = this.randEntree[index];
			this.commandeRecap.articles.push(article);
			this.commandeRecap.total += article.prix;			
  			this.commandeRecap.total= Math.round(100*this.commandeRecap.total)/100;
		}
	}
	
}
</script>


<style>
table {
    border: 0px;
    width: 50%;
	margin: auto;
    border-collapse: collapse;
}

th{
    width: 30%;
	font-size: 200%;
  	color: #42b983;
}

tr,
td {
}

td {
    padding: 5px;
}

.nomBouffe:hover {
	text-shadow: 2px 2px 10px #42b983;
}
.nomBouffe{	
	text-align:left;
}
.prixBouffe{	
	text-align:right;
}

.inactif {
    disabled:true;
    color:lightGrey;
}
.center-div
{
  margin: 0 auto;
  width: 600px;
  height: auto;
  text-align: center;
}
#articles{
	text-align:left;
	margin-left:5px;
}
body{
	
overflow: auto; 
}
</style>