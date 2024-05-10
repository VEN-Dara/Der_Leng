import { useEffect, useState } from "react"
import { DataService } from "../../config/dataService/dataService"
import { useParams } from "react-router-dom"
import Home from "../../container/pages/Home"
import NotFound from "../../container/pages/404"

function Category() {
    const [state, setState] = useState({
        isExist: false,
        isLoader: true
    })

    const { category } = useParams()

    useEffect(() => {
        const findCategory = async () => {
          try {
            const response = await DataService.get(`/categories?name=${category}`)
            if(response.status === 200 && response.data.count !== 0) {
                setState(prevState => ({
                    ...prevState,
                    isLoader: false,
                    isExist: true
                }))
            }
          } catch (error) {
            console.log("Error category..")
          }
        } 
    
        findCategory();
        
    }, [])

    return <> { state.isExist ? <Home/> : <NotFound/>} </>
}

export default Category