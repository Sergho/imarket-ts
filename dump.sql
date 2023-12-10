--
-- PostgreSQL database dump
--

-- Dumped from database version 16.1
-- Dumped by pg_dump version 16.1

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
-- Name: order; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."order" (
    id integer NOT NULL,
    "ownerId" integer,
    date timestamp without time zone DEFAULT now() NOT NULL
);


ALTER TABLE public."order" OWNER TO postgres;

--
-- Name: order_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_id_seq OWNER TO postgres;

--
-- Name: order_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_id_seq OWNED BY public."order".id;


--
-- Name: order_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.order_item (
    id integer NOT NULL,
    amount integer NOT NULL,
    "productId" integer,
    "orderId" integer
);


ALTER TABLE public.order_item OWNER TO postgres;

--
-- Name: order_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.order_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.order_item_id_seq OWNER TO postgres;

--
-- Name: order_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.order_item_id_seq OWNED BY public.order_item.id;


--
-- Name: product; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product (
    id integer NOT NULL,
    name character varying(100) NOT NULL,
    price numeric NOT NULL,
    description text,
    "supplierId" integer,
    "typeId" integer
);


ALTER TABLE public.product OWNER TO postgres;

--
-- Name: product_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_id_seq OWNER TO postgres;

--
-- Name: product_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_id_seq OWNED BY public.product.id;


