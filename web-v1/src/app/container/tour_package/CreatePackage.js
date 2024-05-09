import UploadPackageImage from "./overview/UploadPackageImage"
import '../style.css';
import { Col, Form, Input, Row, Select } from "antd";

function CreatePackage() {
    const [form] = Form.useForm();
    return (
        <>
            <main className="bg-transparent px-8 pt-8 pb-12">
                <Row gutter={30} justify="center">
                    <Col xxl={12} md={18} xs={24} lg={8}>
                        <div className="bg-white p-4 rounded-4">
                            <UploadPackageImage />
                        </div>
                    </Col>
                    <Col xxl={12} md={24} xs={24} lg={14}>
                        <div className="bg-white p-4 rounded-4">
                            <Form name="login" form={form} onFinish={() => { }} layout="vertical">
                                <Form.Item
                                    name='name'
                                    label="Package"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input package name!',
                                        },
                                    ]}
                                    className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                                >
                                    <Input placeholder="name" />
                                </Form.Item>
                                <Form.Item
                                    label="Description"
                                    name="description"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please input your description!',
                                        },
                                    ]}
                                >
                                    <Input.TextArea autoSize={{ minRows: 3, maxRows: 12 }} />
                                </Form.Item>
                                <Form.Item
                                    label="Select category"
                                    name="category"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Please select a category!',
                                        },
                                    ]}
                                >
                                    <Select>
                                        <Option value="option1">Option 1</Option>
                                        <Option value="option2">Option 2</Option>
                                        <Option value="option3">Option 3</Option>
                                    </Select>
                                </Form.Item>
                                <hr/>
                                <hr/>
                            </Form>
                        </div>
                    </Col>
                </Row>
            </main>
        </>
    )
}

export default CreatePackage