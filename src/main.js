import contacts from './domains/contacts/index.js';
import events from './domains/events/index.js';
import activityTypes from './domains/activityTypes/index.js';

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

    // Calendar domains.
    events: events({ getAccessToken, baseUrl }),
    activityTypes: activityTypes({ getAccessToken, baseUrl }),
  };
};

export default API;
