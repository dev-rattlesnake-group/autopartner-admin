--
-- PostgreSQL database cluster dump
--

SET default_transaction_read_only = off;

SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;

--
-- Drop databases (except postgres and template1)
--

DROP DATABASE "AUTOPARTNER";




--
-- Drop roles
--

DROP ROLE autopartner_admin;


--
-- Roles
--

CREATE ROLE autopartner_admin;
ALTER ROLE autopartner_admin WITH SUPERUSER INHERIT CREATEROLE CREATEDB LOGIN REPLICATION BYPASSRLS PASSWORD 'SCRAM-SHA-256$4096:ymxnVkZAhXN1nsgA2/cppg==$sx6lqRr42GnhLtuJuT9DPXI4/WgGVSOFYCz0XZ7ddgc=:os7GcHQf5Yb1chsyrqkcYfb8wokJ60vqhTD1d52KRcw=';

--
-- User Configurations
--








--
-- Databases
--

--
-- Database "template1" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (Debian 16.3-1.pgdg120+1)
-- Dumped by pg_dump version 16.3 (Debian 16.3-1.pgdg120+1)

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

UPDATE pg_catalog.pg_database SET datistemplate = false WHERE datname = 'template1';
DROP DATABASE template1;
--
-- Name: template1; Type: DATABASE; Schema: -; Owner: autopartner_admin
--

CREATE DATABASE template1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE template1 OWNER TO autopartner_admin;

\connect template1

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

--
-- Name: DATABASE template1; Type: COMMENT; Schema: -; Owner: autopartner_admin
--

COMMENT ON DATABASE template1 IS 'default template for new databases';


--
-- Name: template1; Type: DATABASE PROPERTIES; Schema: -; Owner: autopartner_admin
--

ALTER DATABASE template1 IS_TEMPLATE = true;


\connect template1

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

--
-- Name: DATABASE template1; Type: ACL; Schema: -; Owner: autopartner_admin
--

REVOKE CONNECT,TEMPORARY ON DATABASE template1 FROM PUBLIC;
GRANT CONNECT ON DATABASE template1 TO PUBLIC;


--
-- PostgreSQL database dump complete
--

--
-- Database "AUTOPARTNER" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (Debian 16.3-1.pgdg120+1)
-- Dumped by pg_dump version 16.3 (Debian 16.3-1.pgdg120+1)

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

--
-- Name: AUTOPARTNER; Type: DATABASE; Schema: -; Owner: autopartner_admin
--

CREATE DATABASE "AUTOPARTNER" WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE "AUTOPARTNER" OWNER TO autopartner_admin;

\connect "AUTOPARTNER"

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
-- Name: accounts; Type: TABLE; Schema: public; Owner: autopartner_admin
--

