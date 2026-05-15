# SISTEMI BAZIRANI NA ZNANJU

# Predlog Projekta

# Ekspertski sistem za preporuku idealnog izlaska na osnovu preferencija korisnika

---

# 1. Spisak članova tima

- Aleksa Janjić

---

# 2. Opis problema

## 2.1 Motivacija

Savremeni način života i veliki broj dostupnih restorana, kafića i noćnih klubova doveli su do toga da korisnici često imaju problem pri izboru idealnog mesta za izlazak. Iako danas postoje aplikacije koje prikazuju ocene korisnika i osnovne informacije o lokalima, većina tih sistema pruža generičke preporuke zasnovane isključivo na popularnosti ili prosečnim ocenama.

Takvi sistemi ne uzimaju u obzir:
- kontekst izlaska,
- trenutne uslove u lokalima,
- specifične preferencije korisnika,
- dinamiku događaja u realnom vremenu,
- međusobne odnose između više faktora.

Korisnici često završe u lokalima koji:
- ne odgovaraju atmosferi koju žele,
- ne odgovaraju njihovom budžetu,
- imaju preveliku gužvu,
- nemaju slobodna mesta,
- ne odgovaraju grupi ljudi sa kojima izlaze.

Motivacija ovog projekta jeste razvoj inteligentnog ekspertskog sistema koji formalizuje znanje o:
- tipovima izlazaka,
- ponašanju korisnika,
- kvalitetu lokala,
- aktuelnim događajima,
- real-time promenama.

Cilj sistema jeste da simulira način razmišljanja osobe koja dobro poznaje gradsku scenu izlazaka i ume da preporuči idealno mesto u zavisnosti od konkretne situacije i preferencija korisnika.

---

# 2.2 Pregled problema

Problem preporuke idealnog izlaska predstavlja kompleksan višekriterijumski problem odlučivanja.

Prilikom donošenja preporuke sistem mora uzeti u obzir:
- tip izlaska,
- broj osoba,
- budžet,
- muzičke preferencije,
- tip hrane,
- lokaciju,
- nivo gužve,
- radno vreme lokala,
- dostupnost rezervacija,
- specijalne događaje,
- prethodna iskustva korisnika.

Postojeća rešenja poput:
- Google Maps,
- TripAdvisor,
- Yelp,
- Instagram/TikTok preporuka,

uglavnom koriste:
- korisničke ocene,
- jednostavne filtere,
- popularnost lokala.

Takvi sistemi ne koriste:
- rule-based rezonovanje,
- forward chaining,
- backward chaining,
- obradu događaja u realnom vremenu (CEP),
- objašnjive preporuke.

Naše rešenje se razlikuje jer:
- koristi personalizaciju korisnika,
- omogućava dinamičku adaptaciju preporuka,
- koristi CEP obradu događaja,
- omogućava objašnjive preporuke,
- koristi bazu znanja zasnovanu na pravilima,
- koristi višeslojno rezonovanje,
- koristi template pravila za skalabilno generisanje preporuka.

---

# 2.3 Metodologija rada

## 2.3.1 Ulazi u sistem (Input)

Sistem prima četiri grupe ulaznih podataka:

### 1. Podaci o korisniku

- Godine korisnika
- Budžet korisnika
- Preferirani tip izlaska
- Omiljeni muzički žanrovi
- Preferirani izvođači i bendovi
- Preferirani tip hrane
- Željeni ambijent
- Tolerancija na gužvu
- Istorija prethodnih izlazaka
- Istorija ocena lokala

### 2. Podaci o izlasku

- Broj osoba
- Datum izlaska
- Vreme izlaska
- Trajanje izlaska
- Željena lokacija
- Tip događaja

### 3. Podaci o lokalima

- Naziv lokala
- Tip lokala
- Lokacija
- Prosečne cene
- Kapacitet
- Radno vreme
- Trenutna popunjenost
- Dostupnost rezervacija
- Tip muzike
- Dress code
- Prosečna ocena
- Specijalni događaji

### 4. Real-time događaji (CEP Event Stream)

