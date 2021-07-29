# APP

Запускаем:

```bash
docker-compose up -d
```

После регистрации нового пользователя, необходимо подтвердить его электронную почту ( письмо со ссылкой не отправляется ), для этого в терминале залазим в контейнер PostgreSQL:

```bash
docker exec -it pg psql -U test_user -W appdb
```

Вводим пароль: `qwerty`

Далее делаем селект по таблице с токенами:

```bash
select * from users_tokens;
```
![screenshot](https://i.ibb.co/1QHHGNd/2021-07-29-15-57-27.png)

Копируем значение из столбца `VALUE` у необходимого пользователя, и далее идём в браузер и переходим по ссылке:

[http://localhost/verify/`VALUE`](http://localhost/verify/VALUE)

