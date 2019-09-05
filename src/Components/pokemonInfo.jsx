import React, { useEffect } from 'react'
import { inject, observer } from 'mobx-react'
import { Spin, Card, Avatar, Progress, Icon } from 'antd'
import { Link } from 'react-router-dom'
import Img from 'react-image'
import '../Styles/pokemonInfo.css';

const PokemonInfo = inject('Store')(observer((props) => {
    const pokemonName = props.match.params.namePokemon;
    useEffect(() => {
        props.Store.setPokemonInfo([]);
        props.Store.getPokemonInfo(pokemonName).then(res => props.Store.setPokemonInfo(res))
    }, [])
    // console.log(props.match.params.namePokemon)
    return (
        <div >
            {(props.Store.pokemonInfo.length !== 0) ?
                <div >
                    <Link to='/' ><Icon type="arrow-left" style={{ fontSize: '3em' }} /></Link>

                    <Card.Grid
                        hoverable>
                        <Card
                            hoverable
                            cover={<Img alt='' src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/${props.Store.idImage[pokemonName] + 1}.png`}
                                loader={<Spin size="large" />}
                                unloader={<Avatar size={128} icon="close" />}
                            />
                            }
                        >
                            <Card.Meta title={pokemonName} />
                        </Card>
                        <Card
                            hoverable
                        >
                            {props.Store.pokemonInfo[0].map(item => {
                                return <div key={item.base_stat + item.stat.url} >
                                    <div >{item.stat.name}</div>
                                    <Progress percent={item.base_stat} showInfo={false} />
                                </div>
                            })}
                        </Card>
                    </Card.Grid></div>
                :
                <Spin size='large' />
            }
        </div>
    )
}));
export default PokemonInfo