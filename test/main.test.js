import API from '../src/main';

const init = () => {
  const { contacts } = API({
    accessToken: 'hello',
  });

  contacts.list().then(d => console.log(d));
};

init();

describe(`returns the correct value`, () => {});
