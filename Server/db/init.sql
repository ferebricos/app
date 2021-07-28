DROP SCHEMA public CASCADE;
CREATE SCHEMA public;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO public;

GRANT CONNECT ON DATABASE appdb TO test_user;
GRANT ALL ON SCHEMA public TO test_user;
GRANT ALL PRIVILEGES ON ALL TABLES IN SCHEMA public TO test_user;
GRANT ALL PRIVILEGES ON ALL SEQUENCES IN SCHEMA public TO test_user;


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


INSERT INTO forum_categories (id,title,description,icon) VALUES (1,'Каталог игр','описание','/icon');
INSERT INTO forum_categories (id,title,description,icon) VALUES (2,'Разработка игр','описание','/icon');
INSERT INTO forum_categories (id,title,description,icon) VALUES (3,'Игровые новости','описание','/icon');
INSERT INTO forum_categories (id,title,description,icon) VALUES (4,'Общение','описание','/icon');


 
 
