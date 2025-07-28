<?php
$host = 'localhost';
$dbname = 'alexandralebozec_fleurs';
$username = 'alexandralebozec_univers';
$password = 'AlexUnivers2024';

try {
    $pdo = new PDO("mysql:host=$host;dbname=$dbname;charset=utf8", $username, $password);
    $pdo->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);

    $habitat = isset($_GET['habitat']) ? trim($_GET['habitat']) : '';
    $utilisation = isset($_GET['utilisation']) ? trim($_GET['utilisation']) : '';

    $query = "SELECT id, nom, habitat, utilisation, image, description FROM fleurs WHERE 1=1";
    $params = [];

    if (!empty($habitat)) {
        $query .= " AND habitat = :habitat";
        $params[':habitat'] = $habitat;
    }

    $stmt = $pdo->prepare($query);
    $stmt->execute($params);
    $fleurs = $stmt->fetchAll(PDO::FETCH_ASSOC);

    $fleursFiltrees = [];
    foreach ($fleurs as $fleur) {
        $utilisations = explode(",", $fleur['utilisation']);
        $utilisations = array_map('trim', $utilisations);

        if (empty($utilisation) || in_array($utilisation, $utilisations)) {
            $fleursFiltrees[] = $fleur;
        }
    }

    header('Content-Type: application/json');
    echo json_encode($fleursFiltrees);

} catch (PDOException $e) {
    http_response_code(500);
    echo json_encode(['error' => $e->getMessage()]);
}
?>