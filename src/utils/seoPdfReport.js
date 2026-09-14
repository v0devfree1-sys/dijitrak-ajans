import { jsPDF } from "jspdf";

const PRIMARY = [94, 79, 226];
const ACCENT = [43, 204, 165];
const DARK = [30, 27, 75];
const MUTED = [120, 120, 140];
const LIGHT = [248, 248, 252];

function scoreColor(s) {
  if (s >= 80) return [34, 197, 94];
  if (s >= 50) return [245, 158, 11];
  return [239, 68, 68];
}

function severityColor(sev) {
  if (sev === "critical") return [239, 68, 68];
  if (sev === "warning") return [245, 158, 11];
  return [59, 130, 246];
}

function severityLabel(sev) {
  return sev === "critical" ? "Kritik" : sev === "warning" ? "Uyarı" : "Bilgi";
}

/**
 * Builds a professional, branded SEO report PDF.
 * @param {object} report - the SEO analysis result
 * @param {string} url - analyzed URL
 * @returns {jsPDF}
 */
export function generateSeoPdf(report, url) {
  const doc = new jsPDF({ unit: "pt", format: "a4" });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const margin = 48;
  const contentW = pageW - margin * 2;
  let y = 0;

  const ensureSpace = (need) => {
    if (y + need > pageH - 60) {
      doc.addPage();
      y = margin;
    }
  };

  // ── Header band ──────────────────────────────────────────
  doc.setFillColor(...PRIMARY);
  doc.rect(0, 0, pageW, 96, "F");
  // accent stripe
  doc.setFillColor(...ACCENT);
  doc.rect(0, 96, pageW, 4, "F");

  doc.setTextColor(255, 255, 255);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(22);
  doc.text("NexusGrowth", margin, 44);
  doc.setFont("helvetica", "normal");
  doc.setFontSize(11);
  doc.setTextColor(220, 220, 255);
  doc.text("SEO Analiz Raporu", margin, 66);

  doc.setFontSize(10);
  doc.setTextColor(255, 255, 255);
  const date = new Date().toLocaleDateString("tr-TR", { year: "numeric", month: "long", day: "numeric" });
  doc.text(`Tarih: ${date}`, pageW - margin, 44, { align: "right" });
  doc.text(`URL: ${url}`, pageW - margin, 66, { align: "right", maxWidth: contentW * 0.55 });

  y = 130;

  // ── Overall score ────────────────────────────────────────
  const overall = report.overall_score || 0;
  const oColor = scoreColor(overall);

  doc.setTextColor(...DARK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(16);
  doc.text("Genel SEO Puanı", margin, y);

  // Score circle
  const cx = margin + 40;
  const cy = y + 70;
  doc.setDrawColor(...oColor);
  doc.setLineWidth(6);
  doc.circle(cx, cy, 34, "S");
  doc.setDrawColor(230, 230, 240);
  doc.setLineWidth(6);
  // background ring (full) drawn first actually — redo: draw light ring then colored arc
  // Simpler: draw filled light circle then colored ring on top is complex; keep single ring.
  doc.setFont("helvetica", "bold");
  doc.setFontSize(32);
  doc.setTextColor(...oColor);
  doc.text(String(overall), cx, cy + 11, { align: "center" });

  // Score label next to circle
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  const grade = overall >= 80 ? "Mükemmel" : overall >= 60 ? "İyi" : overall >= 40 ? "Orta" : "Geliştirilmeli";
  doc.text(`Değerlendirme: ${grade}`, cx + 50, cy - 8);
  doc.text("100 üzerinden", cx + 50, cy + 10);

  y = cy + 50;

  // ── Score cards row ──────────────────────────────────────
  const scores = [
    { label: "Performans", value: report.performance_score },
    { label: "Erişilebilirlik", value: report.accessibility_score },
    { label: "En İyi Uygulamalar", value: report.best_practices_score },
    { label: "SEO", value: report.seo_score },
  ];
  const cardW = (contentW - 24) / 4;
  const cardH = 70;
  scores.forEach((s, i) => {
    const x = margin + i * (cardW + 8);
    doc.setFillColor(...LIGHT);
    doc.roundedRect(x, y, cardW, cardH, 8, 8, "F");
    const sc = scoreColor(s.value || 0);
    doc.setTextColor(...sc);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(24);
    doc.text(String(s.value || 0), x + cardW / 2, y + 34, { align: "center" });
    doc.setTextColor(...MUTED);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8.5);
    doc.text(s.label, x + cardW / 2, y + 52, { align: "center" });
    // mini bar
    doc.setDrawColor(...sc);
    doc.setLineWidth(3);
    const barW = ((s.value || 0) / 100) * (cardW - 24);
    doc.line(x + 12, y + 62, x + 12 + barW, y + 62);
  });

  y += cardH + 32;

  // ── Meta data ───────────────────────────────────────────
  ensureSpace(120);
  doc.setTextColor(...DARK);
  doc.setFont("helvetica", "bold");
  doc.setFontSize(13);
  doc.text("Site Bilgileri", margin, y);
  y += 8;
  doc.setDrawColor(...PRIMARY);
  doc.setLineWidth(2);
  doc.line(margin, y, margin + 60, y);
  y += 20;

  const md = report.meta_data || {};
  doc.setFont("helvetica", "normal");
  doc.setFontSize(10);
  doc.setTextColor(...MUTED);
  doc.text("Sayfa Başlığı:", margin, y);
  doc.setTextColor(...DARK);
  doc.text(md.title || "Belirtilmemiş", margin + 90, y, { maxWidth: contentW - 90 });
  y += 16;
  doc.setTextColor(...MUTED);
  doc.text("Meta Açıklama:", margin, y);
  doc.setTextColor(...DARK);
  doc.text(md.description || "Belirtilmemiş", margin + 90, y, { maxWidth: contentW - 90 });
  y += 22;

  // checklist
  const checks = [
    { label: "SSL Sertifikası", value: md.has_ssl },
    { label: "Sitemap", value: md.has_sitemap },
    { label: "Robots.txt", value: md.has_robots },
    { label: "Mobil Uyumlu", value: md.is_mobile_friendly },
    { label: "Sayfa Hızı", value: md.page_speed ? true : false, text: md.page_speed },
  ];
  checks.forEach((c, i) => {
    const col = i % 3;
    const row = Math.floor(i / 3);
    const x = margin + col * (contentW / 3);
    const yy = y + row * 22;
    doc.setFillColor(...(c.value ? ACCENT : [239, 68, 68]));
    doc.circle(x + 5, yy - 3, 4, "F");
    doc.setTextColor(255, 255, 255);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(8);
    doc.text(c.value ? "✓" : "✕", x + 5, yy - 1, { align: "center" });
    doc.setTextColor(...DARK);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(10);
    doc.text(`${c.label}: ${c.text || (c.value ? "Var" : "Yok")}`, x + 14, yy);
  });
  y += Math.ceil(checks.length / 3) * 22 + 16;

  // ── Issues ──────────────────────────────────────────────
  if (report.issues?.length) {
    ensureSpace(60);
    doc.setTextColor(...DARK);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text(`Tespit Edilen Sorunlar (${report.issues.length})`, margin, y);
    y += 8;
    doc.setDrawColor(...[245, 158, 11]);
    doc.setLineWidth(2);
    doc.line(margin, y, margin + 60, y);
    y += 20;

    report.issues.forEach((issue) => {
      const sev = severityColor(issue.severity);
      const titleLines = doc.splitTextToSize(issue.title || "", contentW - 90);
      const descLines = doc.splitTextToSize(issue.description || "", contentW - 90);
      const blockH = 20 + titleLines.length * 12 + descLines.length * 11 + 10;
      ensureSpace(blockH + 8);
      doc.setFillColor(...LIGHT);
      doc.roundedRect(margin, y, contentW, blockH, 6, 6, "F");
      // severity badge
      doc.setFillColor(...sev);
      doc.roundedRect(margin + 8, y + 8, 44, 14, 3, 3, "F");
      doc.setTextColor(255, 255, 255);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(7.5);
      doc.text(severityLabel(issue.severity), margin + 30, y + 18, { align: "center" });
      // text
      doc.setTextColor(...DARK);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(10);
      doc.text(titleLines, margin + 60, y + 18);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(9);
      doc.setTextColor(...MUTED);
      doc.text(descLines, margin + 60, y + 18 + titleLines.length * 12);
      y += blockH + 8;
    });
  }

  // ── Recommendations ────────────────────────────────────
  if (report.recommendations?.length) {
    ensureSpace(60);
    y += 8;
    doc.setTextColor(...DARK);
    doc.setFont("helvetica", "bold");
    doc.setFontSize(13);
    doc.text("Öneriler", margin, y);
    y += 8;
    doc.setDrawColor(...ACCENT);
    doc.setLineWidth(2);
    doc.line(margin, y, margin + 60, y);
    y += 22;

    report.recommendations.forEach((rec, i) => {
      const lines = doc.splitTextToSize(`${i + 1}. ${rec}`, contentW - 24);
      ensureSpace(lines.length * 12 + 8);
      doc.setFillColor(...PRIMARY, 0.12);
      doc.circle(margin + 6, y - 3, 8, "F");
      doc.setTextColor(...PRIMARY);
      doc.setFont("helvetica", "bold");
      doc.setFontSize(9);
      doc.text(String(i + 1), margin + 6, y - 1, { align: "center" });
      doc.setTextColor(...DARK);
      doc.setFont("helvetica", "normal");
      doc.setFontSize(10);
      doc.text(lines, margin + 22, y);
      y += lines.length * 12 + 8;
    });
  }

  // ── Footer on every page ────────────────────────────────
  const pages = doc.internal.getNumberOfPages();
  for (let p = 1; p <= pages; p++) {
    doc.setPage(p);
    doc.setDrawColor(230, 230, 240);
    doc.setLineWidth(0.5);
    doc.line(margin, pageH - 36, pageW - margin, pageH - 36);
    doc.setFont("helvetica", "normal");
    doc.setFontSize(8);
    doc.setTextColor(...MUTED);
    doc.text("NexusGrowth · Profesyonel Dijital Ajans Platformu", margin, pageH - 22);
    doc.text(`${p} / ${pages}`, pageW - margin, pageH - 22, { align: "right" });
  }

  return doc;
}

export function downloadSeoPdf(report, url) {
  const doc = generateSeoPdf(report, url);
  const safe = (url || "site").replace(/^https?:\/\//, "").replace(/[^a-z0-9]/gi, "_").slice(0, 30);
  doc.save(`SEO-Rapor-${safe}.pdf`);
}

export async function getSeoPdfBlob(report, url) {
  const doc = generateSeoPdf(report, url);
  return doc.output("blob");
}