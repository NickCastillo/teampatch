const aws = require("aws-sdk");
const fs = require("fs");

const uploadFile = async ({ fileName, filePath, fileType }) => {
  return new Promise((resolve, reject) => {
    aws.config.update({
      region: "us-east-1",
      accessKeyId: "AKIASQEJQYMSWPQJBUED",
      secretAccessKey: "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",
    });

    const s3 = new aws.S3({
      apiVersion: "2006-03-01",

    });

    const stream = fs.createReadStream(filePath);
    stream.on("error", function(err) {
      reject(err);
    });

    s3.upload(
      {
        ACL: "public-read",
        Bucket: "team-patch",
        Body: stream,
        Key: fileName,
        ContentType: fileType,
      },
      function(err, data) {
        if (err) {
          reject(err);
        } else if (data) {
          resolve({ key: data.Key, url: data.Location });
        }
      }
    );
  });
};

module.exports = { uploadFile };