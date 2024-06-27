
import React from "react";
// reactstrap components

function DemoFooter() {

  return (
    <footer className="section footer-area section-dark">
      <div className="footer-top ptb_100">
        <div className="container">
          <div className="row">
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="footer-items">
                <h3 className="footer-title text-white text-uppercase mb-2">About Us</h3>
                <ul>
                  <li className="py-2"><a className="text-white-50" href="/#">Company Profile</a>
                  </li><li className="py-2"><a className="text-white-50" href="/#">Testimonials</a></li>
                  <li className="py-2"><a className="text-white-50" href="/#">Careers</a></li>
                  <li className="py-2"><a className="text-white-50" href="/#">Partners</a></li>
                  <li className="py-2"><a className="text-white-50" href="/#">Affiliate Program</a></li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="footer-items">
                <h3 className="footer-title text-white text-uppercase mb-2">Services</h3>
                <ul>
                  <li className="py-2"><a className="text-white-50" href="/#">Web Application</a></li>
                  <li className="py-2"><a className="text-white-50" href="/#">Product Management</a></li>
                  <li className="py-2"><a className="text-white-50" href="/#">User Interaction Design</a></li>
                  <li className="py-2"><a className="text-white-50" href="/#">UX Consultant</a></li>
                  <li className="py-2"><a className="text-white-50" href="/#">Social Media Marketing</a></li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="footer-items">
                <h3 className="footer-title text-white text-uppercase mb-2">Support</h3>
                <ul>
                  <li className="py-2"><a className="text-white-50" href="/#">Frequently Asked</a></li>
                  <li className="py-2"><a className="text-white-50" href="/#">Terms &amp; Conditions</a></li>
                  <li className="py-2"><a className="text-white-50" href="/#">Privacy Policy</a></li>
                  <li className="py-2"><a className="text-white-50" href="/#">Help Center</a></li>
                  <li className="py-2"><a className="text-white-50" href="/#">Contact Us</a></li>
                </ul>
              </div>
            </div>
            <div className="col-12 col-sm-6 col-lg-3">
              <div className="footer-items">
                <h3 className="footer-title text-white text-uppercase mb-2">Follow Us</h3>
                <p className="text-white-50 mb-2">Lorem ipsum dolor sit amet, consectetur adipisicing elit. Tenetur, quae.</p>
                <ul className="social-icons list-inline pt-2">
                  <li className="list-inline-item px-1"><a className="text-white-50" href="/#">
                    <i className="fa fa-facebook"></i>
                  </a></li><li className="list-inline-item px-1">
                    <a className="text-white-50" href="/#">
                      <i className="fa fa-twitter"></i>
                    </a>
                  </li>
                  <li className="list-inline-item px-1">
                    <a className="text-white-50" href="/#">
                      <i className="fa fa-google-plus"></i>
                    </a>
                  </li>
                  <li className="list-inline-item px-1">
                    <a className="text-white-50" href="/#">
                      <i className="fa fa-linkedin"></i>
                    </a>
                  </li>
                  <li className="list-inline-item px-1">
                    <a className="text-white-50" href="/#">
                      <i className="fa fa-instagram"></i>
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="footer-bottom dark-bg">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <div className="copyright-area d-flex flex-wrap justify-content-center justify-content-sm-between text-center py-4">
                <div className="copyright-left text-white-50">© Copyrights 2020 ARTSY All rights reserved.</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default DemoFooter;
