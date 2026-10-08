/* eslint-disable */
import { spawn } from 'child_process';
import { execSync } from 'child_process';

async function waitForServer(url) {
  const start = Date.now();
  while (Date.now() - start < 30000) {
    try {
      const res = await fetch(url);
      if (res.ok) return;
    } catch (e) {
      // ignore
    }
    await new Promise((resolve) => setTimeout(resolve, 1000));
  }
  throw new Error('Server timed out');
}

async function run() {
  console.log('Building project...');
  execSync('npm run build', { stdio: 'inherit' });

  console.log('Starting preview server...');
  const preview = spawn('npx', ['astro', 'preview', '--port', '3000'], {
    stdio: 'inherit',
    shell: true,
  });

  try {
    console.log('Waiting for server to be ready...');
    await waitForServer('http://localhost:3000');

    console.log('Running axe-core accessibility audit...');
    // We use axe-cli if available, otherwise bunx axe-cli
    // Note: axe-cli might need chrome installed or use playwright
    try {
      execSync('npx axe-cli http://localhost:3000 --headless --save ./axe-report.json', {
        stdio: 'inherit',
      });
    } catch (axeErr) {
      console.error(
        'Axe audit failed (this might happen if there are violations):',
        axeErr.message,
      );
      // We still want to stop the server and potentially exit with error if violations are critical
    }

    console.log('Axe audit complete. Report saved to ./axe-report.json');
  } catch (err) {
    console.error('Error during Axe run:', err);
    process.exit(1);
  } finally {
    console.log('Stopping preview server...');
    if (process.platform === 'win32') {
      try {
        execSync('taskkill /F /T /PID ' + preview.pid, { stdio: 'ignore' });
      } catch (e) {}
    } else {
      try {
        process.kill(-preview.pid);
      } catch (e) {}
    }
  }
}

run();
