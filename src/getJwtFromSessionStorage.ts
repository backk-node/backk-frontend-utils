import AES from 'crypto-js/aes';

export default function getJwtFromSessionStorage(jwtStorageEncryptionKey: string): string | undefined {
  const encryptedJwt = sessionStorage.getItem('jwt');
  return encryptedJwt ? AES.decrypt(encryptedJwt, jwtStorageEncryptionKey).toString() : undefined;
}
