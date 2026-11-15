// Migracion para crear la tabla usuarios

module.exports = {

    up: async (queryInterface, Sequelize) => {

        await queryInterface.createTable('usuarios', {

            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            nombre: {
                type: Sequelize.STRING,
                allowNull: false
            },

            email: {
                type: Sequelize.STRING,
                allowNull: false,
                unique: true
            },

            passwordHash: {
                type: Sequelize.STRING,
                allowNull: false
            },

            rol: {
                type: Sequelize.ENUM('estudiante', 'instructor'),
                allowNull: false
            },

            creadoEn: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }

        });

    },

    down: async (queryInterface) => {

        await queryInterface.dropTable('usuarios');

    }

};