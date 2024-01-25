import { FaGithubAlt, FaTwitter, FaLinkedin, FaDiscord } from 'react-icons/fa';
import { HiOutlineMail } from 'react-icons/hi';

const SocialMenu = () => {
  return (
    <div className='py-2 px-5 rounded-xl bg-paper flex space-x-8'>
      <a href='https://github.com/cosmoburn' target='_blank' rel='noreferrer'>
        <FaGithubAlt className='w-7 h-7 m-auto text-paperShade hover:text-purple transition-colors duration-300' />
      </a>
      <a href='https://x.com/cos0x' target='_blank' rel='noreferrer'>
        <FaTwitter className='w-7 h-7 m-auto text-paperShade hover:text-purple transition-colors duration-300' />
      </a>
      {/* <a href=''>
        <FaLinkedin className='w-7 h-7 m-auto text-paperShade hover:text-purple transition-colors duration-300' />
      </a> */}
      <a href='mailto:cosmoburn.eth@gmail.com?subject=Hello%20Cosmo!'>
        <HiOutlineMail className='w-7 h-7 m-auto text-paperShade hover:text-purple transition-colors duration-300' />
      </a>
      <a
        href='https://discordapp.com/users/238115081320136704'
        target='_blank'
        rel='noreferrer'
      >
        <FaDiscord className='w-7 h-7 m-auto text-paperShade hover:text-purple transition-colors duration-300' />
      </a>
    </div>
  );
};

export default SocialMenu;
