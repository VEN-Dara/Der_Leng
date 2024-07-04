import UploadPackageImage from "./overview/UploadPackageImage"
import '../style.css';
import { Button, Col, Form, Input, InputNumber, Row, Select, Spin, message } from "antd";
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

function CreatePackage() {
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
            breadcrumbName: 'បង្កើតកញ្ចប់ទេសចរណ៍',
        },
    ];
    const [form] = Form.useForm();
    const api = new ApiService();
    const navigate = useNavigate();
    const [setupData, setSetupData] = useState({
        categories: [],
        charge_types: []
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
        try {
            const response = await api.get('packages/create/setup');
            setSetupData(prevState => ({
                ...prevState,
                categories: response.data.categories,
                charge_types: response.data.charge_types
            }))
        } catch (error) {
            
        }
    }

    const createPackage = async (data) => {
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
            const response = await api.post('/packages/', data);
            if(response && response.data) {
                navigate(`/tour-guide/tour-package/${response.data.id}`)
            }
            // Load message success
            message.destroy();
            message.open({
                content: (
                    <span className="font-kantumruy-pro" >
                        កញ្ចប់ទេសចរណ៍បង្កើតបានជោគជ័យ📦🥰
                    </span>
                ),
                duration: 3, // duration in seconds
                type: 'success'
            });
        } catch (error) {
            console.log(error.response)
            message.error("error")
        } finally {
            setCreateLoading(false)
        }
    }

    const handleSubmit = async (value) => {
        const formData = new FormData();

        // disabled on loading
        if(createLoading) {
            return
        }
        console.log('start...')

        // Validate image
        if(images.length <= 0) {
            message.warning('សូមបញ្ចូលរូបភាពកញ្ចប់ទេសចរណ៍របស់អ្នក​ 📷')
            return
        }

        // :: form images list ::
        images.forEach((file, index) => {
            formData.append('images', file.originFileObj, file.name);
        });

        // :: form data from value ::
        for(const key in value) {
            if (key === 'services') {
                formData.append(key, JSON.stringify(value[key]));

            } else if (key === 'schedules') {
                const scheduleData = value[key].map(sc => {
                    return {
                        destination: sc.destination,
                        start_time: formatTime(sc.start_time),
                        end_time: formatTime(sc.end_time),
                    }
                })
                formData.append('schedules', JSON.stringify(scheduleData));

            } else {
                formData.append(key, value[key]);
            }
        }
        await createPackage(formData);
    }

    useEffect(() => {
        fetchCreatePackageSetup();
    }, [])
    return (
        <>
            <GlobalUtilityStyle>
                <div
                    style={{ backgroundImage: `url("${AdminBgLight}")` }}
                    className="bg-top bg-no-repeat"
                >
                    <PageHeader
                        routes={PageRoutes}
                        title="បង្កើតកញ្ចប់ទេសចរណ៍"
                        className="flex md:flex-col items-center justify-between px-8 ssm:px-[15px] pt-2 pb-6 bg-transparent font-kantumruy-pro"
                    />
                    <main className="min-h-[715px] lg:min-h-[580px] px-8 xl:px-[15px] pb-[30px] bg-transparent">
                        <Row gutter={30} justify="center">
                            <Col xxl={12} md={24} xs={24} lg={18}>
                                <Cards headless size="large" className="mb-[25px] ant-card-body-p-25">
                                    <p className="mt-4 font-kantumruy-pro text-base font-medium text-dark dark:text-white87">សូមបញ្ចូលរូបភាព</p>
                                    <UploadPackageImage setImages={setImages} />
                                    <Form name="login" form={form} onFinish={handleSubmit} layout="vertical">
                                        <Form.Item
                                            name='name'
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
                                        >
                                            <Input.TextArea placeholder="សូមបញ្ចូលព័ត៌មានលំអិត" autoSize={{ minRows: 3, maxRows: 50 }} className="font-kantumruy-pro text-sm" />
                                        </Form.Item>
                                        <Form.Item
                                            name='address'
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
                                        <Form.Item
                                            label={<span className="font-kantumruy-pro text-base font-medium text-dark dark:text-white87">តើអ្នកចង់គិតថ្លៃតាមវិធីមួយណា?</span>}
                                            name="charge_type"
                                            rules={[
                                                {
                                                    required: true,
                                                    message: 'សូមជ្រើសរើសប្រភេទគិតថ្លៃ!',
                                                },
                                            ]}
                                        >
                                            <Select placeholder='សូមជ្រើសរើសប្រភេទគិតថ្លៃ' className="font-kantumruy-pro text-sm h-[45px]">
                                                {
                                                    setupData.charge_types.map(charge_type => (
                                                        <Option key={charge_type.id} value={charge_type.id}>{charge_type.name}</Option>
                                                    ))
                                                }
                                            </Select>
                                        </Form.Item>
                                        <Form.Item
                                            name='max_people'
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
                                            name='num_day'
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
                                            initialValue={0}
                                            label={<span className="font-kantumruy-pro">ភាគរយបញ្ចុះតម្លៃ</span>}
                                            className="w-full [&>div>div>label]:text-base [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                                        >
                                            <InputNumber placeholder="ភាគរយបញ្ចុះតម្លៃ" className="font-kantumruy-pro text-sm h-[45px] w-full" />
                                        </Form.Item>
                                        <hr />
                                        <Form.Item
                                            name="services"
                                            rules={[
                                                { required: true, message: 'សូមបញ្ចូលសេវាកម្ម និងតម្លៃ' }
                                            ]}
                                            className="font-kantumruy-pro text-base font-medium text-dark dark:text-white87"
                                        >
                                            <ServicePackageInput />
                                        </Form.Item>
                                        <hr />
                                        <Form.Item
                                            name="schedules"
                                            rules={[
                                                { required: true, message: 'សូមបញ្ចូលគោលដៅនៃតំណើរកំសាន្ត' }
                                            ]}
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
                                                ) : 'បង្កើត'}
                                            </Button>
                                        </Form.Item>
                                    </Form>
                                </Cards>
                            </Col>
                        </Row>
                    </main>
                </div>
            </GlobalUtilityStyle>
        </>
    );
}

export default CreatePackage
