import cloudinary from 'cloudinary';

cloudinary.v2.config({
  cloud_name: 'fit-me',
  api_key: '499765842748975',
  api_secret: '4WBTwoH-O6yk4tRtFTKKi8vozgw',
});

export { cloudinary as Cloudinary };
