import { useContext } from "react";
import AppStateContext from "../contexts/AppStateContext";

export default function useOrders() {
  const { orders } = useContext(AppStateContext);
  // useOrders 함수를 통해 바로 orders 로 꺼내 쓸 수 있다.
  return orders;
}
