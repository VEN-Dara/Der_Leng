import { useEffect, useState } from "react"
import { DataService } from "../../config/dataService/dataService"
import { useLocation, useParams } from "react-router-dom"
import NotFound from "../../container/pages/404"
import Product from "../../container/ecommerce/product/Products"

function ResultSearch() {
    const {search} = useLocation()
    const params = new URLSearchParams(search)
    const searchQuery = params.get("search_query") || ''

    console.log(searchQuery)

    return <> { searchQuery ? <Product/> : <NotFound/>} </>
}

export default ResultSearch