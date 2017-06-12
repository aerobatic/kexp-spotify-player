import querystring from 'query-string';
import {isString, isNumber, isEmpty} from 'lodash/lang';
import {random} from 'lodash/number';

const SCOPES = ['user-library-read', 'user-library-modify'];
const AUTH_URL = 'https://accounts.spotify.com/authorize';
const ACCESS_TOKEN_KEY = 'spotifyAccessToken';
const CORRELATION_ID_KEY = 'spotifyAuthCorrelationId';

// Called with the params in the hash passed back by Spotify
export const authCallback = (queryParams) => {
  // Ensure that the state param matches what we passed when navigating
  // to the Spotify auth url
  if (queryParams.state !== localStorage.getItem(CORRELATION_ID_KEY)) {
    throw new Error('Invalid auth state');
  }

  if (queryParams.error) {
    throw new Error(queryParams.error);
  }

  const accessToken = queryParams.access_token;
  if (!accessToken) {
    throw new Error('Missing access_token');
  }

  const expiresIn = parseInt(queryParams.expires_in, 10);
  if (Number.isNaN(expiresIn)) {
    throw new Error('Invalid expires_in');
  }

  localStorage.setItem(ACCESS_TOKEN_KEY, JSON.stringify({
    accessToken,
    expiresAt: Date.now() + expiresIn * 1000
  }));

  localStorage.removeItem(CORRELATION_ID_KEY);
};

export const getAccessToken = () => {
  let token;
  try {
    token = JSON.parse(window.localStorage.getItem(ACCESS_TOKEN_KEY));
  } catch (err) {
    return null;
  }

  if (isEmpty(token)) return null;
  if (!isString(token.accessToken)) return null;

  if (!isNumber(token.expiresAt) || token.expiresAt < Date.now()) {
    console.log('The spotify access_token is expired');
    return null;
  }

  return token.accessToken;
};

export const validAccessToken = () => {
  if (getAccessToken() !== null) {
    return true;
  }
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  return false;
};

// Navigate the browser to the Spotify auth page
export const navigateToAuth = (redirectState = {}) => {
  const correlationId = random(1000, 2000);
  const query = {
    client_id: process.env.REACT_APP_SPOTIFY_CLIENT_ID,
    response_type: 'token',
    scope: SCOPES.join(' '),
    redirect_uri: window.location.origin + '/spotify_callback',
    state: correlationId
  };

  window.localStorage.setItem(CORRELATION_ID_KEY, correlationId);

  if (!isEmpty(redirectState)) {
    query.redirect_uri += '?' + querystring.stringify(redirectState);
  }

  window.location.href = AUTH_URL + '?' + querystring.stringify(query);
}