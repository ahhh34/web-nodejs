import { Sequelize } from 'sequelize';


// Option 3: Passing parameters separately (other dialects)
const sequelize = new Sequelize('thienit', 'root', null, {
    host: 'localhost',
    dialect: 'mysql',
    "logging": false // thêm ở connectdb và config đẻ bỏ dòng Executing (default): SELECT 1+1 AS result
});

let connectDB = async () => {
    try {
        await sequelize.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
}

export default connectDB