const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Import directory
const importDir = path.join(__dirname, '..', 'database-export');

// Connect to the database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function importTable(tableName) {
  try {
    const dataPath = path.join(importDir, `${tableName}.json`);
    
    // Check if the data file exists
    if (!fs.existsSync(dataPath)) {
      console.error(`Data file for table ${tableName} not found at ${dataPath}`);
      return false;
    }
    
    console.log(`Importing data for table ${tableName}...`);
    
    // Read the data from the JSON file
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf8'));
    
    if (data.length === 0) {
      console.log(`No data to import for table ${tableName}`);
      return true;
    }
    
    // For each row, create an INSERT statement
    for (const row of data) {
      const columns = Object.keys(row);
      const values = Object.values(row);
      const placeholders = columns.map((_, index) => `$${index + 1}`).join(', ');
      
      const query = `
        INSERT INTO ${tableName} (${columns.join(', ')})
        VALUES (${placeholders})
        ON CONFLICT DO NOTHING;
      `;
      
      await pool.query(query, values);
    }
    
    console.log(`Successfully imported ${data.length} rows into ${tableName}`);
    return true;
  } catch (error) {
    console.error(`Error importing data for table ${tableName}:`, error);
    return false;
  }
}

async function importAllTables() {
  try {
    // Read the export directory to get table names
    const files = fs.readdirSync(importDir)
      .filter(file => file.endsWith('.json') && !file.includes('-schema'));
    
    // Extract table names from file names (remove .json extension)
    const tables = files.map(file => file.replace('.json', ''));
    
    console.log(`Found ${tables.length} tables to import: ${tables.join(', ')}`);
    
    // Import each table
    for (const table of tables) {
      await importTable(table);
    }
    
    console.log('Database import completed successfully!');
  } catch (error) {
    console.error('Error importing database:', error);
  } finally {
    // Close the database connection
    await pool.end();
  }
}

// Run the import
importAllTables();