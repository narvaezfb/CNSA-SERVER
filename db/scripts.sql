	DROP TABLE IF EXISTS tbl_team_staff;
	DROP TABLE IF EXISTS tbl_team_player;
	DROP TABLE IF EXISTS tbl_game_team;
	DROP TABLE IF EXISTS tbl_player_scholarship;
	DROP TABLE IF EXISTS tbl_recruitment_incident;
	DROP TABLE IF EXISTS tbl_injury;
	DROP TABLE IF EXISTS tbl_player_statistics;
	DROP TABLE IF EXISTS tbl_player;
	DROP TABLE IF EXISTS tbl_position;

	DROP TABLE IF EXISTS tbl_game;
	DROP TABLE IF EXISTS tbl_stadium;
	DROP TABLE IF EXISTS tbl_team;
	DROP TABLE IF EXISTS tbl_school;
	DROP TABLE IF EXISTS tbl_location;
	DROP TABLE IF EXISTS tbl_province;

	DROP TABLE IF EXISTS tbl_school_type;
	DROP TABLE IF EXISTS tbl_staff;
	DROP TABLE IF EXISTS tbl_staff_type;
	DROP TABLE IF EXISTS tbl_game_type;
	DROP TABLE IF EXISTS tbl_recruitment_rules;
	DROP TABLE IF EXISTS tbl_scholarship;
	DROP TABLE IF EXISTS tbl_user_roles;



	--table position scripts
	CREATE TABLE tbl_position(
		position_id serial primary key unique,
		position_name varchar(50) unique not null
	);

	Insert into tbl_position(position_name) values ('Defender');
	Insert into tbl_position(position_name) values ('Goal-keeper');
	Insert into tbl_position(position_name) values ('Forward');
	Insert into tbl_position(position_name) values ('Midfielder');

	--table school type
	Create table tbl_province(
		province_id serial primary key unique,
		province_name varchar(100)
	);
	INSERT INTO tbl_province(province_name) VALUES ('Ontario');
	INSERT INTO tbl_province(province_name) VALUES ('Alberta');
	INSERT INTO tbl_province(province_name) VALUES ('Saskatchewan');
	INSERT INTO tbl_province(province_name) VALUES ('Quebec');
	INSERT INTO tbl_province(province_name) VALUES ('Prince Edward Island');
	INSERT INTO tbl_province(province_name) VALUES ('Nova Scotia');
	INSERT INTO tbl_province(province_name) VALUES ('Newfoundland');
	INSERT INTO tbl_province(province_name) VALUES ('New Brunswick');
	INSERT INTO tbl_province(province_name) VALUES ('Manitoba');
	INSERT INTO tbl_province(province_name) VALUES ('British Columbia');

	--table location
	Create table tbl_location(
		location_id serial primary key unique,
		location_name varchar(100) not null,
		location_street_address varchar(100) not null,
		location_zipcode varchar(6) not null,
		location_city varchar(100) not null,
		province_id int,
		country varchar(100) not null default('Canada'),
		Constraint fk_province foreign key (province_id) references tbl_province(province_id)
	);


	INSERT INTO public.tbl_location(
		location_name, location_street_address, location_zipcode, location_city, province_id, country)
		VALUES ( 'Albert High', 'Lot 15 south street', 'L1G8U5', 'Whitby', 1, 'Canada');

	INSERT INTO public.tbl_location(
		location_name, location_street_address, location_zipcode, location_city, province_id, country)
		VALUES ( 'Albert Town Stadium', 'Lot 50 Kingston', 'L1G8U5', 'Whitby', 1, 'Canada');

	INSERT INTO public.tbl_location(
		location_name, location_street_address, location_zipcode, location_city, province_id, country)
		VALUES ( 'Durham College', '2000 Simcoe St N', 'L1G0C5', 'Oshawa', 1, 'Canada');

	INSERT INTO tbl_location(
		location_name, location_street_address, location_zipcode, location_city, province_id, country)
	VALUES ( 'Kinsmen Civic Memorial Stadium', '89 Arena St', 'L1J7B1', 'Oshawa', 1, 'Canada');


	--table school type
	Create table tbl_school_type(
		school_type_id serial primary key unique,
		school_type varchar(100)
	);

	INSERT INTO tbl_school_type(school_type) VALUES ('HighSchool');
	INSERT INTO tbl_school_type(school_type) VALUES ('College');
	INSERT INTO tbl_school_type(school_type) VALUES ('University');
	INSERT INTO tbl_school_type(school_type) VALUES ('Vocational Schools');

	--table school
	Create table tbl_school(
		school_id serial primary key unique,
		school_name varchar(250) not null,
		location_id int,
		school_type_id int,
		Constraint fk_location foreign key (location_id) references tbl_location(location_id),
		Constraint fk_school_type foreign key (school_type_id) references tbl_school_type(school_type_id)
	);


	INSERT INTO public.tbl_school(
		school_name, location_id, school_type_id)
		VALUES ( 'Albert High', 1, 1);

	INSERT INTO public.tbl_school(
		school_name, location_id, school_type_id)
		VALUES ( 'Durham College', 3, 2);
	INSERT INTO tbl_school(
		school_name, location_id, school_type_id)
	VALUES ( 'Sinclair Secondary School', 2, 3);

	INSERT INTO tbl_school(
		school_name, location_id, school_type_id)
	VALUES ( 'Brooklin High School', 3, 1);


	--table teams scripts
	Create table tbl_team (
		team_id serial primary key unique,
		team_name varchar(100) unique not null,
		school_id int,
		Constraint fk_school foreign key (school_id) references tbl_school(school_id)
	);

	INSERT INTO tbl_team (team_name, school_id) VALUES ( 'Durham College Soccer Team' ,1);
	INSERT INTO tbl_team (team_name, school_id) VALUES ( 'Albert High Soccer Team',2);
	INSERT INTO tbl_team (team_name, school_id) VALUES ( 'Blue Devils FC',3);
	INSERT INTO tbl_team (team_name, school_id) VALUES ( 'Electric City FC',2);
	INSERT INTO tbl_team (team_name, school_id) VALUES ( '812 FC Barrie',1);
	INSERT INTO tbl_team (team_name, school_id) VALUES ( 'Guelph United',1);
	INSERT INTO tbl_team (team_name, school_id) VALUES ( 'FC London',3);
	INSERT INTO tbl_team (team_name, school_id) VALUES ( 'FC Manitoba',2);
	INSERT INTO tbl_team (team_name, school_id) VALUES ( 'Brantford Galaxy', 2);

	--table player scripts
	CREATE TABLE tbl_player (
		player_id serial primary key unique,
		player_email_address varchar(250) unique,
		player_first_name varchar(50),
		player_last_name varchar(50),
		player_date_of_birth date,
		position_id int,
		team_id int,
		ranking int,
		Constraint fk_position foreign key (position_id) references tbl_position(position_id),
		Constraint fk_team foreign key (team_id) references tbl_team(team_id)
	);

	INSERT INTO public.tbl_player(
		player_email_address, player_first_name, player_last_name, player_date_of_birth, position_id, team_id, ranking)
		VALUES ( 'fabian@example.com', 'Fabian', 'Example', '2000-08-07', 2, 1, 10);
	INSERT INTO public.tbl_player(
		player_email_address, player_first_name, player_last_name, player_date_of_birth, position_id, team_id, ranking)
		VALUES ( 'johndoe@example.com', 'John', 'Doe', '1998-02-11', 3, 2, 4);
	INSERT INTO tbl_player(
		player_email_address, player_first_name, player_last_name, player_date_of_birth, position_id, team_id, ranking)
		VALUES ( 'michel@example.com', 'Michel', 'Fournier', '2000-09-01', 2, 5, 18);
	INSERT INTO tbl_player(
		player_email_address, player_first_name, player_last_name, player_date_of_birth, position_id, team_id, ranking)
	VALUES ( 'Paul@example.com', 'Paul', 'Paquet', '2001-07-03', 2, 4, 5);
	INSERT INTO tbl_player(
		player_email_address, player_first_name, player_last_name, player_date_of_birth, position_id, team_id, ranking)
	VALUES ( 'Amable@example.com', 'Amable', 'Boucher', '2000-09-02', 3, 7, 6);
	INSERT INTO tbl_player(
		player_email_address, player_first_name, player_last_name, player_date_of_birth, position_id, team_id, ranking)
	VALUES ( 'Jacques@example.com', 'Jacques', 'Roy', '2003-09-04', 1, 4, 9);
	INSERT INTO tbl_player(
		player_email_address, player_first_name, player_last_name, player_date_of_birth, position_id, team_id, ranking)
	VALUES ( 'Alexis@example.com', 'Alexis', 'Caron', '2005-10-04', 1, 3, 3);
	INSERT INTO tbl_player(
		player_email_address, player_first_name, player_last_name, player_date_of_birth, position_id, team_id, ranking)
	VALUES ( 'Pierre@example.com', 'Pierre', 'Renaud', '2009-11-12', 4, 2, 7);
	INSERT INTO tbl_player(
		player_email_address, player_first_name, player_last_name, player_date_of_birth, position_id, team_id, ranking)
	VALUES ( 'Augustin@example.com', 'Augustin', 'Morin', '2000-10-11', 4, 1, 29);
	INSERT INTO tbl_player(
		player_email_address, player_first_name, player_last_name, player_date_of_birth, position_id, team_id, ranking)
	VALUES ( 'Gabriel@example.com', 'Gabriel', 'Paquet', '2007-02-05', 2, 3, 1);
	INSERT INTO tbl_player(
		player_email_address, player_first_name, player_last_name, player_date_of_birth, position_id, team_id, ranking)
	VALUES ( 'Charles@example.com', 'Charles', 'Demers', '2010-07-01', 3, 5, 2);
	INSERT INTO tbl_player(
		player_email_address, player_first_name, player_last_name, player_date_of_birth, position_id, team_id, ranking)
	VALUES ( 'Nicolas@example.com', 'Nicolas', 'Martin', '2011-07-01', 2, 5, 8);


	--table staff type scripts
	Create table tbl_staff_type(
		staff_type_id serial primary key unique,
		staff_type varchar(100) unique not null
	);

	INSERT INTO tbl_staff_type(staff_type) VALUES ('Head Coach');
	INSERT INTO tbl_staff_type(staff_type) VALUES ('Assistant Coach');
	INSERT INTO tbl_staff_type(staff_type) VALUES ('Manager');


	--table staff scripts
	Create table tbl_staff(
		staff_id serial primary key unique,
		staff_email varchar(250) unique not null,
		staff_password varchar(250) not null,
		staff_first_name varchar(50) not null,
		staff_last_name varchar(50) not null,
		staff_date_of_birth date,
		staff_type_id int not null,
		Constraint fk_staff_type foreign key (staff_type_id) references tbl_staff_type(staff_type_id)
	);

	INSERT INTO tbl_staff(staff_email,staff_password, staff_first_name,staff_last_name, staff_date_of_birth,staff_type_id)
	VALUES ('coachjm@durhamcollege.ca','badPa$$word','Jayton', 'McKenzie','1999-08-01',1);

	INSERT INTO tbl_staff(staff_email,staff_password, staff_first_name,staff_last_name, staff_date_of_birth,staff_type_id)
	VALUES ('coachcasey@example.com','pistons','Dwyane', 'Casey','1979-09-12',1);

	--table team staff
	Create table tbl_team_staff(
		team_staff_id serial primary key unique,
		team_staff_start_date date not null,
		team_staff_end_date date,
		team_id int,
		staff_id int,
		Constraint fk_team foreign key (team_id) references tbl_team(team_id),
		Constraint fk_staff foreign key (staff_id) references tbl_staff(staff_id)
	);

	INSERT INTO tbl_team_staff(team_staff_start_date,team_id,staff_id) VALUES ('2021-01-21',1,1);
	INSERT INTO tbl_team_staff(team_staff_start_date, team_staff_end_date, team_id,staff_id) VALUES ('2021-01-21','2021-12-08',2,2);

	Create table tbl_stadium(
		stadium_id serial primary key unique,
		stadium_name varchar(250),
		stadium_capacity int not null,
		location_id int,
		team_id int,
		Constraint fk_team foreign key (team_id) references tbl_team(team_id),
		Constraint fk_location foreign key (location_id) references tbl_location(location_id)
	);

	INSERT INTO tbl_stadium(stadium_name, stadium_capacity,location_id, team_id) VALUES ('Durham College Stadium' ,5000, 3 , 1);
	INSERT INTO tbl_stadium(stadium_name, stadium_capacity,location_id, team_id) VALUES ('Albert High School Arena' ,5000, 2 , 2);
	INSERT INTO tbl_stadium(stadium_name, stadium_capacity,location_id, team_id) VALUES ('Madison Square Garden' ,5000, 1 , 3);
	INSERT INTO tbl_stadium(stadium_name, stadium_capacity,location_id, team_id) VALUES ('Air Canada Centre' ,5000, 2 , 4);
	INSERT INTO tbl_stadium(stadium_name, stadium_capacity,location_id, team_id) VALUES ('Quicken Loans Arena' ,5000, 4 , 5);
	INSERT INTO tbl_stadium(stadium_name, stadium_capacity,location_id, team_id) VALUES ('Scotiabank Arena' ,5000, 2 , 6);
	INSERT INTO tbl_stadium(stadium_name, stadium_capacity,location_id, team_id) VALUES ('German Canadian Club' ,5000, 1 , 7);
	INSERT INTO tbl_stadium(stadium_name, stadium_capacity,location_id, team_id) VALUES ('Manitoba Field' ,5000, 2 , 8);
	INSERT INTO tbl_stadium(stadium_name, stadium_capacity,location_id, team_id) VALUES ('Heritage Field' ,5000, 4 , 9);

	--table team player
	Create table tbl_team_player(
		team_player_id serial primary key unique,
		team_id int,
		player_id int,
		Constraint fk_team foreign key (team_id) references tbl_team(team_id),
		Constraint fk_player foreign key (player_id) references tbl_player(player_id)
	);

	INSERT INTO tbl_team_player(team_id, player_id) VALUES (3,6);
	INSERT INTO tbl_team_player(team_id, player_id) VALUES (3,4);
	INSERT INTO tbl_team_player(team_id, player_id) VALUES (3,2);
	--table game type
	Create table tbl_game_type(
		game_type_id serial primary key unique,
		game_type varchar(100) not null
	);

	INSERT INTO tbl_game_type(game_type) VALUES ('Exhibition');
	INSERT INTO tbl_game_type(game_type) VALUES ('Playoff');
	INSERT INTO tbl_game_type(game_type) VALUES ('Pre-Season');
	INSERT INTO tbl_game_type(game_type) VALUES ('Season');

	Create table tbl_game(
		game_id serial primary key unique,
		ocurrance_date date not null, 
		game_attendance int not null, 
		stadium_id int not null,
		visitor_team_id int not null,
		visitor_team_score int not null,
		home_team_score int not null,
		game_type_id int not null,
		Constraint fk_stadium foreign key (stadium_id) references tbl_stadium(stadium_id),
		Constraint fk_visitor_team foreign key (visitor_team_id) references tbl_team(team_id), 
		Constraint fk_game_type_id foreign key (game_type_id) references tbl_game_type(game_type_id)
	);

	INSERT INTO tbl_game(ocurrance_date, game_attendance, stadium_id, visitor_team_id, visitor_team_score, home_team_score, game_type_id)
		VALUES ('2021-11-9',4210, 1, 2, 3, 2, 4);

	INSERT INTO tbl_game(ocurrance_date, game_attendance, stadium_id, visitor_team_id, visitor_team_score, home_team_score, game_type_id)
		VALUES ('2020-8-4',400, 1, 2, 5, 1, 4);



	--table game team
	Create table tbl_game_team(
		game_team_id serial primary key unique,
		is_visitor boolean  not null ,
		game_team_score int not null,
		team_id int not null,
		game_id int not null,
		Constraint fk_team foreign key (team_id) references tbl_team(team_id),
		Constraint fk_game foreign key (game_id) references tbl_game(game_id)
	);

	INSERT INTO tbl_game_team(is_visitor,game_team_score,team_id,game_id) VALUES (false, 0, 3,1);
	INSERT INTO tbl_game_team(is_visitor,game_team_score,team_id,game_id) VALUES (true, 2, 4,1);
	INSERT INTO tbl_game_team(is_visitor,game_team_score,team_id,game_id) VALUES (false, 4, 8,2);
	INSERT INTO tbl_game_team(is_visitor,game_team_score,team_id,game_id) VALUES (true, 5, 9,2);


	--table recruitment rules
	Create table tbl_recruitment_rules(
		recruitment_rule_id serial primary key unique,
		rule_name varchar(250) not null,
		rule_description varchar(250)
	);

	INSERT INTO tbl_recruitment_rules(rule_name, rule_description)
		VALUES ('Gift Count', 'Recruit was given gifts exceeding the regulation amount.');
	INSERT INTO tbl_recruitment_rules(rule_name, rule_description)
		VALUES ('Official On-Campus Visit Count', 'Recruit recieved official on-campus.');

	--table recruitment incident
	Create table tbl_recruitment_incident(
		incident_id serial primary key unique,
		incident_date date not null,
		incident_comments varchar(250),
		recruitment_rule_id int,
		team_id int,
		player_id int,
		Constraint fk_recruitment_rule foreign key (recruitment_rule_id) references tbl_recruitment_rules(recruitment_rule_id),
		Constraint fk_team foreign key (team_id) references tbl_team(team_id),
		Constraint fk_player foreign key (player_id) references tbl_player(player_id)
	);

	INSERT INTO tbl_recruitment_incident(incident_date,incident_comments,recruitment_rule_id, team_id, player_id)
		VALUES ('2020-07-28','John Doe was given an excess amount of official on-campus-visits during the recruitment process',2,5,2);

	INSERT INTO tbl_recruitment_incident(incident_date,incident_comments,recruitment_rule_id, team_id, player_id)
		VALUES ('2020-07-28','Mr.Fornier was given an excess amount of gifts during the recruitment process',1,5,3);

	--table schoolarship
	Create table tbl_scholarship(
		scholarship_id serial primary key unique,
		scholarship_name varchar(250) not null,
		scholarship_description varchar(250)
	);

	INSERT INTO tbl_scholarship(scholarship_name, scholarship_description)
		VALUES ('Full-Ride', 'Scholarship covers 100% of the major costs of attending college like tuition, room and board, books, and some course fees.');
	INSERT INTO tbl_scholarship(scholarship_name, scholarship_description)
		VALUES ('Partial', 'Scholarship covers a portion of the costs of attending the college/University.');
	INSERT INTO tbl_scholarship(scholarship_name, scholarship_description)
		VALUES ('Redshirt', 'Scholarship in which player is not allowed to play games for their freshman year');

	--table_player_scholarship
	Create table tbl_player_scholarship(
		player_scholarship_id serial primary key unique,
		scholarship_id int,
		player_id int,
		Constraint fk_scholarship foreign key (scholarship_id) references tbl_scholarship(scholarship_id),
		Constraint fk_player foreign key (player_id) references tbl_player(player_id)
	);

	INSERT INTO tbl_player_scholarship(scholarship_id,player_id) VALUES (2,4);
	INSERT INTO tbl_player_scholarship(scholarship_id,player_id) VALUES (2,4);
	INSERT INTO tbl_player_scholarship(scholarship_id,player_id) VALUES (2,4);

	--table injury
	Create table tbl_injury(
		injury_id serial primary key unique,
		injury_date date,
		description varchar(255),
		player_id int,
		Constraint fk_player foreign key (player_id) references tbl_player(player_id)
	);

	INSERT INTO tbl_injury(injury_date, description, player_id)
		VALUES ('2021-08-11', 'Pulled Hamstring', 3);
	INSERT INTO tbl_injury(injury_date, description, player_id)
		VALUES ('2021-12-5', 'Torn ACL', 3);
	INSERT INTO tbl_injury(injury_date, description, player_id)
		VALUES ('2021-11-28', 'Sprained Ankle', 5);

	--table player stats
	Create table tbl_player_statistics(
		tbl_player_statistic_id serial primary key unique,
		player_goal_kick int,
		player_corner_kick int,
		player_penalty_kick int,
		player_passes int,
		player_free_kicks int,
		player_turnovers int,
		player_touches int,
		player_red_cards int,
		player_yellow_cards int,
		player_fouls int,
		game_id int,
		player_id int,
		Constraint fk_player foreign key (player_id) references tbl_player(player_id),
		Constraint fk_game foreign key (game_id) references tbl_game(game_id)
	);

	INSERT into tbl_player_statistics(
	player_goal_kick, player_corner_kick,player_penalty_kick,player_passes,player_free_kicks,player_turnovers,
	player_touches,player_red_cards,player_yellow_cards,player_fouls,game_id,player_id) VALUES
	(2,6,3,8,1,2,6,2,8,11,1,1);

	INSERT into tbl_player_statistics(
	player_goal_kick, player_corner_kick,player_penalty_kick,player_passes,player_free_kicks,player_turnovers,
	player_touches,player_red_cards,player_yellow_cards,player_fouls,game_id,player_id) VALUES
	(1,4,1,5,1,2,6,8,6,4,1,2);

	INSERT into tbl_player_statistics(
	player_goal_kick, player_corner_kick,player_penalty_kick,player_passes,player_free_kicks,player_turnovers,
	player_touches,player_red_cards,player_yellow_cards,player_fouls,game_id,player_id) VALUES
	(1,1,1,1,1,2,6,0,6,4,1,3);

	INSERT into tbl_player_statistics(
	player_goal_kick, player_corner_kick,player_penalty_kick,player_passes,player_free_kicks,player_turnovers,
	player_touches,player_red_cards,player_yellow_cards,player_fouls,game_id,player_id) VALUES
	(1,2,1,1,1,2,4,7,6,4,1,4);

	INSERT into tbl_player_statistics(
	player_goal_kick, player_corner_kick,player_penalty_kick,player_passes,player_free_kicks,player_turnovers,
	player_touches,player_red_cards,player_yellow_cards,player_fouls,game_id,player_id) VALUES
	(3,0,1,1,2,2,6,6,6,4,1,5);

	INSERT into tbl_player_statistics(
	player_goal_kick, player_corner_kick,player_penalty_kick,player_passes,player_free_kicks,player_turnovers,
	player_touches,player_red_cards,player_yellow_cards,player_fouls,game_id,player_id) VALUES
	(1,2,0,1,0,2,8,4,1,4,1,6);

	--table_user_roles
	Create table tbl_user_roles(
		role_id serial primary key unique,
		role_type varchar(50)
	);

	INSERT INTO tbl_user_roles(role_type) VALUES ('admin');
	INSERT INTO tbl_user_roles(role_type) VALUES ('manager');
	INSERT INTO tbl_user_roles(role_type) VALUES ('coach');
