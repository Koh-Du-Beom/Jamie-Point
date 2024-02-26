const convertToBase64 = (file : File, callback: (base64String : string) => void) => {
	const reader = new FileReader();
	reader.onload = () => {
		callback(reader.result as string);
	};
	reader.readAsDataURL(file); 
};

export default convertToBase64;