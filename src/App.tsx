import { useEffect, useRef, useState, type ReactNode } from 'react'
import {
  motion,
  useScroll,
  useTransform,
  useInView,
  MotionValue,
} from 'framer-motion'
import {
  Terminal,
  Server,
  Shield,
  Network,
  Database,
  GitBranch,
  FileCode2,
  Activity,
  Mail,
  Download,
  ExternalLink,
  MapPin,
  Sparkles,
} from 'lucide-react'

const CTA_BG =
  'linear-gradient(180deg, rgba(255,255,255,0) 30%, rgba(255,255,255,0.10) 76%), radial-gradient(ellipse at 50% 100%, rgba(255,255,255,0.7) 0%, transparent 100%), #BEC7FF'

const NAV_LINKS = [
  { label: '首页', href: '#home' },
  { label: '关于', href: '#about' },
  { label: '技能', href: '#skills' },
  { label: '项目', href: '#projects' },
  { label: '联系', href: '#contact' },
]

const SELF_EVAL =
  '本人目标明确，希望进入运维方向长期发展。虽然实际工作经验较少，但能接受从基础岗位开始积累，踏实完成巡检、监控、文档整理、问题记录和基础排障工作，并持续提升 Linux、网络、数据库、Shell 脚本和自动化运维能力。'

const MARQUEE_ROW1 = [
  { Icon: Terminal, name: 'Linux' },
  { Icon: FileCode2, name: 'Shell' },
  { Icon: Server, name: 'Nginx' },
  { Icon: Shield, name: '权限管理' },
  { Icon: Activity, name: '服务管理' },
]

const MARQUEE_ROW2 = [
  { Icon: Network, name: '网络基础' },
  { Icon: Database, name: 'MySQL' },
  { Icon: Shield, name: '信息安全' },
  { Icon: GitBranch, name: 'Git' },
  { Icon: Activity, name: '日志排查' },
]

const STATS = [
  { value: '7', label: 'GitHub 仓库' },
  { value: '3', label: '年专业学习' },
  { value: '10', label: '项核心技能' },
  { value: '2', label: '年 Linux 自学' },
]

const SKILLS = [
  {
    title: 'Linux 运维基础',
    items: [
      '常用命令、目录结构、用户与权限、进程与端口查看',
      'systemctl 管理服务；tail / grep / journalctl 查看日志',
    ],
  },
  {
    title: '网络与服务',
    items: [
      'TCP/IP、DNS、HTTP/HTTPS、IP、端口、网关等概念',
      'ping、curl、ss/netstat 基础连通性排查',
    ],
  },
  {
    title: '工具与脚本',
    items: [
      'Shell 脚本基础语法，简单自动化命令脚本',
      '虚拟机环境搭建与 Git 基础使用流程',
    ],
  },
]

const PRACTICE_PROJECTS = [
  {
    title: 'Linux 服务器基础环境搭建与运维练习',
    tags: ['虚拟机环境', 'Linux 基础运维', '系统巡检与排障'],
    bullets: [
      '搭建 Linux 学习环境，完成系统基础配置、网络连通性测试和常用命令练习',
      '练习用户创建、用户组管理、文件权限修改、目录管理等基础权限操作',
      '查看 CPU、内存、磁盘、进程、端口等系统运行状态',
      '通过 systemctl 管理服务启停、重启和状态检查，并整理常见命令笔记',
    ],
  },
  {
    title: 'Nginx Web 服务部署练习',
    tags: ['Nginx', 'Web 服务部署', '端口与日志排查'],
    bullets: [
      '在 Linux 环境中安装并启动 Nginx，配置开机自启动并验证服务运行状态',
      '修改默认页面内容，完成浏览器访问测试和基础页面验证',
      '检查监听端口、防火墙状态和访问日志，理解服务状态、端口、日志之间的排障关系',
    ],
  },
]

