import React, { Component } from 'react'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Main from '../template/Main'
import { prettifyPokemonName } from '../../utils';
const Spinner = require('react-spinkit');

const baseUrl = "http://pokeapi.co/api/v2/pokemon/"
const imgBaseUrl = "https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/"

export default class Pokemon extends Component{
    state = { 
        pokeId: baseUrl+this.props.match.params.id,
        pokemon: [] 
    }

    componentWillMount(){
        axios(this.state.pokeId)
            .then(response => {
                this.setState({ pokemon: response });
            })
    }

    renderTypes(types){
        return types.map((type, index) => {
            return (
                <span key={index}>{(index ? ', ': '')+type.type.name}</span>
            )
        })
    }

    renderMoves(moves){
        return moves.map((move, index) => {
            return (
                <span key={index}>{(index ? ', ': '')+(move.ability ? move.ability.name : move.move.name)}</span>            
            )
        })
    }

    renderAPage(){
        if (Object.keys(this.state.pokemon).length === 0) {
            return (
                <div className="row" style={{display: 'flex',justifyContent: 'center'}}>
                    <Spinner name='ball-spin-fade-loader' />
                </div>                
            )
        }
        var pokemon = this.state.pokemon.data

        return (
            <div className="container-fluid">
                <div className="row extra_margin">
                    <div className="col-md-4 col-sm-12 col-xs-12">
                        <div className="text-center">
                            <img src={imgBaseUrl+pokemon.id+'.png'} style={{width:'30%'}}/>
                            <h2>{prettifyPokemonName(pokemon.name)}</h2>
                            <p>
                                Peso: {pokemon.weight/10}kg                                
                            </p>
                            <p>
                                Altura: {pokemon.height/10}m                                
                            </p>
                            <p>
                                Tipo(s): {this.renderTypes(pokemon.types)}
                            </p>
                        </div>
                    </div>
                    <div className="col-md-8 col-sm-* col-xs-*">
                        <p className="lead">Golpes/Habilidades</p>
                        <hr />
                        <p>
                            {this.renderMoves(pokemon.abilities)}
                        </p>
                        <p className="lead">Movimentos</p>
                        <hr />
                        <p>
                            {this.renderMoves(pokemon.moves)}
                        </p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-md-12">
                        <Link to='/'>
                            <button type="button" className="btn btn-primary">
                                Voltar
                            </button>
                        </Link>
                    </div>
                </div>
            </div>
        )
    }

    render(){
        return (
            <Main>
                {this.renderAPage()}
            </Main>
        )
    }
}