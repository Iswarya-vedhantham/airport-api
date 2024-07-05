const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: './database.sqlite'
});

const Country = sequelize.define('Country', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    code: {
        type: DataTypes.STRING,
        allowNull: false
    }
});

const City = sequelize.define('City', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    countryId: {
        type: DataTypes.INTEGER,
        references: {
            model: Country,
            key: 'id'
        }
    }
});

const Airport = sequelize.define('Airport', {
    name: {
        type: DataTypes.STRING,
        allowNull: false
    },
    iata_code: {
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    cityId: {
        type: DataTypes.INTEGER,
        references: {
            model: City,
            key: 'id'
        }
    }
});

Country.hasMany(City, { foreignKey: 'countryId' });
City.belongsTo(Country, { foreignKey: 'countryId' });
City.hasMany(Airport, { foreignKey: 'cityId' });
Airport.belongsTo(City, { foreignKey: 'cityId' });

module.exports = { sequelize, Country, City, Airport };
