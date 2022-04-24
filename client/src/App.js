import './styles/App.css';
import {Route} from 'react-router-dom'
import Landing from './components/Landing.jsx'
import Home from './components/Home.jsx'
import RecipeInfo from './components/RecipeInfo';
import AddRecipe from './components/AddRecipe';

import React from 'react';
function App() {
  return (
    <div className='App'>
      <Route exact path="/" component={Landing} />
      <Route path='/home' component={Home} />
      <Route path='/recipe/:idRecipe' component={RecipeInfo} />
      <Route path='/createRecipe' component={AddRecipe} />
    </div>
  );
}

export default App;
