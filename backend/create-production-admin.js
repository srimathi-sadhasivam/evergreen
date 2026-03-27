// Create admin user in production MongoDB Atlas
const mongoose = require('mongoose');

// Use your production MongoDB Atlas URI
const MONGODB_URI = 'mongodb+srv://your_username:your_password@cluster.mongodb.net/evergreen_traders';

async function createProductionAdmin() {
  try {
    await mongoose.connect(MONGODB_URI);
    console.log('✅ Connected to MongoDB Atlas');
    
    // Check if admin already exists
    const User = require('./models/User');
    const existingAdmin = await User.findOne({ role: 'admin' });
    
    if (existingAdmin) {
      console.log('⚠️  Admin user already exists in production:');
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
    
    console.log('✅ Production admin user created successfully!');
    console.log('\n📋 Production Login Credentials:');
    console.log('   Email: admin@evergreen.com');
    console.log('   Password: admin123');
    console.log('   Role: admin');
    console.log('\n⚠️  Please change the password after first login!');
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB Atlas');
  }
}

createProductionAdmin();
