/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> } 
 */
exports.seed = async function(knex) {
  return knex('parent')
    .del() // Deletes all rows in parent table first to maintain referential integrity
    .then(function () {
      return knex('student').del(); // Then deletes all rows in student table
    })
    .then(function () {
      // Inserts seed entries for student table
      return knex('student').insert([
        {
          image_url: 'uploads\\images\\undefined_1738632698970.png',
          name: 'John Doe',
          email: 'dhanuskumar18@gmail.com',
          alternate_email: 'johndoe.alt@example.com',
          phone: '123-456-7890',
          alternate_phone: '987-654-3210',
          address: '123 Main St, Springfield, IL',
          state: 'Illinois',
          city: 'Springfield',
          active: true
        },
        {
          image_url: 'https://example.com/image2.jpg',
          name: 'Jane Smith',
          email: 'jane.smith@example.com',
          alternate_email: 'janesmith.alt@example.com',
          phone: '234-567-8901',
          alternate_phone: '876-543-2109',
          address: '456 Oak St, Springfield, IL',
          state: 'Illinois',
          city: 'Springfield',
          active: true
        }
      ]);
    })
    .then(function () {
      // Inserts seed entries for parent table
      return knex('parent').insert([
        {
          student_id: 1, // Refers to the first student (John Doe)
          salary:" 50000.00",
          parent_name:"raj",
          job_name: 'Software Engineer',
        },
        {
          student_id: 2, // Refers to the second student (Jane Smith)
          salary: "60000.00",
          parent_name:"suresh",
          job_name: 'Data Scientist',
        }
      ]);
    });
};
