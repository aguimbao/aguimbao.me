'use client';

import {
  Github,
  Linkedin,
  Mail,
  FileText,
  MapPin,
  Check,
  Sun,
  Moon,
  Calendar,
  Briefcase,
} from 'lucide-react';
import { useState, useEffect, useRef } from 'react';
import Link from 'next/link';

const BOOKING_URL =
  'https://calendar.proton.me/bookings#_BNiGErTh7kLwK8Gi9vAPweka89k9wPJy_GBU8NZ-SI=';

const socialLinks = [
  {
    name: 'LinkedIn',
    href: 'https://linkedin.com/in/abraham-guimbao',
    icon: Linkedin,
  },
  {
    name: 'GitHub',
    href: 'https://github.com/aguimbao',
    icon: Github,
  },
  {
    name: 'Resume',
    href: 'https://rxresu.me/aguimbao/cv',
    icon: FileText,
  },
  {
    name: 'Schedule Meeting',
    href: BOOKING_URL,
    icon: Calendar,
    isPopup: true,
  },
  {
    name: 'Email',
    href: 'mailto:abraham@aguimbao.me',
    icon: Mail,
  },
];

const roles = [
  'Site Reliability Engineer',
  'Infrastructure Engineer',
  'Platform Engineer',
  'Full-Stack Engineer',
  'Back-End Engineer',
  'Network Engineer',
  'DevOps Engineer',
  'DevSecOps Engineer',
  'LLMOps Engineer',
  'Systems Engineer',
  'Cloud Engineer',
  'Automation Engineer',
  'AI Engineer',
  'Web3 Engineer',
  'GameDev Engineer',
];

const skills = [
  'Infrastructure',
  'Full-Stack',
  'Back-End',
  'Networking',
  'DevOps',
  'Systems',
  'Cloud',
  'Automation',
  'AI',
  'Web3',
  'GameDev',
  'Cybersec',
];

