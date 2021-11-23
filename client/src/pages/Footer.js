import React from "react";
import SimpleImageSlider from "react-simple-image-slider";
import { Popover, Button, Slider } from "antd";
import { WhatsAppOutlined, InstagramOutlined } from "@ant-design/icons";
// import { Carousel } from "react-responsive-carousel";
import ImageGallery from "react-image-gallery";

const Footer = () => {
  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
      originalWidth: "50px",

      sizes: "50px",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
      originalWidth: "50px",

      sizes: "50px",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
      //   originalHeight: "100px",
      originalWidth: "50px",

      sizes: "50px",
    },
  ];

  const imageSlider = () => {
    console.log("clickked!!!!!!!!!!");
    return (
      //   <div>
      //     <SimpleImageSlider
      //       width={100}
      //       height={200}
      //       images={images}
      //       navSize={40}
      //     />
      //   </div>

      <ImageGallery or items={images} />
    );
  };
  return (
    <div className="container-fluid">
      <div className="footer">
        <div className="row">
          <div className="col-md-4">
            <div className="wrapper">
              <img
                src={require("../assets/logos/abeoz-logo.jpg")}
                className="img-style"
              ></img>
              <br />
              <br />
              <p style={{ color: "white", fontFamily: "'Poiret One'" }}>
                Amaze your loved ones with your stunning and flawless
                personality with the designer Fashion <i>Abeoz</i> that will
                modify your image.
              </p>

              <div className="col-md-4"></div>
            </div>
          </div>
          <div className="col-md-2">
            <div className="wrapper">
              <h5 style={{ color: "white" }}>Policies</h5>

              <div>
                <li style={{ color: "white" }}>Privacy Policy</li>
              </div>
              <div>
                <li style={{ color: "white" }}>No Refund Policy</li>
              </div>
              <div>
                <li style={{ color: "white" }}>Terms & Conditions</li>
              </div>

              {/* <div style={{ color: "white" }}></div>
              <br />
              <div style={{ color: "white" }}></div>

              <br />
              <div style={{ color: "white" }}> </div> */}
              <br />
            </div>
          </div>
          <div className="col-md-2">
            <div className="wrapper">
              <h5 style={{ color: "white" }}>Contact Us:</h5>

              <h6 style={{ color: "white" }}>Mobile Number : 8247057821</h6>
              <p style={{ color: "white" }}>Email : abeozbrand@gmail.com</p>
              <p style={{ color: "white" }}>24/7 Available on :</p>
              <a
                style={{ padding: "20px" }}
                href="https://wa.me/message/CDS2O34GWRG7H1"
              >
                <WhatsAppOutlined
                  key="edit "
                  className="product-icon text-success"
                  style={{ fontSize: "20px" }}
                ></WhatsAppOutlined>

                {/* <b className="Headings">Whatsapp</b> */}
              </a>
              <a href="https://www.instagram.com/abeoz__/">
                <InstagramOutlined
                  key="edit "
                  className="product-icon text-danger"
                  style={{ fontSize: "20px" }}
                ></InstagramOutlined>

                {/* <b className="Headings">Whatsapp</b> */}
              </a>
              <br />
              <br />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Footer;
