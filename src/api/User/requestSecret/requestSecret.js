import { generateSecret } from '../../../util';
import { prisma } from '../../../../generated/prisma-client';
import { sendSecretMail } from '../../../util';
export default {
  Mutation: {
    requestSecret: async (_, args, { request }) => {
      console.log(request);
      const { email } = args;
      const loginSecret = generateSecret();

      try {
        throw Error();
        await sendSecretMail(email, loginSecret);
        await prisma.updateUser({ data: { loginSecret }, where: { email } });
        return true;
      } catch {
        return false;
      }
    }
  }
};
