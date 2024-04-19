import React from "react";

export default function LocalPage() {
  const data = [
    {
      price: "₹ 1500",
      src: "https://img.freepik.com/free-photo/people-concert-with-smoke-overlay-texture_53876-126856.jpg?t=st=1713545136~exp=1713548736~hmac=8b3cfc1db77e1f682a4fbb6f32ccfbc7fb2da4d17764c05e48d2969e7aefde3f&w=996",
      desc: "Arman malik concert at gachibowli",
    },
    {
      price: "",
      src: "https://img.freepik.com/free-photo/aerial-drone-view-big-square-sibiu-night-romania-old-city-centre-decorated_1268-19933.jpg?t=st=1713546810~exp=1713550410~hmac=28afdb7580580395bcda1f2e998cdc550c40dd4ea4383edaaf6c0abfcbcff687&w=1060",
      desc: "Nampally numaish exhibition",
    },
    {
      price: "₹ 299",
      src: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U3VuLCA1IE1heQ%3D%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00395225-zrxclvlsew-portrait.jpg",
      desc: "Blind Date carnival",
    },
    {
      price: "₹ 199",
      src: "https://assets-in.bmscdn.com/discovery-catalog/events/tr:w-400,h-600,bg-CCCCCC:w-400.0,h-660.0,cm-pad_resize,bg-000000,fo-top:l-text,ie-U3VuLCAyMSBBcHI%3D,fs-29,co-FFFFFF,ly-612,lx-24,pa-8_0_0_0,l-end/et00391835-mxhcptmvhk-portrait.jpg",
      desc: "Pottery workshop at house of gourmet",
    },
    {
      price: "₹ 50",
      src: "https://s3-ap-southeast-1.amazonaws.com/assets.limetray.com/assets/user_images/content_images/original/IMG-20230112-WA0008.jpg",
      desc: "Unlimited Pani Puri Challenge",
    },
  ];
  const culture = [
    {
      title: "🏦 Historical Significance",
      desc: "Hyderabad has a rich history dating back to the reign of the Nizams. The city was a major center for culture, art, and learning during their rule.",
    },
    {
      title: "🌍 Cultural Fusion",
      desc: "The culture of Hyderabad is a blend of traditional South Indian Telugu culture and Persian influences due to its Mughal and Nizam heritage.",
    },
    {
      title: "🗣 Language",
      desc: "The primary language spoken in Hyderabad is Telugu, but Urdu is also widely spoken, especially in older parts of the city.",
    },
    {
      title: "🍲 Cuisine",
      desc: "Hyderabad is famous for its unique cuisine, particularly Hyderabadi biryani, which is a flavorful rice dish cooked with meat or vegetables, aromatic spices, and saffron.",
    },
    {
      title: "🎨 Arts and Crafts",
      desc: "The city is known for its rich tradition of arts and crafts, including intricate Bidri metalwork, pearl and glass bangles, and traditional Hyderabadi garments like Khara Dupattas.",
    },
    {
      title: "🎉 Festivals",
      desc: "Hyderabad celebrates various festivals with great enthusiasm, including Diwali, Eid-ul-Fitr, and Bonalu. The city also hosts the annual Deccan Festival, showcasing the region's cultural heritage.",
    },
    {
      title: "🏰 Monuments and Landmarks",
      desc: "Hyderabad is home to iconic landmarks like the Charminar, Golconda Fort, and Qutb Shahi Tombs, which reflect the city's architectural and historical significance.",
    },
    {
      title: "📚 Literature and Education",
      desc: "The city has a strong literary tradition with notable poets, writers, and scholars contributing to Telugu and Urdu literature. Hyderabad is also home to prestigious educational institutions like Osmania University.",
    },
    {
      title: "🎧 Music and Dance",
      desc: "Classical forms of music and dance, such as Carnatic music and Kuchipudi dance, have flourished in Hyderabad. The city also embraces modern music genres, making it a vibrant hub for music lovers.",
    },
    {
      title: "☕ Hospitality",
      desc: "Hyderabadis are known for their warm hospitality and welcoming nature. The city's teahouses and Irani cafes are popular gathering spots where people come together to socialize and enjoy the local cuisine.",
    },
  ];

  return (
    <>
      <div className="m-4">
        <div className="flex items-center justify-around">
          <div className="max-w-[40vw]">
            <p className="font-bold text-5xl">
              Discover Local Vibes—Where Culture Comes Alive
            </p>
            <p className="mt-4 text-xl">
              Whether you're into art exhibitions, local music scenes, or
              cultural festivals, TrippZy connects you with like-minded locals
              passionate about celebrating community spirit. Dive into a world
              of vibrant events happening right in your neighborhood—join us and
              embrace the local culture.
            </p>
          </div>
          <div>
            <img src="../local-events.png" />
          </div>
        </div>
        <div className="mt-4 mx-4">
          <p className="font-bold text-2xl top-cities-wrappe">
            Events in <span className="">Hyderabad</span>
          </p>
          <hr
            style={{
              backgroundColor: "#ffbb58",
              width: "75px",
              height: "2px",
              border: "none",
              marginTop: "0px",
              marginLeft: "0px",
              marginBottom: "20px",
            }}
          />
          <div className="mx-4 flex justify-center gap-8">
            {data.map((evnt, index) => {
              return (
                <div
                  key={index}
                  className="bg-gray-200 hover:scale-105 w-[15rem] rounded-lg p-2"
                >
                  <div className="event-price font-bold">
                    <p>{evnt.price}</p>
                  </div>
                  <img
                    className="w-[15rem] h-[15rem] rounded-lg"
                    src={evnt.src}
                  />
                  <p className="text-black text-center">{evnt.desc}</p>
                </div>
              );
            })}
          </div>
          <div className="mt-5">
            <p className="text-2xl font-bold top-cities-wrappe">
              Points to note about <span className="">Hyderabad</span>
            </p>
            <hr
              style={{
                backgroundColor: "#ffbb58",
                width: "75px",
                height: "2px",
                border: "none",
                marginTop: "0px",
                marginLeft: "0px",
                marginBottom: "20px",
              }}
            />
            <div className="mx-8">
              {culture.map((cul, index) => {
                return (
                  <div key={index}>
                    <p className="text-lg mb-2">
                      <span className="font-bold text-xl">{cul.title}: </span>
                      {cul.desc}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
