import fs from 'node:fs';
import path from 'node:path';

const readme = path.join(process.cwd(), 'README.md');
if (!fs.existsSync(readme)) {
  console.error('Missing README.md');
  process.exit(1);
}

const text = fs.readFileSync(readme, 'utf8');
const requiredLinks = [
  'https://github.com/0xChrisSKR/trace-ai-platform-showcase',
  'https://github.com/0xChrisSKR/immune-rpc-gate',
  'https://github.com/0xChrisSKR/cchain-system-showcase',
  'https://github.com/0xChrisSKR/worldpeace-dao-showcase',
  'https://github.com/TRACE-CChain-Labs/trace-prooffeed-solana-agent'
];

let failed = false;
for (const link of requiredLinks) {
  if (!text.includes(link)) {
    console.error(`Missing portfolio link: ${link}`);
    failed = true;
  }
}

const forbidden = [/C:\\/i, /C:\//i, /BEGIN (RSA|OPENSSH|PRIVATE) KEY/i, /api[_-]?key\s*[:=]/i, /secret\s*[:=]/i];
for (const pattern of forbidden) {
  if (pattern.test(text)) {
    console.error(`Forbidden pattern in README: ${pattern}`);
    failed = true;
  }
}

if (failed) process.exit(1);
console.log('Profile README validation passed.');
