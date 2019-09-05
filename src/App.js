import React from 'react'
import { inject, observer } from 'mobx-react'
import { Layout } from 'antd'
import { Route } from 'react-router-dom'

import 'antd/dist/antd.css'
import Header from './Components/header'
import PokemonInfo from './Components/pokemonInfo'
import PokemonList from './Components/pokemonList'
import Pagination from './Components/pagination'
import Search from './Components/search'
import './Styles/app.css'

const App = inject('Store')(observer((props) => {
    // props.Store.
    return (
        <Layout>
            <Header />
            <Layout.Content>
                <Route exact path='/' component={Search} />
                <Route exact path='/' component={PokemonList} />
                <Route exact path='/PokemonInfo/:namePokemon' component={PokemonInfo} />
            </Layout.Content>
            <Layout.Footer>
                <Route exact path='/' component={Pagination} />
            </Layout.Footer>
        </Layout>
    );
}))

export default App