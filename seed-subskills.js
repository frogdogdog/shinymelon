// ShinyMelon — Sub-skills Seed Script
// Run from your shinymelon project folder:
//   node seed-subskills.js
//
// Requires: @supabase/supabase-js and a .env.local file with your keys

import { createClient } from '@supabase/supabase-js';
import { config } from 'dotenv';
import { resolve } from 'path';
import ws from 'ws';

// Load .env.local
config({ path: resolve(process.cwd(), '.env.local') });

const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.SUPABASE_SERVICE_ROLE_KEY,
  { realtime: { transport: ws } }
);

// ── Sub-skill data ─────────────────────────────────────────────
// Format: { code: 'K.CC.1', difficulty: 1|2|3, name: '...' }
// difficulty: 1=intro, 2=practice, 3=challenge

const subSkills = [

  // ── K.CC.1 — Count to 100 by ones ──────────────────────────
  { code: 'K.CC.1', difficulty: 1, order: 1,  name: 'Count to 3' },
  { code: 'K.CC.1', difficulty: 1, order: 2,  name: 'Count to 5' },
  { code: 'K.CC.1', difficulty: 1, order: 3,  name: 'Count to 7' },
  { code: 'K.CC.1', difficulty: 2, order: 4,  name: 'Count to 10' },
  { code: 'K.CC.1', difficulty: 2, order: 5,  name: 'Count to 20' },
  { code: 'K.CC.1', difficulty: 2, order: 6,  name: 'Count to 50' },
  { code: 'K.CC.1', difficulty: 3, order: 7,  name: 'Count to 100' },

  // ── K.CC.2 — Count to 100 by tens ──────────────────────────
  { code: 'K.CC.2', difficulty: 1, order: 1,  name: 'Identify and name decade numbers (10, 20, 30…)' },
  { code: 'K.CC.2', difficulty: 2, order: 2,  name: 'Skip-count by 10s on a hundred chart' },
  { code: 'K.CC.2', difficulty: 3, order: 3,  name: 'Count to 100 by tens starting from any decade' },

  // ── K.CC.3 — Count forward from a given number ─────────────
  { code: 'K.CC.3', difficulty: 1, order: 1,  name: 'Count on from 1–5' },
  { code: 'K.CC.3', difficulty: 1, order: 2,  name: 'Count on from 6–10' },
  { code: 'K.CC.3', difficulty: 2, order: 3,  name: 'Count on from any number up to 20' },
  { code: 'K.CC.3', difficulty: 2, order: 4,  name: 'Identify what comes next up to 10' },
  { code: 'K.CC.3', difficulty: 3, order: 5,  name: 'Identify what comes next up to 20' },

  // ── K.CC.4 — Write numbers 0–20 ────────────────────────────
  { code: 'K.CC.4', difficulty: 1, order: 1,  name: 'Identify numerals 0–3' },
  { code: 'K.CC.4', difficulty: 1, order: 2,  name: 'Identify numerals 0–5' },
  { code: 'K.CC.4', difficulty: 1, order: 3,  name: 'Identify numerals 0–9' },
  { code: 'K.CC.4', difficulty: 1, order: 4,  name: 'Identify numerals 0–10' },
  { code: 'K.CC.4', difficulty: 2, order: 5,  name: 'Identify numerals 0–20' },
  { code: 'K.CC.4', difficulty: 2, order: 6,  name: 'Write numerals 0–5' },
  { code: 'K.CC.4', difficulty: 2, order: 7,  name: 'Write numerals 0–10' },
  { code: 'K.CC.4', difficulty: 3, order: 8,  name: 'Write numerals 0–20' },
  { code: 'K.CC.4', difficulty: 2, order: 9,  name: 'Match number word to numeral (one, two…ten)' },
  { code: 'K.CC.4', difficulty: 3, order: 10, name: 'Choose the number you hear (0–20)' },

  // ── K.CC.5a — One-to-one correspondence ────────────────────
  { code: 'K.CC.5a', difficulty: 1, order: 1,  name: 'Count pictures in a line up to 3' },
  { code: 'K.CC.5a', difficulty: 1, order: 2,  name: 'Count pictures in a line up to 5' },
  { code: 'K.CC.5a', difficulty: 1, order: 3,  name: 'Count cubes up to 5' },
  { code: 'K.CC.5a', difficulty: 1, order: 4,  name: 'Count dots up to 5' },
  { code: 'K.CC.5a', difficulty: 2, order: 5,  name: 'Count pictures in a line up to 10' },
  { code: 'K.CC.5a', difficulty: 2, order: 6,  name: 'Count cubes up to 10' },
  { code: 'K.CC.5a', difficulty: 2, order: 7,  name: 'Count on ten frames up to 5' },
  { code: 'K.CC.5a', difficulty: 2, order: 8,  name: 'Count on ten frames up to 10' },
  { code: 'K.CC.5a', difficulty: 2, order: 9,  name: 'Count dots up to 10' },
  { code: 'K.CC.5a', difficulty: 2, order: 10, name: 'Count scattered pictures up to 5' },
  { code: 'K.CC.5a', difficulty: 2, order: 11, name: 'Count scattered pictures up to 10' },
  { code: 'K.CC.5a', difficulty: 3, order: 12, name: 'Count shapes in rows up to 10' },
  { code: 'K.CC.5a', difficulty: 3, order: 13, name: 'Count shapes in rings up to 10' },
  { code: 'K.CC.5a', difficulty: 3, order: 14, name: 'Count pictures in arrays up to 15' },
  { code: 'K.CC.5a', difficulty: 3, order: 15, name: 'Count blocks up to 20' },

  // ── K.CC.5b — Cardinality ───────────────────────────────────
  { code: 'K.CC.5b', difficulty: 1, order: 1, name: 'Show how many with cubes up to 5' },
  { code: 'K.CC.5b', difficulty: 1, order: 2, name: 'Show how many on ten frames up to 5' },
  { code: 'K.CC.5b', difficulty: 2, order: 3, name: 'Show how many with cubes up to 10' },
  { code: 'K.CC.5b', difficulty: 2, order: 4, name: 'Show how many on ten frames up to 10' },
  { code: 'K.CC.5b', difficulty: 2, order: 5, name: 'Represent numbers with pictures up to 10' },
  { code: 'K.CC.5b', difficulty: 3, order: 6, name: 'Count out stickers up to 10' },
  { code: 'K.CC.5b', difficulty: 3, order: 7, name: 'Represent numbers with pictures up to 20' },

  // ── K.CC.5c — Count in any arrangement ─────────────────────
  { code: 'K.CC.5c', difficulty: 1, order: 1, name: 'Count to 10 — arrays' },
  { code: 'K.CC.5c', difficulty: 2, order: 2, name: 'Count to 15 — circles and arrays' },
  { code: 'K.CC.5c', difficulty: 2, order: 3, name: 'Count to 20 — on ten frames' },
  { code: 'K.CC.5c', difficulty: 3, order: 4, name: 'Count to 20 — dots' },
  { code: 'K.CC.5c', difficulty: 3, order: 5, name: 'Count to 20 — blocks and pictures' },

  // ── K.CC.6 — Count out from a larger set ───────────────────
  { code: 'K.CC.6', difficulty: 1, order: 1, name: 'Count out up to 5 from a set' },
  { code: 'K.CC.6', difficulty: 2, order: 2, name: 'Count out up to 10 from a set' },
  { code: 'K.CC.6', difficulty: 2, order: 3, name: 'Are there enough? (up to 5)' },
  { code: 'K.CC.6', difficulty: 3, order: 4, name: 'Are there enough? (up to 10)' },

  // ── K.CC.7 — One more and one less ─────────────────────────
  { code: 'K.CC.7', difficulty: 1, order: 1, name: 'One more with pictures up to 5' },
  { code: 'K.CC.7', difficulty: 1, order: 2, name: 'One less with pictures up to 5' },
  { code: 'K.CC.7', difficulty: 2, order: 3, name: 'One more with pictures up to 10' },
  { code: 'K.CC.7', difficulty: 2, order: 4, name: 'One less with pictures up to 10' },
  { code: 'K.CC.7', difficulty: 2, order: 5, name: 'One more on ten frames up to 10' },
  { code: 'K.CC.7', difficulty: 2, order: 6, name: 'One less on ten frames up to 10' },
  { code: 'K.CC.7', difficulty: 3, order: 7, name: 'One more and one less combined up to 20' },

  // ── K.CC.8 — Before, after, between ────────────────────────
  { code: 'K.CC.8', difficulty: 1, order: 1, name: 'What number comes next? (up to 5)' },
  { code: 'K.CC.8', difficulty: 1, order: 2, name: 'What number comes next? (up to 10)' },
  { code: 'K.CC.8', difficulty: 2, order: 3, name: 'Before, after, and between up to 10' },
  { code: 'K.CC.8', difficulty: 2, order: 4, name: 'Complete a sequence up to 10' },
  { code: 'K.CC.8', difficulty: 2, order: 5, name: 'Put numbers in order up to 10' },
  { code: 'K.CC.8', difficulty: 3, order: 6, name: 'Before, after, and between up to 20' },
  { code: 'K.CC.8', difficulty: 3, order: 7, name: 'Complete a sequence up to 20' },
  { code: 'K.CC.8', difficulty: 3, order: 8, name: 'Put numbers in order up to 20' },

  // ── K.CC.9 — Ordinal numbers ────────────────────────────────
  { code: 'K.CC.9', difficulty: 1, order: 1, name: 'First through third' },
  { code: 'K.CC.9', difficulty: 2, order: 2, name: 'First through fifth' },
  { code: 'K.CC.9', difficulty: 3, order: 3, name: 'First through tenth' },
  { code: 'K.CC.9', difficulty: 3, order: 4, name: 'Identify position in a line (1st, 2nd, 3rd…)' },

  // ── K.CC.10 — Number lines ──────────────────────────────────
  { code: 'K.CC.10', difficulty: 1, order: 1, name: 'Place numbers on a number line to 5' },
  { code: 'K.CC.10', difficulty: 2, order: 2, name: 'Place numbers on a number line to 10' },
  { code: 'K.CC.10', difficulty: 2, order: 3, name: 'Count forward on a number line' },
  { code: 'K.CC.10', difficulty: 3, order: 4, name: 'Place numbers on a number line to 20' },
  { code: 'K.CC.10', difficulty: 3, order: 5, name: 'Count backward on a number line' },

  // ── K.CC.11 — Compare groups up to 5 ───────────────────────
  { code: 'K.CC.11', difficulty: 1, order: 1, name: 'More — compare by matching up to 5' },
  { code: 'K.CC.11', difficulty: 1, order: 2, name: 'Fewer — compare by matching up to 5' },
  { code: 'K.CC.11', difficulty: 2, order: 3, name: 'Are there the same number? up to 5' },
  { code: 'K.CC.11', difficulty: 2, order: 4, name: 'Fewer and more — compare by counting up to 5' },
  { code: 'K.CC.11', difficulty: 3, order: 5, name: 'Greater than, less than, or equal — counting up to 5' },

  // ── K.CC.12 — Compare groups up to 10 ──────────────────────
  { code: 'K.CC.12', difficulty: 1, order: 1, name: 'More or fewer up to 10' },
  { code: 'K.CC.12', difficulty: 2, order: 2, name: 'Greater and less — compare by matching up to 10' },
  { code: 'K.CC.12', difficulty: 2, order: 3, name: 'Greater than, less than, or equal — counting up to 10' },
  { code: 'K.CC.12', difficulty: 3, order: 4, name: 'Compare three numbers up to 10' },
  { code: 'K.CC.12', difficulty: 3, order: 5, name: 'Put numbers in order up to 10' },

  // ── K.CC.13 — Compare groups up to 20 ──────────────────────
  { code: 'K.CC.13', difficulty: 1, order: 1, name: 'Fewer and more up to 20' },
  { code: 'K.CC.13', difficulty: 2, order: 2, name: 'Compare numbers using number lines up to 20' },
  { code: 'K.CC.13', difficulty: 3, order: 3, name: 'Greater than, less than, or equal up to 20' },
  { code: 'K.CC.13', difficulty: 3, order: 4, name: 'Put numbers up to 20 in order' },

  // ── K.CC.14 — Compare written numerals ─────────────────────
  { code: 'K.CC.14', difficulty: 1, order: 1, name: 'Greater and less — compare two numbers up to 5' },
  { code: 'K.CC.14', difficulty: 2, order: 2, name: 'Greater and less — compare two numbers up to 10' },
  { code: 'K.CC.14', difficulty: 3, order: 3, name: 'Show a number greater than a given number up to 20' },
  { code: 'K.CC.14', difficulty: 3, order: 4, name: 'Show a number less than a given number up to 20' },

  // ── K.OA.1a — Addition models to 5 ─────────────────────────
  { code: 'K.OA.1a', difficulty: 1, order: 1, name: 'Put together numbers using cubes — sums to 5' },
  { code: 'K.OA.1a', difficulty: 1, order: 2, name: 'Addition sentences — which model matches? (to 5)' },
  { code: 'K.OA.1a', difficulty: 2, order: 3, name: 'Addition sentences — what does the model show? (to 5)' },
  { code: 'K.OA.1a', difficulty: 2, order: 4, name: 'Write addition sentences for pictures — sums to 5' },
  { code: 'K.OA.1a', difficulty: 3, order: 5, name: 'Turn words into an addition sentence — sums to 5' },

  // ── K.OA.1b — Addition models to 10 ────────────────────────
  { code: 'K.OA.1b', difficulty: 1, order: 1, name: 'Put together numbers using cubes — sums to 10' },
  { code: 'K.OA.1b', difficulty: 2, order: 2, name: 'Addition sentences — which model matches? (to 10)' },
  { code: 'K.OA.1b', difficulty: 2, order: 3, name: 'Write addition sentences for pictures — sums to 10' },
  { code: 'K.OA.1b', difficulty: 3, order: 4, name: 'Turn words into an addition sentence — sums to 10' },

  // ── K.OA.2a — Add with models to 5 ─────────────────────────
  { code: 'K.OA.2a', difficulty: 1, order: 1, name: 'Add with cubes — sums to 5' },
  { code: 'K.OA.2a', difficulty: 1, order: 2, name: 'Add with pictures — sums to 5' },
  { code: 'K.OA.2a', difficulty: 2, order: 3, name: 'Add two numbers — sums to 5' },
  { code: 'K.OA.2a', difficulty: 2, order: 4, name: 'Complete the addition sentence — sums to 5' },
  { code: 'K.OA.2a', difficulty: 2, order: 5, name: 'Add 1 to numbers up to 5' },
  { code: 'K.OA.2a', difficulty: 3, order: 6, name: 'Add 2 to numbers up to 5' },

  // ── K.OA.2b — Add with models to 10 ────────────────────────
  { code: 'K.OA.2b', difficulty: 1, order: 1,  name: 'Add with cubes — sums to 10' },
  { code: 'K.OA.2b', difficulty: 1, order: 2,  name: 'Add with pictures — sums to 10' },
  { code: 'K.OA.2b', difficulty: 2, order: 3,  name: 'Add 1 or 2 to numbers up to 10' },
  { code: 'K.OA.2b', difficulty: 2, order: 4,  name: 'Add two numbers — sums to 10' },
  { code: 'K.OA.2b', difficulty: 2, order: 5,  name: 'Complete addition sentence to make 10 — with models' },
  { code: 'K.OA.2b', difficulty: 2, order: 6,  name: 'Complete addition sentence to make 10 — abstract' },
  { code: 'K.OA.2b', difficulty: 3, order: 7,  name: 'Complete the addition sentence — sums to 10' },
  { code: 'K.OA.2b', difficulty: 3, order: 8,  name: 'Add in any order — commutative property intro' },

  // ── K.OA.3a — Addition word problems to 5 ──────────────────
  { code: 'K.OA.3a', difficulty: 1, order: 1, name: 'Word problems with pictures — sums to 5' },
  { code: 'K.OA.3a', difficulty: 2, order: 2, name: 'Build cube trains to solve word problems — sums to 5' },
  { code: 'K.OA.3a', difficulty: 2, order: 3, name: 'Write addition sentences for word problems — to 5' },
  { code: 'K.OA.3a', difficulty: 3, order: 4, name: 'Model and write addition sentences for word problems — to 5' },

  // ── K.OA.3b — Addition word problems to 10 ─────────────────
  { code: 'K.OA.3b', difficulty: 1, order: 1, name: 'Word problems with pictures — sums to 10' },
  { code: 'K.OA.3b', difficulty: 2, order: 2, name: 'Build cube trains to solve word problems — sums to 10' },
  { code: 'K.OA.3b', difficulty: 2, order: 3, name: 'Write addition sentences for word problems — to 10' },
  { code: 'K.OA.3b', difficulty: 3, order: 4, name: 'Model and write addition sentences for word problems — to 10' },

  // ── K.OA.4a — Subtraction models within 5 ──────────────────
  { code: 'K.OA.4a', difficulty: 1, order: 1, name: 'Take away cubes — numbers to 5' },
  { code: 'K.OA.4a', difficulty: 1, order: 2, name: 'Subtraction sentences — which model matches? (to 5)' },
  { code: 'K.OA.4a', difficulty: 2, order: 3, name: 'Subtraction sentences — what does the model show? (to 5)' },
  { code: 'K.OA.4a', difficulty: 2, order: 4, name: 'Write subtraction sentences for pictures — to 5' },
  { code: 'K.OA.4a', difficulty: 3, order: 5, name: 'Turn words into a subtraction sentence — to 5' },

  // ── K.OA.4b — Subtraction models within 10 ─────────────────
  { code: 'K.OA.4b', difficulty: 1, order: 1, name: 'Take away cubes — numbers to 10' },
  { code: 'K.OA.4b', difficulty: 2, order: 2, name: 'Subtraction sentences — what does the model show? (to 10)' },
  { code: 'K.OA.4b', difficulty: 2, order: 3, name: 'Write subtraction sentences for pictures — to 10' },
  { code: 'K.OA.4b', difficulty: 3, order: 4, name: 'Turn words into a subtraction sentence — to 10' },

  // ── K.OA.5a — Subtract with models within 5 ────────────────
  { code: 'K.OA.5a', difficulty: 1, order: 1, name: 'Subtract with cubes — to 5' },
  { code: 'K.OA.5a', difficulty: 1, order: 2, name: 'Subtract with pictures — to 5' },
  { code: 'K.OA.5a', difficulty: 2, order: 3, name: 'Subtract numbers to 5' },
  { code: 'K.OA.5a', difficulty: 2, order: 4, name: 'Complete the subtraction sentence — to 5' },
  { code: 'K.OA.5a', difficulty: 2, order: 5, name: 'Subtract 1 from numbers up to 5' },
  { code: 'K.OA.5a', difficulty: 3, order: 6, name: 'Subtract 2 from numbers up to 5' },

  // ── K.OA.5b — Subtract with models within 10 ───────────────
  { code: 'K.OA.5b', difficulty: 1, order: 1, name: 'Subtract with cubes — to 10' },
  { code: 'K.OA.5b', difficulty: 1, order: 2, name: 'Subtract with pictures — to 10' },
  { code: 'K.OA.5b', difficulty: 2, order: 3, name: 'Subtract 1 or 2 — to 10' },
  { code: 'K.OA.5b', difficulty: 2, order: 4, name: 'Subtract numbers to 10' },
  { code: 'K.OA.5b', difficulty: 2, order: 5, name: 'Make a number using subtraction — to 10' },
  { code: 'K.OA.5b', difficulty: 3, order: 6, name: 'Complete the subtraction sentence — to 10' },

  // ── K.OA.6a — Subtraction word problems within 5 ───────────
  { code: 'K.OA.6a', difficulty: 1, order: 1, name: 'Word problems with pictures — to 5' },
  { code: 'K.OA.6a', difficulty: 2, order: 2, name: 'Write subtraction sentences for word problems — to 5' },
  { code: 'K.OA.6a', difficulty: 2, order: 3, name: 'Use cube trains to solve subtraction word problems — to 5' },
  { code: 'K.OA.6a', difficulty: 3, order: 4, name: 'Model and write subtraction sentences for word problems — to 5' },

  // ── K.OA.6b — Subtraction word problems within 10 ──────────
  { code: 'K.OA.6b', difficulty: 1, order: 1, name: 'Word problems with pictures — to 10' },
  { code: 'K.OA.6b', difficulty: 2, order: 2, name: 'Write subtraction sentences for word problems — to 10' },
  { code: 'K.OA.6b', difficulty: 2, order: 3, name: 'Use cube trains to solve subtraction word problems — to 10' },
  { code: 'K.OA.6b', difficulty: 3, order: 4, name: 'Model and write subtraction sentences for word problems — to 10' },

  // ── K.OA.7a — Decompose within 5 ───────────────────────────
  { code: 'K.OA.7a', difficulty: 1, order: 1, name: 'Take apart using cubes — sums to 5' },
  { code: 'K.OA.7a', difficulty: 2, order: 2, name: 'Make a number different ways using cubes — to 5' },
  { code: 'K.OA.7a', difficulty: 2, order: 3, name: 'Take apart numbers — addition sentences to 5' },
  { code: 'K.OA.7a', difficulty: 3, order: 4, name: 'Take apart numbers in different ways — to 5' },
  { code: 'K.OA.7a', difficulty: 3, order: 5, name: 'Make a number using addition — sums to 5' },

  // ── K.OA.7b — Decompose within 10 ──────────────────────────
  { code: 'K.OA.7b', difficulty: 1, order: 1, name: 'Take apart using cubes — sums to 10' },
  { code: 'K.OA.7b', difficulty: 2, order: 2, name: 'Make a number different ways — to 10' },
  { code: 'K.OA.7b', difficulty: 2, order: 3, name: 'Take apart 10 using cubes' },
  { code: 'K.OA.7b', difficulty: 2, order: 4, name: 'Decompose a number up to 10' },
  { code: 'K.OA.7b', difficulty: 3, order: 5, name: 'Take apart numbers — addition sentences to 10' },
  { code: 'K.OA.7b', difficulty: 3, order: 6, name: 'Take apart 10 — addition sentences' },
  { code: 'K.OA.7b', difficulty: 3, order: 7, name: 'Make a number using addition — sums to 10' },

  // ── K.OA.8 — Partners of 10 ────────────────────────────────
  { code: 'K.OA.8', difficulty: 1, order: 1, name: 'Complete addition sentence to make 10 — with models' },
  { code: 'K.OA.8', difficulty: 2, order: 2, name: 'Complete addition sentence to make 10 — abstract' },
  { code: 'K.OA.8', difficulty: 3, order: 3, name: 'All pairs that make 10 (0+10 through 10+0)' },

  // ── K.OA.9 — Fluency within 5 ──────────────────────────────
  { code: 'K.OA.9', difficulty: 1, order: 1, name: 'Add — sums to 5 (with pictures)' },
  { code: 'K.OA.9', difficulty: 2, order: 2, name: 'Add — sums to 5 (from memory)' },
  { code: 'K.OA.9', difficulty: 2, order: 3, name: 'Subtract — within 5 (from memory)' },
  { code: 'K.OA.9', difficulty: 3, order: 4, name: 'Mixed add and subtract — within 5' },

  // ── K.OA.10 — Choose the operation ─────────────────────────
  { code: 'K.OA.10', difficulty: 1, order: 1, name: 'Add or subtract — within 5' },
  { code: 'K.OA.10', difficulty: 2, order: 2, name: 'Add or subtract — within 10' },
  { code: 'K.OA.10', difficulty: 3, order: 3, name: 'Addition and subtraction — ways to make a number' },

  // ── K.OA.11 — Related facts ─────────────────────────────────
  { code: 'K.OA.11', difficulty: 1, order: 1, name: 'Related facts with models — within 5' },
  { code: 'K.OA.11', difficulty: 2, order: 2, name: 'Related facts with models — within 10' },
  { code: 'K.OA.11', difficulty: 3, order: 3, name: 'Write all four facts in a fact family — within 10' },

  // ── K.OA.12 — Add and subtract with 0 ──────────────────────
  { code: 'K.OA.12', difficulty: 1, order: 1, name: 'Add 0 to any number (n + 0 = n)' },
  { code: 'K.OA.12', difficulty: 2, order: 2, name: 'Subtract 0 from any number (n – 0 = n)' },
  { code: 'K.OA.12', difficulty: 3, order: 3, name: 'Mixed — add and subtract 0' },

  // ── K.OA.13 — Mixed word problems ──────────────────────────
  { code: 'K.OA.13', difficulty: 1, order: 1, name: 'Word problems with pictures — add and subtract within 5' },
  { code: 'K.OA.13', difficulty: 2, order: 2, name: 'Word problems with pictures — add and subtract within 10' },
  { code: 'K.OA.13', difficulty: 3, order: 3, name: 'Model and write addition and subtraction sentences for word problems' },

  // ── K.NBT.1 — Teen numbers ──────────────────────────────────
  { code: 'K.NBT.1', difficulty: 1, order: 1, name: 'Make teen numbers with models — words' },
  { code: 'K.NBT.1', difficulty: 1, order: 2, name: 'Make teen numbers — words (abstract)' },
  { code: 'K.NBT.1', difficulty: 2, order: 3, name: 'Take apart teen numbers with models' },
  { code: 'K.NBT.1', difficulty: 2, order: 4, name: 'Take apart teen numbers — words' },
  { code: 'K.NBT.1', difficulty: 2, order: 5, name: 'Understand tens and ones up to 20' },
  { code: 'K.NBT.1', difficulty: 3, order: 6, name: 'Make teen numbers — addition sentences' },
  { code: 'K.NBT.1', difficulty: 3, order: 7, name: 'Make teen numbers — addition sentences (abstract)' },

  // ── K.NBT.2 — Ten frames up to 20 ──────────────────────────
  { code: 'K.NBT.2', difficulty: 1, order: 1, name: 'Count on ten frames up to 20' },
  { code: 'K.NBT.2', difficulty: 2, order: 2, name: 'Show numbers on ten frames up to 20' },
  { code: 'K.NBT.2', difficulty: 3, order: 3, name: 'Identify tens and ones for any teen number' },

  // ── K.NBT.3 — Hundred chart ─────────────────────────────────
  { code: 'K.NBT.3', difficulty: 1, order: 1, name: 'Identify decade numbers on a hundred chart' },
  { code: 'K.NBT.3', difficulty: 2, order: 2, name: 'Count by 10s on a hundred chart' },
  { code: 'K.NBT.3', difficulty: 2, order: 3, name: 'Count on a chart up to 20' },
  { code: 'K.NBT.3', difficulty: 3, order: 4, name: 'Find patterns in the hundred chart' },
  { code: 'K.NBT.3', difficulty: 3, order: 5, name: 'Count on a chart up to 100' },

  // ── K.MD.1 — Describe attributes ───────────────────────────
  { code: 'K.MD.1', difficulty: 1, order: 1, name: 'Tall and short' },
  { code: 'K.MD.1', difficulty: 1, order: 2, name: 'Long and short' },
  { code: 'K.MD.1', difficulty: 1, order: 3, name: 'Heavy and light' },
  { code: 'K.MD.1', difficulty: 2, order: 4, name: 'Holds more or less' },
  { code: 'K.MD.1', difficulty: 3, order: 5, name: 'Describe objects using length, weight, height vocabulary' },

  // ── K.MD.2 — Compare two objects ───────────────────────────
  { code: 'K.MD.2', difficulty: 1, order: 1, name: 'Compare heights: taller / shorter' },
  { code: 'K.MD.2', difficulty: 1, order: 2, name: 'Compare lengths: longer / shorter' },
  { code: 'K.MD.2', difficulty: 2, order: 3, name: 'Compare weights: heavier / lighter' },
  { code: 'K.MD.2', difficulty: 2, order: 4, name: 'Compare capacities: holds more / less / same' },
  { code: 'K.MD.2', difficulty: 3, order: 5, name: 'Order 3 objects by length, height, or weight' },

  // ── K.MD.3 — Sort and classify ─────────────────────────────
  { code: 'K.MD.3', difficulty: 1, order: 1, name: 'Sort by color' },
  { code: 'K.MD.3', difficulty: 1, order: 2, name: 'Sort by shape' },
  { code: 'K.MD.3', difficulty: 1, order: 3, name: 'Sort by size' },
  { code: 'K.MD.3', difficulty: 2, order: 4, name: 'Sort by another attribute (texture, type)' },
  { code: 'K.MD.3', difficulty: 2, order: 5, name: 'Classify and sort by shape' },
  { code: 'K.MD.3', difficulty: 3, order: 6, name: 'Classify and sort — two attributes' },

  // ── K.MD.4 — Count categories ──────────────────────────────
  { code: 'K.MD.4', difficulty: 1, order: 1, name: 'Count objects in each category' },
  { code: 'K.MD.4', difficulty: 2, order: 2, name: 'Compare category totals (which has more/fewer)' },
  { code: 'K.MD.4', difficulty: 3, order: 3, name: 'Simple picture graphs — read and interpret' },

  // ── K.MD.5 — Patterns ──────────────────────────────────────
  { code: 'K.MD.5', difficulty: 1, order: 1, name: 'AB patterns' },
  { code: 'K.MD.5', difficulty: 1, order: 2, name: 'What comes next in an AB pattern?' },
  { code: 'K.MD.5', difficulty: 2, order: 3, name: 'AAB / ABB patterns' },
  { code: 'K.MD.5', difficulty: 2, order: 4, name: 'ABC patterns' },
  { code: 'K.MD.5', difficulty: 2, order: 5, name: 'Color patterns' },
  { code: 'K.MD.5', difficulty: 2, order: 6, name: 'Size patterns' },
  { code: 'K.MD.5', difficulty: 2, order: 7, name: 'Shape patterns' },
  { code: 'K.MD.5', difficulty: 3, order: 8, name: 'What is missing in a pattern?' },
  { code: 'K.MD.5', difficulty: 3, order: 9, name: 'Extend a pattern — mixed types' },

  // ── K.MD.6 — Coins ─────────────────────────────────────────
  { code: 'K.MD.6', difficulty: 1, order: 1, name: 'Name a penny; know its value (1¢)' },
  { code: 'K.MD.6', difficulty: 1, order: 2, name: 'Name a nickel; know its value (5¢)' },
  { code: 'K.MD.6', difficulty: 2, order: 3, name: 'Pennies and nickels — identify and name' },
  { code: 'K.MD.6', difficulty: 3, order: 4, name: 'Count pennies up to 10¢' },

  // ── K.G.1 — Name 2D shapes ─────────────────────────────────
  { code: 'K.G.1', difficulty: 1, order: 1, name: 'Identify a circle' },
  { code: 'K.G.1', difficulty: 1, order: 2, name: 'Identify a square' },
  { code: 'K.G.1', difficulty: 1, order: 3, name: 'Identify a triangle' },
  { code: 'K.G.1', difficulty: 1, order: 4, name: 'Identify a rectangle' },
  { code: 'K.G.1', difficulty: 2, order: 5, name: 'Identify a hexagon' },
  { code: 'K.G.1', difficulty: 2, order: 6, name: 'Identify a rhombus / diamond' },
  { code: 'K.G.1', difficulty: 2, order: 7, name: 'Identify an oval' },
  { code: 'K.G.1', difficulty: 2, order: 8, name: 'Identify a trapezoid' },
  { code: 'K.G.1', difficulty: 3, order: 9, name: 'Name the shape — mixed review' },

  // ── K.G.2 — Describe 2D shapes ─────────────────────────────
  { code: 'K.G.2', difficulty: 1, order: 1, name: 'Count sides of a shape' },
  { code: 'K.G.2', difficulty: 1, order: 2, name: 'Count corners / vertices of a shape' },
  { code: 'K.G.2', difficulty: 2, order: 3, name: 'Open vs. closed shapes' },
  { code: 'K.G.2', difficulty: 3, order: 4, name: 'Shapes with equal sides vs. unequal sides' },

  // ── K.G.3 — Shapes in the environment ──────────────────────
  { code: 'K.G.3', difficulty: 1, order: 1, name: 'Find circles in pictures' },
  { code: 'K.G.3', difficulty: 1, order: 2, name: 'Find squares and rectangles in pictures' },
  { code: 'K.G.3', difficulty: 2, order: 3, name: 'Name shapes in the real world' },
  { code: 'K.G.3', difficulty: 3, order: 4, name: 'Above, below, beside, in front of, behind, next to' },

  // ── K.G.4 — Name 3D shapes ─────────────────────────────────
  { code: 'K.G.4', difficulty: 1, order: 1, name: 'Identify a cube' },
  { code: 'K.G.4', difficulty: 1, order: 2, name: 'Identify a sphere' },
  { code: 'K.G.4', difficulty: 1, order: 3, name: 'Identify a cone' },
  { code: 'K.G.4', difficulty: 1, order: 4, name: 'Identify a cylinder' },
  { code: 'K.G.4', difficulty: 2, order: 5, name: 'Identify a rectangular prism' },
  { code: 'K.G.4', difficulty: 2, order: 6, name: 'Identify a pyramid' },
  { code: 'K.G.4', difficulty: 3, order: 7, name: 'Name the solid shape — mixed' },

  // ── K.G.5 — Describe 3D shapes ─────────────────────────────
  { code: 'K.G.5', difficulty: 1, order: 1, name: 'Flat vs. curved surfaces' },
  { code: 'K.G.5', difficulty: 2, order: 2, name: 'Solid shapes that roll, slide, or stack' },
  { code: 'K.G.5', difficulty: 3, order: 3, name: 'Faces, edges, vertices of a solid' },

  // ── K.G.6 — 2D vs 3D ───────────────────────────────────────
  { code: 'K.G.6', difficulty: 1, order: 1, name: 'Flat (2D) vs. solid (3D)' },
  { code: 'K.G.6', difficulty: 2, order: 2, name: 'Sort shapes — 2D or 3D' },
  { code: 'K.G.6', difficulty: 3, order: 3, name: 'Match solid shapes to 2D faces' },

  // ── K.G.7 — Compare shapes ─────────────────────────────────
  { code: 'K.G.7', difficulty: 1, order: 1, name: 'Same or different number of sides' },
  { code: 'K.G.7', difficulty: 2, order: 2, name: 'Same or different size' },
  { code: 'K.G.7', difficulty: 3, order: 3, name: 'Alike and different — two shapes' },

  // ── K.G.8 — Model shapes ───────────────────────────────────
  { code: 'K.G.8', difficulty: 1, order: 1, name: 'Draw a circle and a square' },
  { code: 'K.G.8', difficulty: 2, order: 2, name: 'Draw a triangle and rectangle' },
  { code: 'K.G.8', difficulty: 3, order: 3, name: 'Draw 2D shapes given the attribute description' },

  // ── K.G.9 — Compose shapes ─────────────────────────────────
  { code: 'K.G.9', difficulty: 1, order: 1, name: 'Two triangles → rectangle' },
  { code: 'K.G.9', difficulty: 2, order: 2, name: 'Four squares → larger square' },
  { code: 'K.G.9', difficulty: 2, order: 3, name: 'Shape puzzles — fill the outline' },
  { code: 'K.G.9', difficulty: 3, order: 4, name: 'Identify the shapes used to make a larger shape' },

  // ── K.G.10 — Partition shapes ──────────────────────────────
  { code: 'K.G.10', difficulty: 1, order: 1, name: 'Equal vs. unequal parts' },
  { code: 'K.G.10', difficulty: 2, order: 2, name: 'Two equal parts (halves) — circle' },
  { code: 'K.G.10', difficulty: 2, order: 3, name: 'Two equal parts (halves) — rectangle' },
  { code: 'K.G.10', difficulty: 3, order: 4, name: 'Four equal parts (fourths) — intro' },

  // ═══════════════════════════════════════════════════════════
  // 1ST GRADE SUB-SKILLS
  // ═══════════════════════════════════════════════════════════

  // ── 1.OA.1a — Add within 20 models ─────────────────────────
  { code: '1.OA.1a', difficulty: 1, order: 1, name: 'Add with pictures — sums to 12' },
  { code: '1.OA.1a', difficulty: 2, order: 2, name: 'Add with pictures — sums to 15' },
  { code: '1.OA.1a', difficulty: 2, order: 3, name: 'Add with cubes — sums to 20' },
  { code: '1.OA.1a', difficulty: 2, order: 4, name: 'Add on ten frames — sums to 20' },
  { code: '1.OA.1a', difficulty: 3, order: 5, name: 'Add on number lines — sums to 20' },
  { code: '1.OA.1a', difficulty: 3, order: 6, name: 'Add with pictures — sums to 20' },

  // ── 1.OA.1b — Addition word problems within 20 ─────────────
  { code: '1.OA.1b', difficulty: 1, order: 1, name: 'Put together word problems — within 20' },
  { code: '1.OA.1b', difficulty: 2, order: 2, name: 'Add to word problems — within 20' },
  { code: '1.OA.1b', difficulty: 2, order: 3, name: 'Compare word problems — more than' },
  { code: '1.OA.1b', difficulty: 3, order: 4, name: 'Write addition sentences for word problems — to 20' },
  { code: '1.OA.1b', difficulty: 3, order: 5, name: 'Model and solve word problems — to 20' },

  // ── 1.OA.2 — Three addends ──────────────────────────────────
  { code: '1.OA.2', difficulty: 1, order: 1, name: 'Add three numbers — cubes and pictures' },
  { code: '1.OA.2', difficulty: 2, order: 2, name: 'Add three one-digit numbers' },
  { code: '1.OA.2', difficulty: 3, order: 3, name: 'Add three numbers — word problems' },

  // ── 1.OA.3a — Subtract within 20 models ────────────────────
  { code: '1.OA.3a', difficulty: 1, order: 1, name: 'Subtract with pictures — within 20' },
  { code: '1.OA.3a', difficulty: 2, order: 2, name: 'Subtract with cubes — within 20' },
  { code: '1.OA.3a', difficulty: 2, order: 3, name: 'Subtract on ten frames — within 20' },
  { code: '1.OA.3a', difficulty: 3, order: 4, name: 'Subtract on number lines — within 20' },

  // ── 1.OA.3b — Subtraction word problems within 20 ──────────
  { code: '1.OA.3b', difficulty: 1, order: 1, name: 'Take from word problems — within 20' },
  { code: '1.OA.3b', difficulty: 2, order: 2, name: 'Take apart word problems — within 20' },
  { code: '1.OA.3b', difficulty: 2, order: 3, name: 'Compare word problems — fewer than / how many more' },
  { code: '1.OA.3b', difficulty: 3, order: 4, name: 'Write subtraction sentences for word problems — to 20' },
  { code: '1.OA.3b', difficulty: 3, order: 5, name: 'Model and solve subtraction word problems — to 20' },

  // ── 1.OA.4 — Unknown addend ─────────────────────────────────
  { code: '1.OA.4', difficulty: 1, order: 1, name: 'Find the missing addend — to 10' },
  { code: '1.OA.4', difficulty: 2, order: 2, name: 'Find the missing addend — to 20' },
  { code: '1.OA.4', difficulty: 3, order: 3, name: 'Relate subtraction to missing addend problems' },

  // ── 1.OA.5 — Commutative property ──────────────────────────
  { code: '1.OA.5', difficulty: 1, order: 1, name: 'Add in any order — within 10' },
  { code: '1.OA.5', difficulty: 2, order: 2, name: 'Turn-around facts within 10' },
  { code: '1.OA.5', difficulty: 3, order: 3, name: 'Turn-around facts within 20' },

  // ── 1.OA.6 — Associative property ──────────────────────────
  { code: '1.OA.6', difficulty: 1, order: 1, name: 'Add three numbers — change grouping, same sum' },
  { code: '1.OA.6', difficulty: 2, order: 2, name: 'Find the easier grouping to add three numbers' },
  { code: '1.OA.6', difficulty: 3, order: 3, name: 'Add three numbers — choose the best strategy' },

  // ── 1.OA.7 — Fact families ──────────────────────────────────
  { code: '1.OA.7', difficulty: 1, order: 1, name: 'Fact families within 5' },
  { code: '1.OA.7', difficulty: 2, order: 2, name: 'Fact families within 10' },
  { code: '1.OA.7', difficulty: 2, order: 3, name: 'Write all four facts in a fact family' },
  { code: '1.OA.7', difficulty: 3, order: 4, name: 'Fact families within 20' },
  { code: '1.OA.7', difficulty: 3, order: 5, name: 'Identify the related fact' },

  // ── 1.OA.8 — Counting on and back ──────────────────────────
  { code: '1.OA.8', difficulty: 1, order: 1, name: 'Count on from the larger number — within 10' },
  { code: '1.OA.8', difficulty: 2, order: 2, name: 'Count on to add — within 20' },
  { code: '1.OA.8', difficulty: 2, order: 3, name: 'Count back to subtract — within 10' },
  { code: '1.OA.8', difficulty: 3, order: 4, name: 'Count back to subtract — within 20' },
  { code: '1.OA.8', difficulty: 3, order: 5, name: 'Count on using a number line' },

  // ── 1.OA.9 — Make a ten ─────────────────────────────────────
  { code: '1.OA.9', difficulty: 1, order: 1, name: 'Make ten — with ten frames' },
  { code: '1.OA.9', difficulty: 2, order: 2, name: 'Make ten — to add within 20' },
  { code: '1.OA.9', difficulty: 2, order: 3, name: 'Make ten — with number bonds' },
  { code: '1.OA.9', difficulty: 3, order: 4, name: 'Add using make-ten strategy — word problems' },

  // ── 1.OA.10 — Doubles and near-doubles ─────────────────────
  { code: '1.OA.10', difficulty: 1, order: 1, name: 'Add doubles (1+1 through 5+5)' },
  { code: '1.OA.10', difficulty: 1, order: 2, name: 'Doubles facts — visual models' },
  { code: '1.OA.10', difficulty: 2, order: 3, name: 'Add doubles (6+6 through 10+10)' },
  { code: '1.OA.10', difficulty: 2, order: 4, name: 'Near doubles (doubles + 1)' },
  { code: '1.OA.10', difficulty: 3, order: 5, name: 'Near doubles — word problems' },

  // ── 1.OA.11 — Decompose to add or subtract ─────────────────
  { code: '1.OA.11', difficulty: 1, order: 1, name: 'Number bonds — within 10' },
  { code: '1.OA.11', difficulty: 2, order: 2, name: 'Decompose a number to add — within 20' },
  { code: '1.OA.11', difficulty: 2, order: 3, name: 'Number bonds — within 20' },
  { code: '1.OA.11', difficulty: 3, order: 4, name: 'Decompose a number to subtract — within 20' },

  // ── 1.OA.12 — Use a known fact ──────────────────────────────
  { code: '1.OA.12', difficulty: 1, order: 1, name: 'Use a doubles fact to add' },
  { code: '1.OA.12', difficulty: 2, order: 2, name: 'Use a make-ten fact to subtract' },
  { code: '1.OA.12', difficulty: 3, order: 3, name: 'Relate addition and subtraction facts' },

  // ── 1.OA.13 — Fluency within 10 ────────────────────────────
  { code: '1.OA.13', difficulty: 1, order: 1, name: 'Add — sums to 10 (with support)' },
  { code: '1.OA.13', difficulty: 2, order: 2, name: 'Add — sums to 10 (fluency)' },
  { code: '1.OA.13', difficulty: 2, order: 3, name: 'Subtract — within 10 (fluency)' },
  { code: '1.OA.13', difficulty: 3, order: 4, name: 'Mixed addition and subtraction — within 10' },

  // ── 1.OA.14 — Add and subtract within 20 ───────────────────
  { code: '1.OA.14', difficulty: 1, order: 1, name: 'Add — sums to 20 (with strategies)' },
  { code: '1.OA.14', difficulty: 2, order: 2, name: 'Subtract — within 20 (with strategies)' },
  { code: '1.OA.14', difficulty: 2, order: 3, name: 'Ways to make a number up to 20' },
  { code: '1.OA.14', difficulty: 3, order: 4, name: 'Mixed — add and subtract within 20' },

  // ── 1.OA.15 — Equal sign ────────────────────────────────────
  { code: '1.OA.15', difficulty: 1, order: 1, name: 'Is the equation true or false?' },
  { code: '1.OA.15', difficulty: 2, order: 2, name: 'Which equation is true?' },
  { code: '1.OA.15', difficulty: 3, order: 3, name: 'Balance both sides of an equation' },

  // ── 1.OA.16 — Unknown in addition ──────────────────────────
  { code: '1.OA.16', difficulty: 1, order: 1, name: '? + b = c — missing addend on left' },
  { code: '1.OA.16', difficulty: 2, order: 2, name: 'a + ? = c — missing addend on right' },
  { code: '1.OA.16', difficulty: 3, order: 3, name: 'a + b = ? — missing sum' },

  // ── 1.OA.17 — Unknown in subtraction ───────────────────────
  { code: '1.OA.17', difficulty: 1, order: 1, name: 'a – ? = c — missing subtrahend' },
  { code: '1.OA.17', difficulty: 2, order: 2, name: '? – b = c — missing minuend' },
  { code: '1.OA.17', difficulty: 3, order: 3, name: 'a – b = ? — missing difference' },

  // ── 1.OA.18 — Mixed unknowns ────────────────────────────────
  { code: '1.OA.18', difficulty: 1, order: 1, name: 'Complete addition sentences — find the missing number' },
  { code: '1.OA.18', difficulty: 2, order: 2, name: 'Complete subtraction sentences — find the missing number' },
  { code: '1.OA.18', difficulty: 3, order: 3, name: 'Find the missing number — mixed add and subtract' },

  // ── 1.NBT.1a — Count to 120 ────────────────────────────────
  { code: '1.NBT.1a', difficulty: 1, order: 1, name: 'Count to 50 starting from any number' },
  { code: '1.NBT.1a', difficulty: 2, order: 2, name: 'Count to 100 starting from any number' },
  { code: '1.NBT.1a', difficulty: 2, order: 3, name: 'Count on a hundred chart up to 100' },
  { code: '1.NBT.1a', difficulty: 3, order: 4, name: 'Count to 120 starting from any number' },
  { code: '1.NBT.1a', difficulty: 3, order: 5, name: 'Fill in missing numbers on a hundred chart' },

  // ── 1.NBT.1b — Read and write to 120 ───────────────────────
  { code: '1.NBT.1b', difficulty: 1, order: 1, name: 'Read numerals 21–50' },
  { code: '1.NBT.1b', difficulty: 1, order: 2, name: 'Write numerals 21–50' },
  { code: '1.NBT.1b', difficulty: 2, order: 3, name: 'Read numerals 51–100' },
  { code: '1.NBT.1b', difficulty: 2, order: 4, name: 'Write numerals 51–100' },
  { code: '1.NBT.1b', difficulty: 3, order: 5, name: 'Read numerals 101–120' },
  { code: '1.NBT.1b', difficulty: 3, order: 6, name: 'Write numerals 101–120' },

  // ── 1.NBT.1c — Skip counting ────────────────────────────────
  { code: '1.NBT.1c', difficulty: 1, order: 1, name: 'Skip count by 2s to 20' },
  { code: '1.NBT.1c', difficulty: 1, order: 2, name: 'Skip count by 5s to 50' },
  { code: '1.NBT.1c', difficulty: 2, order: 3, name: 'Skip count by 10s to 120' },
  { code: '1.NBT.1c', difficulty: 2, order: 4, name: 'Skip count by 5s to 100' },
  { code: '1.NBT.1c', difficulty: 2, order: 5, name: 'Skip count by 2s, 5s, 10s — on a number line' },
  { code: '1.NBT.1c', difficulty: 3, order: 6, name: 'Skip count — complete a pattern' },

  // ── 1.NBT.1d — Count backward ──────────────────────────────
  { code: '1.NBT.1d', difficulty: 1, order: 1, name: 'Count backward from 10' },
  { code: '1.NBT.1d', difficulty: 2, order: 2, name: 'Count backward from 20' },
  { code: '1.NBT.1d', difficulty: 2, order: 3, name: 'Count backward from any number up to 50' },
  { code: '1.NBT.1d', difficulty: 3, order: 4, name: 'Count backward by 10s' },

  // ── 1.NBT.2a — Tens and ones structure ─────────────────────
  { code: '1.NBT.2a', difficulty: 1, order: 1, name: '10 as a bundle of ten ones' },
  { code: '1.NBT.2a', difficulty: 1, order: 2, name: 'Place value models — tens and ones to 20' },
  { code: '1.NBT.2a', difficulty: 2, order: 3, name: 'Decade numbers as multiples of ten' },
  { code: '1.NBT.2a', difficulty: 2, order: 4, name: 'Place value models — tens and ones to 50' },
  { code: '1.NBT.2a', difficulty: 2, order: 5, name: 'Count tens and ones' },
  { code: '1.NBT.2a', difficulty: 3, order: 6, name: 'Place value models — tens and ones to 99' },

  // ── 1.NBT.2b — Identify tens and ones ──────────────────────
  { code: '1.NBT.2b', difficulty: 1, order: 1, name: 'Identify the tens digit' },
  { code: '1.NBT.2b', difficulty: 1, order: 2, name: 'Identify the ones digit' },
  { code: '1.NBT.2b', difficulty: 2, order: 3, name: 'What number does the model show?' },
  { code: '1.NBT.2b', difficulty: 3, order: 4, name: 'Regroup ones into tens' },
  { code: '1.NBT.2b', difficulty: 3, order: 5, name: 'Write tens and ones for a number' },

  // ── 1.NBT.2c — Represent with models ───────────────────────
  { code: '1.NBT.2c', difficulty: 1, order: 1, name: 'Show a number with base-ten blocks' },
  { code: '1.NBT.2c', difficulty: 2, order: 2, name: 'Match number to model' },
  { code: '1.NBT.2c', difficulty: 3, order: 3, name: 'Draw tens rods and ones cubes' },

  // ── 1.NBT.3 — Compare two-digit numbers ────────────────────
  { code: '1.NBT.3', difficulty: 1, order: 1, name: 'Compare two-digit numbers — same tens digit' },
  { code: '1.NBT.3', difficulty: 2, order: 2, name: 'Compare two-digit numbers — different tens digits' },
  { code: '1.NBT.3', difficulty: 2, order: 3, name: 'Use >, =, < symbols' },
  { code: '1.NBT.3', difficulty: 3, order: 4, name: 'Which number is greatest / least?' },
  { code: '1.NBT.3', difficulty: 3, order: 5, name: 'Order three two-digit numbers' },

  // ── 1.NBT.4a — Add 2-digit + 1-digit ───────────────────────
  { code: '1.NBT.4a', difficulty: 1, order: 1, name: 'Add 1-digit to 2-digit — no regrouping — models' },
  { code: '1.NBT.4a', difficulty: 2, order: 2, name: 'Add 1-digit to 2-digit — no regrouping — abstract' },
  { code: '1.NBT.4a', difficulty: 2, order: 3, name: 'Add on a number line — two-digit + one-digit' },
  { code: '1.NBT.4a', difficulty: 3, order: 4, name: 'Add 1-digit to 2-digit — with regrouping' },
  { code: '1.NBT.4a', difficulty: 3, order: 5, name: 'Word problems — two-digit + one-digit' },

  // ── 1.NBT.4b — Add 2-digit + multiple of 10 ────────────────
  { code: '1.NBT.4b', difficulty: 1, order: 1, name: 'Add multiples of 10 — models' },
  { code: '1.NBT.4b', difficulty: 2, order: 2, name: 'Add multiples of 10 — abstract' },
  { code: '1.NBT.4b', difficulty: 2, order: 3, name: 'Two-digit + multiple of 10 — number line' },
  { code: '1.NBT.4b', difficulty: 3, order: 4, name: 'Word problems — add tens' },

  // ── 1.NBT.5 — 10 more and 10 less ──────────────────────────
  { code: '1.NBT.5', difficulty: 1, order: 1, name: '10 more than a number — to 50' },
  { code: '1.NBT.5', difficulty: 1, order: 2, name: '10 less than a number — to 50' },
  { code: '1.NBT.5', difficulty: 2, order: 3, name: '10 more than a number — to 100' },
  { code: '1.NBT.5', difficulty: 2, order: 4, name: '10 less than a number — to 100' },
  { code: '1.NBT.5', difficulty: 2, order: 5, name: '10 more / less on a hundred chart' },
  { code: '1.NBT.5', difficulty: 3, order: 6, name: '10 more and 10 less — mixed' },

  // ── 1.NBT.6 — Subtract multiples of 10 ─────────────────────
  { code: '1.NBT.6', difficulty: 1, order: 1, name: 'Subtract tens — models' },
  { code: '1.NBT.6', difficulty: 2, order: 2, name: 'Subtract tens — abstract' },
  { code: '1.NBT.6', difficulty: 2, order: 3, name: 'Subtract tens on a hundred chart' },
  { code: '1.NBT.6', difficulty: 3, order: 4, name: 'Subtract tens — word problems' },

  // ── 1.NBT.7 — Add/subtract within 100 extension ────────────
  { code: '1.NBT.7', difficulty: 2, order: 1, name: 'Add two-digit numbers — no regrouping' },
  { code: '1.NBT.7', difficulty: 3, order: 2, name: 'Add two-digit numbers — with regrouping' },
  { code: '1.NBT.7', difficulty: 3, order: 3, name: 'Subtract two-digit numbers — no regrouping' },
  { code: '1.NBT.7', difficulty: 3, order: 4, name: 'Add and subtract within 100 — word problems' },

  // ── 1.MD.1 — Order by length ────────────────────────────────
  { code: '1.MD.1', difficulty: 1, order: 1, name: 'Order two objects by length' },
  { code: '1.MD.1', difficulty: 2, order: 2, name: 'Order three objects by length' },
  { code: '1.MD.1', difficulty: 3, order: 3, name: 'Compare lengths using a third object' },

  // ── 1.MD.2a — Measure with non-standard units ──────────────
  { code: '1.MD.2a', difficulty: 1, order: 1, name: 'Measure with cubes — end to end' },
  { code: '1.MD.2a', difficulty: 2, order: 2, name: 'Measure with paper clips' },
  { code: '1.MD.2a', difficulty: 2, order: 3, name: 'Measure with tiles' },
  { code: '1.MD.2a', difficulty: 3, order: 4, name: 'Measure the same object with two different-sized units' },

  // ── 1.MD.2b — Express and compare lengths ──────────────────
  { code: '1.MD.2b', difficulty: 1, order: 1, name: 'Record length as a number of units' },
  { code: '1.MD.2b', difficulty: 2, order: 2, name: 'Compare lengths in units: longer / shorter' },
  { code: '1.MD.2b', difficulty: 3, order: 3, name: 'Estimate length in non-standard units' },

  // ── 1.MD.2c — Inch ruler ────────────────────────────────────
  { code: '1.MD.2c', difficulty: 1, order: 1, name: 'Introduce the inch' },
  { code: '1.MD.2c', difficulty: 2, order: 2, name: 'Measure to the nearest inch' },
  { code: '1.MD.2c', difficulty: 3, order: 3, name: 'Measure using an inch ruler' },

  // ── 1.MD.3a — Time to the hour ─────────────────────────────
  { code: '1.MD.3a', difficulty: 1, order: 1, name: 'Read analog clocks — to the hour' },
  { code: '1.MD.3a', difficulty: 2, order: 2, name: 'Read digital clocks — to the hour' },
  { code: '1.MD.3a', difficulty: 2, order: 3, name: 'Draw hands on a clock — to the hour' },
  { code: '1.MD.3a', difficulty: 3, order: 4, name: 'Match analog to digital — to the hour' },

  // ── 1.MD.3b — Time to the half-hour ────────────────────────
  { code: '1.MD.3b', difficulty: 1, order: 1, name: 'Read analog clocks — to the half-hour' },
  { code: '1.MD.3b', difficulty: 2, order: 2, name: 'Read digital clocks — to the half-hour' },
  { code: '1.MD.3b', difficulty: 2, order: 3, name: 'Draw hands on a clock — to the half-hour' },
  { code: '1.MD.3b', difficulty: 3, order: 4, name: 'Match analog and digital — mixed hour and half-hour' },

  // ── 1.MD.3c — AM/PM and daily events ───────────────────────
  { code: '1.MD.3c', difficulty: 1, order: 1, name: 'Match activities to time of day' },
  { code: '1.MD.3c', difficulty: 2, order: 2, name: 'AM or PM?' },
  { code: '1.MD.3c', difficulty: 3, order: 3, name: 'Order events by time' },

  // ── 1.MD.4a — Organize data ─────────────────────────────────
  { code: '1.MD.4a', difficulty: 1, order: 1, name: 'Sort objects into two categories and count' },
  { code: '1.MD.4a', difficulty: 2, order: 2, name: 'Sort objects into three categories and count' },
  { code: '1.MD.4a', difficulty: 3, order: 3, name: 'Tally charts — up to three categories' },

  // ── 1.MD.4b — Picture graphs ────────────────────────────────
  { code: '1.MD.4b', difficulty: 1, order: 1, name: 'Read a picture graph — how many in each category?' },
  { code: '1.MD.4b', difficulty: 2, order: 2, name: 'Which category has the most / fewest?' },
  { code: '1.MD.4b', difficulty: 2, order: 3, name: 'How many more / fewer? — picture graph' },
  { code: '1.MD.4b', difficulty: 3, order: 4, name: 'Create a simple picture graph' },

  // ── 1.MD.4c — Bar graphs ────────────────────────────────────
  { code: '1.MD.4c', difficulty: 1, order: 1, name: 'Read a horizontal bar graph' },
  { code: '1.MD.4c', difficulty: 1, order: 2, name: 'Read a vertical bar graph' },
  { code: '1.MD.4c', difficulty: 2, order: 3, name: 'Interpret bar graph — totals per category' },
  { code: '1.MD.4c', difficulty: 2, order: 4, name: 'Interpret bar graph — comparisons' },
  { code: '1.MD.4c', difficulty: 3, order: 5, name: 'Create a bar graph from data' },

  // ── 1.MD.5a — Identify coins ────────────────────────────────
  { code: '1.MD.5a', difficulty: 1, order: 1, name: 'Penny = 1¢ — identify and name' },
  { code: '1.MD.5a', difficulty: 1, order: 2, name: 'Nickel = 5¢ — identify and name' },
  { code: '1.MD.5a', difficulty: 1, order: 3, name: 'Dime = 10¢ — identify and name' },
  { code: '1.MD.5a', difficulty: 2, order: 4, name: 'Quarter = 25¢ — identify and name' },
  { code: '1.MD.5a', difficulty: 3, order: 5, name: 'Identify and name all four coins — mixed' },

  // ── 1.MD.5b — Count coins ───────────────────────────────────
  { code: '1.MD.5b', difficulty: 1, order: 1, name: 'Count pennies up to 10¢' },
  { code: '1.MD.5b', difficulty: 1, order: 2, name: 'Count nickels up to 25¢' },
  { code: '1.MD.5b', difficulty: 2, order: 3, name: 'Count dimes up to $1.00' },
  { code: '1.MD.5b', difficulty: 2, order: 4, name: 'Count mixed pennies and nickels' },
  { code: '1.MD.5b', difficulty: 2, order: 5, name: 'Count mixed pennies, nickels, and dimes' },
  { code: '1.MD.5b', difficulty: 3, order: 6, name: 'Do you have enough money?' },
  { code: '1.MD.5b', difficulty: 3, order: 7, name: 'Purchases — make exact change' },

  // ── 1.G.1a — Defining attributes ────────────────────────────
  { code: '1.G.1a', difficulty: 1, order: 1, name: 'Triangles always have 3 sides — color does not matter' },
  { code: '1.G.1a', difficulty: 2, order: 2, name: 'Rectangles always have 4 right angles' },
  { code: '1.G.1a', difficulty: 2, order: 3, name: 'Which shapes are triangles? — focus on sides' },
  { code: '1.G.1a', difficulty: 3, order: 4, name: 'Sort shapes by defining attribute' },

  // ── 1.G.1b — Build and draw shapes ─────────────────────────
  { code: '1.G.1b', difficulty: 1, order: 1, name: 'Draw a triangle with exactly 3 sides' },
  { code: '1.G.1b', difficulty: 2, order: 2, name: 'Draw a rectangle with 4 right angles' },
  { code: '1.G.1b', difficulty: 2, order: 3, name: 'True or false — shape statements' },
  { code: '1.G.1b', difficulty: 3, order: 4, name: 'Build shapes with straws or sticks' },

  // ── 1.G.2a — Compose 2D shapes ─────────────────────────────
  { code: '1.G.2a', difficulty: 1, order: 1, name: 'Two triangles → rectangle' },
  { code: '1.G.2a', difficulty: 2, order: 2, name: 'Two triangles → parallelogram' },
  { code: '1.G.2a', difficulty: 2, order: 3, name: 'Combine shapes to make a hexagon' },
  { code: '1.G.2a', difficulty: 3, order: 4, name: 'Shape puzzles — tangram style' },
  { code: '1.G.2a', difficulty: 3, order: 5, name: 'Identify the smaller shapes inside a larger shape' },

  // ── 1.G.2b — Compose 3D shapes ─────────────────────────────
  { code: '1.G.2b', difficulty: 1, order: 1, name: 'Stack cubes to make a rectangular prism' },
  { code: '1.G.2b', difficulty: 2, order: 2, name: 'Combine cylinders' },
  { code: '1.G.2b', difficulty: 3, order: 3, name: 'Name 3D shapes used to build a structure' },

  // ── 1.G.3a — Partition into halves and fourths ──────────────
  { code: '1.G.3a', difficulty: 1, order: 1, name: 'Equal parts vs. unequal parts' },
  { code: '1.G.3a', difficulty: 1, order: 2, name: 'Two equal parts — circles' },
  { code: '1.G.3a', difficulty: 1, order: 3, name: 'Two equal parts — rectangles' },
  { code: '1.G.3a', difficulty: 2, order: 4, name: 'Four equal parts — circles' },
  { code: '1.G.3a', difficulty: 2, order: 5, name: 'Four equal parts — rectangles' },
  { code: '1.G.3a', difficulty: 3, order: 6, name: 'Identify halves and fourths in a shape' },

  // ── 1.G.3b — Fraction vocabulary ────────────────────────────
  { code: '1.G.3b', difficulty: 1, order: 1, name: 'Half of, one-half, 1/2' },
  { code: '1.G.3b', difficulty: 1, order: 2, name: 'One quarter, one-fourth, 1/4' },
  { code: '1.G.3b', difficulty: 2, order: 3, name: 'Two halves make a whole' },
  { code: '1.G.3b', difficulty: 2, order: 4, name: 'Four fourths make a whole' },
  { code: '1.G.3b', difficulty: 3, order: 5, name: 'Which is larger — a half or a fourth of the same shape?' },
];

