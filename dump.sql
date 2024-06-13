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
    color character varying(255)
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
-- Name: accounts id; Type: DEFAULT; Schema: public; Owner: autopartner_admin
--

ALTER TABLE ONLY public.accounts ALTER COLUMN id SET DEFAULT nextval('public.accounts_id_seq'::regclass);


--
-- Name: migrations id; Type: DEFAULT; Schema: public; Owner: autopartner_admin
--

ALTER TABLE ONLY public.migrations ALTER COLUMN id SET DEFAULT nextval('public.migrations_id_seq'::regclass);


--
-- Name: products id; Type: DEFAULT; Schema: public; Owner: autopartner_admin
--

ALTER TABLE ONLY public.products ALTER COLUMN id SET DEFAULT nextval('public.products_id_seq'::regclass);


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
-- Data for Name: migrations; Type: TABLE DATA; Schema: public; Owner: autopartner_admin
--

COPY public.migrations (id, "timestamp", name) FROM stdin;
2	1718002136923	Products1718002136923
\.


--
-- Data for Name: products; Type: TABLE DATA; Schema: public; Owner: autopartner_admin
--

COPY public.products (id, category, brand, engine, transmission, max_weight, cabin_type, suspension_type, suspension_cabin, suspension_chassis, brake_type, wheel_formula, axles_number, fifth_wheel_height, trailer_volume, trailer_length, euro, image_url, account_id, created_at, updated_at, name, in_stock, vehicles_year, options, price, color) FROM stdin;
2	Самосвал	Beiben	34 k	механика	ываываыва	12	1223	333	аавыац	ыаыва	ываыв	ыва	ываыв	\N	ыва	ыва	http://localhost/api/upload/09b809d42eabead3905c47c2a10c4ec741jpeg_1718153818328.peg	1	2024-06-12 00:07:35.365678	2024-06-12 01:11:20.114689	x-200	t	2020		34000000	Красный
1	Самосвал	Shacman	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	\N	erwqwer	werwer	\N	http://localhost/api/upload/beer-v-e-tradiciskas-60-jpg_1718153795685.jpg	1	2024-06-11 08:10:22.088727	2024-06-12 01:14:26.340148	X50001	t	2020	\N	35000000	\N
\.


--
-- Name: accounts_id_seq; Type: SEQUENCE SET; Schema: public; Owner: autopartner_admin
--

SELECT pg_catalog.setval('public.accounts_id_seq', 3, true);


--
-- Name: migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: autopartner_admin
--

SELECT pg_catalog.setval('public.migrations_id_seq', 2, true);


--
-- Name: products_id_seq; Type: SEQUENCE SET; Schema: public; Owner: autopartner_admin
--

SELECT pg_catalog.setval('public.products_id_seq', 3, true);


--
-- Name: products PK_0806c755e0aca124e67c0cf6d7d; Type: CONSTRAINT; Schema: public; Owner: autopartner_admin
--

ALTER TABLE ONLY public.products
    ADD CONSTRAINT "PK_0806c755e0aca124e67c0cf6d7d" PRIMARY KEY (id);


--
-- Name: accounts PK_5a7a02c20412299d198e097a8fe; Type: CONSTRAINT; Schema: public; Owner: autopartner_admin
--

ALTER TABLE ONLY public.accounts
    ADD CONSTRAINT "PK_5a7a02c20412299d198e097a8fe" PRIMARY KEY (id);


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

