'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

import { useStore } from '@/store/store';
import { CAMERA } from '../canvas/_utils/_default_values';
import SocialMenu from '../SocialMenu/SocialMenu';

const NavMenu = () => {
  const menuRef = useRef(null); // Create a ref to reference the menu
  const menuOpen = useStore((state) => state.menuOpen);
  const toggleMenuOpen = useStore((state) => state.toggleMenuOpen);
  const setSection = useStore((state) => state.setSection);
  const { setCamX, setCamY, setCamZ } = useStore((state) => ({
    setCamX: state.setCamX,
    setCamY: state.setCamY,
    setCamZ: state.setCamZ,
  }));

  useEffect(() => {
    if (menuOpen) {
      setCamX(CAMERA.menuOpen.x);
      setCamY(CAMERA.menuOpen.y);
      setCamZ(CAMERA.menuOpen.z);

      gsap.to(menuRef.current, {
        right: 0,
        duration: 0.75,
        ease: 'power2.out',
      });
    } else {
      setCamX(CAMERA.x);
      setCamY(CAMERA.y);
      setCamZ(CAMERA.z);

      gsap.to(menuRef.current, {
        right: '-100%',
        duration: 0.75,
        ease: 'power2.in',
      });
    }
  }, [menuOpen, setCamX, setCamY, setCamZ]);

  return (
    <div className='menu'>
      <button className='fixed top-8 left-8 z-20'>
        <Image
          src='/images/purplehat.svg'
          alt='Logo'
          width={48}
          height={48}
          className='w-12 h-auto'
        />
      </button>
      <button
        className='fixed right-8 top-8 z-20 h-10 w-10 p-2 rounded-md hover:bg-purple transition-colors'
        onClick={() => toggleMenuOpen()}
      >
        <div
          className={`h-1 w-full rounded-md bg-white transition-all ${
            menuOpen ? 'translate-y-0.5 rotate-45' : ''
          }`}
        />
        <div
          className={`my-1 h-1 w-full rounded-md bg-white ${
            menuOpen ? 'hidden' : ''
          }`}
        />
        <div
          className={`h-1 w-full rounded-md bg-white transition-all ${
            menuOpen ? '-translate-y-0.5 -rotate-45' : ''
          }`}
        />
      </button>
      <div
        ref={menuRef} // Add the ref here
        className={`fixed bottom-0 top-0 z-10 w-screen md:w-80 flex justify-center items-center overflow-hidden bg-paper ${
          menuOpen ? 'right-0' : '-right-[100%]'
        }`}
      >
        <div className='px-12 flex flex-col'>
          <h2 className='text-2xl font-semibold text-paperText text-right'>
            Don{`'`} be shy!{' '}
          </h2>
          <p className='text-paperText text-right pt-4'>
            If you also love creating, reach out and let
            {`'`}s build some cool stuff together!
          </p>
          <div className='flex justify-end py-10 -mr-5'>
            <SocialMenu />
          </div>
        </div>
      </div>
    </div>
  );
};

interface MenuButtonProps {
  label: string;
  onClick: () => void;
}
const MenuButton = ({ label, onClick }: MenuButtonProps) => {
  return (
    <button
      onClick={onClick}
      className='cursor-pointer text-2xl font-black transition-colors duration-1000 hover:text-purple'
    >
      {label}
    </button>
  );
};

export default NavMenu;
