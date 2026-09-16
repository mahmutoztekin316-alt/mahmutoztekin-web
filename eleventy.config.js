const AYLAR = ["Ocak","Şubat","Mart","Nisan","Mayıs","Haziran","Temmuz","Ağustos","Eylül","Ekim","Kasım","Aralık"];
const MONTHS = ["January","February","March","April","May","June","July","August","September","October","November","December"];
const kacis = (s) => String(s ?? "").replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;");
const sayi = (n) => String(n).replace(".", ",");

export default function (cfg) {
  cfg.addPassthroughCopy({ "assets": "assets" });
  cfg.addPassthroughCopy({ "src/admin/index.html": "admin/index.html" });
  cfg.addPassthroughCopy({ "src/admin/config.yml": "admin/config.yml" });
  cfg.addPassthroughCopy({ "src/favicon.svg": "favicon.svg" });

  cfg.addCollection("eserler", (api) =>
    api.getFilteredByGlob("src/eserler/*.md")
      .filter((e) => e.data.yayinda !== false)
      .sort((a, b) => (b.data.yil - a.data.yil) || ((a.data.sira || 0) - (b.data.sira || 0)) || a.data.title.localeCompare(b.data.title, "tr"))
  );
  cfg.addCollection("haberler", (api) =>
    api.getFilteredByGlob("src/haberler/*.md").sort((a, b) => new Date(b.data.tarih) - new Date(a.data.tarih))
  );

  cfg.addFilter("yillar", (list) => {
    const m = new Map();
    for (const e of list) { if (!m.has(e.data.yil)) m.set(e.data.yil, []); m.get(e.data.yil).push(e); }
    return [...m.entries()].sort((a, b) => b[0] - a[0]).map(([yil, eserler]) => ({ yil, eserler }));
  });
  cfg.addFilter("olcu", (d, dil) => {
    if (!d.yukseklik || !d.genislik) return "";
    const o = dil === "en" ? `${d.yukseklik} × ${d.genislik} cm` : `${sayi(d.yukseklik)} × ${sayi(d.genislik)} cm`;
    return d.her_biri ? (dil === "en" ? `${o} each` : `her biri ${o}`) : o;
  });
  cfg.addFilter("parcaEn", (p) => String(p || "").replace("parça", "pieces"));
  cfg.addFilter("teknikEn", (t) => ({ "Tuval üzerine yağlı boya": "Oil on canvas", "Kâğıt üzerine yağlı boya": "Oil on paper" })[t] || t);
  cfg.addFilter("enUrl", (e) => `/en/works/${e.fileSlug}/`);
  cfg.addFilter("tarihEn", (d) => { const x = new Date(d); return `${x.getUTCDate()} ${MONTHS[x.getUTCMonth()]} ${x.getUTCFullYear()}`; });
  cfg.addFilter("paragraflar", (t) =>
    String(t || "").trim().split(/\n\s*\n/).map((p) => p.trim() === "* * *"
      ? '<div class="bosluk"></div>'
      : `<p>${kacis(p.trim()).replace(/\n/g, "<br>")}</p>`).join("\n")
  );
  cfg.addFilter("ilkParagraf", (t) => String(t || "").trim().split(/\n\s*\n/)[0]);
  cfg.addFilter("kalanParagraflar", (t) => String(t || "").trim().split(/\n\s*\n/).slice(1).join("\n\n"));
  cfg.addFilter("tarih", (d) => { const x = new Date(d); return `${x.getUTCDate()} ${AYLAR[x.getUTCMonth()]} ${x.getUTCFullYear()}`; });
  cfg.addFilter("bul", (list, slug) => (list || []).find((e) => e.fileSlug === slug));
  cfg.addFilter("komsular", (list, url) => {
    const i = list.findIndex((e) => e.url === url || `/en/works/${e.fileSlug}/` === url);
    return { onceki: i > 0 ? list[i - 1] : null, sonraki: i >= 0 && i < list.length - 1 ? list[i + 1] : null };
  });

  return {
    dir: { input: "src", output: "_site", includes: "_includes", data: "_data" },
    templateFormats: ["njk", "md"],
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
  };
}
