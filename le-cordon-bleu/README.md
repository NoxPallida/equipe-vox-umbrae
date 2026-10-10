# Le Cordon Bleu - Restaurant Gastronomique

Site One Page interactif pour le restaurant gastronomique Le Cordon Bleu.

## 📁 Structure du Projet

le-cordon-bleu/
├── index.html        # Page unique
├── style.css         # Tous les styles
├── js/
│   ├── data.js       # Toutes les données (menus, config)
│   └── app.js        # Toute la logique JavaScript
└── README.md

## 🍽️ Fonctionnalités

### 1. Hero Section
- Présentation pleine page du restaurant
- Bouton "Réserver une table" avec scroll fluide vers la section réservation

### 2. Section Menus
- **Liste des menus** (colonne gauche) :
  - Affichage dynamique des menus depuis `data.js`
  - 4 menus disponibles : Dégustation, Tradition, Découverte, Végétarien
  - Menu actif mis en évidence visuellement
  - Menu recommandé marqué avec un badge
  - Transition fluide au changement de menu

- **Détail du menu** (colonne droite) :
  - Affichage du nom, prix, description
  - Liste des plats organisés par catégorie (entrée, plat, dessert, fromage, mignardises)
  - Mise à jour sans rechargement de la page

### 3. Section Réservation
- **Formulaire de réservation** avec validation complète :
  - **Nombre de couverts** : Sélecteur numérique (1-50)
    - Blocage à partir de 20 couverts avec message pour devis groupe
  - **Calendrier** : Sélecteur de date
    - Dates passées bloquées
    - Lundi fermé (non sélectionnable)
    - Mercredi complet (non sélectionnable)
  - **Créneaux horaires** : Sélecteur dynamique
    - Mardi et jeudi : service du soir uniquement (19h30, 20h00, 20h30)
    - Vendredi, samedi, dimanche : midi et soir
    - Créneaux mis à jour automatiquement selon le jour sélectionné
  - **Commentaire** : Champ texte libre optionnel
    - Compteur de caractères (500 max)

- **Validation** :
  - Tous les champs obligatoires vérifiés
  - Messages d'erreur précis sous chaque champ
  - Message de confirmation avec récapitulatif après soumission réussie
  - Réinitialisation du formulaire après réservation

## 📦 Données (data.js)

Le fichier `data.js` contient :

### Configuration
- `restaurantName` : Nom du restaurant
- `restaurantTagline` : Accroche du restaurant
- `maxCouvertsAvantDevis` : Seuil pour devis groupe (20)
- `joursFermes` : Jours où le restaurant est fermé ([1] = lundi)
- `joursComplets` : Jours où le restaurant est complet ([3] = mercredi)
- `creneauxMidi` : Créneaux pour le service midi
- `creneauxSoir` : Créneaux pour le service soir

### Menus
4 menus complets avec :
- `id` : Identifiant unique
- `nom` : Nom du menu
- `prix` : Prix en euros
- `description` : Description du menu
- `plats` : Liste des plats avec catégorie, nom et description

## ✅ Exigences Techniques

- ✅ **data.js** est la seule source de données
- ✅ Les menus sont générés dynamiquement
- ✅ Changement de menu sans rechargement de page
- ✅ Créneaux mis à jour automatiquement selon la date
- ✅ Jours fermés et complets bloqués avec messages explicites
- ✅ Dépassement de 20 couverts bloque la soumission
- ✅ Validation champ par champ avec messages d'erreur
- ✅ Utilisation de `const` et `let` (pas de `var`)
- ✅ Fonctions nommées en camelCase

## 🌟 Bonus Implémentés

- ✅ Animation/transition au changement de menu
- ✅ Mise en avant du menu recommandé (badge)
- ✅ Compteur de caractères sur le champ commentaire
- ✅ Affichage du récapitulatif sous forme de "ticket"
- ✅ Smooth scroll sur tous les liens de navigation
- ✅ Bouton de retour en haut de page

## 🚀 Utilisation

1. Cloner ou télécharger le projet
2. Ouvrir `index.html` dans un navigateur web
3. Naviguer à travers les sections
4. Sélectionner un menu pour voir ses détails
5. Remplir le formulaire de réservation

## 🧪 Tests

Tester les cas suivants :
- Sélection de différents menus
- Changement de date et mise à jour des créneaux
- Sélection d'un lundi (fermé) ou mercredi (complet)
- Sélection d'une date passée
- Saisie de 20 couverts ou plus
- Soumission du formulaire avec champs vides
- Soumission réussie avec affichage du récapitulatif

## 🎨 Design

- Design responsive (mobile, tablette, desktop)
- Palette de couleurs élégantes (or, noir, blanc)
- Polices : Playfair Display (titres), Open Sans (texte)
- Effets de hover et transitions fluides

## 🔧 Développement

Pour modifier le site :
1. Modifier les données dans `data.js` (menus, configuration)
2. Adapter les styles dans `style.css` si nécessaire
3. Étendre la logique dans `app.js` pour de nouvelles fonctionnalités