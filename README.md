# 🎓 PoliFans

[![Angular](https://img.shields.io/badge/Frontend-Angular%2019-red?logo=angular)](https://angular.io/)
[![NestJS](https://img.shields.io/badge/Backend-NestJS-E0234E?logo=nestjs)](https://nestjs.com/)
[![PostgreSQL](https://img.shields.io/badge/Database-PostgreSQL-336791?logo=postgresql)](https://www.postgresql.org/)
[![TypeScript](https://img.shields.io/badge/Language-TypeScript-007ACC?logo=typescript)](https://www.typescriptlang.org/)

**PoliFans** este o platformă modernă de socializare dedicată studenților, concepută pentru a facilita partajarea de resurse academice, proiecte și networking în cadrul comunității universitare.

---

## 🚀 Funcționalități Existente

* 🔐 **Sistem de Autentificare Robust**: Înregistrare și autentificare securizată bazată pe JWT (JSON Web Tokens).
* 👤 **Profile Dinamice**: Vizualizarea profilului utilizatorului prin agregarea datelor din multiple tabele PostgreSQL folosind View-uri SQL.
* ✏️ **Editare Profil**: Interfață dedicată pentru actualizarea biografiei, a titlului profesional (Headline), a abilităților și a pozelor de profil/copertă.
* 📄 **Partajare Proiecte**: Secțiune de "My Work" pentru afișarea notițelor de curs, codului sursă și cercetărilor.
* 🖼️ **Gestionare Media**: Suport pentru previzualizarea imaginilor prin Base64 și integrare cu servicii de avatare dinamice (DiceBear).
* 🗄️ **Arhitectură de Bază de Date Avansată**: Utilizarea Trigger-elor SQL pentru crearea automată a profilului la înregistrare.

---

## 🛠️ Stack Tehnologic

### Repository Frontend (Client)
* **Framework:** Angular 19 (Standalone Components)
* **Stilizare:** Bootstrap 5 + CSS Custom Variables
* **Comunicare:** HttpClient cu interceptare manuală a headerelor Authorization.
* **State Management:** RxJS (BehaviorSubjects pentru starea de logare reactivă).

### Repository Backend (API)
* **Framework:** NestJS
* **Baza de Date:** PostgreSQL (Driver `pg`)
* **Securitate:** `@nestjs/passport` + JWT Strategy.
* **Arhitectură:** Controller-Service-Repository pattern.

---

## ⚙️ Instalare și Configurare locală

Deoarece proiectul este împărțit în două repository-uri distincte, trebuie să clonezi și să configurezi ambele servicii separat.

### Partea 1: Backend-ul (NestJS)

**1. Clonare și instalare:**
```bash
git clone https://github.com/neiconidotdev/polifans-server-client.git
cd polifans-server-client
npm install

```
**2. Configurare Variabile de Mediu:**
Creează un fișier .env în rădăcina proiectului backend:
```bash
DB_HOST=localhost
DB_PORT=5432
DB_USERNAME=neiconidotdev
DB_PASSWORD=parola_ta
DB_NAME=polifans
JWT_SECRET=secret_cheie_complexa
```

**3. Server comand**
```bash
npm run start:dev
# Serverul va porni implicit pe http://localhost:3000
```
**4. Migrarea Bazei de Date:**
Rulează următoarele scripturi în instanța ta de PostgreSQL:
```SQL
-- Creare View pentru agregarea datelor de profil
CREATE OR REPLACE VIEW user_display_profiles AS
SELECT u.id, u.full_name, p.headline, p.bio, p.skills, p.posts_count
FROM user_table u
JOIN user_profiles p ON u.id = p.id;

```
Partea 2: Frontend-ul (Angular)
1. Clonare și instalare:
Deschide un terminal nou (păstrând backend-ul activ) și rulează:
```bash
git clone [https://github.com/neiconidotdev/poli-fans-frontend.git](https://github.com/neiconidotdev/poli-fans-frontend.git)
cd poli-fans-frontend
npm install
```
2. Configurare Rețea / Mediu:
Asigură-te că fișierul src/environments/environment.development.ts este configurat cu IP-ul corect pentru a evita erorile de tip ERR_CONNECTION_REFUSED:
```typescript
export const environment = {
  production: false,
  apiUrl: '[http://192.168.0.89:3000](http://192.168.0.89:3000)' // Înlocuiește cu IP-ul tău local sau localhost
};
```

## **Exemplu Request PUT:**

```json
{
  "headline": "Student Inginerie Mecanică",
  "bio": "Pasionat de proiectare 3D și AutoCAD.",
  "skills": "AutoCAD, SolidWorks, Python"
}
```

## **Securitate și Performanță**
Decuplare Arhitecturală: Separarea clientului de server previne scurgerea datelor sensibile de configurare și permite scalarea independentă a modulelor.
JWT Guards: Toate rutele sensibile din NestJS sunt protejate de AuthGuard, care validează VIP pass-ul înainte de a permite accesul la baza de date.
SQL Parameterization: Prevenirea atacurilor SQL Injection prin utilizarea query-urilor parametrizate ($1, $2, $3).
Database Views: Optimizarea performanței de citire prin pre-calcularea JOIN-urilor complexe la nivelul PostgreSQL.
## 🛣️ **Roadmap**
[ ] Implementare endpoint-uri dedicate pentru "My Work" (extragere postări din baza de date).

[ ] Implementare Chat în timp real via WebSockets (Socket.io).

[ ] Încărcarea imaginilor reale către un serviciu de stocare S3 (înlocuirea reprezentării Base64 din frontend).

[ ] Dark Mode toggle.

## 🤝 **Contribuții**
Dacă dorești să contribui, te rugăm să specifici clar pentru care repository (Frontend sau Backend) trimiți modificările:
Fork repository-ului corespunzător.
Creează un Branch (git checkout -b feature/AmazingFeature).
Commit modificările (git commit -m 'Add some AmazingFeature').
Push către Branch (git push origin feature/AmazingFeature).
Deschide un Pull Request.
## 👤 **Autor**
Andrei - Full Stack Developer - GitHub Profile
