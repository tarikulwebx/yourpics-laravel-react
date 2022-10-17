<?php

namespace Database\Seeders;

use App\Models\User;
use Illuminate\Database\Console\Seeds\WithoutModelEvents;
use Illuminate\Database\Seeder;

class UserTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        User::factory()->create([
            'first_name' => 'Tarikul',
            'last_name'  => 'Islam',
            'email'      => 'tarikul@test.com',
        ]);

        User::factory()->create([
            'first_name' => 'Monir',
            'last_name'  => 'Hossain',
            'email'      => 'monir@test.com',
        ]);
    }
}
