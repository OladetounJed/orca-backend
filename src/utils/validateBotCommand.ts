export const validateBotCommand = (command: string) => {
  const validCommands = ['/start', '/adminapprove', '/admincreate'];

  return validCommands.includes(command);
};