// ── Seed function ──────────────────────────────────────────────
async function seed() {
  console.log(`\n🍈 ShinyMelon Sub-skills Seeder`);
  console.log(`   Total sub-skills to insert: ${subSkills.length}\n`);

  // 1. Fetch all skill nodes so we can map code → id
  const { data: nodes, error: nodesError } = await supabase
    .from('skill_nodes')
    .select('id, code');

  if (nodesError) {
    console.error('❌ Failed to fetch skill nodes:', nodesError.message);
    process.exit(1);
  }

  const nodeMap = {};
  nodes.forEach(n => { nodeMap[n.code] = n.id; });
  console.log(`✅ Loaded ${nodes.length} skill nodes from database\n`);

  // 2. Check for any codes in subSkills that don't exist in DB
  const missingCodes = [...new Set(subSkills.map(s => s.code))]
    .filter(code => !nodeMap[code]);

  if (missingCodes.length > 0) {
    console.warn(`⚠️  These skill codes were not found in the database:`);
    missingCodes.forEach(c => console.warn(`   - ${c}`));
    console.warn('');
  }

  // 3. Build insert rows
  const rows = subSkills
    .filter(s => nodeMap[s.code])
    .map(s => ({
      skill_node_id: nodeMap[s.code],
      name: s.name,
      difficulty: s.difficulty,
      sort_order: s.order,
    }));

  console.log(`📦 Preparing to insert ${rows.length} sub-skills...`);

  // 4. Insert in batches of 50
  const BATCH = 50;
  let inserted = 0;

  for (let i = 0; i < rows.length; i += BATCH) {
    const batch = rows.slice(i, i + BATCH);
    const { error } = await supabase.from('sub_skills').insert(batch);
    if (error) {
      console.error(`❌ Batch ${Math.floor(i/BATCH)+1} failed:`, error.message);
      process.exit(1);
    }
    inserted += batch.length;
    console.log(`   ✓ Inserted ${inserted}/${rows.length}`);
  }

  console.log(`\n✅ Done! ${inserted} sub-skills seeded successfully.`);
  console.log(`\nBreakdown by grade:`);

  const kCodes = Object.keys(nodeMap).filter(c => c.startsWith('K.'));
  const oneCodes = Object.keys(nodeMap).filter(c => c.startsWith('1.'));
  const kCount = subSkills.filter(s => kCodes.includes(s.code)).length;
  const oneCount = subSkills.filter(s => oneCodes.includes(s.code)).length;
  console.log(`   Kindergarten: ${kCount} sub-skills`);
  console.log(`   1st Grade:    ${oneCount} sub-skills\n`);
}

seed();
