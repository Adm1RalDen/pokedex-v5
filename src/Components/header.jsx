import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import {Link} from 'react-router-dom'
import { Layout, Drawer, Button, Checkbox, message, Typography } from 'antd'
import '../Styles/header.css';

const { Title } = Typography;
const typePokemon = ['bug', 'dark', 'dragon', 'electric', 'fairy', 'fighting',
    'fire', 'flying', 'ghost', 'grass', 'ground', 'ice', 'normal', 'poison',
    'psychic', 'rock', 'steel', 'water'];

const Header = inject('Store')(observer((props) => {
    const [visible, setVisible] = useState(false)
    const [chosenType, setChosenType] = useState([])
    const showDrawer = () => {
        setVisible(true);
    };

    const onClose = () => {
        setVisible(false);

    };
    const handleChange = (value) => {
        console.log(value)
        setChosenType(value)
        // console.log(value.map(item => item));
    }
    const handleSetFilter = () => {
        if (!chosenType.length) {
            message.error('count chosen types is zero')
        } else {
            props.Store.setPokemons([]);
            // console.log(props.Store.filterPokemons)
            props.Store.getTypesPokemon(chosenType).then(res => {
                props.Store.setFilterPokemons(res);
                props.Store.setPokemons(res.splice(0, props.Store.sizeGrid));
                props.Store.setCountsPokemon(res.length)

            });
            setVisible(false)
        }
    }
    const clear = () => {
        setVisible(false)
        setChosenType([])
        props.Store.setFilterPokemons([]);
        props.Store.getPokemonList([10, 0]);
    }
    return (
        <Layout.Header>
            <Link to = '/' ><Title level={3}>Pokedex</Title></Link>
            <Button type="primary" onClick={showDrawer} icon='menu' />
            <Drawer
                title="Menus"
                placement="right"
                closable={false}
                onClose={onClose}
                visible={visible}
            >
                <Checkbox.Group options={typePokemon} onChange={handleChange} value={chosenType} />
                {/* <Select mode="tags" style={{ width: '100%' }} placeholder="choose type of pokemon" onChange={handleChange}>
                    {typePokemon.map(item => <Option key={item} >{item}</Option>)}
                </Select> */}
                <Button type="primary" onClick={handleSetFilter}>
                    filter
                </Button>
                <Button type="primary" onClick={clear}>
                    clear
                </Button>
            </Drawer>
        </Layout.Header>
    )
}));
export default Header