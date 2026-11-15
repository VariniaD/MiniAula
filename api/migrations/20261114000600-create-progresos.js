// Migracion para crear la tabla progresos

module.exports = {

    up: async (queryInterface, Sequelize) => {

        await queryInterface.createTable('progresos', {

            id: {
                type: Sequelize.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false
            },

            inscripcionId: {
                type: Sequelize.INTEGER,
                allowNull: false,
                references: {
                    model: 'inscripciones',
                    key: 'id'
                },
                onUpdate: 'CASCADE',
                onDelete: 'RESTRICT'
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
            },

            completada: {
                type: Sequelize.BOOLEAN,
                allowNull: false,
                defaultValue: false
            },

            intentos: {
                type: Sequelize.INTEGER,
                allowNull: false,
                defaultValue: 0
            },

            mejorNota: {
                type: Sequelize.INTEGER,
                allowNull: true
            },

            actualizadoEn: {
                type: Sequelize.DATE,
                allowNull: false,
                defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
            }

        });

        // Evitar registros de progreso duplicados
        await queryInterface.addIndex(
            'progresos',
            ['inscripcionId', 'leccionId'],
            {
                unique: true,
                name: 'progresos_inscripcion_leccion_unique'
            }
        );

    },

    down: async (queryInterface) => {

        await queryInterface.dropTable('progresos');

    }

};