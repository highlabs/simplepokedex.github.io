import React from 'react'
import { Switch, Route, Redirect } from 'react-router'

import PokeAPI from '../components/pokeApi/PokeAPI'

export default props =>
    <Switch>
        <Route exact path='/' component={PokeAPI} />
        <Redirect from='*' to='/' />
    </Switch>