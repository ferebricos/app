CREATE EXTENSION "uuid-ossp";
CREATE SEQUENCE usernames AS BIGINT START WITH 1 INCREMENT BY 1;

CREATE TABLE roles (
    id INTEGER NOT NULL,
    name TEXT NOT NULL,
    PRIMARY KEY(id) 
);
CREATE TABLE users (
    id uuid NOT NULL DEFAULT uuid_generate_v4(),
    login TEXT NOT NULL ,
    email TEXT NOT NULL ,
    password TEXT NOT NULL ,
    avatar TEXT DEFAULT NULL ,
    role INTEGER NOT NULL DEFAULT 1,
    username TEXT DEFAULT CONCAT('user',nextval('usernames')),
    regdate TIMESTAMP NOT NULL DEFAULT NOW(),
    count_messages INTEGER NOT NULL DEFAULT 0,
    PRIMARY KEY (id),
    FOREIGN KEY (role) REFERENCES roles (id)
);
CREATE TABLE users_tokens_types (
    id INTEGER NOT NULL,
    name TEXT NOT NULL,
    PRIMARY KEY(id)
);
CREATE TABLE users_tokens (
    id BIGSERIAL NOT NULL,
    type INTEGER NOT NULL,
    user_id uuid NOT NULL,
    value TEXT NOT NULL,
    expire_date TIMESTAMP DEFAULT NOW()+INTERVAL '1 DAY',
    PRIMARY KEY(id),
    FOREIGN KEY (type) REFERENCES users_tokens_types (id),
    FOREIGN KEY (user_id) REFERENCES users (id)
);

CREATE TABLE forum_categories (
    id INTEGER NOT NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    icon TEXT NOT NULL,
    count_topics BIGINT NOT NULL DEFAULT 0,
    count_messages BIGINT NOT NULL DEFAULT 0,
    last_topic BIGINT DEFAULT NULL,
    PRIMARY KEY (id)
);
CREATE TABLE forum_topic (
    id BIGSERIAL NOT NULL,
    category INTEGER NOT NULL,
    author uuid NOT NULL,
    main_message BIGINT DEFAULT NULL,
    title TEXT NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT NOW(),
    count_messages INTEGER NOT NULL DEFAULT 0,
    last_message BIGINT DEFAULT NULL,
    PRIMARY KEY (id),
    FOREIGN KEY (category) REFERENCES forum_categories (id),
    FOREIGN KEY (author) REFERENCES users (id)
);
CREATE TABLE forum_message (
    id BIGSERIAL NOT NULL,
    topic BIGINT NOT NULL,
    author uuid NOT NULL,
    date TIMESTAMP NOT NULL DEFAULT NOW(),
    message TEXT NOT NULL,
    attachments JSON,
    PRIMARY KEY (id),
    FOREIGN KEY (author) REFERENCES users (id),
    FOREIGN KEY (topic) REFERENCES forum_topic (id)
);


CREATE FUNCTION users_messages_counter() RETURNS trigger AS $users_messages_counter$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            UPDATE users SET count_messages = count_messages + 1 WHERE id = NEW.author;
            UPDATE forum_topic SET last_message = NEW.id WHERE id = NEW.topic;
            UPDATE forum_topic SET count_messages = count_messages + 1 WHERE id = NEW.topic;
            UPDATE forum_categories SET count_messages = count_messages + 1 WHERE id = (SELECT category FROM forum_topic WHERE id = NEW.topic LIMIT 1);
            RETURN NEW;
        ELSIF TG_OP = 'DELETE' THEN
            UPDATE users SET count_messages = count_messages - 1 WHERE id = OLD.author;
            UPDATE forum_topic SET last_message = (SELECT id FROM forum_message WHERE topic = OLD.topic ORDER BY date DESC LIMIT 1) WHERE id = OLD.topic;
            UPDATE forum_topic SET count_messages = count_messages - 1 WHERE id = OLD.topic;
            UPDATE forum_categories SET count_messages = count_messages - 1 WHERE id = (SELECT category FROM forum_topic WHERE id = OLD.topic LIMIT 1);
            RETURN OLD;
        END IF;
    END;
$users_messages_counter$ LANGUAGE plpgsql;

CREATE TRIGGER tg_users_messages_counter
    AFTER INSERT OR DELETE ON forum_message
    FOR EACH ROW
    EXECUTE PROCEDURE users_messages_counter();
    
CREATE FUNCTION forum_categories_last() RETURNS trigger AS $forum_categories_last$
    BEGIN
        IF TG_OP = 'INSERT' THEN
            UPDATE forum_categories SET last_topic = NEW.id WHERE id = NEW.category;
            UPDATE forum_categories SET count_topics = count_topics + 1 WHERE id = NEW.category;
            RETURN NEW;
        ELSIF TG_OP = 'DELETE' THEN
            UPDATE forum_categories SET last_topic = (SELECT id FROM forum_topic WHERE category = OLD.category ORDER BY date DESC LIMIT 1) WHERE id = OLD.category;
            UPDATE forum_categories SET count_topics = count_topics - 1 WHERE id = OLD.category;
            RETURN OLD;
        END IF;
    END;
$forum_categories_last$ LANGUAGE plpgsql;

CREATE TRIGGER tg_forum_categories_last
    AFTER INSERT OR DELETE ON forum_topic
    FOR EACH ROW
    EXECUTE PROCEDURE forum_categories_last();


INSERT INTO roles (id,name) VALUES (1,'uncofirmedUser');
INSERT INTO roles (id,name) VALUES (2,'defaultuser');
INSERT INTO users_tokens_types (id,name) VALUES (1,'emailConfirm');
INSERT INTO users_tokens_types (id,name) VALUES (2,'passwordReset');

INSERT INTO forum_categories (id,title,description,icon) VALUES (1,'Операционные системы','В этом разделе вы можете обсудить операционные системы и связанные с ними темы','os');
INSERT INTO forum_categories (id,title,description,icon) VALUES (2,'Разработка программ','В данном разделе можно задавать вопросы и делиться своими программными наработками','prog');
INSERT INTO forum_categories (id,title,description,icon) VALUES (3,'Компьютерное железо','Обсуждайте аппаратное обеспечение и свои собственные идеи и реализации','comp');
INSERT INTO forum_categories (id,title,description,icon) VALUES (4,'Разработка игр','Делитесь своими разработками и наборами готовых ассетов для разработки игр','game');
INSERT INTO forum_categories (id,title,description,icon) VALUES (5,'Базы данных','Раздел для обсуждения всего, что связано с базами данных','bd');
INSERT INTO forum_categories (id,title,description,icon) VALUES (6,'Работа','Здесь вы можете оставить отзыв о своей работе, или прочитать отзывы других людей','work');
INSERT INTO forum_categories (id,title,description,icon) VALUES (7,'Общение','Просто общение на любые темы','chat');

INSERT INTO users (login,email,password,username,role) VALUES ('admin','admin@gmail.com','$2y$08$qLyIeioUKY09NfWmDZ.Uve33MPJHNnt9HGrfSmgw354A1RhkXDaKe','admin',2)
