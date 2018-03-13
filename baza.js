const Sequelize = require("sequelize");

 const sequelize = new Sequelize(
"sql11226233",
"sql11226233",
"KbUk6EZ2fI",
{
	host:"sql11.freemysqlhosting.net",
	dialect:"mysql", 
	pool:{
		max:5,
		min:0,
		acquire: 30000,
		idle: 10000
	}
});

module.exports = sequelize;
