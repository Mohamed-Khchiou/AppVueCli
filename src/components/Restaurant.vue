<template>
	<div>
        <h3>Restaurants</h3>
        
        <form v-on:submit="ajouterRestaurant">
            <label>
                Nom : <input type="text" name="nom" required v-model="nom">
            </label>
            <label>
                Cuisine : <input type="text" name="cuisine" required v-model="cuisine">
            </label>

            <button>Ajouter</button>
        </form>
        <p>
            <label>
                Rechercher par nom : 
                <input type="text" v-on:input="getRestaurantsFromServer()" 
                    v-model="nomRecherche">
            </label>
        </p>

        <div id ="divModification" style="display: none;">
            <form id="formulaireModification" v-on:submit="modifierRestaurant">
                <fieldset>
                    <legend>Modification d'un restaurant</legend>
                    <label>
                        Id: <input type="text" name="_id" id="idModification"
                        value="" required placeholder="Id du restaurant à modifier" readonly>
                    </label>
                    <p></p>
                    <label>
                        Nom: <input type="text" name="nom" id="nomModification"
                        value="" required placeholder="Nom du restaurant">
                    </label>
                    <p></p>
                    <label>
                        Cuisine: <input type="text" name="cuisine" id="cuisineModification" 
                        value="" required placeholder="Cuisine française">
                    </label>
                    <p></p>
                    <button>Modifier ce restaurant</button>
                </fieldset>
            </form>
        </div>
        
        <h1>Nombre de restaurants : {{nbRestaurants}}, nb pages = {{nbPagesDeResultats}}</h1>
        <p> 
            <input type="range" v-on:input="getRestaurantsFromServer()" 
                value=10 min=2 max =100 
                v-model="pagesize"
            > : {{this.pagesize}}
        </p>

        <!-- modal for restaurant details-->
        <div id="modal">
        <!-- use the modal component, pass in the prop -->
        <app-restau-detail v-if="showModal" @close="showModal = false">

            <h3 slot="header">Details du restaurant</h3>
            <template slot="body">
                <p><b>Nom :</b> {{detailResto.name}}</p>            
                <p><b>Cuisine :</b> {{detailResto.cuisine}}</p>
                <router-link to="/carte">Voir la carte</router-link>

                </br>
                <h3>Adresse :</h3>
                <!-- Verification de l'existance de l'adresse-->
                <div v-if="detailResto.address !== undefined">
                    <p>{{detailResto.address.building}}</p>
                    <p>{{detailResto.address.street}}</p>
                    <p>{{detailResto.address.zipcode}}</p>
                </div>
                <div v-else>
                    <p>Inconnue</p>
                </div>
                
                <img width="100%" src="../assets/restoImg.jpg">
            </template>

        </app-restau-detail>
        </div>

        <table>
            <tr>
                <th>Nom</th>
                <th>Cuisine</th>
                <th colspan="2">Edition</th>
            </tr>
            <tbody>
                <tr v-for="r,index in restaurants" 
                    v-bind:style="{backgroundColor:getColor(index)}">
                    <td v-on:click="detailsRestaurant(index)" class="foodName">{{r.name}}</td>
                    <td> {{r.cuisine}}</td>
                    <td><button v-on:click="supprimerRestaurant(index)">Supprimer</button></td>
                    <td><button v-on:click="formModifierRestaurant(index)">Modifier</button></td>
                </tr>
            </tbody>
        </table>
        <div id ="pagination" class="center-div">
            <button v-on:click="firstPage()"  
                    v-bind:class="{inactif:(page==0)}">Premiere page</button>
            <button v-on:click="pagePrecedente()"  
                    v-bind:class="{inactif:(page==0)}">Page Precedente</button>
            <button v-on:click="pageSuivante()"
                    v-bind:class="{inactif:(page == (nbPagesDeResultats-1))}"
            >
                Page Suivante</button>
            <button v-on:click="lastPage()"  
                    v-bind:class="{inactif:(page == (nbPagesDeResultats-1))}">Derniere page</button>
        </div>
    </div>
    
</template>


<script>


import Modal from './Modal.vue'; // LOCAL COMPONENT

