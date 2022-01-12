import { useMemo } from "react";
import useActions from "../hooks/useActions";
import useOrders from "../hooks/useOders";
import usePrototypes from "../hooks/usePrototypes";

export default function Orders() {
  const orders = useOrders();
  // orders 데이터에 썸네일 자료(thumbnail) 가 없기 때문에, orders 의 id 값을 이용해 prototypes 데이터에서 찾아와야 한다.
  const prototypes = usePrototypes();
  const { remove, removeAll } = useActions();

  // 전체 상품 총 가격
  const totalPrice = useMemo(() => {
    return orders
      .map((order) => {
        const { id, quantity } = order;
        const prototype = prototypes.find((p) => p.id === id);
        return prototype.price * quantity;
      })
      .reduce((l, r) => l + r, 0);
    // 차례로 return 되는 요소들을 전부 합쳐서 하나의 값으로 도출
  }, [orders, prototypes]);
  // 언제 다시 totalPrice() 로 다시 계산이 되는가?
  // >> orders 의 변화에 따라 totalPrice() 함수 실행
  // (prtotypes 는 해당 프로젝트에서 바꿀일이 없어서 orders 만)

  // 상품 목록이 비었을 때 empty
  if (orders.length === 0) {
    return (
      <aside>
        <div className="empty">
          <div className="title">You don't have any orders</div>
          <div className="subtitle">Click on a + to add an order</div>
        </div>
      </aside>
    );
  }

  // Orders 영역은 크게 두 가지로 나뉜다.
  // 1. 아이템 당 클릭한 수량과 가격 표시
  // 2. 전체 토탈 가격
  return (
    <aside>
      {/* 목록 */}
      <div className="order">
        <div className="body">
          {orders.map((order) => {
            const { id } = order;
            // prototypes 에서 썸네일 데이터 찾기
            // > prototypes 요소의 id 중 클릭한 order 의 id 와 같은 요소 찾기
            const prototype = prototypes.find((p) => p.id === id);
            const click = () => {
              remove(id);
            };
            return (
              <div className="item" key={id}>
                <div className="img">
                  {/* orders 데이터에 썸네일 자료(thumbnail) 가 없기 때문에, orders 의 id 값을 이용해 prototypes 데이터에서 찾아와야 한다. */}
                  {/* 상품 사진 */}
                  <video src={prototype.thumbnail} />
                </div>
                <div className="content">
                  <p className="title">
                    {/* 상품 이름, 상품 수량 */}
                    {prototype.title} * {order.quantity}
                  </p>
                </div>
                <div className="action">
                  <p className="price">
                    {/* 상품 가격 (상품 가격 x 상품 수량 = 총 상품 가격) */}${" "}
                    {prototype.price * order.quantity}
                  </p>
                    {/* 항목을 지울 수 있는 버튼 */}
                    <button className="btn btn--link" onClick={click}>
                      <i className="icon icon--cross"></i>
                    </button>
                </div>
              </div>
            );
          })}
        </div>
        {/* 상품 전체 가격 */}
        <div className="total">
          <hr />
          <div className="item">
            <div className="content">Total</div>
            <div className="action">
              <div className="price">$ {totalPrice}</div>
            </div>
            <button className="btn btn--link" onClick={removeAll}>
              <i className="icon icon--delete" />
            </button>
          </div>
          <button className="btn btn--secondary" style={{width: "100%", marginTop: 10}}>Checkout</button>
        </div>
      </div>
    </aside>
  );
}
