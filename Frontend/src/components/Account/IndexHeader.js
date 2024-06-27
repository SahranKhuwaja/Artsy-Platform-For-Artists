import React from "react";
import backgroundMainImage from '../../assets/img/3.jpg';
import backgroundMainImage2 from '../../assets/img/image.jpg';
//import con from '../../assets/img/image.jpg';
import fog from '../../assets/img/fog-low.png';
import clouds from '../../assets/img/clouds.png';
import work from "../../assets/img/3.jpg";
import { UncontrolledCarousel } from "reactstrap";
import car1 from "../../assets/img/carosel1.png";
import car2 from "../../assets/img/carosel2.png";
import service1 from "../../assets/img/Services.png";



// reactstrap components
import { Button, Container } from "reactstrap";

// core components
import Signup from './Signup';
const carouselItems = [
  {
    src: car1,
    altText: "Slide 1",
    caption: ""

  },
  {
    src: car2,

    altText: "Slide 2",
    caption: ""
  }
]

const carouselItems2 = [
  {
    src: service1,

  }
]



function IndexHeader(props) {
  return (
    <>
      {/* Home */}
      <div id="home" className="page-header section-dark" style={{ backgroundImage: `url(${backgroundMainImage})` }}>
        <div className="filter" />
        <div className="content-center">
          <Container>
            <div className="title-brand">
              <h1 className="presentation-title">ARTSY</h1>
              <div className="fog-low">
                <img alt="..." src={fog} />
              </div>
              <div className="fog-low right">
                <img alt="..." src={fog} />
              </div>
            </div>
            <h2 className="presentation-subtitle text-center">
              Discover your people, Find a quick solution
            </h2>
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              <Button style={{ marginRight: "5px" }} className="btn-round" size="lg" color="neutral" type="button" outline onClick={props.displayModal}>Login <i className="fa fa-sign-in fa-lg" /></Button>
              <a href="#signup">
                <Button style={{ marginLeft: "5px" }} className="btn-round" size="lg" color="neutral" type="button">Sign Up <i className="fa fa-user-plus fa-lg" /></Button>
              </a>
            </div>
          </Container>
        </div>
        <div className="moving-clouds" style={{ backgroundImage: `url(${clouds})` }} />
      </div>

      {/* About */}

      <div id="about" className="page-header section-dark">
        <div style={{ width: '800px' }}>
          <UncontrolledCarousel items={carouselItems} />
        </div>
      </div>

      {/* Service */}
      <div id="services" className="page-header section-dark">

        <div style={{ width: '800px' }}>
          <UncontrolledCarousel items={carouselItems2} />
        </div>

      </div>

      {/* SignUp */}
      <div id="signup" style={{ padding: "125px" }} className="page-header section-dark">
        <div style={{ display: "flex" }}>
          <div style={{ backgroundImage: `url(${work})`, backgroundSize: "cover", backgroundPosition: "center", width: "600px" }}></div>
          <div style={{ backgroundColor: '#FFFFFF', padding: '35px', paddingTop: "20px", width: "512px", height: "480px" }}>

            <Signup newUser={props.newUser}
              onFirstNameChange={props.onFirstNameChange}
              onLastNameChange={props.onLastNameChange}
              onEmailChange={props.onEmailChange}
              onPasswordChange={props.onPasswordChange}
              onConfirmPasswordChange={props.onConfirmPasswordChange}
              onCountryChange={props.onCountryChange}
              onCityChange={props.onCityChange}
              onBirthdayChange={props.onBirthdayChange}
              onGenderChange={props.onGenderChange}
              onPhoneChange={props.onPhoneChange}
              setRoleArtist={props.setRoleArtist}
              setRoleClient={props.setRoleClient}
              signupStep={props.signupStep}
              setStep1={props.setStep1}
              setStep2={props.setStep2}
              setStep3={props.setStep3}
              addBasic={props.addBasic}
              addPersonalInfo={props.addPersonalInfo}
              popovers={props.popovers} show={props.show}
              createAccount={props.createAccount}
              enabled={props.enabled}
              onChecked={props.onChecked}
            />
          </div>
        </div>
      </div>

      {/* Contact */}

      <div id="contact" className="page-header section-dark flex ">
        <div className="alignCenter">
          <h2 className="bold">For CONTACTING US you can simply Email or Call At</h2>
          <h3 className="bolder">Our helpline is 24/7 available</h3>
          <h2> <i className="fa fa-envelope mgRight20"/> <strong>Email:</strong> artsy@gmail.com </h2>
          <h2> <i className="fa fa-phone mgRight20" /> <strong>Phone:</strong> 021-1111-1234 </h2>
        </div>
      </div>

      {/* Contact Us */}


      <div style={{ backgroundImage: `url(${backgroundMainImage})`, height: "445px" }} className="page-header page-header-xs section-dark" data-parallax={true}>
        <div className="filter" />
        <div className="content-center" style={{ marginBottom: "100px" }}>
          <Container>
            <div className="presentation-subtitle text-center">
              <h2 style={{ fontWeight: "700" }}>Looking for the best place to find Inspiration?</h2>
            </div>
            <div style={{ marginTop: "10px", textAlign: "center" }}>
              <Button style={{ marginRight: "5px" }} className="btn-round" size="lg" color="neutral" type="button" outline onClick={props.displayModal}>Contact Us</Button>
            </div>
          </Container>
        </div>
        <div className="moving-clouds" style={{ backgroundImage: `url(${clouds})` }} />
      </div>


    </>
  );
}

export default IndexHeader;