const GITHUB_REPOS = [
  {
    name: 'dotfile-cae',
    description: 'Arch + Hyprland + Caelestia Shell 个人配置',
    language: 'Shell',
    url: 'https://github.com/YuKong79A/dotfile-cae',
  },
  {
    name: 'Surge-rule',
    description: 'Surge 规则与网络相关配置',
    language: 'JavaScript',
    url: 'https://github.com/YuKong79A/Surge-rule',
  },
  {
    name: 'read-aloud',
    description: '朗读 / TTS 相关 TypeScript 项目',
    language: 'TypeScript',
    url: 'https://github.com/YuKong79A/read-aloud',
  },
  {
    name: 'dotfile-noc',
    description: '另一套桌面与系统点文件配置',
    language: 'Shell',
    url: 'https://github.com/YuKong79A/dotfile-noc',
  },
  {
    name: 'wallpaper',
    description: 'My personal wallpapers',
    language: null,
    url: 'https://github.com/YuKong79A/wallpaper',
  },
  {
    name: 'yukong-cae',
    description: 'A fluid, morphing shell for your Linux desktop (fork)',
    language: null,
    url: 'https://github.com/YuKong79A/yukong-cae',
  },
]

function CtaButton({
  children,
  href,
  className = '',
  onClick,
}: {
  children: ReactNode
  href?: string
  className?: string
  onClick?: () => void
}) {
  const Tag = href ? 'a' : 'button'
  return (
    <Tag
      href={href}
      onClick={onClick}
      className={`inline-flex items-center justify-center rounded-full border border-white/80 px-6 py-2 text-[15px] font-medium text-brand-navy/80 drop-shadow-sm transition-transform hover:scale-105 ${className}`}
      style={{ background: CTA_BG }}
    >
      {children}
    </Tag>
  )
}

function LogoMark({ className = '' }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 256 256"
      fill="white"
      className={className}
      aria-hidden
    >
      <path d="M 228 0 C 172.772 0 128 44.772 128 100 L 128 0 L 0 0 L 0 28 C 0 83.228 44.772 128 100 128 L 0 128 L 0 256 L 28 256 C 83.228 256 128 211.228 128 156 L 128 256 L 256 256 L 256 228 C 256 172.772 211.228 128 156 128 L 256 128 L 256 0 Z" />
    </svg>
  )
}

function Navbar() {
  const [open, setOpen] = useState(false)

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-[60] flex justify-center px-4 pt-4 md:pt-6">
        <nav className="flex w-full max-w-5xl items-center justify-between gap-4 rounded-full bg-[#312D7C]/40 px-4 py-3 backdrop-blur-[15px] md:gap-8 lg:gap-20">
          <a href="#home" className="flex items-center gap-2 shrink-0">
            <LogoMark className="h-6 w-6 md:h-7 md:w-7" />
            <span className="text-base md:text-xl font-medium text-white">
              YuKong
            </span>
          </a>

          <div className="hidden md:flex items-center gap-6 text-sm">
            {NAV_LINKS.map((link, i) => (
              <a
                key={link.href}
                href={link.href}
                className={
                  i === 0
                    ? 'text-white'
                    : 'text-[#B6B8C3] hover:text-white transition-colors'
                }
              >
                {link.label}
              </a>
            ))}
          </div>

          <div className="hidden md:block">
            <CtaButton href="#contact">联系我</CtaButton>
          </div>

          <button
            type="button"
            className="md:hidden relative h-10 w-10 flex items-center justify-center"
            aria-label={open ? '关闭菜单' : '打开菜单'}
            onClick={() => setOpen((v) => !v)}
          >
            <span className="sr-only">菜单</span>
            <div className="flex flex-col gap-1.5">
              <motion.span
                className="block h-0.5 w-6 bg-white origin-center"
                animate={open ? { rotate: 45, y: 8 } : { rotate: 0, y: 0 }}
              />
              <motion.span
                className="block h-0.5 w-6 bg-white"
                animate={open ? { opacity: 0 } : { opacity: 1 }}
              />
              <motion.span
                className="block h-0.5 w-6 bg-white origin-center"
                animate={open ? { rotate: -45, y: -8 } : { rotate: 0, y: 0 }}
              />
            </div>
          </button>
        </nav>
      </header>

      {open && (
        <motion.div
          className="fixed inset-0 z-[55] flex flex-col items-center justify-center gap-8 bg-brand-dark/95 backdrop-blur-xl md:hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
        >
          {NAV_LINKS.map((link, i) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={() => setOpen(false)}
              className="text-2xl font-medium text-white"
              initial={{ opacity: 0, y: 24, filter: 'blur(8px)' }}
              animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
              transition={{ delay: 0.08 * i, duration: 0.4 }}
            >
              {link.label}
            </motion.a>
          ))}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45 }}
          >
            <CtaButton href="#contact" onClick={() => setOpen(false)}>
              联系我
            </CtaButton>
          </motion.div>
        </motion.div>
      )}
    </>
  )
}

