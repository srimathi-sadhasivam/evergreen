// Script to create an admin user
const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

// Import User model
const User = require('./models/User');

async function createAdminUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Check if admin already exists
    const existingAdmin = await User.findOne({ role: 'admin' });
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists:');
      console.log(`   Email: ${existingAdmin.email}`);
      console.log('   Use existing credentials to login.');
      return;
    }
    
    // Create admin user
    const adminData = {
      name: 'Admin',
      email: 'admin@evergreen.com',
      password: 'admin123',
      role: 'admin'
    };
    
    const admin = await User.create(adminData);
    
    console.log('✅ Admin user created successfully!');
    console.log('\n📋 Login Credentials:');
    console.log('   Email: admin@evergreen.com');
    console.log('   Password: admin123');
    console.log('   Role: admin');
    console.log('\n⚠️  Please change the password after first login!');
    
  } catch (error) {
    console.error('❌ Error creating admin user:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

createAdminUser();
