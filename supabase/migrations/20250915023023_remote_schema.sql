drop extension if exists "pg_net";

revoke delete on table "public"."articles" from "anon";

revoke insert on table "public"."articles" from "anon";

revoke references on table "public"."articles" from "anon";

revoke select on table "public"."articles" from "anon";

revoke trigger on table "public"."articles" from "anon";

revoke truncate on table "public"."articles" from "anon";

revoke update on table "public"."articles" from "anon";

revoke delete on table "public"."articles" from "authenticated";

revoke insert on table "public"."articles" from "authenticated";

revoke references on table "public"."articles" from "authenticated";

revoke select on table "public"."articles" from "authenticated";

revoke trigger on table "public"."articles" from "authenticated";

revoke truncate on table "public"."articles" from "authenticated";

revoke update on table "public"."articles" from "authenticated";

revoke delete on table "public"."articles" from "service_role";

revoke insert on table "public"."articles" from "service_role";

revoke references on table "public"."articles" from "service_role";

revoke select on table "public"."articles" from "service_role";

revoke trigger on table "public"."articles" from "service_role";

revoke truncate on table "public"."articles" from "service_role";

revoke update on table "public"."articles" from "service_role";

alter table "public"."articles" add column "author" uuid default auth.uid();


