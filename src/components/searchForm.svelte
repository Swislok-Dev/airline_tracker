<!-- <section id="search-form"> -->
<form class="form-control">
	<label for="ident">Please enter a flight number</label>
	<div id="search-input">
		<input
			type="text"
			name="ident"
			required
			placeholder="ua4"
		/>
		<button
			id="search-button"
			type="submit"
			value="Find Flight"
		>
			Search
		</button>
	</div>
</form>

<!-- </section> -->

<style>
	.form-control {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		margin: auto;
		width: 100%;
		gap: 2rem;
	}
	form {
		padding: 0 0.5rem;
    width: 75%;
		max-width: 28rem;
	}

	#search-input {
		display: flex;
		flex-direction: row;
		flex-grow: 1;
		gap: 5px;
	}

	#search-input input {
		max-width: 100%;
		margin: auto;
		padding: 5px;
		text-align: center;
		text-transform: capitalize;
	}

	label {
		color: white;
	}
</style>
