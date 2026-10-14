create table if not exists public.products (
  id text primary key,
  name text not null,
  category text not null,
  specs text not null,
  price text not null,
  image text not null,
  affiliate_url text not null,
  created_at timestamptz not null default now()
);

alter table public.products enable row level security;
grant select on table public.products to anon, authenticated;

drop policy if exists "Products are readable by everyone" on public.products;
create policy "Products are readable by everyone"
  on public.products
  for select
  to anon, authenticated
  using (true);

insert into public.products (id, name, category, specs, price, image, affiliate_url)
values
  ('1', 'CUAV V5+ Flight Controller', 'Flight Controller', 'Autopilot board running ArduPilot / PX4 for UAV & Multirotor', 'Rp 4.500.000', 'https://images.unsplash.com/photo-1527977966376-1c8408f9f108?auto=format&fit=crop&q=80&w=600', 'https://shopee.co.id'),
  ('2', 'SIYI A8 mini Gimbal Camera', 'Camera & Gimbal', '4K Ultra HD 3-Axis Gimbal Camera with MAVLink & RTSP Stream', 'Rp 3.200.000', 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&q=80&w=600', 'https://shopee.co.id'),
  ('3', 'Emlid Reach M2 RTK Receiver', 'GPS & Navigation', 'Multi-band RTK GNSS module for precise PPK/RTK aerial mapping', 'Rp 8.750.000', 'https://images.unsplash.com/photo-1506947411487-a56738267384?auto=format&fit=crop&q=80&w=600', 'https://shopee.co.id'),
  ('4', 'MKS HV6160 DroneCAN Servo', 'Actuators', 'High torque brushless CAN bus servo for heavy VTOL surfaces', 'Rp 1.150.000', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?auto=format&fit=crop&q=80&w=600', 'https://shopee.co.id')
on conflict (id) do nothing;
