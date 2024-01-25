import gsap from 'gsap';
import { useEffect, useState } from 'react';

const Interface = () => {
  const [isAnimating, setAnimating] = useState(false);

  useEffect(() => {
    const handleWheel = (e: any) => {
      // Check if already animating to prevent interrupt
      if (isAnimating) return;

      e.preventDefault();

      // Mark as animating
      setAnimating(true);

      // Determine direction
      const direction = e.deltaY > 0 ? 'down' : 'up';

      // Animate based on scroll direction
      if (direction === 'down') {
        gsap.to('.home', { y: '-100%', duration: 0.5, ease: 'power1.inOut' });
        gsap.to('.scroll-container', {
          y: '0%',
          duration: 0.5,
          ease: 'power1.inOut',
        });
      } else {
        gsap.to('.home', { y: '0%', duration: 0.5, ease: 'power1.inOut' });
        gsap.to('.scroll-container', {
          y: '100%',
          duration: 0.5,
          ease: 'power1.inOut',
        });
      }

      // Remove animating state after animation completes
      gsap.delayedCall(0.5, () => setAnimating(false));
    };

    // Add event listener
    // window.addEventListener('wheel', handleWheel, { passive: false });

    // Cleanup
    return () => {
      // window.removeEventListener('wheel', handleWheel);
    };
  }, [isAnimating]);

  return (
    <>
      <div className='absolute top-0 home  flex w-screen flex-col items-center'>
        <Home />
      </div>
      {/* <div className=''> */}
      {/* <About /> */}
      {/* </div> */}
    </>
  );
};

interface SectionProps {
  children: React.ReactNode;
}
const Section = ({ children }: SectionProps) => {
  return (
    <section className='mx-auto -my-32 md:my-0 flex h-screen w-screen max-w-screen-2xl flex-col items-start justify-center p-8'>
      {children}
    </section>
  );
};

const Home = () => {
  return (
    <Section>
      <h1 className='text-3xl md:text-5xl font-bold text-grayText md:text-paper'>
        {/* Hi, I{`'`}m */}
        Hi, my
        <br />
        <span className=''>
          name is <span className='text-purple'>Cosmo</span>
        </span>
      </h1>
      <p className='mt-2 md:mt-4 md:text-lg font-semibold text-subtleText md:text-paper'>
        I{`'`}m a creative developer and designer.
      </p>
      {/* <button
        className='mt-16 rounded-lg  px-8 py-4 text-lg font-bold text-white'
        style={{ background: '#7b479d' }}
      >
        Get in touch
      </button> */}
    </Section>
  );
};

const About = () => {
  return (
    <Section>
      <h2 className='text-5xl font-bold'>Skills</h2>
      <div className='mt-8 space-y-4'>
        {skills.map((skill, index) => (
          <div className='w-64' key={index}>
            <h3 className='text-xl font-bold text-gray-800'>{skill.title}</h3>
            <div className='mt-2 h-2 w-full rounded-full bg-gray-200'>
              <div
                className='h-full rounded-full bg-indigo-500'
                style={{ width: `${skill.level}%` }}
              />
            </div>
          </div>
        ))}
      </div>
    </Section>
  );
};

const Contact = () => {
  return (
    <Section>
      <h1>Contact</h1>
    </Section>
  );
};

const skills = [
  {
    title: 'Javascript',
    level: 90,
  },
  {
    title: 'Typescript',
    level: 80,
  },
  {
    title: 'React',
    level: 90,
  },
  {
    title: 'Next.js',
    level: 80,
  },
  {
    title: 'Node.js',
    level: 70,
  },
  {
    title: 'threejs / r3f',
    level: 60,
  },
  {
    title: '3D Modeling / animation',
    level: 30,
  },
];

export default Interface;
