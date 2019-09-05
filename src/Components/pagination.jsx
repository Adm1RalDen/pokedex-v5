import React from 'react'
import { inject, observer } from 'mobx-react'
import { Pagination } from 'antd'
import '../Styles/pagination.css';

const Paginations = inject('Store')(observer((props) => {
    const handleChangePage = (propsValue) => {
        props.Store.setPokemons([]);
        const { sizeGrid } = props.Store;
        if (!props.Store.filterPokemons.length) {
            console.log('pagination1', sizeGrid, propsValue * sizeGrid - sizeGrid);
            const tempRangeValue = [sizeGrid, propsValue * sizeGrid - sizeGrid];
            props.Store.setRangeValue(tempRangeValue);
            props.Store.getPokemonList(tempRangeValue);
        } else {
            props.Store.setPokemons(props.Store.filterPokemons.slice((propsValue-1) * sizeGrid, (propsValue - 1) * sizeGrid + sizeGrid));
        }
        props.Store.setSelectedPage(propsValue);

    }
    const handelSizeChange = (value, propsValue) => {
        
        props.Store.setPokemons([]);
        if (!props.Store.filterPokemons.length) {
            const tempRangeValue = [propsValue, 0];
            props.Store.setRangeValue(tempRangeValue);
            props.Store.getPokemonList(tempRangeValue);
        }else{
            props.Store.setPokemons(props.Store.filterPokemons.slice(0, propsValue));
        }
        props.Store.setSelectedPage(1);
        props.Store.setSizeGrid(propsValue);
    }
    return (
        <div className='paginationAlign'>
            <Pagination
                current={props.Store.selectedPages}
                defaultCurrent={1}
                showSizeChanger
                pageSizeOptions={['10', '20', '50']}
                total={props.Store.countPokemons}
                onChange={handleChangePage}
                onShowSizeChange={handelSizeChange}
            />
        </div>
    );
}))

export default Paginations