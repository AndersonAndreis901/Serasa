PGDMP  ;                    }            serasa1    17.5    17.5     �           0    0    ENCODING    ENCODING        SET client_encoding = 'UTF8';
                           false            �           0    0 
   STDSTRINGS 
   STDSTRINGS     (   SET standard_conforming_strings = 'on';
                           false            �           0    0 
   SEARCHPATH 
   SEARCHPATH     8   SELECT pg_catalog.set_config('search_path', '', false);
                           false            �           1262    24769    serasa1    DATABASE     ~   CREATE DATABASE serasa1 WITH TEMPLATE = template0 ENCODING = 'UTF8' LOCALE_PROVIDER = libc LOCALE = 'Portuguese_Brazil.1252';
    DROP DATABASE serasa1;
                     postgres    false            �            1255    24813 &   marcar_inadimplente(character varying) 	   PROCEDURE     �   CREATE PROCEDURE public.marcar_inadimplente(IN p_cpf_cnpj character varying)
    LANGUAGE plpgsql
    AS $$
BEGIN
  UPDATE usuarios
  SET inadimplente = TRUE
  WHERE cpf_cnpj = p_cpf_cnpj;
END;
$$;
 L   DROP PROCEDURE public.marcar_inadimplente(IN p_cpf_cnpj character varying);
       public               postgres    false            �            1259    24782    clientes    TABLE       CREATE TABLE public.clientes (
    id integer NOT NULL,
    nome_razao_social character varying(100) NOT NULL,
    email character varying(100) NOT NULL,
    senha character varying(255),
    cpf_cnpj character varying(20) NOT NULL,
    telefone character varying(20)
);
    DROP TABLE public.clientes;
       public         heap r       postgres    false            �            1259    24781    clientes_id_seq    SEQUENCE     �   CREATE SEQUENCE public.clientes_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.clientes_id_seq;
       public               postgres    false    220            �           0    0    clientes_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.clientes_id_seq OWNED BY public.clientes.id;
          public               postgres    false    219            �            1259    24791    score_consultas    TABLE     d  CREATE TABLE public.score_consultas (
    id integer NOT NULL,
    usuario_id integer NOT NULL,
    cliente_id integer,
    cpf_cnpj_consultado character varying(20) NOT NULL,
    score integer NOT NULL,
    data_consulta timestamp without time zone DEFAULT CURRENT_TIMESTAMP,
    tipo_evento character varying(20) DEFAULT 'consulta'::character varying
);
 #   DROP TABLE public.score_consultas;
       public         heap r       postgres    false            �            1259    24790    score_consultas_id_seq    SEQUENCE     �   CREATE SEQUENCE public.score_consultas_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 -   DROP SEQUENCE public.score_consultas_id_seq;
       public               postgres    false    222            �           0    0    score_consultas_id_seq    SEQUENCE OWNED BY     Q   ALTER SEQUENCE public.score_consultas_id_seq OWNED BY public.score_consultas.id;
          public               postgres    false    221            �            1259    24809    score_mais_recente    VIEW       CREATE VIEW public.score_mais_recente AS
 SELECT DISTINCT ON (cpf_cnpj_consultado) id,
    usuario_id,
    cliente_id,
    cpf_cnpj_consultado,
    score,
    data_consulta,
    tipo_evento
   FROM public.score_consultas
  ORDER BY cpf_cnpj_consultado, data_consulta DESC;
 %   DROP VIEW public.score_mais_recente;
       public       v       postgres    false    222    222    222    222    222    222    222            �            1259    24771    usuarios    TABLE     �  CREATE TABLE public.usuarios (
    id integer NOT NULL,
    cpf_cnpj character varying(20) NOT NULL,
    senha character varying(255) NOT NULL,
    tipo character varying(10) NOT NULL,
    inadimplente boolean DEFAULT false,
    ultimo_login timestamp without time zone,
    CONSTRAINT usuarios_tipo_check CHECK (((tipo)::text = ANY ((ARRAY['cpf'::character varying, 'cnpj'::character varying])::text[])))
);
    DROP TABLE public.usuarios;
       public         heap r       postgres    false            �            1259    24770    usuarios_id_seq    SEQUENCE     �   CREATE SEQUENCE public.usuarios_id_seq
    AS integer
    START WITH 1
    INCREMENT BY 1
    NO MINVALUE
    NO MAXVALUE
    CACHE 1;
 &   DROP SEQUENCE public.usuarios_id_seq;
       public               postgres    false    218            �           0    0    usuarios_id_seq    SEQUENCE OWNED BY     C   ALTER SEQUENCE public.usuarios_id_seq OWNED BY public.usuarios.id;
          public               postgres    false    217            2           2604    24785    clientes id    DEFAULT     j   ALTER TABLE ONLY public.clientes ALTER COLUMN id SET DEFAULT nextval('public.clientes_id_seq'::regclass);
 :   ALTER TABLE public.clientes ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    219    220    220            3           2604    24794    score_consultas id    DEFAULT     x   ALTER TABLE ONLY public.score_consultas ALTER COLUMN id SET DEFAULT nextval('public.score_consultas_id_seq'::regclass);
 A   ALTER TABLE public.score_consultas ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    221    222    222            0           2604    24774    usuarios id    DEFAULT     j   ALTER TABLE ONLY public.usuarios ALTER COLUMN id SET DEFAULT nextval('public.usuarios_id_seq'::regclass);
 :   ALTER TABLE public.usuarios ALTER COLUMN id DROP DEFAULT;
       public               postgres    false    217    218    218            �          0    24782    clientes 
   TABLE DATA           [   COPY public.clientes (id, nome_razao_social, email, senha, cpf_cnpj, telefone) FROM stdin;
    public               postgres    false    220   �&       �          0    24791    score_consultas 
   TABLE DATA           }   COPY public.score_consultas (id, usuario_id, cliente_id, cpf_cnpj_consultado, score, data_consulta, tipo_evento) FROM stdin;
    public               postgres    false    222   �'       �          0    24771    usuarios 
   TABLE DATA           Y   COPY public.usuarios (id, cpf_cnpj, senha, tipo, inadimplente, ultimo_login) FROM stdin;
    public               postgres    false    218   H(       �           0    0    clientes_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.clientes_id_seq', 3, true);
          public               postgres    false    219            �           0    0    score_consultas_id_seq    SEQUENCE SET     D   SELECT pg_catalog.setval('public.score_consultas_id_seq', 5, true);
          public               postgres    false    221            �           0    0    usuarios_id_seq    SEQUENCE SET     =   SELECT pg_catalog.setval('public.usuarios_id_seq', 3, true);
          public               postgres    false    217            <           2606    24789    clientes clientes_cpf_cnpj_key 
   CONSTRAINT     ]   ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_cpf_cnpj_key UNIQUE (cpf_cnpj);
 H   ALTER TABLE ONLY public.clientes DROP CONSTRAINT clientes_cpf_cnpj_key;
       public                 postgres    false    220            >           2606    24787    clientes clientes_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.clientes
    ADD CONSTRAINT clientes_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.clientes DROP CONSTRAINT clientes_pkey;
       public                 postgres    false    220            @           2606    24798 $   score_consultas score_consultas_pkey 
   CONSTRAINT     b   ALTER TABLE ONLY public.score_consultas
    ADD CONSTRAINT score_consultas_pkey PRIMARY KEY (id);
 N   ALTER TABLE ONLY public.score_consultas DROP CONSTRAINT score_consultas_pkey;
       public                 postgres    false    222            8           2606    24780    usuarios usuarios_cpf_cnpj_key 
   CONSTRAINT     ]   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_cpf_cnpj_key UNIQUE (cpf_cnpj);
 H   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_cpf_cnpj_key;
       public                 postgres    false    218            :           2606    24778    usuarios usuarios_pkey 
   CONSTRAINT     T   ALTER TABLE ONLY public.usuarios
    ADD CONSTRAINT usuarios_pkey PRIMARY KEY (id);
 @   ALTER TABLE ONLY public.usuarios DROP CONSTRAINT usuarios_pkey;
       public                 postgres    false    218            A           2606    24804 /   score_consultas score_consultas_cliente_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.score_consultas
    ADD CONSTRAINT score_consultas_cliente_id_fkey FOREIGN KEY (cliente_id) REFERENCES public.clientes(id);
 Y   ALTER TABLE ONLY public.score_consultas DROP CONSTRAINT score_consultas_cliente_id_fkey;
       public               postgres    false    222    4670    220            B           2606    24799 /   score_consultas score_consultas_usuario_id_fkey    FK CONSTRAINT     �   ALTER TABLE ONLY public.score_consultas
    ADD CONSTRAINT score_consultas_usuario_id_fkey FOREIGN KEY (usuario_id) REFERENCES public.usuarios(id);
 Y   ALTER TABLE ONLY public.score_consultas DROP CONSTRAINT score_consultas_usuario_id_fkey;
       public               postgres    false    222    4666    218            �   �   x�M�A�0E��S�	�:;Hpc\����D��j
�BŋY��?����ɓP���a7�u�a��uA���>��V�Z]{�\r��������$M�����I�R�l�{�#c�.��cSǫ�?M�2S'�Ei(MAJ�92F(�����޶�c�x�܃����i�:kȔ��U&W��Y4�D�b�L
      �   |   x��α1D�X���f��,늠�KR�D����U��3#=�K�`�al����<���v������sk&�������_��y �jf��\���Rr��Nӊ��I��%Y���)�蹷�~��>q      �   Z   x�5�I
�0�=�f&f��/�B��`�?.A�KSM1�YDT��\�ȢH��`]H��䣝�G3[���qQ����9kG���%�ׯ�M�     