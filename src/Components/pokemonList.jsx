import React from 'react'
import { inject, observer } from 'mobx-react'
import { Card, Spin, Avatar } from 'antd'
import '../Styles/pokemonList.css';
import Img from 'react-image'
import { Link } from 'react-router-dom'
const PokemonList = inject('Store')(observer((props) => {
    const Store = props.Store;
    const handleClickPokemon = (name) => {

    }
    return (
        <div className='pokemonItem'>
            {(Store.pokemons.length !== 0 && Store.idImage !== null) ?
                Store.pokemons.map((item, index) => {
                    return <Link to = {`/PokemonInfo/${item.name}`} key = {item.name}><Card
                        hoverable
                        style={{ width: 200 }}
                        cover={<Img alt='' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${+Store.idImage[item.name] + 1}.png`}
                            loader={<Spin size="large" />}
                            unloader={<Avatar size={128} icon="close" />}
                        />
                        }
                    >
                        <Card.Meta title={item.name} />
                    </Card></Link>
                })
                : <Spin size='large' />
            }
        </div >

    )
}));
export default PokemonList