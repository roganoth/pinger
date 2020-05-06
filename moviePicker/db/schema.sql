create database lists;
use lists;

create table movies
(
    id int
    auto_increment not null,
title varchar
    (50) not null,
synopsis varchar
    (500),
rating int,
would_watch_again boolean,
random_value int,
primary key
    (id)
)
