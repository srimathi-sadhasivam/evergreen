// Simple script to check if admin user exists in MongoDB
const mongoose = require('mongoose');
require('dotenv').config({ path: './.env' });

// Import User model
const User = require('./models/User');

async function checkAdminUser() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ Connected to MongoDB');
    
    // Check for admin users
    const adminUsers = await User.find({ role: 'admin' });
    
    console.log(`\n📊 Found ${adminUsers.length} admin user(s):`);
    
    if (adminUsers.length === 0) {
      console.log('❌ No admin users found!');
      console.log('\n🔧 To create an admin user, run this script:');
      console.log('node create-admin.js');
    } else {
      adminUsers.forEach((user, index) => {
        console.log(`\n${index + 1}. Admin User:`);
        console.log(`   ID: ${user._id}`);
        console.log(`   Name: ${user.name}`);
        console.log(`   Email: ${user.email}`);
        console.log(`   Role: ${user.role}`);
        console.log(`   Created: ${user.createdAt}`);
      });
    }
    
    // Check for any users (including regular users)
    const allUsers = await User.find({});
    console.log(`\n📋 Total users in database: ${allUsers.length}`);
    
  } catch (error) {
    console.error('❌ Error:', error.message);
  } finally {
    await mongoose.disconnect();
    console.log('\n🔌 Disconnected from MongoDB');
  }
}

checkAdminUser();
