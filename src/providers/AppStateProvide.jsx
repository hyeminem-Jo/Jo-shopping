import { useState, useCallback } from "react";
import AppStateContext from "../contexts/AppStateContext";

// provider 에 value 를 넣어줄 수 있는데, 이때 그냥 넣어주는 것이 아닌 객체{} 형태로 넣어준다. AppStateProvider 안에서 udeState 를 활용해서 상태를 가지고 있도록 해준다.
// orders 의 상태 뿐만 아닌, 같이 바뀌는 prototypes 의 상태 또한 가지고 있어야 한다.
const AppStateProvider = ({ children }) => {
  // prototypes 데이터들을 전부 useState 의 초기값으로 상태에 넣어준다.
  const [prototypes] = useState([
    {
      id: "pp-01",
      title: "Kids-story",
      artist: "Thomas Buisson",
      desc: "This prototype was made with ProtoPie, the interactive prototyping tool for all digital products.",
      thumbnail:
        "https://prototype-shop.s3.ap-northeast-2.amazonaws.com/thumbnails/Kids-story_1.mp4",
      price: 10,
      pieUrl: "https://cloud.protopie.io/p/8a6461ad85",
    },
    {
      id: "pp-02",
      title: "mockyapp",
      artist: "Ahmed Amr",
      desc: "This prototype was made with ProtoPie, the interactive prototyping tool for all digital products.",
      thumbnail:
        "https://prototype-shop.s3.ap-northeast-2.amazonaws.com/thumbnails/mockyapp.mp4",
      price: 20,
      pieUrl: "https://cloud.protopie.io/p/27631ac9d5",
    },
    {
      id: "pp-03",
      title: "macOS Folder Concept",
      artist: "Dominik Kandravý",
      desc: "Folder concept prototype by Dominik Kandravý.",
      thumbnail:
        "https://prototype-shop.s3.ap-northeast-2.amazonaws.com/thumbnails/macOS_Folder_Concept_-_Folder_concept.mp4",
      price: 30,
      pieUrl: "https://cloud.protopie.io/p/acde5ccdf9",
    },
    {
      id: "pp-04",
      title: "Translator",
      artist: "Tony Kim",
      desc: "This prototype was made with ProtoPie, the interactive prototyping tool for all digital products.",
      thumbnail:
        "https://prototype-shop.s3.ap-northeast-2.amazonaws.com/thumbnails/Translator.mp4",
      price: 40,
      pieUrl: "https://cloud.protopie.io/p/b91edba11d",
    },
    {
      id: "pp-05",
      title: "In-car voice control",
      artist: "Tony Kim",
      desc: "This prototype was made with ProtoPie, the interactive prototyping tool for all digital products.",
      thumbnail:
        "https://prototype-shop.s3.ap-northeast-2.amazonaws.com/thumbnails/In-car_voice_control.mp4",
      price: 50,
      pieUrl: "https://cloud.protopie.io/p/6ec7e70d1a",
    },
    {
      id: "pp-06",
      title: "The Adventures of Proto",
      artist: "Richard Oldfield",
      desc: `Made exclusively for Protopie Playoff 2021
                    Shout up if you get stuck!
                    For the full experience. View in the Protopie App.
                    #PieDay #PlayOff #ProtoPie`,
      thumbnail:
        "https://prototype-shop.s3.ap-northeast-2.amazonaws.com/thumbnails/The_Adventures_of_Proto.mp4",
      price: 60,
      pieUrl: "https://cloud.protopie.io/p/95ee13709f",
    },
    {
      id: "pp-07",
      title: "Sunglasses shop app",
      artist: "Mustafa Alabdullah",
      desc: "This prototype was made with ProtoPie, the interactive prototyping tool for all digital products.",
      thumbnail:
        "https://prototype-shop.s3.ap-northeast-2.amazonaws.com/thumbnails/sunglasses_shop_app.mp4",
      price: 70,
      pieUrl: "https://cloud.protopie.io/p/6f336cac8c",
    },
    {
      id: "pp-08",
      title: "Alwritey—Minimalist Text Editor",
      artist: "Fredo Tan",
      desc: `This minimalist text editor prototype was made with ProtoPie by Fredo Tan.
                    ---
                    Inspired by Writty, a simple writing app by Carlos Yllobre. Try out Writty at https://writtyapp.com.
                    ---
                    ProtoPie is an interactive prototyping tool for all digital products.
                    ---
                    Learn more about ProtoPie at https://protopie.io.`,
      thumbnail:
        "https://prototype-shop.s3.ap-northeast-2.amazonaws.com/thumbnails/minimalist-text-editor.mp4",
      price: 80,
      pieUrl: "https://cloud.protopie.io/p/946f88f8d3",
    },
    {
      id: "pp-09",
      title: "Voice search for TV",
      artist: "Tony Kim",
      desc: "This prototype was made with ProtoPie, the interactive prototyping tool for all digital products.",
      thumbnail:
        "https://prototype-shop.s3.ap-northeast-2.amazonaws.com/thumbnails/TV.mp4",
      price: 90,
      pieUrl: "https://cloud.protopie.io/p/60ee64cda0",
    },
    {
      id: "pp-10",
      title: "Finance App Visual Interaction 2.0",
      artist: "Arpit Agrawal",
      desc: "This prototype was made with ProtoPie, the interactive prototyping tool for all digital products.",
      thumbnail:
        "https://prototype-shop.s3.ap-northeast-2.amazonaws.com/thumbnails/Credit_Card_App.mp4",
      price: 90,
      pieUrl:
        "https://cloud.protopie.io/p/09ce2fdf84/21?ui=true&mockup=true&touchHint=true&scaleToFit=true&cursorType=touch",
    },
    {
      id: "pp-11",
      title: "Whack-a-mole",
      artist: "Changmo Kang",
      desc: "This prototype was made with ProtoPie, the interactive prototyping tool for all digital products.",
      thumbnail:
        "https://prototype-shop.s3.ap-northeast-2.amazonaws.com/thumbnails/Whack_a_mole.mp4",
      price: 90,
      pieUrl: "https://cloud.protopie.io/p/ab796f897e",
    },
    {
      id: "pp-12",
      title: "Voice Note",
      artist: "Haerin Song",
      desc: `Made by Haerin Song
                    (Soda Design)`,
      thumbnail:
        "https://prototype-shop.s3.ap-northeast-2.amazonaws.com/thumbnails/Voice_note_with_sound_wave.mp4",
      price: 90,
      pieUrl: "https://cloud.protopie.io/p/7a0d6567d2",
    },
  ]);
  const [orders, setOrders] = useState([]);

  // 선택된 상품(id) order 에 추가
  // orders 라는 '상태' 에 addToOrder() 가 실행되면 아래와 같이 데이터가 추가되도록 함
  // 클릭된 아이디가 들어가고, 한 번 누르면 quantity(수량) 가 1, 두번 누르면 2가 되는 형식의 데이터 구조
  // [{id, quantity: 1}]
  const addToOrder = useCallback((id) => {
    // setOrder() 함수 안에 데이터가 아닌 함수를 넣음
    // 상태(orders) 를 받아 새로운 상태(orders) 를 return 해줌
    setOrders((orders) => {
      // 클릭시 이미 id 가 있는 상태면 quantity(수량) 만 올려주고, id 가 없는 상태(이전에 클릭x) 라면 새로 추가
      // => id 의 여부를 판단
      // => order.id 와 [인자로 들어간 id] 가 같은지 판단
      const finded = orders.find((order) => order.id === id);
      // find() : 주어진 판별 함수를 만족하는 첫 번째 요소의 값을 반환하고, 그런 요소가 없다면 undefined를 반환

      // id 가 없는, 즉 클릭된 적 없는 상품일 때
      if (finded === undefined) {
        // 이전의 orders 를 분해해서 넣고 (전개연산자, concat() 과 같이 배열을 합침) 뒤에는 새롭게 넣는 데이터들로, id 는 인자로 들어온 id 이고 qauntity 는 1인 값을 새로 넣으면서 데이터를 새롭게 return 한다.
        return [...orders, { id, quantity: 1 }];
      } else {
        // 같은 id 가 이미 존재하는, 즉 이전에 한 번 클릭된 상품일 경우 수량 +1
        // orders 안의 order 들을 전부 map() 으로 돌아 [클릭된 order 와 id 가 같은 order] 를 찾아 (quantity + 1) 을 해주고, 나머지 order 들은 그대로 반환된 채 새롭게 배열이 return 된다.
        // ** map() 을 돌면 새로운 orders 객체가 되기 때문에 같은 레퍼런스를 갖고 있지 않는다. (참조x)
        return orders.map(order => {
          if (order.id === id) {
            return {
              id,
              quantity: order.quantity + 1,
            };
          } else {
            // id 가 다른 order 들은 그대로 반환
            return order;
          }
        });
      }
    });
  }, []);
  // 선택된(id) 상품 order 에서 삭제
  const remove = useCallback((id) => {
    setOrders(orders => {
      // filter: 조건문에 부합하는 요소들을 새 배열로 반환 
      // 클릭한 상품 id 를 제외한 나머지 상품들만 다시 반환
      return orders.filter((order) => order.id !== id);
    })
  }, []);
  // 모든 상품 order 에서 삭제
  const removeAll = useCallback(() => {
    setOrders([]); // 빈 배열로 반환 (order 요소 모두 삭제)
  }, []);

  return (
    <AppStateContext.Provider
      value={{
        prototypes,
        orders,
        addToOrder,
        remove,
        removeAll,
      }}
    >
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
