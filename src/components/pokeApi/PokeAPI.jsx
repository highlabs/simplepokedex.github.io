import React, { Component } from 'react'
import axios from 'axios'
import Main from '../template/Main'

const limit = 10
const baseUrl = "https://pokeapi.co/api/v2/pokemon/"
const imgBaseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"

const initialState ={
    listPokemons: []
}

export default class PokeAPI extends Component{
    state = { ...initialState }

    componentWillMount(){
        axios(baseUrl,{
            headers: {
                'Access-Control-Allow-Origin': '*',
                'Content-Type': 'application/json'
            }
        }).then(list => {
        list.results.length.forEach(function(obj){
            this.setState(prevState => ({
                listPokemons: [...prevState.listPokemons,
                    {
                        id: obj.url[obj.url.length -2],
                        name: obj.name,
                        image: imgBaseUrl+ this.id +".png"
                    }]
            }))
        })         
        })
    }

    renderTable(){
        return(
            <table className="table mt-4">
                <thead className="thead-dark">
                    <tr>
                        <th>Nome</th>
                    </tr>
                </thead>
                <tbody>
                    {this.renderRows()}
                </tbody>
            </table>
        )
    }

    renderRows(){
        return this.state.listPokemons.map(pokemon => {
            return (
                <tr key={pokemon.id}>
                    <img src={pokemon.image} alt=""/>
                    <td>{pokemon.name}</td>                    
                </tr>
            )
        })
    }

    /*
    <td>{pokemon.weight/10}Kg</td> <!--hectogramas para kilogramas-->
    <td>{pokemon.height/10}m</td> <!--decimetros para metro-->
    <td>{this.renderTypes(pokemon.types)}</td>
    <td>
        <div className="dropdown">
            <button className="btn btn-secondary dropdown-toggle" type="button" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Dropdown button
            </button>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuButton">
                {this.renderMoves(pokemon.moves)}
            </div>
        </div>
    </td>
    */

    // renderTypes(types){
    //     return types.map((type, index) => {
    //         return (
    //             <span key={index}>{(index ? ', ': '')+type.type.name} </span>
    //         )
    //     })
    // }

    // renderMoves(moves){
    //     return moves.map((move, index) => {
    //         return (
    //             // <li key={index}>{(index ? ', ': '')+move.move.name}, </li>
    //             <a key={index} className="dropdown-item" href="#">{move.move.name}</a>                
    //         )
    //     })
    // }

    render(){
        return (
            <Main>
                {this.renderTable()}
            </Main>
        )
    }
}