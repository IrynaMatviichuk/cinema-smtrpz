create TABLE genre (
  genre_id serial PRIMARY key,
  name varchar(20) UNIQUE not NULL
);


create TABLE auditorium (
  auditorium_id serial PRIMARY key,
  name varchar(30) UNIQUE not NULL
);


create TABLE movie (
  movie_id serial PRIMARY KEY,
  title varchar(50) UNIQUE not NULL,
  duration INTEGER not NULL CHECK (duration >= 60 and duration <= 240),
  genre_id_fk INTEGER REFERENCES genre(genre_id) not NULL,
  description TEXT not NULL
);


create TABLE screening (
  screening_id serial PRIMARY KEY,
  movie_id_fk INTEGER not NULL REFERENCES movie(movie_id),
  auditorium_id_fk INTEGER NOT NULL REFERENCES auditorium(auditorium_id),
  price INTEGER not NULL CHECK (price > 0),
  screening_date date not NULL CHECK (screening_date > now()::DATE),
  start_time time not NULL,
  end_time time not NULL,
  UNIQUE (auditorium_id_fk, screening_date, start_time)
);


create TABLE seat(
  seat_id serial PRIMARY KEY,
  auditorium_id_fk INTEGER NOT NULL REFERENCES auditorium(auditorium_id),
  row INTEGER not NULL CHECK (row > 0),
  NUMBER integer not NULL CHECK (NUMBER > 0),
  UNIQUE (auditorium_id_fk, row, NUMBER)
);


create TABLE cinema_user(
  cinema_user_id serial PRIMARY key,
  username varchar(30) UNIQUE not NULL,
  password VARCHAR(100) not NULL,
  firstname VARCHAR(20) not NULL,
  lastname varchar(20) not NULL,
  is_admin BOOLEAN not NULL
);


create TABLE booking(
  booking_id serial PRIMARY key,
  screening_id_fk INTEGER not NULL REFERENCES screening(screening_id),
  cinema_user_id_fk INTEGER not NULL REFERENCES cinema_user(cinema_user_id),
  seat_id_fk INTEGER not NULL REFERENCES seat(seat_id),
  booking_date date not NULL DEFAULT now()::date,
  booking_time time not NULL DEFAULT now()::TIME,
  UNIQUE(screening_id_fk, seat_id_fk)
);


create TABLE feedback(
  feedback_id serial PRIMARY key,
  score INTEGER not NULL CHECK (score >= 1 and score <= 5),
  review TEXT not NULL,
  feedback_date date not NULL DEFAULT now()::date,
  feedback_time time not NULL DEFAULT now()::TIME,
  movie_id_fk INTEGER not NULL REFERENCES movie(movie_id),
  cinema_user_id_fk INTEGER not NULL REFERENCES cinema_user(cinema_user_id)
);


insert into genre(name) VALUES
('action'),
('animation'),
('comedy'),
('crime'),
('drama'),
('experimental'),
('fantasy'),
('historical'),
('horror'),
('romance'),
('science fiction'),
('thriller'),
('western'),
('other');


insert into auditorium(name) VALUES
('Berlin'),
('New York'),
('London'),
('Kyiv'),
('Tokyo'),
('Amsterdam');


insert into seat(auditorium_id_fk, row, number) (
    select auditorium.auditorium_id, row, number from generate_series(1, 12) as number
    cross join generate_series(1, 10) as row
    cross join (
        select auditorium_id from auditorium where name='Berlin'
    ) as auditorium
);


insert into seat(auditorium_id_fk, row, number) (
    select auditorium.auditorium_id, row, number from generate_series(1, 14) as number
    cross join generate_series(1, 12) as row
    cross join (
        select auditorium_id from auditorium where name='New York'
    ) as auditorium
);


insert into seat(auditorium_id_fk, row, number) (
    select auditorium.auditorium_id, row, number from generate_series(1, 12) as number
    cross join generate_series(1, 9) as row
    cross join (
        select auditorium_id from auditorium where name='London'
    ) as auditorium
);


insert into seat(auditorium_id_fk, row, number) (
    select auditorium.auditorium_id, row, number from generate_series(1, 2) as number
    cross join generate_series(1, 6) as row
    cross join (
        select auditorium_id from auditorium where name='Kyiv'
    ) as auditorium
);


insert into seat(auditorium_id_fk, row, number) (
    select auditorium.auditorium_id, row, number from generate_series(1, 4) as number
    cross join generate_series(1, 6) as row
    cross join (
        select auditorium_id from auditorium where name='Tokyo'
    ) as auditorium
);


insert into seat(auditorium_id_fk, row, number) (
    select auditorium.auditorium_id, row, number from generate_series(1, 8) as number
    cross join generate_series(1, 6) as row
    cross join (
        select auditorium_id from auditorium where name='Amsterdam'
    ) as auditorium
);


insert INTO movie(title, duration, genre_id_fk, description) VALUES
('Start Wars', 200, (SELECT genre_id from genre where name='fantasy'), 'description'),
('Pirates of the Caribbean', 180, (SELECT genre_id from genre where name='fantasy'), 'description'),
('The Mask', 120, (SELECT genre_id from genre where name='comedy'), 'description'),
('Matrix', 170, (SELECT genre_id from genre where name='science fiction'), 'description'),
('Passengers', 190, (SELECT genre_id from genre where name='science fiction'), 'description'),
('It', 170, (SELECT genre_id from genre where name='horror'), 'description');
