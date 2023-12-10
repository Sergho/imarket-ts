const bcrypt = require("bcryptjs");

export const HashPassword = (password: string): string => {
    return bcrypt.hashSync(password, 7);
}