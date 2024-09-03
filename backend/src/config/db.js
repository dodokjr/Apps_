import { Sequelize } from "sequelize"

const dbApps = new Sequelize("losroot", "root", "", {
    host: "localhost",
    dialect: "mysql",
    logging:
        process.env.NODE_ENV === "development"
            ? (...msg) => console.log(msg)
            : false,
    dialectOptions: {
        dateStrings: true,
        typeCast(field, next)
        {
            // for reading from database
            if (field.type === "DATETIME")
            {
                return field.string();
            }
            return next();
        },
    },
})

export default dbApps;