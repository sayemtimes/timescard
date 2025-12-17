<?php
require __DIR__ . '/vendor/autoload.php';
$app = require_once __DIR__ . '/bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\LandingPageSetting;

$settings = LandingPageSetting::first();
if ($settings) {
    $config = $settings->config_sections;
    echo "Current section order:\n";
    echo json_encode($config['section_order'], JSON_PRETTY_PRINT) . "\n\n";
    
    echo "Contains nfc_cards: " . (in_array('nfc_cards', $config['section_order']) ? "YES" : "NO") . "\n";
} else {
    echo "No settings found";
}
?>
