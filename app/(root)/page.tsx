import Footer from '../../components/Footer';
import Heading from './_components/Heading';
import Hero from './_components/Hero';

export default function Home() {
  return (
    <div className='min-h-full flex flex-col'>
      <div className='flex flex-col items-center justify-center md:justify-start text-center gap-y-8 flex-1 px-6 pb-10'>
        <Heading />
        <Hero />
      </div>
      <Footer />
    </div>
  );
}
