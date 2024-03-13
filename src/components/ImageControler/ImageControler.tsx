/*eslint-disable*/
import classes from './ImageControler.module.css';
import { useState, useRef, useEffect } from 'react';

interface ImageControlerProps {
	onImageChange : (file : File) => void;
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
			
			<button onClick={()=>setImgURL("")}>사진삭제</button>
			{/* 사진삭제해도 redux정보도 수정할 수 있게 수정하기 */}
		</>
	
		
	)
}

export default ImageControler;