import { createClient } from '@supabase/supabase-js';

// Reemplaza con tu URL y clave pública
const supabaseUrl = 'https://ueinlonpthpnamhnsguw.supabase.co';
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InVlaW5sb25wdGhwbmFtaG5zZ3V3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3MjM4MzUzMTQsImV4cCI6MjAzOTQxMTMxNH0.fUCNJpN25ctUDY3kNCLJ4YvW6Q2LmM7ngT5plnEUNRA';
const supabase = createClient(supabaseUrl, supabaseKey);

export default supabase;
