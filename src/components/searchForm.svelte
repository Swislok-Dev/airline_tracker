<section id="search-form">
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
</section>

<style>
	form {
		margin: 2rem;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		gap: 20px;
	}

	#search-input {
		display: flex;
		gap: 5px;
		max-width: 200vw;
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
