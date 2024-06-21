import { Button, Form, Input, InputNumber, Space, TimePicker } from "antd"
import UilTrashAlt from '@iconscout/react-unicons/icons/uil-trash-alt';
import MapTrashAlt from '@iconscout/react-unicons/icons/uil-map';
import dayjs from "dayjs";

function SchedulePackageInput() {
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
                <MapTrashAlt className='w-4 h-4 text-primary'/>
                <p className="mt-4 font-kantumruy-pro text-base font-medium text-dark dark:text-white87">គោលដៅ</p>
            </header>
            {/* <Form
                name="dynamic_form_nest_item"
                onFinish={handleSubmit}
                onValuesChange={handleFormChange}
                style={{ maxWidth: 800 }}
                autoComplete="off"
            > */}
                <Form.List name="schedules">
                    {(fields, { add, remove }) => (
                        <>
                            {fields.map(({ key, name, ...restField }) => (
                                <div key={key} className="flex items-center gap-4 sm:flex-wrap">
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'destination']}
                                        rules={[{ required: true, message: 'សូមបញ្ចូលកន្លែងគោលដៅ' }]}
                                        style={{ width: 300 }}
                                        className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                                    >
                                        <Input placeholder="កន្លែងគោលដៅ" className="font-kantumruy-pro text-sm h-[45px]" />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'start_time']}
                                        rules={[{ required: true, message: 'សូមបញ្ចូលម៉ោងចាប់ផ្ដើម' }]}
                                        className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                                    >
                                        <TimePicker
                                            placeholder="ម៉ោងចាប់ផ្ដើម"
                                            className="font-kantumruy-pro text-sm h-[45px]"
                                        />
                                    </Form.Item>
                                    <Form.Item
                                        {...restField}
                                        name={[name, 'end_time']}
                                        rules={[{ required: true, message: 'សូមបញ្ចូលម៉ោងបញ្ចប់' }]}
                                        className="[&>div>div>label]:text-sm [&>div>div>label]:text-dark dark:[&>div>div>label]:text-white60 [&>div>div>label]:font-medium"
                                    >
                                        <TimePicker
                                            placeholder="ម៉ោងបញ្ចប់"
                                            className="font-kantumruy-pro text-sm h-[45px]"
                                        />
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
                            ))}
                            <Form.Item>
                                <Button type="dashed" className="font-kantumruy-pro font-medium text-sm" onClick={() => add()} block>
                                    បន្ថែមគោលដៅ
                                </Button>
                            </Form.Item>
                        </>
                    )}
                </Form.List>
            {/* </Form> */}
        </>
    )
}

export default SchedulePackageInput