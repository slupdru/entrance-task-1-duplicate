
const query = require('../../graphql/resolvers/query');
test('event id:1 no null', () => {
  expect.assertions(1);
  return query.event(undefined, {id: '1'}).then(data => {
    expect(data).not.toBeNull();
  });
});

test('events no null', () => {
  expect.assertions(1);
  return query.events(undefined, {}).then(data => {
    expect(data).not.toBeNull();
  });
});

test('user id:1 no null', () => {
  expect.assertions(1);
  return query.user(undefined, {id: '1'}).then(data => {
    expect(data).not.toBeNull();
  });
});

test('users no null', () => {
  expect.assertions(1);
  return query.users(undefined, {}).then(data => {
    expect(data).not.toBeNull();
  });
});

test('room id:1 no null', () => {
  expect.assertions(1);
  return query.room(undefined, {id: '1'}).then(data => {
    expect(data).not.toBeNull();
  });
});

test('rooms no null', () => {
  expect.assertions(1);
  return query.rooms(undefined, {}).then(data => {
    expect(data).not.toBeNull();
  });
});