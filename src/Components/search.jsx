import React, { useState } from 'react'
import { inject, observer } from 'mobx-react'
import { Input, message } from 'antd';

const { Search } = Input;

const Searchs = inject('Store')(observer((props) => {
    const handleeaSrch = (e) => {
        let arr = Object.entries(props.Store.idImage);
        arr = arr.filter(item => {
            return (item[0].indexOf(e.toLowerCase()) !== -1) ? true : false
        }).reduce((prev, item, index) => {
            prev = [...prev, { name: item[0] }]
            return prev
        }, []);
        if (arr.length !== 0) {
            props.Store.setPokemons([]);
            props.Store.setFilterPokemons(arr);
            props.Store.setPokemons(arr.splice(0, props.Store.sizeGrid));
            props.Store.setCountsPokemon(arr.length)
        }else{
            message.error('not found')
        }
    }
    return (
        <Search
            placeholder="input search text"
            onSearch={handleeaSrch}
            style={{ width: '80%' }}
        />
    )
}))

export default Searchs