- Nagli rast gužve
- Početak specijalnog događaja
- DJ nastupi
- Bend nastupi
- Nastupi poznatih izvođača
- Otkazivanje događaja
- Promena cena rezervacija
- Zatvaranje lokala
- Nagli rast rezervacija

---

## 2.3.2 Izlazi iz sistema (Output)

- Rangirana lista preporučenih lokala
- Score podudaranja između korisnika i lokala
- Finalna preporuka izlaska
- Objašnjenje preporuke
- Lista aktiviranih pravila
- Upozorenja o gužvi
- Upozorenja o zatvaranju lokala
- Alternativne preporuke
- CEP alarmi o promenama u realnom vremenu

---

## 2.3.3 Baza znanja

Baza znanja modelovana je korišćenjem Drools pravila.

---

# Grupa 1: CEP Pravila (Complex Event Processing)

## CEP Pravilo 1 (Naglo povećanje gužve)

### Uslov:
AKO u poslednjih 30 minuta:
- broj rezervacija poraste za više od 40%
ILI
- trenutna popunjenost lokala pređe 90%

### Akcija:
Generiši:
`CrowdedVenueAlert`

i smanji prioritet lokala.

---

## CEP Pravilo 2 (Trend popularnosti)

### Uslov:
AKO lokal u poslednjih 7 dana ima:
- rast pozitivnih ocena veći od 25%

### Akcija:
Generiši:
`TrendingVenueEvent`

i povećaj score lokala.

---

## CEP Pravilo 3 (Preopterećen noćni klub)

### Uslov:
AKO:
- trenutna popunjenost > 95%
- vreme čekanja > 20 minuta
- više od 5 negativnih prijava u poslednjih 60 minuta

### Akcija:
Generiši:
`OvercrowdedNightClubAlert`

---

## CEP Pravilo 4 (Specijalni događaj)

### Uslov:
AKO lokal organizuje:
- nastup benda
ILI
- koncert poznatog izvođača

### Akcija:
Generiši:
`SpecialEventStarted`

i povećaj score korisnicima koji preferiraju odgovarajući tip muzike ili izvođača.

---

## CEP Pravilo 5 (Zatvaranje lokala)

### Uslov:
AKO je do zatvaranja lokala ostalo manje od 1 sat

### Akcija:
Generiši:
`ClosingSoonAlert`

i smanji prioritet lokala.

---

## CEP Pravilo 6 (Nagli rast rezervacija)

### Uslov:
AKO je više od 80% kapaciteta rezervisano u poslednjih 20 minuta

### Akcija:
Generiši:
`ReservationSpikeEvent`

---

# Grupa 2: Forward Chaining Pravila (Višeslojno rezonovanje)

# NIVO 1 — Mapiranje osnovnih preferencija

## Pravilo 1 (Elektronska muzika)

AKO korisnik:
- preferira elektronsku muziku
- želi noćni izlazak

TADA:
`VenueCandidate(NightClub, score=2)`

---

## Pravilo 2 (Romantičan izlazak)

AKO korisnik:
- želi romantičan izlazak
- broj osoba = 2

TADA:
`VenueCandidate(FineDiningRestaurant, score=3)`

---

## Pravilo 3 (Miran izlazak)

AKO korisnik:
- želi miran izlazak
- ne voli veliku gužvu

TADA:
`VenueCandidate(LoungeBar, score=2)`

---

## Pravilo 4 (Veće društvo)

AKO broj osoba > 6

TADA:
preporuči lokale sa:
- većim kapacitetom
- mogućnošću rezervacije.

---

## Pravilo 5 (Jazz muzika)

AKO korisnik:
- preferira jazz muziku

TADA:
povećaj prioritet:
- jazz barovima
- restoranima sa jazz nastupima.

---

## Pravilo 6 (Techno muzika)

AKO korisnik:
- preferira techno muziku

TADA:
povećaj prioritet:
- techno klubovima.

---

## Pravilo 7 (Band nastup)

AKO:
- korisnik preferira band nastupe

