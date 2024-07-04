import { Suspense } from "react"
import { Skeleton } from "antd";
import { NavLink, Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import Password from "./Password";
import NotFound from "../../pages/404";
import EditPaymentMethod from "./EditPaymentMethod";
import SyncTelegram from "./SyncTelegram";

function EditProfile() {
    const path = '.';

    return (
        <>
            {false ?
                <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
                    <Skeleton active paragraph={{ rows: 10 }} />
                </div>
                :
                <div className="block bg-white dark:bg-[#1b1e2b] shadow-regular dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-[10px] px-[25px]">
                    <nav className="">
                        <ul className="m-0 flex items-center text-sm min-lg:text-base min-lg:gap-2">
                            <li>
                                <NavLink
                                    className="relative block py-[18px] px-[12px] text-light dark:text-white60 [&.active]:text-primary after:[&.active]:bg-primary after:absolute after:bottom-0 ltr:after:left-0 rtl:after:right-0 after:w-full after:h-[2px] after:bg-transparent after:transition-all after:duration-300 after:ease-in-out after:invisible [&.active]:after:visible font-medium"
                                    to={`${path}/info`}
                                >
                                    ព័ត៌មាន​
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="relative block py-[18px] px-[12px] text-light dark:text-white60 [&.active]:text-primary after:[&.active]:bg-primary after:absolute after:bottom-0 ltr:after:left-0 rtl:after:right-0 after:w-full after:h-[2px] after:bg-transparent after:transition-all after:duration-300 after:ease-in-out after:invisible [&.active]:after:visible font-medium"
                                    to={`${path}/password`}
                                >
                                    ពាក្យសម្ងាត់
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="relative block py-[18px] px-[12px] text-light dark:text-white60 [&.active]:text-primary after:[&.active]:bg-primary after:absolute after:bottom-0 ltr:after:left-0 rtl:after:right-0 after:w-full after:h-[2px] after:bg-transparent after:transition-all after:duration-300 after:ease-in-out after:invisible [&.active]:after:visible font-medium"
                                    to={`${path}/payment`}
                                >
                                    ប័ណ្ណ​ទូទាត់
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    className="relative block py-[18px] px-[12px] text-light dark:text-white60 [&.active]:text-primary after:[&.active]:bg-primary after:absolute after:bottom-0 ltr:after:left-0 rtl:after:right-0 after:w-full after:h-[2px] after:bg-transparent after:transition-all after:duration-300 after:ease-in-out after:invisible [&.active]:after:visible font-medium"
                                    to={`${path}/sync-telegram`}
                                >
                                    Telegram 2FA
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
                            <Route path="sync-telegram" element={<SyncTelegram/>} />
                            <Route path="*" element={<NotFound/>} />
                        </Routes>
                    </Suspense>
                </div>
            }
        </>
    )
}

export default EditProfile