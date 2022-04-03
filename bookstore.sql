--
-- mdzhvmpakloifdQL database dump
--

-- Dumped from database version 14.2
-- Dumped by pg_dump version 14.2

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
-- Name: account_user; Type: TABLE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE TABLE public.account_user (
    id bigint NOT NULL,
    password character varying(128) NOT NULL,
    last_login timestamp with time zone,
    email character varying(255) NOT NULL,
    is_active boolean NOT NULL,
    staff boolean NOT NULL,
    admin boolean NOT NULL
);


ALTER TABLE public.account_user OWNER TO mdzhvmpakloifd;

--
-- Name: account_user_id_seq; Type: SEQUENCE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE SEQUENCE public.account_user_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_user_id_seq OWNER TO mdzhvmpakloifd;

--
-- Name: account_user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mdzhvmpakloifd
--

ALTER SEQUENCE public.account_user_id_seq OWNED BY public.account_user.id;


--
-- Name: account_useraddress; Type: TABLE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE TABLE public.account_useraddress (
    id bigint NOT NULL,
    phone_number character varying(12) NOT NULL,
    address_name character varying(40) NOT NULL,
    city character varying(20) NOT NULL,
    province character varying(20) NOT NULL,
    state character varying(20) NOT NULL,
    zip character varying(7) NOT NULL,
    user_id character varying(255) NOT NULL,
    contact_name character varying(20) NOT NULL
);


ALTER TABLE public.account_useraddress OWNER TO mdzhvmpakloifd;

--
-- Name: account_useraddress_id_seq; Type: SEQUENCE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE SEQUENCE public.account_useraddress_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.account_useraddress_id_seq OWNER TO mdzhvmpakloifd;

--
-- Name: account_useraddress_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mdzhvmpakloifd
--

ALTER SEQUENCE public.account_useraddress_id_seq OWNED BY public.account_useraddress.id;


--
-- Name: auth_group; Type: TABLE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE TABLE public.auth_group (
    id integer NOT NULL,
    name character varying(150) NOT NULL
);


ALTER TABLE public.auth_group OWNER TO mdzhvmpakloifd;

--
-- Name: auth_group_id_seq; Type: SEQUENCE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE SEQUENCE public.auth_group_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_id_seq OWNER TO mdzhvmpakloifd;

--
-- Name: auth_group_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mdzhvmpakloifd
--

ALTER SEQUENCE public.auth_group_id_seq OWNED BY public.auth_group.id;


--
-- Name: auth_group_permissions; Type: TABLE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE TABLE public.auth_group_permissions (
    id bigint NOT NULL,
    group_id integer NOT NULL,
    permission_id integer NOT NULL
);


ALTER TABLE public.auth_group_permissions OWNER TO mdzhvmpakloifd;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE SEQUENCE public.auth_group_permissions_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_group_permissions_id_seq OWNER TO mdzhvmpakloifd;

--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mdzhvmpakloifd
--

ALTER SEQUENCE public.auth_group_permissions_id_seq OWNED BY public.auth_group_permissions.id;


--
-- Name: auth_permission; Type: TABLE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE TABLE public.auth_permission (
    id integer NOT NULL,
    name character varying(255) NOT NULL,
    content_type_id integer NOT NULL,
    codename character varying(100) NOT NULL
);


ALTER TABLE public.auth_permission OWNER TO mdzhvmpakloifd;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE SEQUENCE public.auth_permission_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.auth_permission_id_seq OWNER TO mdzhvmpakloifd;

--
-- Name: auth_permission_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mdzhvmpakloifd
--

ALTER SEQUENCE public.auth_permission_id_seq OWNED BY public.auth_permission.id;


--
-- Name: authtoken_token; Type: TABLE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE TABLE public.authtoken_token (
    key character varying(40) NOT NULL,
    created timestamp with time zone NOT NULL,
    user_id bigint NOT NULL
);


ALTER TABLE public.authtoken_token OWNER TO mdzhvmpakloifd;

--
-- Name: book_author; Type: TABLE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE TABLE public.book_author (
    id bigint NOT NULL,
    name character varying(30) NOT NULL
);


ALTER TABLE public.book_author OWNER TO mdzhvmpakloifd;

--
-- Name: book_author_id_seq; Type: SEQUENCE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE SEQUENCE public.book_author_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.book_author_id_seq OWNER TO mdzhvmpakloifd;

--
-- Name: book_author_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mdzhvmpakloifd
--

ALTER SEQUENCE public.book_author_id_seq OWNED BY public.book_author.id;


--
-- Name: book_book; Type: TABLE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE TABLE public.book_book (
    id bigint NOT NULL,
    name character varying(100) NOT NULL,
    cover character varying(400) NOT NULL,
    price double precision NOT NULL,
    isbn13 character varying(13) NOT NULL,
    description text NOT NULL,
    num_pages integer NOT NULL,
    publication_date date NOT NULL,
    genre_id bigint NOT NULL,
    language_id bigint NOT NULL,
    publisher_id bigint NOT NULL
);


ALTER TABLE public.book_book OWNER TO mdzhvmpakloifd;

--
-- Name: book_book_id_seq; Type: SEQUENCE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE SEQUENCE public.book_book_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.book_book_id_seq OWNER TO mdzhvmpakloifd;

--
-- Name: book_book_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mdzhvmpakloifd
--

ALTER SEQUENCE public.book_book_id_seq OWNED BY public.book_book.id;


--
-- Name: book_bookauthor; Type: TABLE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE TABLE public.book_bookauthor (
    id bigint NOT NULL,
    author_id bigint NOT NULL,
    book_id bigint NOT NULL
);


ALTER TABLE public.book_bookauthor OWNER TO mdzhvmpakloifd;

--
-- Name: book_bookauthor_id_seq; Type: SEQUENCE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE SEQUENCE public.book_bookauthor_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.book_bookauthor_id_seq OWNER TO mdzhvmpakloifd;

--
-- Name: book_bookauthor_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mdzhvmpakloifd
--

ALTER SEQUENCE public.book_bookauthor_id_seq OWNED BY public.book_bookauthor.id;


--
-- Name: book_bookgenre; Type: TABLE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE TABLE public.book_bookgenre (
    id bigint NOT NULL,
    book_id bigint NOT NULL,
    genre_id bigint NOT NULL
);


ALTER TABLE public.book_bookgenre OWNER TO mdzhvmpakloifd;

--
-- Name: book_bookgenre_id_seq; Type: SEQUENCE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE SEQUENCE public.book_bookgenre_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.book_bookgenre_id_seq OWNER TO mdzhvmpakloifd;

--
-- Name: book_bookgenre_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mdzhvmpakloifd
--

ALTER SEQUENCE public.book_bookgenre_id_seq OWNED BY public.book_bookgenre.id;


--
-- Name: book_genre; Type: TABLE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE TABLE public.book_genre (
    id bigint NOT NULL,
    name character varying(20) NOT NULL
);


ALTER TABLE public.book_genre OWNER TO mdzhvmpakloifd;

--
-- Name: book_genre_id_seq; Type: SEQUENCE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE SEQUENCE public.book_genre_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.book_genre_id_seq OWNER TO mdzhvmpakloifd;

--
-- Name: book_genre_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mdzhvmpakloifd
--

ALTER SEQUENCE public.book_genre_id_seq OWNED BY public.book_genre.id;


--
-- Name: book_language; Type: TABLE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE TABLE public.book_language (
    id bigint NOT NULL,
    code character varying(8) NOT NULL,
    name character varying(20) NOT NULL
);


ALTER TABLE public.book_language OWNER TO mdzhvmpakloifd;

--
-- Name: book_language_id_seq; Type: SEQUENCE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE SEQUENCE public.book_language_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.book_language_id_seq OWNER TO mdzhvmpakloifd;

--
-- Name: book_language_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mdzhvmpakloifd
--

ALTER SEQUENCE public.book_language_id_seq OWNED BY public.book_language.id;


