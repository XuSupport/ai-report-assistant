// backend/index.js
const { spawn } = require('child_process');

app.post('/api/query', (req, res) => {
  const { query } = req.body;

  const python = spawn('python', ['ai/predict.py', query]);

  python.stdout.on('data', (data) => {
    res.json({ reply: data.toString() });
  });

  python.stderr.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  python.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
});
