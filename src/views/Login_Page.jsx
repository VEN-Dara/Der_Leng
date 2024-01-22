import '../App.css';
import FormLongin from '../component/FormLongin';
import ImageLogin from '../component/ImageLogin';


const Login_Page = () => {
  return (
    <div className='min-h-screen bg-gray-100 text-gray-900 flex justify-center'>
      <div className='max-w-screen-xl m-0 sm:m-10 bg-white shadow sm:rounded-lg flex justify-center flex-1'>
        <div className='lg:w-1/2 xl:w-5/12 p-6 sm:p-12 '>
           <FormLongin/>
        </div>
        <div className='flex-1 bg-indigo-100 text-center hidden lg:flex'>
            <ImageLogin/>
        </div>
      </div>
    </div>
  )
}

export default Login_Page