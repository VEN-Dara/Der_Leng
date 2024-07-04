import UploadPackageImage from "./overview/UploadPackageImage"
import '../style.css';
import { Button, Col, Form, Input, InputNumber, Row, Select, Skeleton, Spin, message } from "antd";
import ServicePackageInput from "./overview/ServicePackageInput";
import SchedulePackageInput from "./overview/SchedulePackageInput";
import { GlobalUtilityStyle } from "../styled";
import { Cards } from "../../../resource/components/cards/frame/cards-frame";
import { PageHeader } from '../../../resource/components/page-headers/page-headers';
import AdminBgLight from '../../../resource/static/img/admin-bg-light.png';
import ApiService from '../../config/api/apiService'
import { useEffect, useState } from "react";
import formatTime from "../../utility/format-function/time";
import { useNavigate } from "react-router-dom";

function UpdatePackage({ id }) {
    const PageRoutes = [
        {
            path: '/tour-guide',
            breadcrumbName: 'ទំព័រដើម',
        },
        {
            path: '/tour-guide/tour-package',
            breadcrumbName: 'កញ្ចប់ទេសចរណ៍',
        },
        {
            path: '',
            breadcrumbName: 'កែប្រែកញ្ចប់ទេសចរណ៍',
        },
    ];
    const { Option } = Select;
    const [form] = Form.useForm();
    const api = new ApiService();
    const navigate = useNavigate();
    const [setupData, setSetupData] = useState({
        categories: [],
        charge_types: [],
        packageData: null,
        setupLoading: false
    })
    const [createLoading, setCreateLoading] = useState(false)
    const [images, setImages] = useState([])

    // :: Validate package service ::
    const validateService = (_, value) => {
        if (!value || value.length === 0) {
            return Promise.reject(new Error('សូមបញ្ចូលសេវាកម្ម និងតម្លៃ'));
        }
        return Promise.resolve();
    };

    const validateGoogleMapsUrl = (_, value) => {
        if (!value || /^(https:\/\/(www.google.com\/maps\/|maps.app.goo.gl\/)).*$/.test(value)) {
            return Promise.resolve();
        }
        return Promise.reject(new Error('សូមបញ្ចូល Google Maps URL ដែលត្រឹមត្រូវ.'));
    };

    const fetchCreatePackageSetup = async () => {
        setSetupData(prevState => ({
            ...prevState,
            setupLoading: true
        }))

        // Start fetching
        try {
            const response = await api.get('packages/create/setup');
            setSetupData(prevState => ({
                ...prevState,
                categories: response.data.categories,
                charge_types: response.data.charge_types
            }))

            const packageRes = await api.get(`packages/${id}`);
            setSetupData(prevState => ({
                ...prevState,
                packageData: packageRes.data
            }))
        } catch (error) {
            message.destroy()
        } finally {
            setSetupData(prevState => ({
                ...prevState,
                setupLoading: false
            }))
        }
    }

    const updatePackage = async (data) => {
        try {
            setCreateLoading(true);
            message.open({
                content: (
                    <span className="font-kantumruy-pro" >
                        📦🛸កញ្ចប់របស់អ្នកកំពុងបង្ហោះ✈️ ...
                    </span>
                ),
                duration: 60, // duration in seconds
                type: 'loading'
            });
            const response = await api.put(`/packages/${id}/`, data);
            if (response && response.data && !window.location.pathname.startsWith('/tour-guide/tour-package/')) {
                navigate(`/tour-guide/tour-package/${response.data.id}`)
            }
            // Load message success
            message.destroy();
            message.open({
                content: (
                    <span className="font-kantumruy-pro" >
                        ព័ត៌មានកញ្ចប់ទេសចរណ៍កែប្រែបានជោគជ័យ📦🥰
                    </span>
                ),
                duration: 3, // duration in seconds
                type: 'success'
            });
        } catch (error) {
            message.destroy()
            console.log(error.response)
            message.error("error")
        } finally {
            setCreateLoading(false)
        }
    }

    const handleSubmit = async (value) => {
        const formData = new FormData();
        console.log(value)
        // disabled on loading
        if (createLoading) {
            return
        }
        console.log('start...')

        // :: form images list ::
        images.forEach((file, index) => {
            formData.append('images', file.originFileObj, file.name);
        });

        // :: form data from value ::
        for (const key in value) {
            if (key === 'services' && value[key] && value[key].length > 0) {
                formData.append(key, JSON.stringify(value[key]));

            } else if (key === 'schedules' && value[key] && value[key].length > 0) {
                const scheduleData = value[key].map(sc => {
                    return {
                        destination: sc.destination,
                        start_time: formatTime(sc.start_time),
                        end_time: formatTime(sc.end_time),
                    }
                })
                formData.append('schedules', JSON.stringify(scheduleData));

            } else if( key === 'services' || key === 'schedules') {
                continue;
            } else {
                formData.append(key, value[key]);
            }
        }
        await updatePackage(formData);
    }

    useEffect(() => {
        fetchCreatePackageSetup();
    }, [])
    return (
        <>
            <GlobalUtilityStyle>
                {setupData.setupLoading ? (
                    <Skeleton avatar paragraph={{ rows: 4 }} />
                ) : setupData.packageData && setupData.categories.length > 0 && setupData.charge_types.length > 0 ? (
                <Cards headless size="large" className="mb-[25px] ant-card-body-p-25">
                    <p className="mt-4 font-kantumruy-pro text-base font-medium text-dark dark:text-white87">សូមបញ្ចូលរូបភាព</p>
                    <UploadPackageImage setImages={setImages} />
                    <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
                        <Form.Item
                            name='name'
                            initialValue={setupData.packageData.name}
                            label={<span className="font-kantumruy-pro">ឈ្មោះ</span>}
                            rules={[
                                {
                                    required: true,
                                    message: 'សូមបញ្ចូលឈ្មោះកញ្ចប់!',
                                },
                            ]}
                            className="[&>div>div>label]:text-base [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                        >
                            <Input placeholder="សូមបញ្ចូលឈ្មោះ" className="font-kantumruy-pro text-sm h-[45px]" />
                        </Form.Item>
                        <Form.Item
                            label={<span className="font-kantumruy-pro text-base font-medium text-dark dark:text-white87">ព័ត៌មានលំអិត </span>}
                            name="description"
                            initialValue={setupData.packageData.description}
                        >
                            <Input.TextArea placeholder="សូមបញ្ចូលព័ត៌មានលំអិត" autoSize={{ minRows: 3, maxRows: 50 }} className="font-kantumruy-pro text-sm" />
                        </Form.Item>
                        <Form.Item
                            name='address'
                            initialValue={setupData.packageData.address}
                            label={<span className="font-kantumruy-pro">អាសយដ្ឋាន</span>}
                            rules={[
                                {
                                    required: true,
                                    message: 'សូមបញ្ចូលអាសយដ្ឋាន!',
                                },
                            ]}
                            className="[&>div>div>label]:text-base [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                        >
                            <Input placeholder="សូមបញ្ចូលអាសយដ្ឋាន" className="font-kantumruy-pro text-sm h-[45px]" />
                        </Form.Item>
                        <Form.Item
                            name='location_url'
                            initialValue={setupData.packageData.location_url}
                            label={<span className="font-kantumruy-pro">តំណភ្ជាប់ទីតាំង</span>}
                            rules={[
                                { required: true, message: 'សូមបញ្ចូលតំណភ្ជាប់ទីតាំង!', },
                                { validator: validateGoogleMapsUrl },
                            ]}
                            className="[&>div>div>label]:text-base [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                        >
                            <Input placeholder="សូមបញ្ចូលតំណភ្ជាប់ទីតាំង" className="font-kantumruy-pro text-sm h-[45px]" />
                        </Form.Item>
                        <Form.Item
                            label={<span className="font-kantumruy-pro text-base font-medium text-dark dark:text-white87">ប្រភេទ</span>}
                            name="category"
                            initialValue={setupData.packageData.category.id}
                            rules={[
                                {
                                    required: true,
                                    message: 'សូមជ្រើសរើសព័ត៌មានប្រភេទ!',
                                },
                            ]}
                        >
                            <Select placeholder='សូមជ្រើសរើសប្រភេទ' className="font-kantumruy-pro text-sm h-[45px]">
                                {
                                    setupData.categories.map(category => (
                                        <Option key={category.id} value={category.id}>{category.name}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item>

                        {/* =================================>> Charge type <<==================================== */}
                        {/* <Form.Item
                            label={<span className="font-kantumruy-pro text-base font-medium text-dark dark:text-white87">តើអ្នកចង់គិតថ្លៃតាមវិធីមួយណា?</span>}
                            name="charge_type"
                            initialValue={setupData.packageData.charge_type.id}
                            rules={[
                                {
                                    required: true,
                                    message: 'សូមជ្រើសរើសប្រភេទគិតថ្លៃ!',
                                },
                            ]}
                        >
                            <Select defaultValue={setupData.packageData.charge_type.id} placeholder='សូមជ្រើសរើសប្រភេទគិតថ្លៃ' className="font-kantumruy-pro text-sm h-[45px]">
                                {
                                    setupData.charge_types.map(charge_type => (
                                        <Option key={charge_type.id} value={charge_type.id}>{charge_type.name}</Option>
                                    ))
                                }
                            </Select>
                        </Form.Item> */}
                        <Form.Item
                            name='max_people'
                            initialValue={setupData.packageData.max_people}
                            label={<span className="font-kantumruy-pro">តើកញ្ចប់អ្នក អាចដាក់មនុស្សច្រើនបំផុតប៉ុន្មានអ្នក?</span>}
                            rules={[
                                {
                                    required: true,
                                    message: 'សូមបញ្ចូលចំនួនមនុស្ស!',
                                },
                            ]}
                            className=" w-full [&>div>div>label]:text-base [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                        >
                            <InputNumber placeholder="សូមបញ្ចូលចំនួនមនុស្ស" className="font-kantumruy-pro text-sm h-[45px] w-full" />
                        </Form.Item>
                        <Form.Item
                            name='num_days'
                            initialValue={setupData.packageData.num_days}
                            label={<span className="font-kantumruy-pro">ចំនួនថ្ងៃ​តំណើរកំសាន្ត</span>}
                            rules={[
                                {
                                    required: true,
                                    message: 'សូមបញ្ចូលចំនួនថ្ងៃ!',
                                },
                            ]}
                            className="w-full [&>div>div>label]:text-base [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                        >
                            <InputNumber placeholder="សូមបញ្ចូលចំនួនថ្ងៃ" className="font-kantumruy-pro text-sm h-[45px] w-full" />
                        </Form.Item>
                        <Form.Item
                            name='max_daily_bookings'
                            initialValue={setupData.packageData.max_daily_bookings}
                            label={<span className="font-kantumruy-pro">តើកញ្ចប់នេះ អាចទទួលកក់ប៉ុន្មានក្នុងថ្ងៃតែមួយ?</span>}
                            rules={[
                                {
                                    required: true,
                                    message: 'សូមបញ្ចូលចំនួនដង!',
                                },
                            ]}
                            className="w-full [&>div>div>label]:text-base [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                        >
                            <InputNumber placeholder="សូមបញ្ចូលចំនួនថ្ងៃ" className="font-kantumruy-pro text-sm h-[45px] w-full" />
                        </Form.Item>
                        <Form.Item
                            name='percentage_discount'
                            initialValue={setupData.packageData.percentage_discount}
                            label={<span className="font-kantumruy-pro">ភាគរយបញ្ចុះតម្លៃ</span>}
                            className="w-full [&>div>div>label]:text-base [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                        >
                            <InputNumber placeholder="ភាគរយបញ្ចុះតម្លៃ" className="font-kantumruy-pro text-sm h-[45px] w-full" />
                        </Form.Item>
                        <hr />
                        <Form.Item
                            name="services"
                            // rules={[
                            //     { required: true, message: 'សូមបញ្ចូលសេវាកម្ម និងតម្លៃ' }
                            // ]}
                            className="font-kantumruy-pro text-base font-medium text-dark dark:text-white87"
                        >
                            <ServicePackageInput />
                        </Form.Item>
                        <hr />
                        <Form.Item
                            name="schedules"
                            // rules={[
                            //     { required: true, message: 'សូមបញ្ចូលគោលដៅនៃតំណើរកំសាន្ត' }
                            // ]}
                            className="font-kantumruy-pro text-base font-medium text-dark dark:text-white87"
                        >
                            <SchedulePackageInput />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                className="w-full h-12 p-0 my-6 text-base font-kantumruy-pro font-medium"
                                htmlType="submit"
                                type="primary"
                                size="large"
                            // disabled={createLoading}
                            >
                                {createLoading ? (
                                    <>
                                        <Spin size="small" />
                                        <span className="text-primary ml-2">សូមរងចាំ...✈️</span>

                                    </>
                                ) : 'រក្សារទុក'}
                            </Button>
                        </Form.Item>
                    </Form>
                </Cards>
                ) : (
                    // <Skeleton avatar paragraph={{ rows: 4 }} />
                    <>heree</>
                )
            }
            </GlobalUtilityStyle>
        </>
    );
}

export default UpdatePackage
