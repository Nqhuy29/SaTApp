export default ({ config }) => {
  // Lấy biến môi trường từ eas.json
  const APP_VARIANT = process.env.APP_VARIANT;

  // CHỈ NẾU là bản Dev thì mới đổi tên và thêm đuôi .dev
  if (APP_VARIANT === 'development') {
    return {
      ...config,
      name: `${config.name} (Dev)`,
      ios: {
        ...config.ios,
        bundleIdentifier: `${config.ios.bundleIdentifier}.dev`,
      },
      android: {
        ...config.android,
        package: `${config.android.package}.dev`,
      },
    };
  }

  // Còn lại (Preview, Production) thì TRẢ VỀ NGUYÊN GỐC, KHÔNG ĐỔI 1 SỢI LÔNG
  return config;
};
