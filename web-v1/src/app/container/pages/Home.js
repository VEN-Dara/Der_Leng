// ==================================> Framework
import { Carousel } from "antd"
import { lazy, useEffect, useState } from "react"
import ProductCards from "../tour_package/overview/ProductCards";

// ==================================> Local
import CarCountrySide from '../../static/img/background/car_at_countryside.png'
import bg3 from '../../static/img/background/3.png'
import bg4 from '../../static/img/background/4.png'
import bg5 from '../../static/img/background/5.png'
import bg6 from '../../static/img/background/6.png'
import bg7 from '../../static/img/background/7.png'
import bg8 from '../../static/img/background/8.png'
import bg9 from '../../static/img/background/9.png'
import bg10 from '../../static/img/background/10.png'
import bg11 from '../../static/img/background/11.png'
import ApiService from "../../config/api/apiService";
const Products = lazy(() => import('../tour_package/Products'))
const FILE_ENDPOINT = process.env.REACT_APP_FILE_ENDPOINT;

function Home() {
    const product = {
        id: "b93a7cba-59be-4d84-87aa-142b999f90e3",
        name: "ដំណើរកំសាន្តកំពង់សោម",
        address: "ភូមិយស់ជោ ឃុំជើងរាស់ ស្រុកឧដុង្គ ក្រុងច្បារមន ខេត្ត កំពង់ស្ពឺ",
        amount_rating: 0,
        avg_rating: 0,
        default_price: 60,
        description: "...",
        favorite: false,
        is_close: false,
        max_people: 5,
        percentage_discount: "20.00",
        schedule_place: "Snorkeling Adventure",
        thumbnail: "/media/images/package_images/TB_Waterfall.jpg"
    }
    const api = new ApiService();
    const promotionBg = [CarCountrySide, bg3, bg4, bg8, bg9, bg5, bg6, bg7, bg9, bg10, bg11]
    const [state, setState] = useState({
        isLoading: false,
        data: []
    })

    const fetchProduct = async () => {
        try {
            setState(preSate => ({ ...preSate, isLoading: true }))
            const response = await api.get(`/packages/?ordering='-amount_rating,-avg_rating'`)
            setState(preState => ({
                ...preState,
                isLoading: true,
                data: response.data.results
            }))
        } catch (error) {

        } finally {
            setState(preSate => ({ ...preSate, isLoading: false }))
        }
    }

    useEffect(() => {
        fetchProduct();
    }, [])


    return (
        <>
            <div id="promotion" className="flex justify-center" >
                <div className="w-[96%]">
                    <Carousel autoplay speed={1000} autoplaySpeed={4000}>
                        {
                            (state.data.length > 0 ? state.data : promotionBg).map((bg, index) => (
                                <div key={index} className="h-40 min-md:h-64 min-lg:h-96 min-xl:h-[420px] relative flex items-center justify-start">
                                    <img className="w-full h-full object-cover absolute right-0.5 left-0.5" src={promotionBg[index]} alt="..." />
                                    {state.data.length > 0 && (
                                        <div className="w-[296px] bg-red-500 -mb-[30px] ml-8 hidden min-lg:block">
                                            <ProductCards product={bg} />
                                        </div>
                                    )}
                                </div>
                            ))
                        }
                    </Carousel>

                </div>
            </div>
            <Products />
        </>
    )
}

export default Home