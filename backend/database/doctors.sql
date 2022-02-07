DROP DATABASE IF EXISTS doctorsapi;

CREATE DATABASE doctorsapi;

\c doctorsapi;

CREATE Table doctors
(
    id Serial PRIMARY KEY,
    doctor VARCHAR
);

CREATE Table appointments
(
    id Serial PRIMARY Key,
    apt_month int,
    apt_day int,
    apt_year int,
    apt_hour int,
    apt_min int,
    apt_doctor VARCHAR
);

INSERT into doctors
    (doctor)
VALUES
    ('Richard Harris'),
    ('Anita Narulo'),
    ('James Williams');

INSERT into appointments
    ( apt_month, apt_day, apt_year, apt_hour, apt_min, apt_doctor)
VALUES
    (2,14,2022,8,30,'Richard Harris'),
    (2,18,2022,10,30,'Anita Narulo'),
    (2,20,2022,8,30,'James Williams');