/* =============================================================
   LILAAS AS – Home Page
   Design: Industrial Precision Dark
   Fonts: Space Grotesk (headings) + DM Sans (body) + JetBrains Mono (accents)
   Colors: Deep navy #0d1520, Steel #1a2535, Orange #FF8C00
   ============================================================= */
import { useEffect, useRef, useState } from "react";
import HeroCanvas from "@/components/HeroCanvas";
import Navbar from "@/components/Navbar";
import StatsSection from "@/components/StatsSection";
import ProductsSection from "@/components/ProductsSection";
import AboutSection from "@/components/AboutSection";
import ContactSection from "@/components/ContactSection";
import GlobalReachSection from "@/components/GlobalReachSection";
import ClientsSection from "@/components/ClientsSection";
import Footer from "@/components/Footer";
import { ChevronDown, ArrowRight } from "lucide-react";

// Typewriter effect hook
function useTypewriter(words: string[], speed = 80, pause = 2000) {
  const [text, setText] = useState("");
  const [wordIndex, setWordIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const current = words[wordIndex % words.length];
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setText(current.slice(0, text.length + 1));
        if (text.length === current.length) {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        setText(current.slice(0, text.length - 1));
        if (text.length === 0) {
          setIsDeleting(false);
          setWordIndex((i) => i + 1);
        }
      }
    }, isDeleting ? speed / 2 : speed);
    return () => clearTimeout(timeout);
  }, [text, isDeleting, wordIndex, words, speed, pause]);

  return text;
}

