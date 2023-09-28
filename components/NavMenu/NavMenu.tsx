'use client';
import { useRef, useEffect } from 'react';
import Image from 'next/image';
import gsap from 'gsap';

import { useStore } from '@/store/store';
import { CAMERA } from '../canvas/_utils/_default_values';

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
        duration: 1,
        ease: 'power2.out',
      });
    } else {
      setCamX(CAMERA.x);
      setCamY(CAMERA.y);
      setCamZ(CAMERA.z);

      gsap.to(menuRef.current, {
        right: '-80vw',
        duration: 1,
        ease: 'power2.in',
      });
    }
  }, [menuOpen, setCamX, setCamY, setCamZ]);

  return (
    <>
      <button className='fixed top-12 left-12 z-20'>
        <Image src='/images/purplehat.svg' alt='Logo' width={48} height={48} />
      </button>
      <button
        className='fixed right-12 top-12 z-20 h-10 w-10 rounded-md bg-darkpurple p-2'
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
        className={`fixed bottom-0 top-0 z-10 flex w-80 flex-col overflow-hidden bg-paper ${
          menuOpen ? 'right-0' : '-right-80'
        }`}
      >
        <div className='flex flex-1 flex-col items-start justify-center gap-6 p-12'>
          <MenuButton label='Home' onClick={() => setSection(0)} />
          <MenuButton label='About' onClick={() => setSection(1)} />
          <MenuButton label='Contact' onClick={() => setSection(2)} />
        </div>
      </div>
    </>
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
      className='cursor-pointer text-2xl font-black transition-colors hover:text-purple-800 hover:text-darkpurple'
    >
      {label}
    </button>
  );
};

export default NavMenu;
