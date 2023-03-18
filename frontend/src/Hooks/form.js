export const formControlClass = "bg-transparent border-end-0 border-start-0 border-top-0 form-control form-control-lg ps-0 rounded-0 shadow-none";

/**
	 * Validate an input field
	 * @param {Event} event
	 */
export function validateFormInput(event, setValid) {
	const input = event.target;
	if (input.value !== "" && !input.checkValidity()) {
		input.classList.add("is-invalid");
		setValid(false);
	} else {
		input.classList.remove("is-invalid");
		setValid(true);
	}
}

export const InvalidError = ({ valid, error }) => {
	if (valid) return;
	return <div className="invalid-feedback">{error}</div>;
};

/**
 * Get the names and values of form fields
 * @param {FormData} form 
 */
export function getFormData(fd) {

	const data = {};
	fd.forEach((value, name) => {
		data[name] = value;
	})

	return data;
}