import { prisma } from '../../../../generated/prisma-client';

export default {
  Query: {
    seeChat: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { chatId } = args;
      const { user } = request;
      const existChat = prisma.$exists.chat({
        AND: [{ id: chatId }, { participants_some: { id: user.id } }]
      });
      if (existChat) {
        const chat = await prisma.chat({ id: chatId });
        const messages = await prisma.messages({
          where: {
            chat: {
              id: chatId
            }
          },
          orderBy: 'createdAt_ASC'
        });
        return { chat, messages };
      } else {
        throw Error('there is no chat you can enter');
      }
    }
  }
};
