'use client';

import {
  Github,
  Linkedin,
  Mail,
  FileText,
  Sun,
  Moon,
  Calendar,
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
      className='social-icon'
      aria-label='Toggle theme'
    >
      <div className='relative h-4 w-4'>
        <Sun
          className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${
            isDark
              ? 'rotate-90 scale-0 opacity-0'
              : 'rotate-0 scale-100 opacity-100'
          }`}
        />
        <Moon
          className={`absolute inset-0 h-4 w-4 transition-all duration-300 ${
            isDark
              ? 'rotate-0 scale-100 opacity-100'
              : '-rotate-90 scale-0 opacity-0'
          }`}
        />
      </div>
    </button>
  );
}

function SkillsList() {
  return (
    <div className='relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]'>
      <div className='animate-marquee flex w-max hover:[animation-play-state:paused]'>
        {[0, 1].map((copy) => (
          <div
            key={copy}
            aria-hidden={copy === 1}
            className='flex items-center gap-6 pr-6 sm:gap-8 sm:pr-8'
          >
            {skills.map((skill) => (
              <span
                key={skill}
                className='shrink-0 font-mono text-xs text-muted-foreground'
              >
                {skill}
              </span>
            ))}
          </div>
        ))}
      </div>
    </div>
  );
}

function pickRandomIndex(except: number): number {
  let next = Math.floor(Math.random() * roles.length);
  if (next === except) next = (next + 1) % roles.length;
  return next;
}

function SingleRoleDisplay() {
  const [displayIndex, setDisplayIndex] = useState(0);
  const [reel, setReel] = useState<number[] | null>(null);
  const [reelOffset, setReelOffset] = useState(0);
  const timeoutsRef = useRef<ReturnType<typeof setTimeout>[]>([]);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const spinningRef = useRef(false);
  const currentIndexRef = useRef(0);

  useEffect(() => {
    const timeouts = timeoutsRef.current;
    return () => {
      timeouts.forEach((t) => {
        clearTimeout(t);
      });
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const spin = () => {
    if (spinningRef.current) return;
    spinningRef.current = true;

    const current = currentIndexRef.current;
    const final = pickRandomIndex(current);
    const steps: number[] = [];
    for (let i = 0; i < 10; i++) {
      steps.push(Math.floor(Math.random() * roles.length));
    }
    steps.push(final);

    setReel([current, ...steps]);
    setReelOffset(0);

    const t1 = setTimeout(() => {
      setReelOffset(-(steps.length * 1.5));
    }, 20);

    const t2 = setTimeout(() => {
      currentIndexRef.current = final;
      setDisplayIndex(final);
      setReel(null);
      setReelOffset(0);
      spinningRef.current = false;
    }, 1120);

    timeoutsRef.current.push(t1, t2);
  };

  useEffect(() => {
    const initial = setTimeout(() => {
      spin();
      intervalRef.current = setInterval(spin, 2000);
    }, 1200);
    return () => {
      clearTimeout(initial);
    };
  }, []);

  const spec = (i: number) =>
    roles[i] ? roles[i].split(' ').slice(0, -1).join(' ') : '';

  return (
    <div className='flex items-baseline justify-center font-mono text-base sm:text-lg'>
      <span className='relative inline-flex h-[1.5em] w-[17ch] justify-end overflow-hidden text-right'>
        {reel ? (
          <span
            className='flex w-full flex-col transition-transform duration-1000 ease-out'
            style={{ transform: `translateY(${String(reelOffset)}em)` }}
          >
            {reel.map((r, i) => (
              <span
                key={`${String(i)}-${String(r)}`}
                className='h-[1.5em] w-full whitespace-nowrap tabular-nums leading-[1.5em]'
              >
                {spec(r)}
              </span>
            ))}
          </span>
        ) : (
          <span className='h-[1.5em] w-full whitespace-nowrap tabular-nums leading-[1.5em]'>
            {spec(displayIndex)}
          </span>
        )}
      </span>
      <span className='ml-2 text-muted-foreground'>Engineer</span>
    </div>
  );
}

export default function Home() {
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

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

  const toggleTheme = () => {
    const newIsDark = !isDark;
    setIsDark(newIsDark);
    document.documentElement.classList.toggle('dark', newIsDark);
    document.documentElement.style.colorScheme = newIsDark ? 'dark' : 'light';
    window.localStorage.setItem('theme', newIsDark ? 'dark' : 'light');
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
      <header className='fixed right-5 top-5 z-20 sm:right-8 sm:top-8'>
        <ThemeToggle isDark={isDark} onToggle={toggleTheme} />
      </header>

      <main className='relative z-10 flex w-full flex-1 items-center justify-center px-6'>
        <article className='fade-in mx-auto grid w-full max-w-3xl gap-x-10 gap-y-8 py-24 sm:grid-cols-2 sm:gap-x-12 sm:gap-y-10'>
          <div className='flex flex-col items-end gap-3 text-right sm:gap-4'>
            <nav
              aria-label='Social links'
              className='flex items-center justify-end gap-3 sm:gap-4'
            >
              {socialLinks.map((link) => {
                const Icon = link.icon;
                const isInternal = link.href.startsWith('/');

                if (isInternal) {
                  return (
                    <Link
                      key={link.name}
                      href={link.href}
                      className='social-icon'
                      title={link.name}
                    >
                      <Icon />
                    </Link>
                  );
                }

                return (
                  <a
                    key={link.name}
                    href={link.href}
                    target='_blank'
                    rel='noopener noreferrer'
                    className='social-icon'
                    title={link.name}
                  >
                    <Icon />
                  </a>
                );
              })}
            </nav>

            <h1 className='whitespace-nowrap font-mono text-4xl font-medium tracking-tight sm:text-5xl'>
              <span>
                <span className='text-muted-foreground'>Abraham </span>
                <span className='text-foreground'>Guimbao</span>
              </span>
            </h1>

            <SingleRoleDisplay />

            <div className='font-mono text-xs uppercase tracking-wider text-muted-foreground'>
              Contractor / Freelance — B2B
            </div>

            <p className='font-mono text-xs tracking-wider text-muted-foreground'>
              <a
                href='https://42.fr'
                target='_blank'
                rel='noopener noreferrer'
                className='text-foreground underline decoration-dotted underline-offset-4 transition-colors hover:text-muted-foreground'
              >
                42 Paris
              </a>{' '}
              Graduate
            </p>
          </div>

          <div className='flex flex-col items-start gap-4 text-left sm:gap-5 sm:border-l sm:border-border sm:pl-12'>
            <div className='flex flex-col gap-4 sm:pt-2'>
              <p className='text-sm leading-relaxed text-muted-foreground'>
                Natural <span className='text-foreground'>problem solver</span>{' '}
                and <span className='text-foreground'>proactive</span> builder
                that treats <span className='text-foreground'>pragmatism</span>,{' '}
                <span className='text-foreground'>
                  dynamic modern solutions
                </span>
                , and <span className='text-foreground'>agility</span> as
                priorities.
              </p>
              <p className='text-sm leading-relaxed text-muted-foreground'>
                I have years of experience interacting with different types of
                software and infrastructure in diverse environments and teams,
                and I love learning new things, architecturing useful tools, and
                tinkering with new technologies.
              </p>
            </div>
          </div>

          <div className='w-full sm:col-span-2'>
            <SkillsList />
          </div>
        </article>
      </main>
    </div>
  );
}
