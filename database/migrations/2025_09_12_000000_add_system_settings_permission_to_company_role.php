<?php

use Illuminate\Database\Migrations\Migration;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Get the company role
        $companyRole = Role::where('name', 'company')->first();
        
        if ($companyRole) {
            // Get the manage-system-settings permission
            $systemSettingsPermission = Permission::where('name', 'manage-system-settings')->first();
            
            if ($systemSettingsPermission) {
                // Give the permission to the company role
                $companyRole->givePermissionTo($systemSettingsPermission);
            }
        }
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // Get the company role
        $companyRole = Role::where('name', 'company')->first();
        
        if ($companyRole) {
            // Get the manage-system-settings permission
            $systemSettingsPermission = Permission::where('name', 'manage-system-settings')->first();
            
            if ($systemSettingsPermission) {
                // Remove the permission from the company role
                $companyRole->revokePermissionTo($systemSettingsPermission);
            }
        }
    }
};