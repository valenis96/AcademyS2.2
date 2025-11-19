
// Exercise 6
const validate = () => {
	let error = 0;
	const inputElements = []

	// Get the input fields
	const fName = document.getElementById("fName");
	const fLastN = document.getElementById("fLastN");
	const fEmail = document.getElementById("fEmail");
	const fPassword = document.getElementById("fPassword");
	const fAddress = document.getElementById("fAddress");
	const fPhone = document.getElementById("fPhone");

	inputElements.push(fName, fLastN, fEmail, fPassword, fAddress, fPhone);
	
	// Get the error elements
	// const errorName = document.getElementById("errorName");
	// const errorEmail = document.getElementById("errorEmail");  
	
	inputElements.forEach(el => {if ( el.value.trim() == "" || el.value == "") error++} )
	 
	// if(fName.value.trim() == ""){
	// 	error++;
	// }

	// if(fEmail.value == ""){
	// 	error++;
	// }
	 
	if(error>0){
		alert("Please fill in all required fields.");
	}else{
		alert("Form submitted successfully");
	}

}

const validateInput = (el) => {
	const onlyLetters = /^[\p{L}\s]+$/u;
	const onlyNumbers = /^[0-9]+$/;
	const hasLettersAndNumbers = /^(?=.*[A-Za-z])(?=.*\d).+$/;
	const isEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	if (el.value.trim() == "" || el.value == "" || el.value.length  <=3) el.classList.add('is-invalid')
	else  {
		switch (el.id) {
			case 'fName':
			case 'fLastN':
				regexTestValidation(onlyLetters, el);
				break;
			case 'fPhone':
				regexTestValidation(onlyNumbers, el);
				break;
			case 'fPassword':
				regexTestValidation(hasLettersAndNumbers, el);
				break;		
			case 'fEmail':
				regexTestValidation(isEmail, el);
				break;
			default:
				el.classList.remove('is-invalid')
				break;
		}
	}
}

const regexTestValidation = (regex, el) => {
	!regex.test(el.value) ? el.classList.add('is-invalid') :  el.classList.remove('is-invalid')
}