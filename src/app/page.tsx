export default function ProfilePage() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6 bg-gradient-to-b from-zinc-50 to-zinc-100 dark:from-zinc-950 dark:to-zinc-900 text-zinc-800 dark:text-zinc-100">
      <div className="w-full max-w-md mx-auto text-center flex flex-col items-center">
        {/* Profile Avatar */}
        <div className="relative mb-6 group">
          <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-blue-500 via-indigo-500 to-cyan-400 p-[3px] shadow-lg shadow-indigo-500/20">
            <div className="w-full h-full rounded-full bg-white dark:bg-zinc-900 flex items-center justify-center overflow-hidden">
              <svg
                className="w-14 h-14 text-indigo-500 dark:text-indigo-400"
                fill="none"
                stroke="currentColor"
                strokeWidth={1.75}
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                {/* Robot / Tech Icon */}
                <rect x="3" y="11" width="18" height="10" rx="3" />
                <circle cx="8.5" cy="16" r="1.5" fill="currentColor" />
                <circle cx="15.5" cy="16" r="1.5" fill="currentColor" />
                <path strokeLinecap="round" d="M12 2v4M8 2h8" />
                <circle cx="12" cy="2" r="1" />
                <path strokeLinecap="round" d="M2 15h1M21 15h1" />
              </svg>
            </div>
          </div>
          <span className="absolute bottom-1 right-1 flex h-4 w-4">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-4 w-4 bg-emerald-500 border-2 border-white dark:border-zinc-900"></span>
          </span>
        </div>

        {/* Name & Tag */}
        <h1 className="text-3xl font-bold tracking-tight text-zinc-900 dark:text-white">
          김도훈
        </h1>
        <p className="mt-1 text-sm font-medium text-indigo-600 dark:text-indigo-400">
          Robotics Undergraduate
        </p>

        {/* Bio */}
        <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-300 max-w-sm">
          안녕하세요. 로보틱스를 공부하고 있는 학부생입니다.
        </p>

        {/* Interest Tags */}
        <div className="mt-6 flex flex-wrap justify-center gap-2">
          {["로보틱스", "제어공학", "ROS", "자율주행", "임베디드"].map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 text-xs font-medium rounded-full bg-zinc-200/70 dark:bg-zinc-800 text-zinc-700 dark:text-zinc-300 border border-zinc-300/40 dark:border-zinc-700/50"
            >
              #{tag}
            </span>
          ))}
        </div>

        {/* Divider */}
        <div className="w-16 h-px bg-zinc-200 dark:bg-zinc-800 my-8" />

        {/* Links / Contact Actions */}
        <div className="w-full flex flex-col gap-3">
          <a
            href="mailto:contact@example.com"
            className="flex items-center justify-center gap-2.5 w-full py-3 px-4 rounded-xl bg-zinc-900 text-white dark:bg-white dark:text-zinc-900 font-medium text-sm transition-all hover:opacity-90 active:scale-[0.99] shadow-sm"
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <rect width="20" height="16" x="2" y="4" rx="2" />
              <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
            </svg>
            이메일 보내기
          </a>

          <a
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center justify-center gap-2.5 w-full py-3 px-4 rounded-xl bg-white dark:bg-zinc-800/80 border border-zinc-200 dark:border-zinc-700/60 font-medium text-sm text-zinc-800 dark:text-zinc-200 transition-all hover:bg-zinc-50 dark:hover:bg-zinc-800 active:scale-[0.99] shadow-sm"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
              />
            </svg>
            GitHub 바로가기
          </a>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-xs text-zinc-400 dark:text-zinc-500">
          © {new Date().getFullYear()} 김도훈. All rights reserved.
        </footer>
      </div>
    </main>
  );
}
