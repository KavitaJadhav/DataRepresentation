grant all on `test`.* to 'data_rep'@'localhost' identified by 'password';

USE test;

-- bookcatalog table --
drop table IF EXISTS bookcatalog;
	
create table bookcatalog
(
	title varchar(50),
	price int,
	pages int
);

insert into bookcatalog values('book1' , 100 , 100);
insert into bookcatalog values('book2' , 500 , 140);
insert into bookcatalog values('book3' , 150 , 300);
insert into bookcatalog values('book4' , 310 , 410);
insert into bookcatalog values('book5' , 280 , 200);

select * from bookcatalog;

-- student table --

drop table IF EXISTS student;

create table student
(
	name varchar(50),
	percentage int,
	subjects int
);

insert into student values('student1' , 10 , 8);
insert into student values('student2' , 50 , 5);
insert into student values('student3' , 75 , 3);
insert into student values('student4' , 91 , 9);
insert into student values('student5' , 68 , 4);

select * from student;
