
const isValidName =  (name : string) => {
	const regex = /^[가-힣a-zA-Z]+$/;
	return regex.test(name);
}

const isValidAccountNumber = (accountNumber : string) : boolean => {
	const regex = /^[\d\s-]{8,16}$/;
  return regex.test(accountNumber);
}

const isValidEmail = (email : string) : boolean => {
	const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
	return regex.test(email)
}

const isValidPhoneNumber = (phoneNumber : string) : boolean => {
	const regex = /^01[016789]-\d{3,4}-\d{4}$|^\d{2,3}-\d{3,4}-\d{4}$/;
	const regex2 = /^\d+$/;
	return regex.test(phoneNumber) || (regex2.test(phoneNumber));
}

const isValidStudentNumber = (studentNumber : string) : boolean => {
	const regex = /^\d+$/;
	return regex.test(studentNumber);
}

export {isValidName, isValidAccountNumber, isValidEmail, isValidPhoneNumber, isValidStudentNumber };
