"use client";

import { useState, useRef, useEffect } from "react";
import { Poppins } from "next/font/google";
import "bootstrap/dist/css/bootstrap.min.css";
import "./assets/css/fontawesome.css";
import "./assets/css/templatemo-onix-digital.css";
import "./assets/css/animated.css";
import "./assets/css/owl.css";

const poppins = Poppins({
  weight: [
    "100",
    "200",
    "300",
    "400",
    "500",
    "600",
    "700",
    "800",
    "900"
  ],
  subsets: ["latin"],
});

export default function DomePage() {
  const [activeTab, setActiveTab] = useState(0);
  const ulRef = useRef<HTMLUListElement>(null);

  const tabs = ["Project One", "Project Two", "Project Three", "Project Four"];
  const contents = [
    <iframe
      width="100%"
      height="auto"
      src="https://www.youtube.com/embed/JynGuQx4a1Y"
      title="YouTube video player"
      frameBorder={0}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>,
    <iframe
      width="100%"
      height="auto"
      src="https://www.youtube.com/embed/RdJBSFpcO4M"
      title="YouTube video player"
      frameBorder={0}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>,
    <iframe
      width="100%"
      height="auto"
      src="https://www.youtube.com/embed/ZlfAjbQiL78"
      title="YouTube video player"
      frameBorder={0}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>,
    <iframe
      width="100%"
      height="auto"
      src="https://www.youtube.com/embed/mx1WseE7-0Y"
      title="YouTube video player"
      frameBorder={0}
      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
      allowFullScreen
    ></iframe>,
  ];

  useEffect(() => {
    if (ulRef.current) {
      const li = ulRef.current.children[activeTab] as HTMLElement;
      if (li) {
        ulRef.current.style.height = li.offsetHeight + "px";
      }
    }
  }, [activeTab]);

  return (
    <main className={poppins.className}>
      {/* Preloader */}
      <div id="js-preloader" className="js-preloader">
        <div className="preloader-inner">
          <span className="dot"></span>
          <div className="dots">
            <span></span>
            <span></span>
            <span></span>
          </div>
        </div>
      </div>

      {/* Header */}
      <header className="header-area header-sticky wow slideInDown" data-wow-duration="0.75s" data-wow-delay="0s">
        <div className="container">
          <div className="row">
            <div className="col-12">
              <nav className="main-nav">
                <a href="/" className="logo">
                  <img src="/assets/images/logo.png" alt="Logo" />
                </a>
                <ul className="nav">
                  <li className="scroll-to-section"><a href="#top" className="active">Home</a></li>
                  <li className="scroll-to-section"><a href="#services">Services</a></li>
                  <li className="scroll-to-section"><a href="#about">About</a></li>
                  <li className="scroll-to-section"><a href="#portfolio">Portfolio</a></li>
                  <li className="scroll-to-section"><a href="#video">Videos</a></li>
                  <li className="scroll-to-section"><a href="#contact">Contact Us</a></li>
                  <li className="scroll-to-section">
                    <div className="main-red-button-hover">
                      <a href="#contact">Contact Us Now</a>
                    </div>
                  </li>
                </ul>
                <a className="menu-trigger cursor-pointer"><span>Menu</span></a>
              </nav>
            </div>
          </div>
        </div>
      </header>

      {/* Main Banner */}
      <div className="main-banner" id="top">
        <div className="container">
          <div className="row">
            <div className="col-lg-12">
              <div className="row">
                <div className="col-lg-6 align-self-center">
                  <div className="owl-carousel owl-banner">
                    <div className="item header-text">
                      <h6>Welcome to Onix Digital</h6>
                      <h2>Build <em>your website</em> the best in <span>SEO</span>?</h2>
                      <p>This is a professional looking HTML Bootstrap 5 website template brought to you by TemplateMo website.</p>
                      <div className="down-buttons">
                        <div className="main-blue-button-hover">
                          <a href="#contact">Message Us Now</a>
                        </div>
                        <div className="call-button">
                          <a href="#"><i className="fa fa-phone"></i> 010-020-0340</a>
                        </div>
                      </div>
                    </div>
                    {/* 可以继续添加其他 banner 项目 */}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Video Tabs */}
      <div id="video" className="our-videos section">
        <div className="container">
          <div className="row">
            <div className="col-lg-8">
              <ul ref={ulRef} className="nacc transition-all overflow-hidden">
                {contents.map((content, index) => (
                  <li key={index} className={`${activeTab === index ? "block" : "hidden"} p-2 border`}>
                    {content}
                  </li>
                ))}
              </ul>
            </div>
            <div className="col-lg-4">
              <div className="menu flex flex-col gap-2">
                {tabs.map((tab, index) => (
                  <div
                    key={index}
                    className={`cursor-pointer p-2 border rounded ${activeTab === index ? "bg-blue-500 text-white" : "bg-gray-100"}`}
                    onClick={() => setActiveTab(index)}
                  >
                    {tab}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer>
        <div className="container">
          <p>© 2021 Onix Digital Co., Ltd. All Rights Reserved.</p>
        </div>
      </footer>
    </main>
  );
}
