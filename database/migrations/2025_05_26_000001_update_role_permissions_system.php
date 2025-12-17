<?php

use Illuminate\Database\Migrations\Migration;
use Illuminate\Database\Schema\Blueprint;
use Illuminate\Support\Facades\Schema;
use App\Models\Role;
use App\Models\Permission;
use App\Models\User;

return new class extends Migration
{
    /**
     * Run the migrations.
     */
    public function up(): void
    {
        // Ensure all users have proper roles assigned
        $this->assignRolesToUsers();
        
        // Update role permissions based on config
        $this->updateRolePermissions();
    }

    /**
     * Reverse the migrations.
     */
    public function down(): void
    {
        // This migration doesn't need to be reversed
    }

    /**
     * Assign roles to users who don't have them
     */
    private function assignRolesToUsers(): void
    {
        $users = User::whereDoesntHave('roles')->get();
        
        foreach ($users as $user) {
            if ($user->type === 'superadmin' || $user->type === 'super admin') {
                $role = Role::where('name', 'superadmin')->first();
                if ($role) {
                    $user->assignRole($role);
                }
            } elseif ($user->type === 'company') {
                $role = Role::where('name', 'company')->first();
                if ($role) {
                    $user->assignRole($role);
                }
            } else {
                // For other user types, try to find a matching role or assign company role
                $role = Role::where('name', $user->type)->first();
                if (!$role) {
                    $role = Role::where('name', 'company')->first();
                }
                if ($role) {
                    $user->assignRole($role);
                }
            }
        }
    }

    /**
     * Update role permissions based on configuration
     */
    private function updateRolePermissions(): void
    {
        $rolePermissions = config('role-permissions');
        
        foreach ($rolePermissions as $roleName => $moduleNames) {
            $role = Role::where('name', $roleName)->first();
            
            if (!$role) {
                continue;
            }

            // Get permissions for the modules
            $permissions = Permission::whereIn('module', $moduleNames)->get();
            
            // For company role, filter settings permissions
            if ($roleName === 'company') {
                $permissions = $permissions->filter(function ($permission) {
                    if ($permission->module === 'settings') {
                        return in_array($permission->name, [
                            'manage-email-settings',
                            'manage-system-settings',
                            'manage-brand-settings'
                        ]);
                    }
                    return true;
                });
            }
            
            // Sync permissions to role
            $role->syncPermissions($permissions);
        }
    }
};