export default {
	data() {
        return {
            restaurants: [{
            
            },
            {
                name: 'Cuisine de Mamie',
                cuisine: 'En grande quantité'
            }
            ],
            showModal: false,
            nbRestaurants: 0,
            nbPagesDeResultats: 0,
            nom: '',
            cuisine: '',
            page: 0,
            pagesize: 10,
            nomRecherche: "",
            detailResto:{
                name: '',
                cuisine: '',
                address:{
                    building:'',
                    street:'',
                    zipcode:''
                }
            }
        }
        
	},
	components: { 				// LOCAL COMPONENTS
		'app-restau-detail': Modal 
	},
    mounted() {
        console.log("AVANT AFFICHAGE");
        this.getRestaurantsFromServer();
    },
    methods: {
        getRestaurantsFromServer() {
            let url = "http://localhost:8080/api/restaurants?page=" +
                this.page +
                "&pagesize=" + this.pagesize +
                "&name=" + this.nomRecherche;

            // ARROW FUNCTIONS PRESERVENT LE THIS !!!
            fetch(url)
                .then((responseJSON) => {
                    responseJSON.json()
                        .then((responseJS) => {
                            // Maintenant res est un vrai objet JavaScript
                            console.log("restaurants récupérés");
                            //console.log(responseJS);
                            this.restaurants = responseJS.data;
                            this.nbRestaurants = responseJS.count;
                            this.nbPagesDeResultats = Math.ceil(this.nbRestaurants / this.pagesize);
                        });
                })
                .catch(function (err) {
                    console.log(err);
                });
        },
        supprimerRestaurant(index) {
            var id = this.restaurants[index]._id;
            console.log("on supprime le restaurant id=" + id);

            let url = "http://localhost:8080/api/restaurants/" + id;

            fetch(url, {
                method: "DELETE",
            })
                .then((responseJSON) => {
                    responseJSON.json()
                        .then((responseJS) =>{
                            // Maintenant res est un vrai objet JavaScript
                            console.log(responseJS.msg);
                            this.getRestaurantsFromServer();
                        });
                })
                .catch(function (err) {
                    console.log(err);
                });

        },
        detailsRestaurant(index) {
            var id = this.restaurants[index]._id;
            console.log("on affiche les details du restaurant id=" + id);
            
            var resto = this.restaurants[index];
            
            this.detailResto = resto;

            this.showModal = true;


        },
        formModifierRestaurant(index) {
            document.getElementById('idModification').value = this.restaurants[index]._id;
            document.getElementById('nomModification').value = this.restaurants[index].name;
            document.getElementById('cuisineModification').value = this.restaurants[index].cuisine;
            document.getElementById('divModification').style.display = "initial";
        },
        modifierRestaurant(event) {
            // Pour éviter que la page ne se ré-affiche
            event.preventDefault();

            // Récupération du formulaire. Pas besoin de document.querySelector
            // ou document.getElementById puisque c'est le formulaire qui a généré
            // l'événement
            let form = event.target;
            // Récupération des valeurs des champs du formulaire
            // en prévision d'un envoi multipart en ajax/fetch
            let donneesFormulaire = new FormData(event.target);

            let id = form._id.value; // on peut aller chercher la valeur
                                    // d'un champs d'un formulaire
                                    // comme cela, si on connait le nom
                                    // du champ (valeur de son attribut name)

            let url = "http://localhost:8080/api/restaurants/" + id;

            fetch(url, {
                method: "PUT",
                body: donneesFormulaire
            })
            .then((responseJSON) => {
                responseJSON.json()
                    .then((responseJS) => {
                        // Maintenant res est un vrai objet JavaScript
                        console.log(responseJS.msg);
                        this.getRestaurantsFromServer();
                    });                    
                    document.getElementById('divModification').style.display = "none";
                })
                .catch(function (err) {
                    console.log(err);
            });

        },
        ajouterRestaurant(event) {
            // eviter le comportement par defaut
            event.preventDefault();

            // On recupère le formulaire
            let form = event.target;

            // On recupere les données du formulaire
            let dataFormulaire = new FormData(form);

            // On envoie une requête POST au serveur
            let url = "http://localhost:8080/api/restaurants";

            fetch(url, {
                method: "POST",
                body: dataFormulaire
            })
                .then((responseJSON) => {
                    responseJSON.json()
                        .then((responseJS) => {
                            // Maintenant res est un vrai objet JavaScript
                            console.log(responseJS.msg);
                            this.getRestaurantsFromServer();
                        });
                })
                .catch(function (err) {
                    console.log(err);
                });

            // On remet les champs du formulaire à zéro
            this.nom = "";
            this.cuisine = "";
        },
        getColor(index) {
            return (index % 2) ? 'lightBlue' : 'pink';
        },
        pagePrecedente() {
            if (this.page !== 0) {
                this.page--;
                this.getRestaurantsFromServer();
            }
        },
        pageSuivante() {
            if (this.page < this.nbPagesDeResultats) {
                this.page++;
                this.getRestaurantsFromServer();
            }
        },
        firstPage() {
                this.page=0;
                this.getRestaurantsFromServer();
        },
        lastPage() {
                this.page = this.nbPagesDeResultats-1;
                this.getRestaurantsFromServer();
        },
    }
	
}
        
</script>


<style>
    body {
        font-family: Helvetica Neue, Arial, sans-serif;
        font-size: 14px;
        color: #444;
    }

    table {        
		width: 40%;
        margin: 0 auto;
        border: 2px solid #42b983;
        border-radius: 3px;
        background-color: #fff;
        margin-bottom:15px;
    }

    th {
        background-color: #42b983;
        color: rgba(255,255,255,0.66);
        -webkit-user-select: none;
        -moz-user-select: none;
        -ms-user-select: none;
        user-select: none;
    }

    td {
        background-color: #f9f9f9;
    }

    th, td {
        min-width: 120px;
        padding: 10px 20px;
    }

    th.active {
        color: #fff;
    }

    th.active .arrow {
        opacity: 1;
    }

    .arrow {
        display: inline-block;
        vertical-align: middle;
        width: 0;
        height: 0;
        margin-left: 5px;
        opacity: 0.66;
    }

    .arrow.asc {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-bottom: 4px solid #fff;
    }

    .arrow.dsc {
        border-left: 4px solid transparent;
        border-right: 4px solid transparent;
        border-top: 4px solid #fff;
    }

    button {
        background-color: #4CAF50; /* Green */
        border: none;
        color: white;
        cursor: pointer;
        padding: 7px 16px;
        border-radius: 5px;
        text-align: center;
        text-decoration: none;
        display: inline-block;
    }

    .foodName{        
        cursor: pointer;
    }
	h3{
        color: #4CAF50;
	}
</style>