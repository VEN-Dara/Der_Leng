import { Button, Form, Input, InputNumber, Space } from "antd"
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import UilUsdCircle from '@iconscout/react-unicons/icons/uil-usd-circle';

function ServicePackageInput() {
    const handleSubmit = (value) => {
        console.log(value)
    }
    const handleFormChange = (changedValues, allValues) => {
        console.log('Changed values:', changedValues);
        console.log('All values:', allValues);
    };
    return (
        <>
            <header className="flex items-center gap-1">
                <UilUsdCircle className='w-4 h-4 text-primary' />
                <p className="mt-4 font-kantumruy-pro text-base font-medium text-dark dark:text-white87">សេវាកម្ម</p>
            </header>
            {/* <Form
                name="dynamic_form_nest_item"
                onFinish={handleSubmit}
                onValuesChange={handleFormChange}
                style={{ maxWidth: 800 }}
                autoComplete="off"
            > */}
                <Form.List name="services" className='full'>
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <div key={key} className="flex flex-col min-lg:flex-row items-center min-lg:gap-4">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'detail']}
                                        rules={[{ required: true, message: 'សូមបញ្ចូលឈ្មោះសេវាកម្ម' }]}
                                        // style={{ width: 300 }}
                                        className="min-w-full min-lg:min-w-[350px] [&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                                    >
                                        <Input placeholder="ឈ្មោះសេវាកម្ម" className="font-kantumruy-pro text-sm h-[45px]" />
                                    </Form.Item>
                                    <div className="w-full flex justify-between min-lg:justify-normal min-lg:gap-4">
                                        <Form.Item
                                            {...restField}
                                            name={[name, 'price']}
                                            rules={[{ required: true, message: 'សូមបញ្ចូលតម្លៃ' }]}
                                            className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                                        >
                                            <InputNumber placeholder="តម្លៃ" className="w-full min-lg:w-[100px] font-kantumruy-pro text-sm h-[45px]" />
                                        </Form.Item>
                                        <Button
                                            onClick={() => remove(name)}
                                            className="bg-gray-100 dark:bg-white10 h-[36px] mb-6 px-[11px] text-body dark:text-white60 border-none shadow-none hover:bg-danger-transparent hover:text-danger"
                                            to="#"
                                            size="default"
                                            type="danger"
                                            shape="circle"
                                            transparented
                                        >
                                            <UilTrashAlt className="w-[14px] h-[14px]" />
                                        </Button>

                                    </div>
                                </div>
                            ))}
                            <Form.Item>
                                <Button type="dashed" className="font-kantumruy-pro font-medium text-sm" onClick={() => add()} block>
                                    បន្ថែមសេវាកម្ម
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            {/* </Form> */}
        </>
    )
}

export default ServicePackageInput