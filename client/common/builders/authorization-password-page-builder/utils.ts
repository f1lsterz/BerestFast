import DeviceInfo from "react-native-device-info";

export const getDeviceInfo = async () => {
  const deviceName = await DeviceInfo.getDeviceName();
  const os = `${DeviceInfo.getSystemName()} ${DeviceInfo.getSystemVersion()}`;
  const appVersion = DeviceInfo.getVersion();
  const ipAddress = await DeviceInfo.getIpAddress();

  return {
    deviceName,
    os,
    appVersion,
    ipAddress,
  };
};
