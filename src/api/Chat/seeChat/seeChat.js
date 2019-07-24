import { prisma } from '../../../../generated/prisma-client';
import { MESSAGE_FRAGMENT, CHAT_FRAGMENT } from '../../../fragment';

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
        console.log('in?');
        const chat = await prisma.chat({ id: chatId }).$fragment(CHAT_FRAGMENT);
        const messages = await prisma
          .messages({
            where: {
              chat: {
                id: chatId
              }
            },
            orderBy: 'createdAt_ASC'
          })
          .$fragment(MESSAGE_FRAGMENT);
        return { chat, messages };
      } else {
        throw Error('there is no chat you can enter');
      }
    }
  }
};
