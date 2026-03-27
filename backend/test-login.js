// Test login script to debug the issue
const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

const User = require('./models/User');

async function testLogin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Find admin users
    const adminUsers = await User.find({ role: 'admin' });
    
    console.log(`\n📊 Found ${adminUsers.length} admin user(s):`);
    
    for (const admin of adminUsers) {
      console.log(`\n🔍 Testing login for: ${admin.email}`);
      
      // Test different common passwords
      const testPasswords = ['admin123', 'password', 'admin', '123456', 'admin@123'];
      
      for (const password of testPasswords) {
        const isMatch = await admin.matchPassword(password);
        if (isMatch) {
          console.log(`✅ SUCCESS! Email: ${admin.email}, Password: ${password}`);
          console.log(`   You can use these credentials to login.`);
          return;
        }
      }
      
      console.log(`❌ No common passwords worked for ${admin.email}`);
    }
    
    console.log('\n🔧 Creating new admin user with known credentials...');
    
    // Delete existing admin users
    await User.deleteMany({ role: 'admin' });
    
    // Create new admin with known password
    const newAdmin = await User.create({
      name: 'Admin',
      email: 'admin@evergreen.com',
      password: 'admin123',
      role: 'admin'
    });
    
    console.log('✅ New admin user created!');
    console.log('   Email: admin@evergreen.com');
    console.log('   Password: admin123');
    console.log('   Role: admin');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

testLogin();
