
exports.up = knex => knex.schema.createTable("movieTags", table => {
    table.increments("id");
    table.string("name");
    table.integer("user_id").references("id").inTable("users").onDelete("CASCADE");
    table.integer("note_id").references("id").inTable("movieNotes")

}); 

exports.down = knex => knex.schema.dropTable("movieTags"); 
