const mutation = require('../../graphql/resolvers/mutation');
let deleteUserId = 2;
let deleteRoomId = 2;
let deleteEventId = 2;
test('createUser', () => {
  expect.assertions(3);
  return mutation.createUser(undefined, { input:
    { login: 'Vyacheslav',
      homeFloor: 7,
      avatarUrl: 'https://avatars3.githubusercontent.com/u/15365?s=460&v=4' } })
      .then(data => {
        deleteUserId=data.dataValues.id;
        expect(data.dataValues.login).toBe('Vyacheslav');
        expect(data.dataValues.homeFloor).toBe(7);
        expect(data.dataValues.avatarUrl).toBe('https://avatars3.githubusercontent.com/u/15365?s=460&v=4');
  });
});

test('updateUser', () => {
  expect.assertions(3);
  return mutation.updateUser(undefined, {id: '1', input:
    { login: 'Vyacheslav',
      homeFloor: 7,
      avatarUrl: 'https://avatars3.githubusercontent.com/u/15365?s=460&v=4' } })
      .then(data => {
        expect(data.dataValues.login).toBe('Vyacheslav');
        expect(data.dataValues.homeFloor).toBe(7);
        expect(data.dataValues.avatarUrl).toBe('https://avatars3.githubusercontent.com/u/15365?s=460&v=4');
  });
});

test('removeUser', () => {
  expect.assertions(3);
  return mutation.removeUser(undefined, {id: `${deleteUserId}`})
      .then(data => {
        expect(data.dataValues.login).toBe('Vyacheslav');
        expect(data.dataValues.homeFloor).toBe(7);
        expect(data.dataValues.avatarUrl).toBe('https://avatars3.githubusercontent.com/u/15365?s=460&v=4');
  });
});

test('createRoom', () => {
    expect.assertions(3);
    return mutation.createRoom(undefined, {input:{
        title:"testRoom",
        capacity:0,
        floor:0,
      }})
        .then(data => {
        deleteRoomId=data.dataValues.id;
          expect(data.dataValues.title).toBe("testRoom");
          expect(data.dataValues.capacity).toBe(0);
          expect(data.dataValues.floor).toBe(0);
    });
  });

test('updateRoom', () => {
expect.assertions(3);
return mutation.updateRoom(undefined, {id: '1', input:{
    title:"testRoom",
    capacity:0,
    floor:0,
    }})
    .then(data => {
        expect(data.dataValues.title).toBe("testRoom");
        expect(data.dataValues.capacity).toBe(0);
        expect(data.dataValues.floor).toBe(0);
});
});

test('removeRoom', () => {
    expect.assertions(3);
    return mutation.removeRoom(undefined, {id: `${deleteRoomId}`})
        .then(data => {
            expect(data.dataValues.title).toBe("testRoom");
            expect(data.dataValues.capacity).toBe(0);
            expect(data.dataValues.floor).toBe(0);
    });
    });

test('createEvent', () => {
  expect.assertions(2);
    return mutation.createEvent(undefined, {input:{
        title:"testEvent",
        dateStart:"2018-01-29T08:30:41.242Z",
          dateEnd:"2018-01-29T07:30:41.242Z"
      },
      usersIds:[1,2],
      roomId:3})
        .then(data => {
          deleteEventId=data.dataValues.id;
            expect(data.dataValues.title).toBe("testEvent");
            expect(data.dataValues.RoomId).toBe(3);
    });
    });

test('updateEvent', () => {
  expect.assertions(1);
    return mutation.updateEvent(undefined, {id: '1',input:{
        title:"testEvent",
        dateStart:"2018-01-29T08:30:41.242Z",
          dateEnd:"2018-01-29T07:30:41.242Z"
      }})
        .then(data => {
            expect(data.dataValues.title).toBe("testEvent");
    });
    });

test('addUserToEvent', () => {
  expect.assertions(1);
    return mutation.addUserToEvent(undefined, {id: '1',userId:'1'})
        .then(data => {
            expect(data.dataValues.title).not.toBeNull();
    });
    });

test('removeUserFromEvent', () => {
  expect.assertions(1);
    return mutation.removeUserFromEvent(undefined, {id: '1',userId:'1'})
        .then(data => {
            expect(data.dataValues).not.toBeNull();
    });
    });

test('changeEventRoom', () => {
  expect.assertions(1);
    return mutation.changeEventRoom(undefined, {id: '1',roomId:'1'})
        .then(data => {
            expect(data.dataValues.RoomId).toBe('1');
    });
    });

test('removeEvent', () => {
  expect.assertions(1);
    return mutation.removeEvent(undefined, {id: `${deleteEventId}`})
        .then(data => {
            expect(data.dataValues.title).not.toBeNull();
    });
    });

        