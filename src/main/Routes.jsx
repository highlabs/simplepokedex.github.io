import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import PokeAPI from '../components/pokeApi/PokeAPI'
import Pokemon from '../components/pokeApi/Pokemon'

export default props =>
    <Switch>
        <Route exact path='/' component={PokeAPI} />
        <Route path='/:id' component={Pokemon} />
        <Redirect from='*' to='/' />
    </Switch>