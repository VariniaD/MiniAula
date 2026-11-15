// Migracion para crear la tabla cursos

module.exports = {

    up: async (queryInterface, Sequelize) => {

        await queryInterface.createTable('cursos', {

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

            descripcion: {
                type: Sequelize.TEXT,
                allowNull: false
            },

            categoria: {
                type: Sequelize.STRING,
                allowNull: false
            },

            nivel: {
                type: Sequelize.STRING,
                allowNull: false
            },

            estado: {
                type: Sequelize.ENUM('borrador', 'publicado', 'archivado'),
                allowNull: false,
                defaultValue: 'borrador'
            },

            instructorId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'usuarios',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
            },

            creadoEn: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }

        });

    },

    down: async (queryInterface) => {

        await queryInterface.dropTable('cursos');

    }

};