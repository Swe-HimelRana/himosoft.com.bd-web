/**
 * Adds floatingContact block to non-English locale files.
 * Run: node scripts/add-floating-contact-locales.cjs
 */
const fs = require("node:fs");
const path = require("node:path");

const translations = {
  bn: {
    buttonLabel: "যোগাযোগ করুন",
    chatTitle: "HimoSoft",
    chatSubtitle: "আমরা সাধারণত এক কর্মদিবসের মধ্যে উত্তর দিই।",
    welcomeMessage: "হ্যালো! আজ আমরা কীভাবে সাহায্য করতে পারি? ইমেইল বা কল করতে নিচে ট্যাপ করুন।",
    onlineLabel: "অনলাইন",
    closeLabel: "চ্যাট বন্ধ করুন",
    loadingLabel: "যোগাযোগের তথ্য লোড হচ্ছে…",
  },
  de: {
    buttonLabel: "Kontakt",
    chatTitle: "HimoSoft",
    chatSubtitle: "Wir antworten in der Regel innerhalb eines Werktags.",
    welcomeMessage: "Hallo! Wie können wir Ihnen helfen? Tippen Sie unten, um uns per E-Mail oder Telefon zu erreichen.",
    onlineLabel: "Online",
    closeLabel: "Chat schließen",
    loadingLabel: "Kontaktdaten werden geladen…",
  },
  it: {
    buttonLabel: "Contattaci",
    chatTitle: "HimoSoft",
    chatSubtitle: "Di solito rispondiamo entro un giorno lavorativo.",
    welcomeMessage: "Ciao! Come possiamo aiutarti? Tocca sotto per email o telefono.",
    onlineLabel: "Online",
    closeLabel: "Chiudi chat",
    loadingLabel: "Caricamento contatti…",
  },
  ro: {
    buttonLabel: "Contactați-ne",
    chatTitle: "HimoSoft",
    chatSubtitle: "Răspundem de obicei într-o zi lucrătoare.",
    welcomeMessage: "Bună! Cu ce vă putem ajuta? Apăsați mai jos pentru email sau telefon.",
    onlineLabel: "Online",
    closeLabel: "Închide chatul",
    loadingLabel: "Se încarcă datele de contact…",
  },
  pl: {
    buttonLabel: "Skontaktuj się",
    chatTitle: "HimoSoft",
    chatSubtitle: "Zwykle odpowiadamy w ciągu jednego dnia roboczego.",
    welcomeMessage: "Cześć! Jak możemy pomóc? Kliknij poniżej, aby napisać lub zadzwonić.",
    onlineLabel: "Online",
    closeLabel: "Zamknij czat",
    loadingLabel: "Ładowanie danych kontaktowych…",
  },
};

const localesDir = path.join(process.cwd(), "content", "locales");

for (const [locale, copy] of Object.entries(translations)) {
  const file = path.join(localesDir, `${locale}.json`);
  const data = JSON.parse(fs.readFileSync(file, "utf8"));
  if (data.floatingContact) {
    console.log(`Skip ${locale} — already has floatingContact`);
    continue;
  }
  data.floatingContact = copy;
  fs.writeFileSync(file, JSON.stringify(data, null, 2) + "\n");
  console.log(`Updated ${locale}.json`);
}
