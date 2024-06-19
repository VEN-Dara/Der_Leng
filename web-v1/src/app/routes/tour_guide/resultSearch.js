import { useLocation } from "react-router-dom"
import NotFound from "../../container/pages/404"
import Product from "../../container/tour_package/Products"

function ResultSearch() {
    const {search} = useLocation()
    const params = new URLSearchParams(search)
    const searchQuery = params.get("search_query") || '';

    return <> { searchQuery ? <Product/> : <NotFound/>} </>
}

export default ResultSearch