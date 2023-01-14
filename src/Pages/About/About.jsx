import background from "./../../Assets/images/hero@2x.jpg";


function About(props) {
    const myStyle = {
        backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.6), rgba(0, 0, 0, 0.6)), url(${background})`,
        height: "100vh",
        width: "100%",
        backgroundSize: "cover",
        backgroundRepeat: "no-repeat"
    }

    return (
        <section style={myStyle} className="bg-grey--light-3 color-white flex gap-2 justify-center items-center flex-col">
            <h1 className="heading-1 text-center">ABOUT THE ALLYWAY LLC</h1>

            <p className="text-5xl text-center mt-3 font-light max-w-7xl mx-auto">
            We believe a muscle is like a car. If you want it to run well
early in the morning, you have to warm it up.
            </p>
        </section>
    );
}

export default About;