type MessageService = {
  sendMessage: () => void;
};

const createMessageService = (): MessageService => {
  const sendMessage = () => {};

  return {
    sendMessage,
  };
};

export default createMessageService();
