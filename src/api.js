export const getPokemonDetail = async (pokemon) => {
    if (pokemon) {
        let response = await fetch(`https://pokeapi.co/api/v2/pokemon/${pokemon}`)
        return response.json()
    }
    return
}