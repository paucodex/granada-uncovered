CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO 'public'
AS $function$
DECLARE
  meta_username text;
  meta_display text;
  final_username text;
  final_display text;
BEGIN
  meta_username := NULLIF(trim(NEW.raw_user_meta_data ->> 'username'), '');
  meta_display := NULLIF(trim(NEW.raw_user_meta_data ->> 'display_name'), '');

  final_username := COALESCE(
    meta_username,
    meta_display,
    split_part(NEW.email, '@', 1) || '_' || substr(NEW.id::text, 1, 6)
  );
  final_display := COALESCE(meta_display, meta_username, split_part(NEW.email, '@', 1));

  INSERT INTO public.profiles (user_id, display_name, username)
  VALUES (NEW.id, final_display, final_username);
  RETURN NEW;
END;
$function$;

-- Ensure the trigger exists on auth.users
DROP TRIGGER IF EXISTS on_auth_user_created ON auth.users;
CREATE TRIGGER on_auth_user_created
  AFTER INSERT ON auth.users
  FOR EACH ROW EXECUTE FUNCTION public.handle_new_user();