--
-- Name: book_publisher; Type: TABLE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE TABLE public.book_publisher (
    id bigint NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.book_publisher OWNER TO mdzhvmpakloifd;

--
-- Name: book_publisher_id_seq; Type: SEQUENCE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE SEQUENCE public.book_publisher_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.book_publisher_id_seq OWNER TO mdzhvmpakloifd;

--
-- Name: book_publisher_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mdzhvmpakloifd
--

ALTER SEQUENCE public.book_publisher_id_seq OWNED BY public.book_publisher.id;


--
-- Name: django_admin_log; Type: TABLE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE TABLE public.django_admin_log (
    id integer NOT NULL,
    action_time timestamp with time zone NOT NULL,
    object_id text,
    object_repr character varying(200) NOT NULL,
    action_flag smallint NOT NULL,
    change_message text NOT NULL,
    content_type_id integer,
    user_id bigint NOT NULL,
    CONSTRAINT django_admin_log_action_flag_check CHECK ((action_flag >= 0))
);


ALTER TABLE public.django_admin_log OWNER TO mdzhvmpakloifd;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE SEQUENCE public.django_admin_log_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_admin_log_id_seq OWNER TO mdzhvmpakloifd;

--
-- Name: django_admin_log_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mdzhvmpakloifd
--

ALTER SEQUENCE public.django_admin_log_id_seq OWNED BY public.django_admin_log.id;


--
-- Name: django_content_type; Type: TABLE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE TABLE public.django_content_type (
    id integer NOT NULL,
    app_label character varying(100) NOT NULL,
    model character varying(100) NOT NULL
);


ALTER TABLE public.django_content_type OWNER TO mdzhvmpakloifd;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE SEQUENCE public.django_content_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_content_type_id_seq OWNER TO mdzhvmpakloifd;

--
-- Name: django_content_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mdzhvmpakloifd
--

ALTER SEQUENCE public.django_content_type_id_seq OWNED BY public.django_content_type.id;


--
-- Name: django_migrations; Type: TABLE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE TABLE public.django_migrations (
    id bigint NOT NULL,
    app character varying(255) NOT NULL,
    name character varying(255) NOT NULL,
    applied timestamp with time zone NOT NULL
);


ALTER TABLE public.django_migrations OWNER TO mdzhvmpakloifd;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE SEQUENCE public.django_migrations_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.django_migrations_id_seq OWNER TO mdzhvmpakloifd;

--
-- Name: django_migrations_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mdzhvmpakloifd
--

ALTER SEQUENCE public.django_migrations_id_seq OWNED BY public.django_migrations.id;


--
-- Name: django_session; Type: TABLE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE TABLE public.django_session (
    session_key character varying(40) NOT NULL,
    session_data text NOT NULL,
    expire_date timestamp with time zone NOT NULL
);


ALTER TABLE public.django_session OWNER TO mdzhvmpakloifd;

--
-- Name: inventory_inventory; Type: TABLE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE TABLE public.inventory_inventory (
    id bigint NOT NULL,
    stock integer NOT NULL,
    book_id bigint NOT NULL
);


ALTER TABLE public.inventory_inventory OWNER TO mdzhvmpakloifd;

--
-- Name: inventory_inventory_id_seq; Type: SEQUENCE; Schema: public; Owner: mdzhvmpakloifd
--

CREATE SEQUENCE public.inventory_inventory_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER TABLE public.inventory_inventory_id_seq OWNER TO mdzhvmpakloifd;

--
-- Name: inventory_inventory_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: mdzhvmpakloifd
--

ALTER SEQUENCE public.inventory_inventory_id_seq OWNED BY public.inventory_inventory.id;


--
-- Name: account_user id; Type: DEFAULT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.account_user ALTER COLUMN id SET DEFAULT nextval('public.account_user_id_seq'::regclass);


--
-- Name: account_useraddress id; Type: DEFAULT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.account_useraddress ALTER COLUMN id SET DEFAULT nextval('public.account_useraddress_id_seq'::regclass);


--
-- Name: auth_group id; Type: DEFAULT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.auth_group ALTER COLUMN id SET DEFAULT nextval('public.auth_group_id_seq'::regclass);


--
-- Name: auth_group_permissions id; Type: DEFAULT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.auth_group_permissions ALTER COLUMN id SET DEFAULT nextval('public.auth_group_permissions_id_seq'::regclass);


--
-- Name: auth_permission id; Type: DEFAULT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.auth_permission ALTER COLUMN id SET DEFAULT nextval('public.auth_permission_id_seq'::regclass);


--
-- Name: book_author id; Type: DEFAULT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.book_author ALTER COLUMN id SET DEFAULT nextval('public.book_author_id_seq'::regclass);


--
-- Name: book_book id; Type: DEFAULT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.book_book ALTER COLUMN id SET DEFAULT nextval('public.book_book_id_seq'::regclass);


--
-- Name: book_bookauthor id; Type: DEFAULT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.book_bookauthor ALTER COLUMN id SET DEFAULT nextval('public.book_bookauthor_id_seq'::regclass);


--
-- Name: book_bookgenre id; Type: DEFAULT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.book_bookgenre ALTER COLUMN id SET DEFAULT nextval('public.book_bookgenre_id_seq'::regclass);


--
-- Name: book_genre id; Type: DEFAULT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.book_genre ALTER COLUMN id SET DEFAULT nextval('public.book_genre_id_seq'::regclass);


--
-- Name: book_language id; Type: DEFAULT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.book_language ALTER COLUMN id SET DEFAULT nextval('public.book_language_id_seq'::regclass);


--
-- Name: book_publisher id; Type: DEFAULT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.book_publisher ALTER COLUMN id SET DEFAULT nextval('public.book_publisher_id_seq'::regclass);


--
-- Name: django_admin_log id; Type: DEFAULT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.django_admin_log ALTER COLUMN id SET DEFAULT nextval('public.django_admin_log_id_seq'::regclass);


--
-- Name: django_content_type id; Type: DEFAULT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.django_content_type ALTER COLUMN id SET DEFAULT nextval('public.django_content_type_id_seq'::regclass);


--
-- Name: django_migrations id; Type: DEFAULT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.django_migrations ALTER COLUMN id SET DEFAULT nextval('public.django_migrations_id_seq'::regclass);


--
-- Name: inventory_inventory id; Type: DEFAULT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.inventory_inventory ALTER COLUMN id SET DEFAULT nextval('public.inventory_inventory_id_seq'::regclass);


--
-- Data for Name: account_user; Type: TABLE DATA; Schema: public; Owner: mdzhvmpakloifd
--

COPY public.account_user (id, password, last_login, email, is_active, staff, admin) FROM stdin;
2	pbkdf2_sha256$260000$ewshmBWJURT1KsCda7p9cd$ycheoQRc5H0seBPkcGImRIMRb1O+vEmE6Mnyh7zE/Zc=	\N	chan@smet.com	t	f	f
3	pbkdf2_sha256$260000$VMwMmCAPcEQJHzPoCAo8yD$5uxpICEpRTEromkHc4igMuLq/3f0yXWW9J8j0aJ9Fk4=	\N	chandrafirst1@gmail.com	t	f	f
4	pbkdf2_sha256$260000$Ys18POWq7wkeJN0gDVxtq5$abVkfUbLjrqDAHO5kSFj8sU2slfoLgnHY2VCf+PWJDY=	\N	chandrafirst1j@gmail.com	t	f	f
5	pbkdf2_sha256$260000$D3kYwh0mqWndIYkuB9oIRY$FVBP5OoFlEkL6eoLqMVr/NEGdZqwTEO+SlBklRa/juw=	\N	chandrafirst10@gmail.com	t	f	f
6	pbkdf2_sha256$260000$8IqbI9Aq5ZqNdwR5lQ418D$Nf3us+4ZQqWFlEf3Eujh93MO2UsjAyFSYJza7WaNkUE=	\N	chandrasec2@gmail.com	t	f	f
7	pbkdf2_sha256$260000$9nO2HLiB5Jxf7Va2ltiSSa$vMjZXPYQiLYXIPbWRJmrZd3EB4EGHptzl2f++2eOmb8=	\N	chandrafirst67s@gmail.com	t	f	f
8	pbkdf2_sha256$260000$4axhOyG2mIbJcwdeo1uSn9$7nuewkC1XUwgOYbiIr5yTIl6OmiruR453kLgy1tlB0w=	\N	chandrafirst676@gmail.com	t	f	f
9	pbkdf2_sha256$260000$aE6RNVb5EeFiQ7PBj4EWJw$gv9wb34EtVeoMrlBA2cpf190IVnS+e2gRkJoL59Hgpc=	\N	chandrafirst677@gmail.com	t	f	f
1	pbkdf2_sha256$260000$RegEkjOAGfpvi1sNcxGqLc$9KACPSk8dKyxz++3I8aS3mEVxO+UlOC/pv7VqV5GeWg=	2022-04-02 11:08:09.202909+07	chandrafirst67@gmail.com	t	t	t
\.


--
-- Data for Name: account_useraddress; Type: TABLE DATA; Schema: public; Owner: mdzhvmpakloifd
--

COPY public.account_useraddress (id, phone_number, address_name, city, province, state, zip, user_id, contact_name) FROM stdin;
41	983242983462	kolkata street no.5	kolima	justin	england	0	chandrafirst67@gmail.com	Hindibam
42	235872982	kolkata street no.8	medinburgh	malby	england	3094239	chandrafirst67@gmail.com	Jackob
43	12097198234	malby street no.99	kolkata	south kreen	maldiviese	3149813	chandrafirst67@gmail.com	homiya
\.


--
-- Data for Name: auth_group; Type: TABLE DATA; Schema: public; Owner: mdzhvmpakloifd
--

COPY public.auth_group (id, name) FROM stdin;
\.


--
-- Data for Name: auth_group_permissions; Type: TABLE DATA; Schema: public; Owner: mdzhvmpakloifd
--

COPY public.auth_group_permissions (id, group_id, permission_id) FROM stdin;
\.


--
-- Data for Name: auth_permission; Type: TABLE DATA; Schema: public; Owner: mdzhvmpakloifd
--

COPY public.auth_permission (id, name, content_type_id, codename) FROM stdin;
1	Can add log entry	1	add_logentry
2	Can change log entry	1	change_logentry
3	Can delete log entry	1	delete_logentry
4	Can view log entry	1	view_logentry
5	Can add permission	2	add_permission
6	Can change permission	2	change_permission
7	Can delete permission	2	delete_permission
8	Can view permission	2	view_permission
9	Can add group	3	add_group
10	Can change group	3	change_group
11	Can delete group	3	delete_group
12	Can view group	3	view_group
13	Can add content type	4	add_contenttype
14	Can change content type	4	change_contenttype
15	Can delete content type	4	delete_contenttype
16	Can view content type	4	view_contenttype
17	Can add session	5	add_session
18	Can change session	5	change_session
19	Can delete session	5	delete_session
20	Can view session	5	view_session
21	Can add Token	6	add_token
22	Can change Token	6	change_token
23	Can delete Token	6	delete_token
24	Can view Token	6	view_token
25	Can add token	7	add_tokenproxy
26	Can change token	7	change_tokenproxy
27	Can delete token	7	delete_tokenproxy
28	Can view token	7	view_tokenproxy
29	Can add author	8	add_author
30	Can change author	8	change_author
31	Can delete author	8	delete_author
32	Can view author	8	view_author
33	Can add language	9	add_language
34	Can change language	9	change_language
35	Can delete language	9	delete_language
36	Can view language	9	view_language
37	Can add publisher	10	add_publisher
38	Can change publisher	10	change_publisher
39	Can delete publisher	10	delete_publisher
40	Can view publisher	10	view_publisher
41	Can add genre	11	add_genre
42	Can change genre	11	change_genre
43	Can delete genre	11	delete_genre
44	Can view genre	11	view_genre
45	Can add book	12	add_book
46	Can change book	12	change_book
47	Can delete book	12	delete_book
48	Can view book	12	view_book
49	Can add book genre	13	add_bookgenre
50	Can change book genre	13	change_bookgenre
51	Can delete book genre	13	delete_bookgenre
52	Can view book genre	13	view_bookgenre
53	Can add book author	14	add_bookauthor
54	Can change book author	14	change_bookauthor
55	Can delete book author	14	delete_bookauthor
56	Can view book author	14	view_bookauthor
57	Can add inventory	15	add_inventory
58	Can change inventory	15	change_inventory
59	Can delete inventory	15	delete_inventory
60	Can view inventory	15	view_inventory
61	Can add user	16	add_user
62	Can change user	16	change_user
63	Can delete user	16	delete_user
64	Can view user	16	view_user
65	Can add user address	17	add_useraddress
66	Can change user address	17	change_useraddress
67	Can delete user address	17	delete_useraddress
68	Can view user address	17	view_useraddress
\.


--
-- Data for Name: authtoken_token; Type: TABLE DATA; Schema: public; Owner: mdzhvmpakloifd
--

COPY public.authtoken_token (key, created, user_id) FROM stdin;
1a1c06f61335a5aaab79cfde251001919d05a1d3	2022-02-19 17:17:24.881766+07	2
87db74998c5806f0b9ad3c74888ec243022c1e66	2022-02-19 17:17:37.532177+07	1
02bd0d5c301db84fd555f917a7cff3c7b1d53544	2022-02-19 21:43:39.567629+07	3
704ce4f595db8bcc5305a4de8d9f3a83e7dab86b	2022-03-04 09:24:08.520785+07	4
33c82b447ceb168c0844c3874c6198204d164902	2022-03-09 11:16:55.135463+07	5
ad0bad7acf09e2263415725978918a8072b2ef40	2022-03-17 13:05:24.735111+07	6
947c3fca18e6c7c741e5716fe43646a4b197ea02	2022-03-20 12:14:51.413492+07	7
0ab1c5f698d30fa06a35b745b90fff13ebe8d253	2022-03-20 17:05:44.988322+07	8
71c5fa15fd723665919c2461579bbc61832c3f94	2022-03-31 14:59:39.783005+07	9
\.


--
-- Data for Name: book_author; Type: TABLE DATA; Schema: public; Owner: mdzhvmpakloifd
--

COPY public.book_author (id, name) FROM stdin;
1	Walter Issacson
2	Paul Coelho
3	Ed Catmull
4	Phil Knight
\.


--
-- Data for Name: book_book; Type: TABLE DATA; Schema: public; Owner: mdzhvmpakloifd
--

COPY public.book_book (id, name, cover, price, isbn13, description, num_pages, publication_date, genre_id, language_id, publisher_id) FROM stdin;
1	Steve Jobs: The Exclusive Biography	https://images-na.ssl-images-amazon.com/images/I/41dKkez-1rL._SX326_BO1,204,203,200_.jpg	15.49	6757634524357	Based on more than forty interviews with Steve Jobs conducted over two years—as well as interviews with more than 100 family members, friends, adversaries, competitors, and colleagues—Walter Isaacson has written a riveting story of the roller-coaster life and searingly intense personality of a creative entrepreneur whose passion for perfection and ferocious drive revolutionized six industries: personal computers, animated movies, music, phones, tablet computing, and digital publishing. Isaacson’s portrait touched millions of readers.\r\n\r\nAt a time when America is seeking ways to sustain its innovative edge, Jobs stands as the ultimate icon of inventiveness and applied imagination. He knew that the best way to create value in the twenty-first century was to connect creativity with technology. He built a company where leaps of the imagination were combined with remarkable feats of engineering.\r\n\r\nAlthough Jobs cooperated with the author, he asked for no control over what was written. He put nothing off-limits. He encouraged the people he knew to speak honestly. He himself spoke candidly about the people he worked with and competed against.\r\n\r\nHis friends, foes, and colleagues offer an unvarnished view of the passions, perfectionism, obsessions, artistry, devilry, and compulsion for control that shaped his approach to business and the innovative products that resulted.\r\n\r\nHis tale is instructive and cautionary, filled with lessons about innovation, character, leadership, and values.\r\n\r\nSteve Jobs is the inspiration for the movie of the same name starring Michael Fassbender, Kate Winslet, Seth Rogen, and Jeff Daniels, directed by Danny Boyle with a screenplay by Aaron Sorkin.	656	2011-10-24	1	1	1
3	The Alchemist: A Fable About Following Your Dream	https://images-na.ssl-images-amazon.com/images/I/51kcX5PpaZL._SY291_BO1,204,203,200_QL40_FMwebp_.jpg	14.2	4564975629562	Paulo Coelho's enchanting novel has inspired a devoted following around the world. This story, dazzling in its simplicity and wisdom, is about an Andalusian shepherd boy named Santiago who travels from his homeland in Spain to the Egyptian desert in search of treasure buried in the Pyramids. Along the way he meets a Gypsy woman, a man who calls himself king, and an Alchemist, all of whom point Santiago in the direction of his quest. No one knows what the treasure is, or if Santiago will be able to surmount the obstacles along the way But what starts out as a journey to find worldly goods turns into a meditation on the treasures found within. Lush, evocative, and deeply humane, the story of Santiago is art eternal testament to the transforming power of our dreams and the importance of listening to our hearts.	245	2022-02-19	2	1	1
4	The Code Breaker: Jennifer Doudna, Gene Editing, and the Future of the Human Race	https://images-na.ssl-images-amazon.com/images/I/71AKlX+-zuL.jpg	17.66	5249058265892	When Jennifer Doudna was in sixth grade, she came home one day to find that her dad had left a paperback titled The Double Helix on her bed. She put it aside, thinking it was one of those detective tales she loved. When she read it on a rainy Saturday, she discovered she was right, in a way. As she sped through the pages, she became enthralled by the intense drama behind the competition to discover the code of life. Even though her high school counselor told her girls didn’t become scientists, she decided she would.\r\n\r\nDriven by a passion to understand how nature works and to turn discoveries into inventions, she would help to make what the book’s author, James Watson, told her was the most important biological advance since his co-discovery of the structure of DNA. She and her collaborators turned a curiosity of nature into an invention that will transform the human race: an easy-to-use tool that can edit DNA. Known as CRISPR, it opened a brave new world of medical miracles and moral questions.\r\n\r\nThe development of CRISPR and the race to create vaccines for coronavirus will hasten our transition to the next great innovation revolution. The past half-century has been a digital age, based on the microchip, computer, and internet. Now we are entering a life science revolution. Children who study digital coding will be joined by those who study genetic code. \r\n\r\nShould we use our new evolution-hacking powers to make us less susceptible to viruses? What a wonderful boon that would be! And what about preventing depression? Hmmm…should we allow parents, if they can afford it, to enhance the height or muscles or IQ of their kids? \r\n\r\nAfter helping to discover CRISPR, Doudna became a leader in wrestling with these moral issues and, with her collaborator Emmanuelle Charpentier, won the Nobel Prize in 2020. Her story is an “enthralling detective story” (Oprah Daily) that involves the most profound wonders of nature, from the origins of life to the future of our species.	561	2022-02-19	1	1	1
2	Shoe Dog: A Memoir by the Creator of Nike	https://images-na.ssl-images-amazon.com/images/I/71KkAKYWcuL.jpg	16.34	1346130498163	In this candid and riveting memoir, for the first time ever, Nike founder and CEO Phil Knight shares the inside story of the company's early days as an intrepid start-up and its evolution into one of the world's most iconic, game-changing, and profitable brands.\r\n\r\nIn 1962, fresh out of business school, Phil Knight borrowed fifty dollars from his father and created a company with a simple mission: import high-quality, low-cost athletic shoes from Japan. Selling the shoes from the trunk of his lime-green Plymouth Valiant, Knight grossed $8,000 his first year. Today, Nike's annual sales top $30 billion. In an age of start-ups, Nike is the ne plus ultra of all start-ups, and the swoosh has become a revolutionary, globe-spanning icon, one of the most ubiquitous and recognizable symbols in the world today.\r\n\r\nBut Knight, the man behind the swoosh, has always remained a mystery. Now, for the first time, in a memoir that is candid, humble, gutsy, and wry, he tells his story, beginning with his crossroads moment. At 24, after backpacking around the world, he decided to take the unconventional path to start his own business - a business that would be dynamic, different.\r\n\r\nKnight details the many risks and daunting setbacks that stood between him and his dream - along with his early triumphs. Above all, he recalls the formative relationships with his first partners and employees, a ragtag group of misfits and seekers who became a tight-knit band of brothers. Together, harnessing the transcendent power of a shared mission and a deep belief in the spirit of sport, they built a brand that changed everything.	0	2022-02-19	1	1	1
\.


--
-- Data for Name: book_bookauthor; Type: TABLE DATA; Schema: public; Owner: mdzhvmpakloifd
--

COPY public.book_bookauthor (id, author_id, book_id) FROM stdin;
2	4	2
3	2	3
4	1	4
5	1	1
6	3	1
\.


--
-- Data for Name: book_bookgenre; Type: TABLE DATA; Schema: public; Owner: mdzhvmpakloifd
--

COPY public.book_bookgenre (id, book_id, genre_id) FROM stdin;
\.


--
-- Data for Name: book_genre; Type: TABLE DATA; Schema: public; Owner: mdzhvmpakloifd
--

COPY public.book_genre (id, name) FROM stdin;
1	Biography
2	Fiction
\.


--
-- Data for Name: book_language; Type: TABLE DATA; Schema: public; Owner: mdzhvmpakloifd
--

COPY public.book_language (id, code, name) FROM stdin;
1	en	English
\.


--
-- Data for Name: book_publisher; Type: TABLE DATA; Schema: public; Owner: mdzhvmpakloifd
--

COPY public.book_publisher (id, name) FROM stdin;
1	Simon & Schuster
\.


--
-- Data for Name: django_admin_log; Type: TABLE DATA; Schema: public; Owner: mdzhvmpakloifd
--

COPY public.django_admin_log (id, action_time, object_id, object_repr, action_flag, change_message, content_type_id, user_id) FROM stdin;
1	2022-02-19 17:03:05.689068+07	1	Walter Issacson	1	[{"added": {}}]	8	1
2	2022-02-19 17:03:11.240245+07	2	Paul Coelho	1	[{"added": {}}]	8	1
3	2022-02-19 17:03:20.96205+07	3	Ed Catmull	1	[{"added": {}}]	8	1
4	2022-02-19 17:06:36.220251+07	1	English	1	[{"added": {}}]	9	1
5	2022-02-19 17:07:17.17544+07	1	Simon & Schuster	1	[{"added": {}}]	10	1
6	2022-02-19 17:07:23.898758+07	1	Biography	1	[{"added": {}}]	11	1
7	2022-02-19 17:07:28.828764+07	1	Steve Jobs: The Exclusive Biography	1	[{"added": {}}]	12	1
8	2022-02-19 17:08:04.561698+07	1	BookAuthor object (1)	1	[{"added": {}}]	14	1
9	2022-02-19 17:08:15.81742+07	1	Steve Jobs: The Exclusive Biography	1	[{"added": {}}]	15	1
10	2022-02-19 17:08:20.98462+07	1	Steve Jobs: The Exclusive Biography	2	[{"changed": {"fields": ["Stock"]}}]	15	1
11	2022-02-19 17:10:13.877098+07	2	Shoe Dog: A Memoir by the Creator of Nike	1	[{"added": {}}]	12	1
12	2022-02-19 17:11:28.687776+07	2	Fiction	1	[{"added": {}}]	11	1
13	2022-02-19 17:11:33.50917+07	3	The Alchemist: A Fable About Following Your Dream	1	[{"added": {}}]	12	1
14	2022-02-19 17:13:59.931984+07	4	The Code Breaker: Jennifer Doudna, Gene Editing, and the Future of the Human Race	1	[{"added": {}}]	12	1
15	2022-02-19 17:14:41.341447+07	4	Phil Knight	1	[{"added": {}}]	8	1
16	2022-02-19 17:14:42.495262+07	2	BookAuthor object (2)	1	[{"added": {}}]	14	1
17	2022-02-19 17:14:52.160942+07	3	BookAuthor object (3)	1	[{"added": {}}]	14	1
18	2022-02-19 17:15:03.390086+07	4	BookAuthor object (4)	1	[{"added": {}}]	14	1
19	2022-02-19 17:17:37.532947+07	1	87db74998c5806f0b9ad3c74888ec243022c1e66	1	[{"added": {}}]	7	1
20	2022-02-19 21:05:16.00567+07	2	chandrafirst67@gmail.com	1	[{"added": {}}]	17	1
21	2022-02-19 22:27:17.812769+07	2	Shoe Dog: A Memoir by the Creator of Nike	1	[{"added": {}}]	15	1
22	2022-02-19 22:27:30.873431+07	3	The Alchemist: A Fable About Following Your Dream	1	[{"added": {}}]	15	1
23	2022-02-19 22:27:39.010335+07	4	The Code Breaker: Jennifer Doudna, Gene Editing, and the Future of the Human Race	1	[{"added": {}}]	15	1
24	2022-02-19 22:32:28.839382+07	4	The Code Breaker: Jennifer Doudna, Gene Editing, and the Future of the Human Race	3		15	1
25	2022-02-19 22:40:56.453409+07	5	The Code Breaker: Jennifer Doudna, Gene Editing, and the Future of the Human Race	1	[{"added": {}}]	15	1
26	2022-02-20 17:20:34.987598+07	5	The Code Breaker: Jennifer Doudna, Gene Editing, and the Future of the Human Race	2	[{"changed": {"fields": ["Stock"]}}]	15	1
27	2022-02-20 17:21:12.898044+07	5	The Code Breaker: Jennifer Doudna, Gene Editing, and the Future of the Human Race	2	[{"changed": {"fields": ["Stock"]}}]	15	1
28	2022-02-20 17:21:27.785656+07	5	The Code Breaker: Jennifer Doudna, Gene Editing, and the Future of the Human Race	2	[{"changed": {"fields": ["Stock"]}}]	15	1
29	2022-02-20 17:21:46.78666+07	5	The Code Breaker: Jennifer Doudna, Gene Editing, and the Future of the Human Race	2	[{"changed": {"fields": ["Stock"]}}]	15	1
30	2022-02-20 17:22:01.349636+07	5	The Code Breaker: Jennifer Doudna, Gene Editing, and the Future of the Human Race	2	[{"changed": {"fields": ["Stock"]}}]	15	1
31	2022-02-20 19:06:15.261543+07	3	The Alchemist: A Fable About Following Your Dream	2	[{"changed": {"fields": ["Cover"]}}]	12	1
32	2022-02-20 19:06:33.001718+07	4	The Code Breaker: Jennifer Doudna, Gene Editing, and the Future of the Human Race	2	[{"changed": {"fields": ["Cover"]}}]	12	1
33	2022-02-20 19:07:36.060362+07	2	Shoe Dog: A Memoir by the Creator of Nike	2	[{"changed": {"fields": ["Cover"]}}]	12	1
34	2022-02-20 19:11:37.279886+07	2	chandrafirst67@gmail.com	2	[{"changed": {"fields": ["Contact name"]}}]	17	1
35	2022-02-20 19:12:03.480264+07	1	chandrafirst67@gmail.com	2	[{"changed": {"fields": ["Contact name", "Address name", "Province", "State"]}}]	17	1
36	2022-02-20 19:12:09.929108+07	2	chandrafirst67@gmail.com	2	[{"changed": {"fields": ["Contact name"]}}]	17	1
37	2022-02-20 21:45:13.2787+07	4	The Code Breaker: Jennifer Doudna, Gene Editing, and the Future of the Human Race	2	[{"changed": {"fields": ["Cover"]}}]	12	1
38	2022-02-21 13:20:32.230397+07	2	chandrafirst67@gmail.com	2	[{"changed": {"fields": ["Phone number"]}}]	17	1
39	2022-02-21 13:26:18.228171+07	2	chandrafirst67@gmail.com	2	[]	17	1
40	2022-02-21 13:26:36.976872+07	1	chandrafirst67@gmail.com	2	[]	17	1
41	2022-02-21 14:06:48.601592+07	11	chandrafirst67@gmail.com	3		17	1
42	2022-02-21 14:06:48.604807+07	10	chandrafirst67@gmail.com	3		17	1
43	2022-02-21 14:06:48.607365+07	9	chandrafirst67@gmail.com	3		17	1
44	2022-02-21 14:06:48.610216+07	8	chandrafirst67@gmail.com	3		17	1
45	2022-02-21 14:06:48.613121+07	7	chandrafirst67@gmail.com	3		17	1
46	2022-02-21 14:06:48.615868+07	6	chandrafirst67@gmail.com	3		17	1
47	2022-02-21 14:06:48.618499+07	5	chandrafirst67@gmail.com	3		17	1
48	2022-02-21 14:06:48.621324+07	4	chandrafirst67@gmail.com	3		17	1
49	2022-02-21 14:06:48.623694+07	3	chandrafirst67@gmail.com	3		17	1
50	2022-02-21 14:06:48.627282+07	2	chandrafirst67@gmail.com	3		17	1
51	2022-02-21 14:06:48.629588+07	1	chandrafirst67@gmail.com	3		17	1
52	2022-02-21 14:33:39.989283+07	17	chandrafirst67@gmail.com	3		17	1
53	2022-02-21 14:33:39.992667+07	16	chandrafirst67@gmail.com	3		17	1
54	2022-02-21 14:33:39.995118+07	15	chandrafirst67@gmail.com	3		17	1
55	2022-02-21 14:33:39.998086+07	14	chandrafirst67@gmail.com	3		17	1
56	2022-02-21 14:33:40.001478+07	13	chandrafirst67@gmail.com	3		17	1
57	2022-02-21 14:33:40.004867+07	12	chandrafirst67@gmail.com	3		17	1
58	2022-02-21 14:36:19.354577+07	22	chandrafirst67@gmail.com	3		17	1
59	2022-02-21 14:36:19.357556+07	21	chandrafirst67@gmail.com	3		17	1
60	2022-02-21 14:36:19.360308+07	20	chandrafirst67@gmail.com	3		17	1
61	2022-02-21 14:36:19.363197+07	19	chandrafirst67@gmail.com	3		17	1
62	2022-02-21 14:36:19.366034+07	18	chandrafirst67@gmail.com	3		17	1
63	2022-02-21 14:38:28.046052+07	23	chan@smet.com	1	[{"added": {}}]	17	1
64	2022-02-21 14:39:04.742546+07	23	chan@smet.com	2	[{"changed": {"fields": ["Zip"]}}]	17	1
65	2022-02-21 14:39:09.745056+07	23	chan@smet.com	3		17	1
66	2022-02-21 14:49:28.52737+07	28	chandrafirst67@gmail.com	3		17	1
67	2022-02-21 14:49:28.530569+07	27	chandrafirst67@gmail.com	3		17	1
68	2022-02-21 14:49:28.533552+07	26	chandrafirst67@gmail.com	3		17	1
69	2022-02-21 14:49:28.536328+07	25	chandrafirst67@gmail.com	3		17	1
70	2022-02-21 14:49:28.539156+07	24	chandrafirst67@gmail.com	3		17	1
71	2022-02-21 15:01:51.029585+07	33	chandrafirst67@gmail.com	3		17	1
72	2022-02-21 15:01:51.032974+07	32	chandrafirst67@gmail.com	3		17	1
73	2022-02-21 15:01:51.036201+07	31	chandrafirst67@gmail.com	3		17	1
74	2022-02-21 15:01:51.042452+07	30	chandrafirst67@gmail.com	3		17	1
75	2022-02-21 15:01:51.045225+07	29	chandrafirst67@gmail.com	3		17	1
76	2022-02-21 15:35:28.633606+07	34	chandrafirst67@gmail.com	2	[]	17	1
77	2022-02-21 15:42:19.233725+07	38	chandrafirst67@gmail.com	3		17	1
78	2022-02-21 15:42:19.236863+07	37	chandrafirst67@gmail.com	3		17	1
79	2022-02-21 15:42:19.239108+07	36	chandrafirst67@gmail.com	3		17	1
80	2022-02-23 21:52:57.204703+07	40	chandrafirst67@gmail.com	3		17	1
81	2022-02-23 21:52:57.211259+07	39	chandrafirst67@gmail.com	3		17	1
82	2022-02-23 21:52:57.213806+07	35	chandrafirst67@gmail.com	3		17	1
83	2022-02-23 21:52:57.216268+07	34	chandrafirst67@gmail.com	3		17	1
84	2022-02-26 11:35:14.580594+07	1	BookAuthor object (1)	3		14	1
85	2022-03-04 10:43:57.774751+07	5	BookAuthor object (5)	1	[{"added": {}}]	14	1
86	2022-03-17 18:53:11.624932+07	6	BookAuthor object (6)	1	[{"added": {}}]	14	1
\.


--
-- Data for Name: django_content_type; Type: TABLE DATA; Schema: public; Owner: mdzhvmpakloifd
--

COPY public.django_content_type (id, app_label, model) FROM stdin;
1	admin	logentry
2	auth	permission
3	auth	group
4	contenttypes	contenttype
5	sessions	session
6	authtoken	token
7	authtoken	tokenproxy
8	book	author
9	book	language
10	book	publisher
11	book	genre
12	book	book
13	book	bookgenre
14	book	bookauthor
15	inventory	inventory
16	account	user
17	account	useraddress
\.


--
-- Data for Name: django_migrations; Type: TABLE DATA; Schema: public; Owner: mdzhvmpakloifd
--

COPY public.django_migrations (id, app, name, applied) FROM stdin;
1	contenttypes	0001_initial	2022-02-19 17:00:27.400856+07
2	account	0001_initial	2022-02-19 17:01:09.870258+07
3	admin	0001_initial	2022-02-19 17:01:09.899598+07
4	admin	0002_logentry_remove_auto_add	2022-02-19 17:01:09.905942+07
5	admin	0003_logentry_add_action_flag_choices	2022-02-19 17:01:09.913493+07
6	contenttypes	0002_remove_content_type_name	2022-02-19 17:01:09.931105+07
7	auth	0001_initial	2022-02-19 17:01:09.997578+07
8	auth	0002_alter_permission_name_max_length	2022-02-19 17:01:10.007731+07
9	auth	0003_alter_user_email_max_length	2022-02-19 17:01:10.016508+07
10	auth	0004_alter_user_username_opts	2022-02-19 17:01:10.024378+07
11	auth	0005_alter_user_last_login_null	2022-02-19 17:01:10.032108+07
12	auth	0006_require_contenttypes_0002	2022-02-19 17:01:10.035673+07
13	auth	0007_alter_validators_add_error_messages	2022-02-19 17:01:10.043996+07
14	auth	0008_alter_user_username_max_length	2022-02-19 17:01:10.051683+07
15	auth	0009_alter_user_last_name_max_length	2022-02-19 17:01:10.060207+07
16	auth	0010_alter_group_name_max_length	2022-02-19 17:01:10.070195+07
17	auth	0011_update_proxy_permissions	2022-02-19 17:01:10.083244+07
18	auth	0012_alter_user_first_name_max_length	2022-02-19 17:01:10.091314+07
19	authtoken	0001_initial	2022-02-19 17:01:10.117881+07
20	authtoken	0002_auto_20160226_1747	2022-02-19 17:01:10.136964+07
21	authtoken	0003_tokenproxy	2022-02-19 17:01:10.142646+07
22	sessions	0001_initial	2022-02-19 17:01:10.1662+07
23	book	0001_initial	2022-02-19 17:01:46.623898+07
24	inventory	0001_initial	2022-02-19 17:01:46.642929+07
25	book	0002_alter_book_name	2022-02-19 17:12:49.515038+07
26	account	0002_useraddress_contact_name	2022-02-20 19:10:30.190706+07
27	account	0003_alter_useraddress_phone_number	2022-02-21 13:20:16.212783+07
28	account	0004_auto_20220221_0625	2022-02-21 13:25:57.461979+07
29	account	0002_auto_20220221_0835	2022-02-21 15:35:10.848369+07
30	account	0003_alter_useraddress_address_name	2022-02-21 15:36:36.489016+07
\.


--
-- Data for Name: django_session; Type: TABLE DATA; Schema: public; Owner: mdzhvmpakloifd
--

COPY public.django_session (session_key, session_data, expire_date) FROM stdin;
x194l6rf2d1q6g80vt3wficyx8rjgfed	.eJxVjDEOwjAMRe-SGUVxrSYxIztniGwnoQXUSk07Ie4OlTrA-t97_2USb-uQtlaWNGZzNmBOv5uwPsq0g3zn6TZbnad1GcXuij1os9c5l-flcP8OBm7Dt2ZErkBZyRcoUkJV71GBJFAngEIaNXSxcs6CjriD3gFiBYwUXW_eH_7NN9I:1nLMZS:ioFlj6Fzp_XpfJT0ONTHVOxgdAiYp7IkdYooTJnvpWY	2022-03-05 17:02:30.388497+07
0qk0ehuaz1jb7l374trah9iqlnxgdq20	.eJxVjDEOwjAMRe-SGUVxrSYxIztniGwnoQXUSk07Ie4OlTrA-t97_2USb-uQtlaWNGZzNmBOv5uwPsq0g3zn6TZbnad1GcXuij1os9c5l-flcP8OBm7Dt2ZErkBZyRcoUkJV71GBJFAngEIaNXSxcs6CjriD3gFiBYwUXW_eH_7NN9I:1nUkZJ:p6mrNCVTNy08DUBe2KDdmLaok6IyEBf5jipCt59HgsE	2022-03-31 14:29:09.956001+07
58fk1pdpuxkfsx9y7xf8kwzh65pu5lg3	.eJxVjDsOwjAQBe_iGlmO18EyJT1nsPYXHECOFCdVxN0hUgpo38y8zWRcl5LXpnMexVxMZ06_GyE_te5AHljvk-WpLvNIdlfsQZu9TaKv6-H-HRRs5Vu7pJD6Tj0B8OCVHAWHKBwwxeRFA1Pokb1DVWBHwnFgENAzKUUy7w8FWTmP:1naUs1:c4HEfFOUZa6oI73U9pI3d1DiB131ZSf5mG4WCAO3vGo	2022-04-16 10:56:13.435633+07
8zrge2hsmtn72pi8qnh7qu4b98uxupe5	.eJxVjDsOwjAQBe_iGlmO18EyJT1nsPYXHECOFCdVxN0hUgpo38y8zWRcl5LXpnMexVxMZ06_GyE_te5AHljvk-WpLvNIdlfsQZu9TaKv6-H-HRRs5Vu7pJD6Tj0B8OCVHAWHKBwwxeRFA1Pokb1DVWBHwnFgENAzKUUy7w8FWTmP:1naUsr:9SLDgy0vg9w1_gVkRLEXAJ50w50nS7XzoQDxRuKlIUE	2022-04-16 10:57:05.029497+07
2ww1ylyyqjs8znxarjxftms8beggr9na	.eJxVjDsOwjAQBe_iGlmO18EyJT1nsPYXHECOFCdVxN0hUgpo38y8zWRcl5LXpnMexVxMZ06_GyE_te5AHljvk-WpLvNIdlfsQZu9TaKv6-H-HRRs5Vu7pJD6Tj0B8OCVHAWHKBwwxeRFA1Pokb1DVWBHwnFgENAzKUUy7w8FWTmP:1naV3Z:Onexy4X_8nu1DkKLsAGR5P2ZrG_8bYpKfCw3DPPKqxs	2022-04-16 11:08:09.209418+07
\.


--
-- Data for Name: inventory_inventory; Type: TABLE DATA; Schema: public; Owner: mdzhvmpakloifd
--

COPY public.inventory_inventory (id, stock, book_id) FROM stdin;
1	100	1
2	300	2
3	60	3
5	10	4
\.


--
-- Name: account_user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mdzhvmpakloifd
--

SELECT pg_catalog.setval('public.account_user_id_seq', 9, true);


--
-- Name: account_useraddress_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mdzhvmpakloifd
--

SELECT pg_catalog.setval('public.account_useraddress_id_seq', 43, true);


--
-- Name: auth_group_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mdzhvmpakloifd
--

SELECT pg_catalog.setval('public.auth_group_id_seq', 1, false);


--
-- Name: auth_group_permissions_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mdzhvmpakloifd
--

SELECT pg_catalog.setval('public.auth_group_permissions_id_seq', 1, false);


--
-- Name: auth_permission_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mdzhvmpakloifd
--

SELECT pg_catalog.setval('public.auth_permission_id_seq', 68, true);


--
-- Name: book_author_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mdzhvmpakloifd
--

SELECT pg_catalog.setval('public.book_author_id_seq', 4, true);


--
-- Name: book_book_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mdzhvmpakloifd
--

SELECT pg_catalog.setval('public.book_book_id_seq', 4, true);


--
-- Name: book_bookauthor_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mdzhvmpakloifd
--

SELECT pg_catalog.setval('public.book_bookauthor_id_seq', 6, true);


--
-- Name: book_bookgenre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mdzhvmpakloifd
--

SELECT pg_catalog.setval('public.book_bookgenre_id_seq', 1, false);


--
-- Name: book_genre_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mdzhvmpakloifd
--

SELECT pg_catalog.setval('public.book_genre_id_seq', 2, true);


--
-- Name: book_language_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mdzhvmpakloifd
--

SELECT pg_catalog.setval('public.book_language_id_seq', 1, true);


--
-- Name: book_publisher_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mdzhvmpakloifd
--

SELECT pg_catalog.setval('public.book_publisher_id_seq', 1, true);


--
-- Name: django_admin_log_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mdzhvmpakloifd
--

SELECT pg_catalog.setval('public.django_admin_log_id_seq', 86, true);


--
-- Name: django_content_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mdzhvmpakloifd
--

SELECT pg_catalog.setval('public.django_content_type_id_seq', 17, true);


--
-- Name: django_migrations_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mdzhvmpakloifd
--

SELECT pg_catalog.setval('public.django_migrations_id_seq', 30, true);


--
-- Name: inventory_inventory_id_seq; Type: SEQUENCE SET; Schema: public; Owner: mdzhvmpakloifd
--

SELECT pg_catalog.setval('public.inventory_inventory_id_seq', 5, true);


--
-- Name: account_user account_user_email_key; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.account_user
    ADD CONSTRAINT account_user_email_key UNIQUE (email);


--
-- Name: account_user account_user_pkey; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.account_user
    ADD CONSTRAINT account_user_pkey PRIMARY KEY (id);


--
-- Name: account_useraddress account_useraddress_pkey; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.account_useraddress
    ADD CONSTRAINT account_useraddress_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_name_key; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_name_key UNIQUE (name);


--
-- Name: auth_group_permissions auth_group_permissions_group_id_permission_id_0cd325b0_uniq; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_permission_id_0cd325b0_uniq UNIQUE (group_id, permission_id);


--
-- Name: auth_group_permissions auth_group_permissions_pkey; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_pkey PRIMARY KEY (id);


--
-- Name: auth_group auth_group_pkey; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.auth_group
    ADD CONSTRAINT auth_group_pkey PRIMARY KEY (id);


--
-- Name: auth_permission auth_permission_content_type_id_codename_01ab375a_uniq; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_codename_01ab375a_uniq UNIQUE (content_type_id, codename);


--
-- Name: auth_permission auth_permission_pkey; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_pkey PRIMARY KEY (id);


--
-- Name: authtoken_token authtoken_token_pkey; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.authtoken_token
    ADD CONSTRAINT authtoken_token_pkey PRIMARY KEY (key);


--
-- Name: authtoken_token authtoken_token_user_id_key; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.authtoken_token
    ADD CONSTRAINT authtoken_token_user_id_key UNIQUE (user_id);


--
-- Name: book_author book_author_name_key; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.book_author
    ADD CONSTRAINT book_author_name_key UNIQUE (name);


--
-- Name: book_author book_author_pkey; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.book_author
    ADD CONSTRAINT book_author_pkey PRIMARY KEY (id);


--
-- Name: book_book book_book_name_key; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.book_book
    ADD CONSTRAINT book_book_name_key UNIQUE (name);


--
-- Name: book_book book_book_pkey; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.book_book
    ADD CONSTRAINT book_book_pkey PRIMARY KEY (id);


--
-- Name: book_bookauthor book_bookauthor_book_id_author_id_efaef027_uniq; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.book_bookauthor
    ADD CONSTRAINT book_bookauthor_book_id_author_id_efaef027_uniq UNIQUE (book_id, author_id);


--
-- Name: book_bookauthor book_bookauthor_pkey; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.book_bookauthor
    ADD CONSTRAINT book_bookauthor_pkey PRIMARY KEY (id);


--
-- Name: book_bookgenre book_bookgenre_book_id_genre_id_bb0a03e0_uniq; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.book_bookgenre
    ADD CONSTRAINT book_bookgenre_book_id_genre_id_bb0a03e0_uniq UNIQUE (book_id, genre_id);


--
-- Name: book_bookgenre book_bookgenre_pkey; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.book_bookgenre
    ADD CONSTRAINT book_bookgenre_pkey PRIMARY KEY (id);


--
-- Name: book_genre book_genre_name_key; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.book_genre
    ADD CONSTRAINT book_genre_name_key UNIQUE (name);


--
-- Name: book_genre book_genre_pkey; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.book_genre
    ADD CONSTRAINT book_genre_pkey PRIMARY KEY (id);


--
-- Name: book_language book_language_code_key; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.book_language
    ADD CONSTRAINT book_language_code_key UNIQUE (code);


--
-- Name: book_language book_language_name_key; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.book_language
    ADD CONSTRAINT book_language_name_key UNIQUE (name);


--
-- Name: book_language book_language_pkey; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.book_language
    ADD CONSTRAINT book_language_pkey PRIMARY KEY (id);


--
-- Name: book_publisher book_publisher_name_key; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.book_publisher
    ADD CONSTRAINT book_publisher_name_key UNIQUE (name);


--
-- Name: book_publisher book_publisher_pkey; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.book_publisher
    ADD CONSTRAINT book_publisher_pkey PRIMARY KEY (id);


--
-- Name: django_admin_log django_admin_log_pkey; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_pkey PRIMARY KEY (id);


--
-- Name: django_content_type django_content_type_app_label_model_76bd3d3b_uniq; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_app_label_model_76bd3d3b_uniq UNIQUE (app_label, model);


--
-- Name: django_content_type django_content_type_pkey; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.django_content_type
    ADD CONSTRAINT django_content_type_pkey PRIMARY KEY (id);


--
-- Name: django_migrations django_migrations_pkey; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.django_migrations
    ADD CONSTRAINT django_migrations_pkey PRIMARY KEY (id);


--
-- Name: django_session django_session_pkey; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.django_session
    ADD CONSTRAINT django_session_pkey PRIMARY KEY (session_key);


--
-- Name: inventory_inventory inventory_inventory_book_id_key; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.inventory_inventory
    ADD CONSTRAINT inventory_inventory_book_id_key UNIQUE (book_id);


--
-- Name: inventory_inventory inventory_inventory_pkey; Type: CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.inventory_inventory
    ADD CONSTRAINT inventory_inventory_pkey PRIMARY KEY (id);


--
-- Name: account_user_email_0bd7c421_like; Type: INDEX; Schema: public; Owner: mdzhvmpakloifd
--

CREATE INDEX account_user_email_0bd7c421_like ON public.account_user USING btree (email varchar_pattern_ops);


--
-- Name: account_useraddress_user_id_9afd3895; Type: INDEX; Schema: public; Owner: mdzhvmpakloifd
--

CREATE INDEX account_useraddress_user_id_9afd3895 ON public.account_useraddress USING btree (user_id);


--
-- Name: account_useraddress_user_id_9afd3895_like; Type: INDEX; Schema: public; Owner: mdzhvmpakloifd
--

CREATE INDEX account_useraddress_user_id_9afd3895_like ON public.account_useraddress USING btree (user_id varchar_pattern_ops);


--
-- Name: auth_group_name_a6ea08ec_like; Type: INDEX; Schema: public; Owner: mdzhvmpakloifd
--

CREATE INDEX auth_group_name_a6ea08ec_like ON public.auth_group USING btree (name varchar_pattern_ops);


--
-- Name: auth_group_permissions_group_id_b120cbf9; Type: INDEX; Schema: public; Owner: mdzhvmpakloifd
--

CREATE INDEX auth_group_permissions_group_id_b120cbf9 ON public.auth_group_permissions USING btree (group_id);


--
-- Name: auth_group_permissions_permission_id_84c5c92e; Type: INDEX; Schema: public; Owner: mdzhvmpakloifd
--

CREATE INDEX auth_group_permissions_permission_id_84c5c92e ON public.auth_group_permissions USING btree (permission_id);


--
-- Name: auth_permission_content_type_id_2f476e4b; Type: INDEX; Schema: public; Owner: mdzhvmpakloifd
--

CREATE INDEX auth_permission_content_type_id_2f476e4b ON public.auth_permission USING btree (content_type_id);


--
-- Name: authtoken_token_key_10f0b77e_like; Type: INDEX; Schema: public; Owner: mdzhvmpakloifd
--

CREATE INDEX authtoken_token_key_10f0b77e_like ON public.authtoken_token USING btree (key varchar_pattern_ops);


--
-- Name: book_author_name_139084ff_like; Type: INDEX; Schema: public; Owner: mdzhvmpakloifd
--

CREATE INDEX book_author_name_139084ff_like ON public.book_author USING btree (name varchar_pattern_ops);


--
-- Name: book_book_genre_id_bc3e2c4b; Type: INDEX; Schema: public; Owner: mdzhvmpakloifd
--

CREATE INDEX book_book_genre_id_bc3e2c4b ON public.book_book USING btree (genre_id);


--
-- Name: book_book_language_id_78ec35d2; Type: INDEX; Schema: public; Owner: mdzhvmpakloifd
--

CREATE INDEX book_book_language_id_78ec35d2 ON public.book_book USING btree (language_id);


--
-- Name: book_book_name_e60e11ed_like; Type: INDEX; Schema: public; Owner: mdzhvmpakloifd
--

CREATE INDEX book_book_name_e60e11ed_like ON public.book_book USING btree (name varchar_pattern_ops);


--
-- Name: book_book_publisher_id_7f77c06a; Type: INDEX; Schema: public; Owner: mdzhvmpakloifd
--

CREATE INDEX book_book_publisher_id_7f77c06a ON public.book_book USING btree (publisher_id);


--
-- Name: book_bookauthor_author_id_843340c1; Type: INDEX; Schema: public; Owner: mdzhvmpakloifd
--

CREATE INDEX book_bookauthor_author_id_843340c1 ON public.book_bookauthor USING btree (author_id);


--
-- Name: book_bookauthor_book_id_87219054; Type: INDEX; Schema: public; Owner: mdzhvmpakloifd
--

CREATE INDEX book_bookauthor_book_id_87219054 ON public.book_bookauthor USING btree (book_id);


--
-- Name: book_bookgenre_book_id_bdcbcf80; Type: INDEX; Schema: public; Owner: mdzhvmpakloifd
--

CREATE INDEX book_bookgenre_book_id_bdcbcf80 ON public.book_bookgenre USING btree (book_id);


--
-- Name: book_bookgenre_genre_id_63da7e65; Type: INDEX; Schema: public; Owner: mdzhvmpakloifd
--

CREATE INDEX book_bookgenre_genre_id_63da7e65 ON public.book_bookgenre USING btree (genre_id);


--
-- Name: book_genre_name_8cf31cd0_like; Type: INDEX; Schema: public; Owner: mdzhvmpakloifd
--

CREATE INDEX book_genre_name_8cf31cd0_like ON public.book_genre USING btree (name varchar_pattern_ops);


--
-- Name: book_language_code_312f1da8_like; Type: INDEX; Schema: public; Owner: mdzhvmpakloifd
--

CREATE INDEX book_language_code_312f1da8_like ON public.book_language USING btree (code varchar_pattern_ops);


--
-- Name: book_language_name_dac745d2_like; Type: INDEX; Schema: public; Owner: mdzhvmpakloifd
--

CREATE INDEX book_language_name_dac745d2_like ON public.book_language USING btree (name varchar_pattern_ops);


--
-- Name: book_publisher_name_56e63475_like; Type: INDEX; Schema: public; Owner: mdzhvmpakloifd
--

CREATE INDEX book_publisher_name_56e63475_like ON public.book_publisher USING btree (name varchar_pattern_ops);


--
-- Name: django_admin_log_content_type_id_c4bce8eb; Type: INDEX; Schema: public; Owner: mdzhvmpakloifd
--

CREATE INDEX django_admin_log_content_type_id_c4bce8eb ON public.django_admin_log USING btree (content_type_id);


--
-- Name: django_admin_log_user_id_c564eba6; Type: INDEX; Schema: public; Owner: mdzhvmpakloifd
--

CREATE INDEX django_admin_log_user_id_c564eba6 ON public.django_admin_log USING btree (user_id);


--
-- Name: django_session_expire_date_a5c62663; Type: INDEX; Schema: public; Owner: mdzhvmpakloifd
--

CREATE INDEX django_session_expire_date_a5c62663 ON public.django_session USING btree (expire_date);


--
-- Name: django_session_session_key_c0390e0f_like; Type: INDEX; Schema: public; Owner: mdzhvmpakloifd
--

CREATE INDEX django_session_session_key_c0390e0f_like ON public.django_session USING btree (session_key varchar_pattern_ops);


--
-- Name: account_useraddress account_useraddress_user_id_9afd3895_fk_account_user_email; Type: FK CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.account_useraddress
    ADD CONSTRAINT account_useraddress_user_id_9afd3895_fk_account_user_email FOREIGN KEY (user_id) REFERENCES public.account_user(email) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissio_permission_id_84c5c92e_fk_auth_perm; Type: FK CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissio_permission_id_84c5c92e_fk_auth_perm FOREIGN KEY (permission_id) REFERENCES public.auth_permission(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_group_permissions auth_group_permissions_group_id_b120cbf9_fk_auth_group_id; Type: FK CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.auth_group_permissions
    ADD CONSTRAINT auth_group_permissions_group_id_b120cbf9_fk_auth_group_id FOREIGN KEY (group_id) REFERENCES public.auth_group(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: auth_permission auth_permission_content_type_id_2f476e4b_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.auth_permission
    ADD CONSTRAINT auth_permission_content_type_id_2f476e4b_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: authtoken_token authtoken_token_user_id_35299eff_fk_account_user_id; Type: FK CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.authtoken_token
    ADD CONSTRAINT authtoken_token_user_id_35299eff_fk_account_user_id FOREIGN KEY (user_id) REFERENCES public.account_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: book_book book_book_genre_id_bc3e2c4b_fk_book_genre_id; Type: FK CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.book_book
    ADD CONSTRAINT book_book_genre_id_bc3e2c4b_fk_book_genre_id FOREIGN KEY (genre_id) REFERENCES public.book_genre(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: book_book book_book_language_id_78ec35d2_fk_book_language_id; Type: FK CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.book_book
    ADD CONSTRAINT book_book_language_id_78ec35d2_fk_book_language_id FOREIGN KEY (language_id) REFERENCES public.book_language(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: book_book book_book_publisher_id_7f77c06a_fk_book_publisher_id; Type: FK CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.book_book
    ADD CONSTRAINT book_book_publisher_id_7f77c06a_fk_book_publisher_id FOREIGN KEY (publisher_id) REFERENCES public.book_publisher(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: book_bookauthor book_bookauthor_author_id_843340c1_fk_book_author_id; Type: FK CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.book_bookauthor
    ADD CONSTRAINT book_bookauthor_author_id_843340c1_fk_book_author_id FOREIGN KEY (author_id) REFERENCES public.book_author(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: book_bookauthor book_bookauthor_book_id_87219054_fk_book_book_id; Type: FK CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.book_bookauthor
    ADD CONSTRAINT book_bookauthor_book_id_87219054_fk_book_book_id FOREIGN KEY (book_id) REFERENCES public.book_book(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: book_bookgenre book_bookgenre_book_id_bdcbcf80_fk_book_book_id; Type: FK CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.book_bookgenre
    ADD CONSTRAINT book_bookgenre_book_id_bdcbcf80_fk_book_book_id FOREIGN KEY (book_id) REFERENCES public.book_book(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: book_bookgenre book_bookgenre_genre_id_63da7e65_fk_book_genre_id; Type: FK CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.book_bookgenre
    ADD CONSTRAINT book_bookgenre_genre_id_63da7e65_fk_book_genre_id FOREIGN KEY (genre_id) REFERENCES public.book_genre(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_content_type_id_c4bce8eb_fk_django_co; Type: FK CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_content_type_id_c4bce8eb_fk_django_co FOREIGN KEY (content_type_id) REFERENCES public.django_content_type(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: django_admin_log django_admin_log_user_id_c564eba6_fk_account_user_id; Type: FK CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.django_admin_log
    ADD CONSTRAINT django_admin_log_user_id_c564eba6_fk_account_user_id FOREIGN KEY (user_id) REFERENCES public.account_user(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: inventory_inventory inventory_inventory_book_id_9b6a9cb3_fk_book_book_id; Type: FK CONSTRAINT; Schema: public; Owner: mdzhvmpakloifd
--

ALTER TABLE ONLY public.inventory_inventory
    ADD CONSTRAINT inventory_inventory_book_id_9b6a9cb3_fk_book_book_id FOREIGN KEY (book_id) REFERENCES public.book_book(id) DEFERRABLE INITIALLY DEFERRED;


--
-- Name: TABLE account_user; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON TABLE public.account_user TO mdzhvmpakloifd;


--
-- Name: SEQUENCE account_user_id_seq; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON SEQUENCE public.account_user_id_seq TO mdzhvmpakloifd;


--
-- Name: TABLE account_useraddress; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON TABLE public.account_useraddress TO mdzhvmpakloifd;


--
-- Name: SEQUENCE account_useraddress_id_seq; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON SEQUENCE public.account_useraddress_id_seq TO mdzhvmpakloifd;


--
-- Name: TABLE auth_group; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON TABLE public.auth_group TO mdzhvmpakloifd;


--
-- Name: SEQUENCE auth_group_id_seq; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON SEQUENCE public.auth_group_id_seq TO mdzhvmpakloifd;


--
-- Name: TABLE auth_group_permissions; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON TABLE public.auth_group_permissions TO mdzhvmpakloifd;


--
-- Name: SEQUENCE auth_group_permissions_id_seq; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON SEQUENCE public.auth_group_permissions_id_seq TO mdzhvmpakloifd;


--
-- Name: TABLE auth_permission; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON TABLE public.auth_permission TO mdzhvmpakloifd;


--
-- Name: SEQUENCE auth_permission_id_seq; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON SEQUENCE public.auth_permission_id_seq TO mdzhvmpakloifd;


--
-- Name: TABLE authtoken_token; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON TABLE public.authtoken_token TO mdzhvmpakloifd;


--
-- Name: TABLE book_author; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON TABLE public.book_author TO mdzhvmpakloifd;


--
-- Name: SEQUENCE book_author_id_seq; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON SEQUENCE public.book_author_id_seq TO mdzhvmpakloifd;


--
-- Name: TABLE book_book; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON TABLE public.book_book TO mdzhvmpakloifd;


--
-- Name: SEQUENCE book_book_id_seq; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON SEQUENCE public.book_book_id_seq TO mdzhvmpakloifd;


--
-- Name: TABLE book_bookauthor; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON TABLE public.book_bookauthor TO mdzhvmpakloifd;


--
-- Name: SEQUENCE book_bookauthor_id_seq; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON SEQUENCE public.book_bookauthor_id_seq TO mdzhvmpakloifd;


--
-- Name: TABLE book_bookgenre; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON TABLE public.book_bookgenre TO mdzhvmpakloifd;


--
-- Name: SEQUENCE book_bookgenre_id_seq; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON SEQUENCE public.book_bookgenre_id_seq TO mdzhvmpakloifd;


--
-- Name: TABLE book_genre; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON TABLE public.book_genre TO mdzhvmpakloifd;


--
-- Name: SEQUENCE book_genre_id_seq; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON SEQUENCE public.book_genre_id_seq TO mdzhvmpakloifd;


--
-- Name: TABLE book_language; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON TABLE public.book_language TO mdzhvmpakloifd;


--
-- Name: SEQUENCE book_language_id_seq; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON SEQUENCE public.book_language_id_seq TO mdzhvmpakloifd;


--
-- Name: TABLE book_publisher; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON TABLE public.book_publisher TO mdzhvmpakloifd;


--
-- Name: SEQUENCE book_publisher_id_seq; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON SEQUENCE public.book_publisher_id_seq TO mdzhvmpakloifd;


--
-- Name: TABLE django_admin_log; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON TABLE public.django_admin_log TO mdzhvmpakloifd;


--
-- Name: SEQUENCE django_admin_log_id_seq; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON SEQUENCE public.django_admin_log_id_seq TO mdzhvmpakloifd;


--
-- Name: TABLE django_content_type; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON TABLE public.django_content_type TO mdzhvmpakloifd;


--
-- Name: SEQUENCE django_content_type_id_seq; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON SEQUENCE public.django_content_type_id_seq TO mdzhvmpakloifd;


--
-- Name: TABLE django_migrations; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON TABLE public.django_migrations TO mdzhvmpakloifd;


--
-- Name: SEQUENCE django_migrations_id_seq; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON SEQUENCE public.django_migrations_id_seq TO mdzhvmpakloifd;


--
-- Name: TABLE django_session; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON TABLE public.django_session TO mdzhvmpakloifd;


--
-- Name: TABLE inventory_inventory; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON TABLE public.inventory_inventory TO mdzhvmpakloifd;


--
-- Name: SEQUENCE inventory_inventory_id_seq; Type: ACL; Schema: public; Owner: mdzhvmpakloifd
--

GRANT ALL ON SEQUENCE public.inventory_inventory_id_seq TO mdzhvmpakloifd;


--
-- mdzhvmpakloifdQL database dump complete
--

