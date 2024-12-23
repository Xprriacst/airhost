export const formatPhoneNumber = (phone: string): string => {
  // Remove any non-digit characters
  const cleaned = phone.replace(/\D/g, '');
  
  // Add country code if missing
  if (!cleaned.startsWith('33') && !cleaned.startsWith('1')) {
    return `33${cleaned}`; // Default to French numbers
  }
  
  return cleaned;
};

export const validateMessage = (message: string): boolean => {
  return message.length > 0 && message.length <= 4096;
};