# Приложение для создания и редактирования информации о встречах сотрудников

Написано для Node.js 8 и использует библиотеки:
* express
* sequelize
* graphql

## Задание
Код содержит ошибки разной степени критичности. Некоторых из них стилистические, а некоторые даже не позволят вам запустить приложение. Вам необходимо найти и исправить их.

Пункты для самопроверки:
1. Приложение должно успешно запускаться
2. Должно открываться GraphQL IDE - http://localhost:3000/graphql/
3. Все запросы на получение или изменения данных через graphql должны работать корректно. Все возможные запросы можно посмотреть в вкладке Docs в GraphQL IDE или в схеме (typeDefs.js)
4. Не должно быть лишнего кода
5. Все должно быть в едином codestyle

## Запуск
```
npm i
npm run dev
```

Для сброса данных в базе:
```
npm run reset-db
```


## Найденные ошибки и ход мыслей:

Пробежался по структуре всего клиент-серверного приложения.  
  
1. models/index.js:7 - неверное количество аргументов, добавлен null (сверил документацию Sequelize c кодом)  
2. models/index.js:11 - добавлен отступ  
3. index.js:14  неверный адрес , меняем graphgl на graphql  
4. create-mock-data.js:69,70 - Дата старта позже даты конца, меняем местами (может не являться ошибкой)  

Теперь хотя-бы запустилось.  

Далее идем с начала index.js, доходим до graphql/typeDefs.js:  
5. graphql/typeDefs.js:8 - убераем ! в avatarUrl:String! Это поле не должно быть non-nullable  
6. graphql/typeDefs.js:14 - в UserInput не хватает avatarUrl:String, добавляем  
Тут вроде все.  

Далее в graphql/resolvers/query:  
7. graphql/resolvers/query.js:4,10,16 - добавлены отступы  
8. graphql/resolvers/query.js:8 - нет переменной arguments, заменяем на args  

Начинаем тестить в http://localhost:3000/graphql/  
Все query работают ,а вот  mutation - createEvent, не задает параметры room и users, да и изначально в любом Event они равны null, что явно говорит об ошибке. После изнурительных поисков:  
9.  graphql/resolves/index:14, 17 - добавил return  
10.  graphql/resolves/mutation.js:42 - убрана лишняя пустая строка  

Теперь createEvent работает, продолжим тесты.   
addUserToEvent вообще нет в mutation.js, добавим  

11. graphql/resolves/mutation.js:53 - добавлена функция addUserToEvent.  

<<<<<<< HEAD
Продолжим, в changeEventRoom отсутсвет return event, так-же такой вариант может быть нестабильным, добавим другой для всех в том числе и для changeEventRoom (см. mutation.js)  
12. graphql/resolves/mutation.js - меняем конструкцию функций (см. mutation.js)  

Так-же changeEventRoom некорректно устанавливает значение room:  
13.  graphql/resolves/mutation.js:63 - заменяем id на roomId  

Так-же для третьего задания немного изменены данные в create-mock-data.js
=======
Продолжим, в changeEventRoom отсутсвет return event, также такой вариант может быть нестабильным, добавим другой для всех, в том числе и для changeEventRoom (см. mutation.js)  
13. graphql/resolves/mutation.js - меняем конструкцию функций (см. mutation.js)  

Так-же changeEventRoom некорректно устанавливает значение room:  
14.  graphql/resolves/mutation.js:63 - заменяем id на userId  
>>>>>>> d5f3c371d292581a7679571b2736a4d16ea82576
