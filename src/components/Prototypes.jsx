// prototypes 를 map 돌면서 prototype 을 하나씩 꺼낸 뒤, 그것을 UI 로 만들어줌

import useActions from "../hooks/useActions";
import usePrototypes from "../hooks/usePrototypes";

// 크롬에서는 재생하려는 비디오의 소리를 기입해주어야 자동재생이 작동한다. (ex.muted)
export default function Prototypes() {
  // context 가져오기
  // const {prototypes} = useContext(AppStateContext);
  // 구조 분해할당{} 없이 바로 prototypes 그 자체로 가져옴
  const prototypes = usePrototypes();
  const { addToOrder } = useActions();

  return (
    <main>
      <div className="prototypes">
        {prototypes.map((prototype) => {
          const { id, thumbnail, title, price, desc, pieUrl } = prototype;
          // 상품 클릭시 Orders 에 추가
          const click = () => {
            addToOrder(id);
          };
          return (
            <div className="prototype" key={id}>
              {/* target 이 _BLANK 일 때 rel="noreferrer" 넣기 */}
              <a href={pieUrl} target="_BLANK" rel="noreferrer">
                <div
                  style={{
                    padding: "25px 0 33px 0",
                  }}
                >
                  <video
                    autoPlay
                    muted
                    loop
                    playsInline
                    className="prototype__artwork prototype__edit"
                    src={thumbnail}
                    style={{
                      objectFit: "contain",
                    }}
                  ></video>
                </div>
              </a>
              <div className="prototype__body">
                <div className="prototype__title">
                  <div
                    className="btn btn--primary float--right"
                    onClick={click}
                  >
                    <i className="icon icon--plus"></i>
                  </div>
                  {title}
                </div>
                <p className="prototype__price">${price}</p>
                <p className="prototype__desc">{desc}</p>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
