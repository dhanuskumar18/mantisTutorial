/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema
    .createTable('student', function(table) {
      table.increments('id').primary(); // Primary key for student table
      table.string('image_url'); // Image URL
      table.string('name').notNullable(); // Student's name
      table.string('email').notNullable().unique(); // Email (unique constraint)
      table.string('alternate_email').notNullable().unique(); // Alternate email (unique constraint)
      table.string('phone').notNullable(); // Phone number
      table.string('alternate_phone').notNullable().unique(); // Alternate phone number (unique constraint)
      table.string('address').notNullable(); // Address
      table.string('state').notNullable(); // State
      table.string('city').notNullable(); // City
      table.boolean('active').defaultTo(true);
      table.string("role").defaultTo("student"); // Active field (default to true)
    })
    .then(() => {
      // Creating the parent table
      return knex.schema.createTable('parent', function(table) {
        table.increments('id').primary(); // Primary key for parent table
        table.integer('student_id').unsigned().notNullable(); // Foreign key referencing student table
        table.string('salary').notNullable(); // Salary field
        table.string('parent_name').notNullable(); // parent name field
        table.string('job_name').notNullable(); // Job name field
        table.foreign('student_id').references('id').inTable('student').onDelete('CASCADE'); // Foreign key constraint
      });
    }).then(()=>{
      return knex.schema.createTable("users", (table) => {
        table.increments("id").primary(); // Auto-incrementing primary key
        table.string("email").notNullable().unique(); // Unique email field
        table.enum("role", ["admin", "student"]).notNullable(); // Role field with predefined values
        table.timestamps(true, true); // Created_at & updated_at timestamps
      });
    })
};


/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
     // Drop the parent table first
  return knex.schema.dropTableIfExists('users')
  .then(() => {
    // Then drop the student table
    return knex.schema.dropTableIfExists('student');
  })
  .then(() => {
    // Then drop the student table
    return knex.schema.dropTableIfExists('users');
  });
};
