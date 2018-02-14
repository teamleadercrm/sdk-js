import contacts from './domains/contacts.js';

import events from './domains/events';
import activityTypes from './domains/activityTypes';

const createGetAccessToken = config => {
  const { accessToken, getAccessToken } = config;

  if (accessToken) {
    return () => accessToken;
  }

  return getAccessToken;
};

const API = config => {
  const getAccessToken = createGetAccessToken(config);
  const { baseUrl = 'https://api.teamleader.eu' } = config;

  return {
    contacts: contacts({ getAccessToken, baseUrl }),

    events: events({ getAccessToken, baseUrl }),
    activityTypes: activityTypes({ getAccessToken, baseUrl }),
  };
};

export default API;
