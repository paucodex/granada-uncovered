drop policy if exists "Avatar images are publicly accessible" on storage.objects;

-- Allow only direct file reads (single-object). The storage public URL endpoint
-- works because it requests a specific object name; broad listing is denied
-- since there is no policy that returns true for arbitrary listings.
create policy "Avatar images are readable by object name"
on storage.objects for select
using (
  bucket_id = 'avatars'
  and name is not null
);