import '../App.css';

const Navbar = () => {
  return (
    <div>
      <header className="lg:px-16 px-4 bg-white flex flex-wrap items-center py-4 shadow-md">
        <div className="flex-1 flex justify-between items-center">
            <a href="#" className="text-xl italic text-sky-500">ដើរលេង</a>
        </div>
        <div className="relative flex items-center hidden md:inline-flex hidden sm:items-center">
            <input type="text" placeholder="Search" className="border hover:text-sky-500 hover:border-sky-500 rounded-md py-1 px-2"/>
            <svg className="absolute right-2 h-6 w-6 hover:text-sky-500" xmlns="http://www.w3.org/2000/svg" fill="none"
                viewBox="0 0 24 24" stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
         </div>

        <label for ="menu-toggle" className="pointer-cursor md:hidden block">
        <svg className="fill-current text-gray-900"
            xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 20 20">
            <title>menu</title>
            <path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"></path>
        </svg>
        </label>
        <input className="hidden" type="checkbox" id="menu-toggle" />

            <div className="hidden md:flex md:items-center md:w-auto w-full " id="menu">
                <nav>
                    <ul className="md:flex items-center justify-between text-base text-gray-700 pt-4 md:pt-0">
                        <li><a className="md:p-4 py-3 px-0 block  hover:text-sky-500" href="#">ទំព័រដើម</a></li>
                        <li><a className="md:p-4 py-3 px-0 block  hover:text-sky-500" href="#">សារជជែក</a></li>
                        <li><a className="md:p-4 py-3 px-0 block  hover:text-sky-500" href="#">សារជូនដំណឹង</a></li>
                        <li><a className="md:p-4 py-3 px-0 block  hover:text-sky-500" href="#">ការបង់ប្រាក់</a></li>
                        <li><a className="md:p-4 py-3 px-0 block  hover:text-sky-500" href="#">រទេះកញ្ចប់</a></li>
                        <li><a className="md:p-4 py-3 px-0 block md:mb-0 mb-2  hover:text-sky-500" href="#">គណនេយ្យ</a></li>
                    </ul>
             </nav>
            </div>
        </header>
    </div>
  )
}

export default Navbar
