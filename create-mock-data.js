const { models, sequelize } = require('./models');

function createData () {
  let usersPromise = models.User.bulkCreate([
    {
      login: 'veged',
      avatarUrl: 'https://avatars3.githubusercontent.com/u/15365?s=460&v=4',
      homeFloor: 0
    },
    {
      login: 'alt-j',
      avatarUrl: 'https://avatars1.githubusercontent.com/u/3763844?s=400&v=4',
      homeFloor: 3
    },
    {
      login: 'yeti-or',
      avatarUrl: 'https://avatars0.githubusercontent.com/u/1813468?s=460&v=4',
      homeFloor: 2
    },
    {
      login: 'batman',
      avatarUrl: 'https://d30y9cdsu7xlg0.cloudfront.net/png/157453-200.png',
      homeFloor: 7
    },
    {
      login: 'lex-luthor',
      avatarUrl: 'https://i.pinimg.com/736x/d4/99/3e/d4993e398ecb4b4944292c46966fac80--lex-luthor-superman-the-creation.jpg',
      homeFloor: 5
    },
  ]);

  let roomsPromise = models.Room.bulkCreate([
    {
      title: '404',
      capacity: 5,
      floor: 4
    },
    {
      title: 'Деньги',
      capacity: 4,
      floor: 2
    },
    {
      title: 'Карты',
      capacity: 4,
      floor: 2
    },
    {
      title: 'Ствола',
      capacity: 2,
      floor: 5
    },
    {
      title: '14',
      capacity: 6,
      floor: 7
    },
    {
      title: 'Ржавый Фред',
      capacity: 6,
      floor: 7
    },
    {
      title: 'Джокер',
      capacity: 6,
      floor: 6
    },

  ]);

  const HOUR = 60 * 60 * 1000;
  let now = new Date();
  now.setHours(12);
  now.setMinutes(30);
  let oneHourLater = new Date(now.getTime() + HOUR);
  let twoHoursLater = new Date(oneHourLater.getTime() + HOUR);
  let threeHoursLater = new Date(twoHoursLater.getTime() + HOUR);
  
  let eventsPromise = models.Event.bulkCreate([
    {
      id:1,
      title: 'ШРИ 2018 - начало',
      dateStart: now,
      dateEnd: oneHourLater
    },
    {
      id:2,
      title: '👾 Хакатон 👾',
      dateStart: oneHourLater,
      dateEnd: twoHoursLater
    },
    {
      id:3,
      title: '🍨 Пробуем kefir.js',
      dateStart: twoHoursLater,
      dateEnd: threeHoursLater
    }
  ]);
  Promise.all([usersPromise, roomsPromise, eventsPromise])
    .then(() => Promise.all([
      models.User.findAll(),
      models.Room.findAll(),
      models.Event.findAll()
    ]))
    .then(function ([users, rooms, events]) {
      let promises = [];
      promises.push(events[0].setRoom(rooms[3]));
      promises.push(events[1].setRoom(rooms[1]));
      promises.push(events[2].setRoom(rooms[2]));

      promises.push(events[0].setUsers([users[0], users[1]]));
      promises.push(events[1].setUsers([users[1], users[2]]));
      promises.push(events[2].setUsers([users[0], users[2]]));

      return Promise.all(promises);
    });
}

sequelize.sync()
  .then(createData);
