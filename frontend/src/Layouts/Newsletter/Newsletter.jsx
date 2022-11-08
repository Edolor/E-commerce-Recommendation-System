import "./_newsletter.scss";
import { useState } from "react";

function Newsletter(props) {

    const [inputValue, setInputValue] = useState();

    const handleChange = (e) => {
        setInputValue(e.target.value);
    }

    const handleSubmit = (e) => {
        e.preventDefault();
    }

    return (
        <aside className="newsletter">
            <div className="width-wrapper">
                <div className="newsletter__wrapper">
                    <div className="newsletter__left">
                        <h3 className="heading-3 margin-bottom-2">
                            Join our newsletter for ₦2,000 off
                        </h3>

                        <p className="color-black body-copy--big">
                        We'll email you a voucher worth ₦2,000 on your first order over
                        ₦40,000. By subscribing you agree to our Terms & Conditions
                        and Privacy & Cookies Policy.
                        </p>
                    </div> 

                    <div className="newsletter__right">
                        <form action="/newsletter" onSubmit={handleSubmit} className="newsletter__form">
                            <div className="newsletter__form-group">
                                <label htmlFor="email" className="newsletter__label hide">
                                    Email
                                </label>
                                <input type="email" value={inputValue} onChange={handleChange} placeholder="Enter email" className="newsletter__input"/>
                            </div>

                            <button className="bg-black color-white newsletter__button btn btn--bare">GO</button>
                        </form>
                    </div> 
                </div>
            </div>
        </aside>
    );  
}

export default Newsletter;