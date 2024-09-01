import bcript from "bcrypt";
const saltRounds = 10;

const encript = (password) =>
{
    return bcript.hashSync(password, saltRounds);
};

const compare = (password, hash) =>
{
    return bcript.compareSync(password, hash);
};

export { encript, compare };