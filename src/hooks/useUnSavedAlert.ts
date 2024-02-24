import { useEffect } from "react";

const useUnSavedAlert = (isValueChanged : boolean) => {
	useEffect(() => {
		const handleBeforeUnload = (e: BeforeUnloadEvent) => {
			if (isValueChanged) {
				// 기본 메시지를 설정합니다. 대부분의 브라우저는 이 메시지를 무시하고 자체 메시지를 표시합니다.
				const message = '변경사항이 저장되지 않았습니다. 페이지를 벗어나시겠습니까?';
				e.returnValue = message; // 표준에 따른 방법
				return message; // 일부 브라우저를 위한 구식 방법
			}
		};

		window.addEventListener('beforeunload', handleBeforeUnload);
	
		// 컴포넌트 언마운트 시 이벤트 리스너 해제
		return () => {
			window.removeEventListener('beforeunload', handleBeforeUnload);
		};
	}, [isValueChanged]); // 저장되지 않았다면, 저장되지 않았다는 경고 메세지 주기
};

export default useUnSavedAlert;