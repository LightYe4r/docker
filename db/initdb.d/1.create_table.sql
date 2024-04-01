create table users (
   id int not null, 
   name varchar(255) primary key, 
   password varchar(255) not null
);

create table attendance (
   id int auto_increment primary key,
   date DATE not null,
   start_time datetime default null,
   end_time datetime default null,
   name varchar(255) not null,
   FOREIGN KEY (name) REFERENCES users(name)
);