function ThemeToggle({
  isDark,
  onToggle,
}: {
  isDark: boolean;
  onToggle: () => void;
}) {
  return (
    <button
      type='button'
      onClick={onToggle}
      className='fixed right-4 top-4 z-[9999] flex h-10 w-10 items-center justify-center rounded-lg border border-yellow-600/40 bg-card shadow-lg transition-all duration-300 hover:scale-110 hover:shadow-xl dark:border-purple-400/40 sm:right-6 sm:top-6 sm:h-12 sm:w-12'
      aria-label='Toggle theme'
    >
      <div className='relative h-5 w-5 sm:h-6 sm:w-6'>
        <Sun
          className={`absolute inset-0 h-5 w-5 text-yellow-600 transition-all duration-300 sm:h-6 sm:w-6 ${
            isDark
              ? 'rotate-90 scale-0 opacity-0'
              : 'rotate-0 scale-100 opacity-100'
          }`}
        />
        <Moon
          className={`absolute inset-0 h-5 w-5 text-purple-400 transition-all duration-300 sm:h-6 sm:w-6 ${
            isDark
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>
    </button>
  );
}

function MeteorRain({ isDark }: { isDark: boolean }) {
  type Meteor = {
    id: number;
    left: number;
    top: number;
    duration: number;
  };

  const [meteors, setMeteors] = useState<Meteor[]>([]);

  useEffect(() => {
    const checkMobile = () => window.innerWidth < 640;
    setIsMobile(checkMobile());

    const meteorArray = [];
    const meteorCount = checkMobile() ? 2 : 3;

    for (let i = 1; i <= meteorCount; i++) {
      meteorArray.push({
        id: i,
        left: Math.random() * 90 + 9,
        top: Math.random() * 250 + 50,
        duration: Math.random() * 6 + 6,
      });
    }

    setMeteors(meteorArray);

    const handleResize = () => {
      setIsMobile(checkMobile());
    };

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [isDark]);

  const meteorColor = isDark ? '#c084fc' : '#eab308';
  const meteorGlow = isDark ? '#c084fc' : '#eab308';

  return (
    <div className='pointer-events-none fixed inset-0 z-0 overflow-hidden bg-transparent'>
      {meteors.map((meteor) => (
        <div
          key={meteor.id}
          className='absolute opacity-40 sm:opacity-60'
          style={{
            top: `${meteor.top}px`,
            left: `${meteor.left}%`,
            width: isMobile ? '120px' : '160px',
            height: '2px',
            transform: 'rotate(-45deg)',
            backgroundImage: `linear-gradient(to right, ${meteorColor}, transparent)`,
            animation: `meteor ${meteor.duration}s linear infinite`,
            filter: `drop-shadow(0 0 ${isMobile ? '3px' : '4px'} ${meteorGlow})`,
          }}
        >
          <div
            className='absolute -mt-0.5 h-1 w-1 rounded-full sm:h-1.5 sm:w-1.5'
            style={{
              background: meteorColor,
              boxShadow: `0 0 ${isMobile ? '4px 1px' : '6px 1px'} ${meteorGlow}`,
            }}
          />
        </div>
      ))}
    </div>
  );
}

function SkillsList() {
  return (
    <div className='mx-auto flex max-w-none flex-wrap justify-center gap-1.5 px-4 sm:gap-3'>
      {skills.map((skill) => (
        <span
          key={skill}
          className='inline-block cursor-default whitespace-nowrap rounded-full border border-yellow-600/40 bg-yellow-600/20 px-2 py-1 text-xs font-medium text-yellow-800 shadow-sm transition-all duration-300 hover:scale-105 hover:shadow-md dark:border-purple-500/30 dark:bg-purple-500/10 dark:text-purple-300 sm:px-3 sm:py-1.5 sm:text-sm'
        >
          {skill}
        </span>
      ))}
    </div>
  );
}

function SingleRoleDisplay() {
  const currentRoleIndexRef = useRef(0);
  const [displayRoleIndex, setDisplayRoleIndex] = useState(0);
  const [animationClass, setAnimationClass] = useState('');
  const [_cursorVisible, setCursorVisible] = useState(true);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    const clearAllTimeouts = () => {
      timeoutsRef.current.forEach((timeout) => clearTimeout(timeout));
      timeoutsRef.current = [];
    };

    const startAnimationCycle = () => {
      clearAllTimeouts();
      setCursorVisible(false);

      const timeout1 = setTimeout(() => {
        setAnimationClass('animate-role-exit');

        const timeout2 = setTimeout(() => {
          const nextIndex = (currentRoleIndexRef.current + 1) % roles.length;
          currentRoleIndexRef.current = nextIndex;
          setDisplayRoleIndex(nextIndex);
          setAnimationClass('animate-role-enter');

          const timeout3 = setTimeout(() => {
            setAnimationClass('');

            const timeout4 = setTimeout(() => {
              setCursorVisible(true);
            }, 100);

            timeoutsRef.current.push(timeout4);
          }, 500);

          timeoutsRef.current.push(timeout3);
        }, 250);

        timeoutsRef.current.push(timeout2);
      }, 500);

      timeoutsRef.current.push(timeout1);
    };

    const initialTimeout = setTimeout(() => {
      startAnimationCycle();

      intervalRef.current = setInterval(() => {
        startAnimationCycle();
      }, 2000);
    }, 1000);

    return () => {
      clearTimeout(initialTimeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
      clearAllTimeouts();
    };
  }, []);

  const currentRole = roles[displayRoleIndex];
  const roleSpecialization = currentRole
    ? currentRole.split(' ').slice(0, -1).join(' ')
    : '';

  return (
    <div className='mb-6 text-4xl sm:mb-8 sm:text-3xl md:text-4xl lg:text-5xl'>
      <div className='text-center'>
        <div className='relative inline-flex items-center'>
          <div className='relative flex h-[1.4em] w-[12ch] items-center justify-end overflow-hidden sm:w-[12ch]'>
            <div
              className={`whitespace-nowrap font-medium text-yellow-600 dark:text-purple-400 ${animationClass}`}
            >
              {roleSpecialization}
            </div>
          </div>
          <span className='ml-1 font-medium text-muted-foreground sm:ml-2'>
            Engineer&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
          </span>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [cursorVisible, setCursorVisible] = useState(true);

  useEffect(() => {
    setMounted(true);

    const savedTheme = window.localStorage.getItem('theme');
    const prefersDark = window.matchMedia(
      '(prefers-color-scheme: dark)',
    ).matches;
    const shouldBeDark = savedTheme === 'dark' || (!savedTheme && prefersDark);

    setIsDark(shouldBeDark);
    document.documentElement.classList.toggle('dark', shouldBeDark);
    document.documentElement.style.colorScheme = shouldBeDark
      ? 'dark'
      : 'light';
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setCursorVisible((prev) => !prev);
    }, 1000);

    return () => {
      clearInterval(interval);
    };
  }, []);

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark', newIsDark);
    document.documentElement.style.colorScheme = newIsDark ? 'dark' : 'light';
    window.localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
  };

  const openCalendarPopup = () => {
    const width = 900;
    const height = 760;
    const left = window.screenX + (window.outerWidth - width) / 2;
    const top = window.screenY + (window.outerHeight - height) / 2;

    const popup = window.open(
      BOOKING_URL,
      'proton-booking',
      `popup=yes,width=${width},height=${height},left=${left},top=${top},resizable=yes,scrollbars=yes`,
    );

    if (popup) {
      popup.focus();
      return;
    }

    window.open(BOOKING_URL, '_blank', 'noopener,noreferrer');
  };

  if (!mounted) {
    return (
      <div className='flex min-h-screen flex-col bg-background text-foreground'>
        <div className='flex flex-1 items-center justify-center'>
          <div className='h-8 w-8 animate-spin rounded-full border-b-2 border-foreground'></div>
        </div>
      </div>
    );
  }

  return (
    <div className='relative flex min-h-screen w-full flex-col bg-background text-foreground'>
      <MeteorRain isDark={isDark} />

      <div className='fixed left-1/2 top-4 z-20 -translate-x-1/2 transform'>
        <div className='flex items-center gap-1 rounded-full border border-blue-500/30 bg-blue-500/10 px-3 py-1 text-xs font-medium text-blue-600 shadow-sm dark:border-blue-400/30 dark:bg-blue-400/10 dark:text-blue-400'>
          <span className='text-xs'>🤖</span>
          Made with AI
        </div>
      </div>

      <main className='relative z-10 w-full flex-1'>
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />

        <section className='relative flex min-h-screen items-center overflow-hidden'>
          <div className='absolute inset-0 bg-gradient-to-br from-yellow-500/5 via-transparent to-transparent dark:from-purple-500/5' />

          <div className='relative mx-auto w-full max-w-6xl px-4 py-6 sm:px-6 sm:py-8'>
            <div className='fade-in text-center'>
              <div className='mb-6 sm:mb-8'>
                <div className='flex flex-wrap justify-center gap-2 sm:gap-3 md:gap-4'>
                  {socialLinks.map((link) => {
                    const Icon = link.icon;
                    const isInternal = link.href.startsWith('/');

                    if (isInternal) {
                      return (
                        <Link
                          key={link.name}
                          href={link.href}
                          className='social-badge-mobile flex h-8 w-8 items-center justify-center rounded bg-card transition-all duration-200 hover:-translate-y-1 hover:scale-125 hover:bg-accent dark:hover:shadow-lg sm:h-10 sm:w-10'
                          title={link.name}
                        >
                          <Icon className='h-4 w-4 text-yellow-600 dark:text-purple-400 sm:h-5 sm:w-5' />
                        </Link>
                      );
                    }

                    if (link.isPopup) {
                      return (
                        <button
                          type='button'
                          key={link.name}
                          onClick={openCalendarPopup}
                          className='social-badge-mobile flex h-8 w-8 items-center justify-center rounded bg-card transition-all duration-200 hover:-translate-y-1 hover:scale-125 hover:bg-accent dark:hover:shadow-lg sm:h-10 sm:w-10'
                          title={link.name}
                          aria-label='Open booking page in popup'
                        >
                          <Icon className='h-4 w-4 text-yellow-600 dark:text-purple-400 sm:h-5 sm:w-5' />
                        </button>
                      );
                    }

                    return (
                      <a
                        key={link.name}
                        href={link.href}
                        target='_blank'
                        rel='noopener norefer
