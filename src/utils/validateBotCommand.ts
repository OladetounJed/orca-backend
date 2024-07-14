export const validateBotCommand = (command: string) => {
  const validCommands = ['/start', '/adminhello', '/admincreate'];

  return validCommands.includes(command);
};
