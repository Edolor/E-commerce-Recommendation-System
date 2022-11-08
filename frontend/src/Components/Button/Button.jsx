import arrow from "../../Assets/images/arrow_outward.svg";
import doubleArr from "../../Assets/images/double_arrow.svg";

function ArrowButton({ link, text, addon="", classes="btn__arrow bg-primary color-white", double=false }) {

    return (
        <a href={link} className={classes + " " + addon}>
            <span>{text}</span>
            <img src={double === false ? arrow : doubleArr} alt="Arrow icon"/>
        </a>
    );
}

export { ArrowButton };