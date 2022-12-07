import React from "react";
import "./AboutUs.css";

const AboutUs = () => {
  return (
    <div>
      <div className="title">
        <div class="container py-4">
          <header class="pb-3 mb-4 border-bottom">
            <a class="d-flex align-items-center text-dark text-decoration-none">
              <span class="fs-4">WineLovers Website</span>
            </a>
          </header>{" "}
        </div>

        <div className="about-info">
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;<strong>WineLovers</strong> is a website
            created by{" "}
            <a href="https://www.linkedin.com/in/dimitris-siamplis-334b00177/">
              Dimitrios Siamplis
            </a>
            &nbsp; with the aim of realizing his diploma work, at{" "}
            <a href="https://www.upatras.gr/">University of Patras,Greece</a>
            &nbsp; in the department of{" "}
            <a href="https://www.upatras.gr/education/undergraduate-studies/school-of-engineering/department-of-electrical-and-computer-engineering/">
              Electrical & Computer Engineering
            </a>
            . Dimitris's professor{" "}
            <a href="http://www.ece.upatras.gr/index.php/el/faculty/navouris.html">
              Nikolaos Avouris
            </a>{" "}
            he is a good person with great knowledge of software technology,
            with an emphasis on Human-Computer Communication, human-computer
            interface design methodologies, Artificial Intelligence, Expert
            Systems, Distributed Intelligent Systems, Machine Learning
            techniques and the application of these techniques in complex
            problems in the field of Cooperative Learning, Environment,
            Education and Industry.
          </p>
          <p>&nbsp;&nbsp;&nbsp;&nbsp;In this website you can : </p>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;&#8226; Find any wine.
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&#8226; Discover the wine's world. <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&#8226; Rate and comment your bottle.
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&#8226; Rate and comment your bottle.
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&#8226; Compare wines.
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&#8226; Buy wines with the easiest way.
            <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&#8226; Chat with others members of this
            application. <br />
            &nbsp;&nbsp;&nbsp;&nbsp;&#8226; See your goals with charts.
          </p>
        </div>

        <div className="about-info">
          <img
            className="image-about"
            src="https://media-exp1.licdn.com/dms/image/C4D03AQHj2hxThj88JQ/profile-displayphoto-shrink_400_400/0/1633171004234?e=1670457600&v=beta&t=wrmyeGK2inFAVeaYRcVuv3nou5s4jhJvMdEwezVV2lY"
          ></img>
          <h5 className="name-under-image">Dimitrios Siamplis</h5>
          <p>
            &nbsp;&nbsp;&nbsp;&nbsp;
            <a href="https://www.linkedin.com/in/dimitris-siamplis-334b00177/">
              Dimitrios Siamplis
            </a>
            &nbsp; he is an undergraduate student at{" "}
            <strong>University of Patras,Greece</strong>
            &nbsp; in the department of{" "}
            <strong>Electrical & Computer Engineering</strong>. He was born in{" "}
            <strong>Nemea,Korinthias,Greece</strong> at 26 August 1997 and he is{" "}
            <strong>{new Date().getFullYear() - 1997} years old</strong> . Nemea
            is one of the largest wine-growing areas in Greece , with excellent
            wine and grapes. <strong>Agiorgitiko</strong> is the most popular
            wine variety with protected designation of origin. Dimitris' love
            for Nemea, wine and computers pushed him to create this website.
          </p>
        </div>
      </div>
     
    </div>
  );
};

export default AboutUs;
