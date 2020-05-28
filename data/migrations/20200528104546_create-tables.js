exports.up = function(knex) {
  return knex.schema
    .createTable("zoos", tbl => {
      tbl.increments("id");
      tbl.string("zoo_name", 128).notNullable();
      tbl
        .string("address", 128)
        .notNullable()
        .unique();
    })
    .createTable("species", tbl => {
      tbl.increments("id");
      tbl.string("species_name", 128).notNullable();
    })
    .createTable("animals", tbl => {
      tbl.increments("id");
      tbl.string("animal_name", 128).notNullable();
      tbl
        .integer("species_id")
        .notNullable()
        .unsigned()
        .references("species.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
    })
    .createTable("zoo_animals", tbl => {
      tbl
        .integer("zoo_id")
        .notNullable()
        .unsigned()
        .references("zoos.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl
        .integer("animal_id")
        .notNullable()
        .unsigned()
        .references("animals.id")
        .onDelete("CASCADE")
        .onUpdate("CASCADE");
      tbl.primary(["zoo_id", "animal_id"]);
    });
};

exports.down = function(knex) {
  return knex.schema
    .dropTableIfExists("zoo_animals")
    .dropTableIfExists("animals")
    .dropTableIfExists("species")
    .dropTableIfExists("zoos");
};
