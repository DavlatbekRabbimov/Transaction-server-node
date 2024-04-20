exports.up = (pgm) => {
    pgm.createTable('users', {
        id: 'id',
        balance: { type: 'numeric', notNull: true, default: 0 },
    });
    pgm.sql("INSERT INTO users (id, balance) VALUES (1, 10000.00)");
};

exports.down = (pgm) => {
    pgm.dropTable('users');
};
