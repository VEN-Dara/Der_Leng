import { Suspense, useEffect, useState } from "react"
import UseFetcher, { get } from "../../../hooks/useFetcher"
import { Skeleton } from "antd";
import List from "../../tour_package/overview/List";
import { NavLink, Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import Password from "./Password";
import NotFound from "../../pages/404";
import EditPaymentMethod from "./EditPaymentMethod";

function EditProfile() {
    const path = '.';
    const apiUrl = "/packages";
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
            {state.isLoading ?
                <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
                    <Skeleton active paragraph={{ rows: 10 }} />
                </div>
                :
                <div className="block bg-white dark:bg-[#1b1e2b] shadow-regular dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-[10px] px-[25px]">
                    {/* <h1 className="text-xl">Account setting</h1> */}
                    <nav className="">
                        <ul className="m-0 flex items-center gap-[22px]">
                            <li>
                                <NavLink
                                    className="relative block py-[18px] px-[5px] text-light dark:text-white60 [&.active]:text-primary after:[&.active]:bg-primary after:absolute after:bottom-0 ltr:after:left-0 rtl:after:right-0 after:w-full after:h-[2px] after:bg-transparent after:transition-all after:duration-300 after:ease-in-out after:invisible [&.active]:after:visible font-medium"
                                    to={`${path}/info`}
                                >
                                    Profile
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="relative block py-[18px] px-[5px] text-light dark:text-white60 [&.active]:text-primary after:[&.active]:bg-primary after:absolute after:bottom-0 ltr:after:left-0 rtl:after:right-0 after:w-full after:h-[2px] after:bg-transparent after:transition-all after:duration-300 after:ease-in-out after:invisible [&.active]:after:visible font-medium"
                                    to={`${path}/password`}
                                >
                                    Password
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="relative block py-[18px] px-[5px] text-light dark:text-white60 [&.active]:text-primary after:[&.active]:bg-primary after:absolute after:bottom-0 ltr:after:left-0 rtl:after:right-0 after:w-full after:h-[2px] after:bg-transparent after:transition-all after:duration-300 after:ease-in-out after:invisible [&.active]:after:visible font-medium"
                                    to={`${path}/payment`}
                                >
                                    Payment
                                </NavLink>
                            </li>
                        </ul>
                    </nav>
                    <Suspense
                        fallback={
                        <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
                            <Skeleton paragraph={{ rows: 20 }} />
                        </div>
                        }
                    >
                        <Routes>
                            <Route index element={<Profile />} />
                            <Route path="info" element={<Profile />} />
                            <Route path="password" element={<Password />} />
                            <Route path="payment" element={<EditPaymentMethod/>} />
                            <Route path="*" element={<NotFound/>} />
                        </Routes>
                    </Suspense>
                </div>
            }
        </>
    )
}

export default EditProfile