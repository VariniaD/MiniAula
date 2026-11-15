// Migracion para crear la tabla lecciones

module.exports = {

    up: async (queryInterface, Sequelize) => {

        await queryInterface.createTable('lecciones', {

            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            titulo: {
                type: Sequelize.STRING,
                allowNull: false
            },

            tipo: {
                type: Sequelize.ENUM('contenido', 'cuestionario'),
                allowNull: false
            },

            contenido: {
                type: Sequelize.TEXT,
                allowNull: true
            },

            videoUrl: {
                type: Sequelize.STRING,
                allowNull: true
            },

            orden: {
                type: Sequelize.INTEGER,
                allowNull: false
            },

            notaMinima: {
                type: Sequelize.INTEGER,
                allowNull: true
            },

            cursoId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'cursos',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            }

        });

    },

    down: async (queryInterface) => {

        await queryInterface.dropTable('lecciones');

    }

};