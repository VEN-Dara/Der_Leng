import UploadPackageImage from "./overview/UploadPackageImage"
import '../style.css';
import { Button, Col, Form, Input, Row, Select } from "antd";
import ServicePackageInput from "./overview/ServicePackageInput";
import SchedulePackageInput from "./overview/SchedulePackageInput";

function CreatePackage() {
    const [form] = Form.useForm();
    const handleSubmit = (value) => {
        console.log(value)
    }
    
    // :: Validate package service ::
    const validateService = (_, value) => {
        if (!value || value.length === 0) {
            return Promise.reject(new Error('សូមបញ្ចូលសេវាកម្ម និងតម្លៃ'));
        }
        return Promise.resolve();
    };
    return (
        <>
            <main className="bg-transparent px-8 pt-8 pb-12">
                <Row gutter={30} justify="center">
                    <Col xxl={12} md={24} xs={24} lg={14}>
                        <div className="bg-white p-4 rounded-4">
                            <h2 className="font-kantumruy-pro font-boldmb-0 text-xl font-kantumruy-pro font-semibold text-dark dark:text-white87">បង្កើតកញ្ចប់តំណើរកំសាន្ត</h2>
                            <p className="mt-4 font-kantumruy-pro text-base font-medium text-dark dark:text-white87">សូមបញ្ចូលរូបភាព</p>
                            <UploadPackageImage />
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
                                    <Input.TextArea placeholder="សូមបញ្ចូលព័ត៌មានលំអិត"  autoSize={{ minRows: 3, maxRows: 50 }} className="font-kantumruy-pro text-sm"/>
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
                                        <Option value="option1">Option 1</Option>
                                        <Option value="option2">Option 2</Option>
                                        <Option value="option3">Option 3</Option>
                                    </Select>
                                </Form.Item>
                                <hr/>
                                <Form.Item
                                    name="services"
                                    rules={[
                                        { required: true, message: 'សូមបញ្ចូលសេវាកម្ម និងតម្លៃ' }
                                    ]}
                                    className="font-kantumruy-pro text-base font-medium text-dark dark:text-white87"
                                >
                                    <ServicePackageInput/>
                                </Form.Item>
                                <hr/>
                                <Form.Item
                                    name="schedules"
                                    rules={[
                                        { required: true, message: 'សូមបញ្ចូលគោលដៅនៃតំណើរកំសាន្ត' }
                                    ]}
                                    className="font-kantumruy-pro text-base font-medium text-dark dark:text-white87"
                                >
                                    <SchedulePackageInput/>
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        className="w-full h-12 p-0 my-6 text-base font-kantumruy-pro font-medium"
                                        htmlType="submit"
                                        type="primary"
                                        size="large"
                                    >
                                        {false ? 'សូមរងចាំ...' : 'បង្កើត'}
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </main>
        </>
    )
}

export default CreatePackage