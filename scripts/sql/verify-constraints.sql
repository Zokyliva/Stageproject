-- scripts/sql/verify-constraints.sql
-- Chaque bloc est annulé (ROLLBACK) : aucune donnée n'est conservée.
\set ON_ERROR_STOP off

-- Test 1 : une note de 25 doit être REFUSÉE
-- Attendu : violates check constraint "submissions_grade_range"
BEGIN;
INSERT INTO file_assets (id, "storageKey", "originalName", "mimeType", "sizeBytes", "uploadedById")
  SELECT 'chk_f1', 'chk1.pdf', 'chk1.pdf', 'application/pdf', 1, id FROM users WHERE email = 'camille.martin@exemple.fr';
INSERT INTO submissions (id, "assignmentId", "studentId", "fileId", grade)
  SELECT 'chk_s1', 'seed_assignment_relance', id, 'chk_f1', 25 FROM users WHERE email = 'camille.martin@exemple.fr';
ROLLBACK;

-- Test 2 : une soumission « GRADED » sans correcteur doit être REFUSÉE
-- Attendu : violates check constraint "submissions_graded_consistency"
BEGIN;
INSERT INTO file_assets (id, "storageKey", "originalName", "mimeType", "sizeBytes", "uploadedById")
  SELECT 'chk_f2', 'chk2.pdf', 'chk2.pdf', 'application/pdf', 1, id FROM users WHERE email = 'camille.martin@exemple.fr';
INSERT INTO submissions (id, "assignmentId", "studentId", "fileId", status)
  SELECT 'chk_s2', 'seed_assignment_relance', id, 'chk_f2', 'GRADED' FROM users WHERE email = 'camille.martin@exemple.fr';
ROLLBACK;

-- Test 3 : première soumission valide (note 14.5) ACCEPTÉE, seconde pour le même devoir REFUSÉE
-- Attendu : INSERT 0 1, puis violates unique constraint "submissions_assignmentId_studentId_key"
BEGIN;
INSERT INTO file_assets (id, "storageKey", "originalName", "mimeType", "sizeBytes", "uploadedById")
  SELECT 'chk_f3', 'chk3.pdf', 'chk3.pdf', 'application/pdf', 1, id FROM users WHERE email = 'camille.martin@exemple.fr';
INSERT INTO file_assets (id, "storageKey", "originalName", "mimeType", "sizeBytes", "uploadedById")
  SELECT 'chk_f4', 'chk4.pdf', 'chk4.pdf', 'application/pdf', 1, id FROM users WHERE email = 'camille.martin@exemple.fr';
INSERT INTO submissions (id, "assignmentId", "studentId", "fileId", grade)
  SELECT 'chk_s3', 'seed_assignment_relance', id, 'chk_f3', 14.5 FROM users WHERE email = 'camille.martin@exemple.fr';
INSERT INTO submissions (id, "assignmentId", "studentId", "fileId")
  SELECT 'chk_s4', 'seed_assignment_relance', id, 'chk_f4' FROM users WHERE email = 'camille.martin@exemple.fr';
ROLLBACK;