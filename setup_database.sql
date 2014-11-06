grant all on `test`.* to 'data_rep'@'localhost' identified by 'password';

USE test;

-- bookcatalog table --
drop table IF EXISTS bookcatalog;
	
create table bookcatalog
(
	isbn varchar(50) NOT NULL PRIMARY KEY , 
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


-- Crime details --

drop table IF EXISTS CrimeDetails;

create table CrimeDetails
(
	state varchar(20),
	murder decimal(10,2),
	Robbery decimal(10,2),
	burglary decimal(10,2),
	population int
);

insert into CrimeDetails values( "Alabama" , 8.2 , 141.4 , 953.8 ,2802434);
insert into CrimeDetails values( "California", 6.9 , 176.1 , 693.3 , 36756666);
insert into CrimeDetails values( "Kansas" , 3.7 , 38.4 , 689.2 , 2802134);
insert into CrimeDetails values( "Hawaii" , 2.2 , 89.0 , 552.9 , 10003422);
insert into CrimeDetails values( "Iowa" , 7.0 , 49.4 , 285.4 , 2032668);
insert into CrimeDetails values( "Massachusetts" , 1.9, 77.8 , 836.0 , 3790260);
insert into CrimeDetails values( "Wyoming" , 4.1 , 33.5 , 374.0 , 1949097);
insert into CrimeDetails values( "New Hampshire" , 3.6 , 7.1 , 990.2 , 510168);
insert into CrimeDetails values( "Oregon" , 9.3 , 27.8 , 630.3 , 11485910);
insert into CrimeDetails values( "Massachusetts" , 5.4 , 11.5 , 384.9 , 298888);
insert into CrimeDetails values( "Maine" , 4.2 , 71.0 , 762.9 , 6214998);
insert into CrimeDetails values( "Minnesota" , 7.0 , 22.6 , 884.0 , 10003462);
insert into CrimeDetails values( "Louisiana" , 9.3 , 27.8 , 630.3 , 5326689);
insert into CrimeDetails values( "Pennsylvania" , 1.1 , 23.4 , 452.0 , 185910);
insert into CrimeDetails values( "Nebraska" , 8.7 , 43.0 , 675.9 , 1006456);
insert into CrimeDetails values( "Minnesota" , 6.9 , 186.1 , 693.3 , 194907);
insert into CrimeDetails values( "New York" , 4.1 , 33.5 , 374.0 , 19222414);
insert into CrimeDetails values( "Michigan" , 2.9 , 176.1 , 693.3 , 532668);
insert into CrimeDetails values( "Rhode Island" ,  6.9 , 146.1 , 603.3 , 3790060);
insert into CrimeDetails values( "Missouri" , 4.1 , 33.5 , 374.0 , 1016456);
insert into CrimeDetails values( "Florida" , 3.5 , 65.3 , 876.2 , 24326970);
insert into CrimeDetails values( "Arizona" , 8.7 , 43.0 , 675.9 , 114859);
insert into CrimeDetails values( "Nevada" , 2.4 , 42.5 , 765.2 , 19490297);
insert into CrimeDetails values( "Tennessee" , 4.1 , 33.5 , 304.0 , 6214888);
insert into CrimeDetails values( "Wisconsin" , 2.3 , 62.4 , 983.9 , 24326974);
insert into CrimeDetails values( "Mississippi" , 4.1 , 73.5 , 374.0 , 10000422);
insert into CrimeDetails values( "Ohio" , 8.7 , 43.0 , 675.9 , 621488);
insert into CrimeDetails values( "New Mexico" , 2.1 , 47.3 , 364.0 , 9222414);
insert into CrimeDetails values( "Oklahoma" , 4.1 , 33.5 , 374.0 , 62148);
insert into CrimeDetails values( "Texas" , 12.8 , 87.3 , 1000.2 , 131456);
insert into CrimeDetails values( "Wisconsin" , 3.6 , 36.4 , 378.4 , 621038);
insert into CrimeDetails values( "South Carolina" , 3.6 , 35.4 , 748.9 , 3090060);
insert into CrimeDetails values( "Tennessee" , 8.7 , 43.0 , 675.9 , 4314888);
insert into CrimeDetails values( "Massachusetts" , 1.0 , 32.1 , 724.0, 1949029);
insert into CrimeDetails values( "Delaware" , 7.3 , 4.5 , 983 , 24365974);

select * from CrimeDetails;