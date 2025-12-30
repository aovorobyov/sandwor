type Post = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  tags: string[];
};

const posts: Post[] = [
  {
    slug: 'pervyj-post',
    title: 'Первый пост',
    excerpt: 'Коротко о том, как я запускаю этот блог.',
    date: '2024-12-01',
    tags: ['личное', 'новости'],
  },
  {
    slug: 'proces-raboty',
    title: 'Как я работаю над проектами',
    excerpt: 'Мой стек, этапы работы и как я общаюсь с клиентами.',
    date: '2024-12-15',
    tags: ['проекты', 'процессы'],
  },
  {
    slug: 'instrumenty-2025',
    title: 'Инструменты, которые мне нравятся в 2025',
    excerpt: 'Редакторы, утилиты и сервисы, без которых я не могу.',
    date: '2025-01-05',
    tags: ['инструменты', 'подборки'],
  },
];

export default function BlogPage() {
  return (
    <div className='flex min-h-screen items-center justify-center bg-black font-sans-narrow'>
      <main className='flex min-h-screen w-full max-w-5xl flex-col gap-12 px-6 py-16 sm:px-10 lg:px-16'>
        <header className='flex flex-col gap-4 text-zinc-50'>
          <p className='text-sm uppercase tracking-[0.2em] text-zinc-500'>
            Блог
          </p>
          <h1 className='text-3xl font-semibold leading-tight sm:text-4xl'>
            Мысли, заметки и разборы
          </h1>
          <p className='max-w-2xl text-lg text-zinc-400'>
            Здесь я делюсь процессом работы, кейсами и тем, что меня
            вдохновляет. Подпишитесь, чтобы не пропустить обновления.
          </p>
        </header>

        <section className='grid gap-6 md:grid-cols-2'>
          {posts.map((post) => (
            <article
              key={post.slug}
              className='flex flex-col gap-3 rounded-2xl border border-white/10 bg-zinc-900/60 p-6 shadow-lg shadow-black/30 transition hover:border-white/25'
            >
              <div className='flex items-center gap-3 text-sm text-zinc-500'>
                <span>{new Date(post.date).toLocaleDateString('ru-RU')}</span>
                <span>•</span>
                <span className='flex flex-wrap gap-2'>
                  {post.tags.map((tag) => (
                    <span
                      key={tag}
                      className='rounded-full border border-white/10 px-3 py-1 text-xs uppercase tracking-wide text-zinc-300'
                    >
                      {tag}
                    </span>
                  ))}
                </span>
              </div>
              <h2 className='text-xl font-semibold text-zinc-50'>
                {post.title}
              </h2>
              <p className='text-base text-zinc-400'>{post.excerpt}</p>
              <div className='mt-auto'>
                <a
                  className='inline-flex items-center gap-2 text-sm font-medium text-zinc-50 hover:text-white'
                  href={`/blog/${post.slug}`}
                >
                  Читать →
                </a>
              </div>
            </article>
          ))}
        </section>

        <section className='rounded-2xl border border-white/10 bg-zinc-900/50 p-6 text-zinc-50 shadow-lg shadow-black/30'>
          <h3 className='text-lg font-semibold'>Не нашли нужную тему?</h3>
          <p className='mt-2 text-zinc-400'>
            Напишите мне, и я добавлю разбор или статью, которая будет полезна
            именно вам.
          </p>
          <div className='mt-4 flex flex-wrap gap-3'>
            <a
              className='inline-flex items-center justify-center rounded-lg bg-foreground px-4 py-2 text-background transition-colors hover:bg-[#ccc]'
              href='mailto:hello@example.com'
            >
              Написать письмо
            </a>
            <a
              className='inline-flex items-center justify-center rounded-lg border border-white/20 px-4 py-2 text-zinc-100 transition-colors hover:border-white/40'
              href='https://t.me/username'
              target='_blank'
              rel='noopener noreferrer'
            >
              Telegram
            </a>
          </div>
        </section>
      </main>
    </div>
  );
}