// Horizontal marquee strip
function MarqueeStrip() {
  const items = [
    "Control Levers",
    "Precision Mechanics",
    "Thruster Control",
    "DNV GL Certified",
    "Founded 1961",
    "Horten Norway",
    "CERN Components",
    "Maritime Excellence",
    "ISO 9001-2015",
    "World Leader",
  ];
  return (
    <div style={{
      background: "var(--lilaas-orange)",
      padding: "0.6rem 0",
      overflow: "hidden",
      position: "relative",
      zIndex: 10,
    }}>
      <div style={{
        display: "flex",
        gap: "3rem",
        animation: "marquee 30s linear infinite",
        whiteSpace: "nowrap",
        width: "max-content",
      }}>
        {[...items, ...items, ...items].map((item, i) => (
          <span key={i} style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 700,
            fontSize: "0.72rem",
            letterSpacing: "0.15em",
            textTransform: "uppercase",
            color: "#0d1520",
            display: "flex",
            alignItems: "center",
            gap: "1rem",
          }}>
            {item}
            <span style={{ opacity: 0.4, fontSize: "0.5rem" }}>◆</span>
          </span>
        ))}
      </div>
      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-33.33%); }
        }
      `}</style>
    </div>
  );
}

// Hero section
function HeroSection() {
  const typeText = useTypewriter(
    ["Control Levers", "Precision Mechanics", "Thruster Systems", "Maritime Innovation"],
    75,
    2200
  );
  const scrollRef = useRef<HTMLDivElement>(null);

  return (
    <section style={{
      position: "relative",
      minHeight: "100vh",
      display: "flex",
      flexDirection: "column",
      justifyContent: "center",
      overflow: "hidden",
      background: "var(--lilaas-navy)",
    }}>
      {/* Background image with overlay */}
      <div style={{
        position: "absolute",
        inset: 0,
        zIndex: 0,
      }}>
        <img
          src="https://d2xsxph8kpxj0f.cloudfront.net/310519663594364321/cSwtBs32Y4mwtMGtDapFRB/lilaas_hero_bg-gNewmNfCpSarRWm6Fd6wbw.webp"
          alt=""
          style={{
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "center",
            opacity: 0.25,
          }}
        />
        {/* Gradient overlay */}
        <div style={{
          position: "absolute",
          inset: 0,
          background: "linear-gradient(135deg, rgba(13,21,32,0.95) 0%, rgba(13,21,32,0.7) 50%, rgba(13,21,32,0.85) 100%)",
        }} />
      </div>

      {/* Three.js Canvas */}
      <HeroCanvas />

      {/* Scanline effect */}
      <div className="scanline" />

      {/* Content */}
      <div className="container" style={{ position: "relative", zIndex: 2, paddingTop: "100px" }}>
        <div style={{ maxWidth: "780px" }}>
          {/* Label */}
          <div className="section-label" style={{ marginBottom: "1.5rem", animationDelay: "0.2s" }}>
            Est. 1961 · Horten, Norway
          </div>

          {/* Main heading */}
          <h1 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2.5rem, 6vw, 5rem)",
            color: "white",
            lineHeight: 1.05,
            letterSpacing: "-0.03em",
            marginBottom: "1rem",
          }}>
            World Experts in<br />
            <span style={{
              color: "var(--lilaas-orange)",
              textShadow: "0 0 40px rgba(255,140,0,0.3)",
            }}>
              {typeText}
              <span className="cursor-blink">|</span>
            </span>
          </h1>

          {/* Subheading */}
          <p style={{
            fontFamily: "'DM Sans', sans-serif",
            fontSize: "clamp(1rem, 2vw, 1.2rem)",
            color: "rgba(255,255,255,0.6)",
            lineHeight: 1.7,
            maxWidth: "560px",
            marginBottom: "2.5rem",
          }}>
            For over 60 years, Lilaas AS has delivered precision-engineered control systems to the world's most demanding maritime, offshore, and industrial applications — from ship bridges to CERN's particle accelerator.
          </p>

          {/* CTAs */}
          <div style={{ display: "flex", gap: "1rem", flexWrap: "wrap", marginBottom: "4rem" }}>
            <button
              className="btn-orange"
              onClick={() => {
                document.querySelector("#control-levers")?.scrollIntoView({ behavior: "smooth" });
              }}
              style={{ display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
            >
              Explore Products <ArrowRight size={14} />
            </button>
            <button
              className="btn-ghost-orange"
              onClick={() => {
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
            >
              Contact Sales
            </button>
          </div>

          {/* Quick stats inline */}
          <div style={{ display: "flex", gap: "2.5rem", flexWrap: "wrap" }}>
            {[
              { val: "60+", label: "Years" },
              { val: "~60", label: "Engineers" },
              { val: "50%", label: "Exported" },
              { val: "DNV GL", label: "Certified" },
            ].map(({ val, label }) => (
              <div key={label}>
                <div style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.5rem",
                  color: "var(--lilaas-orange)",
                  lineHeight: 1,
                }}>{val}</div>
                <div style={{
                  fontFamily: "'JetBrains Mono', monospace",
                  fontSize: "0.65rem",
                  letterSpacing: "0.15em",
                  color: "rgba(255,255,255,0.35)",
                  textTransform: "uppercase",
                  marginTop: "3px",
                }}>{label}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div
        ref={scrollRef}
        style={{
          position: "absolute",
          bottom: "2.5rem",
          left: "50%",
          transform: "translateX(-50%)",
          zIndex: 2,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: "0.4rem",
          cursor: "pointer",
          opacity: 0.6,
          transition: "opacity 0.3s ease",
        }}
        onClick={() => {
          document.querySelector("#products-section")?.scrollIntoView({ behavior: "smooth" });
        }}
        onMouseEnter={(e) => (e.currentTarget.style.opacity = "1")}
        onMouseLeave={(e) => (e.currentTarget.style.opacity = "0.6")}
      >
        <span style={{
          fontFamily: "'JetBrains Mono', monospace",
          fontSize: "0.6rem",
          letterSpacing: "0.2em",
          color: "rgba(255,255,255,0.5)",
          textTransform: "uppercase",
        }}>Scroll</span>
        <ChevronDown size={16} color="var(--lilaas-orange)" style={{ animation: "bounce 2s ease-in-out infinite" }} />
      </div>

      {/* Bottom diagonal cut */}
      <div style={{
        position: "absolute",
        bottom: 0,
        left: 0,
        right: 0,
        height: "80px",
        background: "var(--lilaas-navy)",
        clipPath: "polygon(0 100%, 100% 0, 100% 100%)",
        zIndex: 3,
      }} />

      <style>{`
        @keyframes bounce {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(6px); }
        }
      `}</style>
    </section>
  );
}

// Lead times announcement banner
function AnnouncementBanner() {
  const [visible, setVisible] = useState(true);
  if (!visible) return null;
  return (
    <div style={{
      background: "linear-gradient(90deg, var(--lilaas-orange) 0%, #FFA733 100%)",
      padding: "0.75rem 1rem",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      gap: "1rem",
      position: "relative",
      zIndex: 100,
    }}>
      <div style={{
        width: "8px",
        height: "8px",
        background: "#0d1520",
        borderRadius: "50%",
        animation: "pulse 2s ease-in-out infinite",
      }} />
      <span style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700,
        fontSize: "0.8rem",
        letterSpacing: "0.05em",
        color: "#0d1520",
        textTransform: "uppercase",
      }}>
        Lead Times Reduced — Faster delivery, same uncompromising quality.
      </span>
      <a href="mailto:sales@lilaas.no" style={{
        fontFamily: "'Space Grotesk', sans-serif",
        fontWeight: 700,
        fontSize: "0.75rem",
        color: "#0d1520",
        textDecoration: "none",
        background: "rgba(0,0,0,0.15)",
        padding: "0.25rem 0.75rem",
        borderRadius: "2px",
        letterSpacing: "0.05em",
      }}>
        Enquire Now →
      </a>
      <button
        onClick={() => setVisible(false)}
        style={{
          position: "absolute",
          right: "1rem",
          background: "none",
          border: "none",
          color: "#0d1520",
          fontSize: "1rem",
          cursor: "pointer",
          opacity: 0.6,
          lineHeight: 1,
        }}
      >
        ×
      </button>
      <style>{`
        @keyframes pulse {
          0%, 100% { transform: scale(1); opacity: 1; }
          50% { transform: scale(1.4); opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}

// Industries horizontal scroll strip
function IndustriesStrip() {
  const industries = [
    { name: "Maritime", icon: "⚓" },
    { name: "Offshore", icon: "🛢" },
    { name: "Defence", icon: "🛡" },
    { name: "Aerospace", icon: "🚀" },
    { name: "Medicine", icon: "⚕" },
    { name: "Rail", icon: "🚂" },
    { name: "Robotics", icon: "🤖" },
    { name: "CERN / Science", icon: "⚛" },
  ];

  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.2 }
    );
    el.querySelectorAll(".reveal").forEach((r) => observer.observe(r));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: "var(--lilaas-steel)",
        padding: "5rem 0",
        overflow: "hidden",
        position: "relative",
      }}
    >
      <div className="container">
        <div className="section-label reveal" style={{ marginBottom: "2.5rem" }}>Industries We Serve</div>
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))",
          gap: "1rem",
        }}>
          {industries.map((ind, i) => (
            <div
              key={ind.name}
              className="reveal"
              style={{
                transitionDelay: `${i * 0.07}s`,
                padding: "1.5rem 1rem",
                background: "rgba(255,255,255,0.03)",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: "2px",
                textAlign: "center",
                transition: "all 0.3s ease",
                cursor: "default",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,140,0,0.08)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,140,0,0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLDivElement).style.background = "rgba(255,255,255,0.03)";
                (e.currentTarget as HTMLDivElement).style.borderColor = "rgba(255,255,255,0.06)";
              }}
            >
              <div style={{ fontSize: "1.5rem", marginBottom: "0.5rem" }}>{ind.icon}</div>
              <div style={{
                fontFamily: "'Space Grotesk', sans-serif",
                fontWeight: 600,
                fontSize: "0.8rem",
                color: "rgba(255,255,255,0.7)",
                letterSpacing: "0.03em",
              }}>
                {ind.name}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

// Feature highlight: 3D product showcase
function ProductShowcase() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.15 }
    );
    el.querySelectorAll(".reveal").forEach((r) => observer.observe(r));
    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={ref}
      style={{
        background: "var(--lilaas-navy)",
        padding: "8rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Orange glow center */}
      <div style={{
        position: "absolute",
        top: "50%",
        right: "-100px",
        transform: "translateY(-50%)",
        width: "700px",
        height: "700px",
        background: "radial-gradient(circle, rgba(255,140,0,0.07) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "5rem",
          alignItems: "center",
        }}
          className="showcase-grid"
        >
          {/* Left: Product image */}
          <div className="reveal" style={{ position: "relative" }}>
            <div style={{
              position: "relative",
              borderRadius: "2px",
              overflow: "hidden",
              aspectRatio: "1/1",
              maxWidth: "500px",
            }}>
              <img
                src="https://d2xsxph8kpxj0f.cloudfront.net/310519663594364321/cSwtBs32Y4mwtMGtDapFRB/lilaas_control_lever_3d-RKNmLZp7o6wH7yG3GV8tFu.webp"
                alt="Lilaas L01 Control Lever"
                className="float-anim"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
              {/* Glow overlay */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "radial-gradient(circle at 50% 50%, rgba(255,140,0,0.1) 0%, transparent 70%)",
                pointerEvents: "none",
              }} />
            </div>
            {/* Decorative elements */}
            <div style={{
              position: "absolute",
              top: "-20px",
              left: "-20px",
              width: "80px",
              height: "80px",
              borderTop: "2px solid var(--lilaas-orange)",
              borderLeft: "2px solid var(--lilaas-orange)",
              opacity: 0.5,
            }} />
            <div style={{
              position: "absolute",
              bottom: "-20px",
              right: "-20px",
              width: "80px",
              height: "80px",
              borderBottom: "2px solid var(--lilaas-orange)",
              borderRight: "2px solid var(--lilaas-orange)",
              opacity: 0.5,
            }} />
          </div>

          {/* Right: Content */}
          <div>
            <div className="section-label reveal" style={{ marginBottom: "1.5rem" }}>Flagship Product</div>
            <h2 className="reveal" style={{
              fontFamily: "'Space Grotesk', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3vw, 2.8rem)",
              color: "white",
              lineHeight: 1.1,
              marginBottom: "1.5rem",
            }}>
              The L01 Control Lever<br />
              <span style={{ color: "var(--lilaas-orange)" }}>Synchronised Precision</span>
            </h2>
            <p className="reveal" style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "1rem",
              color: "rgba(255,255,255,0.6)",
              lineHeight: 1.8,
              marginBottom: "2rem",
            }}>
              The L01 is Lilaas' most popular control lever — used on large ships with multiple bridge stations. When a captain moves the lever at one console, all identical handles elsewhere synchronize automatically via built-in electric motors, ensuring seamless, safe operation.
            </p>

            {/* Specs */}
            <div className="reveal" style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "1rem",
              marginBottom: "2rem",
            }}>
              {[
                { label: "Display", value: "TFT LCD Built-in" },
                { label: "Feedback", value: "Force Feedback" },
                { label: "Sync", value: "Multi-station" },
                { label: "Approval", value: "DNV GL Certified" },
              ].map(({ label, value }) => (
                <div key={label} style={{
                  padding: "1rem",
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.06)",
                  borderRadius: "2px",
                }}>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.62rem",
                    letterSpacing: "0.12em",
                    color: "rgba(255,255,255,0.3)",
                    textTransform: "uppercase",
                    marginBottom: "4px",
                  }}>{label}</div>
                  <div style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontWeight: 600,
                    fontSize: "0.9rem",
                    color: "var(--lilaas-orange)",
                  }}>{value}</div>
                </div>
              ))}
            </div>

            <a
              href="https://lilaas.no/control-levers/"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-orange reveal"
              style={{ textDecoration: "none", display: "inline-flex", alignItems: "center", gap: "0.5rem" }}
            >
              View All Control Levers <ArrowRight size={14} />
            </a>
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .showcase-grid {
            grid-template-columns: 1fr !important;
            gap: 3rem !important;
          }
        }
      `}</style>
    </section>
  );
}

export default function Home() {
  return (
    <div style={{ background: "var(--lilaas-navy)", minHeight: "100vh" }}>
      <Navbar />
      <HeroSection />
      <MarqueeStrip />
      <div id="products-section">
        <StatsSection />
      </div>
      <ProductsSection />
      <IndustriesStrip />
      <ProductShowcase />
      <GlobalReachSection />
      <ClientsSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </div>
  );
}
