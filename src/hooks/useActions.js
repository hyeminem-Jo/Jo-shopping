import { useContext } from "react";
import AppStateContext from "../contexts/AppStateContext";

// 이번엔 prototypes 처럼 상태 자체가 아닌, 상태를 변경하는 함수를 return
export default function useActions() {
  const { addToOrder, remove, removeAll } = useContext(AppStateContext);
  // usePrototypes 함수를 통해 바로 prototypes 로 꺼내 쓸 수 있다.
  return { addToOrder, remove, removeAll };
}
