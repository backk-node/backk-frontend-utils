export const localErrors = {
  ACCESS_TOKEN_ENCRYPTION_KEY_NOT_SET: {
    errorCode: 'backkLocalError.1',
    message:
      "Access token storage encryption key is not set. Use 'EncryptionKeyManager.setAccessTokenStorageEncryptionKey()' function to set the encryption key for services before using them",
  },
  NETWORK_ERROR: {
    errorCode: 'backkLocalError.2',
    message: 'Remote service call failed due to network error',
  },
};
