import mongoose from "mongoose";
import bcrypt from 'bcrypt';

const userSchema = new mongoose.Schema({
  name: {type: String, required: true},
  email: {type: String, required: true, unique: true},
  password: {type: String, required: true},
  role: {type: String, enum: ["user", "admin", "manager"], default: "user"},
  status: {type: String},
  createdBy: [
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now
        }
    }
  ],
  updatedBy: [
    {
        user: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
        },
        updatedAt: {
            type: Date,
            default: Date.now
        }
    }
  ]

}, { timestamps: true });

userSchema.pre('save', async function () {
  const user = this;

  if (!user.isModified('password')) return;

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(user.password, salt);
});

userSchema.methods.comparePassword = async function (candidatePassword) {
    const user = this;
    try {
        const isMatch = await bcrypt.compare(candidatePassword, user.password);
        return isMatch;
    } catch (error) {
        return false;
    }
}

// Pre-save Hook to ensure only ONE admin exists
userSchema.pre('save', async function () {
  if (this.role !== 'admin') return;

  const User = mongoose.model('User'); // ❗ FIXED (no schema arg)

  const existingAdmin = await User.findOne({ role: 'admin' });

  if (existingAdmin) {
    const isSameUser = this._id?.equals(existingAdmin._id);

    if (!isSameUser) {
      throw new Error('Only one admin user is allowed.');
    }
  }
});
  
  // Save original role before saving (for update scenarios)
 userSchema.pre('validate', async function () {
  if (!this.isNew) {
    const User = mongoose.model('User');
    const existing = await User.findById(this._id);

    if (existing) {
      this._originalRole = existing.role;
    }
  }
});

export default mongoose.model("User", userSchema);