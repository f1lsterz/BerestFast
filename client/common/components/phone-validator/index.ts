const { PhoneNumberUtil } = require("google-libphonenumber");
const phoneUtil = PhoneNumberUtil.getInstance();

export const validatePhoneNumber = (
  phoneNumber: string,
  countryCode: string
): boolean => {
  try {
    const number = phoneUtil.parse(phoneNumber, countryCode);
    return phoneUtil.isValidNumber(number);
  } catch (error) {
    return false;
  }
};
