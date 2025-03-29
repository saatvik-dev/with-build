const { Pool } = require('pg');
const fs = require('fs');
const path = require('path');

// Create the output directory if it doesn't exist
const outputDir = path.join(__dirname, '..', 'database-export');
if (!fs.existsSync(outputDir)) {
  fs.mkdirSync(outputDir, { recursive: true });
}

// Connect to the database
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

async function exportTable(tableName) {
  try {
    console.log(`Exporting table: ${tableName}...`);
    
    // Query all data from the table
    const result = await pool.query(`SELECT * FROM ${tableName}`);
    
    // Write the data to a JSON file
    const outputPath = path.join(outputDir, `${tableName}.json`);
    fs.writeFileSync(outputPath, JSON.stringify(result.rows, null, 2));
    
    console.log(`Successfully exported ${result.rowCount} rows from ${tableName} to ${outputPath}`);
    return result.rows;
  } catch (error) {
    console.error(`Error exporting table ${tableName}:`, error);
    return [];
  }
}

async function exportSchema(tableName) {
  try {
    console.log(`Exporting schema for table: ${tableName}...`);
    
    // Query table schema
    const result = await pool.query(`
      SELECT column_name, data_type, character_maximum_length, column_default, is_nullable
      FROM information_schema.columns
      WHERE table_name = $1
      ORDER BY ordinal_position
    `, [tableName]);
    
    // Write the schema to a JSON file
    const outputPath = path.join(outputDir, `${tableName}-schema.json`);
    fs.writeFileSync(outputPath, JSON.stringify(result.rows, null, 2));
    
    console.log(`Successfully exported schema for ${tableName} to ${outputPath}`);
    return result.rows;
  } catch (error) {
    console.error(`Error exporting schema for table ${tableName}:`, error);
    return [];
  }
}

async function exportAllTables() {
  try {
    // Get all table names
    const tablesQuery = await pool.query(`
      SELECT table_name
      FROM information_schema.tables
      WHERE table_schema = 'public'
      AND table_type = 'BASE TABLE'
    `);
    
    const tables = tablesQuery.rows.map(row => row.table_name);
    console.log(`Found ${tables.length} tables: ${tables.join(', ')}`);
    
    // Export each table's schema and data
    for (const table of tables) {
      await exportSchema(table);
      await exportTable(table);
    }
    
    console.log('Database export completed successfully!');
    console.log(`All data has been exported to: ${outputDir}`);
  } catch (error) {
    console.error('Error exporting database:', error);
  } finally {
    // Close the database connection
    await pool.end();
  }
}

// Run the export
exportAllTables();