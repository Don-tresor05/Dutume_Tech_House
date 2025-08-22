const db = require('../db');
const bcrypt = require('bcryptjs');

class User {
  constructor(id, email, password, role, name, createdAt) {
    this.id = id;
    this.email = email;
    this.password = password;
    this.role = role;
    this.name = name;
    this.createdAt = createdAt;
  }

  // Create a new user
  static async create(userData) {
    const { email, password, role = 'customer', name } = userData;
    
    // Hash password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    
    const query = `
      INSERT INTO users (email, password, role, name, created_at)
      VALUES (?, ?, ?, ?, NOW())
    `;
    
    try {
      const [result] = await db.execute(query, [email, hashedPassword, role, name]);
      return result.insertId;
    } catch (error) {
      throw error;
    }
  }

  // Find user by email
  static async findByEmail(email) {
    const query = 'SELECT * FROM users WHERE email = ?';
    
    try {
      const [rows] = await db.execute(query, [email]);
      return rows.length > 0 ? new User(...Object.values(rows[0])) : null;
    } catch (error) {
      throw error;
    }
  }

  // Find user by ID
  static async findById(id) {
    const query = 'SELECT * FROM users WHERE id = ?';
    
    try {
      const [rows] = await db.execute(query, [id]);
      return rows.length > 0 ? new User(...Object.values(rows[0])) : null;
    } catch (error) {
      throw error;
    }
  }

  // Validate password
  async validatePassword(password) {
    return await bcrypt.compare(password, this.password);
  }

  // Get all users (admin only)
  static async findAll() {
    const query = 'SELECT id, email, role, name, created_at FROM users ORDER BY created_at DESC';
    
    try {
      const [rows] = await db.execute(query);
      return rows;
    } catch (error) {
      throw error;
    }
  }

  // Update user role (admin only)
  static async updateRole(userId, newRole) {
    const query = 'UPDATE users SET role = ? WHERE id = ?';
    
    try {
      const [result] = await db.execute(query, [newRole, userId]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Delete user (admin only)
  static async delete(userId) {
    const query = 'DELETE FROM users WHERE id = ?';
    
    try {
      const [result] = await db.execute(query, [userId]);
      return result.affectedRows > 0;
    } catch (error) {
      throw error;
    }
  }

  // Check if email exists
  static async emailExists(email) {
    const query = 'SELECT COUNT(*) as count FROM users WHERE email = ?';
    
    try {
      const [rows] = await db.execute(query, [email]);
      return rows[0].count > 0;
    } catch (error) {
      throw error;
    }
  }

  // Get user profile without password
  toJSON() {
    const { password, ...userWithoutPassword } = this;
    return userWithoutPassword;
  }
}

module.exports = User;