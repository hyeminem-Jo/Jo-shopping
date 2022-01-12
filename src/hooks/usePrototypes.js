import { useContext } from "react";
import AppStateContext from "../contexts/AppStateContext";

export default function usePrototypes() {
  const { prototypes } = useContext(AppStateContext);
  // usePrototypes 함수를 통해 바로 prototypes 로 꺼내 쓸 수 있다.
  return prototypes;
}
