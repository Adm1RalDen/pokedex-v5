import { observable, action, decorate } from 'mobx';
const axios = require('axios');

class Store {
    pokemons = [];
    rangeValue = [10, 0];//limit == count, offset == startGet
    countPokemons = 1;
    pokemonInfo = [];
    selectedPages = 1;
    sizeGrid = 10;
    idImage = null;
    filterPokemons = [];
    setPokemons = (props) => {
        this.pokemons = props;
    }
    setRangeInterval = (props) => {
        this.rangeValue = props;
    }
    async getPokemonList(props) {
        console.log('tuta ya');
        let [limit, offset] = props;
        const url = `https://pokeapi.co:443/api/v2/pokemon/?limit=${limit}&offset=${offset}`;
        return this.makeRequest(url).then(response => {
            this.pokemons = response.results;
            this.countPokemons = response.count
            return response.count;
        })
    }
    async makeRequest(props) {
        try {
            const response = await axios.get(props)
            return response.data;
        } catch (eror) {
            console.log(eror);
        }

    }
    setSelectedPage(props) {
        this.selectedPages = props;
    }
    setPokemonInfo(props) {
        this.pokemonInfo = props;
    }
    async getTypesPokemon(props) {
        let temp = [];
        for (let i = 0; i < props.length; i++) {
            let url = `https://pokeapi.co/api/v2/type/${props[i]}`;
            await this.makeRequest(url).then(response => {
                temp = [...temp, response.pokemon]
            })
        }
        temp = temp.reduce((prev, item) => {
            let temps = item.reduce((prev2, item2) => {
                prev2 = [...prev2, item2.pokemon]
                return prev2;
            }, [])
            prev = [...prev, ...temps]
            return prev
        }, [])
        console.log(temp.length);
        this.setCountsPokemon(temp.length);
        return temp;
        // this.filterPokemons = temp;
        // this.filterPokemons = [...this.filterPokemons, res]
    }
    setSizeGrid(props) {
        this.sizeGrid = props;
    }
    setRangeValue(props) {
        this.rangeValue = props;
    }
    setIdImage(props) {
        this.idImage = props;
    }
    setFilterPokemons(props){
        this.filterPokemons = props;
    }
    async getPokemonInfo(props){
        const url = `https://pokeapi.co/api/v2/pokemon/${props}`;
        let response = await this.makeRequest(url);
        response = [response.stats, response.types, response.weight]
        // .then(response => {
        //     let temp = [response.stats, response.types, response.weight];
        //     return temp
        // })
        return response;
    }
    setCountsPokemon(props){
        this.countPokemons = props;
    }

}
decorate(Store, {
    pokemons: observable,
    rangeValue: observable,
    pokemonInfo: observable,
    selectedPages: observable,
    sizeGrid: observable,
    countPokemons: observable,
    idImage: observable,
    filterPokemons: observable,

    setPokemons: action,
    setRangeInterval: action,
    setPokemonInfo: action,
    setSelectedPage: action,
    setSizeGrid: action,
    setIdImage: action,
    setFilterPokemons: action,
    setCountsPokemon: action,
});
const store = new Store();

store.getPokemonList(store.rangeValue)
    .then(response => {
        store.makeRequest(`https://pokeapi.co:443/api/v2/pokemon/?limit=${response}`)
            .then(response2 => response2.results.reduce((previous, current, index) => {
                previous[current.name] = index;
                return previous
            }, {})).then(response3 => { console.log('ku'); store.setIdImage(response3) })
    });

export default store;
export { Store };