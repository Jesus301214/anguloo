-- ============================================================
-- RLS POLICIES FOR ANGULO - Supabase SQL Editor
-- ============================================================
-- Ejecutar este script en: https://supabase.com/dashboard
-- SQL Editor > New Query > pegar y ejecutar todo
-- ============================================================

-- 1. HABILITAR RLS EN TODAS LAS TABLAS
ALTER TABLE public.leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.meetings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.admin_users ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.settings ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.inventory ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.transactions ENABLE ROW LEVEL SECURITY;

-- ============================================================
-- 2. FUNCION AUXILIAR: Verificar si el usuario es admin
-- Usa el email del JWT de autenticacion
-- ============================================================
CREATE OR REPLACE FUNCTION public.is_admin()
RETURNS boolean
LANGUAGE sql
STABLE
SECURITY DEFINER
SET search_path = ''
AS $$
  SELECT EXISTS (
    SELECT 1 FROM public.admin_users
    WHERE email = auth.jwt()->>'email'
  );
$$;

-- ============================================================
-- 3. POLITICAS PARA leads
-- ============================================================

-- Permitir INSERT anonimo desde la landing page (captura de leads)
CREATE POLICY "Public can insert leads from landing page"
ON public.leads
FOR INSERT
TO anon, authenticated
WITH CHECK (true);

-- Admins pueden ver todos los leads
CREATE POLICY "Admins can view all leads"
ON public.leads
FOR SELECT
TO authenticated
USING (public.is_admin());

-- Admins pueden actualizar leads (cambio de status, soft-delete, restaurar)
CREATE POLICY "Admins can update leads"
ON public.leads
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- Admins pueden eliminar leads permanentemente
CREATE POLICY "Admins can delete leads"
ON public.leads
FOR DELETE
TO authenticated
USING (public.is_admin());

-- ============================================================
-- 4. POLITICAS PARA meetings
-- ============================================================

-- Admins pueden ver meetings (con JOIN a leads)
CREATE POLICY "Admins can view meetings"
ON public.meetings
FOR SELECT
TO authenticated
USING (public.is_admin());

-- Admins pueden crear meetings
CREATE POLICY "Admins can insert meetings"
ON public.meetings
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

-- ============================================================
-- 5. POLITICAS PARA admin_users
-- ============================================================

-- Cualquier usuario autenticado puede verificar si su email esta en admin_users
-- (necesario para ProtectedRoute)
CREATE POLICY "Users can check own admin status"
ON public.admin_users
FOR SELECT
TO authenticated
USING (email = auth.jwt()->>'email');

-- Admins pueden ver toda la lista de admins (para panel de Ajustes)
CREATE POLICY "Admins can view all admin users"
ON public.admin_users
FOR SELECT
TO authenticated
USING (public.is_admin());

-- Admins pueden agregar nuevos admins
CREATE POLICY "Admins can insert admin users"
ON public.admin_users
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

-- Admins pueden eliminar admins (no pueden eliminarse a si mismos - se maneja en frontend)
CREATE POLICY "Admins can delete admin users"
ON public.admin_users
FOR DELETE
TO authenticated
USING (public.is_admin());

-- ============================================================
-- 6. POLITICAS PARA settings
-- ============================================================

-- Admins pueden leer settings
CREATE POLICY "Admins can view settings"
ON public.settings
FOR SELECT
TO authenticated
USING (public.is_admin());

-- Admins pueden modificar settings
CREATE POLICY "Admins can upsert settings"
ON public.settings
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update settings"
ON public.settings
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

-- ============================================================
-- 7. POLITICAS PARA inventory
-- ============================================================

CREATE POLICY "Admins can view inventory"
ON public.inventory
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can insert inventory"
ON public.inventory
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can update inventory"
ON public.inventory
FOR UPDATE
TO authenticated
USING (public.is_admin())
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete inventory"
ON public.inventory
FOR DELETE
TO authenticated
USING (public.is_admin());

-- ============================================================
-- 8. POLITICAS PARA transactions
-- ============================================================

CREATE POLICY "Admins can view transactions"
ON public.transactions
FOR SELECT
TO authenticated
USING (public.is_admin());

CREATE POLICY "Admins can insert transactions"
ON public.transactions
FOR INSERT
TO authenticated
WITH CHECK (public.is_admin());

CREATE POLICY "Admins can delete transactions"
ON public.transactions
FOR DELETE
TO authenticated
USING (public.is_admin());

-- ============================================================
-- VERIFICACION
-- ============================================================
-- Despues de ejecutar, verifica con:
-- SELECT tablename, policyname, permissive, roles, cmd, qual, with_check
-- FROM pg_policies
-- WHERE schemaname = 'public'
-- ORDER BY tablename, cmd;
