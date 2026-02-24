<?php
//fleurs.php
// Connexion à la base de données
$host = 'localhost';
$dbname = 'alexandralebozec_fleurs';
$username = 'alexandralebozec_univers';
$password = 'AlexUnivers2024';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    // Récupération des paramètres de filtrage
    $habitat = isset($_GET['habitat']) ? trim($_GET['habitat']) : ''; // Nettoie les espaces
    $utilisation = isset($_GET['utilisation']) ? trim($_GET['utilisation']) : ''; // Nettoie les espaces

    // Récupérer toutes les colonnes y compris description
    $query = "SELECT id, nom, habitat, utilisation, image, description FROM fleurs WHERE 1=1";
    $params = [];

    // Ajouter un filtre par habitat si spécifié
    if (!empty($habitat)) {
        $query .= " AND habitat = :habitat";
        $params[':habitat'] = $habitat;
    }

    $stmt = $pdo->prepare($query);
    $stmt->execute($params);
    $fleurs = $stmt->fetchAll(PDO::FETCH_ASSOC);

    // Filtrer les fleurs par utilisation
    $fleursFiltrees = [];
    foreach ($fleurs as $fleur) {
        // Diviser les utilisations en tableau
        $utilisations = explode(",", $fleur['utilisation']);
        $utilisations = array_map('trim', $utilisations); // Supprimer les espaces autour des éléments

        // Vérifier si l'utilisation correspond
        if (empty($utilisation) || in_array($utilisation, $utilisations)) {
            $fleursFiltrees[] = $fleur;
        }
    }

    // Retourner les fleurs filtrées au format JSON
    header('Content-Type: application/json');
    echo json_encode($fleursFiltrees);

} catch (PDOException $e) {
    // Retourner une erreur HTTP 500 en cas de problème
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>
