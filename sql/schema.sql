-- Rode esse script uma vez no SQL Editor do Neon (console.neon.tech > seu projeto > SQL Editor).

create table if not exists newsletter_subscribers (
  id bigint generated always as identity primary key,
  nome text,
  email text not null,
  whatsapp text,
  consentimento boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists newsletter_subscribers_email_idx on newsletter_subscribers (email);

create table if not exists lead_magnet_downloads (
  id bigint generated always as identity primary key,
  nome text not null,
  email text not null,
  whatsapp text not null,
  idade_crianca text,
  material text not null,
  consentimento boolean not null default false,
  created_at timestamptz not null default now()
);

create index if not exists lead_magnet_downloads_email_idx on lead_magnet_downloads (email);
