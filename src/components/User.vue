<template>
	<div id="user">
		<h3>Utilisateur</h3>
		<p>Mon nom est {{userName}}</p>
		<app-info></app-info>
	</div>
</template>

<script>
import Info from './Info.vue'; // LOCAL COMPONENT

export default {
	data() {
		return {
			userName : 'Luc Skywalker' 
		}
	},
	components: { 				// LOCAL COMPONENTS
		'app-info': Info 
	}
	
}
</script>

<style scoped>
	p {
		font-style: italic;
		color:red; 
	}
</style>