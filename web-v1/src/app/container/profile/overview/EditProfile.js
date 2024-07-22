import { Suspense, useState } from "react"
import { Skeleton } from "antd";
import { NavLink, Route, Routes } from "react-router-dom";
import Profile from "./Profile";
import Password from "./Password";
import NotFound from "../../pages/404";
import EditPaymentMethod from "./EditPaymentMethod";
import SyncTelegram from "./SyncTelegram";

function EditProfile() {
    const [settingTab, setSettingTab] = useState('info');
    
    const isActive = (name) => {
        return settingTab === name;
    };

    return (
        <>
            {false ? (
                <div className="bg-white dark:bg-white10 p-[25px] rounded-[10px]">
                    <Skeleton active paragraph={{ rows: 10 }} />
                </div>
            ) : (
                <div className="block bg-white dark:bg-[#1b1e2b] shadow-regular dark:shadow-[0_5px_30px_rgba(1,4,19,.60)] rounded-[10px] px-[0px] min-lg:px-[25px]">
                    <nav className="">
                        <ul className="m-0 flex items-center text-sm min-lg:text-base min-lg:gap-2">
                            <li>
                                <div
                                    className={`relative block py-[18px] px-[12px] text-light dark:text-white60 ${
                                        isActive('info') ? 'text-primary after:bg-primary after:visible' : 'after:bg-transparent after:invisible'
                                    } after:absolute after:bottom-0 ltr:after:left-0 rtl:after:right-0 after:w-full after:h-[2px] after:transition-all after:duration-300 after:ease-in-out xxs:text-[10px] xs:text-sm text-base font-medium`}
                                    onClick={() => setSettingTab('info')}
                                >
                                    ព័ត៌មាន​
                                </div>
                            </li>
                            <li>
                                <div
                                    className={`relative block py-[18px] px-[12px] text-light dark:text-white60 ${
                                        isActive('password') ? 'text-primary after:bg-primary after:visible' : 'after:bg-transparent after:invisible'
                                    } after:absolute after:bottom-0 ltr:after:left-0 rtl:after:right-0 after:w-full after:h-[2px] after:transition-all after:duration-300 after:ease-in-out xxs:text-[10px] xs:text-sm text-base font-medium`}
                                    onClick={() => setSettingTab('password')}
                                >
                                    ពាក្យសម្ងាត់
                                </div>
                            </li>
                            <li>
                                <div
                                    className={`relative block py-[18px] px-[12px] text-light dark:text-white60 ${
                                        isActive('payment') ? 'text-primary after:bg-primary after:visible' : 'after:bg-transparent after:invisible'
                                    } after:absolute after:bottom-0 ltr:after:left-0 rtl:after:right-0 after:w-full after:h-[2px] after:transition-all after:duration-300 after:ease-in-out xxs:text-[10px] xs:text-sm text-base font-medium`}
                                    onClick={() => setSettingTab('payment')}
                                >
                                    ប័ណ្ណ​ទូទាត់
                                </div>
                            </li>
                            <li>
                                <div
                                    className={`relative block py-[18px] px-[12px] text-light dark:text-white60 ${
                                        isActive('sync-telegram') ? 'text-primary after:bg-primary after:visible' : 'after:bg-transparent after:invisible'
                                    } after:absolute after:bottom-0 ltr:after:left-0 rtl:after:right-0 after:w-full after:h-[2px] after:transition-all after:duration-300 after:ease-in-out xxs:text-[10px] xs:text-sm text-base font-medium`}
                                    onClick={() => setSettingTab('sync-telegram')}
                                >
                                    Telegram 2FA
                                </div>
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
                        {settingTab === 'info' && <Profile />}
                        {settingTab === 'password' && <Password />}
                        {settingTab === 'payment' && <EditPaymentMethod />}
                        {settingTab === 'sync-telegram' && <SyncTelegram />}
                    </Suspense>
                </div>
            )}
        </>
    );
}


export default EditProfile