TADA:
povećaj prioritet:
- klubovima sa band nastupima
- restoranima sa band nastupima

---

## Pravilo 8 (Poznati izvođač)

AKO:
- korisnik preferira određenog izvođača
I
- lokal organizuje njegov nastup

TADA:
značajno povećaj score lokala.

---

## Pravilo 9 (Korisnik ne voli folk muziku)

AKO:
- korisnik ne preferira folk muziku
I
- lokal organizuje folk nastup

TADA:
smanji score lokala.

---

# NIVO 2 — Akumulacija i scoring

## Pravilo 10 (Akumulacija score vrednosti)

### Uslov:
AKO postoji više:
`VenueCandidate`

činjenica za isti lokal

### Akcija:
Saberi:
- score muzike
- score ambijenta
- score budžeta
- score lokacije
- score događaja

i generiši:
`RankedVenue`

---

## Pravilo 11 (Budžetska validacija)

AKO je prosečna cena lokala:
- značajno veća od budžeta korisnika

TADA:
umanji ukupni score lokala.

---

## Pravilo 12 (Istorija korisnika)

AKO je korisnik:
- prethodno pozitivno ocenio sličan lokal

TADA:
dodaj bonus score.

---

## Pravilo 13 (Nizak budžet)

AKO:
- budžet korisnika < 5000 RSD

TADA:
eliminiši:
- premium restorane
- VIP klubove.

---

## Pravilo 14 (Visok budžet)

AKO:
- budžet korisnika > 12000 RSD

TADA:
dozvoli:
- luksuzne restorane
- VIP kafe bar lokale.

---

# NIVO 3 — Kontekstualna validacija

## Pravilo 15 (Gužva)

AKO:
- korisnik ne voli gužvu
I
- postoji `CrowdedVenueAlert`

TADA:
eliminiši lokal iz preporuka.

---

## Pravilo 16 (Zatvaranje uskoro)

AKO postoji:
`ClosingSoonAlert`

TADA:
smanji score lokala za 40%.

---

## Pravilo 17 (Specijalni događaji)

AKO:
- korisnik preferira live muziku
I
- postoji `SpecialEventStarted`

TADA:
povećaj score lokala.

---

## Pravilo 18 (Velika udaljenost)

AKO:
- udaljenost lokala > 15 km

TADA:
smanji prioritet lokala.

---

## Pravilo 19 (Kasni izlazak)

AKO:
- korisnik planira izlazak posle ponoći

TADA:
eliminiši lokale koji:
- se zatvaraju pre 01:00.

---

## Pravilo 20 (Party atmosfera)

AKO:
- korisnik preferira party atmosferu
I
- lokal ima veliku popunjenost

TADA:
dodaj bonus score lokalu.

---

# NIVO 4 — Finalna preporuka

## Pravilo 21 (Finalna preporuka)

AKO:
- lokal ima score > 8
- nema kritičnih upozorenja
- lokal zadovoljava budžet korisnika

TADA:
generiši:
`ConfirmedRecommendation`

---

# Grupa 3: Drools Rule Templates (Dinamičko generisanje pravila)

# Template 1 — Muzički žanrovi

## Parametri:
- Muzički žanr
- Bonus score
- Tip lokala

## Logika:
AKO korisnik preferira određeni muzički žanr

ONDA:
dodaj bonus score lokalima koji odgovaraju tom žanru.

---

# Template 2 — Tip izlaska

## Parametri:
- Tip izlaska
- Preferirani lokal
- Multiplikator score vrednosti

## Logika:
AKO korisnik bira određeni tip izlaska

ONDA:
povećaj prioritet odgovarajućim lokalima.

---

# Template 3 — Dinamički pragovi gužve

## Parametri:
- Tip lokala
- Maksimalna popunjenost
- Prag čekanja

## Logika:
Generiši CEP pravila za različite tipove lokala.

---

# Grupa 4: Backward Chaining (Ciljno rezonovanje)

Backward chaining koristi se kada korisnik postavi konkretan cilj ili pitanje.

