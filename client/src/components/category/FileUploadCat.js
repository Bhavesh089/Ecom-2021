import React from "react";
import Resizer from "react-image-file-resizer";
import axios from "axios";
import { useSelector } from "react-redux";
import { Avatar, Image, Badge } from "antd";
import { SyncOutlined } from "@ant-design/icons";
import { removeFromS3 } from "../../functions/s3";

const FileUploadCat = ({ image, setImage, setLoading, loading }) => {
  const { user } = useSelector((state) => ({ ...state }));

  //Fileupload to s3
  const fileUploadAndResize = (e) => {
    // e.preventDefault();
    console.log(e.target.files, "files ");
    //resize
    let files = e.target.files;
    let allUploadedFiles = image;

    if (files) {
      setLoading(true);
      for (let i = 0; i < files.length; i++) {
        Resizer.imageFileResizer(
          files[i],
          720,
          720,
          "JPEG",
          100,
          0,
          (uri) => {
            console.log(uri);
            axios
              .post(
                `${process.env.REACT_APP_API_URL}/uploadimages`,
                { image: uri },
                {
                  headers: {
                    authToken: user ? user.token : "",
                  },
                }
              )
              .then((res) => {
                console.log("IMAGE UPLOAD RES DATA", res);
                setLoading(false);
                allUploadedFiles.push(res.data);
                console.log(allUploadedFiles);
                setImage([...allUploadedFiles]);
                console.log(image, "allimages");
              })

              .catch((err) => {
                setLoading(false);
                console.log(err, "Error Occured");
              });
          },
          "base64"
        );
      }
    }
  };

  const handleRemoveImage = (key) => {
    removeFromS3(key, user.token)
      .then((res) => {
        console.log("IMAGE Remove RES DATA", res);
        setLoading(false);

        let filteredImages = image.filter((items) => {
          return items.key != key;
        });

        //update the state
        setImage(filteredImages);
      })

      .catch((err) => {
        setLoading(false);
        console.log(err, "Error Occured");
      });
  };
  return (
    <>
      <div className="row">
        {image &&
          image.map((image) => (
            <Badge
              key={image.key}
              count="x"
              onClick={() => handleRemoveImage(image.key)}
              style={{ cursor: "pointer" }}
            >
              <Avatar src={image.Location} size={100} className=" ml-3 mb-3" />
            </Badge>
          ))}
      </div>
      <div className="row">
        {loading ? (
          <SyncOutlined spin className="ml-4 mb-3" />
        ) : (
          <label className="btn btn-primary btn-raised ml-3 mb-3">
            Upload a Image
            <input
              type="file"
              multiple
              hidden
              accept="images/*"
              onChange={fileUploadAndResize}
            />
          </label>
        )}
      </div>
    </>
  );
};

export default FileUploadCat;
