// 링크 목록 더미 데이터

export type LinkItem = {
  /** 고유 식별자 */
  id: number;
  /** 링크 카드 제목 */
  title: string;
  /** 부제목 또는 설명 */
  description: string;
  /** 이동할 URL */
  href: string;
  /** 아이콘 타입 ("github" | "velog" | "notion" | "email" | "linkedin" | "youtube" | "instagram" | "custom") */
  icon: "github" | "velog" | "notion" | "email" | "linkedin" | "youtube" | "instagram" | "custom";
  /** 아이콘이 "custom"일 때 표시할 이모지 또는 텍스트 */
  emoji?: string;
  /** 아이콘 배경 색상 (Tailwind 클래스) */
  iconBg?: string;
  /** 아이콘 텍스트/SVG 색상 (Tailwind 클래스) */
  iconColor?: string;
  /** 링크를 새 탭에서 열지 여부 */
  external?: boolean;
  /** 강조 표시 여부 (이메일처럼 primary 스타일) */
  featured?: boolean;
};

export const links: LinkItem[] = [
  {
    id: 1,
    title: "GitHub",
    description: "오픈소스 및 로봇 알고리즘 코드",
    href: "https://github.com/kdohun42",
    icon: "github",
    iconBg: "bg-[#0f1419]",
    iconColor: "text-white",
    external: true,
  },
  {
    id: 2,
    title: "기술 블로그 (Velog)",
    description: "ROS 2, 제어 이론, 트러블슈팅",
    href: "https://velog.io/@kdohun42",
    icon: "velog",
    emoji: "✍",
    external: true,
  },
  {
    id: 3,
    title: "노션 포트폴리오",
    description: "프로젝트 설계서 & 수상 기록",
    href: "https://notion.so",
    icon: "notion",
    emoji: "📑",
    external: true,
  },
  {
    id: 4,
    title: "LinkedIn",
    description: "커리어 & 네트워킹",
    href: "https://linkedin.com/in/kdohun42",
    icon: "linkedin",
    iconBg: "bg-[#0a66c2]",
    iconColor: "text-white",
    external: true,
  },
  {
    id: 5,
    title: "YouTube 데모 채널",
    description: "로봇 시연 영상 & 프로젝트 쇼케이스",
    href: "https://youtube.com/@kdohun42",
    icon: "youtube",
    iconBg: "bg-[#ff0000]",
    iconColor: "text-white",
    external: true,
  },
  {
    id: 6,
    title: "직접 메일 보내기",
    description: "contact@example.com",
    href: "mailto:contact@example.com",
    icon: "email",
    iconBg: "bg-[#0064e0]",
    iconColor: "text-white",
    external: false,
    featured: true,
  },
];
