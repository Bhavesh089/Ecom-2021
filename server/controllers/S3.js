const S3 = require("aws-sdk/clients/s3");
require("dotenv").config();

//create instance
const bucketName = process.env.AWS_BUCKET_NAME;
const region = process.env.AWS_BUCKET_REGION;
const accessKeyId = process.env.AWS_ACCESS_KEY;
const secretAccessKey = process.env.AWS_SECRET_KEY;

const s3 = new S3({
  region,
  accessKeyId,
  secretAccessKey,
});

//upload

exports.upload = async (req, res) => {
  try {
    //parameter for s3
    const uploadParams = {
      Bucket: bucketName,
      Body: Buffer.from(
        req.body.image.replace(/^data:image\/\w+;base64,/, ""),
        "base64"
      ),
      Key: Date.now().toString(),
      ContentType: "image/jpeg",
    };

    //pass the parameters in upload function
    let result = await s3.upload(uploadParams).promise();

    //send to the client
    res.status(200).json(result);
  } catch (err) {
    throw new Error(`S3 upload error: ${err.message}`);
  }
};

exports.remove = async (req, res) => {
  try {
    //parameter for s3
    const removeParams = {
      Bucket: bucketName,
      Key: req.body.key,
    };

    //remove function
    let result = await s3.deleteObject(removeParams).promise();

    //send to the client
    res.status(200).json(result);
  } catch (error) {
    throw new Error(`S3 upload error: ${err.message}`);
  }
};
