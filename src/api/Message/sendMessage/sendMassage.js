import { prisma } from '../../../../generated/prisma-client';
export default {
  Mutation: {
    sendMessage: async (_, args, { request, isAuthenticated }) => {
      isAuthenticated(request);
      const { toId, text, chatId } = args;
      const { user } = request;
      let newMessage;
      if (chatId === undefined) {
        newMessage = await prisma.createMessage({
          text,
          from: {
            connect: { id: user.id }
          },
          to: {
            connect: { id: toId }
          },
          chat: {
            create: {
              participants: {
                connect: [{ id: user.id }, { id: toId }]
              }
            }
          }
        });
      } else {
        const chat = await prisma.chat({ id: chatId }).participants();

        if (!chat) {
          throw Error('chat not found');
        }

        const getTo = chat.filter(participant => participant.id !== user.id)[0];
        newMessage = await prisma.createMessage({
          text,
          from: {
            connect: { id: user.id }
          },
          to: {
            connect: { id: getTo.id }
          },
          chat: {
            connect: {
              id: chatId
            }
          }
        });
      }
      return newMessage;
    }
  }
};
