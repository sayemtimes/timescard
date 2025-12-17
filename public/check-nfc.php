<?php
require __DIR__ . '/../vendor/autoload.php';
$app = require_once __DIR__ . '/../bootstrap/app.php';
$app->make('Illuminate\Contracts\Console\Kernel')->bootstrap();

use App\Models\LandingPageSetting;

$action = $_GET['action'] ?? null;

// Add NFC to section order if requested
if ($action === 'add_nfc') {
    $settings = LandingPageSetting::first();
    if ($settings) {
        $config = $settings->config_sections;
        
        if (!in_array('nfc_cards', $config['section_order'])) {
            // Find position after testimonials
            $key = array_search('testimonials', $config['section_order']);
            if ($key !== false) {
                array_splice($config['section_order'], $key + 1, 0, 'nfc_cards');
            } else {
                $config['section_order'][] = 'nfc_cards';
            }
            
            $settings->config_sections = $config;
            $settings->save();
            echo '<div style="background: #d4edda; color: #155724; padding: 15px; margin: 20px; border-radius: 5px;">✅ NFC section added to order! Reloading...</div>';
            echo '<script>setTimeout(() => location.reload(), 2000);</script>';
            exit;
        }
    }
}

$settings = LandingPageSetting::first();
?>
<!DOCTYPE html>
<html>
<head>
    <title>NFC Section Debug</title>
    <style>
        body { font-family: sans-serif; max-width: 900px; margin: 0 auto; padding: 20px; background: #f5f5f5; }
        .card { background: white; padding: 20px; margin: 15px 0; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        h2 { color: #333; border-bottom: 2px solid #055353; padding-bottom: 10px; }
        pre { background: #f8f9fa; padding: 15px; overflow-x: auto; border-radius: 5px; }
        button { background: #055353; color: white; padding: 10px 20px; border: none; border-radius: 5px; cursor: pointer; font-size: 14px; }
        button:hover { background: #044242; }
        .success { color: #28a745; }
        .error { color: #dc3545; }
        .warning { color: #ff9800; }
    </style>
</head>
<body>
    <h1>🔍 NFC Section Configuration Debug</h1>
    
    <?php if ($settings): ?>
        <div class="card">
            <h2>📋 Current Section Order</h2>
            <pre><?php echo implode(' → ', $settings->config_sections['section_order']); ?></pre>
        </div>
        
        <div class="card">
            <h2>🎯 NFC Cards Status</h2>
            <?php 
                $hasNFC = in_array('nfc_cards', $settings->config_sections['section_order']);
                if ($hasNFC) {
                    echo '<p class="success">✅ NFC Cards is in section order</p>';
                } else {
                    echo '<p class="error">❌ NFC Cards is NOT in section order</p>';
                    echo '<p>Click the button below to add it:</p>';
                    echo '<form method="GET">';
                    echo '<input type="hidden" name="action" value="add_nfc">';
                    echo '<button type="submit">+ Add NFC Cards to Order</button>';
                    echo '</form>';
                }
            ?>
        </div>
        
        <div class="card">
            <h2>📊 All Sections in Config</h2>
            <pre><?php 
                $sections = array_map(fn($s) => $s['key'], $settings->config_sections['sections']);
                echo json_encode($sections, JSON_PRETTY_PRINT);
            ?></pre>
        </div>
    <?php else: ?>
        <div class="card" style="background: #f8d7da; color: #721c24;">
            <p>❌ No landing page settings found in database</p>
        </div>
    <?php endif; ?>
</body>
</html>
