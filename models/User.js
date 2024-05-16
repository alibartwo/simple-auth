const pool = require('../config/db');

class User {
    static async createUser(username, password) {
        const query = {
            text: 'INSERT INTO users (username, password) VALUES ($1, $2) RETURNING *',
            values: [ username, password]
        };
        const result = await pool.query(query);
        return result.rows[0];
    }

    static async getUserByUsername(username) {
        const query = {
            text: 'SELECT * FROM users WHERE username = $1',
            values: [ username]
        };
        const result = await pool.query(query);
        return  result.rows[0];
    }
    
    static async getUserById(id) {
        const query = {
            text: 'SELECT * FROM users WHERE id = $1',
            values: [ id ]
        }
        const result = await pool.query(query);
        return result.rows[0]
    }
}

module.exports = User;