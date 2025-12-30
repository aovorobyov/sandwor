import Image from 'next/image';

export default function Home() {
  return (
    <div className='flex min-h-screen items-center justify-center font-sans-narrow bg-black'>
      <main className='flex min-h-screen w-full max-w-3xl flex-col items-center justify-between py-32 px-16 bg-black sm:items-start'>
        <Image
          className='invert'
          src='/next.svg'
          alt='Next.js logo'
          width={100}
          height={20}
          priority
        />
        <div className='flex flex-col items-center gap-6 text-center sm:items-start sm:text-left'>
          <h1 className='max-w-xs text-3xl font-regular leading-10 text-zinc-50'>
            Привет, это sandwor
          </h1>
          <p className='max-w-md text-lg leading-8 text-zinc-400'>
            Предлагаю тебе окунуться в моё пространство и познакомиться с{' '}
            <a
              href='https://vercel.com/templates?framework=next.js&utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
              className='font-medium text-zinc-50'
            >
              Моим блогом
            </a>{' '}
            или{' '}
            <a
              href='https://nextjs.org/learn?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
              className='font-medium text-zinc-50'
            >
              Моими проектами
            </a>
            .
          </p>
        </div>
        <div className='flex flex-col gap-4 text-base font-medium sm:flex-row'>
          <a
            className='flex h-12 w-full items-center justify-center gap-2 bg-foreground px-5 text-background transition-colors hover:bg-[#ccc] md:w-[158px]'
            href='https://vercel.com/new?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
            target='_blank'
            rel='noopener noreferrer'
          >
            <Image
              className='invert'
              src='/vercel.svg'
              alt='Vercel logomark'
              width={16}
              height={16}
            />
            Нажми меня
          </a>
          <a
            className='flex h-12 w-full items-center justify-center border border-solid px-5 transition-colors hover:border-transparent border-white/[.145] bg-[#1a1a1a] md:w-[158px]'
            href='https://nextjs.org/docs?utm_source=create-next-app&utm_medium=appdir-template-tw&utm_campaign=create-next-app'
            target='_blank'
            rel='noopener noreferrer'
          >
            Обо мне
          </a>
        </div>
      </main>
    </div>
  );
}
