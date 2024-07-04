import { useEffect, useState } from "react"
import UseFetcher, { get } from "../../../hooks/useFetcher"
import { Empty, Skeleton } from "antd";
import List from "../../tour_package/overview/List";
import { useSelector } from "react-redux";

function FavoriteProductList() {
    const apiUrl = "/packages"
    const [state, setState] = useState({
        isLoading: false,
        data: [],
        next: null,
        page: 1,
    })
    const user = useSelector(state => state.userReducer.user)
    const useFetcher = new UseFetcher();


    useEffect(() => {
        if (user && user.id) {
            useFetcher.get(setState, `${apiUrl}?favorites=${user.id}`);
        }
    }, [user]);

    return (
        <>
        { state.isLoading ? 
        <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
            <Skeleton active paragraph={{ rows: 10 }} />
        </div>
        : state.data.length > 0 ?
        <div className="block bg-white dark:bg-[#1b1e2b] shadow-regular dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-[10px] p-[25px]">
            <h1 className="text-xl">Favorites List</h1>
            <List state={{packages:state.data, isLoader:state.isLoading, isLoadMore:false}}/>
        </div> 
        :
        <div className="block bg-white dark:bg-[#1b1e2b] shadow-regular dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-[10px] p-[25px]">
        <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </div>
        }
        </>
    )
}

export default FavoriteProductList