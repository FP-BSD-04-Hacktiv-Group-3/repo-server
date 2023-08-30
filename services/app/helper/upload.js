const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");

const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

function kirimFile(file) {
  const fileStream = fs.createReadStream(file.path);
  file.filename = String(new Date().valueOf());

  const uploadParams = {
    Bucket: bucketName,
    Body: fileStream,
    Key: file.filename,
  };

  return s3.upload(uploadParams).promise();
}

async function logging(file) {
  const test = await kirimFile(file);

  const url = s3.getSignedUrl("getObject", {
    Bucket: bucketName,
    Key: test.key,
    Expires: 604800,
  });

  return url;
}

module.exports = { logging };
