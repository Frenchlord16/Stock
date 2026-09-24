# Gestion Stock Marchandise

Application PWA simple pour gérer un stock de marchandises.

## Fonctions
- Ajouter / modifier / supprimer des produits
- Référence, catégorie et emplacement
- Quantité et seuil d'alerte
- Entrée et sortie de stock avec `+ Stock` / `− Stock`
- Prix d'achat et valeur totale du stock
- Recherche
- Sauvegarde automatique dans le navigateur
- Installation comme application sur PC/téléphone

## Mise en ligne avec GitHub Pages
1. Crée un nouveau dépôt GitHub.
2. Mets tous les fichiers de ce dossier à la racine du dépôt.
3. Dans **Settings → Pages**, choisis **Deploy from a branch**.
4. Sélectionne la branche `main` et le dossier `/ (root)`.
5. Enregistre puis ouvre l'adresse GitHub Pages indiquée.

### Important
Les données sont enregistrées dans le navigateur (`localStorage`). Elles ne sont pas synchronisées entre plusieurs appareils. Pour une version multi-appareils avec compte utilisateur et base de données, il faudra ajouter un backend.
