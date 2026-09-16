# mahmutoztekin.com

Mahmut Öztekin'in web sitesi. Site Eleventy ile üretilir, GitHub'a kaydedilir ve Netlify'da yayınlanır. Türkçe ve İngilizce iki sürümü vardır.

## Siteyi güncellemek (panel)

1. **Giriş:** mahmutoztekin.com/admin adresini açın, "Login with GitHub" ile girin.
2. **Düzenleme:** Soldan bölümü seçin:
   - **Eserler** – yeni eser ekleyin ya da var olanı açıp değiştirin. Alanlar: eser adı (Türkçe ve İngilizce), yıl, yıl içindeki sıra, görsel, teknik, yükseklik × genişlik, parça sayısı, durum (Fiyat için iletişim / Mevcut değil), satış bağlantısı, koleksiyon, detay fotoğrafları, sergi geçmişi.
   - **Haberler** – başlık, tarih, görsel, metin (iki dilde) ve bağlantılar.
   - **Sayfalar** – Ana sayfa (dönen eserler ve süre), Hakkında (biyografi, sanatçı metni, CV dosyaları), Metin, Kavramsal metin, Sergiler (görselleriyle), Videolar, Site ayarları (menü sırası, hangi sayfaların görüneceği, e-posta, Instagram, ziyaretçi sayacı, koleksiyon adlarını gösterme).
3. **Kaydet → Yayınla:** Değişiklikler önce taslak olarak durur ("Kaydet"). Sağ üstteki durumdan "Hazır" yapıp **Yayınla** deyince siteye çıkar. Birkaç değişikliği biriktirip tek seferde yayınlamak iyidir; ücretsiz Netlify planında ayda yaklaşık 20 yayın hakkı vardır.
4. Yayından 1–2 dakika sonra sitede görünür. Görünmezse sayfayı Cmd+Shift+R (Mac) / Ctrl+F5 (Windows) ile yenileyin.

## Görseller ve dosyalar

- Eser görselleri: uzun kenarı 1400–1600 piksel, JPG. Panelden yüklenen görseller `assets/uploads` klasörüne gider.
- Videolar: MP4, en fazla 20 MB. GitHub'da `assets/videos` klasörüne yükleyin, sonra panelde **Sayfalar › Videolar**'a ekleyin.
- CV dosyaları: `assets/Mahmut_Oztekin_CV.pdf` (Türkçe) ve `assets/Mahmut_Oztekin_CV_EN.pdf` (İngilizce). Yenisini aynı adla yükleyin, eskisinin yerine geçer.

## Hangi klasörde ne var

- `src/eserler/` – her eser bir dosya
- `src/haberler/` – haberler
- `src/_data/` – sayfa metinleri ve ayarlar (JSON)
- `src/en/` – İngilizce sayfa şablonları (metinler `_data` içindeki İngilizce alanlardan gelir)
- `assets/` – görseller, videolar, CV, stil dosyası (`stil.css`)
- `src/admin/config.yml` – panelin alan tanımları

## Tasarım değişiklikleri

Renk, yazı tipi, yerleşim gibi değişiklikler panelden yapılamaz; `assets/stil.css` ve `src/` içindeki şablonlarda yapılır. Bunun için Claude'a "şu sayfada şunu değiştir" demek ve verdiği dosyayı GitHub'a yüklemek yeterlidir. GitHub her değişikliğin geçmişini tutar; bir şey bozulursa önceki hâline dönülebilir.
