--
-- PostgreSQL database dump
--

-- Dumped from database version 14.13 (Homebrew)
-- Dumped by pg_dump version 14.13 (Homebrew)

SET statement_timeout = 0;
SET lock_timeout = 0;
SET idle_in_transaction_session_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

SET default_tablespace = '';

SET default_table_access_method = heap;

--
-- Name: budgets; Type: TABLE; Schema: public; Owner: tpl522_14
--

CREATE TABLE public.budgets (
    budget_id integer NOT NULL,
    trip_id integer,
    destination_country character varying(50),
    budget_date date,
    place_name character varying(100),
    budget_timestamp timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    starting_amount numeric(10,2),
    new_amount numeric(10,2),
    category character varying(50),
    currency character varying(10),
    notes text,
    location character varying(100),
    star_rating integer
);


ALTER TABLE public.budgets OWNER TO tpl522_14;

--
-- Name: budgets_budget_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl522_14
--

CREATE SEQUENCE public.budgets_budget_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.budgets_budget_id_seq OWNER TO tpl522_14;

--
-- Name: budgets_budget_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl522_14
--

ALTER SEQUENCE public.budgets_budget_id_seq OWNED BY public.budgets.budget_id;


--
-- Name: spendings; Type: TABLE; Schema: public; Owner: tpl522_14
--

CREATE TABLE public.spendings (
    spend_id integer NOT NULL,
    budget_id integer,
    category character varying(50),
    amount numeric(10,2),
    note text,
    photo character varying(100)
);


ALTER TABLE public.spendings OWNER TO tpl522_14;

--
-- Name: spendings_spend_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl522_14
--

CREATE SEQUENCE public.spendings_spend_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.spendings_spend_id_seq OWNER TO tpl522_14;

--
-- Name: spendings_spend_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl522_14
--

ALTER SEQUENCE public.spendings_spend_id_seq OWNED BY public.spendings.spend_id;


--
-- Name: trips; Type: TABLE; Schema: public; Owner: tpl522_14
--

CREATE TABLE public.trips (
    trip_id integer NOT NULL,
    user_id integer,
    destination_country character varying(50),
    destination_city character varying(50),
    arrival_date date,
    departure_date date
);


ALTER TABLE public.trips OWNER TO tpl522_14;

--
-- Name: trips_trip_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl522_14
--

CREATE SEQUENCE public.trips_trip_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.trips_trip_id_seq OWNER TO tpl522_14;

--
-- Name: trips_trip_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl522_14
--

ALTER SEQUENCE public.trips_trip_id_seq OWNED BY public.trips.trip_id;


--
-- Name: users; Type: TABLE; Schema: public; Owner: tpl522_14
--

CREATE TABLE public.users (
    user_id integer NOT NULL,
    email character varying(100) NOT NULL,
    password character varying(100) NOT NULL,
    username character varying(100) NOT NULL,
    home_country character varying(50),
    home_city character varying(50),
    home_currency character varying(10)
);


ALTER TABLE public.users OWNER TO tpl522_14;

--
-- Name: users_user_id_seq; Type: SEQUENCE; Schema: public; Owner: tpl522_14
--

CREATE SEQUENCE public.users_user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.users_user_id_seq OWNER TO tpl522_14;

--
-- Name: users_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: tpl522_14
--

ALTER SEQUENCE public.users_user_id_seq OWNED BY public.users.user_id;


--
-- Name: budgets budget_id; Type: DEFAULT; Schema: public; Owner: tpl522_14
--

ALTER TABLE ONLY public.budgets ALTER COLUMN budget_id SET DEFAULT nextval('public.budgets_budget_id_seq'::regclass);


--
-- Name: spendings spend_id; Type: DEFAULT; Schema: public; Owner: tpl522_14
--

ALTER TABLE ONLY public.spendings ALTER COLUMN spend_id SET DEFAULT nextval('public.spendings_spend_id_seq'::regclass);


--
-- Name: trips trip_id; Type: DEFAULT; Schema: public; Owner: tpl522_14
--

ALTER TABLE ONLY public.trips ALTER COLUMN trip_id SET DEFAULT nextval('public.trips_trip_id_seq'::regclass);


--
-- Name: users user_id; Type: DEFAULT; Schema: public; Owner: tpl522_14
--

ALTER TABLE ONLY public.users ALTER COLUMN user_id SET DEFAULT nextval('public.users_user_id_seq'::regclass);


--
-- Data for Name: budgets; Type: TABLE DATA; Schema: public; Owner: tpl522_14
--

COPY public.budgets (budget_id, trip_id, destination_country, budget_date, place_name, budget_timestamp, starting_amount, new_amount, category, currency, notes, location, star_rating) FROM stdin;
1	1	France	2023-10-01	Eiffel Tower Visit	2024-10-17 15:21:53.507713	1000.00	900.00	Sightseeing	EUR	Sightseeing expenses	Paris, France	5
2	2	Japan	2024-01-15	Tokyo Disneyland	2024-10-17 15:21:53.507713	1200.00	1000.00	Entertainment	JPY	Amusement park visit	Tokyo, Japan	4
3	3	USA	2023-11-20	Hollywood Tour	2024-10-17 15:21:53.507713	1500.00	1300.00	Tour	USD	Hollywood tour package	Los Angeles, USA	5
4	4	Italy	2024-02-05	Colosseum Tour	2024-10-17 15:21:53.507713	800.00	700.00	Sightseeing	EUR	Colosseum entry fee	Rome, Italy	5
5	5	Spain	2023-12-10	Barcelona City Tour	2024-10-17 15:21:53.507713	600.00	550.00	Tour	EUR	Barcelona sightseeing	Barcelona, Spain	4
\.


