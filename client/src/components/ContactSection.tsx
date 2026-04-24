/* =============================================================
   LILAAS – ContactSection: Contact form + info
   ============================================================= */
import { useEffect, useRef, useState } from "react";
import { Mail, Phone, MapPin, Clock, Send, CheckCircle } from "lucide-react";

export default function ContactSection() {
  const ref = useRef<HTMLDivElement>(null);
  const [sent, setSent] = useState(false);
  const [form, setForm] = useState({ name: "", company: "", email: "", subject: "", message: "" });

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) entry.target.classList.add("visible");
        });
      },
      { threshold: 0.1 }
    );
    el.querySelectorAll(".reveal").forEach((r) => observer.observe(r));
    return () => observer.disconnect();
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Redirect to mailto
    const subject = encodeURIComponent(form.subject || "Inquiry from website");
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\n\n${form.message}`
    );
    window.location.href = `mailto:sales@lilaas.no?subject=${subject}&body=${body}`;
    setSent(true);
    setTimeout(() => setSent(false), 4000);
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    background: "rgba(255,255,255,0.05)",
    border: "1px solid rgba(255,255,255,0.1)",
    borderRadius: "2px",
    padding: "0.875rem 1rem",
    color: "white",
    fontFamily: "'DM Sans', sans-serif",
    fontSize: "0.9rem",
    outline: "none",
    transition: "border-color 0.3s ease",
    boxSizing: "border-box",
  };

  return (
    <section
      id="contact"
      ref={ref}
      style={{
        background: "linear-gradient(180deg, var(--lilaas-steel) 0%, var(--lilaas-navy) 100%)",
        padding: "8rem 0",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Blueprint grid */}
      <div className="blueprint-grid" style={{
        position: "absolute",
        inset: 0,
        opacity: 0.3,
        pointerEvents: "none",
      }} />

      {/* Glow */}
      <div style={{
        position: "absolute",
        top: "-100px",
        left: "50%",
        transform: "translateX(-50%)",
        width: "800px",
        height: "400px",
        background: "radial-gradient(ellipse, rgba(255,140,0,0.05) 0%, transparent 70%)",
        pointerEvents: "none",
      }} />

      <div className="container" style={{ position: "relative", zIndex: 1 }}>
        <div className="reveal" style={{ marginBottom: "4rem" }}>
          <div className="section-label" style={{ marginBottom: "1rem" }}>Contact Us</div>
          <h2 style={{
            fontFamily: "'Space Grotesk', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(2rem, 4vw, 3rem)",
            color: "white",
            margin: 0,
            lineHeight: 1.1,
          }}>
            Let's Build Something<br />
            <span style={{ color: "var(--lilaas-orange)" }}>Extraordinary Together</span>
          </h2>
        </div>

        <div style={{
          display: "grid",
          gridTemplateColumns: "1fr 1.6fr",
          gap: "4rem",
          alignItems: "start",
        }}
          className="contact-grid"
        >
          {/* Left: Info */}
          <div>
            <p className="reveal" style={{
              fontFamily: "'DM Sans', sans-serif",
              fontSize: "0.95rem",
              color: "rgba(255,255,255,0.55)",
              lineHeight: 1.8,
              marginBottom: "2.5rem",
            }}>
              Whether you need precision control systems for your vessel, high-tolerance machined components, or a custom engineering solution — our team is ready to help.
            </p>

            {[
              { icon: MapPin, label: "Address", value: "Kongeveien 75, 3188 Horten, Norway" },
              { icon: Phone, label: "Phone", value: "+47 416 33 000" },
              { icon: Mail, label: "Email", value: "sales@lilaas.no" },
              { icon: Clock, label: "Hours", value: "Monday–Friday, 08:00–16:00" },
            ].map(({ icon: Icon, label, value }) => (
              <div key={label} className="reveal" style={{
                display: "flex",
                alignItems: "flex-start",
                gap: "1rem",
                marginBottom: "1.5rem",
              }}>
                <div style={{
                  width: "40px",
                  height: "40px",
                  background: "rgba(255,140,0,0.1)",
                  border: "1px solid rgba(255,140,0,0.2)",
                  borderRadius: "2px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                  marginTop: "2px",
                }}>
                  <Icon size={16} color="var(--lilaas-orange)" />
                </div>
                <div>
                  <div style={{
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.15em",
                    color: "rgba(255,255,255,0.35)",
                    textTransform: "uppercase",
                    marginBottom: "2px",
                  }}>
                    {label}
                  </div>
                  <div style={{
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "0.9rem",
                    color: "rgba(255,255,255,0.8)",
                  }}>
                    {value}
                  </div>
                </div>
              </div>
            ))}

            {/* Certifications */}
            <div className="reveal" style={{
              marginTop: "2.5rem",
              padding: "1.25rem",
              background: "rgba(255,255,255,0.03)",
              border: "1px solid rgba(255,255,255,0.06)",
              borderRadius: "2px",
            }}>
              <div style={{
                fontFamily: "'JetBrains Mono', monospace",
                fontSize: "0.65rem",
                letterSpacing: "0.15em",
                color: "rgba(255,255,255,0.35)",
                textTransform: "uppercase",
                marginBottom: "0.75rem",
              }}>
                Certifications
              </div>
              <div style={{ display: "flex", gap: "0.75rem", flexWrap: "wrap" }}>
                {["DNV GL", "ISO 9001-2015", "NS-EN Certified"].map((cert) => (
                  <span key={cert} style={{
                    fontFamily: "'Space Grotesk', sans-serif",
                    fontSize: "0.75rem",
                    fontWeight: 600,
                    color: "var(--lilaas-orange)",
                    background: "rgba(255,140,0,0.08)",
                    border: "1px solid rgba(255,140,0,0.2)",
                    padding: "0.3rem 0.75rem",
                    borderRadius: "2px",
                  }}>
                    {cert}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Form */}
          <div className="steel-card reveal" style={{ padding: "2.5rem", borderRadius: "2px" }}>
            {sent ? (
              <div style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                padding: "3rem",
                gap: "1rem",
              }}>
                <CheckCircle size={48} color="var(--lilaas-orange)" />
                <h3 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  color: "white",
                  margin: 0,
                }}>Message Sent!</h3>
                <p style={{
                  fontFamily: "'DM Sans', sans-serif",
                  color: "rgba(255,255,255,0.55)",
                  textAlign: "center",
                  margin: 0,
                }}>
                  Your email client should open. We'll get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <h3 style={{
                  fontFamily: "'Space Grotesk', sans-serif",
                  fontWeight: 700,
                  fontSize: "1.2rem",
                  color: "white",
                  marginBottom: "2rem",
                }}>
                  Send a Message
                </h3>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                  <div>
                    <label style={{
                      display: "block",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                      color: "rgba(255,255,255,0.4)",
                      textTransform: "uppercase",
                      marginBottom: "0.4rem",
                    }}>Name *</label>
                    <input
                      required
                      type="text"
                      placeholder="Your name"
                      value={form.name}
                      onChange={(e) => setForm({ ...form, name: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "var(--lilaas-orange)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                  <div>
                    <label style={{
                      display: "block",
                      fontFamily: "'JetBrains Mono', monospace",
                      fontSize: "0.65rem",
                      letterSpacing: "0.12em",
                      color: "rgba(255,255,255,0.4)",
                      textTransform: "uppercase",
                      marginBottom: "0.4rem",
                    }}>Company</label>
                    <input
                      type="text"
                      placeholder="Company name"
                      value={form.company}
                      onChange={(e) => setForm({ ...form, company: e.target.value })}
                      style={inputStyle}
                      onFocus={(e) => (e.target.style.borderColor = "var(--lilaas-orange)")}
                      onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                    />
                  </div>
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{
                    display: "block",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    color: "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                    marginBottom: "0.4rem",
                  }}>Email *</label>
                  <input
                    required
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--lilaas-orange)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>
                <div style={{ marginBottom: "1rem" }}>
                  <label style={{
                    display: "block",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    color: "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                    marginBottom: "0.4rem",
                  }}>Subject</label>
                  <input
                    type="text"
                    placeholder="How can we help?"
                    value={form.subject}
                    onChange={(e) => setForm({ ...form, subject: e.target.value })}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--lilaas-orange)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>
                <div style={{ marginBottom: "1.75rem" }}>
                  <label style={{
                    display: "block",
                    fontFamily: "'JetBrains Mono', monospace",
                    fontSize: "0.65rem",
                    letterSpacing: "0.12em",
                    color: "rgba(255,255,255,0.4)",
                    textTransform: "uppercase",
                    marginBottom: "0.4rem",
                  }}>Message *</label>
                  <textarea
                    required
                    rows={5}
                    placeholder="Tell us about your project or inquiry..."
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    style={{ ...inputStyle, resize: "vertical", minHeight: "120px" }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--lilaas-orange)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(255,255,255,0.1)")}
                  />
                </div>
                <button
                  type="submit"
                  className="btn-orange"
                  style={{
                    width: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "0.5rem",
                    fontSize: "0.85rem",
                  }}
                >
                  <Send size={14} />
                  Send Message
                </button>
              </form>
            )}
          </div>
        </div>
      </div>

      <style>{`
        @media (max-width: 900px) {
          .contact-grid {
            grid-template-columns: 1fr !important;
            gap: 2.5rem !important;
          }
        }
      `}</style>
    </section>
  );
}
