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
git clone [https://github.com/neiconidotdev/poli-fans-backend.git](https://github.com/neiconidotdev/poli-fans-backend.git)
cd poli-fans-backend
npm install

**2. Server comand
npm run start:dev
# Serverul va porni implicit pe http://localhost:3000

