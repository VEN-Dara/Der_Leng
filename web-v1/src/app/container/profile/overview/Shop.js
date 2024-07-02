import { useEffect, useState } from "react"
import UseFetcher from "../../../hooks/useFetcher"
import { Skeleton } from "antd";
import List from "../../tour_package/overview/List";

import React, { Suspense } from 'react';
import { Row, Col } from 'antd';
import { Cards } from '../../../../resource/components/cards/frame/cards-frame';
import { Button } from "../../../../resource/components/buttons/buttons";
import OverviewDataList from "./OverviewDatalist";
import { Link } from "react-router-dom";

function Shop() {
    const apiUrl = "/packages"
    const [state, setState] = useState({
        isLoading: false,
        data: [],
        next: null,
        page: 1,
    })
    const user = JSON.parse(localStorage.getItem("user")) || { id: null, username: null };
    const useFetcher = new UseFetcher();

    useEffect(() => {
        useFetcher.get(setState, `${apiUrl}?favorites=${user.id}`)
    }, [])

    return (
        <>
            <Row gutter={25}>
                <Col xxl={12} xs={24}>
                    <Suspense
                        fallback={
                            <Cards headless className="mb-[25px]">
                                <Skeleton active />
                            </Cards>
                        }
                    >
                        <OverviewDataList />
                    </Suspense>
                </Col>
            </Row>
            {state.isLoading ?
                <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
                    <Skeleton active paragraph={{ rows: 10 }} />
                </div>
                :
                <div className="block bg-white dark:bg-[#1b1e2b] shadow-regular dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-[10px] p-[25px]">
                    <div className="flex w-full justify-between">
                        <h1 className="text-xl">Tour packages</h1>
                        <Link to='/new'>
                            <Button size="default" type="primary" className="text-sm font-semibold h-10 px-6 rounded-6">
                                Create 📦
                            </Button>
                        </Link>
                    </div>
                    <List state={{ packages: state.data, isLoader: state.isLoading, isLoadMore: false }} />
                </div>
            }
        </>
    )
}

export default Shop