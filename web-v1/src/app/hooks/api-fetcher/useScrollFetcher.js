// ==============================> React Framework <==============================
import { useState, useEffect } from "react";

// ==============================> Local <==============================
import { DataService } from "../../config/dataService/dataService";

/**
 * For auto fetching on scrolling
 * Usage, { data= [], page= 1, pageSize= 1, isLoading= true, isLoadMore= false } = useScrollFetcher({path});
 */
const useScrollFetcher = ({path, moreVariablePath=''}) => {
    const [state, setState] = useState({
        data: [],
        page: 1,
        pageSize: 1,
        isLoading: true,
        isLoadMore: false
    });

    useEffect(() => {
        setState({
            data: [],
            page: 1,
            pageSize: 1,
            isLoading: true,
            isLoadMore: false
        });

        fetchPackage(1)

    }, [])

    const fetchPackage = async (page) => {
        try {
            const response = await DataService.get(`${path}?page=${page}&${moreVariablePath}`);
            if (response.status === 200) {
                console.log("Add data..")
                setState(prevState => ({
                    ...prevState,
                    data: [...prevState.data, ...response.data.results],
                    isLoading: false,
                    isLoadMore: false,
                    pageSize: Math.ceil(response.data.count / 10)
                }));
            }

        } catch (error) {
            if (error.response.state === 404) {
                console.log("No more package")
            }
        }
    }

    const handleScroll = () => {
        if (!state.isLoadMore && window.scrollY + window.innerHeight >= document.documentElement.scrollHeight - 300) {
            setState(prevState => ({ ...prevState, page: prevState.page + 1, isLoadMore: true }))
            fetchPackage(state.page + 1)
        }
    };

    useEffect(() => {

        if (state.page < state.pageSize) {
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [state.page, state.pageSize]);

    return state
}

export default useScrollFetcher;