function Hero() {
  const ref = useRef<HTMLElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start start', 'end start'],
  })
  const bgY = useTransform(scrollYProgress, [0, 1], ['0%', '8%'])

  return (
    <section
      id="home"
      ref={ref}
      className="relative h-screen w-full overflow-hidden z-10"
    >
      <motion.img
        src="/sky.jpg"
        alt=""
        className="absolute inset-0 z-0 h-[120%] w-full object-cover"
        style={{ y: bgY }}
      />

      <div className="relative z-10 flex justify-center pt-[22vh] md:pt-32 lg:pt-36 pointer-events-none">
        <h1
          className="text-[clamp(3rem,14vw,14rem)] font-semibold leading-none whitespace-nowrap bg-clip-text text-transparent mix-blend-lighten"
          style={{
            backgroundImage: 'linear-gradient(to bottom, #A8B4FF, #FFFFFF)',
          }}
        >
          Yang{'\u00A0\u00A0'}Jiapeng
        </h1>
      </div>

      <p className="absolute z-20 left-6 top-[200px] md:left-12 md:top-[320px] lg:left-24 text-lg md:text-[22px] md:leading-6 font-medium text-white/70 mix-blend-overlay hidden md:block pointer-events-none">
        初级 Linux 运维工程师
      </p>
      <p className="absolute z-20 right-6 top-[200px] md:right-12 md:top-[320px] lg:right-24 text-lg md:text-[22px] md:leading-6 font-medium text-white mix-blend-overlay hidden md:block pointer-events-none text-right">
        唐山 · 随时到岗
      </p>

      <motion.img
        src="/building.webp"
        alt=""
        className="absolute inset-0 z-30 h-[120%] w-full object-cover pointer-events-none"
        style={{ y: bgY }}
      />
    </section>
  )
}

function CharReveal({ text }: { text: string }) {
  const ref = useRef<HTMLParagraphElement>(null)
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['start 0.8', 'end 0.2'],
  })
  const chars = Array.from(text)

  return (
    <p
      ref={ref}
      className="max-w-[820px] mx-auto px-5 sm:px-6 pb-16 sm:pb-24 pt-8 sm:pt-12 md:px-12 text-xl sm:text-2xl md:text-[40px] md:leading-[48px] text-center leading-snug tracking-tight font-medium text-white"
    >
      {chars.map((ch, i) => (
        <Char key={`${i}-${ch}`} ch={ch} index={i} total={chars.length} progress={scrollYProgress} />
      ))}
    </p>
  )
}

function Char({
  ch,
  index,
  total,
  progress,
}: {
  ch: string
  index: number
  total: number
  progress: MotionValue<number>
}) {
  const start = Math.max(0, index / total - 0.01)
  const end = Math.min(1, index / total + 0.01)
  const opacity = useTransform(progress, [start, end], [0.25, 1])
  return (
    <motion.span style={{ opacity }} className="inline">
      {ch === ' ' ? '\u00A0' : ch}
    </motion.span>
  )
}

function MarqueeRow({
  items,
  reverse,
}: {
  items: typeof MARQUEE_ROW1
  reverse?: boolean
}) {
  const doubled = [...items, ...items, ...items, ...items]
  return (
    <div className="overflow-hidden">
      <div
        className={`flex w-max gap-8 sm:gap-12 ${
          reverse ? 'animate-marquee-reverse' : 'animate-marquee'
        }`}
      >
        {doubled.map(({ Icon, name }, i) => (
          <div key={`${name}-${i}`} className="flex items-center gap-2 shrink-0">
            <Icon className="h-4 w-4 sm:h-5 sm:w-5 text-white/80" />
            <span className="text-sm sm:text-base font-medium text-white/90 whitespace-nowrap">
              {name}
            </span>
          </div>
        ))}
      </div>
    </div>
  )
}

