import setabaixo from '../../img/setabaixo.png'
function Banner({onClick, titulo, icon}) {
    return (
        <div className=' p-3 flex flex-row items-center justify-between'>
        <div className='flex flex-row items-center'>
          <div className='mr-3'> 
          <img
    src={icon}
    className='w-[70px]'
    alt="cafe da manha"
  />
          </div>
          <div className='text-black'>
            <h5 className="text-lg font-bold">{titulo}</h5>
          </div>
        </div>
        <div>
          <button className="text-base p-3" onClick={onClick}><img src={setabaixo} className='w-[12px]' alt="" /></button>
        </div>
        </div>
      );
}

export default Banner;