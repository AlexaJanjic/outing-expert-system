TRUNCATE TABLE venue_events RESTART IDENTITY CASCADE;
TRUNCATE TABLE venue_supported_music RESTART IDENTITY CASCADE;
TRUNCATE TABLE venues RESTART IDENTITY CASCADE;
INSERT INTO venues
(id,name,average_price,crowded,capacity,dj_performance,
 private_tables,premium_service,outdoor_seating,
 quality_food,games_available,sports_streaming,
 noise_level,social_level,atmosphere_level,
 comfort_level,service_level)
VALUES
    (1,'Moonlight Lounge',3500,false,60,false,true,false,true,true,false,false,1,2,10,10,8),
    (2,'Royal Restaurant',9000,false,80,false,true,true,false,true,false,false,1,2,10,10,10),
    (3,'Blue Note Jazz Bar',2500,false,90,false,true,false,false,true,false,false,2,4,9,8,8),
    (4,'Techno Club X',2000,true,700,true,false,false,false,false,false,false,10,10,8,3,4),
    (5,'Party Factory',1800,true,500,true,false,false,false,false,false,false,10,10,7,4,4),
    (6,'Rock Station',1800,true,350,false,false,false,false,false,false,false,8,8,7,5,5),
    (7,'Student Pub',800,true,300,false,false,false,false,false,true,true,7,10,5,4,4),
    (8,'Game House',1800,true,150,false,false,false,false,false,true,false,6,8,6,5,5),
    (9,'Sports Corner',1500,true,250,false,false,false,false,false,false,true,7,8,5,5,5),
    (10,'River Terrace',2800,false,100,false,false,false,true,true,false,false,2,3,8,9,7);

INSERT INTO venue_supported_music (venue_id,supported_music) VALUES
-- Moonlight Lounge
(1,'JAZZ'),
(1,'FOLK'),
-- Royal Restaurant
(2,'JAZZ'),
(2,'POP'),
-- Blue Note Jazz Bar
(3,'JAZZ'),
-- Techno Club X
(4,'TECHNO'),
-- Party Factory
(5,'TECHNO'),
(5,'POP'),
-- Rock Station
(6,'ROCK'),
-- Student Pub
(7,'POP'),
(7,'ROCK'),
-- Game House
(8,'POP'),
-- Sports Corner
(9,'ROCK'),
(9,'POP'),

-- River Terrace
(10,'FOLK'),
(10,'JAZZ');

INSERT INTO venue_events (venue_id,events) VALUES
-- Moonlight Lounge
(1,'ACOUSTIC'),
-- Royal Restaurant
(2,'LIVE_BAND'),
(2,'ACOUSTIC'),
-- Blue Note Jazz Bar
(3,'LIVE_BAND'),
-- Techno Club X
(4,'DJ'),
-- Party Factory
(5,'DJ'),
(5,'KARAOKE'),
-- Rock Station
(6,'LIVE_BAND'),
-- Student Pub
(7,'KARAOKE'),
-- Game House
(8,'KARAOKE'),
(8,'DJ'),
-- Sports Corner
(9,'DJ'),
-- River Terrace
(10,'ACOUSTIC');