function Stats() {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-100px' })

  return (
    <div className="relative px-5 sm:px-6 py-16 md:py-32">
      <div className="absolute -top-[400px] left-0 right-0 bottom-0 bg-gradient-to-b from-transparent via-white/60 to-white pointer-events-none" />
      <div className="relative z-10">
        <h2 className="text-2xl md:text-[40px] md:leading-[44px] font-medium text-brand-navy text-center mb-10 sm:mb-16">
          用真实数据说话
        </h2>
        <div
          ref={ref}
          className="grid grid-cols-2 md:flex md:justify-center md:items-center max-w-5xl mx-auto gap-y-10"
        >
          {STATS.map((stat, i) => (
            <div key={stat.label} className="contents">
              {i > 0 && (
                <div className="hidden md:block h-[80px] w-px bg-brand-navy/20 mx-8 lg:mx-12" />
              )}
              <motion.div
                className="flex flex-col items-center text-center px-2"
                initial={{ opacity: 0, y: 30 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.6, delay: i * 0.15 }}
              >
                <span className="text-4xl sm:text-5xl md:text-[64px] md:leading-[76px] font-semibold text-brand-navy">
                  {stat.value}
                </span>
                <span className="text-sm sm:text-base md:text-xl font-medium text-brand-navy/70 text-center">
                  {stat.label}
                </span>
              </motion.div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

function SectionHeading({
  children,
  dark,
}: {
  children: ReactNode
  dark?: boolean
}) {
  return (
    <h2
      className={`text-2xl md:text-[40px] md:leading-[44px] font-medium text-center mb-10 sm:mb-14 ${
        dark ? 'text-white' : 'text-brand-navy'
      }`}
    >
      {children}
    </h2>
  )
}

function FadeUp({
  children,
  className = '',
  delay = 0,
}: {
  children: ReactNode
  className?: string
  delay?: number
}) {
  const ref = useRef<HTMLDivElement>(null)
  const inView = useInView(ref, { once: true, margin: '-80px' })
  return (
    <motion.div
      ref={ref}
      className={className}
      initial={{ opacity: 0, y: 28 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay }}
    >
      {children}
    </motion.div>
  )
}

function SkillsSection() {
  return (
    <section id="skills" className="relative bg-white px-5 sm:px-6 pb-16 md:pb-24">
      <SectionHeading>技能</SectionHeading>
      <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6 md:gap-8">
        {SKILLS.map((group, i) => (
          <FadeUp key={group.title} delay={i * 0.1}>
            <div className="h-full rounded-2xl border border-brand-navy/10 bg-brand-navy/[0.03] p-6 md:p-8">
              <h3 className="text-lg md:text-xl font-semibold text-brand-navy mb-4">
                {group.title}
              </h3>
              <ul className="space-y-3 text-sm md:text-base text-brand-navy/80 leading-relaxed">
                {group.items.map((item) => (
                  <li key={item} className="flex gap-2">
                    <Sparkles className="h-4 w-4 mt-1 shrink-0 text-brand-blue" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </FadeUp>
        ))}
      </div>
      <div className="max-w-5xl mx-auto mt-10 flex flex-wrap justify-center gap-2 sm:gap-3">
        {[
          'Linux',
          'Shell',
          'Nginx',
          '权限管理',
          '服务管理',
          '日志排查',
          '网络基础',
          'MySQL',
          '信息安全',
          'Git',
        ].map((tag) => (
          <span
            key={tag}
            className="rounded-full border border-brand-navy/15 px-3 py-1.5 text-sm font-medium text-brand-navy/80"
          >
            {tag}
          </span>
        ))}
      </div>
    </section>
  )
}

function ProjectsSection() {
  return (
    <section id="projects" className="relative bg-white px-5 sm:px-6 py-16 md:py-24">
      <SectionHeading>项目与练习</SectionHeading>
      <div className="max-w-5xl mx-auto space-y-6 md:space-y-8 mb-16">
        {PRACTICE_PROJECTS.map((p, i) => (
          <FadeUp key={p.title} delay={i * 0.1}>
            <article className="rounded-2xl border border-brand-navy/10 p-6 md:p-8 bg-gradient-to-br from-white to-brand-blue/10">
              <h3 className="text-xl md:text-2xl font-semibold text-brand-navy mb-3">
                {p.title}
              </h3>
              <div className="flex flex-wrap gap-2 mb-4">
                {p.tags.map((t) => (
                  <span
                    key={t}
                    className="rounded-full bg-brand-navy/5 px-3 py-1 text-xs sm:text-sm text-brand-navy/70"
                  >
                    {t}
                  </span>
                ))}
              </div>
              <ul className="space-y-2 text-sm md:text-base text-brand-navy/80 leading-relaxed list-disc pl-5">
                {p.bullets.map((b) => (
                  <li key={b}>{b}</li>
                ))}
              </ul>
            </article>
          </FadeUp>
        ))}
      </div>

      <h3 className="text-xl md:text-2xl font-semibold text-brand-navy text-center mb-8">
        GitHub 仓库
      </h3>
      <div className="max-w-5xl mx-auto grid sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {GITHUB_REPOS.map((repo, i) => (
          <FadeUp key={repo.name} delay={i * 0.06}>
            <a
              href={repo.url}
              target="_blank"
              rel="noreferrer"
              className="group flex h-full flex-col rounded-2xl border border-brand-navy/10 p-5 md:p-6 hover:border-brand-blue/50 hover:shadow-lg transition-all bg-white"
            >
              <div className="flex items-start justify-between gap-2 mb-2">
                <span className="font-semibold text-brand-navy group-hover:text-[#5a6fd6] transition-colors">
                  {repo.name}
                </span>
                <ExternalLink className="h-4 w-4 text-brand-navy/40 group-hover:text-brand-navy shrink-0" />
              </div>
              <p className="text-sm text-brand-navy/70 flex-1 leading-relaxed">
                {repo.description}
              </p>
              {repo.language && (
                <span className="mt-4 text-xs font-medium text-brand-navy/50">
                  {repo.language}
                </span>
              )}
            </a>
          </FadeUp>
        ))}
      </div>
    </section>
  )
}

function EducationSection() {
  return (
    <section id="education" className="relative bg-white px-5 sm:px-6 pb-16 md:pb-28">
      <SectionHeading>教育与自学</SectionHeading>
      <div className="max-w-3xl mx-auto space-y-6">
        <FadeUp>
          <div className="rounded-2xl border border-brand-navy/10 p-6 md:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
              <h3 className="text-xl font-semibold text-brand-navy">
                天津工业职业学院
              </h3>
              <span className="text-sm text-brand-navy/60">2022 — 2025</span>
            </div>
            <p className="text-brand-navy/80 font-medium mb-3">
              信息安全技术应用 · 大专
            </p>
            <p className="text-sm md:text-base text-brand-navy/70 leading-relaxed">
              相关方向：Linux 基础、计算机网络、信息安全基础、数据库基础、操作系统基础。
            </p>
          </div>
        </FadeUp>
        <FadeUp delay={0.1}>
          <div className="rounded-2xl border border-brand-navy/10 p-6 md:p-8">
            <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
              <h3 className="text-xl font-semibold text-brand-navy">
                Linux 运维方向自学
              </h3>
              <span className="text-sm text-brand-navy/60">2024 — 至今</span>
            </div>
            <ul className="space-y-2 text-sm md:text-base text-brand-navy/70 leading-relaxed list-disc pl-5">
              <li>
                系统学习 Linux 常用命令、文件管理、服务管理、日志查看和网络排查基础
              </li>
              <li>
                结合信息安全专业背景，持续补充计算机网络、数据库与系统安全相关知识
              </li>
              <li>
                整理常用命令、排障流程和学习笔记，提升独立学习与问题解决能力
              </li>
            </ul>
          </div>
        </FadeUp>
      </div>
    </section>
  )
}

function ContactSection() {
  return (
    <section
      id="contact"
      className="relative bg-brand-dark px-5 sm:px-6 py-20 md:py-28 text-white"
    >
      <SectionHeading dark>联系</SectionHeading>
      <FadeUp>
        <div className="max-w-xl mx-auto text-center space-y-6">
          <p className="text-white/80 text-base md:text-lg leading-relaxed">
            求职意向：初级 Linux 运维工程师 / 运维工程师助理
            <br />
            期待与你交流运维、Linux 桌面与开源相关话题。
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <a
              href="mailto:yukong79a@gmail.com"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm md:text-base hover:bg-white/10 transition-colors"
            >
              <Mail className="h-4 w-4" />
              yukong79a@gmail.com
            </a>
            <a
              href="https://github.com/YuKong79A"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-white/20 px-5 py-2.5 text-sm md:text-base hover:bg-white/10 transition-colors"
            >
              <GitBranch className="h-4 w-4" />
              github.com/YuKong79A
            </a>
          </div>
          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <CtaButton
              href="/resume.pdf"
              className="px-8 sm:px-10 py-2.5 sm:py-3 text-base sm:text-lg gap-2"
            >
              <Download className="h-5 w-5" />
              下载简历 PDF
            </CtaButton>
            <span className="inline-flex items-center gap-2 text-white/60 text-sm">
              <MapPin className="h-4 w-4" />
              唐山 · 随时到岗
            </span>
          </div>
        </div>
      </FadeUp>
      <footer className="max-w-5xl mx-auto mt-16 pt-8 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-sm text-white/40">
        <span>© {new Date().getFullYear()} 杨佳澎 / YuKong</span>
        <span>Built with React · Deployed on Cloudflare Pages</span>
      </footer>
    </section>
  )
}

function MountainContent() {
  const wrapperRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: wrapperRef,
    offset: ['start start', 'end end'],
  })
  const mountainY = useTransform(scrollYProgress, [0, 1], ['0%', '-20%'])

  return (
    <div ref={wrapperRef} className="relative z-40 -mt-[25vh]">
      <div className="absolute -top-[10vh] left-0 right-0 bottom-0 overflow-hidden pointer-events-none">
        <motion.img
          src="/mountain.jpg"
          alt=""
          className="absolute inset-x-0 -top-[10vh] bottom-0 h-[120%] w-full object-cover object-top"
          style={{ y: mountainY }}
        />
      </div>

      <div id="about" className="relative pt-24 sm:pt-32 md:pt-40">
        <div className="flex flex-col items-center px-5 sm:px-6 py-16 md:py-32">
          <p
            className="max-w-[600px] text-sm sm:text-base md:text-lg font-medium text-white/90 leading-relaxed text-center"
            style={{ textShadow: '2px 4px 26px rgba(0, 0, 0, 0.56)' }}
          >
            信息安全技术应用大专应届生，求职方向明确为 Linux 运维。日常使用
            Arch Linux（linux-zen）+ Hyprland + Caelestia
            Shell，愿意从服务器巡检、基础排障、账号权限、服务管理、文档整理等基础工作做起，长期积累系统、网络、数据库与自动化运维能力。
          </p>
          <CtaButton
            href="#contact"
            className="mt-6 sm:mt-7 px-8 sm:px-10 py-2.5 sm:py-3 text-base sm:text-lg"
          >
            联系我
          </CtaButton>
        </div>

        <CharReveal text={SELF_EVAL} />

        <div className="max-w-[820px] mx-auto py-4 sm:py-6 overflow-hidden space-y-4">
          <MarqueeRow items={MARQUEE_ROW1} />
          <MarqueeRow items={MARQUEE_ROW2} reverse />
        </div>

        <Stats />
      </div>
    </div>
  )
}

export default function App() {
  return (
    <div className="min-h-screen bg-brand-dark">
      <Navbar />
      <Hero />
      <MountainContent />
      <div className="relative z-40 bg-white">
        <SkillsSection />
        <ProjectsSection />
        <EducationSection />
      </div>
      <div className="relative z-40">
        <ContactSection />
      </div>
    </div>
  )
}
