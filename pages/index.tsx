import LayoutPages from '@/components/layout';
import Container from '@/components/organism/Container';

const Home = () => {
  return (
    <LayoutPages>
      <div className='bg-[url("/images/background.jpg")] bg-cover bg-center bg-no-repeat h-[100vh] w-full opacity-[0.06]' />
      <div className='overflow-y-auto h-[100vh] w-full'>
        <Container isLandingPage>
          <div className='flex flex-col lg:justify-center lg:text-left lg:items-start w-[65%] h-full sm:items-center sm:justify-end sm:text-center'>
            <h1 className='lg:text-[5rem] font-[900] text-black mb-[1rem] uppercase sm:text-[2rem]'>Task Scheduler</h1>
            <h2 className='lg:text-[1.75rem] font-[500] text-black mb-[1rem] sm:text-[1.25rem]'>
              <span className='lg:text-[2rem] underline decoration-black lg:decoration-[0.25rem] underline-offset-[0.6rem] sm:decoration-[0.15rem] sm:text-[1.25rem]'>Manage</span> your task, for the better future!
            </h2>
          </div>
          <div className='flex lg:flex-row lg:w-full lg:h-full items-center lg:justify-end relative z-[2] sm:w-[70%] sm:h-[80%] sm:mt-[1rem] sm:mb-[2rem] sm:flex-col sm:justify-start'>
            <img className="w-[60%] h-auto drop-shadow-[0_0_0.75rem_rgba(0,0,0,0.5)]" src="/images/cartoon-2.png" alt="cartoon" />
          </div>
        </Container>
      </div>
    </LayoutPages>
  )
}


export default Home;