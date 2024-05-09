// ==================================> Framework
import { lazy } from "react"

// ==================================> Plugin
import { Carousel } from "flowbite-react"

// ==================================> Local
const Products = lazy(() => import('../tour_package/Products'))


function Home() {
    return (
        <>
            <div id="promotion" className="flex justify-center" >
                {/* <div className="h-96 w-[96%] sm:h-64 xl:h-80 2xl:h-96"> */}
                <div className="h-40 w-[96%] min-md:h-64 min-lg:h-80 min-xl:h-96">
                    <Carousel pauseOnHover>
                        <img src="https://t3.gstatic.com/licensed-image?q=tbn:ANd9GcSHeS_vH7Pkhgfvohsiu0h1Q6bbFR2roHlk5ZYPVYQv3lz6LlxOFDbA1VnQDPph-U2Z" alt="..." />
                        <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Ankor_Wat_temple.jpg/1200px-Ankor_Wat_temple.jpg" alt="..." />
                        <img src="https://cdn-v2.theculturetrip.com/1200x675/wp-content/uploads/2021/05/2c4j3en-e1625485939998.webp" alt="..." />
                        <img src="https://helloangkor.com/wp-content/uploads/2019/03/IMG_20201204_150512-1.jpg" alt="..." />
                        <img src="https://a.cdn-hotels.com/gdcs/production186/d922/538d59d8-598c-4f93-be62-c1426024d73c.jpg" alt="..." />
                    </Carousel>
                </div>
            </div>
            <Products/>
        </>
    )
}

export default Home