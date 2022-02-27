import jwt from 'jsonwebtoken';

export const generateJWT = async (uid: string) => {
  return new Promise<string>((resolve, reject) => {
    const payload = { uid };

    jwt.sign(
      payload,
      process.env.PRIVATE_KEY + '',
      { expiresIn: '10 days' },
      (error, token) => {
        if (error) {
          console.log(error);

          reject("Token couldn't be generated.");
        } else {
          resolve(token ?? '');
        }
      }
    );
  });
};