--
-- Name: product_type; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.product_type (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.product_type OWNER TO postgres;

--
-- Name: product_type_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.product_type_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.product_type_id_seq OWNER TO postgres;

--
-- Name: product_type_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.product_type_id_seq OWNED BY public.product_type.id;


--
-- Name: role; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.role (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.role OWNER TO postgres;

--
-- Name: role_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.role_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.role_id_seq OWNER TO postgres;

--
-- Name: role_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.role_id_seq OWNED BY public.role.id;


--
-- Name: shopping_cart; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shopping_cart (
    id integer NOT NULL,
    "ownerId" integer
);


ALTER TABLE public.shopping_cart OWNER TO postgres;

--
-- Name: shopping_cart_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shopping_cart_id_seq
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.shopping_cart_id_seq OWNER TO postgres;

--
-- Name: shopping_cart_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.shopping_cart_id_seq OWNED BY public.shopping_cart.id;


--
-- Name: shopping_cart_item; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.shopping_cart_item (
    id integer NOT NULL,
    amount integer NOT NULL,
    "productId" integer,
    "cartId" integer
);


ALTER TABLE public.shopping_cart_item OWNER TO postgres;

--
-- Name: shopping_cart_item_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.shopping_cart_item_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.shopping_cart_item_id_seq OWNER TO postgres;

--
-- Name: shopping_cart_item_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.shopping_cart_item_id_seq OWNED BY public.shopping_cart_item.id;


--
-- Name: supplier; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public.supplier (
    id integer NOT NULL,
    name character varying(50) NOT NULL
);


ALTER TABLE public.supplier OWNER TO postgres;

--
-- Name: supplier_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.supplier_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.supplier_id_seq OWNER TO postgres;

--
-- Name: supplier_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.supplier_id_seq OWNED BY public.supplier.id;


--
-- Name: user; Type: TABLE; Schema: public; Owner: postgres
--

CREATE TABLE public."user" (
    id integer NOT NULL,
    "firstName" character varying(50),
    "lastName" character varying(50),
    "midName" character varying(50),
    email character varying(50) NOT NULL,
    "passwordHash" character varying(60) NOT NULL,
    "roleId" integer
);


ALTER TABLE public."user" OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE; Schema: public; Owner: postgres
--

CREATE SEQUENCE public.user_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;


ALTER SEQUENCE public.user_id_seq OWNER TO postgres;

--
-- Name: user_id_seq; Type: SEQUENCE OWNED BY; Schema: public; Owner: postgres
--

ALTER SEQUENCE public.user_id_seq OWNED BY public."user".id;


--
-- Name: order id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order" ALTER COLUMN id SET DEFAULT nextval('public.order_id_seq'::regclass);


--
-- Name: order_item id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_item ALTER COLUMN id SET DEFAULT nextval('public.order_item_id_seq'::regclass);


--
-- Name: product id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product ALTER COLUMN id SET DEFAULT nextval('public.product_id_seq'::regclass);


--
-- Name: product_type id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_type ALTER COLUMN id SET DEFAULT nextval('public.product_type_id_seq'::regclass);


--
-- Name: role id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role ALTER COLUMN id SET DEFAULT nextval('public.role_id_seq'::regclass);


--
-- Name: shopping_cart id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_cart ALTER COLUMN id SET DEFAULT nextval('public.shopping_cart_id_seq'::regclass);


--
-- Name: shopping_cart_item id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_cart_item ALTER COLUMN id SET DEFAULT nextval('public.shopping_cart_item_id_seq'::regclass);


--
-- Name: supplier id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.supplier ALTER COLUMN id SET DEFAULT nextval('public.supplier_id_seq'::regclass);


--
-- Name: user id; Type: DEFAULT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user" ALTER COLUMN id SET DEFAULT nextval('public.user_id_seq'::regclass);


--
-- Data for Name: order; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."order" (id, "ownerId", date) FROM stdin;
4	1	2023-12-10 15:20:27.361827
5	1	2023-12-10 15:20:27.361827
7	1	2023-12-10 21:36:12.498
8	1	2023-12-10 22:27:54.931871
\.


--
-- Data for Name: order_item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.order_item (id, amount, "productId", "orderId") FROM stdin;
7	2	78	4
8	2	80	4
9	2	84	4
10	2	78	5
11	2	80	5
12	2	84	5
13	3	80	7
25	3	81	8
26	2	68	8
\.


--
-- Data for Name: product; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product (id, name, price, description, "supplierId", "typeId") FROM stdin;
93	New product	100000	\N	4	1
62	iPhone 13 Pro Max	99990.00	Новейший смартфон с процессором A15 Bionic и улучшенной камерой.	1	1
63	Samsung Galaxy Z Fold3	16990.00	Складной смартфон с большим внутренним экраном и S Pen поддержкой.	2	1
64	Sony A8H 65" 4K OLED Smart TV	22990.00	4K OLED телевизор с поддержкой HDR и Acoustic Surface Audio.	3	4
65	LG Gram 17" ноутбук	14990.00	Легкий и мощный ноутбук с длительным временем работы от батареи.	4	2
66	Huawei MateBook X Pro	13990.00	Тонкий ноутбук с высоким разрешением экрана и процессором Intel Core i7.	5	2
67	Dell XPS 13	11990.00	Ноутбук с ультратонким корпусом, процессором Intel Core i5 и 4K Ultra HD дисплеем.	6	2
68	HP OfficeJet Pro 9025	32990.00	Цветной принтер с возможностью двусторонней печати и автоматической подачей документов.	7	7
69	Lenovo Tab P11 Pro	49990.00	Планшет с OLED-экраном и мощным процессором Snapdragon 730G.	8	3
70	ASUS ROG Phone 5	99990.00	Игровой смартфон с высоким обновлением экрана, водяным охлаждением и мощным процессором.	9	1
71	Xiaomi Mi 11 Ultra	10990.00	Смартфон с керамическим корпусом, большим AMOLED экраном и тройной камерой высокого разрешения.	10	1
72	MacBook Pro 14"	18990.00	Мощный ноутбук с процессором M1 Pro, высококачественным дисплеем и долгим временем автономной работы.	1	2
73	Samsung QN90A 85" Neo QLED Smart TV	39990.00	Крупногабаритный телевизор с чистыми цветами и технологией OTS+ для улучшенной звуковой картины.	2	4
74	Sony Xperia 1 III	12990.00	Смартфон с профессиональной камерой, 4K OLED экраном и мощным процессором.	3	1
75	LG UltraGear 27GP950 27" 4K Gaming Monitor	89990.00	4K игровой монитор с высокой частотой обновления и поддержкой NVIDIA G-Sync.	4	5
76	Huawei Watch 3 Pro	34990.00	Умные часы с длительным временем работы и множеством фитнес-функций.	5	6
77	Dell Alienware m15 Ryzen Edition	16990.00	Игровой ноутбук с процессором AMD Ryzen и NVIDIA GeForce RTX графикой.	6	2
78	HP Sprocket Portable Photo Printer	9990.00	Карманный принтер для моментальной печати фотографий с телефона.	7	7
79	Lenovo Yoga Tab 13	59990.00	Планшет с уникальным встроенным стендом и 2K дисплеем.	8	3
80	ASUS ROG Strix XG27UQ 27" 4K Gaming Monitor	69990.00	27-дюймовый игровой монитор с DisplayHDR 400 и AMD FreeSync Premium Pro.	9	5
81	Xiaomi Mi Robot Vacuum-Mop P	29990.00	Робот-пылесос с функцией мытья пола, автоматической зарядкой и тройной системой навигации.	10	6
82	iPad Air (2022)	59990.00	Планшет с процессором M1, поддержкой Apple Pencil и доступом к более чем миллионам приложений в App Store.	1	3
83	Samsung Odyssey G9 49" Gaming Monitor	14990.00	Игровой монитор с ультрашироким изогнутым экраном, частотой обновления 240 Гц и QLED технологией.	2	5
84	Sony WF-1000XM4 Wireless Earbuds	27990.00	Беспроводные наушники с технологией шумоподавления, высоким качеством звука и длительным временем работы от батареи.	3	6
85	LG C1 55" 4K OLED Smart TV	16990.00	55-дюймовый OLED телевизор с поддержкой Dolby Vision IQ и AI Picture Pro.	4	4
86	Huawei MateStation X	12990.00	Ультратонкий настольный компьютер с процессором AMD Ryzen и интегрированным дискретным графическим процессором.	5	2
87	Dell UltraSharp U4320Q 42.5" 4K Monitor	89990.00	Монитор с ультравысоким разрешением для профессионального использования и удобной мультитаскинговой функцией Picture-by-Picture (PbP).	6	5
88	HP ENVY 6055 Wireless All-in-One Printer	12990.00	Беспроводное устройство "все-в-одном" для печати, сканирования и копирования с автоматической двусторонней печатью.	7	7
89	Lenovo Legion Y740 Gaming Laptop	17990.00	Игровой ноутбук с высокой производительностью, технологией NVIDIA GeForce и системой охлаждения Legion Coldfront.	8	2
90	ASUS ZenBook 14	99990.00	Компактный ноутбук с экраном NanoEdge и производительным процессором Intel Core i7.	9	2
91	Xiaomi Mi Smart Band 6	5990.00	Фитнес-браслет с большим AMOLED экраном, множеством трекеров активности и долгим временем работы от батареи.	10	6
92	test	123.00	1	1	1
\.


--
-- Data for Name: product_type; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.product_type (id, name) FROM stdin;
1	Смартфоны
2	Ноутбуки
3	Планшеты
4	Телевизоры
5	Видеокамеры
6	Умные устройства
7	Принтеры и сканеры
\.


--
-- Data for Name: role; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.role (id, name) FROM stdin;
1	Customer
2	Admin
\.


--
-- Data for Name: shopping_cart; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shopping_cart (id, "ownerId") FROM stdin;
3	1
\.


--
-- Data for Name: shopping_cart_item; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.shopping_cart_item (id, amount, "productId", "cartId") FROM stdin;
\.


--
-- Data for Name: supplier; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.supplier (id, name) FROM stdin;
1	Apple
2	Samsung
3	Sony
4	LG
5	Huawei
6	Dell
7	HP
8	Lenovo
9	ASUS
10	Xiaomi
\.


--
-- Data for Name: user; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public."user" (id, "firstName", "lastName", "midName", email, "passwordHash", "roleId") FROM stdin;
1	Sergho\n	Test	Test	sergche04@gmail.com	$2a$07$2xKkSehdo/NJNg1WLjjBS.SNwYgJC7CKeDbPmmWw9ZHd.o64HsV9i	2
\.


--
-- Name: order_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_id_seq', 8, true);


--
-- Name: order_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.order_item_id_seq', 26, true);


--
-- Name: product_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_id_seq', 97, true);


--
-- Name: product_type_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.product_type_id_seq', 1, false);


--
-- Name: role_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.role_id_seq', 2, true);


--
-- Name: shopping_cart_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shopping_cart_id_seq', 8, true);


--
-- Name: shopping_cart_item_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.shopping_cart_item_id_seq', 24, true);


--
-- Name: supplier_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.supplier_id_seq', 10, true);


--
-- Name: user_id_seq; Type: SEQUENCE SET; Schema: public; Owner: postgres
--

SELECT pg_catalog.setval('public.user_id_seq', 6, true);


--
-- Name: order PK_1031171c13130102495201e3e20; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "PK_1031171c13130102495201e3e20" PRIMARY KEY (id);


--
-- Name: shopping_cart_item PK_15909d00f68f8f022e5545745aa; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_cart_item
    ADD CONSTRAINT "PK_15909d00f68f8f022e5545745aa" PRIMARY KEY (id);


--
-- Name: supplier PK_2bc0d2cab6276144d2ff98a2828; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.supplier
    ADD CONSTRAINT "PK_2bc0d2cab6276144d2ff98a2828" PRIMARY KEY (id);


--
-- Name: shopping_cart PK_40f9358cdf55d73d8a2ad226592; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_cart
    ADD CONSTRAINT "PK_40f9358cdf55d73d8a2ad226592" PRIMARY KEY (id);


--
-- Name: role PK_b36bcfe02fc8de3c57a8b2391c2; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.role
    ADD CONSTRAINT "PK_b36bcfe02fc8de3c57a8b2391c2" PRIMARY KEY (id);


--
-- Name: product PK_bebc9158e480b949565b4dc7a82; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "PK_bebc9158e480b949565b4dc7a82" PRIMARY KEY (id);


--
-- Name: user PK_cace4a159ff9f2512dd42373760; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "PK_cace4a159ff9f2512dd42373760" PRIMARY KEY (id);


--
-- Name: order_item PK_d01158fe15b1ead5c26fd7f4e90; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT "PK_d01158fe15b1ead5c26fd7f4e90" PRIMARY KEY (id);


--
-- Name: product_type PK_e0843930fbb8854fe36ca39dae1; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product_type
    ADD CONSTRAINT "PK_e0843930fbb8854fe36ca39dae1" PRIMARY KEY (id);


--
-- Name: shopping_cart REL_bee83828c1e181ac7ba97267ca; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_cart
    ADD CONSTRAINT "REL_bee83828c1e181ac7ba97267ca" UNIQUE ("ownerId");


--
-- Name: user UQ_e12875dfb3b1d92d7d7c5377e22; Type: CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "UQ_e12875dfb3b1d92d7d7c5377e22" UNIQUE (email);


--
-- Name: shopping_cart FK_265215103083e4d699765c16d80; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_cart
    ADD CONSTRAINT "FK_265215103083e4d699765c16d80" FOREIGN KEY ("ownerId") REFERENCES public."user"(id);


--
-- Name: order FK_36eff870cbb426cbaa8f79de886; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."order"
    ADD CONSTRAINT "FK_36eff870cbb426cbaa8f79de886" FOREIGN KEY ("ownerId") REFERENCES public."user"(id);


--
-- Name: product FK_4346e4adb741e80f3711ee09ba4; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "FK_4346e4adb741e80f3711ee09ba4" FOREIGN KEY ("supplierId") REFERENCES public.supplier(id);


--
-- Name: product FK_53bafe3ecc25867776c07c9e666; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.product
    ADD CONSTRAINT "FK_53bafe3ecc25867776c07c9e666" FOREIGN KEY ("typeId") REFERENCES public.product_type(id);


--
-- Name: shopping_cart_item FK_54ae5bb4222e2d64ace88dc1416; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_cart_item
    ADD CONSTRAINT "FK_54ae5bb4222e2d64ace88dc1416" FOREIGN KEY ("productId") REFERENCES public.product(id);


--
-- Name: order_item FK_646bf9ece6f45dbe41c203e06e0; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT "FK_646bf9ece6f45dbe41c203e06e0" FOREIGN KEY ("orderId") REFERENCES public."order"(id);


--
-- Name: order_item FK_904370c093ceea4369659a3c810; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.order_item
    ADD CONSTRAINT "FK_904370c093ceea4369659a3c810" FOREIGN KEY ("productId") REFERENCES public.product(id);


--
-- Name: user FK_c28e52f758e7bbc53828db92194; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public."user"
    ADD CONSTRAINT "FK_c28e52f758e7bbc53828db92194" FOREIGN KEY ("roleId") REFERENCES public.role(id);


--
-- Name: shopping_cart_item FK_c746464c7c3208d3ad7d7a9153e; Type: FK CONSTRAINT; Schema: public; Owner: postgres
--

ALTER TABLE ONLY public.shopping_cart_item
    ADD CONSTRAINT "FK_c746464c7c3208d3ad7d7a9153e" FOREIGN KEY ("cartId") REFERENCES public.shopping_cart(id);


--
-- PostgreSQL database dump complete
--

