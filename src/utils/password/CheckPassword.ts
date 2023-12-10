const bcrypt = require("bcryptjs");

export const CheckPassword = (password: string, hash: string): boolean => {
    return bcrypt.compareSync(password, hash);
}