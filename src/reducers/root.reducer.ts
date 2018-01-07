import { combineReducers } from 'redux';
import trips from './trips.reducer';
import articles from './articles.reducer';
import navbar from './navbar.reducer';
import map from './map.reducer';
import header from './header.reducer';
import medias from './medias.reducer';
import suggestions from './suggestions.reducer';
import app from './app.reducer';
import reduxTokenAuthReducer from './auth.reducer';

const rootReducer = combineReducers({
  // short hand property names
  trips,
  articles,
  navbar,
  map,
  header,
  medias,
  suggestions,
  app,
  reduxTokenAuth: reduxTokenAuthReducer,
});

export default rootReducer;