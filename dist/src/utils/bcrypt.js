import bcrypt from 'bcrypt';
const hash = 10;
export function encrypt(word) {
    const wordHash = bcrypt.hashSync(word, hash);
    return wordHash;
}
export function verifyPassword(password, passwordEncrypted) {
    if (!bcrypt.compareSync(password, passwordEncrypted)) {
        throw { status: 401, message: "Wrong password" };
    }
}
