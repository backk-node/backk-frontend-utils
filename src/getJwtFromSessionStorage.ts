import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

export default function getJwtFromSessionStorage(jwtStorageEncryptionKey: string): string | undefined {
  const encryptedJwt = sessionStorage.getItem('jwt');
  return encryptedJwt ? AES.decrypt(encryptedJwt, jwtStorageEncryptionKey).toString(Utf8) : undefined;
}
