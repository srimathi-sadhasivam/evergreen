// Reset admin user with new credentials
const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

const User = require('./models/User');

async function resetAdmin() {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Delete all existing admin users
    await User.deleteMany({ role: 'admin' });
    console.log('🗑️  Deleted existing admin users');
    
    // Create new admin with your preferred credentials
    const newAdmin = await User.create({
      name: 'Admin',
      email: 'admin@evergreen.com',
      password: 'admin123',
      role: 'admin'
    });
    
    console.log('✅ New admin user created!');
    console.log('\n📋 New Login Credentials:');
    console.log('   Email: admin@evergreen.com');
    console.log('   Password: admin123');
    console.log('   Role: admin');
    console.log('\n🎯 You can now login with these credentials!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
  }
}

resetAdmin();
