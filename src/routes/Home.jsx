import { UseAuth } from "../context/authContext.jsx";
import CardUser from "../components/Card";
import MenuFunciones from "../components/MenuFunciones/index.jsx";
import { Carousel } from "flowbite-react";

function Home() {
  const { user } = UseAuth();

  
  return (
    <main className="bg-white h-full w-full text-center flex justify-between">
      <div className="border shadow-2xl shadow-primary w-full m-10 ">
        {user != null ? (
          <div className="flex flex-col justify-between h-full">
            <div className="flex grow items-center gap-6 p-4">
              <CardUser user={user} />
              <MenuFunciones user={user} />
            </div>
            <div className="h-40">
              <Carousel>
                <img src="tira16-6ByN.jpg" alt="" />
                <img src="1.jpg" alt="" />
                <img src="tira16-6ByN.jpg" alt="" />
                <img src="2.jpg" alt="" />
                <img src="tira16-6ByN.jpg" alt="" />
                <img src="5.jpg" alt="" />
                <img src="5ByN.jpg" alt="" />
              </Carousel>
            </div>
          </div>
        ) : (
          <></>
        )}
      </div>

      {/* <Aside /> */}
    </main>
  );
}

export default Home;
