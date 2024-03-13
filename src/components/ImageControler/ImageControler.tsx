/*eslint-disable*/
import classes from './ImageControler.module.css';
import { useState, useRef, useEffect } from 'react';

interface ImageControlerProps {
	onImageChange : (file : File | null) => void;
	data : string;
}

const ImageControler : React.FC<ImageControlerProps> = ({onImageChange, data}) => {

	const [imgURL, setImgURL] = useState<string>("");
	const fileInputRef = useRef<HTMLInputElement>(null);

	const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		
    if (event.target.files && event.target.files[0]) {
			const selectedFile = event.target.files[0];
			onImageChange(selectedFile);
			const fileUrl = URL.createObjectURL(selectedFile);
			setImgURL(fileUrl); 
    } else {
			setImgURL("");
    }
	};

	const handleImageContainerClick = () => {
		fileInputRef.current?.click();
	}

	const handleDelete = () => {
		if(imgURL){
			setImgURL("");
			onImageChange(null);
			
		}
	} // 굳이 있어야하나?

	useEffect(() => {
		setImgURL(data);
	}, [data]);

	return (
		<>
			<div className={`${classes.imageContainer} ${imgURL ? classes.solidBorder : null}`} onClick={handleImageContainerClick}>
				{!imgURL? (
					<div className={classes.uploadPrompt}>
						<div className={classes.plusIcon}>+</div>
						<div>사진을 입력해주세요</div>
					</div> 
				): <img src={imgURL} alt='Uploaded'/>}
				<input 
					ref={fileInputRef}
					type="file" 
					accept="image/*"
					onChange={handleFileChange}/>
			</div>
			<button onClick={handleDelete}>사진삭제</button>
		
		</>
	
		
	)
}

export default ImageControler;