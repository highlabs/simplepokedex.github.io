import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'
import Main from '../template/Main'
import { getPokemonId, prettifyPokemonName } from '../../utils';
import './PokeAPI.css'

const baseUrl = "https://pokeapi.co/api/v2/pokemon/"
const imgBaseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"

export default class PokeAPI extends Component{
    state = { 
        listPokemons: [],
        next: null,
        previous: null
    }

    makeAxiosRequest(request){
        axios(request)
            .then(response => {
                const lista = []
                this.setState({
                    next: response.data.next,
                    previous: response.data.previous
                })
                response.data.results.forEach(function(obj){
                    const id = getPokemonId(obj.url)
                    lista.push({
                        id: id,
                        name: prettifyPokemonName(obj.name),
                        image: imgBaseUrl+ id +".png"
                    })                    
                })
                this.setState({listPokemons: lista})
            })
            .catch((error) =>{
                console.log(error)
            })
    }

    componentWillMount(){
        this.makeAxiosRequest(baseUrl)
    }

    previousNext(next){
        next ? this.makeAxiosRequest(this.state.next) : this.makeAxiosRequest(this.state.previous)
    }

    renderCardDeck(){
        return (
            <div className="container">
                <div className="row">
                    {this.renderCards()}
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <button type="button" style={{marginRight: '5px'}} className={"btn btn-primary " + (this.state.previous==null ? 'disabled' : '')}
                        onClick={() => {this.previousNext(false)}}>
                            Anterior
                        </button>
                        <button type="button" className={"btn btn-primary " + (this.state.next==null ? 'disabled' : '')}
                        onClick={() => {this.previousNext(true)}}>
                            Proximo
                        </button>
                    </div>
                </div>
            </div>
        )
    }

    renderCards(){
        return this.state.listPokemons.map(pokemon =>{
            return (                
                <div key={pokemon.id} className={"col-sm-2" + (pokemon.id.match(/[1|6]$/) ? ' offset-md-1' : '')}>
                    <Link to={`/${pokemon.name.toLowerCase()}`} style={{ textDecoration: 'none' }}>
                        <div className="card">
                            <img className="card-img-top" src={pokemon.image} alt=""/>
                            <h5 className="card-title">{pokemon.name}</h5>
                        </div>
                    </Link>
                </div>                
            )
        })
    }  

    render(){
        return (
            <Main>
                {this.renderCardDeck()}
            </Main>
        )
    }
}