"use client";

import { useState } from "react";

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState<"links" | "specs" | "projects">("links");
  const [copied, setCopied] = useState(false);
  const [boostCount, setBoostCount] = useState(88);
  const [isBoosting, setIsBoosting] = useState(false);

  const email = "contact@example.com";

  const handleCopyEmail = () => {
    navigator.clipboard.writeText(email);
    setCopied(true);
    setTimeout(() => setCopied(false), 2400);
  };

  const handleBoost = () => {
    setBoostCount((prev) => prev + 1);
    setIsBoosting(true);
    setTimeout(() => setIsBoosting(false), 600);
  };

  return (
    <div className="min-h-screen bg-[#ffffff] text-[#0f1419] flex flex-col font-sans selection:bg-[#0064e0] selection:text-white">
      {/* Sticky Top Promo Banner */}
      <div className="w-full bg-[#0f1419] text-white py-2 px-4 text-center text-xs sm:text-[13px] font-bold tracking-tight flex items-center justify-center gap-2">
        <span className="bg-[#ffd83d] text-[#0f1419] text-[10px] font-extrabold px-1.5 py-0.5 rounded-full uppercase tracking-wider">
          PORTFOLIO
        </span>
        <span className="truncate">광운대학교 로봇학부 김도훈 연구 및 하드웨어 쇼케이스</span>
        <span className="hidden sm:inline text-white/50">•</span>
        <a
          href={`mailto:${email}`}
          className="hidden sm:inline underline text-white hover:text-white/80 font-semibold"
        >
          협업 문의하기 ›
        </a>
      </div>

      {/* Top Header Navigation */}
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#e4e6eb] h-14 sm:h-16 px-4 sm:px-8 flex items-center justify-between max-w-6xl mx-auto w-full">
        <div className="flex items-center gap-3">
          <div className="w-7 h-7 rounded-full bg-[#0f1419] text-white flex items-center justify-center font-bold text-xs tracking-tighter">
            M
          </div>
          <div className="flex flex-col text-left">
            <span className="font-bold text-sm sm:text-base tracking-tight text-[#0f1419] meta-heading">
              Dohun Kim
            </span>
            <span className="text-[10px] text-[#65676b] font-medium tracking-tight">
              Robotics Lab
            </span>
          </div>
        </div>

        {/* Affirmative Status Badge */}
        <div className="flex items-center gap-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-[#f5f6f8] border border-[#e4e6eb] text-xs font-semibold text-[#1c2b33]">
            <span className="w-2 h-2 rounded-full bg-[#31a24c] inline-block animate-pulse"></span>
            <span>Research Fellow</span>
          </div>
        </div>
      </header>

      {/* Toast Notification (Meta Hardware Style) */}
      <div
        className={`fixed top-20 left-1/2 -translate-x-1/2 z-50 transition-all duration-300 ease-out transform ${
          copied
            ? "translate-y-0 opacity-100 scale-100"
            : "-translate-y-6 opacity-0 pointer-events-none scale-95"
        }`}
      >
        <div className="bg-[#0f1419] text-white px-5 py-2.5 rounded-full shadow-lg flex items-center gap-2 text-xs sm:text-sm font-semibold tracking-tight border border-white/10">
          <span className="text-[#31a24c]">✓</span>
          <span>이메일 주소가 클립보드에 복사되었습니다</span>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-3xl mx-auto px-4 sm:px-6 py-8 sm:py-12 flex flex-col gap-8">
        
        {/* HERO SHOWCASE CARD (Meta Product Feature Card) */}
        <section className="bg-white border border-[#e4e6eb] rounded-[32px] p-6 sm:p-10 flex flex-col items-center text-center relative overflow-hidden">
          
          {/* Subtle Tag */}
          <div className="inline-block bg-[#f5f6f8] text-[#4b4f56] px-3.5 py-1 rounded-full text-xs font-bold tracking-tight mb-5 border border-[#e4e6eb]">
            KWANGWOON UNIV. • HARDWARE & ROBOTICS
          </div>

          {/* Product Thumbnail Showcase Frame */}
          <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#f5f6f8] border border-[#e4e6eb] flex items-center justify-center p-4 mb-6 shadow-sm">
            <svg
              className="w-12 h-12 sm:w-14 sm:h-14 text-[#0f1419]"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <rect x="3" y="11" width="18" height="10" rx="3" stroke="#0f1419" />
              <circle cx="8.5" cy="16" r="1.5" fill="#0f1419" />
              <circle cx="15.5" cy="16" r="1.5" fill="#0f1419" />
              <path d="M12 2v4" />
              <circle cx="12" cy="2" r="1" fill="#0064e0" />
              <path d="M8 2h8" />
              <path d="M2 15h1" />
              <path d="M21 15h1" />
            </svg>
          </div>

          {/* Editorial Display Heading */}
          <h1 className="text-3xl sm:text-4xl font-medium tracking-tight text-[#0f1419] meta-heading">
            김도훈
          </h1>
          <p className="text-xl sm:text-2xl font-light text-[#65676b] tracking-tight mt-1 meta-heading">
            Look forward. Hardware & Intelligence.
          </p>

          {/* Meta Body copy */}
          <p className="mt-4 text-[#4b4f56] text-sm sm:text-base leading-relaxed max-w-lg font-normal tracking-[-0.16px]">
            광운대학교 로봇학부에서 기계 지능과 자율 제어 시스템을 연구하고 있습니다. ROS 2 기반 자율주행 모바일 로봇과 6축 매니퓰레이터 제어에 집중합니다.
          </p>

          {/* Two-tier CTA System */}
          <div className="mt-6 flex flex-wrap items-center justify-center gap-3 w-full max-w-md">
            {/* Primary Buy/Commerce CTA (Cobalt Blue Pill) */}
            <a
              href={`mailto:${email}`}
              className="flex-1 min-w-[140px] bg-[#0064e0] hover:bg-[#004bb3] text-white meta-pill-button py-3 px-6 text-sm flex items-center justify-center gap-2 cursor-pointer shadow-sm text-center"
            >
              <span>이메일 문의</span>
              <span>›</span>
            </a>

            {/* Secondary Marketing Ghost CTA (Black Outlined Pill) */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="flex-1 min-w-[140px] bg-transparent hover:bg-[#f5f6f8] text-[#0f1419] border-2 border-[#0f1419] meta-pill-button py-2.5 px-6 text-sm flex items-center justify-center gap-2 cursor-pointer text-center"
            >
              <span>GitHub 저장소</span>
              <span>↗</span>
            </a>
          </div>

          {/* Utility Row: Copy Email Pill + Hardware Energy Boost Button */}
          <div className="mt-5 w-full max-w-md flex items-center gap-2 pt-2 border-t border-[#e4e6eb]/60">
            {/* Email Copy Pill */}
            <button
              onClick={handleCopyEmail}
              className="flex-1 min-w-0 bg-[#f5f6f8] hover:bg-[#e4e6eb]/60 text-[#1c2b33] text-xs font-semibold py-2 px-3.5 rounded-full border border-[#ced0d4] meta-pill-button flex items-center justify-between cursor-pointer"
            >
              <div className="flex items-center gap-1.5 min-w-0 mr-1.5 truncate">
                <span className="text-[#65676b]">✉</span>
                <span className="font-mono text-[#4b4f56] truncate">{email}</span>
              </div>
              <span className="text-[#0064e0] text-[11px] font-bold shrink-0">
                {copied ? "복사됨" : "복사"}
              </span>
            </button>

            {/* Hardware Energy Spec Counter (Pill) */}
            <button
              onClick={handleBoost}
              className={`bg-[#f5f6f8] hover:bg-[#e4e6eb]/60 text-[#0f1419] text-xs font-bold py-2 px-3 rounded-full border border-[#ced0d4] meta-pill-button flex items-center gap-1.5 cursor-pointer shrink-0 ${
                isBoosting ? "scale-95 bg-[#e4e6eb]" : ""
              }`}
              title="하드웨어 에너지 부스트"
            >
              <span className="text-[#0064e0]">⚡</span>
              <span className="font-mono">{boostCount}</span>
            </button>
          </div>
        </section>

        {/* Category Pill Tabs Navigation (Meta Standard Pill-tabs) */}
        <div className="flex items-center justify-center gap-2 overflow-x-auto py-1">
          <button
            onClick={() => setActiveTab("links")}
            className={`meta-pill-button px-5 py-2 text-xs sm:text-sm font-bold cursor-pointer transition-all ${
              activeTab === "links"
                ? "bg-[#0f1419] text-white"
                : "bg-white text-[#1c2b33] border border-[#ced0d4] hover:bg-[#f5f6f8]"
            }`}
          >
            링크 & 소셜
          </button>
          <button
            onClick={() => setActiveTab("specs")}
            className={`meta-pill-button px-5 py-2 text-xs sm:text-sm font-bold cursor-pointer transition-all ${
              activeTab === "specs"
                ? "bg-[#0f1419] text-white"
                : "bg-white text-[#1c2b33] border border-[#ced0d4] hover:bg-[#f5f6f8]"
            }`}
          >
            기술 스펙 (Tech Specs)
          </button>
          <button
            onClick={() => setActiveTab("projects")}
            className={`meta-pill-button px-5 py-2 text-xs sm:text-sm font-bold cursor-pointer transition-all ${
              activeTab === "projects"
                ? "bg-[#0f1419] text-white"
                : "bg-white text-[#1c2b33] border border-[#ced0d4] hover:bg-[#f5f6f8]"
            }`}
          >
            연구 프로젝트
          </button>
        </div>

        {/* TAB 1: LINKS & CHANNELS */}
        {activeTab === "links" && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {/* GitHub Card */}
            <a
              href="https://github.com"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-[#e4e6eb] rounded-2xl p-5 hover:border-[#ced0d4] transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#0f1419] text-white flex items-center justify-center shrink-0">
                  <svg className="w-5 h-5 fill-current" viewBox="0 0 24 24">
                    <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z"
                    />
                  </svg>
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0f1419] tracking-tight">GitHub</h3>
                  <p className="text-xs text-[#65676b]">오픈소스 및 로봇 알고리즘 코드</p>
                </div>
              </div>
              <span className="text-[#8a8d91] group-hover:text-[#0f1419] text-lg font-bold">›</span>
            </a>

            {/* Velog Blog */}
            <a
              href="https://velog.io"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-[#e4e6eb] rounded-2xl p-5 hover:border-[#ced0d4] transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#f5f6f8] border border-[#e4e6eb] text-[#0f1419] flex items-center justify-center text-lg font-bold shrink-0">
                  ✍
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0f1419] tracking-tight">기술 블로그 (Velog)</h3>
                  <p className="text-xs text-[#65676b]">ROS 2, 제어 이론, 트러블슈팅</p>
                </div>
              </div>
              <span className="text-[#8a8d91] group-hover:text-[#0f1419] text-lg font-bold">›</span>
            </a>

            {/* Notion Portfolio */}
            <a
              href="https://notion.so"
              target="_blank"
              rel="noopener noreferrer"
              className="bg-white border border-[#e4e6eb] rounded-2xl p-5 hover:border-[#ced0d4] transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#f5f6f8] border border-[#e4e6eb] text-[#0f1419] flex items-center justify-center text-lg font-bold shrink-0">
                  📑
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0f1419] tracking-tight">노션 포트폴리오</h3>
                  <p className="text-xs text-[#65676b]">프로젝트 설계서 & 수상 기록</p>
                </div>
              </div>
              <span className="text-[#8a8d91] group-hover:text-[#0f1419] text-lg font-bold">›</span>
            </a>

            {/* Direct Email */}
            <a
              href={`mailto:${email}`}
              className="bg-[#f5f6f8] border border-[#e4e6eb] rounded-2xl p-5 hover:border-[#0064e0] transition-colors flex items-center justify-between group"
            >
              <div className="flex items-center gap-3.5">
                <div className="w-10 h-10 rounded-xl bg-[#0064e0] text-white flex items-center justify-center text-sm font-bold shrink-0">
                  ✉
                </div>
                <div>
                  <h3 className="font-bold text-sm text-[#0f1419] tracking-tight">직접 메일 보내기</h3>
                  <p className="text-xs text-[#0064e0] font-semibold">{email}</p>
                </div>
              </div>
              <span className="text-[#0064e0] text-lg font-bold">↗</span>
            </a>
          </div>
        )}

        {/* TAB 2: TECH SPECS TABLE (Meta Tech Specs Style) */}
        {activeTab === "specs" && (
          <div className="bg-white border border-[#e4e6eb] rounded-[32px] p-6 sm:p-8 flex flex-col gap-6">
            <div>
              <h2 className="text-xl sm:text-2xl font-medium tracking-tight text-[#0f1419] meta-heading">
                기술 사양 & 스택
              </h2>
              <p className="text-xs sm:text-sm text-[#65676b] mt-1 font-normal">
                하드웨어 제어부터 고차원 지능형 알고리즘까지의 연구 역량 사양입니다.
              </p>
            </div>

            {/* Spec Group 1: Robotics & Control */}
            <div className="flex flex-col border-t border-[#e4e6eb]">
              <div className="py-3 text-xs font-bold uppercase tracking-wider text-[#0064e0]">
                Robotics & Autonomous Control
              </div>
              {[
                { label: "프레임워크", value: "ROS 2 (Humble, Iron), ROS 1" },
                { label: "자율주행 & SLAM", value: "Nav2, Cartographer, 2D/3D LiDAR SLAM" },
                { label: "매니퓰레이션", value: "MoveIt! 2, Kinematics (FK/IK), Trajectory Planning" },
                { label: "시뮬레이션", value: "Gazebo Harmonic, RViz 2, Webots" },
              ].map((row, idx) => (
                <div
                  key={idx}
                  className="py-3 flex items-start justify-between border-t border-[#e4e6eb] text-xs sm:text-sm"
                >
                  <span className="font-bold text-[#1c2b33] w-1/3">{row.label}</span>
                  <span className="text-[#4b4f56] w-2/3 text-right">{row.value}</span>
                </div>
              ))}
            </div>

            {/* Spec Group 2: Software & Dev Tools */}
            <div className="flex flex-col border-t border-[#e4e6eb]">
              <div className="py-3 text-xs font-bold uppercase tracking-wider text-[#0f1419]">
                Software & Computing
              </div>
              {[
                { label: "프로그래밍 언어", value: "C++ (Modern 17/20), Python 3" },
                { label: "컴퓨터 비전", value: "OpenCV, YOLOv8, Depth Processing" },
                { label: "운영체제 & 도구", value: "Ubuntu Linux (20.04/22.04), Docker, Git" },
              ].map((row, idx) => (
                <div
                  key={idx}
                  className="py-3 flex items-start justify-between border-t border-[#e4e6eb] text-xs sm:text-sm"
                >
                  <span className="font-bold text-[#1c2b33] w-1/3">{row.label}</span>
                  <span className="text-[#4b4f56] w-2/3 text-right">{row.value}</span>
                </div>
              ))}
            </div>

            {/* Spec Group 3: Embedded & Electronics */}
            <div className="flex flex-col border-t border-[#e4e6eb]">
              <div className="py-3 text-xs font-bold uppercase tracking-wider text-[#65676b]">
                Embedded & Mechatronics
              </div>
              {[
                { label: "MCU & 임베디드", value: "STM32 (Cortex-M), ESP32, Arduino" },
                { label: "통신 프로토콜", value: "CAN Bus, UART, SPI, I2C" },
                { label: "기구 설계", value: "Autodesk Fusion 360, 3D Prototyping" },
              ].map((row, idx) => (
                <div
                  key={idx}
                  className="py-3 flex items-start justify-between border-t border-[#e4e6eb] text-xs sm:text-sm"
                >
                  <span className="font-bold text-[#1c2b33] w-1/3">{row.label}</span>
                  <span className="text-[#4b4f56] w-2/3 text-right">{row.value}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* TAB 3: FEATURED PROJECTS (Meta Showcase Cards) */}
        {activeTab === "projects" && (
          <div className="flex flex-col gap-4">
            {/* Project 1 */}
            <div className="bg-white border border-[#e4e6eb] rounded-[32px] p-6 sm:p-8 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="bg-[#f5f6f8] text-[#0064e0] text-[11px] font-bold px-3 py-1 rounded-full border border-[#e4e6eb]">
                  AUTONOMOUS MOBILITY
                </span>
                <span className="text-xs font-mono text-[#8a8d91]">2025 - Present</span>
              </div>
              <h3 className="text-xl font-medium tracking-tight text-[#0f1419] meta-heading">
                ROS 2 기반 실내 자율주행 모바일 로봇 & 동적 회피
              </h3>
              <p className="text-xs sm:text-sm text-[#4b4f56] leading-relaxed">
                2D LiDAR와 엔코더 오도메트리를 융합하여 정밀한 실내 지도를 생성하고 Nav2 경로 생성기를 통해 보행자 및 동적 장애물을 실시간으로 회피하는 자율주행 플랫폼입니다.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {["ROS 2", "Nav2", "Cartographer", "C++", "LiDAR"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-semibold bg-[#f5f6f8] text-[#1c2b33] px-2.5 py-1 rounded-full border border-[#e4e6eb]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Project 2 */}
            <div className="bg-white border border-[#e4e6eb] rounded-[32px] p-6 sm:p-8 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="bg-[#f5f6f8] text-[#0f1419] text-[11px] font-bold px-3 py-1 rounded-full border border-[#e4e6eb]">
                  ROBOTIC ARM
                </span>
                <span className="text-xs font-mono text-[#8a8d91]">2024</span>
              </div>
              <h3 className="text-xl font-medium tracking-tight text-[#0f1419] meta-heading">
                6축 다관절 매니퓰레이터 기구학 해석 및 궤적 제어
              </h3>
              <p className="text-xs sm:text-sm text-[#4b4f56] leading-relaxed">
                기구학(Kinematics) 모델링과 MoveIt! 프레임워크를 기반으로 CAN 버스 통신을 통해 각 관절 모터를 정밀 제어하여 대상물을 안전하게 픽앤플레이스합니다.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {["MoveIt! 2", "CAN Bus", "STM32", "Kinematics"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-semibold bg-[#f5f6f8] text-[#1c2b33] px-2.5 py-1 rounded-full border border-[#e4e6eb]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* Project 3 */}
            <div className="bg-white border border-[#e4e6eb] rounded-[32px] p-6 sm:p-8 flex flex-col gap-3">
              <div className="flex items-center justify-between">
                <span className="bg-[#f5f6f8] text-[#7952ff] text-[11px] font-bold px-3 py-1 rounded-full border border-[#e4e6eb]">
                  SPATIAL AI
                </span>
                <span className="text-xs font-mono text-[#8a8d91]">2024</span>
              </div>
              <h3 className="text-xl font-medium tracking-tight text-[#0f1419] meta-heading">
                RGB-D 카메라 기반 물체 3차원 바운딩 박스 추정
              </h3>
              <p className="text-xs sm:text-sm text-[#4b4f56] leading-relaxed">
                Intel RealSense 깊이 카메라와 딥러닝 객체 검출 모델을 파이프라인으로 연동하여 대상체의 실시간 3차원 공간 좌표를 계산하는 로봇 비전 시스템입니다.
              </p>
              <div className="flex flex-wrap gap-1.5 pt-2">
                {["YOLOv8", "RealSense", "OpenCV", "Python"].map((tag) => (
                  <span
                    key={tag}
                    className="text-[11px] font-semibold bg-[#f5f6f8] text-[#1c2b33] px-2.5 py-1 rounded-full border border-[#e4e6eb]"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      {/* Meta Footer Region */}
      <footer className="w-full border-t border-[#e4e6eb] bg-[#ffffff] py-8 px-4 text-center mt-12">
        <div className="max-w-3xl mx-auto flex flex-col items-center gap-2">
          <p className="text-xs text-[#65676b] font-medium">
            광운대학교 로봇학부 김도훈 (KIM DOHUN)
          </p>
          <p className="text-[11px] text-[#8a8d91]">
            Designed adhering to Meta Commerce & Hardware Design System Guidelines
          </p>
        </div>
      </footer>
    </div>
  );
}