--
-- Data for Name: spendings; Type: TABLE DATA; Schema: public; Owner: tpl522_14
--

COPY public.spendings (spend_id, budget_id, category, amount, note, photo) FROM stdin;
1	1	Food	50.00	I had a delightful dinner at a local restaurant. The ambiance was cozy, and the staff was very welcoming. I ordered the house special, which was a delicious seafood dish. It was a great way to experience the local cuisine.	photo1.jpg
2	1	Transport	30.00	The taxi fare covered my journey from the hotel to the city center. The driver was friendly and shared some interesting insights about the area. I felt safe throughout the ride, and the fare was reasonable given the distance.	photo2.jpg
3	2	Shopping	200.00	I bought several souvenirs to remember my trip. The items included local handicrafts, which reflect the culture and artistry of the region. Each piece tells a story and will remind me of the wonderful experiences I had during my travels.	photo3.jpg
4	3	Food	100.00	For lunch, I visited a popular spot in Hollywood. The food was fantastic, and I tried some local favorites. The restaurant was filled with movie memorabilia, making it a fun experience to eat there. I recommend trying their signature burger!	photo4.jpg
5	4	Tickets	150.00	I purchased tickets for entry to the Colosseum. The historic significance of this landmark is astounding, and standing inside felt surreal. The guided tour provided insights into its rich history and architectural marvel. It was a highlight of my trip to Rome.	photo5.jpg
\.


--
-- Data for Name: trips; Type: TABLE DATA; Schema: public; Owner: tpl522_14
--

COPY public.trips (trip_id, user_id, destination_country, destination_city, arrival_date, departure_date) FROM stdin;
1	1	France	Paris	2023-10-01	2023-10-10
2	1	Japan	Tokyo	2024-01-15	2024-01-25
3	2	USA	Los Angeles	2023-11-20	2023-11-30
4	3	Italy	Rome	2024-02-05	2024-02-15
5	4	Spain	Barcelona	2023-12-10	2023-12-20
6	5	Brazil	Rio de Janeiro	2024-03-01	2024-03-10
\.


--
-- Data for Name: users; Type: TABLE DATA; Schema: public; Owner: tpl522_14
--

COPY public.users (user_id, email, password, username, home_country, home_city, home_currency) FROM stdin;
1	user1@example.com	password1	UserOne	USA	New York	USD
2	user2@example.com	password2	UserTwo	UK	London	GBP
3	user3@example.com	password3	UserThree	Canada	Toronto	CAD
4	user4@example.com	password4	UserFour	Australia	Sydney	AUD
5	user5@example.com	password5	UserFive	Germany	Berlin	EUR
\.


--
-- Name: budgets_budget_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl522_14
--

SELECT pg_catalog.setval('public.budgets_budget_id_seq', 5, true);


--
-- Name: spendings_spend_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl522_14
--

SELECT pg_catalog.setval('public.spendings_spend_id_seq', 5, true);


--
-- Name: trips_trip_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl522_14
--

SELECT pg_catalog.setval('public.trips_trip_id_seq', 6, true);


--
-- Name: users_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: tpl522_14
--

SELECT pg_catalog.setval('public.users_user_id_seq', 5, true);


--
-- Name: budgets budgets_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl522_14
--

ALTER TABLE ONLY public.budgets
    ADD CONSTRAINT budgets_pkey PRIMARY KEY (budget_id);


--
-- Name: spendings spendings_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl522_14
--

ALTER TABLE ONLY public.spendings
    ADD CONSTRAINT spendings_pkey PRIMARY KEY (spend_id);


--
-- Name: trips trips_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl522_14
--

ALTER TABLE ONLY public.trips
    ADD CONSTRAINT trips_pkey PRIMARY KEY (trip_id);


--
-- Name: users users_pkey; Type: CONSTRAINT; Schema: public; Owner: tpl522_14
--

ALTER TABLE ONLY public.users
    ADD CONSTRAINT users_pkey PRIMARY KEY (user_id);


--
-- Name: budgets budgets_trip_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl522_14
--

ALTER TABLE ONLY public.budgets
    ADD CONSTRAINT budgets_trip_id_fkey FOREIGN KEY (trip_id) REFERENCES public.trips(trip_id) ON DELETE CASCADE;


--
-- Name: spendings spendings_budget_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl522_14
--

ALTER TABLE ONLY public.spendings
    ADD CONSTRAINT spendings_budget_id_fkey FOREIGN KEY (budget_id) REFERENCES public.budgets(budget_id) ON DELETE CASCADE;


--
-- Name: trips trips_user_id_fkey; Type: FK CONSTRAINT; Schema: public; Owner: tpl522_14
--

ALTER TABLE ONLY public.trips
    ADD CONSTRAINT trips_user_id_fkey FOREIGN KEY (user_id) REFERENCES public.users(user_id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

