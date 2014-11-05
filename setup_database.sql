grant all on `test`.* to 'data_rep'@'localhost' identified by 'password';

USE test;

-- bookcatalog table --
drop table IF EXISTS bookcatalog;
	
create table bookcatalog
(
	isbn varchar(50) NOT NULL PRIMARY KEY,
	name varchar(80),
	author varchar(50),
	price int,
	pages int
);

insert into bookcatalog values('0618260307' ,'The Hobbit' ,'J. R. R. Tolkien' , 596 , 365);
insert into bookcatalog values('0908606664' , 'Slinky Malinki' ,'Lynley Dodd' , 274 , 32);
insert into bookcatalog values('0141345659' , 'The Fault in Our Stars' , 'John Green' , 60 , 313);
insert into bookcatalog values('0393310728' , 'How to Lie with Statistics' , 'Darrell Huff' , 463 , 144);
insert into bookcatalog values('9780061122415' ,'The Alchemist' , 'Paulo Coelho' , 192 , 208);
insert into bookcatalog values('9780312361983' , 'Our Iceberg Is Melting' , 'John Kotter' , 291 , 160);
insert into bookcatalog values('9780452286375' , 'The Fountainhead' , 'Ayn Rand' , 258,724);
insert into bookcatalog values('0451147952' , 'Capitalism: The Unknown Ideal' , ' Nathaniel Branden',217,420);

select * from bookcatalog;

-- student table --

drop table IF EXISTS student;

create table student
(
	STUDENT_ID int,
	name varchar(50),
	maths int,
	english int,
	physics int,
	chemistry int,
	percentage int
);

insert into student values(1001 , 'Mr. Tucker' , 74 , 78 , 69 ,71 , 73);
insert into student values(1002 , 'Ms. Adele' , 50 , 65 , 60 , 63 , 59);
insert into student values(1003 , 'Mr. Al .Jamerncy' , 95 , 83 , 87 ,92 , 89);
insert into student values(1004 , 'Mr. Angel' ,54 , 62 , 54 , 62 , 58);
insert into student values(1005 , 'Mr. Anthony' , 91 ,79 , 83 , 87 , 85);
insert into student values(1006 , 'Ms. Barbara' , 54 , 80 , 76 ,56 , 66);
insert into student values(1007 , 'Mr. Arun' , 50 , 40 , 65 , 43 , 49);
insert into student values(1008 , 'Mr. Austin' , 75 , 73 , 64 ,76 , 72);
insert into student values(1009 , 'Mr. john' , 51 , 49 , 40 , 66 , 51);
insert into student values(1010 , 'Ms. Anna' , 68 , 74 , 88 ,86 , 79);

select * from student;
