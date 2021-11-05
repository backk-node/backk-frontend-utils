import AES from 'crypto-js/aes';
import Utf8 from 'crypto-js/enc-utf8';

export default function getAccessTokenFromSessionStorage(
  accessTokenStorageEncryptionKey: string
): string | undefined {
  const encryptedAccessToken = sessionStorage.getItem('accessToken');
  return encryptedAccessToken
    ? AES.decrypt(encryptedAccessToken, accessTokenStorageEncryptionKey).toString(Utf8)
    : undefined;
}
