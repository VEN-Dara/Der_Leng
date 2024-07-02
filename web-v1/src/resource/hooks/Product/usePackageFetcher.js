// ==============================> React Framework <==============================
import { useState, useEffect } from "react";

// ==============================> Local <==============================
import { DataService } from "../../config/dataService/dataService";
import { useLocation, useParams } from "react-router-dom";

const usePackageFetcher = () => {
    const [state, setState] = useState({
        packages: [],
        current: 1,
        pageSize: 1,
        isLoader: true,
        isLoadMore: false
    });

    // ================================> URL Params <================================
    const { search } = useLocation();
    const params = new URLSearchParams(search);
    const searchQuery = params.get("search_query") || '';
    const sortBy = params.get('sort_by') || '-amount_rating,-avg_rating';

    const {category} = useParams()

    console.log(state)

    useEffect(() => {
        setState({
            packages: [],
            current: 1,
            pageSize: 1,
            isLoader: true,
            isLoadMore: false
        });

        fetchPackage(1)

    }, [category, searchQuery, sortBy])

    const fetchPackage = async (page) => {
        try {
            const response = await DataService.get(`/packages/?page=${page}&category_name=${category || ''}&search=${searchQuery}&ordering=${sortBy}`);
            if (response.status === 200) {
                console.log("Add data..")
                setState(prevState => ({
                    ...prevState,
                    packages: [...prevState.packages, ...response.data.results],
                    isLoader: false,
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
            setState(prevState => ({ ...prevState, current: prevState.current + 1, isLoadMore: true }))
            fetchPackage(state.current + 1)
        }
    };

    useEffect(() => {

        console.log(`Start Scroll ${state.current < state.pageSize}`)
        if (state.current < state.pageSize) {
            console.log("Start Scroll")
            window.addEventListener('scroll', handleScroll);
        }

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [state.current, state.pageSize]);

    return state
}

const getPackageById = ({id}) => {
    const [state, setState] = useState({
        product: {},
        isLoader: true
    })

    const packageFetcher = async () => {
        try {
            const response = await DataService.get(`/packages/${id}`);
            console.log(response)
            if(response.status === 200) {
                setState(prevState => ({
                    ...prevState,
                    product: response.data,
                    isLoader: false,
                }))
            }
        } catch (error) {
            if(error.response.state === 404) {
                setState(prevState => ({
                    ...prevState,
                    isLoader: false,
                }))

            }
        }
    };

    useEffect(() => {
        packageFetcher();

    }, [id])

    return state;

}

export {usePackageFetcher, getPackageById};