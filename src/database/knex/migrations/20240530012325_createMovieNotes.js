
exports.up = knex => knex.schema.createTable("movieNotes", table => {
    table.increments("id");
    table.string("title");
    table.string("description");
    table.integer("rating");
    table.integer("user_id").references("id").inTable("users");

    table.timestamp("created_at").default(knex.fn.now());
    table.timestamp("updated_at").default(knex.fn.now());
}); 

exports.down = knex => knex.schema.dropTable("movieNotes"); 
