import Button from "../Components/Button";
import "../Assets/css/about.css";

import img from "../Assets/img/bags2.jpg";

const features = [
  {
    icon: "user",
    title: "User data",
    body: "We use data from your shopping history, trends and products you've bought",
  },
  {
    icon: "tags",
    title: "Product data",
    body: "We find products similar to products you're interested in",
  },
  {
    icon: "flag",
    title: "World data",
    body: "We also show you products based on time, holidays, season and events",
  },
];

// fetch from backend
const testimonials = [
  {
    text: "I had a great time shopping at The Bazaar. I found the perfect gift for my friend's birthday!",
    name: "Jason Davo",
    position: "Firsttimer",
    bgColor: "#ffc212",
    color: "black",
  },
  {
    text: "I always seem to find what I'm looking for with just a few clicks. It's mindblowing.",
    name: "Emily Sanders",
    position: "Personal Shopper",
    bgColor: "#7766c6",
    color: "white",
  },
  {
    text: "Their customer service is topnotch. I had an issue with a product and they resolved it very quickly.",
    name: "Temilola Adebayo",
    position: "Customer",
    bgColor: "#46467a",
    color: "white",
  },
];

const About = () => {
  return (
    <>
      <section id="aboutHero" className="py-5 position-relative">
        <div className="container py-md-3">
          <div className="row align-items-center">
            <div className="col-md-5" id="heroSide">
              <div
                className="shadow rounded-4 position-relative"
                id="aboutImg"
                style={{
                  height: "18rem",
                  backgroundImage: `url(${img})`,
                  backgroundSize: "cover",
                }}
              ></div>
            </div>

            <div className="col-md-6 offset-md-1 mt-5 mt-md-0" id="heroMain">
              <h1 className="h6 text-uppercase underlined d-inline-block">
                About Us
              </h1>
              <div className="my-4">
                <h2 className="display-6 heading">
                  We show you products we{" "}
                  <span
                    aria-hidden="true"
                    className="text-decoration-line-through"
                  >
                    think
                  </span>{" "}
                  <span className="fw-bold text-dark-pink">know</span> you'll
                  like
                </h2>
                <div className="h5 mt-3 text-secondary">
                  And we're usually right
                </div>
              </div>

              <p className="mb-4">
                In a rapidly-evolving technological era, we're committed to
                making shopping all about you. We pride ourselves in using
                advanced machine learning algorithms that recommend products we
                are confident you'll love.
              </p>

              <Button size="lg" color="pink" href="/shop">
                Woo! Let's go <i className="fa-solid fa-arrow-right-long"></i>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <section className="py-5" id="aboutFeatures">
        <div className="container py-3 py-md-5">
          <div className="row">
            <div className="col-md-5">
              <h1 className="h6 text-uppercase text-secondary underlined d-inline-block mb-4">
                AI-powered online store
              </h1>
              <h2 className="display-6 heading fw-bold mb-4 text-medium-green">
                We use data to better your shopping experience
              </h2>
            </div>
            <div className="col-md-5 offset-md-2">
              {features.map((feature, key) => (
                <div className="mb-3 d-flex align-items-start" key={key}>
                  <div>
                    <div className="feature-icon border rounded-circle ">
                      <div className="d-flex align-items-center justify-content-center w-100 h-100 fa-2x text-medium-green">
                        <i className={`fa-solid fa-` + feature.icon}></i>
                      </div>
                    </div>
                  </div>

                  <div className="ms-4">
                    <div className="h6 text-medium-green">{feature.title}</div>
                    <div>{feature.body}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <section
        className="py-5"
        id="testimonials"
        style={{ backgroundColor: "var(--light-purple)", overflowX: "hidden" }}
      >
        <div className="container">
          <div className="mb-5 text-center">
            <h1 className="display-6 heading">
              The best part - we're good at it
            </h1>
            <div className="h4 font-weight-400 text-secondary">
              At least, that's what people say
            </div>
          </div>

          {testimonials.map((testimonial, key) => (
            <div className="row py-5" key={key}>
              <div
                className={`col-md-6 ${
                  key === 0 ? "" : "offset-md-" + key * 2
                }`}
                key={key}
                style={{ "--card-bg-color": testimonial.bgColor }}
              >
                <div
                  className={`p-5 shadow-sm rounded-2 testimonial-card position-relative text-${testimonial.color}`}
                  key={key}
                  style={{ "--card-bg-color": testimonial.bgColor }}
                >
                  <div
                    className={`align-items-center d-flex font-weight-700 justify-content-center position-absolute rounded-circle testimonial-count bg-${testimonial.color}`}
                    style={{ color: testimonial.bgColor }}
                  >
                    {key + 1}
                  </div>
                  <div className="fa-solid fa-quote-left position-absolute testimonial-icon fa-6x"></div>
                  <div className="h5" style={{ lineHeight: 1.5 }}>
                    {testimonial.text}
                  </div>
                  <div className="mt-4">
                    <div className="h6 mb-0">{testimonial.name}</div>
                    <div className="small">
                      {" - "}
                      <i>{testimonial.position}</i>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </>
  );
};

export default About;
