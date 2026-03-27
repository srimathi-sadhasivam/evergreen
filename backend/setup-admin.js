const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

// User schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: String
}, { timestamps: true });

userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

userSchema.methods.matchPassword = async function(enteredPassword) {
  return bcrypt.compare(enteredPassword, this.password);
};

const User = mongoose.model('User', userSchema);

async function createAdmin() {
  try {
    // Connect to MongoDB
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to MongoDB');
    
    // Create admin user
    const adminExists = await User.findOne({ email: 'admin@evergreen.com' });
    
    if (!adminExists) {
      const admin = await User.create({
        name: 'Admin User',
        email: 'admin@evergreen.com',
        password: 'admin123',
        role: 'admin'
      });
      
      console.log('✅ Admin user created successfully!');
      console.log('📧 Email: admin@evergreen.com');
      console.log('🔑 Password: admin123');
    } else {
      console.log('ℹ️ Admin user already exists');
    }
    
    mongoose.connection.close();
  } catch (error) {
    console.error('❌ Error:', error.message);
    console.log('\n📝 Please update your .env file with valid MongoDB credentials');
    console.log('🌐 Then run: node setup-admin.js');
  }
}

createAdmin();
