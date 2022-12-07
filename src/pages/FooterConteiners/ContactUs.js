import React from "react";
import "./ContactUs.css";
const ContactUs = () => {
  return (
    <div>
      {" "}
      <div className="title">
        <div class="container py-4">
          <header class="pb-3 mb-4 border-bottom">
            <a class="d-flex align-items-center text-dark text-decoration-none">
              <span class="fs-4">WineLovers Website</span>
            </a>
          </header>{" "}
        </div>
        <div className="contact-container">
          <h2>Contact Us</h2>
          <p>Please find our contact information below</p>
          <hr className="hr-modify" />
        </div>
        <div className="contact-info">
          <p>
            <strong>Email : </strong> wineLovers@gmail.com
          </p>
          <hr className="hr-modify" />
          <p>
            <strong>Tel : </strong> +30698789695
          </p>
          <hr className="hr-modify" />
          <p>
            <strong>Address : </strong> Marousri,Atiki,Greece
          </p>
          <hr className="hr-modify" />
        </div>
      </div>
    </div>
  );
};

export default ContactUs;
