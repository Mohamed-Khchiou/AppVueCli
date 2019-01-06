<template>		
	<div id="commande">
	    <h3>Recapitulatif de commande</h3>

        <div class="articles">
            <slot name="articles">
              Aucune commande
            </slot>
        </div>

        <div class="total">
            <slot name="total">
              total : 0€
            </slot>
        </div>
    </div>
</template>


<style>
#commande {
    width: 15%;
    position: fixed;
    right: 0;
}

.total{
    border-top: 1px solid black;
}
</style>