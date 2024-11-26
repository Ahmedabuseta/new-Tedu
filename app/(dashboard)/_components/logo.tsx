import Image from 'next/image';
import pioneer from '@/public/text-logo2.png'
const Logo = () => {
  return <Image height={150} width={150} alt="LMS" src={pioneer} />;
};

export default Logo;
