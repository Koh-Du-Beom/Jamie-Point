/*eslint-disable*/
import React, { useEffect, useState } from 'react';
import ActivityDropDownData from './ActivityDropDown.data';
import classes from './ActivityDropDown.module.css';

interface SelectedData {
	program : string;
	type : string;
	topic : string;
	point : number;

}

interface ActivityDropDownProps {
	selectedArea?: string;
	onDropDownChange : (selectedData : SelectedData) => void;
	dropDownData : SelectedData;
}

const ActivityDropDown: React.FC<ActivityDropDownProps> = ({selectedArea, onDropDownChange, dropDownData}) => {
  const [selectedProgram, setSelectedProgram] = useState<string>("");
  const [selectedType, setSelectedType] = useState<string>("");
  const [selectedTopic, setSelectedTopic] = useState<string>("");
  const [selectedPoint, setSelectedPoint] = useState<number>(0);

  const handleProgramChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    const selectedProgramValue = event.target.value;
    setSelectedProgram(selectedProgramValue);
    setSelectedType("");
    setSelectedTopic("");
    setSelectedPoint(0);

    onDropDownChange({
			program: selectedProgramValue,
			type: "",
			topic: "",
			point: 0,
    });
	};

	const handleTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedTypeValue = event.target.value;
		setSelectedType(selectedTypeValue);
		setSelectedTopic("");
		setSelectedPoint(0); 

		const foundType = ActivityDropDownData.find(area => area.area === selectedArea)
		?.programs.find(program => program.program === selectedProgram)
		?.types.find(type => type.type === selectedTypeValue);

		if (foundType && foundType.points && foundType.points.length === 1) {
			setSelectedPoint(foundType.points[0].point);
		}

		onDropDownChange({
			program: selectedProgram,
			type: selectedTypeValue,
			topic: "",
			point: foundType && foundType.points.length === 1 ? foundType.points[0].point : 0
		});
	};

	const handleTopicChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
		const selectedTopicValue = event.target.value;
		setSelectedTopic(selectedTopicValue);

		const foundPoint = ActivityDropDownData.find(area => area.area === selectedArea)
		?.programs.find(program => program.program === selectedProgram)
		?.types.find(type => type.type === selectedType)
		?.points.find(point => point.topic === selectedTopicValue);

		setSelectedPoint(foundPoint ? foundPoint.point : 0);
		onDropDownChange({
			program: selectedProgram,
			type: selectedType,
			topic: selectedTopicValue,
			point: foundPoint ? foundPoint.point : 0,
		});
	};

	useEffect(()=>{ 
		
		setSelectedProgram(dropDownData.program);
		setSelectedType(dropDownData.type);
		setSelectedTopic(dropDownData.topic);
		setSelectedPoint(dropDownData.point);
	}, [dropDownData])

	

  return (
		<div className={classes.container}>
			<div className={classes.wrapper}>
				{selectedArea && (
					<select value={selectedProgram ?? ''} onChange={handleProgramChange} name='selectedProgram'>
						<option value="">프로그램을 선택해주세요</option>
						{ActivityDropDownData.find(area => area.area === selectedArea)?.programs.map((program, index) => (
							<option key={index} value={program.program}>{program.program}</option>
						))}
					</select>
				)}
			</div>
			<div className={classes.wrapper}>
				{selectedProgram && (
					<select value={selectedType ?? ''} onChange={handleTypeChange} name='selectedType'>
						<option value="">종류를 선택해주세요</option>
						{ActivityDropDownData.find(area => area.area === selectedArea)
							?.programs.find(program => program.program === selectedProgram)
							?.types.map((type, index) => (
								<option key={index} value={type.type}>{type.type}</option>
						))}
					</select>
				)}
			</div>
			<div className={classes.wrapper}>
				{selectedType && (
					ActivityDropDownData.find(area => area.area === selectedArea)
						?.programs.find(program => program.program === selectedProgram)
						?.types.find(type => type.type === selectedType)
						?.points.length === 1 &&
						ActivityDropDownData.find(area => area.area === selectedArea)
						?.programs.find(program => program.program === selectedProgram)
						?.types.find(type => type.type === selectedType)
						?.points[0].topic === '' 
						? ""
						: <select value={selectedTopic ?? ''} onChange={handleTopicChange} name='selectedTopic'>
								<option value="">주제를 선택해주세요</option>
								{ActivityDropDownData.find(area => area.area === selectedArea)
									?.programs.find(program => program.program === selectedProgram)
									?.types.find(type => type.type === selectedType)
									?.points.map((point, index) => (
										<option key={index} value={point.topic}>{point.topic}</option>
								))}
							</select>
				)}
			</div>
		</div>
    
  );
};

export default ActivityDropDown;