CREATE TABLE public.accounts (
    id integer NOT NULL,
    login character varying NOT NULL,
    role character varying,
    password_hash character varying NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.accounts OWNER TO autopartner_admin;

--
-- Name: accounts_id_seq; Type: SEQUENCE; Schema: public; Owner: autopartner_admin
--

CREATE SEQUENCE public.accounts_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.accounts_id_seq OWNER TO autopartner_admin;

--
-- Name: accounts_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: autopartner_admin
--

ALTER SEQUENCE public.accounts_id_seq OWNED BY public.accounts.id;


--
-- Name: brands; Type: TABLE; Schema: public; Owner: autopartner_admin
--

CREATE TABLE public.brands (
    name character varying NOT NULL
);


ALTER TABLE public.brands OWNER TO autopartner_admin;

--
-- Name: categories; Type: TABLE; Schema: public; Owner: autopartner_admin
--

CREATE TABLE public.categories (
    name character varying NOT NULL
);


ALTER TABLE public.categories OWNER TO autopartner_admin;

--
-- Name: event_details; Type: TABLE; Schema: public; Owner: autopartner_admin
--

CREATE TABLE public.event_details (
    id integer NOT NULL,
    event_id integer NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL
);


ALTER TABLE public.event_details OWNER TO autopartner_admin;

--
-- Name: event_details_id_seq; Type: SEQUENCE; Schema: public; Owner: autopartner_admin
--

CREATE SEQUENCE public.event_details_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.event_details_id_seq OWNER TO autopartner_admin;

--
-- Name: event_details_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: autopartner_admin
--

ALTER SEQUENCE public.event_details_id_seq OWNED BY public.event_details.id;


--
-- Name: events; Type: TABLE; Schema: public; Owner: autopartner_admin
--

CREATE TABLE public.events (
    id integer NOT NULL,
    title character varying NOT NULL,
    description character varying NOT NULL,
    expired_date date NOT NULL,
    image_url character varying,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.events OWNER TO autopartner_admin;

--
-- Name: events_id_seq; Type: SEQUENCE; Schema: public; Owner: autopartner_admin
--

CREATE SEQUENCE public.events_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.events_id_seq OWNER TO autopartner_admin;

--
-- Name: events_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: autopartner_admin
--

ALTER SEQUENCE public.events_id_seq OWNED BY public.events.id;


--
-- Name: feedbacks; Type: TABLE; Schema: public; Owner: autopartner_admin
--

CREATE TABLE public.feedbacks (
    id integer NOT NULL,
    content character varying NOT NULL,
    author character varying NOT NULL,
    company character varying,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    date date NOT NULL
);


ALTER TABLE public.feedbacks OWNER TO autopartner_admin;

--
-- Name: feedbacks_id_seq; Type: SEQUENCE; Schema: public; Owner: autopartner_admin
--

CREATE SEQUENCE public.feedbacks_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.feedbacks_id_seq OWNER TO autopartner_admin;

--
-- Name: feedbacks_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: autopartner_admin
--

ALTER SEQUENCE public.feedbacks_id_seq OWNED BY public.feedbacks.id;


--
-- Name: migrations; Type: TABLE; Schema: public; Owner: autopartner_admin
--

CREATE TABLE public.migrations (
    id integer NOT NULL,
    "timestamp" bigint NOT NULL,
    name character varying NOT NULL
);


ALTER TABLE public.migrations OWNER TO autopartner_admin;

--
-- Name: migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: autopartner_admin
--

CREATE SEQUENCE public.migrations_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.migrations_id_seq OWNER TO autopartner_admin;

--
-- Name: migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: autopartner_admin
--

ALTER SEQUENCE public.migrations_id_seq OWNED BY public.migrations.id;


--
-- Name: news; Type: TABLE; Schema: public; Owner: autopartner_admin
--

CREATE TABLE public.news (
    id integer NOT NULL,
    title character varying NOT NULL,
    content character varying NOT NULL,
    image_url character varying,
    date date NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.news OWNER TO autopartner_admin;

--
-- Name: news_id_seq; Type: SEQUENCE; Schema: public; Owner: autopartner_admin
--

CREATE SEQUENCE public.news_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.news_id_seq OWNER TO autopartner_admin;

--
-- Name: news_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: autopartner_admin
--

ALTER SEQUENCE public.news_id_seq OWNED BY public.news.id;


--
-- Name: products; Type: TABLE; Schema: public; Owner: autopartner_admin
--

CREATE TABLE public.products (
    id integer NOT NULL,
    category character varying NOT NULL,
    brand character varying NOT NULL,
    engine character varying,
    transmission character varying,
    max_weight character varying,
    cabin_type character varying,
    suspension_type character varying,
    suspension_cabin character varying,
    suspension_chassis character varying,
    brake_type character varying,
    wheel_formula character varying,
    axles_number character varying,
    fifth_wheel_height character varying,
    trailer_volume character varying,
    trailer_length character varying,
    euro character varying,
    image_url character varying,
    account_id integer NOT NULL,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL,
    name character varying(255),
    in_stock boolean,
    vehicles_year character varying(255),
    options character varying(255),
    price bigint NOT NULL,
    color character varying(255),
    image_urls text[]
);


ALTER TABLE public.products OWNER TO autopartner_admin;

--
-- Name: COLUMN products.engine; Type: COMMENT; Schema: public; Owner: autopartner_admin
--

COMMENT ON COLUMN public.products.engine IS 'Двигатель';


--
-- Name: COLUMN products.transmission; Type: COMMENT; Schema: public; Owner: autopartner_admin
--

COMMENT ON COLUMN public.products.transmission IS 'Коробка передач';


--
-- Name: COLUMN products.max_weight; Type: COMMENT; Schema: public; Owner: autopartner_admin
--

COMMENT ON COLUMN public.products.max_weight IS 'Разрешённая макс. масса';


--
-- Name: COLUMN products.cabin_type; Type: COMMENT; Schema: public; Owner: autopartner_admin
--

COMMENT ON COLUMN public.products.cabin_type IS 'Тип кабины';


--
-- Name: COLUMN products.suspension_type; Type: COMMENT; Schema: public; Owner: autopartner_admin
--

COMMENT ON COLUMN public.products.suspension_type IS 'Тип подвески';


--
-- Name: COLUMN products.suspension_cabin; Type: COMMENT; Schema: public; Owner: autopartner_admin
--

COMMENT ON COLUMN public.products.suspension_cabin IS 'Подвеска кабины';


--
-- Name: COLUMN products.suspension_chassis; Type: COMMENT; Schema: public; Owner: autopartner_admin
--

COMMENT ON COLUMN public.products.suspension_chassis IS 'Подвеска шасси';


--
-- Name: COLUMN products.brake_type; Type: COMMENT; Schema: public; Owner: autopartner_admin
--

COMMENT ON COLUMN public.products.brake_type IS 'Тип тормозов';


--
-- Name: COLUMN products.wheel_formula; Type: COMMENT; Schema: public; Owner: autopartner_admin
--

COMMENT ON COLUMN public.products.wheel_formula IS 'Колесная формула';


--
-- Name: COLUMN products.axles_number; Type: COMMENT; Schema: public; Owner: autopartner_admin
--

COMMENT ON COLUMN public.products.axles_number IS 'Количество осей';


--
-- Name: COLUMN products.fifth_wheel_height; Type: COMMENT; Schema: public; Owner: autopartner_admin
--

COMMENT ON COLUMN public.products.fifth_wheel_height IS 'Высота седельного устройства';


--
-- Name: COLUMN products.trailer_volume; Type: COMMENT; Schema: public; Owner: autopartner_admin
--

COMMENT ON COLUMN public.products.trailer_volume IS 'Объем прицепа';


--
-- Name: COLUMN products.trailer_length; Type: COMMENT; Schema: public; Owner: autopartner_admin
--

COMMENT ON COLUMN public.products.trailer_length IS 'Длина прицепа';


--
-- Name: COLUMN products.euro; Type: COMMENT; Schema: public; Owner: autopartner_admin
--

COMMENT ON COLUMN public.products.euro IS 'Класс выхлопа EURO';


--
-- Name: COLUMN products.image_url; Type: COMMENT; Schema: public; Owner: autopartner_admin
--

COMMENT ON COLUMN public.products.image_url IS 'URL изображения';


--
-- Name: COLUMN products.in_stock; Type: COMMENT; Schema: public; Owner: autopartner_admin
--

COMMENT ON COLUMN public.products.in_stock IS 'В наличие';


--
-- Name: COLUMN products.vehicles_year; Type: COMMENT; Schema: public; Owner: autopartner_admin
--

COMMENT ON COLUMN public.products.vehicles_year IS 'Год выпуска';


--
-- Name: COLUMN products.options; Type: COMMENT; Schema: public; Owner: autopartner_admin
--

COMMENT ON COLUMN public.products.options IS 'Дополнительные опции';


--
-- Name: products_id_seq; Type: SEQUENCE; Schema: public; Owner: autopartner_admin
--

CREATE SEQUENCE public.products_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.products_id_seq OWNER TO autopartner_admin;

--
-- Name: products_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: autopartner_admin
--

ALTER SEQUENCE public.products_id_seq OWNED BY public.products.id;


--
-- Name: vacancies; Type: TABLE; Schema: public; Owner: autopartner_admin
--

CREATE TABLE public.vacancies (
    id integer NOT NULL,
    title character varying NOT NULL,
    description_1 character varying,
    description_2 character varying,
    description_3 character varying,
    description_4 character varying,
    description_5 character varying,
    description_6 character varying,
    description_7 character varying,
    created_at timestamp without time zone DEFAULT now() NOT NULL,
    updated_at timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public.vacancies OWNER TO autopartner_admin;

--
-- Name: vacancies_id_seq; Type: SEQUENCE; Schema: public; Owner: autopartner_admin
--

CREATE SEQUENCE public.vacancies_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.vacancies_id_seq OWNER TO autopartner_admin;

--
-- Name: vacancies_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: autopartner_admin
--

ALTER SEQUENCE public.vacancies_id_seq OWNED BY public.vacancies.id;


--
-- Name: accounts id; Type: DEFAULT; Schema: public; Owner: autopartner_admin
--

ALTER TABLE ONLY public.accounts ALTER COLUMN id SET DEFAULT nextval('public.accounts_id_seq'::regclass);


--
-- Name: event_details id; Type: DEFAULT; Schema: public; Owner: autopartner_admin
--

ALTER TABLE ONLY public.event_details ALTER COLUMN id SET DEFAULT nextval('public.event_details_id_seq'::regclass);


--
-- Name: events id; Type: DEFAULT; Schema: public; Owner: autopartner_admin
--

ALTER TABLE ONLY public.events ALTER COLUMN id SET DEFAULT nextval('public.events_id_seq'::regclass);


--
-- Name: feedbacks id; Type: DEFAULT; Schema: public; Owner: autopartner_admin
--

ALTER TABLE ONLY public.feedbacks ALTER COLUMN id SET DEFAULT nextval('public.feedbacks_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: autopartner_admin
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: news id; Type: DEFAULT; Schema: public; Owner: autopartner_admin
--

ALTER TABLE ONLY public.news ALTER COLUMN id SET DEFAULT nextval('public.news_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: autopartner_admin
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


--
-- Name: vacancies id; Type: DEFAULT; Schema: public; Owner: autopartner_admin
--

ALTER TABLE ONLY public.vacancies ALTER COLUMN id SET DEFAULT nextval('public.vacancies_id_seq'::regclass);


--
-- Data for Name: accounts; Type: TABLE DATA; Schema: public; Owner: autopartner_admin
--

COPY public.accounts (id, login, role, password_hash, created_at, updated_at) FROM stdin;
1	admin	admin	$2a$10$pKXtbTSaM4Cx01mPgXlZC.oGfemWGI/wz.RaOnxMNm4sNK7kW2Kx.	2024-06-10 12:25:00.359448	2024-06-10 12:25:00.359448
\.


--
-- Data for Name: brands; Type: TABLE DATA; Schema: public; Owner: autopartner_admin
--

COPY public.brands (name) FROM stdin;
Shacman
Mercedes-Benz
Beiben
Krone
FAW
HOWO
Новый бренд
\.


--
-- Data for Name: categories; Type: TABLE DATA; Schema: public; Owner: autopartner_admin
--

COPY public.categories (name) FROM stdin;
Самосвал
Седельный тягач
Полуприцеп рефрижератор
\.


--
-- Data for Name: event_details; Type: TABLE DATA; Schema: public; Owner: autopartner_admin
--

COPY public.event_details (id, event_id, title, description) FROM stdin;
\.


--
-- Data for Name: events; Type: TABLE DATA; Schema: public; Owner: autopartner_admin
--

COPY public.events (id, title, description, expired_date, image_url, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: feedbacks; Type: TABLE DATA; Schema: public; Owner: autopartner_admin
--

COPY public.feedbacks (id, content, author, company, created_at, updated_at, date) FROM stdin;
\.


--
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: autopartner_admin
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
2	1718002136923	Products1718002136923
3	1718349613087	News1718349613087
4	1718702012680	Vacancy1718702012680
\.


--
-- Data for Name: news; Type: TABLE DATA; Schema: public; Owner: autopartner_admin
--

COPY public.news (id, title, content, image_url, date, created_at, updated_at) FROM stdin;
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: autopartner_admin
--

COPY public.products (id, category, brand, engine, transmission, max_weight, cabin_type, suspension_type, suspension_cabin, suspension_chassis, brake_type, wheel_formula, axles_number, fifth_wheel_height, trailer_volume, trailer_length, euro, image_url, account_id, created_at, updated_at, name, in_stock, vehicles_year, options, price, color, image_urls) FROM stdin;
7	Самосвал	Shacman	12,5/550л.с./Дизель/Weichai	Механическая		2-х местная с 1 спальным					8×4						http://5.35.85.163/api/upload/111photo82024-04-1910-19-38jpg_1718193031118.jpg	1	2024-06-12 11:50:32.480685	2024-06-12 11:50:32.480685	Shacman X5000	t	2023		10700000	Красный	\N
8	Самосвал	HOWO	400 л.с. /  Дизель	Механическая		2-х местная с 1 спальным					8×4						http://5.35.85.163/api/upload/img4618jpg_1718193352860.jpg	1	2024-06-12 11:57:17.868261	2024-06-12 11:57:17.868261	Howo T5G	t	2024		10400000	Красный, серый	\N
9	Самосвал	HOWO	440 л.с / Дизель	Механическая		2-х местная с 1 спальным					6×4						http://5.35.85.163/api/upload/img14618jpg_1718193796887.jpg	1	2024-06-12 12:03:25.793559	2024-06-12 12:03:25.793559	Howo T5G	t	2024		9700000	Красный, серый	\N
10	Седельный тягач	Mercedes-Benz	12.8 л / 476 л.с. / Дизель	 Автомат		2-х местная с 2 спальными					4x2						http://5.35.85.163/api/upload/mercedes-benz-actros-1848-lsjpg_1718194342112.jpg	1	2024-06-12 12:13:05.438429	2024-06-12 12:13:05.438429	Mercedes-Benz Actros 1848 LS	t	2023		12800000	Белый	\N
11	Седельный тягач	Beiben	11.6 л / 430 л.с. / Дизель	Механическая		2-х местная с 1 спальным					6x6						http://5.35.85.163/api/upload/img124618jpg_1718195350767.jpg	1	2024-06-12 12:29:13.513534	2024-06-12 12:29:13.513534	Beiben BBTR 2638	t	2023		10500000		\N
12	Самосвал	FAW	11.05 л. / 420 л.с / дизель	Механическая		2-х местная с 1 спальным					8 х 4						http://5.35.85.163/api/upload/faw-j6jpg_1718195632063.jpg	1	2024-06-12 12:33:56.652855	2024-06-12 12:33:56.652855	FAW J6	t	2023		9050000	Белый	\N
13	Полуприцеп рефрижератор	Krone	30.0 т				Пневматическая							90 м³	13310 мм		http://5.35.85.163/api/upload/img454618jpg_1718195923079.jpg	1	2024-06-12 12:38:45.639798	2024-06-12 12:38:45.639798	Krone Cool Liner	t	2024		11300000		\N
14	Полуприцеп рефрижератор	Krone												90 м³	13600 мм		http://5.35.85.163/api/upload/krone-sdjpg_1718196197884.jpg	1	2024-06-12 12:43:21.844296	2024-06-12 12:43:21.844296	Krone SD	t	2024		6100000	Серебристый	\N
5	Самосвал	Shacman	10.8 л / 440 л.с. / Дизель \\Cummins	Механическая		2-х местная с 1 спальным					6×4						https://vladdizlaw.store/api/upload/img-20240405-wa0098jpg_1718192386041.jpg	1	2024-06-12 11:39:53.850115	2024-06-12 11:39:53.850115	Shacman X5000	t	2023		9600000	Белый	\N
24	Самосвал	Shacman				6х4											https://vladdizlaw.store/api/upload/photo2024-04-1821-37-26jpg_1718722904257.jpg	1	2024-06-18 13:46:21.25407	2024-06-18 17:09:25.599141	Shacman X5000	t		Цвет, Модель, Спецификация 	8000000		{https://vladdizlaw.store/api/upload/photo62024-04-1910-16-53jpg_1718722835173.jpg}
4	Самосвал	Shacman	10.8 л / 430 л.с. / Дизель \\Weichai	Механическа		2-х местная с 1 спальным					6*4						https://vladdizlaw.store/api/upload/img-20240405-wa0089jpg_1718717297580.jpg	1	2024-06-12 11:29:05.60685	2024-06-18 13:28:19.620131	Shacman Х5000	t	2023		9650000	Золотистый	\N
15	Полуприцеп рефрижератор	Krone	34.0 т											90 м³	13600 мм		http://5.35.85.163/api/upload/krone-sd-2023jpg_1718196423038.jpg	1	2024-06-12 12:47:43.178414	2024-06-18 13:42:02.571738	Krone SD	f	2023		5700000	Синий	\N
6	Самосвал	Shacman	10.8 л / 440 л.с. / Дизель \\Cummins	Механическая		2-х местная с 1 спальным					8*4						https://vladdizlaw.store/api/upload/photo52024-04-1910-16-53jpg_1718722730836.jpg	1	2024-06-12 11:48:30.809058	2024-06-18 14:59:00.549883	Shacman Х3000	t	2023	Доп, Доп, Доп	9700000	Зеленый	{https://vladdizlaw.store/api/upload/photo62024-04-1910-16-53jpg_1718722734270.jpg,https://vladdizlaw.store/api/upload/photo2024-04-1909-43-30jpg_1718722734864.jpg,https://vladdizlaw.store/api/upload/photo2024-04-1821-37-26jpg_1718722736887.jpg}
\.


--
-- Data for Name: vacancies; Type: TABLE DATA; Schema: public; Owner: autopartner_admin
--

COPY public.vacancies (id, title, description_1, description_2, description_3, description_4, description_5, description_6, description_7, created_at, updated_at) FROM stdin;
\.


--
-- Name: accounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: autopartner_admin
--

SELECT pg_catalog.setval('public.accounts_id_seq', 3, true);


--
-- Name: event_details_id_seq; Type: SEQUENCE SET; Schema: public; Owner: autopartner_admin
--

SELECT pg_catalog.setval('public.event_details_id_seq', 1, false);


--
-- Name: events_id_seq; Type: SEQUENCE SET; Schema: public; Owner: autopartner_admin
--

SELECT pg_catalog.setval('public.events_id_seq', 1, false);


--
-- Name: feedbacks_id_seq; Type: SEQUENCE SET; Schema: public; Owner: autopartner_admin
--

SELECT pg_catalog.setval('public.feedbacks_id_seq', 3, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: autopartner_admin
--

SELECT pg_catalog.setval('public.migrations_id_seq', 4, true);


--
-- Name: news_id_seq; Type: SEQUENCE SET; Schema: public; Owner: autopartner_admin
--

SELECT pg_catalog.setval('public.news_id_seq', 2, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: autopartner_admin
--

SELECT pg_catalog.setval('public.products_id_seq', 24, true);


--
-- Name: vacancies_id_seq; Type: SEQUENCE SET; Schema: public; Owner: autopartner_admin
--

SELECT pg_catalog.setval('public.vacancies_id_seq', 1, false);


--
-- Name: products PK_0806c755e0aca124e67c0cf6d7d; Type: CONSTRAINT; Schema: public; Owner: autopartner_admin
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY (id);


--
-- Name: news PK_39a43dfcb6007180f04aff2357e; Type: CONSTRAINT; Schema: public; Owner: autopartner_admin
--

ALTER TABLE ONLY public.news
    ADD CONSTRAINT "PK_39a43dfcb6007180f04aff2357e" PRIMARY KEY (id);


--
-- Name: vacancies PK_3b45154a366568190cc15be2906; Type: CONSTRAINT; Schema: public; Owner: autopartner_admin
--

ALTER TABLE ONLY public.vacancies
    ADD CONSTRAINT "PK_3b45154a366568190cc15be2906" PRIMARY KEY (id);


--
-- Name: events PK_40731c7151fe4be3116e45ddf73; Type: CONSTRAINT; Schema: public; Owner: autopartner_admin
--

ALTER TABLE ONLY public.events
    ADD CONSTRAINT "PK_40731c7151fe4be3116e45ddf73" PRIMARY KEY (id);


--
-- Name: accounts PK_5a7a02c20412299d198e097a8fe; Type: CONSTRAINT; Schema: public; Owner: autopartner_admin
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY (id);


--
-- Name: feedbacks PK_79affc530fdd838a9f1e0cc30be; Type: CONSTRAINT; Schema: public; Owner: autopartner_admin
--

ALTER TABLE ONLY public.feedbacks
    ADD CONSTRAINT "PK_79affc530fdd838a9f1e0cc30be" PRIMARY KEY (id);


--
-- Name: categories PK_8b0be371d28245da6e4f4b61878; Type: CONSTRAINT; Schema: public; Owner: autopartner_admin
--

ALTER TABLE ONLY public.categories
    ADD CONSTRAINT "PK_8b0be371d28245da6e4f4b61878" PRIMARY KEY (name);


--
-- Name: migrations PK_8c82d7f526340ab734260ea46be; Type: CONSTRAINT; Schema: public; Owner: autopartner_admin
--

ALTER TABLE ONLY public.migrations
    ADD CONSTRAINT "PK_8c82d7f526340ab734260ea46be" PRIMARY KEY (id);


--
-- Name: brands PK_96db6bbbaa6f23cad26871339b6; Type: CONSTRAINT; Schema: public; Owner: autopartner_admin
--

ALTER TABLE ONLY public.brands
    ADD CONSTRAINT "PK_96db6bbbaa6f23cad26871339b6" PRIMARY KEY (name);


--
-- Name: event_details PK_e7753a530518edb90d77d0919a1; Type: CONSTRAINT; Schema: public; Owner: autopartner_admin
--

ALTER TABLE ONLY public.event_details
    ADD CONSTRAINT "PK_e7753a530518edb90d77d0919a1" PRIMARY KEY (id);


--
-- Name: accounts accounts_login_key; Type: CONSTRAINT; Schema: public; Owner: autopartner_admin
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT accounts_login_key UNIQUE (login);


--
-- Name: products FK_61fac54950763ae56ee51f17fd6; Type: FK CONSTRAINT; Schema: public; Owner: autopartner_admin
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "FK_61fac54950763ae56ee51f17fd6" FOREIGN KEY (brand) REFERENCES public.brands(name) ON DELETE CASCADE;


--
-- Name: products FK_74bbb757c7e82ed23180bd1dd7e; Type: FK CONSTRAINT; Schema: public; Owner: autopartner_admin
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "FK_74bbb757c7e82ed23180bd1dd7e" FOREIGN KEY (account_id) REFERENCES public.accounts(id) ON DELETE CASCADE;


--
-- Name: products FK_c3932231d2385ac248d0888d955; Type: FK CONSTRAINT; Schema: public; Owner: autopartner_admin
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "FK_c3932231d2385ac248d0888d955" FOREIGN KEY (category) REFERENCES public.categories(name) ON DELETE CASCADE;


--
-- Name: event_details FK_c760e9ad9dbcc99f55b5a858775; Type: FK CONSTRAINT; Schema: public; Owner: autopartner_admin
--

ALTER TABLE ONLY public.event_details
    ADD CONSTRAINT "FK_c760e9ad9dbcc99f55b5a858775" FOREIGN KEY (event_id) REFERENCES public.events(id) ON DELETE CASCADE;


--
-- PostgreSQL database dump complete
--

--
-- Database "postgres" dump
--

--
-- PostgreSQL database dump
--

-- Dumped from database version 16.3 (Debian 16.3-1.pgdg120+1)
-- Dumped by pg_dump version 16.3 (Debian 16.3-1.pgdg120+1)

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

DROP DATABASE postgres;
--
-- Name: postgres; Type: DATABASE; Schema: -; Owner: autopartner_admin
--

CREATE DATABASE postgres WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'en_US.utf8';


ALTER DATABASE postgres OWNER TO autopartner_admin;

\connect postgres

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

--
-- Name: DATABASE postgres; Type: COMMENT; Schema: -; Owner: autopartner_admin
--

COMMENT ON DATABASE postgres IS 'default administrative connection database';


--
-- PostgreSQL database dump complete
--

--
-- PostgreSQL database cluster dump complete
--

