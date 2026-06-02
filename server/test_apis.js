const http = require('http');
const fs = require('fs');
const path = require('path');

console.log('\n🔍 AI Resume Analyzer — API Test Suite (Supabase Edition)\n');
console.log('='.repeat(55));

// ─── TEST 1: Base API ───────────────────────────────
function test1() {
  return new Promise((resolve) => {
    const req = http.request('http://localhost:5000/', (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        const pass = res.statusCode === 200 && data.includes('running');
        console.log(`\nTEST 1 [GET /] Base API Health:`);
        console.log(`  Status : ${res.statusCode}`);
        console.log(`  Result : ${pass ? '✅ PASS' : '❌ FAIL'}`);
        console.log(`  Body   : ${data.trim()}`);
        resolve(pass);
      });
    });
    req.on('error', e => {
      console.log(`\nTEST 1 [GET /] Base API Health: ❌ FAIL — ${e.message}`);
      resolve(false);
    });
    req.end();
  });
}

// ─── TEST 2: Upload route exists ───────────────────
function test2() {
  return new Promise((resolve) => {
    const boundary = 'TestBoundary999';
    const fileContent = Buffer.from('%PDF-1.4 fake pdf content');
    const header = Buffer.from(
      `--${boundary}\r\nContent-Disposition: form-data; name="resume"; filename="test.pdf"\r\nContent-Type: application/pdf\r\n\r\n`
    );
    const footer = Buffer.from(`\r\n--${boundary}--\r\n`);
    const body = Buffer.concat([header, fileContent, footer]);

    const options = {
      hostname: 'localhost', port: 5000,
      path: '/api/upload-resume',
      method: 'POST',
      headers: {
        'Content-Type': `multipart/form-data; boundary=${boundary}`,
        'Content-Length': body.length
      }
    };

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        const routeReachable = [200, 400, 500].includes(res.statusCode);
        console.log(`\nTEST 2 [POST /api/upload-resume] Route Reachable:`);
        console.log(`  Status : ${res.statusCode}`);
        console.log(`  Result : ${routeReachable ? '✅ PASS' : '❌ FAIL'}`);
        resolve(routeReachable);
      });
    });
    req.on('error', e => {
      console.log(`\nTEST 2 [POST /api/upload-resume]: ❌ FAIL — ${e.message}`);
      resolve(false);
    });
    req.write(body);
    req.end();
  });
}

// ─── TEST 3: Groq API via verify-candidate ─────────
function test3() {
  return new Promise((resolve) => {
    const body = JSON.stringify({
      name: 'Ashish Jha',
      github: 'https://github.com/ashishjha1304'
    });
    const options = {
      hostname: 'localhost', port: 5000,
      path: '/api/verify-candidate',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Content-Length': Buffer.byteLength(body)
      }
    };
    console.log('\nTEST 3 [POST /api/verify-candidate] Groq API:');
    console.log('  ⏳ Calling Groq... (may take 3-10s)');

    const req = http.request(options, (res) => {
      let data = '';
      res.on('data', d => data += d);
      res.on('end', () => {
        let parsed = {};
        try { parsed = JSON.parse(data); } catch(e) {}
        const pass = res.statusCode === 200 && parsed.result;
        console.log(`  Status : ${res.statusCode}`);
        console.log(`  Result : ${pass ? '✅ PASS' : '❌ FAIL'}`);
        if (pass) {
          console.log(`  Preview: ${parsed.result.substring(0, 120)}...`);
        }
        resolve(pass);
      });
    });
    req.on('error', e => {
      console.log(`  Result : ❌ FAIL — ${e.message}`);
      resolve(false);
    });
    req.write(body);
    req.end();
  });
}

// ─── TEST 4: Supabase Connection ──────────────────
function test4() {
  return new Promise(async (resolve) => {
    console.log('\nTEST 4 [Supabase PostgreSQL] Connection:');
    console.log('  ⏳ Pinging Supabase resumes table...');
    
    try {
      const supabase = require('./config/supabase');
      const { data, error } = await supabase.from('resumes').select('id').limit(1);
      
      if (error) {
        console.log('  Result : ❌ FAIL');
        console.log('  Error  :', error.message);
        resolve(false);
      } else {
        console.log('  Result : ✅ PASS — Connected to Supabase!');
        resolve(true);
      }
    } catch (err) {
      console.log('  Result : ❌ FAIL');
      console.log('  Error  :', err.message);
      resolve(false);
    }
  });
}

// ─── TEST 5: Env Check ─────────────────────────────
function test5() {
  console.log('\nTEST 5 [Environment Variables] Audit:');
  const vars = ['SUPABASE_URL', 'SUPABASE_ANON_KEY', 'GROQ_API_KEY'];
  let allPass = true;
  vars.forEach(v => {
    const status = process.env[v] && !process.env[v].includes('your-') ? '✅ OK' : '❌ MISSING';
    console.log(`  ${v.padEnd(20)}: ${status}`);
    if (status === '❌ MISSING') allPass = false;
  });
  return allPass;
}

// ─── RUN ALL TESTS ──────────────────────────────────
async function runAll() {
  require('dotenv').config();

  const r5 = test5();
  const r1 = await test1();
  const r2 = await test2();
  const r3 = await test3();
  const r4 = await test4();

  console.log('\n' + '='.repeat(55));
  console.log('📊 FINAL RESULTS SUMMARY:');
  console.log('='.repeat(55));
  console.log(`  Env Configuration             : ${r5 ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  Base API (GET /)              : ${r1 ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  Upload Route Reachable        : ${r2 ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  Groq AI (verify-candidate)    : ${r3 ? '✅ PASS' : '❌ FAIL'}`);
  console.log(`  Supabase Connection           : ${r4 ? '✅ PASS' : '❌ FAIL'}`);
  console.log('='.repeat(55));

  if (!r4) {
    console.log('\n⚠️  Supabase FIX NEEDED:');
    console.log('   1. Check SUPABASE_URL & SUPABASE_ANON_KEY in .env');
    console.log('   2. Ensure "resumes" table exists (see README for SQL)');
  }
  
  process.exit(0);
}

runAll();
