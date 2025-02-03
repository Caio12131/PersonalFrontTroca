function Banner2({onClick, titulo, icon}) {
    return (
        <div className=' p-3 pt-4 flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center'>
          <div className='mr-4'> 
          <img
    src={icon}
    className='w-[60px]'
    alt="cafe da manha"
  />
          </div>
          <div className='text-black'>
            <h6 className="font-bold text-[17px]">{titulo}</h6>
          </div>
        </div>
        <div>
        </div>
        </div>
      );
}

export default Banner2;