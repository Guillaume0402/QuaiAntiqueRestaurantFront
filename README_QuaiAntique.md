# QuaiAntique

> Développement Front-End — Projet local avec VirtualHost, Sass et BrowserSync  
> 🗓️ Dernière mise à jour : 2025-03-29

---

## 🚀 Démarrage rapide

```bash
# Installer les dépendances (à faire une seule fois)
npm install

# Lancer le serveur + la compilation Sass en live
npm run dev
```

Cela :
- compile automatiquement `scss/main.scss` ➝ `scss/main.css`
- recharge automatiquement la page sur `http://quaiantique.local`
- synchronise les actions sur tous les navigateurs ouverts

---

## 🌐 Accès navigateur

Une fois lancé, BrowserSync te propose :
- [http://localhost:3000](http://localhost:3000) (accès local)
- [http://192.168.1.189:3000](http://192.168.1.189:3000) (accès réseau local)
- [http://quaiantique.local](http://quaiantique.local) (via VirtualHost Apache)

---

## 📁 Structure du projet

```
quaiantique/
│
├── pages/               # Pages HTML par catégorie (auth, reservations...)
│├── auth/
│├── reservations/
│
├── js/                  # Scripts JS organisés par modules
│├── auth/
│
├── scss/                # SCSS principal et partiels
│├── _custom.scss
│├── main.scss
│
├── main.css             # Fichier compilé automatiquement depuis main.scss
│
├── bs-config.js         # Configuration de BrowserSync
├── .htaccess            # Pour serveur Apache local
├── index.html           # Fichier racine si utilisé
└── package.json         # Scripts NPM + dépendances
```

---

## 📦 Scripts NPM disponibles

| Script       | Description                                      |
|--------------|--------------------------------------------------|
| `npm run sass`  | Compile le fichier `main.scss` ➝ `main.css` en watch |
| `npm run serve` | Lance uniquement BrowserSync (`quaiantique.local`) |
| `npm run dev`   | Compile Sass + lance BrowserSync **en parallèle** |

---

## 🛠 Dépendances installées

- **Bootstrap 5.3.3**
- **Bootstrap Icons 1.11.3**
- **Sass (compilation manuelle)**
- **BrowserSync** (`bs-config.js`)
- **Concurrently** (pour lancer plusieurs scripts en parallèle)

---

## ❗ Avertissements courants (sans danger)

### ⚠️ Warnings Sass :
Bootstrap utilise encore `@import`, des fonctions comme `mix()` ou `red()` qui sont **dépréciées**, mais **sans danger pour l’instant**.

💡 Ajouté `--quiet-deps` dans le script pour **les cacher**.

---

## ✅ Astuces utiles

- Utilise `Ctrl + C` dans le terminal pour arrêter `npm run dev`
- Ouvre dans **plusieurs navigateurs** pour tester : Firefox, Chrome, Brave...
- Active "Disable cache" dans DevTools pendant le dev pour éviter les surprises
- En prod, pense à remettre un cache dans `.htaccess.prod`

---

## 🤝 Auteur

Projet développé par **Guillaume** – Développeur Web Full-Stack  
🔗 [Contact : contact@quaiantique.com](mailto:contact@quaiantique.com)

---

> Ce fichier README est généré automatiquement pour documenter et maintenir un environnement de dev professionnel. À adapter selon l’évolution du projet.
