<template>
	<div id="carte">
		<h3>Carte du restaurant</h3>
		<app-commande>
			<template slot="articles">
				<div id="articles">
					<p v-for="e, index in commandeRecap.articles">{{e.name}}<span style="float:right;">{{e.price}} </span></p>
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
                <tr v-for="r,index in randomAppetizer">
                    <td class="foodName" v-on:click="addAppetizer(index)">{{r.name}}</br><span style="font-size:80%;">{{r.description}}</span></td>
                    <td class="foodPrice">{{r.price}}€</td>
                </tr>
            </tbody>
        </table>

		<table>
            <tr>
                <th colspan="2">Plats</th>
            </tr>
            <tbody>
                <tr v-for="r,index in randomMeals">
                    <td class="foodName"  v-on:click="addMeal(index)">{{r.name}}</br><span style="font-size:80%;">{{r.description}}</span></td>
                    <td class="foodPrice">{{r.price}}€</td>
                </tr>
            </tbody>
        </table>

        <table>
            <tr>
                <th colspan="2">Desserts</th>
            </tr>
            <tbody>
                <tr v-for="r,index in randomDesserts">
                    <td class="foodName" v-on:click="addDessert(index)">{{r.name}}</td>
                    <td class="foodPrice">{{r.price}}€</td>
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
			appetizers:[{
				name:'Pissaladiere',
				description :'Recette Niçoise.',
				price:8.90
			},
			{
				name:'Saumon fumé Maison',
				description :'crème ciboulette et ses toasts',
				price:14.90
			},
			{
				name:'Carpaccio de thon et de Saint-Jacques',
				description :'fines trances de thon et Saint-Jaques au basilic',
				price:12.90
			},
			{
				name:'Soupe de poissons Maison',
				description :'avec rouille, croutons et rapé',
				price:11.90
			},
			{
				name:'Cuisses de grenouilles',
				description :'en persillade',
				price:15.90
			}],
			//Meals list
			Meals:[{
				name:'Tartare de boeuf',
				description :'',
				price:17.20
			},
			{
				name:'Tartare César poelé aller-retour',
				description :'',
				price:17.50
			},
			{
				name:'Tartare Parmegiano',
				description :'',
				price:17.50
			},
			{
				name:'Carpaccio de boeuf',
				description :'parmesan ou gorgonzola ou basilic, frites ou salade',
				price:13.90
			},
			{
				name:'Entrecote grillée',
				description :'sauce au choix',
				price:23.90
			},
			{
				name:'Onglet de boeuf poelé',
				description :'à l\'echalote',
				price:17.90
			},
			{
				name:'Magret de canard français',
				description :'rôti au miel',
				price:17.90
			},
			{
				name:'Aiguillette de volaille',
				description :'',
				price:16.90
			},
			{
				name:'Moules marinières / Frites',
				description :'',
				price:13.90
			}],
			//Desserts list
			desserts:[{
				name:'Tarte tatin',
				description :'',
				price:7.00
			},
			{
				name:'Mousse au chocolat',
				description :'',
				price:7.00
			},
			{
				name:'Crème brulée vanillée',
				description :'',
				price:7.00
			},
			{
				name:'Profiteroles au chocolat',
				description :'',
				price:7.50
			},
			{
				name:'Fondant au chocolat',
				description :'',
				price:7.00
			},
			{
				name:'Café gourmand',
				description :'',
				price:8.00
			},
			{
				name:'Tiramisu',
				description :'',
				price:7.00
			}],
			randomAppetizer:[{
				name:'',
				description :'',
				price:0
			}],
			randomMeals:[{
				name:'',
				description :'',
				price:0
			}],
			randomDesserts:[{
				name:'',
				description :'',
				price:0
			}],
			commandeRecap:{
				articles:[{
					name:'',
					price:0					
				}],
				total:0
			}
		}
	},
	components: { 				// LOCAL COMPONENTS
		'app-commande': Commande 
	},
    mounted() {
		// Initializes a random list of meals
  		this.randomAppetizer = this.shuffle(this.appetizers).slice(0, 4);
  		this.randomMeals = this.shuffle(this.Meals).slice(0, 6);
  		this.randomDesserts = this.shuffle(this.desserts).slice(0, 4);		
    },
    methods: {
		// return randomly sorted array
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
		// add new item to the order
		addAppetizer(index){
			var article = this.randomAppetizer[index];
			this.commandeRecap.articles.push(article);
			// add the current item price to total and round it
			this.commandeRecap.total = Math.round(100*(this.commandeRecap.total+article.price))/100;
		},
		addMeal(index){
			var article = this.randomMeals[index];
			this.commandeRecap.articles.push(article);
			// add the current item price to total and round it
			this.commandeRecap.total = Math.round(100*(this.commandeRecap.total+article.price))/100;
		},
		addDessert(index){
			var article = this.randomDesserts[index];
			this.commandeRecap.articles.push(article);
			// add the current item price to total and round it
			this.commandeRecap.total = Math.round(100*(this.commandeRecap.total+article.price))/100;
		}
	}
	
}
</script>


<style>
	table {
		border: 0px;
		width: 40%;
		margin: auto;
		border-collapse: collapse;
	}

	th{
		width: 30%;
		font-size: 200%;
		color: #42b983;
	}

	td {
		padding: 5px;
	}

	.foodName:hover {
		text-shadow: 2px 2px 10px #42b983;
	}
	.foodName{	
		text-align:left;
	}
	.foodPrice{	
		text-align:right;
	}
	#articles{
		text-align:left;
		margin-left:5px;
	}
	body{	
		overflow: auto; 
	}
</style>