Sistem:
1. definiše cilj,
2. proverava koja pravila mogu potvrditi cilj,
3. proverava činjenice u bazi znanja,
4. vraća preporuku ili odgovor korisniku.

---

## Backward Pravilo 1

### Upit korisnika:
„Da li postoji restoran:
- u centru grada,
- sa jazz muzikom,
- koji radi posle ponoći,
- nije gužva,
- odgovara mom budžetu?“

### Rezonovanje:
Sistem proverava:
- lokaciju,
- tip muzike,
- radno vreme,
- CEP događaje o gužvi,
- budžetska pravila.

---

## Backward Pravilo 2

### Upit korisnika:
„Koji klubovi trenutno imaju techno muziku i slobodna mesta?“

### Rezonovanje:
Sistem proverava:
- tip muzike,
- broj rezervacija,
- CEP događaje,
- dostupnost mesta.

---

## Backward Pravilo 3

### Upit korisnika:
„Da li postoji lokal sa nastupom mog omiljenog benda?“

### Rezonovanje:
Sistem proverava:
- omiljene izvođače korisnika,
- trenutne događaje,
- koncertne evente,
- lokacije događaja.

---

## Backward Pravilo 4

### Upit korisnika:
„Koji restorani su najbolji za prvi sastanak?“

### Rezonovanje:
Sistem proverava:
- ambijent,
- nivo buke,
- gužvu,
- tip lokala,
- istoriju pozitivnih ocena.

---

# 3. Konkretan primer rezonovanja

# Faza 1 (CEP obrada — Realno vreme)

Sistem registruje:
- rast rezervacija od 50% u poslednjih 30 minuta,
- popunjenost lokala 95%.

Aktivira se:
`CrowdedVenueAlert`

za određeni noćni klub.

---

# Faza 2 (Korisnički unos)

Korisnik unosi:
- romantičan izlazak,
- broj osoba = 2,
- visok budžet,
- preferira jazz muziku,
- ne voli veliku gužvu.

---

# Faza 3 (NIVO 1)

Aktiviraju se pravila i generišu:

- `VenueCandidate(FineDiningRestaurant, score=3)`
- `VenueCandidate(JazzLoungeBar, score=2)`

---

# Faza 4 (NIVO 2 — Accumulate)

Sistem sabira:
- score muzike,
- score ambijenta,
- score budžeta,
- score lokacije,
- score događaja.

Rezultat:
- Restoran A → score = 9
- Kafe bar B → score = 7

---

# Faza 5 (NIVO 3 — Validacija)

Sistem proverava:
- gužvu,
- radno vreme,
- rezervacije.

Restoran A:
- nema CEP upozorenja,
- radi do 02:00,
- ima slobodna mesta.

Kafe bar B:
- generisan `CrowdedVenueAlert`

→ score se smanjuje.

---

# Faza 6 (NIVO 4 — Finalna preporuka)

Generiše se:

`ConfirmedRecommendation(RestoranA, confidence=HIGH)`

---

# Finalni izlaz sistema

## Preporuka:
Restoran A

## Razlog preporuke:
- odgovara budžetu korisnika,
- odgovara tipu izlaska,
- svira se jazz muzika,
- nema veliku gužvu,
- ima slobodna mesta,
- visok ukupni score.

## Alternativna preporuka:
Kafe bar B

## Upozorenje:
Velika gužva u Kafe bar  B.

---

# 4. Tehnologije

- Java
- Spring Boot
- Drools
- Drools CEP
- PostgreSQL
- React ili Angular

---

# 5. Zaključak

Cilj projekta jeste razvoj inteligentnog ekspertskog sistema koji koristi:
- rule-based rezonovanje,
- forward chaining,
- backward chaining,
- CEP obradu događaja,
- template pravila,

kako bi korisnicima pružio:
- personalizovane preporuke,
- objašnjive odluke,
- adaptivne preporuke u realnom vremenu.

Sistem omogućava simulaciju ekspertnih odluka pri izboru idealnog izlaska i pruža mnogo preciznije preporuke u odnosu na tradicionalne sisteme zasnovane isključivo na ocenama korisnika i popularnosti lokala.