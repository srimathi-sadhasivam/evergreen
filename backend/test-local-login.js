// Test local login API directly
const http = require('http');

const postData = JSON.stringify({
  email: 'admin@evergreen.com',
  password: 'admin123'
});

const options = {
  hostname: 'localhost',
  port: 5000,
  path: '/api/auth/login',
  method: 'POST',
  headers: {
    'Content-Type': 'application/json',
    'Content-Length': Buffer.byteLength(postData)
  }
};

console.log('🔍 Testing local login API...');
console.log('📤 Sending:', postData);

const req = http.request(options, (res) => {
  console.log(`📥 Status Code: ${res.statusCode}`);
  console.log(`📥 Headers:`, res.headers);
  
  let data = '';
  
  res.on('data', (chunk) => {
    data += chunk;
  });
  
  res.on('end', () => {
    console.log('📥 Response Body:', data);
    
    try {
      const response = JSON.parse(data);
      if (response.token) {
        console.log('✅ Login successful! Token received.');
      } else {
        console.log('❌ Login failed - no token in response');
      }
    } catch (e) {
      console.log('❌ Invalid JSON response');
    }
  });
});

req.on('error', (error) => {
  console.error('❌ Request Error:', error.message);
});

req.write(postData);
req.end();
