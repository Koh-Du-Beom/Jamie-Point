import React, { useEffect, useRef } from "react";
import classes from "./FinalCheckModal.module.css";
import { useSelector } from "react-redux";
import { RootState } from "../../stores/redux/store";
import axios from "axios";
import saveIcon from "../../assets/saveIcon.png";

interface ModalProps {
  closeModal: () => void;
}

const FinalCheckModal: React.FC<ModalProps> = ({ closeModal }) => {

	const userInfo = useSelector((state: RootState) => state.userInfo);
  const activityInfo = useSelector((state: RootState) => state.activityInfo);
	const psInfo = useSelector((state: RootState) => state.psInfo);

  const handleDocumentation = async () => {

		const finalInfo = {
			name: userInfo.name,
			grade: userInfo.grade,
			major: userInfo.major,
			studentNumber: userInfo.studentNumber,
			phoneNumber: userInfo.phoneNumber,
			email: userInfo.email,
			bankAccount: userInfo.bankAccount,
			bankName: userInfo.bankName,
			bankBookImg: userInfo.bankBookImg,
			idCardImg: userInfo.idCardImg,
			signImg: userInfo.signImg,
			activities: activityInfo.activities,
			swCoreInfo: activityInfo.swCoreInfo,
			swCooperationInfo: activityInfo.swCooperationInfo,
			swValueInfo: activityInfo.swValueInfo,
			swConvergenceInfo: activityInfo.swConvergenceInfo,
			totalAwards: activityInfo.totalAwards,
			totalPoint: activityInfo.totalPoint,
			psInfos: psInfo,
		};
		
		console.log(psInfo);
		
		const body = JSON.stringify(finalInfo);
		console.log(body); // 최종 전송될 데이터 확인

    try {
      const response = await axios.post("http://localhost:8080/zs", body, {
        headers: {
          "Content-Type": "application/json",
        },
        responseType: "blob", // 응답을 blob으로 받기 위해 설정
      });

      if (response) {
        console.log(response.data);
      }
      // 파일 다운로드 처리
      const url = window.URL.createObjectURL(new Blob([response.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "jamiepoint.hwp"); // 다운로드할 파일명 설정
      document.body.appendChild(link);
      link.click();

      if (link.parentNode) {
        link.parentNode.removeChild(link);
      } else {
        document.body.removeChild(link); // parentNode가 없는 예외적인 상황을 대비
      }
      alert("문서 변환이 성공적으로 완료되었습니다!");
      closeModal();
    } catch (error) {
      console.error("문서화 실패 : ", error);
      alert("문서 변환에 실패하였습니다!");
      closeModal();
    }
  };

  const modalRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        modalRef.current &&
        !modalRef.current.contains(event.target as Node)
      ) {
        closeModal();
      }
    };

    document.body.style.overflow = "hidden";
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.body.style.overflow = "unset";
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [closeModal]);

  return (
    <div>
      <div className={classes.modalOverlay} onClick={closeModal}>
        <div
          className={classes.modalContent}
          onClick={(e) => e.stopPropagation()}
          ref={modalRef}
        >
          <div className={classes.big_title}>내용을 확인해주세요!</div>
          <div className="tableContainer">
            <table>
              <thead>
                <tr>
                  <th></th>
                  <th>활동 수</th>
                  <th>활동 점수</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>SW핵심역량</td>
                  <td>{activityInfo.swCoreInfo.activityCount}</td>
                  <td>{activityInfo.swCoreInfo.totalPoint}</td>
                </tr>
                <tr>
                  <td>SW산학협력·창업역량</td>
                  <td>{activityInfo.swCooperationInfo.activityCount}</td>
                  <td>{activityInfo.swCooperationInfo.totalPoint}</td>
                </tr>
                <tr>
                  <td>SW가치확산역량</td>
                  <td>{activityInfo.swValueInfo.activityCount}</td>
                  <td>{activityInfo.swValueInfo.totalPoint}</td>
                </tr>
                <tr>
                  <td>SW융합역량</td>
                  <td>{activityInfo.swConvergenceInfo.activityCount}</td>
                  <td>{activityInfo.swConvergenceInfo.totalPoint}</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className={classes.saveButtonContainer}>
            <button
              className={classes.saveButton}
              onClick={handleDocumentation}
            >
              <img src={saveIcon} alt="saveIcon" />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FinalCheckModal;
