import crypto from 'crypto';

export function walletPrivateEncrypt(plainText: string, password: string) {
    const key = deriveKey(password);
    const iv = crypto.randomBytes(16);

    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv);

    let encrypted = cipher.update(plainText, 'utf8', 'base64');
    encrypted += cipher.final('base64');

    // iv 与密文一起返回（解密必需）
    return iv.toString('base64') + ':' + encrypted;
}

export function walletPrivateDecrypt(cipherText: string, password: string) {
    const key = deriveKey(password);

    const [ivBase64, encrypted] = cipherText.split(':');
    const iv = Buffer.from(ivBase64, 'base64');

    const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv);

    let decrypted = decipher.update(encrypted, 'base64', 'utf8');
    decrypted += decipher.final('utf8');

    return decrypted;
}

function deriveKey(password: string) {
    return crypto.createHash('sha256').update(password).digest();
}
