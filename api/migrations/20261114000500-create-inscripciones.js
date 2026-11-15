// Migracion para crear la tabla inscripciones

module.exports = {

    up: async (queryInterface, Sequelize) => {

        await queryInterface.createTable('inscripciones', {

            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            estudianteId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'usuarios',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
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
            },

            fechaInscripcion: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            },

            completado: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            }

        });

        // Evitar que un estudiante se inscriba dos veces al mismo curso
        await queryInterface.addIndex(
            'inscripciones',
            ['estudianteId', 'cursoId'],
            {
                unique: true,
                name: 'inscripciones_estudiante_curso_unique'
            }
        );

    },

    down: async (queryInterface) => {

        await queryInterface.dropTable('inscripciones');

    }

};