// Migracion para crear la tabla preguntas

module.exports = {

    up: async (queryInterface, Sequelize) => {

        await queryInterface.createTable('preguntas', {

            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            enunciado: {
                type: Sequelize.TEXT,
                allowNull: false
            },

            opciones: {
                type: Sequelize.JSON,
                allowNull: false
            },

            indiceCorrecto: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

            leccionId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'lecciones',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            }

        });

    },

    down: async (queryInterface) => {

        await queryInterface.dropTable('preguntas');

    }

};