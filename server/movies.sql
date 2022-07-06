create table user_info(
	id serial not null primary key,
    first_name text,
    last_name text,
	username text,
	password text
);

    create table user_playlist(
        id serial not null primary key,
        user_id int,
        FOREIGN KEY (user_id) REFERENCES user_info(id),
        movie_list text
    );



--  SELECT user_id FROM user_playlist INNER JOIN user_info ON user_playlist.user_id = user_info.id;
--  SELECT * FROM user_playlist INNER JOIN user_info ON user_playlist.user_id = user_info.id;  